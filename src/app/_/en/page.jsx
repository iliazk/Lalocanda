"use client";
import React from "react";

function MainComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

      <main className="flex-grow relative">
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          >
            <source
              src="https://cdn.pixabay.com/video/2023/08/08/175152-852857786_large.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="relative z-10 bg-black/50">
          <div className="container mx-auto px-6 py-32">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h1 className="text-6xl md:text-8xl font-bold mb-10 tracking-tight leading-none animate-[fadeIn_1s_ease-out]">
                LA LOCANDA
              </h1>
              <div className="space-y-6 mb-14 animate-[slideDown_1s_ease-out]">
                <p className="text-2xl md:text-3xl font-light leading-relaxed max-w-2xl mx-auto">
                  <span className="text-[#e4a00e]">Welcome to La Locanda</span>{" "}
                  — where Italian culinary culture meets modern fine dining.
                </p>
                <p className="text-xl md:text-2xl font-light leading-relaxed max-w-2xl mx-auto text-gray-200">
                  We offer authentic taste experiences and warm service in the
                  heart of Vantaa.
                </p>
              </div>
              <a
                href="/en/reservations"
                className="inline-block bg-[#e4a00e] hover:bg-[#c58c0c] text-white px-12 py-5 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-md"
              >
                Book a Table
              </a>
            </div>
          </div>
        </div>
      </main>

      <></>
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideDown {
          from { transform: translateY(-10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default MainComponent;