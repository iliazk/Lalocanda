"use client";
import React from "react";

function MainComponent() {
  useEffect(() => {
    window.location.href = "/admin/dashboard";
  }, []);

  return null;
}

export default MainComponent;