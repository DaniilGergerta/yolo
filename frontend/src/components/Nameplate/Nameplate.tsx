import "./styles.scss";
import logo from "assets/images/logo.png";

const Nameplate = () => {
  return (
    <div className="nameplate-wrapper">
      <img src={logo} alt="app logo" />
      <span>YOLO</span>
    </div>
  );
};
export default Nameplate;