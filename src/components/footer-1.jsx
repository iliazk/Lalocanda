"use client";
import React from "react";



export default function Index() {
  return (function MainComponent() {
  return (
    <footer className="bg-[#1e1d1b] text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-center md:items-start">
            <img
              src="https://ucarecdn.com/fa201ac0-28b4-4ab7-8968-6311c7a7e733/-/format/auto/"
              alt="La Locanda Restaurant Logo"
              className="h-24 w-auto mb-6"
            />
            <div className="flex space-x-4">
              <a
                href="https://www.tiktok.com/@lalocandavantaa"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#e4a00e] p-3 rounded-full hover:bg-[#c58c0c] transition-all duration-300 transform hover:scale-110"
              >
                <i className="fab fa-tiktok"></i>
              </a>
              <a
                href="https://www.facebook.com/lalocanda.fi"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#e4a00e] p-3 rounded-full hover:bg-[#c58c0c] transition-all duration-300 transform hover:scale-110"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="https://www.instagram.com/lalocandavantaa"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#e4a00e] p-3 rounded-full hover:bg-[#c58c0c] transition-all duration-300 transform hover:scale-110"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#e4a00e] mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <i className="fas fa-phone text-[#e4a00e] mr-3"></i>
                <a href="tel:+358505495607">+358 50 549 5607</a>
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope text-[#e4a00e] mr-3"></i>
                <a href="mailto:info@lalocandavantaa.fi">
                  info@lalocandavantaa.fi
                </a>
              </li>
              <li className="flex items-center">
                <i className="fas fa-map-marker-alt text-[#e4a00e] mr-3"></i>
                <a
                  href="https://maps.google.com/?q=Maitikkakuja+1,+01350+Vantaa"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Maitikkakuja 1, 01350 Vantaa
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-1 lg:col-span-2">
            <h3 className="text-xl font-semibold text-[#e4a00e] mb-4">
              Opening Hours
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <ul className="space-y-3">
                  <li className="flex justify-between">
                    <span>Monday</span>
                    <span>10:00-21:30</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Tuesday</span>
                    <span>10:00-21:30</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Wednesday</span>
                    <span>10:00-21:30</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Thursday</span>
                    <span>10:00-21:30</span>
                  </li>
                </ul>
              </div>
              <div>
                <ul className="space-y-3">
                  <li className="flex justify-between">
                    <span>Friday</span>
                    <span>10:00-22:00</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday</span>
                    <span>11:00-22:00</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday</span>
                    <span>12:00-21:30</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function StoryComponent() {
  return (
    <div className="min-h-screen bg-[#252422] p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h2 className="text-2xl font-bold text-[#e4a00e]">Footer Component</h2>
        <MainComponent />
      </div>
    </div>
  );
});
}