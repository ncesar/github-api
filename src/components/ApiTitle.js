import React from "react";

const ApiTitle = (props) => {
  const style = {
    color: "#a3aab1"
  };
  return (
    <p className={props.classe}>
      <strong>
        {props.titulo} <span style={style}>#{props.numero}</span>
      </strong>
    </p>
  );
};

export default ApiTitle;
