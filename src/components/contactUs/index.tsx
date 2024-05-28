// components/ContactUs.js
"use client";
import { faPhone, faInstagram } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ContactUs = () => {
  return (
    <ContactSection>
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
  background: url("/image1.jpg") center/cover no-repeat; /* Adjust path to your background image */
  position: relative;
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
`;

const Content = styled.div`
  text-align: center;
  color: white;
  padding: 2rem;
  border: 2px solid white;
  position: relative;
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  font-style: italic;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
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
`;

export default ContactUs;
