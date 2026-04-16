import { toast } from "react-toastify";

const canvaNotification_TextFragmentDeleted = () => {
  // if (Notification.permission === "granted") {
  //   new Notification("text fragment deletion alert", {
  //     body: `Attention: Text fragment has been deleted!`,
  //   });
  // }
  toast.success("Attention: Text fragment has been deleted!");
};

export default canvaNotification_TextFragmentDeleted;
