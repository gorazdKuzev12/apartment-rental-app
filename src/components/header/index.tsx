"use client";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa"; // Import icons for the hamburger menu
import { useLanguage } from "@/context/LanguageContext";
const translations: { [key: string]: { [key: string]: string } } = {
  SR: {
    home: "Početna",
    book: "Rezerviši",
    gallery: "Galerija",
    about: "O nama",
    contact: "Kontakt",
  },
  EN: {
    home: "Home",
    book: "Book",
    gallery: "Gallery",
    about: "About",
    contact: "Contact",
  },
  DE: {
    home: "Startseite",
    book: "Buchen",
    gallery: "Galerie",
    about: "Über uns",
    contact: "Kontakt",
  },
};

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // State to manage menu visibility
  const { language, setLanguage } = useLanguage(); // Use the LanguageContext
  const router = useRouter();
  const throttle = (func: { (): void; apply?: any; }, limit: number) => {
    let lastFunc: string | number | NodeJS.Timeout | undefined;
    let lastRan: number;
    return function (this: any, ...args: any[]) {
      if (!lastRan) {
        func.apply(this, args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(() => {
          if (Date.now() - lastRan >= limit) {
            func.apply(this, args);
            lastRan = Date.now();
          }
        }, limit - (Date.now() - lastRan));
      }
    };
  };
  useEffect(() => {
    const handleScroll = () => {
      // Add a buffer to prevent rapid toggling around the threshold
      const threshold = 50;
      const buffer = 10; // Add a buffer to make transitions smoother

      if (window.scrollY > threshold + buffer && !scrolled) {
        setScrolled(true);
      } else if (window.scrollY < threshold - buffer && scrolled) {
        setScrolled(false);
      }
    };

    // Throttle the scroll event for performance
    const throttledHandleScroll = throttle(handleScroll, 200);

    window.addEventListener("scroll", throttledHandleScroll);
    return () => window.removeEventListener("scroll", throttledHandleScroll);
  }, [scrolled]);

  const handleNavigation = async (path: string, hash: string) => {
    await router.push(path);

    // Polling to check if the element exists
    const checkExist = setInterval(() => {
      if (hash) {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          clearInterval(checkExist);
        }
      }
    }, 100); // Check every 100ms

    setMenuOpen(false); // Close the menu after navigation
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLanguageChange = (event: { target: { value: any } }) => {
    setLanguage(event.target.value);
  };

  return (
    <Nav className={scrolled ? "scrolled" : ""}>
      <Logo>
        <Link href="/">
          <img src="/logo.png" alt="Villa Smaragdis Logo" />
        </Link>
      </Logo>
      <Hamburger onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </Hamburger>
      <NavMenu className={menuOpen ? "open" : ""}>
        <NavItem onClick={() => handleNavigation("/", "home")}>
          {translations[language].home}
        </NavItem>
        <NavItem onClick={() => handleNavigation("/", "book-room")}>
          {translations[language].book}
        </NavItem>
        <NavItem as={Link} href="/gallery">
          {translations[language].gallery}
        </NavItem>
        <NavItem onClick={() => handleNavigation("/", "about-us")}>
          {translations[language].about}
        </NavItem>
        <NavItem onClick={() => handleNavigation("/", "contact")}>
          {translations[language].contact}
        </NavItem>
      </NavMenu>
      <LanguageSelect value={language} onChange={handleLanguageChange}>
        <option value="SR">Serbian</option>
        <option value="EN">English (US)</option>
        <option value="DE">German</option>
      </LanguageSelect>
    </Nav>
  );
};

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: #fff;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 1000;
  transition: all 0.3s ease;

  &.scrolled {
    padding: 0.8rem 2rem;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

    img {
      height: 80px;
      transition: height 0.3s ease;
    }
  }
`;

const Logo = styled.div`
  img {
    width: auto;
    height: 100px;
    transition: height 0.3s ease;

    @media (max-width: 768px) {
      height: 70px; /* Adjust logo height for smaller screens */
    }
  }
`;

const Hamburger = styled.div`
  display: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: #000;

  @media (max-width: 768px) {
    display: block;
    font-size: 2rem; /* Increase size for smaller screens */
  }
`;

const NavMenu = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-left: auto;
  margin-right: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    background: #fff;
    border-top: 1px solid #ddd;
    display: none;

    &.open {
      display: flex;
    }
  }
`;

const NavItem = styled.a`
  text-decoration: none;
  color: #000;
  cursor: pointer;
  transition: color 0.3s ease;
  font-size: 1.3rem;

  &:hover {
    color: #388b7a;
    border-bottom: 2px solid #388b7a;
  }

  @media (max-width: 768px) {
    padding: 1rem 2rem;
    border-bottom: 1px solid #ddd;

    &:hover {
      border-bottom: none;
    }
  }
`;

const LanguageSelect = styled.select`
  font-size: 1rem;
  border: none;
  background: transparent;
  cursor: pointer;
  margin-left: 1rem;

  option {
    display: flex;
    align-items: center;
    padding: 0.5rem;
    background: #fff;
    color: #000;
    cursor: pointer;
  }
`;

export default Header;
