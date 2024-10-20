import React from 'react';
import { Button, IconButton } from '@material-tailwind/react';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <div className="flex items-center justify-center gap-4">
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={handlePrev}
        disabled={currentPage === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>

      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <IconButton
            key={index + 1}
            onClick={() => onPageChange(index + 1)}
            variant={currentPage === index + 1 ? 'filled' : 'text'}
            color="gray"
          >
            {index + 1}
          </IconButton>
        ))}
      </div>

      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        Next
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default Pagination;
