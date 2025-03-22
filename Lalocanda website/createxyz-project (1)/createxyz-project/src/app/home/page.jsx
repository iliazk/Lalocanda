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
    <div className="min-h-screen bg-[#1e1d1b]">
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
          <div className="flex items-center justify-center mt-4">
            <nav className="hidden md:block w-full">
              <ul className="flex justify-center items-center space-x-12">
                <li>
                  <a
                    href="/meista"
                    className="text-black hover:text-white transition-all duration-300 text-sm tracking-widest font-medium border-b-2 border-transparent hover:border-white px-4 py-2"
                  >
                    MEISTÄ
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
                        href="/alacarte"
                        className="block px-6 py-4 text-black hover:text-white transition-all duration-300 text-sm border-b border-black/10 hover:bg-black/10"
                      >
                        À LA CARTE
                      </a>
                      <a
                        href="/juomalista"
                        className="block px-6 py-4 text-black hover:text-white transition-all duration-300 text-sm hover:bg-black/10"
                      >
                        JUOMALISTA
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
                  href="/meista"
                  className="text-black hover:text-white transition-colors duration-200"
                >
                  MEISTÄ
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
                        href="/alacarte"
                        className="block text-black hover:text-white transition-colors duration-200"
                      >
                        À LA CARTE
                      </a>
                      <a
                        href="/juomalista"
                        className="block text-black hover:text-white transition-colors duration-200"
                      >
                        JUOMALISTA
                      </a>
                    </div>
                  )}
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      <main>
        <section className="min-h-screen pt-[144px] relative">
          <div className="absolute inset-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source
                src="https://cdn.pixabay.com/video/2023/08/08/175152-852857786_large.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-black/50"></div>
          </div>

          <div className="relative z-10 container mx-auto px-6 h-[calc(100vh-144px)] flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-5xl md:text-7xl font-bold mb-10 tracking-tight leading-none animate-[fadeIn_1s_ease-out] text-white">
                LA LOCANDA
              </h1>
              <div className="space-y-6 mb-14 animate-[slideDown_1s_ease-out]">
                <p className="text-xl md:text-2xl font-light leading-relaxed max-w-2xl mx-auto">
                  <span className="text-[#e4a00e]">
                    Tervetuloa La Locandaan
                  </span>{" "}
                  — missä italialainen ruokakulttuuri kohtaa modernin fine
                  diningin.
                </p>
                <p className="text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto text-gray-200">
                  Tarjoamme aidon italialaisen ruokaelämyksen ja lämminhenkisen
                  palvelun Vantaan sydämessä.
                </p>
              </div>
              <a
                href="/varaukset"
                className="inline-block bg-[#e4a00e] hover:bg-[#c58c0c] text-white px-12 py-5 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-md"
              >
                Varaa Pöytä
              </a>
            </div>
          </div>
        </section>
        <section className="bg-[#2a2826] py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl md:text-3xl text-[#f5ae15] text-center mb-16">
              AUKIOLOAJAT
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <div className="bg-[#1e1d1b] p-8 rounded-lg">
                <h3 className="text-[#f5ae15] text-xl mb-4">LOUNAS</h3>
                <ul className="space-y-3 text-white">
                  <li className="flex justify-between">
                    <span>Maanantai - Perjantai</span>
                    <span>11:00 - 14:30</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Lauantai - Sunnuntai</span>
                    <span>12:00 - 15:00</span>
                  </li>
                </ul>
              </div>
              <div className="bg-[#1e1d1b] p-8 rounded-lg">
                <h3 className="text-[#f5ae15] text-xl mb-4">ILLALLINEN</h3>
                <ul className="space-y-3 text-white">
                  <li className="flex justify-between">
                    <span>Maanantai - Torstai</span>
                    <span>17:00 - 22:00</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Perjantai - Lauantai</span>
                    <span>17:00 - 23:00</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunnuntai</span>
                    <span>17:00 - 21:00</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer1 />
    </div>
  );
}

export default MainComponent;