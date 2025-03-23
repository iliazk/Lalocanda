"use client";
import React from "react";
import Footer1 from "../../components/footer-1";
import LanguageSwitcher from "../../components/language-switcher";
import Footer1 from "../../components/footer-1";
import LanguageSwitcher from "../../components/language-switcher";

function MainComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-[#1e1d1b] text-white">
      <header className="bg-[#f5ae15] py-6 fixed w-full z-50 shadow-lg">
        <div className="container mx-auto px-6">
          <div className="flex justify-center mb-8">
            <a href="/" className="flex items-center">
              <img
                src="https://ucarecdn.com/fa201ac0-28b4-4ab7-8968-6311c7a7e733/-/format/auto/"
                alt="La Locanda Logo"
                className="h-28 w-auto transition-transform duration-300 hover:scale-105"
              />
            </a>
          </div>
          <div className="flex items-center justify-between mt-4">
            <nav className="hidden md:block flex-1">
              <ul className="flex justify-center space-x-12">
                <li>
                  <a
                    href="/"
                    className="text-black hover:text-white transition-all duration-300 text-sm tracking-widest font-medium border-b-2 border-transparent hover:border-white px-4 py-2"
                  >
                    MEISTÄ
                  </a>
                </li>
                <li>
                  <a
                    href="/yhteystiedot"
                    className="text-black hover:text-white transition-all duration-300 text-sm tracking-widest font-medium border-b-2 border-transparent hover:border-white px-4 py-2"
                  >
                    YHTEYSTIEDOT
                  </a>
                </li>
                <li>
                  <a
                    href="/varaukset"
                    className="text-black hover:text-white transition-all duration-300 text-sm tracking-widest font-medium border-b-2 border-transparent hover:border-white px-4 py-2"
                  >
                    PÖYTÄVARAUKSET
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
            <div className="flex items-center space-x-4">
              <LanguageSwitcher currentLanguage="fi" />
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

          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 border-t border-black/10 pt-4">
              <nav className="flex flex-col space-y-4">
                <a
                  href="/"
                  className="text-black hover:text-white transition-colors duration-200"
                >
                  MEISTÄ
                </a>
                <a
                  href="/yhteystiedot"
                  className="text-black hover:text-white transition-colors duration-200"
                >
                  YHTEYSTIEDOT
                </a>
                <a
                  href="/varaukset"
                  className="text-black hover:text-white transition-colors duration-200"
                >
                  PÖYTÄVARAUKSET
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
                        href="/lounasbuffet"
                        className="block text-black hover:text-white transition-colors duration-200"
                      >
                        LOUNASBUFFET
                      </a>
                      <a
                        href="/juomalista"
                        className="block text-black hover:text-white transition-colors duration-200"
                      >
                        JUOMALISTA
                      </a>
                      <a
                        href="/alacarte"
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

      <main className="container mx-auto px-6 py-28 max-w-6xl">
        <h1 className="mb-16 text-center text-5xl font-crimson-text text-[#e4a00e] tracking-wide">
          VIINI JA JUOMALISTA – LA LOCANDA
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          <section className="p-6 bg-[#1a1918] rounded-lg shadow-xl">
            <h2 className="mb-8 text-3xl font-crimson-text text-[#e4a00e] border-b border-[#e4a00e]/20 pb-4">
              VIINIT (WINES)
            </h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-crimson-text mb-4 text-[#e4a00e] border-b border-[#e4a00e]/20 pb-2">
                  KUOHUVIINI (SPARKLING WINES)
                </h3>
                <div className="space-y-6">
                  {[
                    {
                      name: "Prosecco DOC Cornaro Veneto (75cl)",
                      price: "41,00",
                    },
                    { name: "Prosecco Piccolo Italia (20cl)", price: "12,90" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="group hover:bg-[#252321] p-4 rounded-lg transition-colors duration-200"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-xl font-crimson-text mb-2 text-[#e4a00e]">
                            {item.name}
                          </h3>
                        </div>
                        <p className="text-[#e4a00e] font-crimson-text text-lg ml-4">
                          {item.price}€
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-crimson-text mb-4 text-[#e4a00e] border-b border-[#e4a00e]/20 pb-2">
                  Valkoviinit (White Wines)
                </h3>
                <div className="space-y-6">
                  {[
                    {
                      name: "Montasolo Chardonnay Veneto (75cl)",
                      price: "35,50",
                    },
                    {
                      name: "Grecanico Terre Siciliane (75cl)",
                      price: "35,50",
                    },
                    { name: "Angora Denizli Region (75cl)", price: "37,00" },
                    {
                      name: "Villa Doluca Eastern Anatolia (75cl)",
                      price: "38,00",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="group hover:bg-[#252321] p-4 rounded-lg transition-colors duration-200"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-xl font-crimson-text mb-2 text-[#e4a00e]">
                            {item.name}
                          </h3>
                        </div>
                        <p className="text-[#e4a00e] font-crimson-text text-lg ml-4">
                          {item.price}€
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-crimson-text mb-4 text-[#e4a00e] border-b border-[#e4a00e]/20 pb-2">
                  Punaviinit (Red Wines)
                </h3>
                <div className="space-y-6">
                  {[
                    { name: "Montasolo Merlot Veneto (75cl)", price: "35,50" },
                    { name: "Frappato Terre Siciliane (75cl)", price: "35,50" },
                    { name: "Syrah Sicilia (75cl)", price: "40,00" },
                    {
                      name: "Ripasso Della Valpolicella Le Tobele Veneto (75cl)",
                      price: "43,00",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="group hover:bg-[#252321] p-4 rounded-lg transition-colors duration-200"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-xl font-crimson-text mb-2 text-[#e4a00e]">
                            {item.name}
                          </h3>
                        </div>
                        <p className="text-[#e4a00e] font-crimson-text text-lg ml-4">
                          {item.price}€
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-crimson-text mb-4 text-[#e4a00e] border-b border-[#e4a00e]/20 pb-2">
                  Viinit Laseittain (Wines by Glass)
                </h3>
                <div className="space-y-6">
                  <div className="group hover:bg-[#252321] p-4 rounded-lg transition-colors duration-200">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-xl font-crimson-text mb-2 text-[#e4a00e]">
                          Valkoviini / Punaviini / Kuohuviini
                        </h3>
                        <div className="space-y-2 text-white">
                          <p>12cl – 6,80€</p>
                          <p>16cl – 6,50€</p>
                          <p>24cl – 9,60€</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="p-6 bg-[#1a1918] rounded-lg shadow-xl">
            <h2 className="mb-8 text-3xl font-crimson-text text-[#e4a00e] border-b border-[#e4a00e]/20 pb-4">
              KAHVIT (COFFEES)
            </h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-crimson-text mb-4 text-[#e4a00e] border-b border-[#e4a00e]/20 pb-2">
                  Perus Kahvit (Basic Coffees)
                </h3>
                <div className="space-y-6">
                  {[
                    { name: "Kahvi (Coffee)", price: "3,50" },
                    { name: "Tee (Tea)", price: "2,50" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="group hover:bg-[#252321] p-4 rounded-lg transition-colors duration-200"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-xl font-crimson-text mb-2 text-[#e4a00e]">
                            {item.name}
                          </h3>
                        </div>
                        <p className="text-[#e4a00e] font-crimson-text text-lg ml-4">
                          {item.price}€
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-crimson-text mb-4 text-[#e4a00e] border-b border-[#e4a00e]/20 pb-2">
                  Italialaiset Kahvit (Italian Specialty Coffees)
                </h3>
                <div className="space-y-6">
                  {[
                    { name: "Espresso", price: "3,90" },
                    { name: "Tupla Espresso", price: "4,90" },
                    { name: "Cappuccino", price: "4,90" },
                    { name: "Caffè Latte", price: "5,50" },
                    { name: "Americano", price: "4,20" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="group hover:bg-[#252321] p-4 rounded-lg transition-colors duration-200"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-xl font-crimson-text mb-2 text-[#e4a00e]">
                            {item.name}
                          </h3>
                        </div>
                        <p className="text-[#e4a00e] font-crimson-text text-lg ml-4">
                          {item.price}€
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-crimson-text mb-4 text-[#e4a00e] border-b border-[#e4a00e]/20 pb-2">
                  Erikoiskahvit (Specialty Coffees)
                </h3>
                <div className="space-y-6">
                  {[
                    { name: "Irish Coffee", price: "10,00" },
                    { name: "Amaretto Coffee", price: "9,90" },
                    { name: "Galliano Coffee", price: "9,90" },
                    { name: "Baileys Coffee", price: "9,90" },
                    { name: "Kahlua Coffee", price: "9,90" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="group hover:bg-[#252321] p-4 rounded-lg transition-colors duration-200"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-xl font-crimson-text mb-2 text-[#e4a00e]">
                            {item.name}
                          </h3>
                        </div>
                        <p className="text-[#e4a00e] font-crimson-text text-lg ml-4">
                          {item.price}€
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
          <section className="p-6 bg-[#1a1918] rounded-lg shadow-xl">
            <h2 className="mb-8 text-3xl font-crimson-text text-[#e4a00e] border-b border-[#e4a00e]/20 pb-4">
              HANAOLUT
            </h2>
            <div className="space-y-6">
              <div className="group hover:bg-[#252321] p-4 rounded-lg transition-colors duration-200">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-crimson-text mb-2 text-[#e4a00e]">
                      Karhu III hana 0,5L
                    </h3>
                  </div>
                  <p className="text-[#e4a00e] font-crimson-text text-lg ml-4">
                    7,50€
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className="p-6 bg-[#1a1918] rounded-lg shadow-xl">
            <h2 className="mb-8 text-3xl font-crimson-text text-[#e4a00e] border-b border-[#e4a00e]/20 pb-4">
              PULLO-OLUT
            </h2>
            <div className="space-y-6">
              {[
                { name: "Efes 0,5L", price: "8,00" },
                { name: "Corona", price: "8,00" },
                { name: "Karhu III 0,33L", price: "6,50" },
                { name: "Karhu IV 0,33L", price: "6,50" },
                { name: "Blanc 0,33L", price: "7,20" },
                { name: "Budvar", price: "8,20" },
                { name: "Light Beer (gluteeniton)", price: "7,90" },
                { name: "Karhu 0,33L", price: "6,50" },
                { name: "Crisp Vaalea", price: "6,50" },
                { name: "Crisp Vehnä", price: "6,50" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="group hover:bg-[#252321] p-4 rounded-lg transition-colors duration-200"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-crimson-text mb-2 text-[#e4a00e]">
                        {item.name}
                      </h3>
                    </div>
                    <p className="text-[#e4a00e] font-crimson-text text-lg ml-4">
                      {item.price}€
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section className="p-6 bg-[#1a1918] rounded-lg shadow-xl">
            <h2 className="mb-8 text-3xl font-crimson-text text-[#e4a00e] border-b border-[#e4a00e]/20 pb-4">
              SIIDERIT
            </h2>
            <div className="space-y-6">
              {[
                { name: "Crowmoor Apple 0,33L", price: "7,90" },
                { name: "Somersby Pear 0,33L", price: "7,90" },
                { name: "Somersby Sparkling Rose 0,33L", price: "8,20" },
                { name: "Somersby Sparkling Spritz 0,33L", price: "8,20" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="group hover:bg-[#252321] p-4 rounded-lg transition-colors duration-200"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-crimson-text mb-2 text-[#e4a00e]">
                        {item.name}
                      </h3>
                    </div>
                    <p className="text-[#e4a00e] font-crimson-text text-lg ml-4">
                      {item.price}€
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section className="p-6 bg-[#1a1918] rounded-lg shadow-xl">
            <h2 className="mb-8 text-3xl font-crimson-text text-[#e4a00e] border-b border-[#e4a00e]/20 pb-4">
              LONKERO
            </h2>
            <div className="space-y-6">
              <div className="group hover:bg-[#252321] p-4 rounded-lg transition-colors duration-200">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-crimson-text mb-2 text-[#e4a00e]">
                      Long Drink Grape 0,33L
                    </h3>
                  </div>
                  <p className="text-[#e4a00e] font-crimson-text text-lg ml-4">
                    8,00€
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className="p-6 bg-[#1a1918] rounded-lg shadow-xl">
            <h2 className="mb-8 text-3xl font-crimson-text text-[#e4a00e] border-b border-[#e4a00e]/20 pb-4">
              MOCKTAILS (ALKOHOLITTOMAT COCKTAILIT)
            </h2>
            <div className="space-y-6">
              {[
                { name: "Mango Mint Love", price: "8,50" },
                { name: "Raspberry Lime Star", price: "8,50" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="group hover:bg-[#252321] p-4 rounded-lg transition-colors duration-200"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-crimson-text mb-2 text-[#e4a00e]">
                        {item.name}
                      </h3>
                    </div>
                    <p className="text-[#e4a00e] font-crimson-text text-lg ml-4">
                      {item.price}€
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section className="p-6 bg-[#1a1918] rounded-lg shadow-xl">
            <h2 className="mb-8 text-3xl font-crimson-text text-[#e4a00e] border-b border-[#e4a00e]/20 pb-4">
              VÄKEVÄT JUOMAT (SPIRITS & LIQUEURS)
            </h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-crimson-text mb-4 text-[#e4a00e] border-b border-[#e4a00e]/20 pb-2">
                  Viskit (Whiskeys)
                </h3>
                <div className="space-y-6">
                  {[
                    { name: "Tullamore", price: "8,90" },
                    { name: "Jack Daniels", price: "9,90" },
                    { name: "Red Label", price: "8,90" },
                    { name: "Jameson", price: "9,90" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="group hover:bg-[#252321] p-4 rounded-lg transition-colors duration-200"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-xl font-crimson-text mb-2 text-[#e4a00e]">
                            {item.name}
                          </h3>
                        </div>
                        <p className="text-[#e4a00e] font-crimson-text text-lg ml-4">
                          {item.price}€
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-crimson-text mb-4 text-[#e4a00e] border-b border-[#e4a00e]/20 pb-2">
                  Rommit (Rums)
                </h3>
                <div className="space-y-6">
                  {[
                    { name: "Oakheart Bacardi Rum", price: "8,90" },
                    { name: "Bacardi Vaalea Rum", price: "8,90" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="group hover:bg-[#252321] p-4 rounded-lg transition-colors duration-200"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-xl font-crimson-text mb-2 text-[#e4a00e]">
                            {item.name}
                          </h3>
                        </div>
                        <p className="text-[#e4a00e] font-crimson-text text-lg ml-4">
                          {item.price}€
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-crimson-text mb-4 text-[#e4a00e] border-b border-[#e4a00e]/20 pb-2">
                  Vodkat (Vodkas)
                </h3>
                <div className="space-y-6">
                  {[
                    { name: "Koskenkorva Minttu", price: "9,00" },
                    { name: "Koskenkorva", price: "7,90" },
                    { name: "Absolut Vodka", price: "7,00" },
                    { name: "Leijona", price: "7,90" },
                    { name: "Jaloviina", price: "9,00" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="group hover:bg-[#252321] p-4 rounded-lg transition-colors duration-200"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-xl font-crimson-text mb-2 text-[#e4a00e]">
                            {item.name}
                          </h3>
                        </div>
                        <p className="text-[#e4a00e] font-crimson-text text-lg ml-4">
                          {item.price}€
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-crimson-text mb-4 text-[#e4a00e] border-b border-[#e4a00e]/20 pb-2">
                  Ginit (Gins)
                </h3>
                <div className="space-y-6">
                  {[
                    { name: "Hendrick's Gin", price: "10,00" },
                    { name: "Finsbury London Dry Gin", price: "6,90" },
                    { name: "Juniper Gin", price: "5,80" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="group hover:bg-[#252321] p-4 rounded-lg transition-colors duration-200"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-xl font-crimson-text mb-2 text-[#e4a00e]">
                            {item.name}
                          </h3>
                        </div>
                        <p className="text-[#e4a00e] font-crimson-text text-lg ml-4">
                          {item.price}€
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-crimson-text mb-4 text-[#e4a00e] border-b border-[#e4a00e]/20 pb-2">
                  Muut Liköörit (Other Liqueurs)
                </h3>
                <div className="space-y-6">
                  {[
                    { name: "Limoncello", price: "8,50" },
                    { name: "Amaretto", price: "8,50" },
                    { name: "Galliano", price: "8,50" },
                    { name: "Grappino", price: "8,50" },
                    { name: "Sambuca", price: "8,50" },
                    { name: "Café Likööri", price: "9,00" },
                    { name: "Kahlua", price: "9,00" },
                    { name: "Baileys", price: "8,50" },
                    { name: "Malibu", price: "8,90" },
                    { name: "Licor 43", price: "9,00" },
                    { name: "Cointreau", price: "9,00" },
                    { name: "Campari", price: "7,90" },
                    { name: "Jägermeister", price: "7,90" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="group hover:bg-[#252321] p-4 rounded-lg transition-colors duration-200"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-xl font-crimson-text mb-2 text-[#e4a00e]">
                            {item.name}
                          </h3>
                        </div>
                        <p className="text-[#e4a00e] font-crimson-text text-lg ml-4">
                          {item.price}€
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-crimson-text mb-4 text-[#e4a00e] border-b border-[#e4a00e]/20 pb-2">
                  Martinit (Martinis)
                </h3>
                <div className="space-y-6">
                  {[
                    { name: "Martini Bianco", price: "9,50" },
                    { name: "Martini Rosso", price: "9,50" },
                    { name: "Martini Extra Dry", price: "9,50" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="group hover:bg-[#252321] p-4 rounded-lg transition-colors duration-200"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-xl font-crimson-text mb-2 text-[#e4a00e]">
                            {item.name}
                          </h3>
                        </div>
                        <p className="text-[#e4a00e] font-crimson-text text-lg ml-4">
                          {item.price}€
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-crimson-text mb-4 text-[#e4a00e] border-b border-[#e4a00e]/20 pb-2">
                  Konjakit (Cognacs)
                </h3>
                <div className="space-y-6">
                  {[
                    { name: "Soerlier VSOP", price: "10,00" },
                    { name: "Arbellot V.S.", price: "10,50" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="group hover:bg-[#252321] p-4 rounded-lg transition-colors duration-200"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-xl font-crimson-text mb-2 text-[#e4a00e]">
                            {item.name}
                          </h3>
                        </div>
                        <p className="text-[#e4a00e] font-crimson-text text-lg ml-4">
                          {item.price}€
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-crimson-text mb-4 text-[#e4a00e] border-b border-[#e4a00e]/20 pb-2">
                  Tequila
                </h3>
                <div className="space-y-6">
                  {[{ name: "Sauza", price: "9,00" }].map((item, index) => (
                    <div
                      key={index}
                      className="group hover:bg-[#252321] p-4 rounded-lg transition-colors duration-200"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-xl font-crimson-text mb-2 text-[#e4a00e]">
                            {item.name}
                          </h3>
                        </div>
                        <p className="text-[#e4a00e] font-crimson-text text-lg ml-4">
                          {item.price}€
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
          <section className="p-6 bg-[#1a1918] rounded-lg shadow-xl">
            <h2 className="mb-8 text-3xl font-crimson-text text-[#e4a00e] border-b border-[#e4a00e]/20 pb-4">
              MEHUT JA VIRVOITUSJUOMAT (JUICES & SOFT DRINKS)
            </h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-crimson-text mb-4 text-[#e4a00e] border-b border-[#e4a00e]/20 pb-2">
                  Juices and Milk
                </h3>
                <div className="space-y-6">
                  {[
                    {
                      name: "Appelsiinimehu (Orange Juice)",
                      small: "3,00",
                      large: "3,50",
                    },
                    {
                      name: "Omenamehu (Apple Juice)",
                      small: "3,00",
                      large: "3,50",
                    },
                    {
                      name: "Kauramaito (Oat Milk)",
                      small: "3,00",
                      large: "3,50",
                    },
                    { name: "Maito (Milk)", small: "3,00", large: "3,50" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="group hover:bg-[#252321] p-4 rounded-lg transition-colors duration-200"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-xl font-crimson-text mb-2 text-[#e4a00e]">
                            {item.name}
                          </h3>
                        </div>
                        <div className="text-[#e4a00e] font-crimson-text text-lg ml-4 text-right">
                          <p>{item.small}€ (Pieni)</p>
                          <p>{item.large}€ (Iso)</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-crimson-text mb-4 text-[#e4a00e] border-b border-[#e4a00e]/20 pb-2">
                  Sodas and Other Beverages
                </h3>
                <div className="space-y-6">
                  {[
                    {
                      name: "Coca-Cola",
                      small: "3,50",
                      large: "4,50",
                      size: "0,33L / 0,5L",
                    },
                    {
                      name: "Coca-Cola Zero",
                      small: "3,50",
                      large: "4,50",
                      size: "0,33L / 0,5L",
                    },
                    {
                      name: "Sprite",
                      small: "3,50",
                      large: "4,50",
                      size: "0,33L / 0,5L",
                    },
                    {
                      name: "Fanta",
                      small: "3,50",
                      large: "4,50",
                      size: "0,33L / 0,5L",
                    },
                    { name: "Tonic", price: "3,50" },
                    { name: "Bonaqua", price: "3,00" },
                    { name: "Battery Energy Drink", price: "5,00" },
                    { name: "Pillimehu (Juice Box)", price: "2,00" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="group hover:bg-[#252321] p-4 rounded-lg transition-colors duration-200"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-xl font-crimson-text mb-2 text-[#e4a00e]">
                            {item.name}
                          </h3>
                        </div>
                        <div className="text-[#e4a00e] font-crimson-text text-lg ml-4 text-right">
                          {item.size ? (
                            <>
                              <p>
                                {item.small}€ ({item.size.split(" / ")[0]})
                              </p>
                              <p>
                                {item.large}€ ({item.size.split(" / ")[1]})
                              </p>
                            </>
                          ) : (
                            <p>{item.price}€</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer1 />
    </div>
  );
}

export default MainComponent;