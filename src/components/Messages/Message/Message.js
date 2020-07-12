import React from "react";

import "./Message.css";

import ReactEmoji from "react-emoji";

const Message = ({ message: { text, senderId, timestamp }, username }) => {
  let isSentByCurrentUser = false;

  const trimmedName = username.trim().toLowerCase();

  if (senderId === trimmedName) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div className="message-container justify-end">
      <div className="message-box background-dark">
        <span className="sender-text pr-10">You</span>
        <span className="message-text color-dark">
          {ReactEmoji.emojify(text)}
        </span>
        <br />
        <span className="message-timestamp">
          {new Date(timestamp).toTimeString().split(" ")[0]}
        </span>
      </div>
    </div>
  ) : (
    <div className="message-container justify-start">
      <div className="message-box background-light">
        <p className="message-text color-dark">{ReactEmoji.emojify(text)}</p>
        <p className="message-timestamp">{timestamp}</p>
      </div>
      <p className="sender-text pl-10 ">{senderId}</p>
    </div>
  );
};

export default Message;
