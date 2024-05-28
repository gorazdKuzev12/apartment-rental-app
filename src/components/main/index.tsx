"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";

const Main = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = ["/image1.jpg", "/image2.jpg", "/image3.jpg"]; // Add your image paths here

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2500); // Change image every 1.5 seconds

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [images.length]);

  return (
    <HeroSection>
      <Overlay>
        <Content>
          <Title>Your Gateway to the Good Life</Title>
          <Subtitle>
            A collection of new and newly designed one- and two-bedroom
            apartments.
          </Subtitle>
          <BookButton>Book the Apartment</BookButton>
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
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
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
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #16432a;
    color: white;
    transform: scale(1.05);
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
