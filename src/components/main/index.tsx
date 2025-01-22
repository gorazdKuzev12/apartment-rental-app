"use client";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { useLanguage } from "@/context/LanguageContext";
import { useRouter } from "next/navigation"; // Import useRouter

const translations: {
  [key: string]: {
    title: string;
    subtitle: string;
    book: string;
  };
} = {
  SR: {
    title: "Spoj prirode i komfora",
    subtitle:
      "Vila Smaragdis pruža vrhunski komfor, luksuz i mir. Idealna za ljubitelje prirode i sve koji traže kvalitetan odmor.",
    book: "Posalji upit",
  },
  EN: {
    title: "Blend of Nature and Comfort",
    subtitle:
      "Villa Smaragdis offers top-notch comfort, luxury, and tranquility. Ideal for nature lovers and those seeking a quality vacation.",
    book: "Send Request",
  },
  DE: {
    title: "Kombination von Natur und Komfort",
    subtitle:
      "Villa Smaragdis bietet erstklassigen Komfort, Luxus und Ruhe. Ideal für Naturliebhaber und alle, die einen hochwertigen Urlaub suchen.",
    book: "Buchen Sie das Apartment",
  },
};

interface MainProps {
  video: string;
}

const Main = ({ video }: MainProps) => {
  const { language } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter(); // Get the router object

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
      videoElement.muted = true; // Ensure the video is muted
      videoElement.setAttribute("playsinline", "true"); // Ensure playsInline is set
      videoElement.play().catch((error) => {
        console.error("Video play failed:", error);
      });
    }
  }, []);

  // Function to handle the button click and scroll to the book-room section
  const handleBookClick = () => {
    const bookRoomSection = document.getElementById("book-room"); // Get the section by its ID
    if (bookRoomSection) {
      bookRoomSection.scrollIntoView({ behavior: "smooth" }); // Smooth scroll to the section
    }
  };

  return (
    <HeroSection>
      <Overlay>
        <Content>
          <Title>{translations[language].title}</Title>
          <Subtitle>{translations[language].subtitle}</Subtitle>
          <BookButton onClick={handleBookClick}>
            {/* Attach the click handler */}
            {translations[language].book}
          </BookButton>
        </Content>
      </Overlay>

      <VideoBackground
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        controls={false}
        poster="https://res.cloudinary.com/dw9cab9ab/image/upload/v1723104762/videoimage_nj1lvw.jpg"


      >
        <source
          src={video}
          type="video/mp4"
        />
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
  font-weight:bold;
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
  pointer-events: none; /* Prevent user interactions with the video */
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
