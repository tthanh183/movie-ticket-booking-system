import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { confirmPaymentApi } from '../api/showtimeApi';

const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const sessionId = new URLSearchParams(location.search).get('session_id');

  useEffect(() => {
    let timeout;

    const confirmBooking = async () => {
      try {
        const response = await confirmPaymentApi(sessionId);

        if (response.data.success) {
          toast.success('Payment successful! Seats have been booked.');
          navigate('/');
        } else {
          throw new Error('Payment could not be confirmed.');
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            'Error confirming payment. Redirecting to homepage.'
        );
        navigate('/');
      }
    };

    if (sessionId) {
      confirmBooking();

      timeout = setTimeout(() => {
        toast.error('Payment session expired. Redirecting to homepage.');
        navigate('/');
      }, 600000);
    } else {
      toast.error('Invalid session. Redirecting to homepage.');
      navigate('/');
    }

    return () => clearTimeout(timeout);
  }, [sessionId, navigate]);

  return <div>Processing payment confirmation...</div>;
};

export default PaymentSuccessPage;
