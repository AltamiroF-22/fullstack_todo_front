import './Warning.sass'

const Warning = () => {
  return (
    <footer className="warning">
      <p>
        It takes a few minutes for the API to start responding to requests since
        it's hosted on a free plan :|
        <br />
        If it takes longer than a few minutes, I might forget to re-host the
        API, given that the free plan only lasts for three months! <br />
        please tell me if is taking more than few minutes
        <a target="blank" href="https://www.instagram.com/junior.rx22/">
          instagram
        </a>
      </p>
    </footer>
  );
};

export default Warning;
