"use client";
import React from "react";
import Footer1 from "../../components/footer-1";
import LanguageSwitcher from "../../components/language-switcher";
import Footer1 from "../../components/footer-1";
import LanguageSwitcher from "../../components/language-switcher";

function MainComponent() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [guests, setGuests] = useState(2);
  const [loading, setLoading] = useState(false);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [modifyEmail, setModifyEmail] = useState("");
  const [reservationId, setReservationId] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [newGuests, setNewGuests] = useState("");
  const [modifyLoading, setModifyLoading] = useState(false);
  const [modifyError, setModifyError] = useState(null);
  const [modifySuccess, setModifySuccess] = useState(false);

  const times = [
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
  ];

  const minDate = new Date().toISOString().split("T")[0];

  const checkAvailability = async (selectedDate, selectedTime) => {
    try {
      const response = await fetch("/api/check-table-availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: selectedDate, time: selectedTime }),
      });

      if (!response.ok) {
        throw new Error("Failed to check availability");
      }

      const data = await response.json();
      return data.available?.length > 0;
    } catch (error) {
      console.error("Error checking availability:", error);
      return false;
    }
  };

  const handleDateChange = async (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    setTime("");
    setAvailableTimes([]);

    if (selectedDate) {
      setLoading(true);
      const available = await Promise.all(
        times.map(async (t) => {
          const isAvailable = await checkAvailability(selectedDate, t);
          return isAvailable ? t : null;
        })
      );
      setAvailableTimes(available.filter(Boolean));
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/create-reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: name,
          customer_email: email,
          phone,
          reservation_date: date,
          reservation_time: time,
          guests: parseInt(guests),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create reservation");
      }

      setSuccess(true);
      setName("");
      setEmail("");
      setPhone("");
      setDate("");
      setTime("");
      setGuests(2);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleModifySubmit = async (e) => {
    e.preventDefault();
    setModifyLoading(true);
    setModifyError(null);

    try {
      const response = await fetch("/api/update-reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: modifyEmail,
          reservation_id: reservationId,
          new_date: newDate || undefined,
          new_time: newTime || undefined,
          new_guests: newGuests ? parseInt(newGuests) : undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update reservation");
      }

      setModifySuccess(true);
      setModifyEmail("");
      setReservationId("");
      setNewDate("");
      setNewTime("");
      setNewGuests("");
    } catch (err) {
      setModifyError(err.message);
    } finally {
      setModifyLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1e1d1b]">
      <header className="bg-[#f5ae15] py-6 fixed w-full z-50 shadow-lg">
        <div className="container mx-auto px-6">
          <div className="flex justify-center mb-8">
            <a href="/en" className="flex items-center">
              <img
                src="https://ucarecdn.com/fa201ac0-28b4-4ab7-8968-6311c7a7e733/-/format/auto/"
                alt="La Locanda Logo"
                className="h-28 w-auto transition-transform duration-300 hover:scale-105"
              />
            </a>
          </div>
          <div className="flex items-center justify-center mt-4">
            <nav className="hidden md:block w-full">
              <ul className="flex justify-center items-center space-x-12">
                <li>
                  <a
                    href="/en"
                    className="text-black hover:text-white transition-all duration-300 text-sm tracking-widest font-medium border-b-2 border-transparent hover:border-white px-4 py-2"
                  >
                    ABOUT
                  </a>
                </li>
                <li>
                  <a
                    href="/en/contact"
                    className="text-black hover:text-white transition-all duration-300 text-sm tracking-widest font-medium border-b-2 border-transparent hover:border-white px-4 py-2"
                  >
                    CONTACT
                  </a>
                </li>
                <li>
                  <a
                    href="/en/reservations"
                    className="text-black hover:text-white transition-all duration-300 text-sm tracking-widest font-medium border-b-2 border-transparent hover:border-white px-4 py-2"
                  >
                    RESERVATIONS
                  </a>
                </li>
                <li className="relative">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-black hover:text-white transition-all duration-300 text-sm tracking-widest font-medium border-b-2 border-transparent hover:border-white flex items-center px-4 py-2"
                  >
                    MENU
                    <i
                      className={`fas fa-chevron-down ml-2 text-xs transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    ></i>
                  </button>
                  {isOpen && (
                    <div className="absolute mt-2 w-56 bg-[#f5ae15] rounded-lg shadow-2xl border border-black/10">
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
                <li>
                  <LanguageSwitcher currentLanguage="en" />
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 pt-48 pb-16">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-[#e4a00e] mb-8 text-center">
            Reservations
          </h1>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-[#e4a00e] mb-4">
              Make a Reservation
            </h2>
            <p className="text-gray-300 mb-4">
              Note: Your reservation details will be automatically removed two
              hours after your reservation ends.
            </p>
          </div>

          {success ? (
            <div className="bg-green-900/20 border border-green-500/20 rounded-lg p-6 text-center animate-fadeIn">
              <i className="fas fa-check-circle text-green-400 text-4xl mb-4"></i>
              <h2 className="text-2xl font-semibold text-green-400 mb-4">
                Reservation Confirmed!
              </h2>
              <p className="text-gray-300 mb-6">
                We've sent a confirmation email with your reservation details.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="bg-[#e4a00e] text-white px-6 py-3 rounded-lg hover:bg-[#c58c0c] transition-colors"
              >
                Make Another Reservation
              </button>
            </div>
          ) : (
            <>
              <form
                onSubmit={handleSubmit}
                className="space-y-6 bg-[#2a2826] p-8 rounded-lg shadow-xl mb-12"
              >
                <div>
                  <label className="block text-[#e4a00e] mb-2">Date *</label>
                  <input
                    type="date"
                    name="date"
                    required
                    min={minDate}
                    value={date}
                    onChange={handleDateChange}
                    className="w-full bg-[#1a1918] text-white px-4 py-2 rounded focus:ring-2 focus:ring-[#e4a00e] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#e4a00e] mb-2">Time *</label>
                  <select
                    name="time"
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    disabled={!date || loading}
                    className="w-full bg-[#1a1918] text-white px-4 py-2 rounded focus:ring-2 focus:ring-[#e4a00e] focus:outline-none"
                  >
                    <option value="">Select a time</option>
                    {availableTimes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[#e4a00e] mb-2">
                    Number of Guests *
                  </label>
                  <select
                    name="guests"
                    required
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full bg-[#1a1918] text-white px-4 py-2 rounded focus:ring-2 focus:ring-[#e4a00e] focus:outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? "guest" : "guests"}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[#e4a00e] mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#1a1918] text-white px-4 py-2 rounded focus:ring-2 focus:ring-[#e4a00e] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#e4a00e] mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#1a1918] text-white px-4 py-2 rounded focus:ring-2 focus:ring-[#e4a00e] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#e4a00e] mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#1a1918] text-white px-4 py-2 rounded focus:ring-2 focus:ring-[#e4a00e] focus:outline-none"
                  />
                </div>

                {error && (
                  <div className="bg-red-900/20 border border-red-500/20 p-4 rounded-lg text-red-400">
                    <i className="fas fa-exclamation-circle mr-2"></i>
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#e4a00e] text-white py-3 rounded-lg hover:bg-[#c58c0c] transition-colors disabled:opacity-50"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      Processing...
                    </span>
                  ) : (
                    "Confirm Reservation"
                  )}
                </button>
              </form>

              <div className="mb-12">
                <h2 className="text-2xl font-bold text-[#e4a00e] mb-4">
                  Modify Reservation
                </h2>
                <p className="text-gray-300 mb-4">
                  You can modify your reservation by entering your email and
                  reservation ID. Only fill in the fields you wish to change.
                </p>
                <form
                  onSubmit={handleModifySubmit}
                  className="space-y-6 bg-[#2a2826] p-8 rounded-lg shadow-xl"
                >
                  <div>
                    <label className="block text-[#e4a00e] mb-2">Email *</label>
                    <input
                      type="email"
                      name="modifyEmail"
                      required
                      value={modifyEmail}
                      onChange={(e) => setModifyEmail(e.target.value)}
                      className="w-full bg-[#1a1918] text-white px-4 py-2 rounded focus:ring-2 focus:ring-[#e4a00e] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[#e4a00e] mb-2">
                      Reservation ID *
                    </label>
                    <input
                      type="text"
                      name="reservationId"
                      required
                      value={reservationId}
                      onChange={(e) => setReservationId(e.target.value)}
                      className="w-full bg-[#1a1918] text-white px-4 py-2 rounded focus:ring-2 focus:ring-[#e4a00e] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[#e4a00e] mb-2">
                      New Date
                    </label>
                    <input
                      type="date"
                      name="newDate"
                      min={minDate}
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      className="w-full bg-[#1a1918] text-white px-4 py-2 rounded focus:ring-2 focus:ring-[#e4a00e] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[#e4a00e] mb-2">
                      New Time
                    </label>
                    <select
                      name="newTime"
                      value={newTime}
                      onChange={(e) => setNewTime(e.target.value)}
                      className="w-full bg-[#1a1918] text-white px-4 py-2 rounded focus:ring-2 focus:ring-[#e4a00e] focus:outline-none"
                    >
                      <option value="">Select a time</option>
                      {times.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#e4a00e] mb-2">
                      New Number of Guests
                    </label>
                    <select
                      name="newGuests"
                      value={newGuests}
                      onChange={(e) => setNewGuests(e.target.value)}
                      className="w-full bg-[#1a1918] text-white px-4 py-2 rounded focus:ring-2 focus:ring-[#e4a00e] focus:outline-none"
                    >
                      <option value="">Select number of guests</option>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? "guest" : "guests"}
                        </option>
                      ))}
                    </select>
                  </div>
                  {modifyError && (
                    <div className="bg-red-900/20 border border-red-500/20 p-4 rounded-lg text-red-400">
                      <i className="fas fa-exclamation-circle mr-2"></i>
                      {modifyError}
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={modifyLoading}
                    className="w-full bg-[#e4a00e] text-white py-3 rounded-lg hover:bg-[#c58c0c] transition-colors disabled:opacity-50"
                  >
                    {modifyLoading ? (
                      <span className="flex items-center justify-center">
                        <i className="fas fa-spinner fa-spin mr-2"></i>
                        Processing...
                      </span>
                    ) : (
                      "Update Reservation"
                    )}
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer1 />

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