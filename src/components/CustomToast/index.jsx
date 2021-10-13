

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const customToast = {
  success: function (message) {
    toast.success(message)
  },
  error: function (message) {
    toast.error(message)
  },
  warning: function (message) {
    toast.warn(message)
  },
  info: function (message) {
    toast.info(message)
  }
}

function CustomToastContainer() {
  return (
    <ToastContainer
      position={toast.POSITION.BOTTOM_CENTER}
      autoClose={3000}
      closeButton={false}
    />
  )
}

export { customToast, CustomToastContainer }