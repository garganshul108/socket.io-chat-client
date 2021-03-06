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
      <div className="message-box message-sent-bg">
        <span className="text-muted-dark small-text pr-10">You</span>
        <span className="message-text text-dark">
          {ReactEmoji.emojify(text)}
        </span>
        <br />
        <span className="message-timestamp text-muted-dark">
          {new Date(timestamp).toTimeString().split(" ")[0]}
        </span>
      </div>
    </div>
  ) : (
    <div className="message-container justify-start">
      <div className="message-box message-recieved-bg">
        <span className="text-muted-dark small-text pr-10">{senderId}</span>
        <span className="message-text text-muted-dark">
          {ReactEmoji.emojify(text)}
        </span>
        <br />
        <span className="message-timestamp">
          {new Date(timestamp).toTimeString().split(" ")[0]}
        </span>
      </div>
    </div>
  );
};

export default Message;
