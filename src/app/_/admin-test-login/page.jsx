"use client";
import React from "react";

function MainComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { signInWithCredentials, signOut } = useAuth();
  const { data: user, loading, refetch } = useUser();

  useEffect(() => {
    const forceSignOut = async () => {
      if (user && user.email !== "admin@lalocanda.fi") {
        try {
          await signOut({
            callbackUrl: "/admin-test-login",
            redirect: true,
          });
          await refetch();
          window.location.reload();
        } catch (err) {
          console.error("Force sign out error:", err);
        }
      }
    };

    if (user) {
      forceSignOut();
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (email !== "admin@lalocanda.fi") {
      setError("Only authorized admin email allowed");
      return;
    }

    try {
      await signInWithCredentials({
        email,
        password,
        callbackUrl: "/admin/reservations",
        redirect: true,
      });
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid credentials");
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut({
        callbackUrl: "/admin-test-login",
        redirect: true,
      });
      await refetch();
      window.location.reload();
    } catch (err) {
      console.error("Sign out error:", err);
      window.location.reload();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1e1d1b] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#e4a00e] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1e1d1b] flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#e4a00e]">
            Admin Test Login
          </h1>
          <p className="mt-2 text-gray-400">Authorized personnel only</p>
        </div>

        {user ? (
          <div className="bg-[#2a2826] rounded-xl p-8 shadow-xl">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-[#e4a00e] mb-4">
                  Current Session
                </h2>
                <div className="space-y-3 text-white">
                  <div className="bg-[#1a1918] p-4 rounded-lg">
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="font-mono">{user.email}</p>
                  </div>
                  <div className="bg-[#1a1918] p-4 rounded-lg">
                    <p className="text-sm text-gray-400">User ID</p>
                    <p className="font-mono">{user.id}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-6">
                <button
                  onClick={handleSignOut}
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-lg transition-colors duration-200"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-[#2a2826] rounded-xl p-8 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[#e4a00e] mb-2 font-medium">
                  Admin Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#1a1918] text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#e4a00e] focus:outline-none"
                  placeholder="admin@lalocanda.fi"
                  required
                />
              </div>

              <div>
                <label className="block text-[#e4a00e] mb-2 font-medium">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#1a1918] text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#e4a00e] focus:outline-none"
                  placeholder="Enter your password"
                  required
                />
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-[#e4a00e] hover:bg-[#c58c0c] text-black font-medium py-3 px-4 rounded-lg transition-colors duration-200"
              >
                Sign In
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default MainComponent;