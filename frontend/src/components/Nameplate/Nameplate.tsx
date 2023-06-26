import { memo } from "react";
import type { FC } from "react";

import "./styles.scss";

const Nameplate: FC = () => {
  return (
    <div className="nameplate-wrapper">
      {/* <img src={logo} alt="app logo" /> */}
      <span>{"YOLO"}</span>
    </div>
  );
};

export default memo(Nameplate);
