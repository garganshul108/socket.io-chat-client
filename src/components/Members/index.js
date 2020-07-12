import React from "react";

import Member from "./Member";

const Members = ({ members }) => {
  return (
    <div>
      <h4>Members</h4>
      {members.map((member, i) => {
        return <Member member={member} key={i} />;
      })}
    </div>
  );
};

export default Members;
