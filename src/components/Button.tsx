interface ButtonProps {
  children: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const Button = ({ children, onClick, className, disabled }: ButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`btn btn-primary ${className ?? ""}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
