import { memo } from "react";
import type { FC } from "react";
import logo from "../../assets/images/logo.png";

import "./styles.scss";

const Header: FC = () => (
  <header className="header-wrapper">
    <section>
      <img src={logo} alt="App Logo" />
      <span>{"YOLO"}</span>
    </section>
  </header>
);

export default memo(Header);
