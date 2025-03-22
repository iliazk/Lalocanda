"use client";
import React from "react";
import Footer1 from "../../components/footer-1";
import LanguageSwitcher from "../../components/language-switcher";
import Footer1 from "../../components/footer-1";
import LanguageSwitcher from "../../components/language-switcher";

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
  const [availableTimes, setAvailableTimes] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submissionStep, setSubmissionStep] = React.useState(null);
  const [showTimeout, setShowTimeout] = React.useState(false);
  const [submissionTimeout, setSubmissionTimeout] = React.useState(false);
  const [reservationSuccess, setReservationSuccess] = React.useState(false);
  const [submittedReservation, setSubmittedReservation] = React.useState(null);

  const getAvailableTimes = async (date) => {
    try {
      setLoading(true);
      const response = await fetch("/api/get-available-times", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date }),
      });

      if (!response.ok) {
        throw new Error("Failed to get available times");
      }

      const data = await response.json();
      if (data.error) {
        setError(data.error);
        return;
      }

      setAvailableTimes(Array.isArray(data.times) ? data.times : []);
      setError(null);
    } catch (err) {
      setError("Failed to get available times");
      console.error(err);
      setAvailableTimes([]);
    } finally {
      setLoading(false);
    }
  };

  const checkTableAvailability = async (date, time) => {
    if (!date || !time) return;

    try {
      setLoading(true);
      const response = await fetch("/api/check-table-availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

    if (name === "date") {
      getAvailableTimes(value);
      setFormData((prev) => ({ ...prev, time: "" }));
    }

    if (name === "time" && formData.date) {
      checkTableAvailability(formData.date, value);
    }
  };

  const validateForm = () => {
    setError(null);

    const requiredFields = {
      name: formData.name?.trim(),
      email: formData.email?.trim(),
      phone: formData.phone?.trim(),
      date: formData.date,
      time: formData.time,
      guests: formData.guests,
      tableNumber: formData.tableNumber,
    };

    const fieldLabels = {
      name: "Nimi",
      email: "Sähköposti",
      phone: "Puhelinnumero",
      guests: "Henkilömäärä",
      date: "Päivämäärä",
      time: "Aika",
      tableNumber: "Pöytänumero",
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([_, value]) => !value)
      .map(([field, _]) => fieldLabels[field]);

    if (missingFields.length > 0) {
      setError(`Täytä kaikki pakolliset kentät: ${missingFields.join(", ")}`);
      return false;
    }

    const guestsNum = parseInt(formData.guests);
    if (isNaN(guestsNum) || guestsNum < 1 || guestsNum > 10) {
      setError("Henkilömäärän tulee olla 1-10 välillä");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Virheellinen sähköpostiosoite");
      return false;
    }

    const phoneRegex = /^\+?[0-9\s-]{8,}$/;
    if (!phoneRegex.test(formData.phone)) {
      setError("Virheellinen puhelinnumero");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setReservationSuccess(false);
    setSubmittedReservation(null);
    setSubmissionStep(null);
    setShowTimeout(false);
    setSubmissionTimeout(false);

    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmissionStep("Luodaan varaus...");

      const reservationData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        date: formData.date,
        time: formData.time,
        guests: parseInt(formData.guests),
        tableNumber: parseInt(formData.tableNumber),
      };

      const timeoutId = setTimeout(() => {
        setShowTimeout(true);
      }, 10000);

      const response = await fetch("/api/create-reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reservationData),
      });

      clearTimeout(timeoutId);

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || "Varauksen luonti epäonnistui");
      }

      const end_time = new Date(
        new Date(`2000-01-01T${reservationData.time}`).getTime() +
          2 * 60 * 60 * 1000
      )
        .toTimeString()
        .slice(0, 5);

      setSubmittedReservation({
        ...reservationData,
        end_time,
      });
      setReservationSuccess(true);

      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        guests: "",
        tableNumber: "",
      });
      setAvailableTables([]);
      setTakenTables([]);
    } catch (err) {
      setError(err.message);
      setSubmissionTimeout(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  React.useEffect(() => {}, []);

  const handleNavigation = (e, path) => {
    e.preventDefault();
    window.location.href = path;
  };

  return (
    <div className="min-h-screen bg-[#1e1d1b]">
      <header className="bg-[#f5ae15] py-6 fixed w-full z-50 shadow-lg">
        <div className="container mx-auto px-6">
          <div className="flex justify-center mb-8">
            <a
              href="/"
              onClick={(e) => handleNavigation(e, "/")}
              className="flex items-center"
            >
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
                    href="/"
                    onClick={(e) => handleNavigation(e, "/")}
                    className="text-black hover:text-white transition-all duration-300 text-sm tracking-widest font-medium border-b-2 border-transparent hover:border-white px-4 py-2"
                  >
                    MEISTÄ
                  </a>
                </li>
                <li>
                  <a
                    href="/yhteystiedot"
                    onClick={(e) => handleNavigation(e, "/yhteystiedot")}
                    className="text-black hover:text-white transition-all duration-300 text-sm tracking-widest font-medium border-b-2 border-transparent hover:border-white px-4 py-2"
                  >
                    YHTEYSTIEDOT
                  </a>
                </li>
                <li>
                  <a
                    href="/varaukset"
                    onClick={(e) => handleNavigation(e, "/varaukset")}
                    className="text-black hover:text-white transition-all duration-300 text-sm tracking-widest font-medium border-b-2 border-transparent hover:border-white px-4 py-2"
                  >
                    PÖYTÄVARAUKSET
                  </a>
                </li>
                <li className="relative">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setIsOpen(!isOpen);
                    }}
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
                        href="/lounasbuffet"
                        onClick={(e) => handleNavigation(e, "/lounasbuffet")}
                        className="block px-6 py-4 text-black hover:text-white transition-all duration-300 text-sm border-b border-black/10 hover:bg-black/10"
                      >
                        LOUNASBUFFET
                      </a>
                      <a
                        href="/juomalista"
                        onClick={(e) => handleNavigation(e, "/juomalista")}
                        className="block px-6 py-4 text-black hover:text-white transition-all duration-300 text-sm border-b border-black/10 hover:bg-black/10"
                      >
                        JUOMALISTA
                      </a>
                      <a
                        href="/alacarte"
                        onClick={(e) => handleNavigation(e, "/alacarte")}
                        className="block px-6 py-4 text-black hover:text-white transition-all duration-300 text-sm hover:bg-black/10"
                      >
                        A LA CARTE
                      </a>
                    </div>
                  )}
                </li>
                <li>
                  <LanguageSwitcher currentLanguage="fi" />
                </li>
              </ul>
            </nav>
            <div className="flex items-center space-x-4">
              <button
                className="md:hidden text-black hover:text-white transition-colors duration-200"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(!isMobileMenuOpen);
                }}
              >
                <i
                  className={`fas ${
                    isMobileMenuOpen ? "fa-times" : "fa-bars"
                  } text-2xl`}
                ></i>
              </button>
              <div className="md:hidden">
                <LanguageSwitcher currentLanguage="fi" />
              </div>
            </div>
          </div>

          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 border-t border-black/10 pt-4">
              <nav className="flex flex-col space-y-4">
                <a
                  href="/"
                  onClick={(e) => handleNavigation(e, "/")}
                  className="text-black hover:text-white transition-colors duration-200"
                >
                  MEISTÄ
                </a>
                <a
                  href="/yhteystiedot"
                  onClick={(e) => handleNavigation(e, "/yhteystiedot")}
                  className="text-black hover:text-white transition-colors duration-200"
                >
                  YHTEYSTIEDOT
                </a>
                <a
                  href="/varaukset"
                  onClick={(e) => handleNavigation(e, "/varaukset")}
                  className="text-black hover:text-white transition-colors duration-200"
                >
                  PÖYTÄVARAUKSET
                </a>
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setIsOpen(!isOpen);
                    }}
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
                        href="/lounasbuffet"
                        onClick={(e) => handleNavigation(e, "/lounasbuffet")}
                        className="block text-black hover:text-white transition-colors duration-200"
                      >
                        LOUNASBUFFET
                      </a>
                      <a
                        href="/juomalista"
                        onClick={(e) => handleNavigation(e, "/juomalista")}
                        className="block text-black hover:text-white transition-colors duration-200"
                      >
                        JUOMALISTA
                      </a>
                      <a
                        href="/alacarte"
                        onClick={(e) => handleNavigation(e, "/alacarte")}
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

      <main className="container mx-auto px-4 pt-48 pb-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold text-[#f5ae15] text-center mb-8">
            Pöytävaraukset
          </h1>

          <div className="bg-[#252422] rounded-xl p-8 shadow-xl">
            <div className="mb-8">
              <label className="block text-[#f5ae15] text-lg mb-2">
                Valitse päivämäärä
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                className="w-full bg-[#1e1d1b] text-white border border-gray-700 rounded-lg p-3 focus:border-[#f5ae15] focus:outline-none"
                min={new Date().toISOString().split("T")[0]}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-8">
              <label className="block text-[#f5ae15] text-lg mb-2">
                Valitse aika (2 tunnin varaus)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {[
                  "11:00",
                  "12:00",
                  "13:00",
                  "14:00",
                  "15:00",
                  "16:00",
                  "17:00",
                  "18:00",
                  "19:00",
                  "20:00",
                  "21:00",
                ].map((time) => {
                  const isAvailable =
                    !loading &&
                    (!availableTimes.length ||
                      availableTimes.includes(time + ":00"));
                  const isSelected = formData.time === time + ":00";

                  return (
                    <button
                      key={time}
                      onClick={() =>
                        isAvailable &&
                        handleInputChange({
                          target: { name: "time", value: time + ":00" },
                        })
                      }
                      disabled={!isAvailable || !formData.date}
                      className={`
                        p-3 text-center rounded-lg transition-all duration-200 relative
                        ${
                          isSelected
                            ? "bg-[#f5ae15] text-black"
                            : isAvailable && formData.date
                            ? "bg-[#1e1d1b] text-white border border-gray-700 hover:bg-[#f5ae15] hover:text-black"
                            : "bg-[#1e1d1b] text-gray-500 border border-gray-600 cursor-not-allowed"
                        }
                      `}
                    >
                      {time}
                      {!isAvailable && formData.date && (
                        <i className="fas fa-times-circle absolute top-1 right-1 text-xs text-gray-500"></i>
                      )}
                    </button>
                  );
                })}
              </div>
              {loading && (
                <div className="text-[#f5ae15] text-center mt-2">
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Tarkistetaan aikoja...
                </div>
              )}
            </div>

            {loading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#f5ae15] border-t-transparent"></div>
                <p className="text-[#f5ae15] mt-4">
                  Tarkistetaan vapaita pöytiä...
                </p>
              </div>
            ) : (
              <>
                {!formData.date && (
                  <div className="text-[#f5ae15] text-center p-4">
                    Valitse ensin päivämäärä ja aika nähdäksesi vapaat pöydät
                  </div>
                )}
                {formData.date && formData.time && (
                  <div className="bg-[#1e1d1b] p-4 rounded-lg mb-8">
                    <h3 className="text-[#f5ae15] text-lg mb-2">
                      Valittu aika:
                    </h3>
                    <p className="text-white">
                      {new Date(formData.date).toLocaleDateString("fi-FI")} klo{" "}
                      {formData.time}
                    </p>
                  </div>
                )}

                <div className="mb-8">
                  <label className="block text-[#f5ae15] text-lg mb-2">
                    Valitse pöytä
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {Array.from({ length: 50 }, (_, i) => i + 1).map(
                      (tableId) => {
                        const isTaken = takenTables.includes(tableId);
                        const isSelected =
                          formData.tableNumber === tableId.toString();

                        return (
                          <button
                            key={tableId}
                            disabled={
                              isTaken || !formData.date || !formData.time
                            }
                            onClick={() => {
                              if (!isTaken && formData.date && formData.time) {
                                setFormData((prev) => ({
                                  ...prev,
                                  tableNumber: tableId.toString(),
                                }));
                                console.log("Selected table:", tableId);
                              }
                            }}
                            className={`
            p-3 text-center rounded-lg transition-all duration-200
            ${
              isSelected
                ? "bg-[#f5ae15] text-black transform scale-105"
                : isTaken
                ? "bg-red-500/20 text-red-200 cursor-not-allowed"
                : "bg-[#1e1d1b] text-white border border-gray-700 hover:bg-[#f5ae15] hover:text-black"
            }
            ${
              !formData.date || !formData.time
                ? "opacity-50 cursor-not-allowed"
                : ""
            }
          `}
                          >
                            Pöytä {tableId}
                          </button>
                        );
                      }
                    )}
                  </div>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4 mb-8">
                  <div>
                    <label className="block text-[#f5ae15] text-lg mb-2">
                      Nimi*
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-[#1e1d1b] text-white border border-gray-700 rounded-lg p-3 focus:border-[#f5ae15] focus:outline-none"
                      placeholder="Kirjoita nimesi"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[#f5ae15] text-lg mb-2">
                      Sähköposti*
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-[#1e1d1b] text-white border border-gray-700 rounded-lg p-3 focus:border-[#f5ae15] focus:outline-none"
                      placeholder="esimerkki@email.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[#f5ae15] text-lg mb-2">
                      Puhelinnumero*
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-[#1e1d1b] text-white border border-gray-700 rounded-lg p-3 focus:border-[#f5ae15] focus:outline-none"
                      placeholder="+358 XX XXX XXXX"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[#f5ae15] text-lg mb-2">
                      Henkilömäärä*
                    </label>
                    <input
                      type="number"
                      name="guests"
                      value={formData.guests}
                      min="1"
                      max="10"
                      onChange={handleInputChange}
                      className="w-full bg-[#1e1d1b] text-white border border-gray-700 rounded-lg p-3 focus:border-[#f5ae15] focus:outline-none"
                      placeholder="Syötä henkilömäärä"
                      required
                    />
                  </div>

                  {error && (
                    <div className="bg-red-900/20 text-red-400 p-3 rounded-lg text-center">
                      <i className="fas fa-exclamation-circle mr-2"></i>
                      {error}
                      {submissionTimeout && (
                        <button
                          onClick={handleSubmit}
                          className="ml-4 underline hover:no-underline"
                        >
                          Yritä uudelleen
                        </button>
                      )}
                    </div>
                  )}

                  {reservationSuccess && submittedReservation && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                      <div className="bg-[#252422] rounded-lg p-6 max-w-md w-full">
                        <div className="text-center mb-6">
                          <div className="text-green-600 text-5xl mb-4">
                            <i className="fas fa-check-circle"></i>
                          </div>
                          <h3 className="text-2xl font-bold text-[#f5ae15] mb-2">
                            Varaus onnistui!
                          </h3>
                        </div>

                        <div className="space-y-4 mb-6">
                          <div className="flex items-center gap-3">
                            <i className="fas fa-user text-[#f5ae15] w-6"></i>
                            <span className="text-white">
                              {submittedReservation.name}
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            <i className="fas fa-calendar text-[#f5ae15] w-6"></i>
                            <span className="text-white">
                              {new Date(
                                submittedReservation.date
                              ).toLocaleDateString("fi-FI")}
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            <i className="fas fa-clock text-[#f5ae15] w-6"></i>
                            <span className="text-white">
                              {submittedReservation.time} -{" "}
                              {submittedReservation.end_time}
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            <i className="fas fa-users text-[#f5ae15] w-6"></i>
                            <span className="text-white">
                              {submittedReservation.guests} henkilöä
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            <i className="fas fa-phone text-[#f5ae15] w-6"></i>
                            <span className="text-white">
                              {submittedReservation.phone}
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            <i className="fas fa-envelope text-[#f5ae15] w-6"></i>
                            <span className="text-white">
                              {submittedReservation.email}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            setReservationSuccess(false);
                            setSubmittedReservation(null);
                          }}
                          className="w-full bg-[#f5ae15] text-black py-3 rounded-lg hover:bg-[#e4a00e] transition-colors"
                        >
                          Sulje
                        </button>
                      </div>
                    </div>
                  )}

                  {showTimeout && !submissionTimeout && (
                    <div className="bg-yellow-900/20 text-yellow-400 p-3 rounded-lg text-center">
                      <i className="fas fa-clock mr-2"></i>
                      Tämä kestää odotettua kauemmin...
                    </div>
                  )}

                  {submissionStep && (
                    <div className="bg-[#1e1d1b] p-3 rounded-lg text-center">
                      <i className="fas fa-spinner fa-spin mr-2 text-[#f5ae15]"></i>
                      <span className="text-[#f5ae15]">{submissionStep}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#f5ae15] text-black font-bold py-4 px-6 rounded-lg transition-all duration-200 hover:bg-[#e4a00e] transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <i className="fas fa-spinner fa-spin mr-2"></i>
                        Varausta käsitellään...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-check mr-2"></i>
                        Vahvista Varaus
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>

          <div className="mt-8 bg-[#252422] rounded-xl p-6 text-white/80">
            <h3 className="text-[#f5ae15] text-lg mb-2">Huomioitavaa:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Varauksen kesto on 2 tuntia</li>
              <li>Saat vahvistuksen sähköpostiisi</li>
              <li>Peruutukset viimeistään 24h ennen varausta</li>
              <li>Jos tarvitset apua, soita numeroon: +358 50 549 5607</li>
            </ul>
          </div>
        </div>
      </main>

      <Footer1 />
    </div>
  );
}

export default MainComponent;