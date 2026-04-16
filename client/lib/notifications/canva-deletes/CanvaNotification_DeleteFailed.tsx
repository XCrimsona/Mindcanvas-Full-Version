const canvaNotification_DeleteFailed = () => {
  if (Notification.permission === "granted") {
    new Notification("Text fragment removal attempt detected", {
      body: `Request text fragment deletion was not successful!`,
    });
  }
};

export default canvaNotification_DeleteFailed;
