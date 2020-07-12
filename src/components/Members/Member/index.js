import React from "react";

import "./member.css";

const Member = ({ member }) => {
  return (
    <div className="member-box">
      <span className="member-text">{member}</span>
    </div>
  );
};

export default Member;
