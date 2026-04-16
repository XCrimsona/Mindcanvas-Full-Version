const canvaNotification_Delete = () => {
  if (Notification.permission === "granted") {
    new Notification("Canvas Management Activity", {
      body: `A canva space has been deleted!`,
    });
  }
};

export default canvaNotification_Delete;
