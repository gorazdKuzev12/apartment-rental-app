"use client";
import { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../.././../firebase"; // Adjust the path as needed

const BookNow = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    status: "Pending",
  });
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (name, date) => {
    setFormData({
      ...formData,
      [name]: date,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "Bookings"), formData);
      setShowModal(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        checkIn: "",
        checkOut: "",
        status: "Pending",
      });
      setStartDate(null);
      setEndDate(null);
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to submit booking request.");
    }
  };

  return (
    <BookNowSection id="book-room">
      <Container>
        <LeftColumn>
          <Title>Get In Touch With Our Leasing Team Today</Title>
          <Description>
            Our team is happy to answer any questions on availability, pricing,
            and to schedule a tour to find your new home.
          </Description>
        </LeftColumn>
        <RightColumn>
          <Form onSubmit={handleSubmit}>
            <InputWrapper>
              <Label htmlFor="name">Name*</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </InputWrapper>
            <InputWrapper>
              <Label htmlFor="email">Email*</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </InputWrapper>
            <InputWrapper>
              <Label htmlFor="phone">Phone</Label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </InputWrapper>
            <InputWrapper>
              <Label htmlFor="checkIn">Move-In Date</Label>
              <StyledDatePicker
                selected={startDate}
                onChange={(date) => {
                  setStartDate(date);
                  handleDateChange("checkIn", date);
                }}
                dateFormat="MM/dd/yyyy"
                placeholderText="Select a date"
                required
              />
            </InputWrapper>
            <InputWrapper>
              <Label htmlFor="checkOut">Move-Out Date</Label>
              <StyledDatePicker
                selected={endDate}
                onChange={(date) => {
                  setEndDate(date);
                  handleDateChange("checkOut", date);
                }}
                dateFormat="MM/dd/yyyy"
                placeholderText="Select a date"
                required
              />
            </InputWrapper>
            <ButtonWrapper>
              <SubmitButton type="submit">Book</SubmitButton>
            </ButtonWrapper>
          </Form>
        </RightColumn>
      </Container>
      {showModal && (
        <ModalOverlay onClick={() => setShowModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalTitle>Booking Successful!</ModalTitle>
            <ModalMessage>
              Your booking was successful and is now pending. Please wait for
              the owner to contact you before it is accepted.
            </ModalMessage>
            <CloseButton onClick={() => setShowModal(false)}>Close</CloseButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </BookNowSection>
  );
};

const BookNowSection = styled.section`
  padding: 4rem 2rem;
  background-color: #f9f9f9;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const LeftColumn = styled.div`
  flex: 1;
  min-width: 300px;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const RightColumn = styled.div`
  flex: 1;
  min-width: 300px;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #1a513a;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Description = styled.p`
  font-size: 1rem;
  margin-bottom: 2rem;
  color: #717171;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  color: #5e5e5e;
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:focus {
    border-color: #1a513a;
    box-shadow: 0 0 5px rgba(26, 81, 58, 0.3);
    outline: none;
  }

  @media (max-width: 768px) {
    font-size: 0.875rem;
    padding: 0.625rem;
  }
`;

const StyledDatePicker = styled(DatePicker)`
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  transition: all 0.3s ease;

  &:focus {
    border-color: #1a513a;
    box-shadow: 0 0 5px rgba(26, 81, 58, 0.3);
    outline: none;
  }

  @media (max-width: 768px) {
    font-size: 0.875rem;
    padding: 0.625rem;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const SubmitButton = styled.button`
  background-color: #1a513a;
  color: #fff;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #16432a;
  }

  &:focus {
    background-color: #16432a;
    outline: none;
    box-shadow: 0 0 5px rgba(26, 81, 58, 0.3);
  }

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  text-align: center;
  max-width: 500px;
  width: 90%;
`;

const ModalTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #1a513a;
`;

const ModalMessage = styled.p`
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  color: #717171;
`;

const CloseButton = styled.button`
  background-color: #1a513a;
  color: #fff;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #16432a;
  }

  &:focus {
    background-color: #16432a;
    outline: none;
    box-shadow: 0 0 5px rgba(26, 81, 58, 0.3);
  }
`;

export default BookNow;
