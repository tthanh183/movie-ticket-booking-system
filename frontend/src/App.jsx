import { Navigate, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { Spinner } from '@material-tailwind/react';

import { useUserStore } from './stores/useUserStore';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { Toaster } from 'react-hot-toast';
import AdminPage from './pages/AdminPage';
import MovieDetailPage from './pages/MovieDetailPage';
import TicketBookingPage from './pages/TicketBookingPage';
import SeatSelectionPage from './pages/SeatSelectionPage';
import PaymentSuccessPage from './pages/PaymentSuccessPage';

function App() {
  const { user, checkAuth, checkingAuth } = useUserStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (checkingAuth)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner className="text-blue-500" />
      </div>
    );
  return (
    <div className="relative z-50 pt-20'">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to={'/'} />}
        />
        <Route
          path="/signup"
          element={!user ? <SignupPage /> : <Navigate to={'/'} />}
        />
        <Route
          path="/admin"
          element={
            user?.role === 'admin' ? <AdminPage /> : <Navigate to={'/login'} />
          }
        />
        <Route path="/movie/:movieId" element={<MovieDetailPage />} />
        <Route
          path="/ticket-booking/:movieId"
          element={<TicketBookingPage />}
        />
        <Route
          path="/seat-selection/:showtimeId"
          element={user ? <SeatSelectionPage /> : <Navigate to="/login" />}
        />
        <Route path="/payment-success" element={<PaymentSuccessPage />} />
        <Route path="/payment-cancel" element={<HomePage />} />{' '}
      </Routes>
      <Toaster className="z-50" />
    </div>
  );
}

export default App;
