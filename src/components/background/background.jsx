import "./background.css";

const Background = ({ children, onModalClick }) => {
  return (
    <div className="background" onClick={onModalClick}>
      {children}
    </div>
  );
};

export default Background;
