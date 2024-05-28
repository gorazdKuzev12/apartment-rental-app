// components/Gallery.js
"use client";
import styled from "styled-components";
import Link from "next/link";

const Gallery = () => {
  return (
    <GallerySection>
      <ImageGrid>
        <ImageWrapper>
          <Image src="/image1.jpg" alt="1-BEDROOM PHASE I" />
          <Overlay>
            <OverlayText>Comfortable Stay</OverlayText>
          </Overlay>
        </ImageWrapper>
        <ImageWrapper>
          <Image src="/image2.jpg" alt="1-BEDROOM PHASE II" />
          <Overlay>
            <OverlayText>Luxury Room</OverlayText>
          </Overlay>
        </ImageWrapper>
        <ImageWrapper>
          <Image src="/image3.jpg" alt="2-BEDROOM PHASE I" />
          <Overlay>
            <OverlayText>Beautiful Nature</OverlayText>
          </Overlay>
        </ImageWrapper>
        <ImageWrapper>
          <Image src="/image1.jpg" alt="2-BEDROOM PHASE II" />
          <Overlay>
            <OverlayText>Modern Design</OverlayText>
          </Overlay>
        </ImageWrapper>
      </ImageGrid>
      <ButtonWrapper>
        <Link href="/gallery" passHref>
          <ViewButton>View Full Gallery</ViewButton>
        </Link>
      </ButtonWrapper>
    </GallerySection>
  );
};

const GallerySection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; // Full viewport height
  padding: 2rem;
  background-color: #f9f9f9;
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  height: 75%; // Full height for the grid

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
  height: 100%; // Full height for the wrapper

  &:hover img {
    transform: scale(1.1);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; // Ensures image covers the container
  transition: transform 0.3s ease;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${ImageWrapper}:hover & {
    opacity: 1;
  }
`;

const OverlayText = styled.span`
  color: #fff;
  font-size: 1.5rem;
  font-weight: bold;
`;

const ButtonWrapper = styled.div`
  margin-top: 2rem;
`;

const ViewButton = styled.button`
  background-color: transparent;
  color: #1a513a;
  border: 2px solid #1a513a;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #1a513a;
    color: #fff;
  }
`;
export default Gallery;
