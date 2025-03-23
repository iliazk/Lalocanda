"use client";
import React from "react";
import Footer1 from "../../components/footer-1";
import LanguageSwitcher from "../../components/language-switcher";
import Footer1 from "../../components/footer-1";
import LanguageSwitcher from "../../components/language-switcher";

function MainComponent() {
  const [menuData, setMenuData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/get-menu-items", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            menu_type: "LOUNASBUFFET",
          }),
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
        console.error("Error fetching menu:", err);
        setError("Couldn't load the menu. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  return (
    <div className="min-h-screen bg-[#1e1d1b]">
      <header className="bg-[#f5ae15] py-6 fixed w-full z-50 shadow-lg">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center">
            <div className="flex justify-center mb-8">
              <a href="/" className="flex items-center">
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

      <main className="container mx-auto px-4 py-16 lg:px-8">
        <div className="relative mb-16 text-center">
          <h1 className="font-crimson-text text-5xl font-bold text-[#f5ae15] md:text-6xl">
            Lounasbuffet
          </h1>
          <div className="mt-4 text-lg text-white/80">
            Tarjoillaan arkisin klo 11:00-14:00
          </div>
        </div>

        {error && (
          <div className="mx-auto max-w-2xl rounded-lg bg-red-900/50 p-6 text-center">
            <i className="fas fa-exclamation-circle mb-2 text-2xl text-red-400"></i>
            <p className="text-white">{error}</p>
          </div>
        )}

        {loading ? (
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#f5ae15]"></div>
              <p className="mt-4 text-white/80">Loading menu...</p>
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-5xl space-y-16">
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
                <section key={category} className="rounded-xl bg-[#252422] p-8">
                  <h2 className="mb-8 font-crimson-text text-3xl font-bold text-[#f5ae15]">
                    {category}
                  </h2>
                  <div className="grid gap-8 md:grid-cols-2">
                    {items.map((item, index) => (
                      <div
                        key={index}
                        className="group relative overflow-hidden rounded-lg border border-gray-700 bg-[#1e1d1b] p-6 transition-all hover:border-[#f5ae15] hover:shadow-lg"
                      >
                        <h3 className="mb-2 text-xl font-medium text-[#f5ae15]">
                          {item.name}
                        </h3>
                        <p className="text-white/80">{item.description}</p>
                        {item.price && (
                          <p className="mt-4 font-semibold text-[#f5ae15]">
                            {item.price}€
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              ))}
          </div>
        )}
      </main>

      <Footer1 />
      <style jsx global>{`
        @keyframes fadeIn {
          from { 
            opacity: 0; 
            transform: translateY(-10px) translateX(-50%);
          }
          to { 
            opacity: 1; 
            transform: translateY(0) translateX(-50%);
          }
        }
        
        @keyframes slideDown {
          from { 
            max-height: 0;
            opacity: 0;
          }
          to { 
            max-height: 500px;
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

export default MainComponent;