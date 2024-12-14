import React from "react";
import { MdAccessTime } from "react-icons/md";
import { convertMillisecondsToTime } from "./ConvertTime";

interface CountdownProps {
  remainingTime: number;
}

const Countdown = ({ remainingTime }: CountdownProps) => {
  return (
    <div className="time">
      <div className="icon">
        <MdAccessTime />
      </div>
      <div>{convertMillisecondsToTime(remainingTime)}</div>
    </div>
  );
};

export default React.memo(Countdown); // React.memo để ngăn render lại không cần thiết
