"use client";
import React from "react";

function MainComponent() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastRefreshed, setLastRefreshed] = useState(new Date());
  const { data: user, loading: authLoading } = useUser();

  const fetchDashboardStats = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/dashboard-stats", {
        method: "POST",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch dashboard stats");
      }
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setDashboardData(data.stats);
    } catch (err) {
      console.error("Error fetching dashboard stats:", err);
      setError("Could not load dashboard statistics");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchDashboardStats();
    }
  }, [user, fetchDashboardStats]);

  if (authLoading) {
    <div className="min-h-screen bg-[#1e1d1b] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-[#e4a00e] border-t-transparent rounded-full animate-spin"></div>
    </div>;
  }

  if (!user) {
    window.location.href = "/account/signin?callbackUrl=/admin/dashboard";
    return null;
  }

  return (
    <div className="min-h-screen bg-[#1e1d1b]">
      <header className="bg-[#1a1918] border-b border-[#f5ae15]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <a href="/" className="text-[#f5ae15] text-xl font-bold">
                LA LOCANDA
              </a>
              <nav className="ml-10 space-x-4">
                <a
                  href="/admin/menu"
                  className="text-white hover:text-[#f5ae15] px-3 py-2 rounded-md text-sm font-medium"
                >
                  Menu Management
                </a>
                <a
                  href="/admin/reservations"
                  className="text-white hover:text-[#f5ae15] px-3 py-2 rounded-md text-sm font-medium"
                >
                  Reservations
                </a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-white">{user.email}</span>
              <a
                href="/account/logout"
                className="text-white hover:text-[#f5ae15] px-3 py-2 rounded-md text-sm font-medium"
              >
                Sign Out
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-[#f5ae15]">
              Welcome to Admin Dashboard
            </h1>
            <p className="mt-2 text-gray-400">
              Manage your restaurant's menu and reservations
            </p>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span>Last updated: {lastRefreshed.toLocaleTimeString()}</span>
            <button
              onClick={() => {
                fetchDashboardStats();
                setLastRefreshed(new Date());
              }}
              className="bg-[#2a2826] p-3 rounded-lg hover:bg-[#353230] transition-colors"
              disabled={loading}
            >
              <i
                className={`fas fa-sync ${
                  loading ? "animate-spin" : ""
                } text-[#e4a00e]`}
              ></i>
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-12 h-12 border-4 border-[#e4a00e] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-lg">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-[#2a2826] rounded-xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl text-[#e4a00e]">
                  Today's Reservations
                </h2>
                <div className="text-3xl text-white">
                  Total: {dashboardData?.todaysReservations?.length || 0}
                </div>
              </div>
              <div className="space-y-4">
                {dashboardData?.todaysReservations?.map((reservation) => (
                  <div
                    key={reservation.id}
                    className="bg-[#1a1918] p-4 rounded-lg flex justify-between items-center group relative"
                    title={`${reservation.customer_name} - ${reservation.guests} guests - Table ${reservation.table_number}`}
                  >
                    <div>
                      <div className="text-[#e4a00e]">
                        {reservation.customer_name}
                        {reservation.sheet_id ? "" : " (Walk-in)"}
                      </div>
                      <div className="text-gray-400">
                        Table {reservation.table_number} ·{" "}
                        {new Date(
                          `${new Date().toDateString()} ${
                            reservation.reservation_time
                          }`
                        ).toLocaleTimeString("fi-FI", {
                          hour: "2-digit",
                          minute: "2-digit",
                          timeZone: "Europe/Helsinki",
                        })}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-white">
                        {reservation.guests}{" "}
                        {reservation.guests === 1 ? "guest" : "guests"}
                      </div>
                      <div
                        className={`px-3 py-1 rounded-full text-sm ${
                          reservation.status === "completed"
                            ? "bg-[#22c55e]/20 text-[#22c55e]"
                            : reservation.status === "cancelled"
                            ? "bg-[#ef4444]/20 text-[#ef4444]"
                            : "bg-[#eab308]/20 text-[#eab308]"
                        }`}
                      >
                        {reservation.status}
                      </div>
                    </div>
                    <div className="absolute invisible group-hover:visible bg-[#2a2826] text-white p-4 rounded-lg shadow-xl -top-20 right-0 w-64 z-10">
                      <div className="text-sm space-y-2">
                        <div>
                          <span className="text-gray-400">Name:</span>{" "}
                          {reservation.customer_name}
                        </div>
                        <div>
                          <span className="text-gray-400">Table:</span>{" "}
                          {reservation.table_number}
                        </div>
                        <div>
                          <span className="text-gray-400">Time:</span>{" "}
                          {new Date(
                            `${new Date().toDateString()} ${
                              reservation.reservation_time
                            }`
                          ).toLocaleTimeString("fi-FI", {
                            hour: "2-digit",
                            minute: "2-digit",
                            timeZone: "Europe/Helsinki",
                          })}
                        </div>
                        <div>
                          <span className="text-gray-400">Guests:</span>{" "}
                          {reservation.guests}
                        </div>
                        <div>
                          <span className="text-gray-400">Status:</span>{" "}
                          {reservation.status}
                        </div>
                        <div>
                          <span className="text-gray-400">Type:</span>{" "}
                          {reservation.sheet_id ? "Website Booking" : "Walk-in"}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1 space-y-6">
              <div className="bg-[#2a2826] rounded-xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl text-[#e4a00e]">Menu Items</h2>
                  <i className="fas fa-utensils text-[#e4a00e] text-2xl"></i>
                </div>
                <div className="space-y-2 mb-4">
                  {dashboardData?.menuItemCounts?.map((item) => (
                    <div
                      key={item.menu_type}
                      className="flex justify-between text-white"
                    >
                      <span>{item.menu_type}:</span>
                      <span>{item.count}</span>
                    </div>
                  ))}
                </div>
                <a
                  href="/admin/menu"
                  className="text-[#e4a00e] hover:text-white transition-colors flex items-center gap-2"
                >
                  Manage Menu
                  <i className="fas fa-arrow-right text-sm"></i>
                </a>
              </div>

              <div className="bg-[#2a2826] rounded-xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl text-[#e4a00e]">Quick Actions</h2>
                  <i className="fas fa-bolt text-[#e4a00e] text-2xl"></i>
                </div>
                <div className="space-y-3">
                  <a
                    href="/admin/menu"
                    className="block bg-[#1a1918] p-3 rounded text-white hover:bg-[#353230] transition-colors"
                  >
                    <i className="fas fa-plus-circle text-[#e4a00e] mr-2"></i>
                    Add Menu Item
                  </a>
                  <a
                    href="/admin/reservations"
                    className="block bg-[#1a1918] p-3 rounded text-white hover:bg-[#353230] transition-colors"
                  >
                    <i className="fas fa-calendar-plus text-[#e4a00e] mr-2"></i>
                    New Reservation
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MainComponent;