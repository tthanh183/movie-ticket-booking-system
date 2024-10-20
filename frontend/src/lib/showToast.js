import { toast } from 'react-hot-toast';

const showToast = (message, type = 'error', duration = 2000) => {
  toast[type](message, { duration });
};

export default showToast;
