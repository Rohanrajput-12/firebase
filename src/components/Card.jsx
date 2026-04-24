export default function Card({ children }) {
  return (
    <div className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl w-[380px] border">
      {children}
    </div>
  );
}