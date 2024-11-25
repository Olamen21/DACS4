// Button.jsx
import '../App.css';

const Button = ({ text, onClick, bgColor, colorText }) => {
  return (
    <button
      onClick={onClick}
      className="custom-button"
      style={{ backgroundColor: bgColor, color:colorText }} 
  
    >
      {text}
    </button>
  );
};

export default Button;
