import React from "react";

const ApiLink = (props) => {
  return <a href={props.link}>{props.linkName}</a>;
};

export default ApiLink;
