import React from "react";

const NotificationErr = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="notificationErr">{message}</div>;
};

export default NotificationErr;
