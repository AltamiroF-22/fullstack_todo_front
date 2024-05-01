import { WarningBtnProps } from "../warning-btn/WarningBtn";
import { IoIosClose } from "react-icons/io";
import "./Warning.sass";

const Warning = (props: WarningBtnProps) => {
  return (
    <section className="blur-background">
      <article className="warning">
        <div className="close-div">
          <button className="close-warning-btn" onClick={props.onClick}>
            <IoIosClose />
          </button>
        </div>
        <p>
          It takes a few minutes for the API to start responding to requests
          since it's hosted on a free plan :|
          <p />
          If it takes longer than a few minutes, I might forget to re-host the
          API, given that the free plan only lasts for three months! <br />
          please tell me if is taking more than few minutes:
          <a target="blank" href="https://www.instagram.com/junior.rx22/">
            instagram
          </a>
        </p>
      </article>
    </section>
  );
};

export default Warning;
