import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
    <div className="min-h-screen flex flex-col bg-gray-100">
      
      {/* Navbar */}
      <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
        <h1 className="text-lg font-semibold">My Dashboard</h1>
        <div className="flex items-center gap-4">
          <span>{user?.email}</span>
          <button 
            onClick={logout} 
            className="bg-red-500 px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-1">
        
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md p-4">
          <ul className="space-y-3">
            <li className="hover:text-blue-600 cursor-pointer">Home</li>
            <li className="hover:text-blue-600 cursor-pointer">Profile</li>
            <li className="hover:text-blue-600 cursor-pointer">Settings</li>
          </ul>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-6">
          <h2 className="text-2xl font-bold mb-4">Welcome</h2>
          <p>This is your dashboard content area.</p>
        </main>

      </div>

      {/* Footer */}
      <footer className="bg-gray-200 text-center py-3">
        <p className="text-sm text-gray-600">
          © 2026 My App. All rights reserved.
        </p>
      </footer>

    </div>
  );
}