import React from "react";
import "./AlertMessage.css";

const AlertMessage = ({ message: { text, timestamp } }) => {
  return (
    <div className="al-message-container">
      <div className="al-message-box al-background-dark">
        <span className="al-message-text al-color-dark">{text}</span>
      </div>
    </div>
  );
};

export default AlertMessage;
