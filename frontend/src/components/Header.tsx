import "../css/header.css";

interface Props {
  text: string;
}

const Header = ({ text }: Props) => {
  return (
    <div className="header">
      <div className="header-frame">
        <div className="left-header-section"></div>
        <div className="middle-header-section">{text}</div>
        <div className="adjust-right-header-section"></div>
        <div className="right-header-section"></div>
      </div>
    </div>
  );
};

export default Header;
