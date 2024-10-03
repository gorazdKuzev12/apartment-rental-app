"use client";
// src/components/book/index.tsx or any other component
import { useState, useEffect } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../.././../firebase"; // Adjust the path as needed
import { useLanguage } from "@/context/LanguageContext"; // Import the useLanguage hook

const translations: { [key: string]: { [key: string]: string } } = {
  SR: {
    title: "Pošaljite zahtev danas",
    description: "Kontaktirajte naš tim za više informacija.",
    name: "Ime",
    email: "Email*",
    phone: "Telefon",
    checkIn: "Datum dolaska",
    checkOut: "Datum odlaska",
    question: "Pitanje",
    submit: "Upitaj",
    successTitle: "Uspešno slanje zahteva!",
    successMessage: "Vaša rezervacija je na čekanju. Kontaktiraće vas vlasnik.",
    close: "Zatvori",
  },
  EN: {
    title: "Send the request today",
    description: "Contact our team for more information.",
    name: "Name*",
    email: "Email*",
    phone: "Phone",
    checkIn: "Check-In",
    checkOut: "Check-Out",
    question: "Question",
    submit: "Inquire",
    successTitle: "Booking Successful!",
    successMessage: "Your booking is pending. The owner will contact you.",
    close: "Close",
  },
  DE: {
    title: "Senden Sie die Anfrage heute",
    description: "Kontaktieren Sie unser Team für weitere Informationen.",
    name: "Name*",
    email: "Email*",
    phone: "Telefon",
    checkIn: "Einzugsdatum",
    checkOut: "Auszugsdatum",
    question: "Frage",
    submit: "Anfragen",
    successTitle: "Buchung erfolgreich!",
    successMessage:
      "Ihre Buchung steht aus. Der Eigentümer wird Sie kontaktieren.",
    close: "Schließen",
  },
};

const BookNow = () => {
  const { language } = useLanguage(); // Get the current language from the context
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    question: "",
    status: "Pending",
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchBookedDates = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Bookings"));
        console.log("QuerySnapshot:", querySnapshot);
        const dates: Date[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          console.log("Document data:", data);

          if (data.checkIn && data.checkOut) {
            const checkIn = data.checkIn.toDate();
            const checkOut = data.checkOut.toDate();

            // console.log("Parsed check-in date:", checkIn);
            // console.log("Parsed check-out date:", checkOut);

            // Generate all dates between check-in and check-out
            for (
              let d = new Date(checkIn);
              d <= new Date(checkOut);
              d.setDate(d.getDate() + 1)
            ) {
              dates.push(new Date(d));
            }
          } else {
            console.warn(
              "Missing checkIn or checkOut date in document:",
              doc.id
            );
          }
        });
        setBookedDates(dates);
        console.log("Fetched booked dates:", dates);
      } catch (error) {
        console.error("Error fetching booked dates: ", error);
      }
    };

    fetchBookedDates();
  }, []);

  console.log(bookedDates);

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (name: string, date: Date | null) => {
    setFormData({
      ...formData,
      [name]: date,
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "Bookings"), {
        ...formData,
        checkIn: startDate,
        checkOut: endDate,
      });

      // Send booking notification email
      const response = await fetch("/api/send-booking-notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          checkIn: startDate,
          checkOut: endDate,
          question: formData.question,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send booking notification email");
      }

      setShowModal(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        checkIn: "",
        checkOut: "",
        question: "",
        status: "Pending",
      });
      setStartDate(null);
      setEndDate(null);
    } catch (error) {
      console.error("Error adding document: ", error);
      alert(`Failed to submit booking request.`);
    }
  };

  return (
    <BookNowSection id="book-room">
      <Container>
        <LeftColumn>
          <Title>{translations[language].title}</Title>
          <Description>{translations[language].description}</Description>
        </LeftColumn>
        <RightColumn>
          <Form onSubmit={handleSubmit}>
            <FormRow>
              <InputWrapper>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={translations[language].name}
                  required
                />
              </InputWrapper>
              <InputWrapper>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={translations[language].email}
                  required
                />
              </InputWrapper>
            </FormRow>
            <FormRow>
              <InputWrapper>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder={translations[language].phone}
                />
              </InputWrapper>
              <InputWrapper>
                <StyledDatePicker
                  selected={startDate}
                  onChange={(date: Date | null) => {
                    setStartDate(date);
                    handleDateChange("checkIn", date);
                  }}
                  dateFormat="MM/dd/yyyy"
                  placeholderText={translations[language].checkIn}
                  excludeDates={bookedDates}
                  required
                />
              </InputWrapper>
              <InputWrapper>
                <StyledDatePicker
                  selected={endDate}
                  onChange={(date: Date | null) => {
                    setEndDate(date);
                    handleDateChange("checkOut", date);
                  }}
                  dateFormat="MM/dd/yyyy"
                  placeholderText={translations[language].checkOut}
                  excludeDates={bookedDates}
                  required
                />
              </InputWrapper>
            </FormRow>
            <FormRow>
              <InputWrapper fullWidth>
                <Textarea
                  name="question"
                  value={formData.question}
                  onChange={handleInputChange}
                  placeholder={translations[language].question}
                />
              </InputWrapper>
            </FormRow>
            <ButtonWrapper>
              <SubmitButton type="submit">
                {translations[language].submit}
              </SubmitButton>
            </ButtonWrapper>
          </Form>
        </RightColumn>
      </Container>
      {showModal && (
        <ModalOverlay onClick={() => setShowModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalTitle>{translations[language].successTitle}</ModalTitle>
            <ModalMessage>{translations[language].successMessage}</ModalMessage>
            <CloseButton onClick={() => setShowModal(false)}>
              {translations[language].close}
            </CloseButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </BookNowSection>
  );
};

const BookNowSection = styled.section`
  padding: 4rem 2rem;
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
  min-width: 200px;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const RightColumn = styled.div`
  flex: 1;
  min-width: 300px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Title = styled.h2`
  font-size: 2.7rem;
  margin-bottom: 1rem;
  color: #1a513a;
font-family: "Nunito";
  font-weight: bold;
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Description = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: #717171;

`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormRow = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const InputWrapper = styled.div<{ fullWidth?: boolean }>`
  flex: ${({ fullWidth }) => (fullWidth ? "1 1 100%" : "1")};
`;

const Input = styled.input`
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  width: 100%;
  transition: all 0.3s ease;

  &:focus {
    border-color: #1a513a;
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
  width: 100%;
  transition: all 0.3s ease;

  &:focus {
    border-color: #1a513a;
    outline: none;
  }

  @media (max-width: 768px) {
    font-size: 0.875rem;
    padding: 0.625rem;
  }
`;

const Textarea = styled.textarea`
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  width: 100%;
  transition: all 0.3s ease;
  resize: vertical;
  min-height: 100px;

  &:focus {
    border-color: #1a513a;
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
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #16432a;
  }

  &:focus {
    background-color: #16432a;
    outline: none;
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
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #16432a;
  }

  &:focus {
    background-color: #16432a;
    outline: none;
  }
`;

export default BookNow;
