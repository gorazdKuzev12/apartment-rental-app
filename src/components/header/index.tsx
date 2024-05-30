"use client";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa"; // Import icons for the hamburger menu

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // State to manage menu visibility
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = async (path, hash) => {
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

  return (
    <Nav className={scrolled ? "scrolled" : ""}>
      <Logo>
        <Link href="/">
          <img src="/logo.png" alt="Cilla Smaragdis Logo" />
        </Link>
      </Logo>
      <Hamburger onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </Hamburger>
      <NavMenu className={menuOpen ? "open" : ""}>
        <NavItem onClick={() => handleNavigation("/", "home")}>Home</NavItem>
        <NavItem onClick={() => handleNavigation("/", "book-room")}>
          Book
        </NavItem>
        <NavItem as={Link} href="/gallery">
          Gallery
        </NavItem>
        <NavItem onClick={() => handleNavigation("/", "about-us")}>
          About
        </NavItem>
        <NavItem onClick={() => handleNavigation("/", "contact")}>
          Contact
        </NavItem>
      </NavMenu>
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

export default Header;
