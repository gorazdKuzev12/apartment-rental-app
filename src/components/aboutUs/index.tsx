"use client";

import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faSnowflake,
  faBed,
  faUtensils,
  faSwimmingPool,
  faHotTub,
  faBath,
  faWifi,
  faParking,
  faPaw,
  faTv,
} from "@fortawesome/free-solid-svg-icons"; // Import the necessary icons
import { useLanguage } from "@/context/LanguageContext"; // Import the useLanguage hook

const translations: {
  [key: string]: {
    tagline: string;
    title: string;
    description: string;
    button: string;
    amenities: string[];
  };
} = {
  SR: {
    title: "Smaragdis: Prirodna oaza u srcu Fruške gore",
    description: `
      Vila Smaragdis se nalazi u srcu Fruške gore, na samo 23 km od Novog Sada. Ova potpuno nova i kompletno opremljena vila može da primi 8 osoba. Pružamo organizaciju različitih proslava, seminara i team building događaja. Vila ima bazen dimenzija 10x5 metara sa toplotnom pumpom i slanom vodom, plažu sa ležaljkama i suncobranima, finsku saunu i igralište za decu. U vili se nalaze tri spavaće sobe, dva kupatila. Sve sobe nude pogled na predivnu planinu Frušku goru. Takođe, vila poseduje privatni parking namenjen za 5 automobila.
    `,
    button: "Pronađi lokaciju",
    amenities: [
      "3 Spavaće sobe",
      "2 Kupatila",
      "Bazen",
      "Sauna",
      "WiFi",
      "Parking",
      "2 Klime",
      "4 TV-a",
      "Pet Friendly",
      "Mikrotalasna",
    ],
    tagline: "",
  },
  EN: {
    tagline: "Luxury Apartments",
    title: "Smaragdis: A Natural Oasis in the Heart of Fruška Gora",
    description: `
      Villa Smaragdis is located in the heart of Fruška Gora, just 23 km from Novi Sad. This brand new and fully equipped villa can accommodate 8 people. We offer organization of various celebrations, seminars, and team-building events. The villa has a 10x5 meter pool with a heat pump and sea salt, a beach with loungers and umbrellas, a Finnish sauna, and a children's playground. The villa has three bedrooms, two bathrooms. All rooms offer a view of the beautiful Fruška Gora mountain. Additionally, the villa has private parking for 5 cars.
    `,
    button: "Get Location",
    amenities: [
      "3 Bedrooms",
      "2 Bathrooms",
      "Pool",
      "Sauna",
      "WiFi",
      "Parking",
      "2 Air Conditioners",
      "4 TVs",
      "Pet Friendly",
      "Microwave",
    ],
  },
  DE: {
    tagline: "Luxuswohnungen",
    title: "Smaragdis: Eine natürliche Oase im Herzen von Fruška Gora",
    description: `
      Die Villa Smaragdis befindet sich im Herzen von Fruška Gora, nur 23 km von Novi Sad entfernt. Diese brandneue und voll ausgestattete Villa bietet Platz für 8 Personen. Wir bieten die Organisation verschiedener Feierlichkeiten, Seminare und Team-Building-Veranstaltungen an. Die Villa verfügt über einen 10x5 Meter großen Pool mit Wärmepumpe und Meersalz, einen Strand mit Liegestühlen und Sonnenschirmen, eine finnische Sauna und einen Kinderspielplatz. Die Villa hat drei Schlafzimmer und zwei Badezimmer. Alle Zimmer bieten Blick auf den schönen Berg Fruška Gora. Darüber hinaus verfügt die Villa über einen privaten Parkplatz für 5 Autos.
    `,
    button: "Standort finden",
    amenities: [
      "3 Schlafzimmer",
      "2 Badezimmer",
      "Pool",
      "Sauna",
      "WiFi",
      "Parkplatz",
      "2 Klimaanlagen",
      "4 Fernseher",
      "Haustierfreundlich",
      "Mikrowelle",
    ],
  },
};

const AboutUs = () => {
  const { language } = useLanguage(); // Get the current language from the context

  const handleGetDirections = () => {
    const address = "Kaludjerica 52, Čerević 21311, Serbia"; // Change to your desired address
    const mapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(
      address
    )}`;
    window.open(mapsUrl, "_blank");
  };

  return (
    <AboutSection id="about-us">
      <Container>
        <LeftColumn>
          <Logo src="/logo.png" alt="Villa Smaragdis Logo" />
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
      <AmenitiesSection>
      <AmenitiesContainer>
        {translations[language].amenities.map((amenity, index) => (
          <AmenityCard key={index}>
            <IconWrapper>
              <FontAwesomeIcon icon={amenityIcons[index]} />
            </IconWrapper>
            <AmenityText>{amenity}</AmenityText>
          </AmenityCard>
        ))}
      </AmenitiesContainer>
    </AmenitiesSection>
    </AboutSection>
  );
};

const amenityIcons = [
  faBed, // 3 Spavaće sobe / 3 Bedrooms / 3 Schlafzimmer
  faBath, // 2 Kupatila / 2 Bathrooms / 2 Badezimmer
  faSwimmingPool, // Bazen / Pool / Pool
  faHotTub, // Sauna / Sauna / Sauna
  faWifi, // WiFi / WiFi / WiFi
  faParking, // Parking / Parking / Parkplatz
  faSnowflake, // 2 Klime / 2 Air Conditioners / 2 Klimaanlagen
  faTv, // 4 TV-a / 4 TVs / 4 Fernseher
  faPaw, // Pet Friendly / Pet Friendly / Haustierfreundlich
  faUtensils, // Mikrotalasna / Microwave / Mikrowelle
];

const AboutSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 8rem 2rem;

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
  font-size: 2.7rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #1a513a;
  font-family: "Nunito";

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
  color: white;
  background-color: #1a513a;

  padding: 0.75rem 1.5rem;
  font-size: 0.9rem;
  letter-spacing: 3px;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  font-family: "Montserrat";

  &:hover {
    background-color: white;
    color:#1a513a;
    border: 2px solid #1a513a;

  }

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    display: block; /* Ensure it is block element */
    margin: 0 auto; /* Center the button horizontally on mobile */

  }
`;

const AmenitiesSection = styled.section`
  width: 100%;
  padding: 2rem 1rem;
  margin-top: 2rem;

`;

const AmenitiesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  max-width: 100%;
  margin: 0 auto;
  margin-top: 2.5rem;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const AmenityCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  width: calc(22% - 4rem); /* Four per row on larger screens */
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }

  @media (max-width: 1024px) {
    width: calc(33.33% - 1.5rem); /* Three per row on medium screens */
  }

  @media (max-width: 768px) {
    width: calc(50% - 1rem); /* Two per row on mobile */
  }

 
`;

const IconWrapper = styled.div`
  font-size: 1.5rem;
  color: #1a513a;
  margin-bottom: 1rem;
`;

const AmenityText = styled.p`
  font-size: 1.2rem;
  color: #1a513a;
  text-align: center;
  
`;

export default AboutUs;
