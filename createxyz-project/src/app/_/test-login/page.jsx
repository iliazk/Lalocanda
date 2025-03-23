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
        await signOut({
          callbackUrl: "/test-login",
          redirect: true,
        });
        await refetch();
        window.location.reload();
      }
    };

    forceSignOut();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (email !== "admin@lalocanda.fi") {
      setError("Unauthorized email address");
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
      setError("Invalid email or password");
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut({
        callbackUrl: "/test-login",
        redirect: true,
      });
      await refetch();
      window.location.reload();
    } catch (err) {
      console.error("Logout error:", err);
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
      <div className="max-w-md w-full">
        {user ? (
          <div className="bg-[#2a2826] rounded-xl p-8 shadow-xl">
            <h2 className="text-2xl text-[#e4a00e] mb-4">Current User</h2>
            <div className="space-y-2 text-white">
              <p>Email: {user.email}</p>
              <p>ID: {user.id}</p>
            </div>
            <button
              onClick={handleSignOut}
              className="mt-6 block w-full bg-[#e4a00e] text-black py-3 px-4 rounded-lg text-center hover:bg-[#c58c0c] transition-colors"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div className="bg-[#2a2826] rounded-xl p-8 shadow-xl">
            <h2 className="text-3xl text-[#e4a00e] mb-6 text-center">
              Admin Sign In
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[#e4a00e] mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-[#1a1918] text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#e4a00e] focus:outline-none"
                  placeholder="Enter admin email"
                />
              </div>
              <div>
                <label className="block text-[#e4a00e] mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-[#1a1918] text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#e4a00e] focus:outline-none"
                  placeholder="Enter password"
                />
              </div>
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-lg">
                  {error}
                </div>
              )}
              <button
                type="submit"
                className="w-full bg-[#e4a00e] text-black py-3 px-4 rounded-lg hover:bg-[#c58c0c] transition-colors"
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