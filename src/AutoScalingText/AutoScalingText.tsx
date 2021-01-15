import * as React from "react";
import "./AutoScalingText.css";
import { AutoScalingTextProps } from "./types";

export const AutoScalingText: React.FC<AutoScalingTextProps> = (props) => {
  const [scale, setScale] = React.useState<number>(1);
  const node = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const actualScale = 2;

    if (scale === actualScale) return;

    if (actualScale < 1) {
      setScale(actualScale);
    } else if (scale < 1) {
      setScale(1);
    }
  }, [scale]);

  return (
    <div
      className="auto-scaling-text"
      style={{ transform: `scale(${scale},${scale})` }}
      ref={node}
    >
      {props.children}
    </div>
  );
};
