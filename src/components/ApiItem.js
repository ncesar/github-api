import React from "react";

const ApiItem = (props) => {
  return (
    <p className={props.classe}>
      <strong>{props.itemName}</strong>
      {props.item}
      {props.icone}
    </p>
  );
};

export default ApiItem;
