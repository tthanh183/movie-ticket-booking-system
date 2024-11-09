import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MdOutlineEventSeat } from 'react-icons/md';
import { useShowtimeStore } from '../stores/useShowtimeStore';
import CustomSkeleton from '../components/CustomSkeleton';
import { bookSeatsApi } from '../api/showtimeApi';

const SeatSelectionPage = () => {
  const { showtimeId } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const { selectedShowtime, showtimeLoading, getShowtimeById } =
    useShowtimeStore();
  const [bookingLoading, setBookingLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getShowtimeById(showtimeId);
  }, [showtimeId, getShowtimeById]);

  const toggleSeatSelection = (row, col) => {
    setSelectedSeats(prev => {
      const seatIndex = prev.findIndex(
        seat => seat.row === row && seat.col === col
      );
      if (seatIndex > -1) {
        return prev.filter((_, index) => index !== seatIndex);
      } else {
        return [...prev, { row, col }];
      }
    });
  };

  const handleConfirmBooking = async () => {
    if (selectedSeats.length === 0) return;
    setBookingLoading(true);
    setError(null);
    const response = await bookSeatsApi(showtimeId, selectedSeats);
    if (response.data.success) {
      window.location.href = response.data.checkout_url;
    }
    setBookingLoading(false);
  };

  return (
    <>
      {showtimeLoading ? (
        <div className="flex justify-center items-center min-h-screen">
          <CustomSkeleton />
        </div>
      ) : (
        <div className="p-6 space-y-4">
          <h1 className="text-2xl font-semibold text-center">Seat Selection</h1>
          {error && <div className="text-red-500 text-center">{error}</div>}
          <div className="grid gap-4">
            {selectedShowtime?.hall.seatLayout.map((seatRow, rowIndex) => (
              <div key={rowIndex} className="flex justify-center gap-4">
                {seatRow.seats.map(seat => {
                  const showtimeSeatStatus = selectedShowtime.seatsStatus.find(
                    s =>
                      s.row === seatRow.row &&
                      s.seats.some(ss => ss.col === seat.col)
                  );

                  const isBookedInShowtime =
                    showtimeSeatStatus?.seats.find(ss => ss.col === seat.col)
                      ?.status === 'booked';

                  const isBlockedInShowtime =
                    showtimeSeatStatus?.seats.find(ss => ss.col === seat.col)
                      ?.status === 'blocked';

                  const isSelectable =
                    seat.status === 'available' &&
                    !isBookedInShowtime &&
                    !isBlockedInShowtime;

                  return (
                    <div
                      key={seat.col}
                      className={`flex flex-col items-center relative ${
                        isBookedInShowtime
                          ? 'text-red-500'
                          : isBlockedInShowtime
                          ? 'text-gray-500'
                          : 'text-green-500'
                      } ${
                        selectedSeats.some(
                          s => s.row === seatRow.row && s.col === seat.col
                        )
                          ? 'ring-2 ring-blue-500'
                          : ''
                      }`}
                      onClick={() =>
                        isSelectable &&
                        toggleSeatSelection(seatRow.row, seat.col)
                      }
                      title={`Row ${seatRow.row}, Col ${seat.col} - ${
                        isBlockedInShowtime
                          ? 'Blocked'
                          : isBookedInShowtime
                          ? 'Booked'
                          : 'Available'
                      }`}
                    >
                      <MdOutlineEventSeat
                        style={{
                          fontSize: '40px',
                          transition: 'transform 0.2s',
                          transform: selectedSeats.some(
                            s => s.row === seatRow.row && s.col === seat.col
                          )
                            ? 'scale(1.2)'
                            : 'scale(1)',
                          cursor: isSelectable ? 'pointer' : 'not-allowed',
                        }}
                      />
                      <span className="text-sm mt-1">
                        {seatRow.row}-{seat.col}
                      </span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <button
              className={`mt-4 px-6 py-3 rounded-lg ${
                bookingLoading ? 'bg-gray-500' : 'bg-blue-500'
              } text-white transition duration-200`}
              onClick={handleConfirmBooking}
              disabled={selectedSeats.length === 0 || bookingLoading}
            >
              {bookingLoading ? 'Booking...' : 'Confirm Booking'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SeatSelectionPage;
