"use client";
import React from "react";

function MainComponent() {
  useEffect(() => {
    window.location.href = "/admin";
  }, []);

  return null;
}

export default MainComponent;