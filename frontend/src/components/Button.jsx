function Button({ children, onClick, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="
        w-full
        bg-blue-600
        hover:bg-blue-700
        text-white
        font-semibold
        py-3
        rounded-xl
        transition
        duration-300
        shadow-md
        cursor-pointer
      "
    >
      {children}
    </button>
  );
}

export default Button;