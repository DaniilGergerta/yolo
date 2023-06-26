import { memo } from "react";
import type { FC } from "react";
import logo from "../../assets/images/logo.png";

import "./styles.scss";
import { useNavigate } from "react-router-dom";

const Header: FC = () => {
  const navigate = useNavigate();
  return (
    <header className="header-wrapper">
    <section
      onClick={() => navigate('/home')}
    >
      <img src={logo} alt="App Logo" />
      <span>{"YOLO"}</span>
    </section>
  </header>
  );
};

export default memo(Header);
