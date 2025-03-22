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

  const [formData, setFormData] = useState({
    customer_name: "",
    customer_email: "",
    phone: "",
    reservation_date: "",
    reservation_time: "",
    guests: 1,
  });
  const [loading, setLoading] = useState(false);
  const [timeLoading, setTimeLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleDateChange = (e) => {
    const date = e.target.value;
    setFormData((prev) => ({ ...prev, reservation_date: date }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/create-reservation", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create reservation");
      }

      setSuccess(true);
      setFormData({
        customer_name: "",
        customer_email: "",
        phone: "",
        reservation_date: "",
        reservation_time: "",
        guests: 1,
      });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError("Could not create reservation. Please try again.");
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
            <a href="/" className="flex items-center">
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
                    href="/"
                    className="text-black hover:text-white transition-all duration-300 text-sm tracking-widest font-medium border-b-2 border-transparent hover:border-white"
                  >
                    MEISTÄ
                  </a>
                </li>
                <li>
                  <a
                    href="/yhteystiedot"
                    className="text-black hover:text-white transition-all duration-300 text-sm tracking-widest font-medium border-b-2 border-transparent hover:border-white"
                  >
                    YHTEYSTIEDOT
                  </a>
                </li>
                <li>
                  <a
                    href="/varaukset"
                    className="text-black hover:text-white transition-all duration-300 text-sm tracking-widest font-medium border-b-2 border-transparent hover:border-white"
                  >
                    PÖYTÄVARAUKSET
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
                    <div className="absolute mt-4 w-56 bg-[#f5ae15] rounded-lg shadow-2xl border border-black/10 animate-[fadeIn_0.3s_ease-out]">
                      <a
                        href="/lounasbuffet"
                        className="block px-6 py-4 text-black hover:text-white transition-all duration-300 text-sm border-b border-black/10 hover:bg-black/10"
                      >
                        LOUNASBUFFET
                      </a>
                      <a
                        href="/juomalista"
                        className="block px-6 py-4 text-black hover:text-white transition-all duration-300 text-sm border-b border-black/10 hover:bg-black/10"
                      >
                        JUOMALISTA
                      </a>
                      <a
                        href="/alacarte"
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
        </div>
      </header>

      <main className="container mx-auto px-6 pt-40 pb-16">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-5xl font-bold text-[#e4a00e] text-center mb-12">
            Pöytävaraus
          </h1>

          <div className="bg-[#2a2826] p-8 rounded-xl shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[#e4a00e] mb-2">Nimi</label>
                <input
                  type="text"
                  name="customer_name"
                  required
                  value={formData.customer_name}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      customer_name: e.target.value,
                    }))
                  }
                  className="w-full bg-[#1a1918] text-white px-4 py-2 rounded"
                />
              </div>
              <div>
                <label className="block text-[#e4a00e] mb-2">Sähköposti</label>
                <input
                  type="email"
                  name="customer_email"
                  required
                  value={formData.customer_email}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      customer_email: e.target.value,
                    }))
                  }
                  className="w-full bg-[#1a1918] text-white px-4 py-2 rounded"
                />
              </div>
              <div>
                <label className="block text-[#e4a00e] mb-2">Puhelin</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  className="w-full bg-[#1a1918] text-white px-4 py-2 rounded"
                />
              </div>
              <div>
                <label className="block text-[#e4a00e] mb-2">Päivämäärä</label>
                <input
                  type="date"
                  name="reservation_date"
                  required
                  value={formData.reservation_date}
                  onChange={handleDateChange}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full bg-[#1a1918] text-white px-4 py-2 rounded"
                />
              </div>
              <div>
                <label className="block text-[#e4a00e] mb-2">Aika</label>
                <select
                  name="reservation_time"
                  required
                  value={formData.reservation_time}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      reservation_time: e.target.value,
                    }))
                  }
                  className="w-full bg-[#1a1918] text-white px-4 py-2 rounded"
                  disabled={!formData.reservation_date}
                >
                  <option value="">Valitse aika</option>
                  {generateTimeSlots().map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[#e4a00e] mb-2">
                  Henkilömäärä
                </label>
                <input
                  type="number"
                  name="guests"
                  required
                  min="1"
                  max="10"
                  value={formData.guests}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      guests: parseInt(e.target.value),
                    }))
                  }
                  className="w-full bg-[#1a1918] text-white px-4 py-2 rounded"
                />
              </div>

              {error && (
                <div className="bg-red-900/20 border border-red-500/20 text-red-400 p-4 rounded-lg">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-900/20 border border-green-500/20 text-green-400 p-4 rounded-lg">
                  Varaus onnistui! Vahvistus on lähetetty sähköpostiisi.
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#e4a00e] text-black py-3 rounded hover:bg-[#c58c0c] transition-colors disabled:opacity-50"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-2"></div>
                    Käsitellään...
                  </div>
                ) : (
                  "Tee Varaus"
                )}
              </button>
            </form>
          </div>
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