import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from '@material-tailwind/react';
import PropTypes from 'prop-types';

const DeleteModal = ({ name, open, onClose, onDelete }) => {
  return (
    <Dialog open={open} handler={onClose}>
      <DialogHeader>Confirm Deletion</DialogHeader>
      <DialogBody divider>
        <Typography>
          Are you sure you want to delete this {name}? This action cannot be
          undone.
        </Typography>
      </DialogBody>
      <DialogFooter>
        <Button color="red" onClick={onDelete}>
          Yes, Delete
        </Button>
        <Button variant="text" color="blue" onClick={onClose}>
          Cancel
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

DeleteModal.propTypes = {
  name: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DeleteModal;
