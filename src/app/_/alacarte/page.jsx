"use client";
import React from "react";
import Footer1 from "../../components/footer-1";
import LanguageSwitcher from "../../components/language-switcher";
import Footer1 from "../../components/footer-1";
import LanguageSwitcher from "../../components/language-switcher";

function MainComponent() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const menuData = [
    {
      category: "ITALIALAISET ALKURUOAT",
      items: [
        {
          name: "Insalata Caprese",
          description:
            "Tomaatti-mozzarellasalaatti basilikalla ja oliiviöljyllä",
          price: 8.0,
          allergens: "G",
        },
        {
          name: "Bruschetta al Pomodoro",
          description:
            "Talon leipä tomaatti-valkosipuli-oliiviöljy-basilika täytteellä",
          price: 8.0,
          allergens: "M",
        },
        {
          name: "Insalata Tricolore",
          description:
            "Salaatti savunaudalla, parmankinkulta, salamilla, oliiviöljy-sitruuna kastikkeella",
          price: "9.50/16.00",
          allergens: "G, M",
        },
        {
          name: "Insalata Mediterranea",
          description:
            "Salaatti tonnikalalla, oliiveilla, fetajuustolla, aurinkokuivatuilla tomaateilla ja oliiviöljyllä",
          price: "8.50/15.00",
          allergens: "G",
        },
        {
          name: "Insalata Caesar Pollo",
          description:
            "Kanasalaatti rucolalla, krutongeilla ja Caesar-kastikkeella",
          price: "8.00/15.50",
        },
        {
          name: "Insalata Caesar Salmone",
          description:
            "Salaatti grillatulla lohella, rucolalla, krutongeilla ja Caesar-kastikkeella",
          price: "8.50/16.00",
        },
        {
          name: "Zuppa del Giorno",
          description: "Päivän keitto - kysy tarjoilijalta!",
          price: 7.5,
        },
        {
          name: "Meze-lajitelma",
          description: "Tuore talon leipä, tzatziki, hummus, talon salsa",
          price: 9.5,
        },
      ],
    },
    {
      category: "TURKKILAISET ALKURUOAT",
      items: [
        {
          name: "Çoban Salaatti",
          description:
            "Salaatti mintulla, tomaatilla, kurkulla, punasipulilla, persiljalla, valkosipulilla ja granaattiomenasiirapilla",
          price: 9.5,
          allergens: "G",
        },
      ],
    },
    {
      category: "PÄÄRUOAT (MAIN COURSES)",
      items: [
        {
          name: "Petto di Pollo al Gorgonzola",
          description: "Grillattua kananrintaa gorgonzola-kermakastikkeella",
          price: 20.0,
          allergens: "G",
        },
        {
          name: "Petto di Pollo al Marsala e Caprino",
          description:
            "Grillattua kananrintaa vuohenjuusto-marsalakastikkeella",
          price: 21.0,
          allergens: "L, G",
        },
        {
          name: "Scaloppine al Limone",
          description:
            "Porsaan sisäfileetä italialaisella sitruunakastikkeella",
          price: 20.0,
          allergens: "L, G, M",
        },
        {
          name: "Agnello al Vino Rosso",
          description: "Lampaankyljyksiä punaviinikastikkeella",
          price: 29.0,
          allergens: "L, G, M",
        },
        {
          name: "Bistecca di Manzo al Pepe",
          description: "Härän sisäfileetä kermaisella pippurikastikkeella",
          price: 33.0,
          allergens: "L, G",
        },
        {
          name: "Filetto al Funghi Porcini",
          description: "Härän sisäfileetä kermaisella herkkutattikastikkeella",
          price: 33.0,
          allergens: "L, G",
        },
        {
          name: "Salmone alla Panna e Lime",
          description: "Lohta kermaisella limekastikkeella",
          price: 27.0,
          allergens: "L, G",
        },
      ],
      footer:
        "⚡ Kaikkiin annoksiin sisältyvät kauden vihannekset ja valitsemasi lisuke (perunat, bataatti, riisi, salaatti, ranskalaiset, vihannekset).",
    },
    {
      category: "RISOTOT (RISOTTOS)",
      items: [
        {
          name: "Risotto al Salmone",
          description:
            "Creamy salmon risotto with onion, cherry tomatoes and rucola, seasoned with white wine",
          price: 19.5,
          allergens: "G",
        },
        {
          name: "Risotto alla Rucola e Pollo",
          description:
            "Creamy chicken risotto with pesto, rucola, herbs, parmesan cheese, olive oil and garlic",
          price: 17.5,
          allergens: "G",
        },
        {
          name: "Risotto Funghi Porcini",
          description:
            "Creamy porcini mushroom risotto with tomato sauce, parmesan cheese, herbs and olive oil",
          price: 18.5,
          allergens: "G",
        },
        {
          name: "Risotto alla Pescatrice",
          description:
            "Risotto with shrimp, mussels, cherry tomatoes and white wine sauce, seasoned with herbs and garlic",
          price: 19.5,
          allergens: "G, L, M",
        },
      ],
    },
    {
      category: "PASTAT (PASTAS)",
      items: [
        {
          name: "Spaghetti alla Bolognese",
          description:
            "Spaghetti with meat-tomato sauce, herbs and parmesan cheese",
          price: 15.5,
        },
        {
          name: "Spaghetti all'Amatriciana",
          description:
            "Spaghetti with spicy herb-tomato sauce, bacon, onion and parmesan cheese",
          price: 15.0,
        },
        {
          name: "Spaghetti alla Carbonara",
          description: "Spaghetti with cream sauce, bacon and parmesan cheese",
          price: 15.5,
        },
        {
          name: "Spaghetti alla Scoglio",
          description:
            "Spaghetti with king prawns, mussels, cherry tomatoes and white wine sauce",
          price: 19.0,
        },
        {
          name: "Penne Pollo e Peperoni",
          description:
            "Creamy chicken pasta with bell peppers, onion and parmesan cheese",
          price: 18.0,
        },
        {
          name: "Penne al Salmone",
          description: "Creamy salmon pasta with garlic-herb sauce",
          price: 19.0,
        },
      ],
      footer: "⚡ Kaikki pasta-annokset saatavilla myös gluteenittomana.",
    },
    {
      category: "PIZZAT (PIZZAS)",
      items: [
        {
          name: "Baltica",
          description: "Lohi, sipuli, katkarapu, maustekurkku, kermaviili",
          price: 15.5,
        },
        {
          name: "Al Pollo",
          description: "Kana, vuohenjuusto, pekoni, rucola, balsamico",
          price: 15.5,
        },
        {
          name: "La Locanda",
          description:
            "Parmankinkku, rucola, parmesaanijuusto, kirsikkatomaatit",
          price: 16.5,
        },
        {
          name: "Bella Marina",
          description:
            "Jättikatkaravut, herkkusienet, kirsikkatomaatit, rucola, pesto",
          price: 17.5,
        },
      ],
      footer: "⚡ Gluteeniton ja vegaaninen pizza saatavilla.",
    },
    {
      category: "JÄLKIRUOAT (DESSERTS)",
      items: [
        {
          name: "Gelato della Casa",
          description: "Vanilla and chocolate ice cream with chocolate sauce",
          price: 8.0,
        },
        {
          name: "Sorbetto",
          description: "Refreshing raspberry sorbet",
          price: 8.0,
          allergens: "G, L, M",
        },
        { name: "Tiramisu", description: "Soft Italian classic", price: 8.5 },
        {
          name: "Panna Cotta",
          description: "Vanilla cream pudding with berry sauce",
          price: 8.5,
          allergens: "G",
        },
        {
          name: "Baklava",
          description:
            "Turkish phyllo pastry dessert with pistachios, served with vanilla ice cream and chocolate sauce",
          price: 8.5,
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#1e1d1b] text-[#f5ae15] bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAEklEQVQImWNgYGD4z0AswK4SAFXuAf8EPy+xAAAAAElFTkSuQmCC')] bg-repeat">
      <header className="bg-gradient-to-b from-[#f5ae15] to-[#e4a00e] py-4 fixed w-full z-50 shadow-xl border-b-2 border-[#d49200]">
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
            {isMobileMenuOpen && (
              <div className="md:hidden mt-4 border-t border-black/10 pt-4">
                <nav className="flex flex-col space-y-4">
                  <a
                    href="/"
                    className="text-white hover:text-black transition-colors duration-200"
                  >
                    MEISTÄ
                  </a>
                  <a
                    href="/varaukset"
                    className="text-white hover:text-black transition-colors duration-200"
                  >
                    PÖYTÄVARAUKSET
                  </a>
                  <div className="relative">
                    <button
                      onClick={() => setIsOpen(!isOpen)}
                      className="text-white hover:text-black transition-colors duration-200 flex items-center"
                    >
                      RUOAT
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
                          className="block text-white hover:text-black transition-colors duration-200"
                        >
                          Lounasbuffet
                        </a>
                        <a
                          href="/alacarte"
                          className="block text-white hover:text-black transition-colors duration-200"
                        >
                          A La Carte
                        </a>
                        <a
                          href="/juomalista"
                          className="block text-white hover:text-black transition-colors duration-200"
                        >
                          Juomalista
                        </a>
                      </div>
                    )}
                  </div>
                </nav>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-5xl px-4 sm:px-8 lg:px-12 pt-52 pb-20">
        <h1 className="mb-24 pt-4 text-center text-5xl font-bold text-[#f5ae15] tracking-[0.15em] relative">
          <span className="relative">
            <span className="absolute -left-12 top-1/2 transform -translate-y-1/2 w-8 h-px bg-gradient-to-r from-transparent to-[#f5ae15]"></span>
            À La Carte
            <span className="absolute -right-12 top-1/2 transform -translate-y-1/2 w-8 h-px bg-gradient-to-l from-transparent to-[#f5ae15]"></span>
          </span>
        </h1>

        {menuData.map((section) => (
          <section key={section.category} className="mb-24 animate-fadeIn">
            <h2 className="mb-12 text-3xl font-light text-[#f5ae15] text-center relative">
              <span className="relative px-8">
                <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-16 h-px bg-gradient-to-r from-transparent to-[#f5ae15]"></span>
                {section.category}
                <span className="absolute right-0 top-1/2 transform -translate-y-1/2 w-16 h-px bg-gradient-to-l from-transparent to-[#f5ae15]"></span>
              </span>
            </h2>
            <div className="grid gap-10">
              {section.items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-start p-6 rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-white/5 hover:to-transparent border-b border-[#f5ae15]/10"
                >
                  <div className="flex-grow pr-8">
                    <h3 className="text-xl font-medium text-white mb-3">
                      {item.name}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {item.description}
                      {item.allergens && (
                        <span className="text-gray-500 ml-1">
                          ({item.allergens})
                        </span>
                      )}
                    </p>
                  </div>
                  <span className="text-[#f5ae15] font-medium text-lg whitespace-nowrap bg-[#f5ae15]/10 px-4 py-2 rounded-full">
                    {item.price}€
                  </span>
                </div>
              ))}
            </div>
            {section.footer && (
              <div className="mt-8 pt-8 border-t border-[#f5ae15]/10 text-gray-400 text-sm text-center">
                <p>{section.footer}</p>
              </div>
            )}
            {section.category === "ALKURUOKA (ANTIPASTI)" && (
              <div className="mt-8 pt-8 border-t border-[#f5ae15]/10 text-gray-400 text-sm">
                <p>G = Gluteeniton (Gluten-free)</p>
                <p>M = Maidoton (Milk-free)</p>
              </div>
            )}
          </section>
        ))}
      </main>

      <Footer1 />
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        @keyframes fadeIn {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default MainComponent;