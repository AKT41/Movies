import React, { useState, useEffect } from "react";
export default function BackToTop() {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight / 2) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div>
      <p
        className="back-to-top"
        onClick={handleClick}
        style={{ opacity: isScrolled ? "1" : "0" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-arrow-narrow-up"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M12 5l0 14"></path>
          <path d="M16 9l-4 -4"></path>
          <path d="M8 9l4 -4"></path>
        </svg>
      </p>
      <style>
        {`
        .back-to-top {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #f1f1f1;
            border: none;
            color: #000;
            padding: 15px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            margin: 4px 2px;
            cursor: pointer;
            border-radius: 9px;
            transition: all 0.3s ease-in-out;
            z-index: 999;
        }
        .back-to-top:hover {
            background-color: #fff;
            color: #000;
            transition: all 0.3s ease-in-out;
        }
        .back-to-top:active {
            transform: scale(0.9);
            transition: all 0.3s ease-in-out;
        }
        @keyframes bounce {
            0% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-10px);
            }
            100% {
                transform: translateY(0);
            }
        }
        .back-to-top:hover {
            animation: bounce 1s infinite;
            transition: all 0.3s ease-in-out;
        }

        `}
      </style>
    </div>
  );
}
