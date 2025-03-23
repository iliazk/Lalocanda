"use client";
import React from "react";

function MainComponent() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
    tableNumber: "",
  });
  const [availableTables, setAvailableTables] = React.useState([]);
  const [takenTables, setTakenTables] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const checkTableAvailability = async (date, time) => {
    if (!date || !time) return;

    try {
      setLoading(true);
      const response = await fetch("/api/en/check-table-availability", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date, time }),
      });

      if (!response.ok) {
        throw new Error("Failed to check table availability");
      }

      const data = await response.json();
      if (data.error) {
        setError(data.error);
        return;
      }

      setAvailableTables(data.available);
      setTakenTables(data.taken);
      setError(null);
    } catch (err) {
      setError("Failed to check table availability");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (
      (name === "date" || name === "time") &&
      formData.date &&
      formData.time
    ) {
      checkTableAvailability(
        name === "date" ? value : formData.date,
        name === "time" ? value : formData.time
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (takenTables.includes(Number(formData.tableNumber))) {
      setError("Selected table is not available");
      return;
    }
    window.location.href = `mailto:iliazk@protonmail.com?subject=Table Reservation&body=Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0APhone: ${formData.phone}%0D%0ADate: ${formData.date}%0D%0ATime: ${formData.time}%0D%0AGuests: ${formData.guests}%0D%0ATable Number: ${formData.tableNumber}`;
  };

  return (
    <div className="flex min-h-screen flex-col">
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
              <ul className="flex justify-center space-x-12">
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
                    <div className="absolute mt-2 w-56 bg-[#f5ae15] rounded-lg shadow-2xl border border-black/10 animate-[fadeIn_0.3s_ease-out]">
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
                        LUNCH BUFFET
                      </a>
                      <a
                        href="/en/drinks"
                        className="block text-black hover:text-white transition-colors duration-200"
                      >
                        DRINKS
                      </a>
                      <a
                        href="/en/alacarte"
                        className="block text-black hover:text-white transition-colors duration-200"
                      >
                        A LA CARTE
                      </a>
                    </div>
                  )}
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 mt-32 max-w-4xl">
        <h1 className="text-4xl font-bold text-[#e4a00e] text-center mb-8">
          Table Reservation
        </h1>

        <div className="flex justify-center mb-12">
          <div className="flex flex-col md:flex-row items-center md:space-x-8 space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div
                className={`rounded-full h-12 w-12 flex items-center justify-center text-lg font-bold ${
                  !formData.tableNumber
                    ? "bg-[#e4a00e] text-white"
                    : "bg-[#4ade80] text-white"
                }`}
              >
                1
              </div>
              <div className="flex flex-col">
                <span className="text-[#e4a00e] font-semibold">Step 1</span>
                <span className="text-white">Choose table</span>
              </div>
            </div>

            <div className="hidden md:block h-1 w-16 bg-gray-600 mt-6"></div>

            <div className="flex items-center space-x-4">
              <div
                className={`rounded-full h-12 w-12 flex items-center justify-center text-lg font-bold ${
                  formData.tableNumber
                    ? "bg-[#e4a00e] text-white"
                    : "bg-gray-600 text-white"
                }`}
              >
                2
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400 font-semibold">Step 2</span>
                <span className="text-white">Fill details</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#2a2826] rounded-xl p-6 mb-8 shadow-lg">
          <h2 className="text-xl text-[#e4a00e] mb-6">Select date and time</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-2">
              <label className="block text-[#e4a00e] text-sm mb-1">Date*</label>
              <input
                type="date"
                name="date"
                required
                onChange={handleInputChange}
                className="w-full rounded-lg bg-[#1e1d1b] p-4 text-white border border-gray-600 focus:border-[#e4a00e] focus:outline-none focus:ring-2 focus:ring-[#e4a00e]/50"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-[#e4a00e] text-sm mb-1">Time*</label>
              <input
                type="time"
                name="time"
                required
                onChange={handleInputChange}
                className="w-full rounded-lg bg-[#1e1d1b] p-4 text-white border border-gray-600 focus:border-[#e4a00e] focus:outline-none focus:ring-2 focus:ring-[#e4a00e]/50"
              />
            </div>
          </div>

          <div className="flex justify-center gap-6 mb-6">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-green-500"></div>
              <span className="text-white">Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-red-500"></div>
              <span className="text-white">Reserved</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-[#e4a00e]"></div>
              <span className="text-white">Selected</span>
            </div>
          </div>

          {error && (
            <div className="mb-4 text-center text-red-500">
              {error === "Selected table is not available"
                ? "Selected table is not available"
                : error}
            </div>
          )}

          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#e4a00e] border-t-transparent"></div>
              <p className="text-[#e4a00e] mt-4">
                Checking available tables...
              </p>
            </div>
          ) : (
            <>
              <h3 className="text-[#e4a00e] mb-4 font-medium">
                Select a table from the restaurant:
              </h3>
              <div className="grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-3">
                {Array.from({ length: 50 }, (_, i) => i + 1).map((tableId) => {
                  const isAvailable = availableTables.includes(tableId);
                  const isTaken = takenTables.includes(tableId);
                  const isSelected = Number(formData.tableNumber) === tableId;

                  return (
                    <button
                      key={tableId}
                      disabled={isTaken || !formData.date || !formData.time}
                      onClick={() => {
                        if (!isTaken && formData.date && formData.time) {
                          setFormData((prev) => ({
                            ...prev,
                            tableNumber: tableId.toString(),
                          }));
                        }
                      }}
                      className={`
                        relative h-14 rounded-lg text-center transition-all duration-300
                        ${
                          isSelected
                            ? "bg-[#e4a00e] text-white ring-2 ring-white scale-110 transform"
                            : isTaken
                            ? "bg-red-500/20 text-red-200 cursor-not-allowed"
                            : "bg-green-500/20 text-green-200 hover:bg-green-500/30 hover:scale-105 transform"
                        }
                        ${
                          !formData.date || !formData.time
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }
                      `}
                    >
                      <span className="absolute inset-0 flex items-center justify-center font-medium">
                        {tableId}
                      </span>
                      {isSelected && (
                        <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-white flex items-center justify-center">
                          <i className="fas fa-check text-[#e4a00e] text-xs"></i>
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {(!formData.date || !formData.time) && (
                <div className="mt-4 text-center text-yellow-200/80 bg-yellow-900/20 p-3 rounded-lg">
                  <i className="fas fa-info-circle mr-2"></i>
                  Please select a date and time first to see available tables
                </div>
              )}
            </>
          )}
        </div>

        {formData.tableNumber && (
          <div className="bg-[#2a2826] rounded-xl p-6 shadow-lg animate-fadeIn">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl text-[#e4a00e]">Reservation Details</h2>
              <div className="bg-[#e4a00e]/20 text-[#e4a00e] px-4 py-2 rounded-lg">
                Table {formData.tableNumber}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Name*"
                  onChange={handleInputChange}
                  className="w-full rounded-lg bg-[#1e1d1b] p-4 text-white border border-gray-600 focus:border-[#e4a00e] focus:outline-none focus:ring-2 focus:ring-[#e4a00e]/50"
                />

                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email*"
                  onChange={handleInputChange}
                  className="w-full rounded-lg bg-[#1e1d1b] p-4 text-white border border-gray-600 focus:border-[#e4a00e] focus:outline-none focus:ring-2 focus:ring-[#e4a00e]/50"
                />

                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="Phone number*"
                  onChange={handleInputChange}
                  className="w-full rounded-lg bg-[#1e1d1b] p-4 text-white border border-gray-600 focus:border-[#e4a00e] focus:outline-none focus:ring-2 focus:ring-[#e4a00e]/50"
                />

                <input
                  type="number"
                  name="guests"
                  required
                  min="1"
                  max="10"
                  placeholder="Number of guests*"
                  onChange={handleInputChange}
                  className="w-full rounded-lg bg-[#1e1d1b] p-4 text-white border border-gray-600 focus:border-[#e4a00e] focus:outline-none focus:ring-2 focus:ring-[#e4a00e]/50"
                />
              </div>

              {error && (
                <div className="bg-red-900/20 text-red-400 p-3 rounded-lg text-center">
                  <i className="fas fa-exclamation-circle mr-2"></i>
                  {error}
                </div>
              )}

              <div className="text-center pt-4">
                <button
                  type="submit"
                  className="bg-[#e4a00e] text-white px-8 py-4 rounded-lg hover:bg-[#c88f0d] transition-all duration-300 hover:scale-105 transform focus:outline-none focus:ring-2 focus:ring-[#e4a00e]/50"
                >
                  <i className="fas fa-check mr-2"></i>
                  Confirm Reservation
                </button>
              </div>
            </form>
          </div>
        )}
      </main>

      <></>
    </div>
  );
}

export default MainComponent;