import React from "react";

function Text(props) {
  const style = {
    fontSize: `${props.size}px`,
    fontWeight: props.weight || "normal",
    color: props.color || "black",
  };
  return <div style={style}>{props.children}</div>;
}

export default Text;
