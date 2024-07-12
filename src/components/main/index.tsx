"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";
import { useLanguage } from "@/context/LanguageContext";

const translations = {
  SR: {
    title: "Vaš put ka dobrom životu",
    subtitle:
      "Kolekcija novih i novodizajniranih jednosobnih i dvosobnih apartmana.",
    book: "Rezervišite apartman",
  },
  EN: {
    title: "Your Gateway to the Good Life",
    subtitle:
      "A collection of new and newly designed one- and two-bedroom apartments.",
    book: "Book the Apartment",
  },
  DE: {
    title: "Ihr Tor zum guten Leben",
    subtitle:
      "Eine Sammlung neuer und neu gestalteter Ein- und Zweizimmerwohnungen.",
    book: "Buchen Sie das Apartment",
  },
};

const Main = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = ["/image1.jpg", "/image2.jpg", "/image3.jpg"]; // Add your image paths here
  const { language } = useLanguage();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2500); // Change image every 2.5 seconds

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [images.length]);

  return (
    <HeroSection>
      <Overlay>
        <Content>
          <Title>{translations[language].title}</Title>
          <Subtitle>{translations[language].subtitle}</Subtitle>
          <BookButton>{translations[language].book}</BookButton>
        </Content>
      </Overlay>
      <ImageScroller>
        {images.map((src, index) => (
          <Image
            key={index}
            src={src}
            alt={`Apartment ${index + 1}`}
            active={index === currentIndex}
          />
        ))}
      </ImageScroller>
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

const ImageScroller = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const Image = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${({ active }) => (active ? 1 : 0)};
  transition: opacity 0.5s ease;
`;

export default Main;
