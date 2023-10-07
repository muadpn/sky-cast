"use client";
import React, { useEffect } from "react";
import Typed from "typed.js";
const HeroTitle = () => {
  // Get whats on the Span Component
  const el = React.useRef(null);

  // Render the Array and retrive whats rendered and whats not.
  const typed = React.useRef(null);
  useEffect(() => {
    const options = {
      strings: [
        "Forecast Hub",
        "Info Hub",
        "Insight  Hub",

      ],
      typeSpeed: 50,
      backSpeed: 50,
      loop: true,
    };

    // elRef refers to the <span> rendered below
    typed.current = new Typed(el.current, options);

    return () => {
      // Make sure to destroy Typed instance during cleanup
      // to prevent memory leaks
      typed.current.destroy();
    };
  }, []);
  return (
    <span className="">
      <span ref={el} className="text-blue-400 element whitespace-pre">
        {" "}
      </span>{" "}
      {""}
    </span>
  );
};

export default HeroTitle;
