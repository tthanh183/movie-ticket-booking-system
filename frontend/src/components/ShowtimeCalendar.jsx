import { useState, useEffect, useMemo } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import AddShowtimeModal from './AddShowtimeModal';
import { useShowtimeStore } from '../stores/useShowtimeStore';
import { useHallStore } from '../stores/useHallStore';

const localizer = momentLocalizer(moment);

const ShowtimeCalendar = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const { showtimes, getShowtimesByHall } = useShowtimeStore();
  const { selectedHall } = useHallStore();

  useEffect(() => {
    if (selectedHall) {
      getShowtimesByHall(selectedHall._id);
    }
  }, [getShowtimesByHall, selectedHall]);

  const events = useMemo(
    () =>
      showtimes.map(showtime => ({
        title: showtime.movie.title,
        start: new Date(showtime.startTime),
        end: new Date(showtime.endTime),
        allDay: false,
      })),
    [showtimes]
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
      {selectedHall ? (
        <>
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
        </>
      ) : (
        <div className="text-center text-gray-500">
          <p>Please select a hall to view its showtimes.</p>
        </div>
      )}
    </div>
  );
};

export default ShowtimeCalendar;
