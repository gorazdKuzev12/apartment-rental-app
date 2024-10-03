"use client";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faAirbnb } from "@fortawesome/free-brands-svg-icons";

import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons"; // For booking-related calendar icon
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
                href="https://www.instagram.com/villa_smaragdis?igsh=MTZsMjZjbWx5bGw4aQ%3D%3D"
                target="_blank"
              >
                {/* <FontAwesomeIcon icon={faInstagram} /> */}
                &nbsp;{translations[language].instagram}
              </InstagramButton>
              <AirbnbButton
                href="https://www.airbnb.com/rooms/52522746?source_impression_id=p3_1727802292_P3kPDTOsgtHYcU5G&locale=en&_set_bev_on_new_domain=1727802292_EAYmU5MzdhZWU4Y2"
                target="_blank"
              >
                <FontAwesomeIcon icon={faAirbnb} />
                &nbsp;{translations[language].airbnb}
              </AirbnbButton>
              <AirbnbButton
                href="https://www.booking.com/hotel/rs/villa-smaragdis.en-gb.html?aid=311984&label=waterman-milna-resort-_Ijr9e5hByQL%2AO9ymOvg9AS392996072833%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atikwd-265649761351%3Alp21213%3Ali%3Adec%3Adm%3Appccp%3DUmFuZG9tSVYkc2RlIyh9YXwxhKG0pUU-mcMVT-JwQpc&sid=b307f5d0768c98f08e42d5f8d788ed69&all_sr_blocks=1277196501_400939486_2_0_0;checkin=2024-10-16;checkout=2024-10-20;dest_id=12771965;dest_type=hotel;dist=0;group_adults=2;group_children=0;hapos=1;highlighted_blocks=1277196501_400939486_2_0_0;hpos=1;matching_block_id=1277196501_400939486_2_0_0;no_rooms=1;req_adults=2;req_children=0;room1=A%2CA;sb_price_type=total;sr_order=popularity;sr_pri_blocks=1277196501_400939486_2_0_0__78545;srepoch=1727802150;srpvid=245477cf605c0259;type=total;ucfs=1&"
                target="_blank"
              >
                <FontAwesomeIcon icon={faCalendarAlt} />
                &nbsp;Booking
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
