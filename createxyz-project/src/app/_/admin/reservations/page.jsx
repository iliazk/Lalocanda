"use client";
import React from "react";

function MainComponent() {
  const OPENING_HOUR = 11;
  const CLOSING_HOUR = 22;
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = OPENING_HOUR; hour < CLOSING_HOUR; hour++) {
      slots.push(`${hour.toString().padStart(2, "0")}:00`);
    }
    return slots;
  };
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [sortOrder, setSortOrder] = useState("asc");
  const { data: user, loading: authLoading } = useUser();
  const [showNewReservationForm, setShowNewReservationForm] = useState(false);
  const [showWalkInForm, setShowWalkInForm] = useState(false);
  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    email: "",
    guests: 1,
    reservationDate: new Date().toISOString().split("T")[0],
    time: `${OPENING_HOUR.toString().padStart(2, "0")}:00`,
  });
  const [walkInData, setWalkInData] = useState({
    customerName: "",
    guests: 1,
    tableNumber: "",
    time: `${new Date().getHours().toString().padStart(2, "0")}:00`,
    reservationDate: new Date().toISOString().split("T")[0],
  });
  const fetchReservations = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/get-reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date: selectedDate }),
      });

      if (!response.ok) {
        throw new Error(
          `Error fetching reservations: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      if (!Array.isArray(data.reservations)) {
        throw new Error("Invalid response format");
      }

      const reservationsList = data.reservations;
      const sorted = reservationsList.sort((a, b) => {
        if (!a.reservation_time || !b.reservation_time) return 0;
        return sortOrder === "asc"
          ? a.reservation_time.localeCompare(b.reservation_time)
          : b.reservation_time.localeCompare(a.reservation_time);
      });

      setReservations(sorted);
    } catch (err) {
      console.error("Error fetching reservations:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, [selectedDate, sortOrder]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("new") === "true") {
      setShowNewReservationForm(true);
    }
    if (params.get("walkIn") === "true") {
      setShowWalkInForm(true);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleWalkInChange = (e) => {
    const { name, value } = e.target;
    setWalkInData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/create-reservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to create reservation");
      }

      setShowNewReservationForm(false);
      fetchReservations();
      alert("Reservation created successfully!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
  const handleWalkInSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/create-reservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...walkInData,
          isWalkIn: true,
          status: "seated",
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to add walk-in guest");
      }

      setShowWalkInForm(false);
      fetchReservations();
      alert("Walk-in guest added successfully!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
  const updateReservationStatus = async (id, status) => {
    try {
      const response = await fetch("/api/update-reservation", {
        method: "POST",
        body: JSON.stringify({ id, status }),
      });

      if (!response.ok) {
        throw new Error("Failed to update reservation");
      }

      setReservations(
        reservations.map((res) => (res.id === id ? { ...res, status } : res))
      );
    } catch (err) {
      console.error(err);
      setError("Failed to update reservation status");
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#1e1d1b] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#e4a00e] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#1e1d1b] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#e4a00e] text-xl mb-4">
            Please sign in to access this page
          </p>
          <a
            href="/account/signin?callbackUrl=/admin/reservations"
            className="bg-[#e4a00e] text-black px-6 py-3 rounded-lg inline-block hover:bg-[#c58c0c] transition-colors"
          >
            Sign In
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1e1d1b] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <a
              href="/admin/dashboard"
              className="bg-[#2a2826] text-[#e4a00e] px-6 py-3 rounded-lg text-lg flex items-center justify-center gap-2 hover:bg-[#3a3836] transition-colors"
            >
              <i className="fas fa-tachometer-alt"></i>
              Dashboard
            </a>
            <h1 className="text-[#e4a00e] text-3xl font-bold">
              Manage Reservations
            </h1>
          </div>

          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <button
              onClick={() => setShowWalkInForm(true)}
              className="bg-[#e4a00e] text-black px-6 py-3 rounded-lg text-lg flex items-center justify-center gap-2 hover:bg-[#c58c0c] transition-colors"
            >
              <i className="fas fa-walking"></i>
              Add Walk-in
            </button>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-[#2a2826] text-white px-4 py-3 rounded-lg text-lg w-full md:w-auto"
            />
            <button
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="bg-[#2a2826] text-white px-6 py-3 rounded-lg text-lg flex items-center justify-center gap-2 hover:bg-[#3a3836] transition-colors"
            >
              <i
                className={`fas fa-sort-amount-${
                  sortOrder === "asc" ? "up" : "down"
                }`}
              ></i>
              Sort by Time
            </button>
          </div>
        </div>

        {showWalkInForm && (
          <div className="mb-8 bg-[#2a2826] rounded-lg p-6 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[#e4a00e] text-2xl font-bold">
                Add Walk-in Guest
              </h2>
              <button
                onClick={() => setShowWalkInForm(false)}
                className="text-gray-400 hover:text-white"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <form
              onSubmit={handleWalkInSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div>
                <label className="block text-[#e4a00e] mb-2">
                  Guest Name *
                </label>
                <input
                  type="text"
                  name="customerName"
                  value={walkInData.customerName}
                  onChange={handleWalkInChange}
                  className="w-full bg-[#1a1918] text-white px-4 py-3 rounded-lg"
                  placeholder="Walk-in guest name"
                  required
                />
              </div>

              <div>
                <label className="block text-[#e4a00e] mb-2">
                  Number of Guests *
                </label>
                <input
                  type="number"
                  name="guests"
                  value={walkInData.guests}
                  onChange={handleWalkInChange}
                  min="1"
                  max="10"
                  className="w-full bg-[#1a1918] text-white px-4 py-3 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-[#e4a00e] mb-2">
                  Table Number *
                </label>
                <input
                  type="number"
                  name="tableNumber"
                  value={walkInData.tableNumber}
                  onChange={handleWalkInChange}
                  min="1"
                  max="15"
                  className="w-full bg-[#1a1918] text-white px-4 py-3 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-[#e4a00e] mb-2">Time *</label>
                <select
                  name="time"
                  value={walkInData.time}
                  onChange={handleWalkInChange}
                  className="w-full bg-[#1a1918] text-white px-4 py-3 rounded-lg"
                  required
                >
                  {generateTimeSlots().map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full bg-[#e4a00e] hover:bg-[#c58c0c] text-black font-medium py-3 px-4 rounded-lg transition-colors duration-200"
                >
                  Add Walk-in Guest
                </button>
              </div>
            </form>
          </div>
        )}

        {showNewReservationForm && (
          <div className="mb-8 bg-[#2a2826] rounded-lg p-6 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[#e4a00e] text-2xl font-bold">
                Quick Reservation
              </h2>
              <button
                onClick={() => setShowNewReservationForm(false)}
                className="text-gray-400 hover:text-white"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div>
                <label className="block text-[#e4a00e] mb-2">
                  Customer Name *
                </label>
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  className="w-full bg-[#1a1918] text-white px-4 py-3 rounded-lg"
                  placeholder="Customer name"
                  required
                />
              </div>

              <div>
                <label className="block text-[#e4a00e] mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full bg-[#1a1918] text-white px-4 py-3 rounded-lg"
                  placeholder="Phone number"
                />
              </div>

              <div>
                <label className="block text-[#e4a00e] mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-[#1a1918] text-white px-4 py-3 rounded-lg"
                  placeholder="Email address"
                />
              </div>

              <div>
                <label className="block text-[#e4a00e] mb-2">
                  Number of Guests *
                </label>
                <input
                  type="number"
                  name="guests"
                  value={formData.guests}
                  onChange={handleInputChange}
                  min="1"
                  max="10"
                  className="w-full bg-[#1a1918] text-white px-4 py-3 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-[#e4a00e] mb-2">Date *</label>
                <input
                  type="date"
                  name="reservationDate"
                  value={formData.reservationDate}
                  onChange={handleInputChange}
                  className="w-full bg-[#1a1918] text-white px-4 py-3 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-[#e4a00e] mb-2">Time *</label>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="w-full bg-[#1a1918] text-white px-4 py-3 rounded-lg"
                  required
                >
                  {generateTimeSlots().map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full bg-[#e4a00e] hover:bg-[#c58c0c] text-black font-medium py-3 px-4 rounded-lg transition-colors duration-200"
                >
                  Create Quick Reservation
                </button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-12 h-12 border-4 border-[#e4a00e] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-lg">
            {error}
          </div>
        ) : reservations.length === 0 ? (
          <div className="bg-[#2a2826] rounded-lg p-8 text-center text-gray-400">
            No reservations found for this date
          </div>
        ) : (
          <div className="grid gap-4">
            {reservations.map((reservation) => (
              <div
                key={reservation.id}
                className="bg-[#2a2826] rounded-lg p-6 shadow-lg"
              >
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <i className="fas fa-user text-[#e4a00e]"></i>
                      <span className="text-white text-lg">
                        {reservation.customer_name}
                      </span>
                    </div>

                    {reservation.phone && (
                      <div className="flex items-center gap-3">
                        <i className="fas fa-phone text-[#e4a00e]"></i>
                        <a
                          href={`tel:${reservation.phone}`}
                          className="text-white hover:text-[#e4a00e] transition-colors"
                        >
                          {reservation.phone}
                        </a>
                      </div>
                    )}

                    {reservation.customer_email && (
                      <div className="flex items-center gap-3">
                        <i className="fas fa-envelope text-[#e4a00e]"></i>
                        <a
                          href={`mailto:${reservation.customer_email}`}
                          className="text-white hover:text-[#e4a00e] transition-colors"
                        >
                          {reservation.customer_email}
                        </a>
                      </div>
                    )}

                    <div className="flex items-center gap-3">
                      <i className="fas fa-clock text-[#e4a00e]"></i>
                      <span className="text-white">
                        {reservation.reservation_time} - {reservation.end_time}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <i className="fas fa-users text-[#e4a00e]"></i>
                      <span className="text-white">
                        {reservation.party_size} guests
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <i className="fas fa-table text-[#e4a00e]"></i>
                      <span className="text-white">
                        Table {reservation.table_number}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <i className="fas fa-info-circle text-[#e4a00e]"></i>
                      <span className="text-white capitalize">
                        Status: {reservation.status}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() =>
                        updateReservationStatus(reservation.id, "completed")
                      }
                      className={`px-6 py-3 rounded-lg text-lg flex items-center justify-center gap-2 ${
                        reservation.status === "completed"
                          ? "bg-green-500 text-white"
                          : "bg-[#3a3836] text-white hover:bg-[#4a4846]"
                      } transition-colors`}
                    >
                      <i className="fas fa-check"></i>
                      Complete
                    </button>

                    <button
                      onClick={() =>
                        updateReservationStatus(reservation.id, "cancelled")
                      }
                      className={`px-6 py-3 rounded-lg text-lg flex items-center justify-center gap-2 ${
                        reservation.status === "cancelled"
                          ? "bg-red-500 text-white"
                          : "bg-[#3a3836] text-white hover:bg-[#4a4846]"
                      } transition-colors`}
                    >
                      <i className="fas fa-times"></i>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MainComponent;