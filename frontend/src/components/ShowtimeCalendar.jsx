import { useState, useEffect, useMemo } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import AddShowtimeModal from './AddShowtimeModal';
import { useShowtimeStore } from '../stores/useShowtimeStore';
import { useMovieStore } from '../stores/useMovieStore';

const localizer = momentLocalizer(moment);

const ShowtimeCalendar = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const { showtimes, getShowtimesByHall } = useShowtimeStore();
  const { movies } = useMovieStore();

  useEffect(() => {
    getShowtimesByHall();
  }, []);

  const events = useMemo(
    () =>
      showtimes.map(showtime => ({
        title:
          movies.find(movie => movie._id === showtime.movieId)?.title ||
          'No Title',
        start: new Date(showtime.startTime),
        end: new Date(showtime.startTime), 
        allDay: false,
      })),
    [showtimes, movies]
  );

  const handleSelectSlot = ({ start }) => {
    setSelectedDate(start);
    setModalOpen(true);
  };

  const handleCloseForm = () => {
    setModalOpen(false);
  };

  return (
    <div className="p-8">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={event => alert(`Selected event: ${event.title}`)} 
      />

      <AddShowtimeModal
        open={modalOpen}
        onClose={handleCloseForm}
        selectedDate={selectedDate}
      />
    </div>
  );
};

export default ShowtimeCalendar;
