import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  const logout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">

  {/* Navbar */}
  <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shrink-0">
    <h1 className="text-lg font-semibold">My Dashboard</h1>
    <div className="flex items-center gap-4">
      <span>{user?.email}</span>
      <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">
        Logout
      </button>
    </div>
  </nav>

  {/* Main */}
  <div className="flex flex-1 overflow-hidden">

    {/* Sidebar */}
    <aside className="w-64 bg-white shadow-md p-4 overflow-y-auto">
      <ul className="space-y-3">
        <li onClick={() => navigate("/dashboard")} className="cursor-pointer">
          Home
        </li>
        <li onClick={() => navigate("/dashboard/profile")} className="cursor-pointer">
          Profile
        </li>
        <li className="cursor-pointer">Settings</li>
      </ul>
    </aside>

    {/* Content */}
    <main className="flex-1 p-6 overflow-y-auto">
      <Outlet />
    </main>

  </div>

  {/* Footer */}
  <footer className="bg-gray-200 text-center py-3 shrink-0">
    <p className="text-sm text-gray-600">
      © 2026 My App. All rights reserved.
    </p>
  </footer>

</div>
  );
}