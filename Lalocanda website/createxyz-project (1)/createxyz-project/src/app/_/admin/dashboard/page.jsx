"use client";
import React from "react";

function MainComponent() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastRefreshed, setLastRefreshed] = useState(new Date());
  const { data: user, loading: authLoading } = useUser();
  const helsinkiDate = new Date().toLocaleString("en-US", {
    timeZone: "Europe/Helsinki",
  });
  const formattedDate = new Date(helsinkiDate).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Europe/Helsinki",
  });
  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/get-dashboard-stats", {
        method: "POST",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch dashboard data");
      }
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setDashboardData(data.stats);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError("Could not load dashboard data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 60000);
    return () => clearInterval(interval);
  }, [fetchDashboardData]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#1e1d1b] flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-[#e4a00e] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#1e1d1b] flex flex-col items-center justify-center p-6">
        <div className="text-[#e4a00e] text-2xl mb-6 text-center">
          Please sign in to access the admin dashboard
        </div>
        <a
          href="/account/signin?callbackUrl=/admin/dashboard"
          className="bg-[#e4a00e] text-black px-8 py-4 rounded-lg text-xl hover:bg-[#c58c0c] transition-colors"
        >
          Sign In
        </a>
      </div>
    );
  }

  const totalGuests =
    dashboardData?.todaysReservations?.reduce(
      (sum, res) => sum + res.guests,
      0
    ) || 0;
  const totalRevenue =
    dashboardData?.todaysReservations
      ?.filter((res) => res.status === "completed")
      ?.reduce((sum, res) => sum + (res.total_amount || 0), 0) || 0;

  return (
    <div className="min-h-screen bg-[#1e1d1b] p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center text-gray-400 mb-4 text-sm">
          <a href="/admin" className="hover:text-[#e4a00e]">
            Admin
          </a>
          <span className="mx-2">/</span>
          <span className="text-[#e4a00e]">Dashboard</span>
        </div>
        <div className="flex flex-wrap justify-between items-center mb-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl md:text-5xl font-bold text-[#e4a00e]">
              Admin Dashboard
            </h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse"></div>
                <span className="text-[#22c55e] text-sm">Online</span>
              </div>
              <span className="text-gray-400 text-sm">
                Today: {formattedDate}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span>Last updated: {lastRefreshed.toLocaleTimeString()}</span>
            <button
              onClick={() => {
                fetchDashboardData();
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#2a2826] rounded-xl p-6 shadow-xl">
            <h2 className="text-2xl text-[#e4a00e] mb-4">Quick Actions</h2>
            <div className="space-y-4">
              <a
                href="/admin/reservations?walkIn=true"
                className="block w-full bg-[#1a1918] p-4 rounded-lg text-left hover:bg-[#353230] transition-colors"
              >
                <i className="fas fa-walking text-[#e4a00e] mr-2"></i>
                <span className="text-white">Add Walk-in Guest</span>
              </a>
            </div>
          </div>

          <div className="bg-[#2a2826] rounded-xl p-6 shadow-xl">
            <h2 className="text-2xl text-[#e4a00e] mb-4">Menu Items</h2>
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="w-12 h-12 border-4 border-[#e4a00e] border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : error ? (
              <div className="text-red-500 text-center py-4">{error}</div>
            ) : dashboardData?.menuItemCounts ? (
              <div className="space-y-4">
                {dashboardData.menuItemCounts.map((item) => {
                  const icon =
                    item.menu_type === "A LA CARTE"
                      ? "🍽️"
                      : item.menu_type === "JUOMALISTA"
                      ? "🍷"
                      : "🌮";
                  return (
                    <div
                      key={item.menu_type}
                      className="flex justify-between items-center bg-[#1a1918] p-4 rounded-lg"
                    >
                      <span className="text-[#e4a00e] flex items-center gap-2">
                        <span>{icon}</span>
                        {item.menu_type}
                      </span>
                      <span className="text-white">{item.count} items</span>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>

          <div className="bg-[#2a2826] rounded-xl p-6 shadow-xl">
            <h2 className="text-2xl text-[#e4a00e] mb-4">Today's Stats</h2>
            <div className="space-y-4">
              <div className="bg-[#1a1918] p-4 rounded-lg">
                <div className="text-gray-400 mb-1">Total Reservations</div>
                <div className="text-2xl text-white flex items-center justify-between">
                  <span>{dashboardData?.todaysReservations?.length || 0}</span>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-[#e4a00e]">
                      {dashboardData?.todaysReservations?.filter(
                        (r) => !r.sheet_id
                      ).length || 0}{" "}
                      Walk-ins
                    </span>
                    <span className="text-gray-400">/</span>
                    <span className="text-[#22c55e]">
                      {dashboardData?.todaysReservations?.filter(
                        (r) => r.sheet_id
                      ).length || 0}{" "}
                      Online
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-[#1a1918] p-4 rounded-lg">
                <div className="text-gray-400 mb-1">Total Guests</div>
                <div className="text-2xl text-white">{totalGuests}</div>
              </div>
              <div className="bg-[#1a1918] p-4 rounded-lg">
                <div className="text-gray-400 mb-1">Revenue (Completed)</div>
                <div className="text-2xl text-white">
                  {totalRevenue.toFixed(2)}€
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-[#2a2826] rounded-xl p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl text-[#e4a00e]">Today's Reservations</h2>
              <div className="text-sm text-gray-400">
                {dashboardData?.todaysReservations?.length || 0} total
              </div>
            </div>
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="w-12 h-12 border-4 border-[#e4a00e] border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : error ? (
              <div className="text-red-500 text-center py-4">{error}</div>
            ) : dashboardData?.todaysReservations?.length > 0 ? (
              <div className="space-y-4 max-h-[500px] overflow-y-auto">
                {dashboardData.todaysReservations.map((reservation) => (
                  <div
                    key={reservation.id}
                    className="bg-[#1a1918] p-4 rounded-lg flex justify-between items-center group relative"
                    title={`${reservation.customer_name} - ${reservation.guests} guests - Table ${reservation.table_number}`}
                  >
                    <div>
                      <div className="text-[#e4a00e] flex items-center gap-2">
                        {reservation.customer_name}
                        {!reservation.sheet_id && (
                          <span className="bg-[#e4a00e]/20 text-[#e4a00e] px-2 py-0.5 rounded-full text-xs">
                            Walk-in
                          </span>
                        )}
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
                          {reservation.sheet_id ? (
                            <span className="text-[#22c55e]">
                              Website Booking
                            </span>
                          ) : (
                            <span className="text-[#e4a00e]">Walk-in</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-400 text-center py-8">
                No reservations for today
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a
            href="/admin/menu"
            className="bg-[#2a2826] rounded-xl p-8 text-center hover:bg-[#353230] transition-colors shadow-xl group"
          >
            <i className="fas fa-utensils text-5xl text-[#e4a00e] mb-4 group-hover:scale-110 transition-transform"></i>
            <h3 className="text-2xl text-[#e4a00e]">Menu Management</h3>
            <p className="text-gray-400 mt-2">View and edit menu items</p>
          </a>
          <a
            href="/admin/reservations"
            className="bg-[#2a2826] rounded-xl p-8 text-center hover:bg-[#353230] transition-colors shadow-xl group"
          >
            <i className="fas fa-calendar-alt text-5xl text-[#e4a00e] mb-4 group-hover:scale-110 transition-transform"></i>
            <h3 className="text-2xl text-[#e4a00e]">Reservations</h3>
            <p className="text-gray-400 mt-2">Manage table bookings</p>
          </a>
          <a
            href="/admin/analytics"
            className="bg-[#2a2826] rounded-xl p-8 text-center hover:bg-[#353230] transition-colors shadow-xl group md:col-span-2"
          >
            <i className="fas fa-chart-line text-5xl text-[#e4a00e] mb-4 group-hover:scale-110 transition-transform"></i>
            <h3 className="text-2xl text-[#e4a00e]">Analytics</h3>
            <p className="text-gray-400 mt-2">View business insights</p>
          </a>
        </div>
      </div>
    </div>
  );
}

export default MainComponent;