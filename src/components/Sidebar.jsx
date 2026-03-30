import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="h-screen w-64 bg-green-800 text-white fixed p-5">
      <h1 className="text-2xl font-bold mb-6">🌾 AgriSync</h1>

      <nav className="flex flex-col gap-4">
        <Link to="/">🏠 Dashboard</Link>
        <Link to="/market">📈 Market</Link>
        <Link to="/diagnose">🧪 Diagnose</Link>
        <Link to="/health">🌱 Crop Health</Link>
        <Link to="/hub">🤝 Farmer Hub</Link>
      </nav>
    </div>
  );
}