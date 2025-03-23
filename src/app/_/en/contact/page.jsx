"use client";
import React from "react";

function MainComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#1e1d1b]">
      <header className="bg-[#f5ae15] py-4 fixed w-full z-50 shadow-lg">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center mb-6">
            <a href="/en" className="flex items-center">
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
                    href="/en"
                    className="text-black hover:text-white transition-all duration-300 text-sm tracking-widest font-medium border-b-2 border-transparent hover:border-white"
                  >
                    ABOUT
                  </a>
                </li>
                <li>
                  <a
                    href="/en/contact"
                    className="text-black hover:text-white transition-all duration-300 text-sm tracking-widest font-medium border-b-2 border-transparent hover:border-white"
                  >
                    CONTACT
                  </a>
                </li>
                <li>
                  <a
                    href="/en/reservations"
                    className="text-black hover:text-white transition-all duration-300 text-sm tracking-widest font-medium border-b-2 border-transparent hover:border-white"
                  >
                    RESERVATIONS
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
              className="md:hidden text-white hover:text-black transition-colors duration-200"
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
                  className="text-white hover:text-black transition-colors duration-200"
                >
                  ABOUT
                </a>
                <a
                  href="/en/reservations"
                  className="text-white hover:text-black transition-colors duration-200"
                >
                  RESERVATIONS
                </a>
                <a href="/en/contact" className="text-black">
                  CONTACT
                </a>
                <div className="relative">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-white hover:text-black transition-colors duration-200 flex items-center"
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
                        className="block text-white hover:text-black transition-colors duration-200"
                      >
                        Lunch Buffet
                      </a>
                      <a
                        href="/en/alacarte"
                        className="block text-white hover:text-black transition-colors duration-200"
                      >
                        A La Carte
                      </a>
                      <a
                        href="/en/drinks"
                        className="block text-white hover:text-black transition-colors duration-200"
                      >
                        Drinks
                      </a>
                    </div>
                  )}
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto px-6 pt-32 pb-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-[#e4a00e] text-center mb-16">
            Contact Us
          </h1>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-[#2a2826] p-8 rounded-xl shadow-xl">
              <h2 className="text-2xl font-semibold text-[#e4a00e] mb-6">
                Address & Opening Hours
              </h2>
              <div className="space-y-4 text-white">
                <p className="flex items-center">
                  <i className="fas fa-map-marker-alt text-[#e4a00e] mr-4"></i>
                  Maitikkakuja 1, 01350 Vantaa
                </p>
                <div className="flex items-start">
                  <i className="fas fa-clock text-[#e4a00e] mr-4 mt-1"></i>
                  <div>
                    <p className="font-medium mb-2">Opening Hours:</p>
                    <p>Monday: 10:00-21:30</p>
                    <p>Tuesday: 10:00-21:30</p>
                    <p>Wednesday: 10:00-21:30</p>
                    <p>Thursday: 10:00-21:30</p>
                    <p>Friday: 10:00-22:00</p>
                    <p>Saturday: 11:00-22:00</p>
                    <p>Sunday: 12:00-21:30</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#2a2826] p-8 rounded-xl shadow-xl">
              <h2 className="text-2xl font-semibold text-[#e4a00e] mb-6">
                Contact Information
              </h2>
              <div className="space-y-4 text-white">
                <p className="flex items-center">
                  <i className="fas fa-phone text-[#e4a00e] mr-4"></i>
                  +358505495607
                </p>
                <p className="flex items-center">
                  <i className="fas fa-envelope text-[#e4a00e] mr-4"></i>
                  info@lalocandavantaa.fi
                </p>
                <div className="flex items-center space-x-4 pt-4">
                  <a
                    href="https://www.facebook.com/lalocanda.fi/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#e4a00e] p-3 rounded-full hover:bg-[#c58c0c] transition-all duration-300 transform hover:scale-110"
                  >
                    <i className="fab fa-facebook-f text-black"></i>
                  </a>
                  <a
                    href="https://www.instagram.com/lalocandavantaa/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#e4a00e] p-3 rounded-full hover:bg-[#c58c0c] transition-all duration-300 transform hover:scale-110"
                  >
                    <i className="fab fa-instagram text-black"></i>
                  </a>
                  <a
                    href="https://www.tiktok.com/@lalocandavantaa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#e4a00e] p-3 rounded-full hover:bg-[#c58c0c] transition-all duration-300 transform hover:scale-110"
                  >
                    <i className="fab fa-tiktok text-black"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 bg-[#2a2826] p-8 rounded-xl shadow-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1984.1536830832578!2d25.11116081608655!3d60.27193998196662!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x469207b82c166d35%3A0x6edb52101f292d0d!2sMaitikkakuja%201%2C%2001350%20Vantaa!5e0!3m2!1sfi!2sfi!4v1650000000000!5m2!1sfi!2sfi"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg"
              title="La Locanda location on map"
            ></iframe>
          </div>
        </div>
      </main>

      <></>
    </div>
  );
}

export default MainComponent;