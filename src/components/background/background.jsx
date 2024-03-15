import "./background.css";

const Background = ({ children, onModalClick }) => {
  return (
    <div className="background" onClick={onModalClick}>
      <div style={{ pointerEvents: "none" }}> {children}</div>
    </div>
  );
};

export default Background;
