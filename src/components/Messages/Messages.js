import React from "react";

import ScrollToBottom from "react-scroll-to-bottom";

import Message from "./Message/Message";
import AlertMessage from "./AlertMessage/AlertMessage";

import "./Messages.css";

const Messages = ({ messageList, username }) => (
  <ScrollToBottom className="messages">
    {messageList.map((message, i) =>
      message.type === "alert" ? (
        <div key={i}>
          <AlertMessage message={message} />
        </div>
      ) : (
        <div key={i}>
          <Message message={message} username={username} />
        </div>
      )
    )}
  </ScrollToBottom>
);

export default Messages;
