import { memo, useCallback } from "react";
import type { FC } from "react";
import { useNavigate } from "react-router-dom";

import "./styles.scss";

const Header: FC = () => {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    () => navigate("/home");
  }, []);

  return (
    <header className="header-wrapper">
      <section onClick={handleClick}>
        <img src={"/images/logo.png"} alt="App Logo" />
        <span>{"YOLO"}</span>
      </section>
    </header>
  );
};

export default memo(Header);
