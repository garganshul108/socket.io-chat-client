import React from "react";

import onlineIcon from "../../icons/onlineIcon.png";
import closeIcon from "../../icons/closeIcon.png";

import "./InfoBar.css";

const InfoBar = ({ room, onClose }) => (
  <div className="info-bar">
    <div className="left-inner-container">
      <img className="online-icon" src={onlineIcon} alt="online icon" />
      <span>{room}</span>
    </div>
    <div className="right-inner-Container">
      <button
        style={{
          background: "none",
          border: "none",
          marginRight: "10px",
        }}
        onClick={onClose}
      >
        <img src={closeIcon} alt="close icon" />
      </button>
    </div>
  </div>
);

export default InfoBar;
