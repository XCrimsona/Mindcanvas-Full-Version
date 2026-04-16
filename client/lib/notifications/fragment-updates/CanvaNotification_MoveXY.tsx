const CanvaNotification_MoveXY = () => {
  if (Notification.permission === "granted") {
    new Notification("Text fragment's coordinate update ", {
      body: `A text fragment's coordinates has been updated!`,
    });
  }
};

export default CanvaNotification_MoveXY;
