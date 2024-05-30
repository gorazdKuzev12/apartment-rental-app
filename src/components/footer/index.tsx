// components/Footer.js
"use client";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Footer = () => {
  const router = useRouter();

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
  };
  return (
    <FooterContainer>
      <FooterContent>
        <ContactColumn>
          <ColumnTitle>Contact Us</ColumnTitle>
          <Address>
            3769 W. 25th Street,
            <br />
            Novi Sad, Serbia
          </Address>
          <GetDirections href="#">Get Directions</GetDirections>
          <SocialIcons>
            <SocialIcon href="#">
              <FontAwesomeIcon icon={faFacebook} />
            </SocialIcon>
            <SocialIcon href="#">
              <FontAwesomeIcon icon={faInstagram} />
            </SocialIcon>
          </SocialIcons>
        </ContactColumn>
        <MenuColumn>
          <ColumnTitle>Menu</ColumnTitle>
          <MenuList>
            <MenuItem onClick={() => handleNavigation("/", "home")}>
              Home
            </MenuItem>
            <MenuItem onClick={() => handleNavigation("/", "book-room")}>
              Book
            </MenuItem>
            <MenuItem as={Link} href="/gallery">
              Gallery
            </MenuItem>
            <MenuItem onClick={() => handleNavigation("/", "about-us")}>
              About
            </MenuItem>
            <MenuItem onClick={() => handleNavigation("/", "contact")}>
              Contact
            </MenuItem>
          </MenuList>
        </MenuColumn>
        <LinksColumn>
          <ColumnTitle>Links</ColumnTitle>
          <LinkItem href="#">Resident Login</LinkItem>
        </LinksColumn>
      </FooterContent>
      <FooterBottom>
        <Copyright>
          © 2024 Your Company | <FooterLink href="#">Privacy Policy</FooterLink>{" "}
          | <FooterLink href="#">Accessibility Statement</FooterLink>
        </Copyright>
      </FooterBottom>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  background-color: #0b2520;
  color: #fff;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FooterContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
`;

const LogoColumn = styled.div`
  flex: 1;
  min-width: 200px;
`;

const Logo = styled.img`
  width: 100px;
`;

const ContactColumn = styled.div`
  flex: 1;
  min-width: 200px;
`;

const ColumnTitle = styled.h4`
  font-size: 1.25rem;
  margin-bottom: 1rem;
  text-transform: uppercase;
  border-bottom: 1px solid #fff;
  padding-bottom: 0.5rem;
`;

const Address = styled.p`
  margin-bottom: 1rem;
`;

const GetDirections = styled.a`
  color: #fff;
  text-decoration: none;
  margin-bottom: 1rem;
  display: block;

  &:hover {
    text-decoration: underline;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialIcon = styled.a`
  color: #fff;
  font-size: 1.5rem;

  &:hover {
    color: #1a513a;
  }
`;

const MenuColumn = styled.div`
  flex: 1;
  min-width: 200px;
`;

const MenuList = styled.div`
  display: flex;
  flex-direction: column;
`;

const MenuItem = styled.a`
  color: #fff;
  text-decoration: none;
  margin-bottom: 0.5rem;

  &:hover {
    text-decoration: underline;
  }
`;

const LinksColumn = styled.div`
  flex: 1;
  min-width: 200px;
`;

const LinkItem = styled.a`
  color: #fff;
  text-decoration: none;
  margin-bottom: 1rem;

  &:hover {
    text-decoration: underline;
  }
`;

const ContactButton = styled.a`
  display: inline-block;
  padding: 0.5rem 1rem;
  border: 2px solid #fff;
  color: #fff;
  text-transform: uppercase;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: #fff;
    color: #000;
  }
`;

const FooterBottom = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: center;
  border-top: 1px solid #333;
  padding-top: 1rem;
  margin-top: 2rem;
`;

const Copyright = styled.p`
  font-size: 0.875rem;
`;

const FooterLink = styled.a`
  color: #fff;
  text-decoration: none;
  margin: 0 0.5rem;

  &:hover {
    text-decoration: underline;
  }
`;

export default Footer;
