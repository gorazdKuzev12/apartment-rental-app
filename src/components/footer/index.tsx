// components/Footer.js
"use client";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <LogoColumn>
          <Logo src="/logo.png" alt="Logo" />
        </LogoColumn>
        <ContactColumn>
          <ColumnTitle>Contact Us</ColumnTitle>
          <Address>
            3769 W. 25th Street,
            <br />
            Greeley, CO 80634
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
            <MenuItem href="#">Home</MenuItem>
            <MenuItem href="#">Floor Plans</MenuItem>
            <MenuItem href="#">Amenities</MenuItem>
            <MenuItem href="#">Gallery</MenuItem>
            <MenuItem href="#">Neighborhood</MenuItem>
          </MenuList>
        </MenuColumn>
        <LinksColumn>
          <ColumnTitle>Links</ColumnTitle>
          <LinkItem href="#">Resident Login</LinkItem>
          <ContactButton href="#">Contact Us</ContactButton>
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
  background-color: #0c3625;
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
