const canvaNotification_CanvaNotCreated = () => {
  if (Notification.permission === "granted") {
    new Notification("Canvas Management Modification Attempt Detected", {
      body: `A canva space's details were not updated!`,
    });
  }
};

export default canvaNotification_CanvaNotCreated;
