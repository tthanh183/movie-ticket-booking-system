import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from '@material-tailwind/react';
import PropTypes from 'prop-types';
import { useCinemaStore } from '../stores/useCinemaStore';

const DeleteModal = ({ open, onCancel, onDelete }) => {
  const { selectedCinema } = useCinemaStore();
  return (
    <Dialog open={open} handler={onCancel}>
      <DialogHeader>Confirm Deletion</DialogHeader>
      <DialogBody divider>
        <Typography>
          Are you sure you want to delete this {selectedCinema.name}? This
          action cannot be undone.
        </Typography>
      </DialogBody>
      <DialogFooter>
        <Button color="red" onClick={onDelete}>
          Yes, Delete
        </Button>
        <Button variant="text" color="blue" onClick={onCancel}>
          Cancel
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

DeleteModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DeleteModal;
