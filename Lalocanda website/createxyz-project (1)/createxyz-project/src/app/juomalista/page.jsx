"use client";
import React from "react";

function MainComponent() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const drinksData = {
    draft: [{ name: "Karhu III hana", size: "0,5L", price: 7.5 }],
    bottles: [
      { name: "Efes", size: "0,5L", price: 8.0 },
      { name: "Corona", size: "", price: 8.0 },
      { name: "Karhu III", size: "0,33L", price: 6.5 },
      { name: "Karhu IV", size: "0,33L", price: 6.5 },
      { name: "Blanc", size: "0,33L", price: 7.2 },
      { name: "Budvar", size: "", price: 8.2 },
      { name: "Light Beer (gluteeniton)", size: "", price: 7.9 },
      { name: "Karhu", size: "0,33L", price: 6.5 },
      { name: "Crisp Vaalea", size: "", price: 6.5 },
      { name: "Crisp Vehnä", size: "", price: 6.5 },
    ],
    ciders: [
      { name: "Crowmoor Apple", size: "0,33L", price: 7.9 },
      { name: "Somersby Pear", size: "0,33L", price: 7.9 },
      { name: "Somersby Sparkling Rose", size: "0,33L", price: 8.2 },
      { name: "Somersby Sparkling Spritz", size: "0,33L", price: 8.2 },
      { name: "Long Drink Grape", size: "0,33L", price: 8.0 },
    ],
  };

  return (
    <div className="min-h-screen bg-[#1e1d1b] text-white">
      <header className="bg-[#000000] py-4 fixed w-full z-50 shadow-lg border-b border-gray-800">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center">
              <img
                src="https://ucarecdn.com/fa201ac0-28b4-4ab7-8968-6311c7a7e733/-/format/auto/"
                alt="La Locanda Logo"
                className="h-16 w-auto transition-transform duration-300 hover:scale-105"
              />
            </a>
            <nav className="hidden md:block">
              <ul className="flex space-x-8">
                <li>
                  <a
                    href="/"
                    className="text-white hover:text-[#e4a00e] transition-all duration-300 text-sm tracking-widest font-medium border-b-2 border-transparent hover:border-[#e4a00e]"
                  >
                    MEISTÄ
                  </a>
                </li>
                <li>
                  <a
                    href="/varaukset"
                    className="text-white hover:text-[#e4a00e] transition-all duration-300 text-sm tracking-widest font-medium border-b-2 border-transparent hover:border-[#e4a00e]"
                  >
                    PÖYTÄVARAUKSET
                  </a>
                </li>
                <li>
                  <a
                    href="/juomalista"
                    className="text-[#e4a00e] transition-all duration-300 text-sm tracking-widest font-medium border-b-2 border-[#e4a00e]"
                  >
                    JUOMALISTA
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-white hover:text-[#e4a00e] transition-all duration-300 text-sm tracking-widest font-medium border-b-2 border-transparent hover:border-[#e4a00e] flex items-center"
                  >
                    LOUNAS
                    <i
                      className={`fas fa-chevron-down ml-2 text-xs transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    ></i>
                  </button>
                  {isOpen && (
                    <div className="absolute mt-4 w-56 bg-[#000000] rounded-lg shadow-2xl border border-gray-800 animate-[fadeIn_0.3s_ease-out] backdrop-blur-lg bg-opacity-95">
                      <a
                        href="/lounasbuffet"
                        className="block px-6 py-4 text-white hover:text-[#e4a00e] transition-all duration-300 text-sm border-b border-gray-800 hover:bg-gray-900"
                      >
                        Lounasbuffet
                      </a>
                      <a
                        href="/alacarte"
                        className="block px-6 py-4 text-white hover:text-[#e4a00e] transition-all duration-300 text-sm hover:bg-gray-900"
                      >
                        A La Carte
                      </a>
                    </div>
                  )}
                </li>
              </ul>
            </nav>

            <button
              className="md:hidden text-white hover:text-[#e4a00e] transition-colors duration-200"
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
            <div className="md:hidden mt-4 border-t border-gray-800 pt-4">
              <nav className="flex flex-col space-y-4">
                <a
                  href="/"
                  className="text-white hover:text-[#e4a00e] transition-colors duration-200"
                >
                  MEISTÄ
                </a>
                <a
                  href="/varaukset"
                  className="text-white hover:text-[#e4a00e] transition-colors duration-200"
                >
                  PÖYTÄVARAUKSET
                </a>
                <a
                  href="/juomalista"
                  className="text-[#e4a00e] transition-colors duration-200"
                >
                  JUOMALISTA
                </a>
                <div className="relative">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-white hover:text-[#e4a00e] transition-colors duration-200 flex items-center"
                  >
                    LOUNAS
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
                        className="block text-white hover:text-[#e4a00e] transition-colors duration-200"
                      >
                        Lounasbuffet
                      </a>
                      <a
                        href="/alacarte"
                        className="block text-white hover:text-[#e4a00e] transition-colors duration-200"
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

      <main className="container mx-auto px-6 py-32">
        <h1 className="text-5xl font-crimson-text text-[#e4a00e] text-center mb-16">
          VIRVOITUSJUOMAT / SOFT DRINKS
        </h1>

        <div className="grid md:grid-cols-2 gap-12">
          <section className="p-8 bg-[#1a1918] rounded-lg shadow-xl">
            <h2 className="text-3xl font-crimson-text text-[#e4a00e] mb-8 border-b border-[#e4a00e]/20 pb-4">
              Hanaolut / Draft Beer
            </h2>
            <div className="space-y-6">
              {drinksData.draft.map((drink, index) => (
                <div
                  key={index}
                  className="group hover:bg-[#252321] p-4 rounded-lg transition-colors duration-200"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-crimson-text text-[#e4a00e] mb-2">
                        {drink.name}
                        <span className="text-gray-400 text-sm ml-2">
                          {drink.size}
                        </span>
                      </h3>
                    </div>
                    <span className="text-[#e4a00e] font-crimson-text text-lg">
                      {drink.price.toFixed(2)}€
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="p-8 bg-[#1a1918] rounded-lg shadow-xl">
            <h2 className="text-3xl font-crimson-text text-[#e4a00e] mb-8 border-b border-[#e4a00e]/20 pb-4">
              Pullo-oluet / Bottled Beers
            </h2>
            <div className="space-y-6">
              {drinksData.bottles.map((drink, index) => (
                <div
                  key={index}
                  className="group hover:bg-[#252321] p-4 rounded-lg transition-colors duration-200"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-crimson-text text-[#e4a00e] mb-2">
                        {drink.name}
                        {drink.size && (
                          <span className="text-gray-400 text-sm ml-2">
                            {drink.size}
                          </span>
                        )}
                      </h3>
                    </div>
                    <span className="text-[#e4a00e] font-crimson-text text-lg">
                      {drink.price.toFixed(2)}€
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="p-8 bg-[#1a1918] rounded-lg shadow-xl md:col-span-2">
            <h2 className="text-3xl font-crimson-text text-[#e4a00e] mb-8 border-b border-[#e4a00e]/20 pb-4">
              Siiderit & Lonkerot / Ciders & Long Drinks
            </h2>
            <div className="space-y-6">
              {drinksData.ciders.map((drink, index) => (
                <div
                  key={index}
                  className="group hover:bg-[#252321] p-4 rounded-lg transition-colors duration-200"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-crimson-text text-[#e4a00e] mb-2">
                        {drink.name}
                        <span className="text-gray-400 text-sm ml-2">
                          {drink.size}
                        </span>
                      </h3>
                    </div>
                    <span className="text-[#e4a00e] font-crimson-text text-lg">
                      {drink.price.toFixed(2)}€
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <footer className="bg-[#000000] text-white py-8 mt-16">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">LA LOCANDA © 2025</p>
          <div className="mt-4 space-x-4">
            <i className="fab fa-facebook bg-[#e4a00e] p-2 rounded hover:opacity-80"></i>
            <i className="fab fa-instagram bg-[#e4a00e] p-2 rounded hover:opacity-80"></i>
            <i className="fab fa-tripadvisor bg-[#e4a00e] p-2 rounded hover:opacity-80"></i>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default MainComponent;