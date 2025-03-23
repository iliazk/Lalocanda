"use client";
import React from "react";

function MainComponent() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#1e1d1b] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl text-[#e4a00e] font-bold mb-4">
          Deployment Test
        </h1>
        <p className="text-xl text-white">
          {currentTime.toLocaleString("en-US", {
            timeZone: "Europe/Helsinki",
            dateStyle: "full",
            timeStyle: "long",
          })}
        </p>
      </div>
    </div>
  );
}

export default MainComponent;