"use client";
import { faPhone, faInstagram } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ContactUs = () => {
  return (
    <ContactSection id="contact">
      <Overlay>
        <Content>
          <Subtitle>Always Here for You</Subtitle>
          <Title>Enhancing Your Living Experience</Title>
          <ContactInfo>
            <CallButton href="tel:+123456789">
              <FontAwesomeIcon icon={faPhone} />
              &nbsp;+1 (234) 567-89
            </CallButton>
            <InstagramButton
              href="https://www.instagram.com/youraccount"
              target="_blank"
            >
              <FontAwesomeIcon icon={faInstagram} />
              &nbsp;Contact us on Instagram
            </InstagramButton>
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
  background: url("/image10.jpg") center/cover no-repeat; /* Adjust path to your background image */
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

const Subtitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  font-style: italic;

  @media (max-width: 768px) {
    font-size: 1.25rem;
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

  &:hover {
    background-color: #16432a;
  }

  @media (max-width: 768px) {
    padding: 0.75rem 1.5rem;
    font-size: 0.875rem;
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

export default ContactUs;
