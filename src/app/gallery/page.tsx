// pages/gallery.js
"use client";
import { useState } from "react";
import styled from "styled-components";
import Header from "@/components/header";
import Footer from "@/components/footer";

const images = [
  "/image1.jpg",
  "/image2.jpg",
  "/image3.jpg",
  "/image1.jpg",
  "/image2.jpg",
  "/image3.jpg",
  "/image1.jpg",
  "/image2.jpg",
  "/image3.jpg",
  // Add more image paths as needed
];

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (imageSrc) => {
    setSelectedImage(imageSrc);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <Header />
      {selectedImage && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalImage src={selectedImage} alt="Selected" />
          </ModalContent>
        </ModalOverlay>
      )}
      <HeroSection>
        <HeroOverlay>
          <HeroContent>
            <HeroTitle>Welcome to Our Gallery</HeroTitle>
            <HeroSubtitle>
              Explore our exquisite collection of images
            </HeroSubtitle>
          </HeroContent>
        </HeroOverlay>
      </HeroSection>
      <TitleSection>
        <Title>Gallery</Title>
      </TitleSection>
      <GallerySection>
        <ImageGrid>
          {images.map((src, index) => (
            <ImageWrapper key={index} onClick={() => openModal(src)}>
              <Image src={src} alt={`Gallery Image ${index + 1}`} />
            </ImageWrapper>
          ))}
        </ImageGrid>
      </GallerySection>
      <Footer />
    </>
  );
};

const HeroSection = styled.section`
  width: 100%;
  height: 60vh;
  background: url("/image1.jpg") center/cover no-repeat; /* Ensure you have this image in your public folder */
  position: relative;
`;

const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const HeroContent = styled.div`
  color: white;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
`;

const TitleSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20vh;
  background-color: #f9f9f9;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #1a513a;
`;

const GallerySection = styled.section`
  padding: 2rem;
  background-color: #f9f9f9;
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
  padding-bottom: 75%; /* 4:3 Aspect Ratio */
  background-color: #ddd;
  cursor: pointer;
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(10px);
`;

const ModalContent = styled.div`
  position: relative;
  max-width: 90%;
  max-height: 90%;
  background: white;
  border-radius: 10px;
  overflow: hidden;
`;

const ModalImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export default GalleryPage;
