const canvaNotification_CreateImage = () => {
  if (Notification.permission === "granted") {
    new Notification("Image Activity Detected", {
      body: `New image fragment added!`,
    });
  }
};

export default canvaNotification_CreateImage;
