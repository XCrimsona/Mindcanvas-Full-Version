const canvaNotification_CreateTextFailed = () => {
  if (Notification.permission === "granted") {
    new Notification("Text add attempt detected", {
      body: `Text fragment was not added!`,
    });
  }
};

export default canvaNotification_CreateTextFailed;
