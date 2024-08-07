"use client";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext"; // Import the useLanguage hook

const translations: {
  [key: string]: {
    contactUs: string;
    address: string;
    getDirections: string;
    menu: string;
    home: string;
    book: string;
    gallery: string;
    about: string;
    contact: string;
    links: string;
    residentLogin: string;
    privacyPolicy: string;
    accessibilityStatement: string;
  };
} = {
  SR: {
    contactUs: "Kontaktirajte nas",
    address: "Kaludjerica 52, Čerević 21311, Serbia",
    getDirections: "Pronađi lokaciju",
    menu: "Meni",
    home: "Početna",
    book: "Rezerviši",
    gallery: "Galerija",
    about: "O nama",
    contact: "Kontakt",
    links: "Linkovi",
    residentLogin: "Prijava za stanare",
    privacyPolicy: "Politika privatnosti",
    accessibilityStatement: "Izjava o pristupačnosti",
  },
  EN: {
    contactUs: "Contact Us",
    address: "Kaludjerica 52, Čerević 21311, Serbia",
    getDirections: "Get Directions",
    menu: "Menu",
    home: "Home",
    book: "Book",
    gallery: "Gallery",
    about: "About",
    contact: "Contact",
    links: "Links",
    residentLogin: "Resident Login",
    privacyPolicy: "Privacy Policy",
    accessibilityStatement: "Accessibility Statement",
  },
  DE: {
    contactUs: "Kontaktieren Sie uns",
    address: "Kaludjerica 52, Čerević 21311, Serbia",
    getDirections: "Wegbeschreibung",
    menu: "Menü",
    home: "Startseite",
    book: "Buchen",
    gallery: "Galerie",
    about: "Über uns",
    contact: "Kontakt",
    links: "Links",
    residentLogin: "Bewohner-Login",
    privacyPolicy: "Datenschutzrichtlinie",
    accessibilityStatement: "Barrierefreiheitserklärung",
  },
};

const Footer = () => {
  const { language } = useLanguage(); // Get the current language from the context
  const router = useRouter();

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
  };

  const handleGetDirections = () => {
    const address = translations[language].address;
    const mapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(
      address
    )}`;
    window.open(mapsUrl, "_blank");
  };

  return (
    <FooterContainer>
      <FooterContent>
        <ContactColumn>
          <ColumnTitle>{translations[language].contactUs}</ColumnTitle>
          <Address>{translations[language].address}</Address>
          <GetDirections onClick={handleGetDirections}>
            {translations[language].getDirections}
          </GetDirections>
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
          <ColumnTitle>{translations[language].menu}</ColumnTitle>
          <MenuList>
            <MenuItem onClick={() => handleNavigation("/", "home")}>
              {translations[language].home}
            </MenuItem>
            <MenuItem onClick={() => handleNavigation("/", "book-room")}>
              {translations[language].book}
            </MenuItem>
            <MenuItem as={Link} href="/gallery">
              {translations[language].gallery}
            </MenuItem>
            <MenuItem onClick={() => handleNavigation("/", "about-us")}>
              {translations[language].about}
            </MenuItem>
            <MenuItem onClick={() => handleNavigation("/", "contact")}>
              {translations[language].contact}
            </MenuItem>
          </MenuList>
        </MenuColumn>
        <LinksColumn>
          <ColumnTitle>{translations[language].links}</ColumnTitle>
          <LinkItem href="#">{translations[language].residentLogin}</LinkItem>
        </LinksColumn>
      </FooterContent>
      <FooterBottom>
        <Copyright>
          © 2024 Your Company |{" "}
          <FooterLink href="#">
            {translations[language].privacyPolicy}
          </FooterLink>{" "}
          |{" "}
          <FooterLink href="#">
            {translations[language].accessibilityStatement}
          </FooterLink>
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
  white-space: pre-line; /* To maintain the line breaks */
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
