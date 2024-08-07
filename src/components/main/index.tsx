"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";
import { useLanguage } from "@/context/LanguageContext";

const translations: {
  [key: string]: {
    title: string;
    subtitle: string;
    book: string;
  };
} = {
  SR: {
    title: "Spoj prirode i konfora",
    subtitle:
      "Vila Smaragdis pruža vrhunski konfor, luksuz i mir. Idealna za ljubitelje prirode i sve koji traže kvalitetan odmor.",
    book: "Rezervišite apartman",
  },
  EN: {
    title: "Blend of Nature and Comfort",
    subtitle:
      "Villa Smaragdis offers top-notch comfort, luxury, and tranquility. Ideal for nature lovers and those seeking a quality vacation.",
    book: "Book the Apartment",
  },
  DE: {
    title: "Kombination von Natur und Komfort",
    subtitle:
      "Villa Smaragdis bietet erstklassigen Komfort, Luxus und Ruhe. Ideal für Naturliebhaber und alle, die einen hochwertigen Urlaub suchen.",
    book: "Buchen Sie das Apartment",
  },
};

const Main = () => {
  const { language } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <HeroSection>
      <Overlay>
        <Content>
          <Title>{translations[language].title}</Title>
          <Subtitle>{translations[language].subtitle}</Subtitle>
          <BookButton>{translations[language].book}</BookButton>
        </Content>
      </Overlay>
      {isMobile ? (
        <ImageBackground src="/image1.jpg" alt="Background" />
      ) : (
        <VideoBackground autoPlay loop muted playsInline>
          <source src="/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </VideoBackground>
      )}
    </HeroSection>
  );
};

const HeroSection = styled.section`
  position: relative;
  height: 100vh;
  overflow: hidden;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 1;
`;

const Content = styled.div`
  color: #fff;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 1rem;

  @media (max-width: 768px) {
    padding: 0 2rem;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.875rem;
  }
`;

const BookButton = styled.button`
  background-color: white;
  color: #16432a;
  border: none;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 0.5rem; /* space between text and icon */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    background-color: #16432a;
    color: white;
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    padding: 0.75rem 1.5rem;
    font-size: 0.875rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem 1rem;
    font-size: 0.75rem;
  }
`;

const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
`;

const ImageBackground = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
`;

export default Main;
