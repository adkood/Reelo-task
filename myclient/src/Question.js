import React from "react";

export const Question = ({ props }) => {
  let Diffcolor =
    props.difficulty === "medium"
      ? "orange"
      : props.difficulty === "hard"
      ? "red"
      : "green";

  return (
    <div
      style={{
        width: "95%",
        height: "60px",
        margin: "5px",
        border: "1px solid grey",
        display: "flex",
        padding: "10px",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "monospace",
        borderRadius: "5px"
      }}
    >
      <div style={{ width: "85%", padding: "5px" }}>Q. {props.question_text}</div>
      <div
        style={{
          width: "15%",
          padding: "5px",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <span>{props.marks} marks</span>
        <span style={{ color: `${Diffcolor}` }}>{props.difficulty}</span>
      </div>
    </div>
  );
};
