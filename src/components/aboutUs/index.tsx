"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faBath,
  faSwimmingPool,
  faHotTub,
  faWifi,
  faParking,
  faSnowflake,
  faTv,
  faPaw,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { useLanguage } from "@/context/LanguageContext";

const amenityIcons = [
  faBed,
  faBath,
  faSwimmingPool,
  faHotTub,
  faWifi,
  faParking,
  faSnowflake,
  faTv,
  faPaw,
  faUtensils,
];

interface AboutUsData {
  tagline: Record<string, string>;
  title: Record<string, string>;
  description: Record<string, string>;
  button_text: Record<string, string>;
  address: string;
  logo: string;
  amenities: Record<string, string[]>;
  languageCode: string;
}

const AboutUs = ({ aboutData }: { aboutData: AboutUsData }) => {
  const [localizedData, setLocalizedData] = useState({
    tagline: aboutData.tagline["EN"], // Default to English
    title: aboutData.title["EN"],
    description: aboutData.description["EN"],
    button_text: aboutData.button_text["EN"],
    amenities: aboutData.amenities["EN"],
  });
  const language = aboutData.languageCode.toUpperCase();

  useEffect(() => {
    setLocalizedData({
      tagline: aboutData.tagline[language] || aboutData.tagline["EN"],
      title: aboutData.title[language] || aboutData.title["EN"],
      description: aboutData.description[language] || aboutData.description["EN"],
      button_text: aboutData.button_text[language] || aboutData.button_text["EN"],
      amenities: aboutData.amenities[language] || aboutData.amenities["EN"],
    });
  }, [language, aboutData]);

  const handleGetDirections = () => {
    const mapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(
      aboutData.address
    )}`;
    window.open(mapsUrl, "_blank");
  };

  return (
    <AboutSection id="about-us">
      <Container>
        <LeftColumn>
          <Logo
            src={aboutData.logo || "/logo.png"}
            alt="Villa Smaragdis Logo"
          />
          <Tagline>{localizedData.tagline}</Tagline>
          <Title>{localizedData.title}</Title>
          <Separator />
        </LeftColumn>
        <RightColumn>
          <Description>{localizedData.description}</Description>
          <ViewButton onClick={handleGetDirections}>
            {localizedData.button_text}
          </ViewButton>
        </RightColumn>
      </Container>
      <AmenitiesSection>
        <AmenitiesContainer>
          {localizedData.amenities.map((amenity, index) => (
            <AmenityCard key={index}>
              <IconWrapper>
                <FontAwesomeIcon icon={amenityIcons[index] || faUtensils} />
              </IconWrapper>
              <AmenityText>{amenity}</AmenityText>
            </AmenityCard>
          ))}
        </AmenitiesContainer>
      </AmenitiesSection>
    </AboutSection>
  );
};



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
  font-size: 0.7rem;
  letter-spacing: 5px;
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
