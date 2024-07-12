// src/components/AboutUs.tsx

"use client";

import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { useLanguage } from "@/context/LanguageContext"; // Import the useLanguage hook

const translations: {
  [key: string]: {
    tagline: string;
    title: string;
    description: string;
    button: string;
  };
} = {
  SR: {
    tagline: "Luksuzni Apartmani",
    title: "NoCo život u srcu Greeley-a",
    description: `
      U srcu Greeley-a, Cilla Smaragdis nudi luksuzan život i novodizajnirane apartmane
      na pešačkoj udaljenosti od mnogih prodavnica, restorana i škola. Ako ste tražili
      ravnotežu između neverovatnih pogodnosti i vrhunskih završnih obrada na centralnoj
      lokaciji - vaša potraga je gotova. Tiho smešteni, a opet blizu svih modernih pogodnosti,
      vidite zašto je Cilla Smaragdis savršeno mesto za vaš dom.
    `,
    button: "Pronađi lokaciju",
  },
  EN: {
    tagline: "Luxury Apartments",
    title: "NoCo Life in the Heart of Greeley",
    description: `
      In the heart of Greeley, Cilla Smaragdis offers deluxe living and newly designed apartments
      within walking distance to countless shops, restaurants, and schools. If you've been searching
      for a balance between amazing amenities and high-end finishes in a central location - your search
      is over. Quietly tucked away, yet close to all of life's modern conveniences, see why Cilla Smaragdis
      is the perfect place to call home.
    `,
    button: "Get Location",
  },
  DE: {
    tagline: "Luxuswohnungen",
    title: "NoCo Leben im Herzen von Greeley",
    description: `
      Im Herzen von Greeley bietet Cilla Smaragdis luxuriöses Wohnen und neu gestaltete Wohnungen,
      die sich in Gehweite zu unzähligen Geschäften, Restaurants und Schulen befinden. Wenn Sie nach
      einer Balance zwischen erstaunlichen Annehmlichkeiten und hochwertigen Ausstattungen in zentraler
      Lage gesucht haben - Ihre Suche ist vorbei. Ruhig gelegen, aber dennoch in der Nähe aller modernen
      Annehmlichkeiten, sehen Sie, warum Cilla Smaragdis der perfekte Ort ist, um zu Hause zu sein.
    `,
    button: "Standort finden",
  },
};

const AboutUs = () => {
  const { language } = useLanguage(); // Get the current language from the context

  const handleGetDirections = () => {
    const address = "1600 Amphitheatre Parkway, Mountain View, CA"; // Change to your desired address
    const mapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(
      address
    )}`;
    window.open(mapsUrl, "_blank");
  };

  return (
    <AboutSection id="about-us">
      <Container>
        <LeftColumn>
          <Logo src="/logo.png" alt="Cilla Smaragdis Logo" />
          <Tagline>{translations[language].tagline}</Tagline>
          <Title>{translations[language].title}</Title>
          <Separator />
        </LeftColumn>
        <RightColumn>
          <Description>{translations[language].description}</Description>
          <ViewButton onClick={handleGetDirections}>
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            &nbsp;{translations[language].button}
          </ViewButton>
        </RightColumn>
      </Container>
    </AboutSection>
  );
};

const AboutSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 0 2rem;
  background-color: #f9f9f9;

  @media (max-width: 768px) {
    padding: 1rem;
    height: auto;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const LeftColumn = styled.div`
  flex: 1;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
  }
`;

const RightColumn = styled.div`
  flex: 1;
  min-width: 300px;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const Logo = styled.img`
  width: 120px;
  height: auto;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    width: 100px;
  }
`;

const Tagline = styled.h2`
  font-size: 1.75rem;
  font-style: italic;
  margin-bottom: 0.5rem;
  color: #a8a8a8;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #1a513a;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Separator = styled.hr`
  width: 50px;
  border: 1px solid #ccc;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1.4rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: #717171;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const ViewButton = styled.button`
  background-color: transparent;
  color: #1a513a;
  border: 2px solid #1a513a;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #1a513a;
    color: #fff;
  }

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }
`;

export default AboutUs;
