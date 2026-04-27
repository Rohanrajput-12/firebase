import { useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  onAuthStateChanged,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  const handleChangePassword = async () => {
    setMessage("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      return setMessage("Please fill all fields");
    }

    if (newPassword !== confirmPassword) {
      return setMessage("Passwords do not match");
    }

    if (newPassword.length < 6) {
      return setMessage("Password must be at least 6 characters");
    }

    try {
      setLoading(true);

      // 🔐 Re-authenticate user
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );

      await reauthenticateWithCredential(user, credential);

      // 🔄 Update password
      await updatePassword(user, newPassword);

      setMessage("Password updated successfully ✅");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-96">

        <h2 className="text-xl font-bold mb-4">Profile</h2>

        {/* Email */}
        <p className="mb-4 text-gray-700">
          <strong>Email:</strong> {user?.email}
        </p>

        {/* Current Password */}
        <input
          type="password"
          placeholder="Current Password"
          className="w-full border p-2 mb-3 rounded"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />

        {/* New Password */}
        <input
          type="password"
          placeholder="New Password"
          className="w-full border p-2 mb-3 rounded"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        {/* Confirm Password */}
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full border p-2 mb-3 rounded"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {/* Button */}
        <button
          onClick={handleChangePassword}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          {loading ? "Updating..." : "Change Password"}
        </button>

        {/* Message */}
        {message && (
          <p className="mt-3 text-sm text-center text-red-500">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}