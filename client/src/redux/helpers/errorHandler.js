import { toast } from 'react-toastify';

export default function errorHandler(err) {
  if (err.response.data.msg) return toast.error(err.response.data.msg);
  if (err.msg) return toast.error(err.msg);
  if (err.message) return toast.error(err.message);
}
