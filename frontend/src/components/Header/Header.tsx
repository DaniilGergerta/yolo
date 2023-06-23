import "./styles.scss";
import logo from "../../assets/images/logo.png";
import { FC } from "react";

const Header: FC = () => (
  <header className="header-wrapper">
    <section>
      <img src={logo} alt="App Logo" />
      <span>YOLO</span>
    </section>
  </header>
);

export default Header;
