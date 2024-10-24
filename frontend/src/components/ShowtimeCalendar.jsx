import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const ShowtimeCalendar = ({ showtimesData }) => {
  const onDragEnd = (result) => {
    // TODO: Implement drag and drop reorder logic
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="showtimes">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {showtimesData.length === 0 ? (
              <p>No showtimes available.</p>
            ) : (
              showtimesData.map((showtime, index) => (
                <Draggable
                  key={showtime.movieId}
                  draggableId={showtime.movieId}
                  index={index}
                >
                  {(provided) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      className="bg-gray-100 p-2 mb-2 rounded shadow-md"
                    >
                      <p>Movie ID: {showtime.movieId}</p>
                      <p>Start Time: {showtime.startTime}</p>
                    </div>
                  )}
                </Draggable>
              ))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ShowtimeCalendar;
