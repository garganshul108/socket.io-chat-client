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
    <div className="messageContainer justifyEnd">
      <p className="sentText pr-10">{trimmedName}</p>
      <div className="messageBox backgroundBlue">
        <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
        <p>{timestamp}</p>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <div className="messageBox backgroundLight">
        <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
        <p>{timestamp}</p>
      </div>
      <p className="sentText pl-10 ">{senderId}</p>
    </div>
  );
};

export default Message;
