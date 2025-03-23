"use client";
import React from "react";
import Footer1 from "../../components/footer-1";
import LanguageSwitcher from "../../components/language-switcher";
import Footer1 from "../../components/footer-1";
import LanguageSwitcher from "../../components/language-switcher";

function MainComponent() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [guests, setGuests] = useState("");
  const [availableTimes, setAvailableTimes] = useState([]);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [cancelEmail, setCancelEmail] = useState("");
  const [reservationId, setReservationId] = useState("");
  const [cancelLoading, setCancelLoading] = useState(false);
  const [cancelError, setCancelError] = useState(null);
  const [cancelSuccess, setCancelSuccess] = useState(false);
  const [updateEmail, setUpdateEmail] = useState("");
  const [updateReservationId, setUpdateReservationId] = useState("");
  const [updateDate, setUpdateDate] = useState("");
  const [updateTime, setUpdateTime] = useState("");
  const [updateGuests, setUpdateGuests] = useState("");
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const fetchAvailableTimes = async (selectedDate) => {
    try {
      setBookingLoading(true);
      const response = await fetch("/api/get-available-times", {
        method: "POST",
        body: JSON.stringify({ date: selectedDate }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch available times");
      }
      const data = await response.json();
      setAvailableTimes(data.availableTimes || []);
    } catch (err) {
      setBookingError("Could not load available times. Please try again.");
      console.error(err);
    } finally {
      setBookingLoading(false);
    }
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    try {
      setBookingLoading(true);
      setBookingError(null);

      const response = await fetch("/api/create-reservation2", {
        method: "POST",
        body: JSON.stringify({
          customer_name: customerName,
          customer_email: customerEmail,
          phone,
          reservation_date: date,
          reservation_time: time,
          guests: parseInt(guests),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create reservation");
      }

      setBookingSuccess(true);
    } catch (err) {
      setBookingError("Could not create reservation. Please try again.");
      console.error(err);
    } finally {
      setBookingLoading(false);
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      setUpdateLoading(true);
      setUpdateError(null);

      const response = await fetch("/api/update-reservation", {
        method: "POST",
        body: JSON.stringify({
          email: updateEmail,
          reservation_id: updateReservationId,
          new_date: updateDate || undefined,
          new_time: updateTime || undefined,
          new_guests: updateGuests ? parseInt(updateGuests) : undefined,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update reservation");
      }

      setUpdateSuccess(true);
    } catch (err) {
      setUpdateError("Could not update reservation. Please try again.");
      console.error(err);
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleCancelSubmit = async (e) => {
    e.preventDefault();
    try {
      setCancelLoading(true);
      setCancelError(null);

      const response = await fetch("/api/cancel-reservation", {
        method: "POST",
        body: JSON.stringify({
          email: cancelEmail,
          reservation_id: reservationId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to cancel reservation");
      }

      setCancelSuccess(true);
    } catch (err) {
      setCancelError("Could not cancel reservation. Please try again.");
      console.error(err);
    } finally {
      setCancelLoading(false);
    }
  };

  useEffect(() => {
    if (date) {
      fetchAvailableTimes(date);
    }
  }, [date]);

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
                <li>
                  <LanguageSwitcher currentLanguage="fi" />
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 pt-40 pb-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-[#e4a00e] text-center mb-12">
            Pöytävaraukset
          </h1>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-bold text-[#e4a00e] mb-6">
                Tee varaus
              </h2>
              <div className="prose prose-invert mb-8">
                <p>
                  Varaukset ovat kahden tunnin mittaisia. Täytä alla olevat
                  tiedot tehdäksesi varauksen.
                </p>
              </div>

              {bookingSuccess ? (
                <div className="bg-green-900/20 border border-green-500/20 p-8 rounded-xl text-center">
                  <i className="fas fa-check-circle text-green-400 text-4xl mb-4"></i>
                  <h2 className="text-2xl font-semibold text-green-400 mb-4">
                    Varaus vahvistettu!
                  </h2>
                  <p className="text-white">
                    Vahvistus on lähetetty sähköpostiisi.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Nimi"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-[#1e1d1b] text-white p-4 rounded-lg border border-[#e4a00e]/20 focus:border-[#e4a00e] focus:outline-none"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Sähköposti"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full bg-[#1e1d1b] text-white p-4 rounded-lg border border-[#e4a00e]/20 focus:border-[#e4a00e] focus:outline-none"
                      required
                    />
                    <input
                      type="tel"
                      placeholder="Puhelinnumero"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#1e1d1b] text-white p-4 rounded-lg border border-[#e4a00e]/20 focus:border-[#e4a00e] focus:outline-none"
                      required
                    />
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full bg-[#1e1d1b] text-white p-4 rounded-lg border border-[#e4a00e]/20 focus:border-[#e4a00e] focus:outline-none"
                      required
                    />
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full bg-[#1e1d1b] text-white p-4 rounded-lg border border-[#e4a00e]/20 focus:border-[#e4a00e] focus:outline-none"
                      required
                    >
                      <option value="">Valitse aika</option>
                      {availableTimes.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      placeholder="Henkilömäärä"
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full bg-[#1e1d1b] text-white p-4 rounded-lg border border-[#e4a00e]/20 focus:border-[#e4a00e] focus:outline-none"
                      required
                    />
                  </div>

                  {bookingError && (
                    <div className="bg-red-900/20 border border-red-500/20 p-4 rounded-lg text-red-400">
                      <i className="fas fa-exclamation-circle mr-2"></i>
                      {bookingError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={bookingLoading}
                    className="w-full bg-[#e4a00e] text-black px-6 py-4 rounded-lg font-semibold hover:bg-[#c58c0c] transition-all duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed"
                  >
                    {bookingLoading ? (
                      <span className="flex items-center justify-center">
                        <i className="fas fa-spinner fa-spin mr-2"></i>
                        Käsitellään...
                      </span>
                    ) : (
                      "Tee varaus"
                    )}
                  </button>
                </form>
              )}
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-[#e4a00e] mb-6">
                  Peruuta varaus
                </h2>
                <div className="prose prose-invert mb-8">
                  <p>
                    Jos haluat peruuttaa olemassa olevan varauksen, täytä alla
                    olevat tiedot.
                  </p>
                </div>

                {cancelSuccess ? (
                  <div className="bg-green-900/20 border border-green-500/20 p-8 rounded-xl text-center">
                    <i className="fas fa-check-circle text-green-400 text-4xl mb-4"></i>
                    <h2 className="text-2xl font-semibold text-green-400 mb-4">
                      Varaus peruttu!
                    </h2>
                    <p className="text-white">
                      Vahvistus on lähetetty sähköpostiisi.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleCancelSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <input
                        type="email"
                        placeholder="Sähköposti"
                        value={cancelEmail}
                        onChange={(e) => setCancelEmail(e.target.value)}
                        className="w-full bg-[#1e1d1b] text-white p-4 rounded-lg border border-[#e4a00e]/20 focus:border-[#e4a00e] focus:outline-none"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Varausnumero"
                        value={reservationId}
                        onChange={(e) => setReservationId(e.target.value)}
                        className="w-full bg-[#1e1d1b] text-white p-4 rounded-lg border border-[#e4a00e]/20 focus:border-[#e4a00e] focus:outline-none"
                        required
                      />
                    </div>

                    {cancelError && (
                      <div className="bg-red-900/20 border border-red-500/20 p-4 rounded-lg text-red-400">
                        <i className="fas fa-exclamation-circle mr-2"></i>
                        {cancelError}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={cancelLoading}
                      className="w-full bg-red-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-red-700 transition-all duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed"
                    >
                      {cancelLoading ? (
                        <span className="flex items-center justify-center">
                          <i className="fas fa-spinner fa-spin mr-2"></i>
                          Käsitellään...
                        </span>
                      ) : (
                        "Peruuta varaus"
                      )}
                    </button>
                  </form>
                )}
              </div>

              <div>
                <h2 className="text-3xl font-bold text-[#e4a00e] mb-6">
                  Muokkaa varausta
                </h2>
                <div className="prose prose-invert mb-8">
                  <p>
                    Voit muuttaa varaustasi syöttämällä sähköpostiosoitteesi ja
                    varausnumerosi. Täytä vain ne kentät, joita haluat muuttaa.
                  </p>
                </div>

                {updateSuccess ? (
                  <div className="bg-green-900/20 border border-green-500/20 p-8 rounded-xl text-center">
                    <i className="fas fa-check-circle text-green-400 text-4xl mb-4"></i>
                    <h2 className="text-2xl font-semibold text-green-400 mb-4">
                      Varaus päivitetty!
                    </h2>
                    <p className="text-white">
                      Vahvistus on lähetetty sähköpostiisi.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleUpdateSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <input
                        type="email"
                        placeholder="Sähköposti"
                        value={updateEmail}
                        onChange={(e) => setUpdateEmail(e.target.value)}
                        className="w-full bg-[#1e1d1b] text-white p-4 rounded-lg border border-[#e4a00e]/20 focus:border-[#e4a00e] focus:outline-none"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Varausnumero"
                        value={updateReservationId}
                        onChange={(e) => setUpdateReservationId(e.target.value)}
                        className="w-full bg-[#1e1d1b] text-white p-4 rounded-lg border border-[#e4a00e]/20 focus:border-[#e4a00e] focus:outline-none"
                        required
                      />
                      <input
                        type="date"
                        value={updateDate}
                        onChange={(e) => setUpdateDate(e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full bg-[#1e1d1b] text-white p-4 rounded-lg border border-[#e4a00e]/20 focus:border-[#e4a00e] focus:outline-none"
                      />
                      <select
                        value={updateTime}
                        onChange={(e) => setUpdateTime(e.target.value)}
                        className="w-full bg-[#1e1d1b] text-white p-4 rounded-lg border border-[#e4a00e]/20 focus:border-[#e4a00e] focus:outline-none"
                      >
                        <option value="">Valitse uusi aika</option>
                        {availableTimes.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        placeholder="Uusi henkilömäärä"
                        value={updateGuests}
                        onChange={(e) => setUpdateGuests(e.target.value)}
                        className="w-full bg-[#1e1d1b] text-white p-4 rounded-lg border border-[#e4a00e]/20 focus:border-[#e4a00e] focus:outline-none"
                      />
                    </div>

                    {updateError && (
                      <div className="bg-red-900/20 border border-red-500/20 p-4 rounded-lg text-red-400">
                        <i className="fas fa-exclamation-circle mr-2"></i>
                        {updateError}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={updateLoading}
                      className="w-full bg-[#e4a00e] text-black px-6 py-4 rounded-lg font-semibold hover:bg-[#c58c0c] transition-all duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed"
                    >
                      {updateLoading ? (
                        <span className="flex items-center justify-center">
                          <i className="fas fa-spinner fa-spin mr-2"></i>
                          Käsitellään...
                        </span>
                      ) : (
                        "Päivitä varaus"
                      )}
                    </button>
                  </form>
                )}
              </div>

              <div className="bg-[#2a2826] p-6 rounded-xl">
                <p className="text-white text-sm">
                  Huom: Varauksesi tiedot poistetaan automaattisesti kaksi
                  tuntia varauksen päättymisen jälkeen.
                </p>
              </div>
            </div>
          </div>
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