export const stripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    const { showtimeId, seat } = paymentIntent.metadata; 
    const selectedSeat = JSON.parse(seat); 

    const showtime = await Showtime.findById(showtimeId);
    if (showtime) {
      const { row, col } = selectedSeat;
      const rowItem = showtime.seatsStatus.find(seat => seat.row === row);
      const seatToBook = rowItem?.seats.find(s => s.col === col);
      if (seatToBook && seatToBook.status === 'blocked') {
        seatToBook.status = 'booked';
      }
      await showtime.save();
    }
  } else if (event.type === 'payment_intent.payment_failed') {
    const paymentIntent = event.data.object;
    const { showtimeId, seat } = paymentIntent.metadata;
    const selectedSeat = JSON.parse(seat); 

    const showtime = await Showtime.findById(showtimeId);
    if (showtime) {
      const { row, col } = selectedSeat;
      const rowItem = showtime.seatsStatus.find(seat => seat.row === row);
      const seatToUnblock = rowItem?.seats.find(s => s.col === col);
      if (seatToUnblock && seatToUnblock.status === 'blocked') {
        seatToUnblock.status = 'available';
      }
      await showtime.save();
    }
  }

  res.json({ received: true });
};
