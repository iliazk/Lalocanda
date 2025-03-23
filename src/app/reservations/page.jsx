"use client";
import React from "react";

function MainComponent() {
  const [error] = useState(null);
  const [success] = useState(false);

  return (
    <div className="min-h-screen bg-[#1e1d1b] flex items-center justify-center">
      <div className="text-center text-white">
        <p>
          This page has been removed. Please visit{" "}
          <a href="/varaukset" className="text-[#e4a00e] hover:underline">
            Pöytävaraukset
          </a>{" "}
          instead.
        </p>
      </div>
    </div>
  );
}

export default MainComponent;