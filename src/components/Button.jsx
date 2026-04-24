export default function Button({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`w-full py-2 rounded-lg text-white font-semibold ${className}`}
    >
      {children}
    </button>
  );
}