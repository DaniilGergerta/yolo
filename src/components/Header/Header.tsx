import "./styles.scss";
import logo from "../../assets/imgs/logo.png";

const Header = () => (
  <header className="header-wrapper">
    <section>
      <img src={logo} alt="App Logo" />
      <span>YOLO</span>
    </section>
  </header>
);

export default Header;
