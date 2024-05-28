// components/Header.js
"use client";
import styled from "styled-components";
import { useEffect, useState } from "react";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <Nav className={scrolled ? "scrolled" : ""}>
      <Logo>
        <img src="/logo.png" alt="Cilla Smaragdis Logo" />
      </Logo>
      <NavMenu>
        <NavItem href="">Home</NavItem>
        <NavItem href="#">Book a Room</NavItem>
        <NavItem href="/gallery">Gallery</NavItem>
        <NavItem href="#">About</NavItem>
        <NavItem href="#">Contact</NavItem>
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
  }
`;

const NavMenu = styled.div`
  display: flex;
  gap: 1.5rem;
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
`;

export default Header;
