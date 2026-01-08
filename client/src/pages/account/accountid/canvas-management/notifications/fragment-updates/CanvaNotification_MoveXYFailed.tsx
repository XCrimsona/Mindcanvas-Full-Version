const CanvaNotification_MoveXYFailed = () => {
  if (Notification.permission === "granted") {
    new Notification(
      "Text fragment coordinate modification attempt detected ",
      {
        body: `A text fragment's coordinates were not updated!`,
      }
    );
  }
};

export default CanvaNotification_MoveXYFailed;
