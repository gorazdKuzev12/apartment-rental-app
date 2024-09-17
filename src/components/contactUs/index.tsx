"use client";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faAirbnb } from "@fortawesome/free-brands-svg-icons";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLanguage } from "@/context/LanguageContext"; // Import the useLanguage hook

const ContactUs = () => {
  const { language } = useLanguage(); // Get the current language from the context
  const translations: {
    [key: string]: {
      title: string;
      phone: string;
      instagram: string;
      airbnb: string;
    };
  } = {
    SR: {
      title: "Za više informacija",
      phone: "Pozovite nas",
      instagram: "Instagram",
      airbnb: "Airbnb",
    },
    EN: {
      title: "Enhancing Your Living Experience",
      phone: "Call Us",
      instagram: "Contact us on Instagram",
      airbnb: "Airbnb",
    },
    DE: {
      title: "Verbesserung Ihres Wohnerlebnisses",
      phone: "Rufen Sie uns an",
      instagram: "Kontaktieren Sie uns auf Instagram",
      airbnb: "Airbnb",
    },
  };

  return (
    <ContactSection id="contact">
      <Overlay>
        <Content>
          <Title>{translations[language].title}</Title>
          <ContactInfo>
            <CallButton href="tel:+381638800732">
              <FontAwesomeIcon icon={faPhone} />
              &nbsp;{translations[language].phone}: +381 63 8800732
            </CallButton>
            <SocialButtons>
              <InstagramButton
                href="https://www.instagram.com/youraccount"
                target="_blank"
              >
                {/* <FontAwesomeIcon icon={faInstagram} /> */}
                &nbsp;{translations[language].instagram}
              </InstagramButton>
              <AirbnbButton
                href="https://www.airbnb.com/youraccount"
                target="_blank"
              >
                <FontAwesomeIcon icon={faAirbnb} />
                &nbsp;{translations[language].airbnb}
              </AirbnbButton>
            </SocialButtons>
          </ContactInfo>
        </Content>
      </Overlay>
    </ContactSection>
  );
};

const ContactSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background:url("https://res.cloudinary.com/dw9cab9ab/image/upload/v1/image1_ybvcap.jpg") center/cover no-repeat; /* Adjust path to your background image */
  position: relative;

  @media (max-width: 768px) {
    height: auto;
    padding: 2rem 1rem;
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Adjust the opacity as needed */
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    position: static;
    background: rgba(
      0,
      0,
      0,
      0.7
    ); /* Slightly darker overlay for smaller screens */
  }
`;

const Content = styled.div`
  text-align: center;
  color: white;
  padding: 2rem;
  border: 2px solid white;
  position: relative;

  @media (max-width: 768px) {
    padding: 1rem;
    border: none;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;

  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

const CallButton = styled.a`
  display: inline-flex;
  align-items: center;
  background-color: #1a513a;
  color: white;
  padding: 1rem 2rem;
  text-transform: uppercase;
  font-weight: bold;
  text-decoration: none;
  transition: background-color 0.3s ease;
  border-radius: 5px;
  font-family: "Montserrat";


  &:hover {
    background-color: #16432a;
  }

  @media (max-width: 768px) {
    padding: 0.75rem 1.5rem;
    font-size: 0.875rem;
  }
`;

const SocialButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const InstagramButton = styled.a`
  display: inline-flex;
  align-items: center;
  background-color: transparent;
  border: 2px solid white;
  color: white;
  padding: 1rem 2rem;
  text-transform: uppercase;
  font-weight: bold;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: white;
    color: #16432a;
  }

  @media (max-width: 768px) {
    padding: 0.75rem 1.5rem;
    font-size: 0.875rem;
  }
`;

const AirbnbButton = styled.a`
  display: inline-flex;
  align-items: center;
  background-color: transparent;
  border: 2px solid white;
  color: white;
  padding: 1rem 2rem;
  text-transform: uppercase;
  font-weight: bold;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: white;
    color: #16432a;
  }

  @media (max-width: 768px) {
    padding: 0.75rem 1.5rem;
    font-size: 0.875rem;
  }
`;

export default ContactUs;
