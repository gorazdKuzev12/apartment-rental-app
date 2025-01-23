"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";
import { useLanguage } from "@/context/LanguageContext";

interface MainProps {
  video: string;
  title: string;
  subtitle: string;
  buttonText: string;
  posterImage: string;
  translations: Record<string, { title: string; subtitle: string; button_text: string }>;
  languageCode:string;
}

const Main = ({ video, title, subtitle, buttonText, posterImage, translations,languageCode }: MainProps) => {
 
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const videoElement = document.querySelector("video");
    if (videoElement) {
      videoElement.muted = true;
      videoElement.setAttribute("playsinline", "true");
      videoElement.play().catch((error) => console.error("Video play failed:", error));
    }
  }, []);

  const translatedTitle =
  languageCode.toUpperCase() !== "SR" && translations[ languageCode.toUpperCase()]?.title ? translations[ languageCode.toUpperCase()].title : title;
  const translatedSubtitle =
  languageCode.toUpperCase() !== "SR" && translations[ languageCode.toUpperCase()]?.subtitle
      ? translations[ languageCode.toUpperCase()].subtitle
      : subtitle;
  const translatedButtonText =
  languageCode.toUpperCase() !== "SR" && translations[ languageCode.toUpperCase()]?.button_text
      ? translations[ languageCode.toUpperCase()].button_text
      : buttonText;

  return (
    <HeroSection>
      <Overlay>
        <Content>
          <Title>{translatedTitle}</Title>
          <Subtitle>{translatedSubtitle}</Subtitle>
          <BookButton>{translatedButtonText}</BookButton>
        </Content>
      </Overlay>

      <VideoBackground
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        controls={false}
        poster={posterImage}
      >
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </VideoBackground>
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
  font-size: 2.8rem;
  margin-bottom: 1rem;
  font-weight: bold;
  font-family: "Poppins";

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
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
  letter-spacing: 2px;
  border: none;
  padding: 1rem 2rem;
  font-size: 0.8rem;
  font-weight: bold;
  cursor: pointer;
  font-family: "Montserrat";
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;

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
  pointer-events: none;
`;

export default Main;
