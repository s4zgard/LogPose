import logo from "../assets/images/logo.svg";
const Logo = () => {
  return (
    <img
      src={logo}
      alt="LogPose"
      className="logo"
      style={{ width: "150px", height: "50px" }}
    />
  );
};
export default Logo;
