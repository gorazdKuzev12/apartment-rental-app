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
  faPhone,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faAirbnb } from "@fortawesome/free-brands-svg-icons";

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
        {/* Left Column: Logo + Tagline + Title */}
        <LeftColumn>
          <Logo
            src={aboutData.logo || "/logo.png"}
            alt="Villa Smaragdis Logo"
          />
          <Tagline>{localizedData.tagline}</Tagline>
          <Title>{localizedData.title}</Title>
          <Separator />
        </LeftColumn>

        {/* Right Column: Description + Buttons */}
        <RightColumn>
          <Description>{localizedData.description}</Description>

          <ExtraLinksContainer>
            {/* Call Us and Social Links */}
            <SocialAndCall>
              <CallButton href="tel:+381638800732">
                <FontAwesomeIcon icon={faPhone} />
                &nbsp;Call: +381 63 8800732
              </CallButton>

              <SocialButtons>
                <SocialLink
                  href="https://www.instagram.com/villa_smaragdis?igsh=MTZsMjZjbWx5bGw4aQ%3D%3D"
                  target="_blank"
                >
                  Instagram
                </SocialLink>

                <SocialLink
                  href="https://www.airbnb.com/rooms/52522746?source_impression_id=p3_1727802292_P3kPDTOsgtHYcU5G&locale=en&_set_bev_on_new_domain=1727802292_EAYmU5MzdhZWU4Y2"
                  target="_blank"
                >
                  <FontAwesomeIcon icon={faAirbnb} />
                  &nbsp;Airbnb
                </SocialLink>

                <SocialLink
                  href="https://www.booking.com/hotel/rs/villa-smaragdis.en-gb.html"
                  target="_blank"
                >
                  <FontAwesomeIcon icon={faCalendarAlt} />
                  &nbsp;Booking
                </SocialLink>
              </SocialButtons>
            </SocialAndCall>

            {/* Get Location Button */}
            <ViewButton onClick={handleGetDirections}>
              GET LOCATION
            </ViewButton>
          </ExtraLinksContainer>
        </RightColumn>
      </Container>

      {/* Amenities Section */}
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

export default AboutUs;

/* ===== Styled Components ===== */

const AboutSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;

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
  font-size: 2.6rem;
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
  font-size: 1.3rem;
  line-height: 1.6;
  margin-top: 3rem;
  margin-bottom: 2rem;
  color: #717171;
  font-style: italic;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const ExtraLinksContainer = styled.div`
  margin-top: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const SocialAndCall = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 768px) {
    align-items: center;
  }
`;

const SocialButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const CallButton = styled.a`
  color: #1a513a;
  font-size: 0.9rem;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  font-weight: 600;
  gap: 0.4rem;
  transition: color 0.3s ease;

  &:hover {
    color: #3c3c3c;
  }
`;

const ViewButton = styled.button`
  background-color: #1a513a;
  color: white;
  padding: 0.75rem 1.5rem;
  font-size: 0.6rem;
  letter-spacing: 5px;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: "Montserrat";

  &:hover {
    background-color: white;
    color: #1a513a;
    border: 2px solid #1a513a;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SocialLink = styled.a`
  color: #1a513a;
  font-size: 0.85rem;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  transition: color 0.3s ease;

  &:hover {
    color: #3c3c3c;
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
  width: calc(22% - 4rem);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }

  @media (max-width: 1024px) {
    width: calc(33.33% - 1.5rem);
  }

  @media (max-width: 768px) {
    width: calc(50% - 1rem);
  }
`;

const IconWrapper = styled.div`
  font-size: 1.3rem;
  color: #1a513a;
  margin-bottom: 1rem;
`;

const AmenityText = styled.p`
  font-size: 1.1rem;
  color: #1a513a;
  text-align: center;
`;
