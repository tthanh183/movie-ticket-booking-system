import PropTypes from 'prop-types';

const ShowtimeList = ({ showtimesByCinema = [] }) => {
  const formatTime = timestamp => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const handleBooking = showtime => {
    console.log(`Booking for showtime: ${showtime.startTime}`);
  };
  
  return (
    <div className="space-y-8 p-6 bg-gray-100 rounded-lg shadow-md">
      {showtimesByCinema.length > 0 ? (
        showtimesByCinema.map(item => (
          <div key={item.cinemaId} className="border-b border-gray-300 pb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              {item.cinemaName}
            </h2>
            <div className="flex flex-wrap gap-3">
              {item.showtimes?.map((showtime, index) => (
                <button
                  key={index}
                  className="border border-gray-400 text-gray-800 rounded-lg text-base py-2 px-4 transition-all duration-200 hover:bg-gray-100 focus:outline-none"
                  onClick={() => handleBooking(showtime)}
                >
                  {formatTime(showtime.time)}
                </button>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 text-lg">
          No showtimes available
        </p>
      )}
    </div>
  );
};



ShowtimeList.propTypes = {
  showtimesByCinema: PropTypes.array,
};

export default ShowtimeList;
