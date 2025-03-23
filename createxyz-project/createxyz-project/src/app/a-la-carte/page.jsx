"use client";
import React from "react";
import Footer1 from "../../components/footer-1";
import LanguageSwitcher from "../../components/language-switcher";
import Footer1 from "../../components/footer-1";
import LanguageSwitcher from "../../components/language-switcher";

function MainComponent() {
  const [menuData, setMenuData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/get-menu-items", {
          method: "POST",
          body: JSON.stringify({ menu_type: "A_LA_CARTE" }),
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setMenuData(data.items);
      } catch (err) {
        console.error("Failed to fetch menu:", err);
        setError("Could not load the menu. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  return (
    <div className="min-h-screen bg-[#1e1d1b] text-[#f5ae15]">
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
              <ul className="flex justify-center items-center space-x-12">
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
                    <div className="absolute mt-4 w-56 bg-[#f5ae15] rounded-lg shadow-2xl border border-black/10 animate-[fadeIn_0.3s_ease-out] backdrop-blur-lg bg-opacity-95">
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

      <main className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-40 pb-16">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <div className="w-12 h-12 border-4 border-[#e4a00e] border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-[#e4a00e] text-lg">Loading menu...</p>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center p-8 rounded-lg bg-red-900/20 border border-red-500/20 animate-fadeIn">
            <i className="fas fa-exclamation-circle text-red-400 text-xl mr-3"></i>
            <p className="text-red-400">{error}</p>
          </div>
        ) : (
          <>
            <h1 className="mb-16 text-center text-5xl font-bold text-[#e4a00e]">
              À La Carte
            </h1>

            {menuData &&
              Object.entries(
                menuData.reduce((acc, item) => {
                  if (!acc[item.category]) {
                    acc[item.category] = [];
                  }
                  acc[item.category].push(item);
                  return acc;
                }, {})
              ).map(([category, items]) => (
                <section key={category} className="mb-20 animate-fadeIn">
                  <h2 className="mb-10 text-3xl font-semibold text-[#e4a00e] border-b border-[#e4a00e]/20 pb-4">
                    {category}
                  </h2>
                  <div className="grid gap-8">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-start p-4 hover:bg-white/5 rounded-lg transition-colors duration-200"
                      >
                        <div className="flex-grow pr-8">
                          <h3 className="text-xl font-medium text-white mb-2">
                            {item.name}
                          </h3>
                          <p className="text-gray-400 text-sm leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                        <span className="text-[#e4a00e] font-medium text-lg whitespace-nowrap">
                          {item.price}€
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
          </>
        )}
      </main>

      <Footer1 />

      <style jsx global>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default MainComponent;