"use client";
import React from "react";



export default function Index() {
  return (function MainComponent({ currentLanguage = "fi", onLanguageChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const languageMap = {
    fi: {
      name: "Suomi",
      flag: "🇫🇮",
      switchTo: "en",
    },
    en: {
      name: "English",
      flag: "🇬🇧",
      switchTo: "fi",
    },
  };

  const handleLanguageSwitch = () => {
    const newLang = languageMap[currentLanguage].switchTo;
    if (onLanguageChange) {
      onLanguageChange(newLang);
    }
    setIsOpen(false);

    const currentPath = window.location.pathname;
    const newPath =
      currentPath === "/"
        ? newLang === "en"
          ? "/en"
          : "/"
        : currentPath.startsWith("/en/")
        ? currentPath.replace("/en/", "/")
        : "/en" + currentPath;

    window.location.href = newPath;
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-black bg-[#f5ae15] rounded-lg hover:bg-[#e4a00e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f5ae15]"
      >
        <span className="mr-2">{languageMap[currentLanguage].flag}</span>
        <span className="mr-1">{languageMap[currentLanguage].name}</span>
        <i
          className={`fas fa-chevron-down text-xs transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        ></i>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <button
            onClick={handleLanguageSwitch}
            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <span className="mr-2">
              {languageMap[languageMap[currentLanguage].switchTo].flag}
            </span>
            {languageMap[languageMap[currentLanguage].switchTo].name}
          </button>
        </div>
      )}
    </div>
  );
}

function StoryComponent() {
  const [currentLanguage, setCurrentLanguage] = useState("fi");

  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Language Switcher Component</h2>
        <p className="text-gray-600 mb-8">
          A language switcher that toggles between Finnish and English
        </p>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Default (Finnish)</h3>
          <MainComponent
            currentLanguage="fi"
            onLanguageChange={setCurrentLanguage}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">English Version</h3>
          <MainComponent
            currentLanguage="en"
            onLanguageChange={setCurrentLanguage}
          />
        </div>
      </div>
    </div>
  );
});
}