// import React, { useState, useEffect } from 'react';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css'; // Import CSS cho Calendar

// const ShowtimeCalendar = ({ showtimesData, addShowtime }) => {
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [showtimes, setShowtimes] = useState([]);

//   const formatDate = date => {
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const day = String(date.getDate()).padStart(2, '0');
//     return `${year}-${month}-${day}`;
//   };

//   const classifyShowtimes = showtimes => {
//     const morning = showtimes.filter(slot => slot.time < '12:00');
//     const afternoon = showtimes.filter(
//       slot => slot.time >= '12:00' && slot.time < '18:00'
//     );
//     const evening = showtimes.filter(slot => slot.time >= '18:00');

//     return { morning, afternoon, evening };
//   };

//   useEffect(() => {
//     const formattedDate = formatDate(selectedDate);
//     const showtimesForDate = showtimesData.filter(
//       showtime => showtime.date === formattedDate
//     );
//     setShowtimes(showtimesForDate);
//   }, [selectedDate, showtimesData]);

//   const handleDateChange = date => {
//     setSelectedDate(date);
//   };

//   const handleAddShowtime = (time, movie) => {
//     const newShowtime = {
//       id: Date.now(), // Giả sử tạo ID đơn giản bằng timestamp
//       time,
//       movie,
//       date: formatDate(selectedDate),
//     };
//     addShowtime(newShowtime);
//   };

//   const { morning, afternoon, evening } = classifyShowtimes(showtimes);

//   return (
//     <div className="showtime-calendar">
//       <h2>Chọn ngày:</h2>
//       <Calendar
//         onChange={handleDateChange}
//         value={selectedDate}
//         minDetail="month"
//         maxDetail="month"
//       />

//       <div className="showtime-details">
//         <h3>Suất chiếu cho ngày: {selectedDate.toLocaleDateString()}</h3>

//         {showtimes.length > 0 ? (
//           <>
//             <div className="time-slot">
//               <h4>Buổi sáng</h4>
//               {morning.length > 0 ? (
//                 morning.map(slot => (
//                   <div key={slot.id}>
//                     {slot.time} - {slot.movie}
//                   </div>
//                 ))
//               ) : (
//                 <p>Không có suất chiếu buổi sáng.</p>
//               )}
//             </div>

//             <div className="time-slot">
//               <h4>Buổi chiều</h4>
//               {afternoon.length > 0 ? (
//                 afternoon.map(slot => (
//                   <div key={slot.id}>
//                     {slot.time} - {slot.movie}
//                   </div>
//                 ))
//               ) : (
//                 <p>Không có suất chiếu buổi chiều.</p>
//               )}
//             </div>

//             <div className="time-slot">
//               <h4>Buổi tối</h4>
//               {evening.length > 0 ? (
//                 evening.map(slot => (
//                   <div key={slot.id}>
//                     {slot.time} - {slot.movie}
//                   </div>
//                 ))
//               ) : (
//                 <p>Không có suất chiếu buổi tối.</p>
//               )}
//             </div>
//           </>
//         ) : (
//           <p>Chưa có suất chiếu nào cho ngày này.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ShowtimeCalendar;
import React from 'react'

const ShowtimeCalendar = () => {
  return (
    <div>ShowtimeCalendar</div>
  )
}

export default ShowtimeCalendar