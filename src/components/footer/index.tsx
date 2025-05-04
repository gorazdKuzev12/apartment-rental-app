"use client";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

interface NavigationItem {
  id: number;
  label: string; // e.g., "Početna"
  slug: string;  // e.g., "home"
  order: number;
  translations: {
    [key: string]: string; // e.g., { EN: "Home", DE: "Startseite" }
  };
}

interface FooterProps {
  navigationItems: NavigationItem[];
  languageCode: string; // e.g. "sr", "en", "de"
}

// You can add or remove fields as needed:
const translations: {
  [key: string]: {
    contactUs: string;
    address: string;
    getDirections: string;
    menu: string;
  };
} = {
  SR: {
    contactUs: "Kontaktirajte nas",
    address: "Kaludjerica 52, Čerević 21311, Serbia",
    getDirections: "Pronađi lokaciju",
    menu: "Meni",
  },
  EN: {
    contactUs: "Contact Us",
    address: "Kaludjerica 52, Čerević 21311, Serbia",
    getDirections: "Get Directions",
    menu: "Menu",
  },
  DE: {
    contactUs: "Kontaktieren Sie uns",
    address: "Kaludjerica 52, Čerević 21311, Serbia",
    getDirections: "Wegbeschreibung",
    menu: "Menü",
  },
};

const Footer: React.FC<FooterProps> = ({ navigationItems, languageCode }) => {
  const { language } = useLanguage();
  const router = useRouter();

  /**
   * Decide how to route based on the slug and languageCode.
   * Adjust to match your Next.js routing structure.
   */
  const getPathAndHash = (slug: string, lang: string) => {
    switch (slug) {
      case "home":
        // e.g., /sr or /en or /de for home
        return { path: `/${lang}`, hash: "home" };
      case "gallery":
        // e.g., /sr/gallery or /en/gallery
        return { path: `/${lang}/gallery`, hash: "" };
      case "book-room":
        // e.g., /sr#book-room
        return { path: `/${lang}`, hash: "book-room" };
      case "about-us":
        // e.g., /sr#about-us
        return { path: `/${lang}`, hash: "about-us" };
      case "contact":
        // e.g., /sr#contact
        return { path: `/${lang}`, hash: "contact" };
      default:
        // Fallback: put everything else at /:lang/:slug or just attach as a hash
        return { path: `/${lang}`, hash: slug };
    }
  };

  /**
   * Smooth-scroll approach: after pushing the route, poll until the element
   * with that ID is in the DOM, then scroll.
   */
  const handleNavigation = async (path: string, hash?: string) => {
    await router.push(path);

    if (!hash) return;

    const checkExist = setInterval(() => {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        clearInterval(checkExist);
      }
    }, 100);
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
        {/* Contact / Address Column */}
        <ContactColumn>
          <ColumnTitle>{translations[language].contactUs}</ColumnTitle>
          <Address>{translations[language].address}</Address>
          <GetDirections onClick={handleGetDirections}>
            {translations[language].getDirections}
          </GetDirections>
          <SocialIcons>
            <SocialIcon
              href="https://www.instagram.com/villa_smaragdis?igsh=MTZsMjZjbWx5bGw4aQ%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </SocialIcon>
          </SocialIcons>
        </ContactColumn>

        {/* Dynamic Menu Column */}
        <MenuColumn>
          <ColumnTitle>{translations[language].menu}</ColumnTitle>
          <MenuList>
            {navigationItems
              ?.sort((a, b) => a.order - b.order)
              ?.map((item) => {
                // If current language is SR, the default `label` is used
                // Otherwise, use item.translations[language] if available
                const localizedLabel =
                  language === "SR"
                    ? item.label
                    : item.translations?.[language] || item.label;

                const { path, hash } = getPathAndHash(item.slug, languageCode);

                return (
                  <MenuItem
                    key={item.id}
                    onClick={() => handleNavigation(path, hash)}
                  >
                    {localizedLabel}
                  </MenuItem>
                );
              })}
          </MenuList>
        </MenuColumn>
      </FooterContent>
      <FooterBottom>
        <Copyright>© 2024 Villa Smaragdis</Copyright>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;

/* ========== Styled Components ========== */

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
  white-space: pre-line; /* Preserve any line breaks */
`;

const GetDirections = styled.button`
  background: none;
  color: #fff;
  border: none;
  padding: 0;
  font: inherit;
  text-decoration: underline;
  cursor: pointer;
  margin-bottom: 1rem;
  display: block;

  &:hover {
    text-decoration: none;
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

const MenuItem = styled.button`
  text-align: left;
  background: none;
  color: #fff;
  border: none;
  padding: 0;
  margin-bottom: 0.5rem;
  font: inherit;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    text-decoration: none;
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
