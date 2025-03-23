"use client";
import React from "react";

function MainComponent() {
  const [menuData, setMenuData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/fetch-menu-data-en", {
          method: "POST",
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setMenuData(data);
      } catch (err) {
        console.error("Failed to fetch menu data:", err);
        setError("Could not load the menu. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-[#1e1d1b] text-white">
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

      <main className="container mx-auto px-6 py-28 max-w-6xl">
        <h1 className="mb-16 text-center text-5xl font-crimson-text text-[#e4a00e] tracking-wide">
          Drinks Menu
        </h1>

        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#e4a00e]"></div>
            <p className="mt-6 text-[#e4a00e] font-crimson-text text-xl">
              Loading menu...
            </p>
          </div>
        )}

        {error && (
          <div className="text-center py-12 text-red-500">
            <i className="fas fa-exclamation-circle text-2xl mb-4"></i>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && menuData && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            <section className="p-6 bg-[#1a1918] rounded-lg shadow-xl">
              <h2 className="mb-8 text-3xl font-crimson-text text-[#e4a00e] border-b border-[#e4a00e]/20 pb-4">
                Wine Selection
              </h2>
              <div className="space-y-6">
                {menuData?.drinks
                  .filter((item) => item.category === "Wine")
                  .map((item, index) => (
                    <div
                      key={index}
                      className="group hover:bg-[#252321] p-4 rounded-lg transition-colors duration-200"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-xl font-crimson-text mb-2 text-[#e4a00e]">
                            {item.name}
                          </h3>
                          <p className="text-gray-400 text-sm leading-relaxed">
                            {item.description}
                          </p>
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
                Cocktails
              </h2>
              <div className="space-y-6">
                {menuData?.drinks
                  .filter((item) => item.category === "Cocktails")
                  .map((item, index) => (
                    <div
                      key={index}
                      className="group hover:bg-[#252321] p-4 rounded-lg transition-colors duration-200"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-xl font-crimson-text mb-2 text-[#e4a00e]">
                            {item.name}
                          </h3>
                          <p className="text-gray-400 text-sm leading-relaxed">
                            {item.description}
                          </p>
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
                Beer & Cider
              </h2>
              <div className="space-y-6">
                {menuData?.drinks
                  .filter((item) => item.category === "Beer")
                  .map((item, index) => (
                    <div
                      key={index}
                      className="group hover:bg-[#252321] p-4 rounded-lg transition-colors duration-200"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-xl font-crimson-text mb-2 text-[#e4a00e]">
                            {item.name}
                          </h3>
                          <p className="text-gray-400 text-sm leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                        <p className="text-[#e4a00e] font-crimson-text text-lg ml-4">
                          {item.price}€
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </section>
          </div>
        )}
      </main>

      <></>
    </div>
  );
}

export default MainComponent;