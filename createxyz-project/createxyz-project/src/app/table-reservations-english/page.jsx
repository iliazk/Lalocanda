"use client";
import React from "react";

function MainComponent() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [availableTimes, setAvailableTimes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_email: "",
    phone: "",
    guests: "",
  });
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (date) {
      fetchAvailableTimes();
    }
  }, [date]);

  const fetchAvailableTimes = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/get-available-times", {
        method: "POST",
        body: JSON.stringify({ date }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch available times");
      }
      const data = await response.json();
      setAvailableTimes(data.times || []);
    } catch (err) {
      setError("Could not fetch available times. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch("/api/create-reservation", {
        method: "POST",
        body: JSON.stringify({
          ...formData,
          reservation_date: date,
          reservation_time: time,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create reservation");
      }

      setNotification({
        type: "success",
        message:
          "Reservation created successfully! Check your email for confirmation.",
      });

      e.target.reset();
      setDate("");
      setTime("");
      setFormData({
        customer_name: "",
        customer_email: "",
        phone: "",
        guests: "",
      });
    } catch (err) {
      setNotification({
        type: "error",
        message: "Failed to create reservation. Please try again.",
      });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1e1d1b]">
      <header className="bg-[#f5ae15] py-4 fixed w-full z-50 shadow-lg">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center mb-6">
            <a href="/en" className="flex items-center">
              <img
                src="https://ucarecdn.com/fa201ac0-28b4-4ab7-8968-6311c7a7e733/-/format/auto/"
                alt="La Locanda Logo"
                className="h-24 w-auto transition-transform duration-300 hover:scale-105"
              />
            </a>
          </div>
          <div className="flex items-center justify-center">
            <nav className="hidden md:block w-full">
              <ul className="flex justify-center space-x-12">
                <li>
                  <a
                    href="/en"
                    className="text-black hover:text-white transition-all duration-300 text-sm tracking-widest font-medium border-b-2 border-transparent hover:border-white"
                  >
                    ABOUT
                  </a>
                </li>
                <li>
                  <a
                    href="/en/contact"
                    className="text-black hover:text-white transition-all duration-300 text-sm tracking-widest font-medium border-b-2 border-transparent hover:border-white"
                  >
                    CONTACT
                  </a>
                </li>
                <li>
                  <a
                    href="/en/reservations"
                    className="text-black hover:text-white transition-all duration-300 text-sm tracking-widest font-medium border-b-2 border-transparent hover:border-white"
                  >
                    RESERVATIONS
                  </a>
                </li>
                <li className="relative">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-black hover:text-white transition-all duration-300 text-sm tracking-widest font-medium border-b-2 border-transparent hover:border-white flex items-center"
                  >
                    MENU
                    <i
                      className={`fas fa-chevron-down ml-2 text-xs transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    ></i>
                  </button>
                  {isOpen && (
                    <div className="absolute mt-4 w-56 bg-[#f5ae15] rounded-lg shadow-2xl border border-black/10 animate-[fadeIn_0.3s_ease-out] backdrop-blur-lg bg-opacity-95">
                      <a
                        href="/en/lunch"
                        className="block px-6 py-4 text-black hover:text-white transition-all duration-300 text-sm border-b border-black/10 hover:bg-black/10"
                      >
                        LUNCH BUFFET
                      </a>
                      <a
                        href="/en/drinks"
                        className="block px-6 py-4 text-black hover:text-white transition-all duration-300 text-sm border-b border-black/10 hover:bg-black/10"
                      >
                        DRINKS
                      </a>
                      <a
                        href="/en/alacarte"
                        className="block px-6 py-4 text-black hover:text-white transition-all duration-300 text-sm hover:bg-black/10"
                      >
                        A LA CARTE
                      </a>
                    </div>
                  )}
                </li>
              </ul>
            </nav>
            <button
              className="md:hidden text-black hover:text-white transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <i
                className={`fas ${
                  isMobileMenuOpen ? "fa-times" : "fa-bars"
                } text-2xl`}
              ></i>
            </button>
          </div>

          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 border-t border-black/10 pt-4">
              <nav className="flex flex-col space-y-4">
                <a
                  href="/en"
                  className="text-black hover:text-white transition-colors duration-200"
                >
                  ABOUT
                </a>
                <a
                  href="/en/contact"
                  className="text-black hover:text-white transition-colors duration-200"
                >
                  CONTACT
                </a>
                <a
                  href="/en/reservations"
                  className="text-black hover:text-white transition-colors duration-200"
                >
                  RESERVATIONS
                </a>
                <div className="relative">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-black hover:text-white transition-colors duration-200 flex items-center"
                  >
                    MENU
                    <i
                      className={`fas fa-chevron-down ml-2 text-xs transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    ></i>
                  </button>
                  {isOpen && (
                    <div className="pl-4 mt-2 space-y-2">
                      <a
                        href="/en/lunch"
                        className="block text-black hover:text-white transition-colors duration-200"
                      >
                        Lunch Buffet
                      </a>
                      <a
                        href="/en/drinks"
                        className="block text-black hover:text-white transition-colors duration-200"
                      >
                        Drinks
                      </a>
                      <a
                        href="/en/alacarte"
                        className="block text-black hover:text-white transition-colors duration-200"
                      >
                        A La Carte
                      </a>
                    </div>
                  )}
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto px-6 pt-32 pb-16">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-5xl font-bold text-[#e4a00e] text-center mb-16">
            Table Reservations
          </h1>

          <form
            onSubmit={handleSubmit}
            className="bg-[#2a2826] p-8 rounded-xl shadow-xl space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#e4a00e] mb-2">Date</label>
                <input
                  type="date"
                  name="date"
                  required
                  min={new Date().toISOString().split("T")[0]}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-[#1a1918] text-white px-4 py-2 rounded"
                />
              </div>

              <div>
                <label className="block text-[#e4a00e] mb-2">Time</label>
                <select
                  name="time"
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-[#1a1918] text-white px-4 py-2 rounded"
                  disabled={!date || loading}
                >
                  <option value="">Select time</option>
                  {availableTimes.map((slot) => (
                    <option key={slot.time} value={slot.time}>
                      {slot.time} ({slot.availableTables} tables available)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[#e4a00e] mb-2">Full Name</label>
              <input
                type="text"
                name="customer_name"
                required
                onChange={(e) =>
                  setFormData({ ...formData, customer_name: e.target.value })
                }
                className="w-full bg-[#1a1918] text-white px-4 py-2 rounded"
              />
            </div>

            <div>
              <label className="block text-[#e4a00e] mb-2">Email</label>
              <input
                type="email"
                name="customer_email"
                required
                onChange={(e) =>
                  setFormData({ ...formData, customer_email: e.target.value })
                }
                className="w-full bg-[#1a1918] text-white px-4 py-2 rounded"
              />
            </div>

            <div>
              <label className="block text-[#e4a00e] mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                required
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full bg-[#1a1918] text-white px-4 py-2 rounded"
              />
            </div>

            <div>
              <label className="block text-[#e4a00e] mb-2">
                Number of Guests
              </label>
              <input
                type="number"
                name="guests"
                min="1"
                max="10"
                required
                onChange={(e) =>
                  setFormData({ ...formData, guests: e.target.value })
                }
                className="w-full bg-[#1a1918] text-white px-4 py-2 rounded"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#e4a00e] text-black py-3 rounded hover:bg-[#c58c0c] transition-colors disabled:opacity-50"
            >
              {loading ? "Processing..." : "Make Reservation"}
            </button>
          </form>

          {notification && (
            <div
              className={`fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg ${
                notification.type === "success" ? "bg-green-500" : "bg-red-500"
              } text-white`}
            >
              {notification.message}
              <button
                onClick={() => setNotification(null)}
                className="ml-4 text-white/80 hover:text-white"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          )}
        </div>
      </main>

      <></>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default MainComponent;