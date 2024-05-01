import { IoIosWarning } from "react-icons/io";
import { WarningBtnProps } from "./WarningBtn";
import "./WarningBtn.sass";

const WarningBtn = (props: WarningBtnProps) => {
  return (
    <button className="warning-btn" onClick={props.onClick}>
      <IoIosWarning />
    </button>
  );
};

export default WarningBtn;
