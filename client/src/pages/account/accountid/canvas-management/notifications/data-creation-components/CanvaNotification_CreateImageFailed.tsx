const canvaNotification_CreateImageFailed = () => {
  if (Notification.permission === "granted") {
    new Notification("Image add attempt detected", {
      body: `Image fragment was not added!`,
    });
  }
};

export default canvaNotification_CreateImageFailed;
