"use client";
import React from "react";

function MainComponent() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-[#000000] py-4 fixed w-full z-50 shadow-lg border-b border-gray-800">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center">
            <div className="flex justify-center mb-6">
              <a href="/" className="flex items-center">
                <img
                  src="https://ucarecdn.com/fa201ac0-28b4-4ab7-8968-6311c7a7e733/-/format/auto/"
                  alt="La Locanda logo"
                  className="h-20 w-auto transition-transform duration-300 hover:scale-105"
                />
              </a>
            </div>

            <nav className="hidden md:block">
              <ul className="flex space-x-12">
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
                <li className="relative">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-white hover:text-[#e4a00e] flex items-center"
                  >
                    LOUNASBUFFET
                    <i className="fas fa-chevron-down ml-2 text-xs"></i>
                  </button>
                  {isOpen && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-[#000000] rounded-md shadow-lg">
                      <a
                        href="/lounasbuffet"
                        className="block px-4 py-2 text-white hover:text-[#e4a00e]"
                      >
                        Lounasbuffet
                      </a>
                      <a
                        href="/alacarte"
                        className="block px-4 py-2 text-white hover:text-[#e4a00e]"
                      >
                        A La Carte
                      </a>
                      <a
                        href="/juomalista"
                        className="block px-4 py-2 text-white hover:text-[#e4a00e]"
                      >
                        Juomalista
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
                    <a
                      href="/juomalista"
                      className="block text-white hover:text-[#e4a00e] transition-colors duration-200"
                    >
                      Juomalista
                    </a>
                  </div>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>

      <main className="flex-grow bg-[#1e1d1b] relative pt-36">
        <div className="absolute inset-0 bg-black">
          <img
            src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2JnODlwMnowZ2hsem1lM2RjNGw1am05ZXdvMnFucWQ4cWI0cG05YSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/nqtA5obHo3CSelfeKS/giphy.gif"
            alt="Restaurant ambiance"
            className="w-full h-full object-cover opacity-15 mix-blend-overlay"
          />
        </div>

        <div className="relative container mx-auto px-6 py-32">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-6xl md:text-8xl font-bold mb-10 tracking-tight leading-none">
              LA LOCANDA
            </h1>
            <p className="text-xl md:text-2xl mb-14 leading-relaxed font-light max-w-2xl mx-auto">
              Tervetuloa La Locandaan, missä italialainen ruokakulttuuri kohtaa
              modernin fine diningin. Tarjoamme autenttisia makuelämyksiä ja
              lämminhenkistä palvelua Vantaan sydämessä.
            </p>
            <button className="bg-[#e4a00e] hover:bg-[#c58c0c] text-white px-12 py-5 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-md">
              Varaa Pöytä
            </button>
          </div>
        </div>
      </main>

      <footer className="bg-[#000000] text-white py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-10 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-xl font-medium mb-3 tracking-wide">
                Maitikkakuja 1
              </p>
              <p className="text-gray-400 text-lg">01350 Vantaa, Finland</p>
            </div>

            <div className="flex space-x-8">
              <a
                href="#"
                className="bg-[#e4a00e] p-5 rounded-full hover:bg-[#c58c0c] transition-all duration-300 transform hover:scale-110 hover:shadow-lg shadow-md"
              >
                <i className="fab fa-tiktok text-xl"></i>
              </a>
              <a
                href="#"
                className="bg-[#e4a00e] p-5 rounded-full hover:bg-[#c58c0c] transition-all duration-300 transform hover:scale-110 hover:shadow-lg shadow-md"
              >
                <i className="fab fa-facebook-f text-xl"></i>
              </a>
              <a
                href="#"
                className="bg-[#e4a00e] p-5 rounded-full hover:bg-[#c58c0c] transition-all duration-300 transform hover:scale-110 hover:shadow-lg shadow-md"
              >
                <i className="fab fa-instagram text-xl"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>

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