import { yellow, orange } from "@material-ui/core/colors";
import React from "react";

export default function WavyBorder(): JSX.Element {
  return (
    <div
      style={{
        backgroundColor: yellow[500],
        position: "relative",
        width: "100%",
        paddingBottom: "30%",
        verticalAlign: "middle",
        overflow: "hidden",
      }}
    >
      <svg
        viewBox="0 0 500 500"
        preserveAspectRatio="xMinYMin meet"
        style={{
          display: "inline-block",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <path
          d="M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z"
          style={{ stroke: "none", fill: orange[500] }}
        ></path>
      </svg>
    </div>
  );
}
