"use client";

import styled from "styled-components";

const Main = () => {
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
        {/* Add your images here */}
        <Image src="/image1.jpg" alt="Apartment 1" />
        <Image src="/image2.jpg" alt="Apartment 2" />
        <Image src="/image3.jpg" alt="Apartment 3" />
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
  background-color: #1a513a;
  color: #ffffff;
  border: none;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  text-transform: uppercase;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #16432a;
    transform: scale(1.05);
  }
`;

const ImageScroller = styled.div`
  display: flex;
  height: 100%;
  width: 300%;
  animation: scroll 30s linear infinite;

  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-66.66%);
    }
  }
`;

const Image = styled.img`
  width: 100%;
  object-fit: cover;
`;

export default Main;
