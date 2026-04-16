import { toast } from "react-toastify";

const canvaNotification_CanvaUpdated = () => {
  // if (Notification.permission === "granted") {
  //   new Notification("Canvas Management Activity Detected", {
  //     body: `A canva's details have been updated!`,
  //   });
  // }
  toast.success("Canva update detected", { autoClose: 3000 });
};

export default canvaNotification_CanvaUpdated;
