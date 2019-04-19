import React from "react";

const ApiComment = (props) => {
  return (
    <p className={props.classe}>
      <strong>{props.usuario}</strong> comentou em {props.data}
    </p>
  );
};

export default ApiComment;
