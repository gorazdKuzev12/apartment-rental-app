"use client";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  Timestamp,
  DocumentData,
} from "firebase/firestore";
import { db } from "../../../firebase";
import Header from "@/components/header";
import Footer from "@/components/footer";

interface Customer {
  id?: string;
  name: string;
  email: string;
  phone: string;
  checkIn: Date | string | null;
  checkOut: Date | string | null;
  status?: string;
}

interface AdminPanelState {
  newCustomer: Customer;
  customers: Customer[];
  loading: boolean;
  password: string;
  authenticated: boolean;
  filter: string;
  bookedDates: Date[];
}

// Function to convert Firestore Timestamp to a readable date
const formatDate = (timestamp: Timestamp | Date | string | null): string => {
  if (!timestamp) return "";
  const date =
    timestamp instanceof Timestamp ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleDateString();
};

const AdminPanel = () => {
  const [state, setState] = useState<AdminPanelState>({
    newCustomer: {
      name: "",
      email: "",
      phone: "",
      checkIn: null,
      checkOut: null,
    },
    customers: [],
    loading: true,
    password: "",
    authenticated: false,
    filter: "All",
    bookedDates: [],
  });

  useEffect(() => {
    if (state.authenticated) {
      fetchCustomers();
      fetchBookedDates();
    }
  }, [state.authenticated]);

  const fetchBookedDates = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Bookings"));
      const dates: Date[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as Customer;
        if (data.status === "Pending" || data.status === "Accepted") {
          const checkIn =
            data.checkIn instanceof Timestamp
              ? data.checkIn.toDate()
              : new Date(data.checkIn as string);
          const checkOut =
            data.checkOut instanceof Timestamp
              ? data.checkOut.toDate()
              : new Date(data.checkOut as string);
          for (
            let d = new Date(checkIn);
            d <= new Date(checkOut);
            d.setDate(d.getDate() + 1)
          ) {
            dates.push(new Date(d));
          }
        }
      });
      setState((prevState) => ({ ...prevState, bookedDates: dates }));
    } catch (error) {
      console.error("Greška prilikom preuzimanja rezervisanih datuma: ", error);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      newCustomer: { ...prevState.newCustomer, [name]: value },
    }));
  };

  const handleDateChange = (name: string, date: Date) => {
    setState((prevState) => ({
      ...prevState,
      newCustomer: { ...prevState.newCustomer, [name]: date },
    }));
  };

  const handleAddCustomer = async (e: FormEvent) => {
    e.preventDefault();
    const { newCustomer } = state;
    await addDoc(collection(db, "Bookings"), {
      ...newCustomer,
      checkIn: Timestamp.fromDate(new Date(newCustomer.checkIn as Date)),
      checkOut: Timestamp.fromDate(new Date(newCustomer.checkOut as Date)),
      status: "Accepted",
    });
    fetchCustomers();
    setState((prevState) => ({
      ...prevState,
      newCustomer: {
        name: "",
        email: "",
        phone: "",
        checkIn: null,
        checkOut: null,
      },
    }));
  };

  const fetchCustomers = async () => {
    const querySnapshot = await getDocs(collection(db, "Bookings"));
    let customersList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Customer),
    }));

    // Sort the customers
    customersList = customersList.sort((a, b) => {
      if (a.status === "Pending" && b.status !== "Pending") return -1;
      if (a.status !== "Pending" && b.status === "Pending") return 1;
      if (a.status === "Accepted" && b.status !== "Accepted") return -1;
      if (a.status !== "Accepted" && b.status === "Accepted") return 1;
      if (a.status === "Accepted" && b.status === "Accepted") {
        const dateA =
          a.checkIn instanceof Timestamp
            ? a.checkIn.toDate()
            : new Date(a.checkIn as string);
        const dateB =
          b.checkIn instanceof Timestamp
            ? b.checkIn.toDate()
            : new Date(b.checkIn as string);
        return dateA.getTime() - dateB.getTime();
      }
      return 0;
    });

    setState((prevState) => ({
      ...prevState,
      customers: customersList,
      loading: false,
    }));
  };

  const handleAuthenticate = () => {
    if (state.password === "kristinaperica12345") {
      setState((prevState) => ({ ...prevState, authenticated: true }));
      fetchCustomers();
      fetchBookedDates();
    } else {
      alert("Pogrešna lozinka");
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    const bookingDoc = doc(db, "Bookings", id);
    await updateDoc(bookingDoc, { status });
    fetchCustomers();
  };

  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setState((prevState) => ({ ...prevState, filter: e.target.value }));
  };

  const filteredCustomers = state.customers.filter((customer) => {
    if (state.filter === "All") return true;
    return customer.status === state.filter;
  });

  if (!state.authenticated) {
    return (
      <Container>
        <Section>
          <Form onSubmit={(e) => e.preventDefault()}>
            <Input
              type="password"
              value={state.password}
              onChange={(e) =>
                setState((prevState) => ({
                  ...prevState,
                  password: e.target.value,
                }))
              }
              placeholder="Unesite lozinku"
              required
            />
            <Button onClick={handleAuthenticate}>Autentifikuj</Button>
          </Form>
        </Section>
      </Container>
    );
  }

  return (
    <>
      <Header />
      <Container>
        <Section>
          <SectionTitle>Dodaj novog korisnika</SectionTitle>
          <Form onSubmit={handleAddCustomer}>
            <Input
              type="text"
              name="name"
              value={state.newCustomer.name}
              onChange={handleInputChange}
              placeholder="Ime korisnika"
              required
            />
            <Input
              type="email"
              name="email"
              value={state.newCustomer.email}
              onChange={handleInputChange}
              placeholder="Email korisnika"
              required
            />
            <Input
              type="tel"
              name="phone"
              value={state.newCustomer.phone}
              onChange={handleInputChange}
              placeholder="Telefon korisnika"
              required
            />
            <InputWrapper>
              <Label htmlFor="checkIn">Datum dolaska</Label>
              <StyledDatePicker
                selected={
                  state.newCustomer.checkIn
                    ? new Date(state.newCustomer.checkIn)
                    : null
                }
                onChange={(date: Date) => handleDateChange("checkIn", date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="Datum dolaska"
                excludeDates={state.bookedDates}
                required
              />
            </InputWrapper>
            <InputWrapper>
              <Label htmlFor="checkOut">Datum odlaska</Label>
              <StyledDatePicker
                selected={
                  state.newCustomer.checkOut
                    ? new Date(state.newCustomer.checkOut)
                    : null
                }
                onChange={(date: Date) => handleDateChange("checkOut", date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="Datum odlaska"
                excludeDates={state.bookedDates}
                required
              />
            </InputWrapper>
            <Button type="submit">Dodaj korisnika</Button>
          </Form>
        </Section>
        <Section>
          <SectionTitle>Rezervisani korisnici</SectionTitle>
          <FilterContainer>
            <label>Filtriraj po statusu: </label>
            <Select value={state.filter} onChange={handleFilterChange}>
              <option value="All">Svi</option>
              <option value="Pending">Na čekanju</option>
              <option value="Accepted">Prihvaćeno</option>
              <option value="Cancelled">Otkazano</option>
            </Select>
          </FilterContainer>
          <Table>
            <thead>
              <tr>
                <Th>Ime</Th>
                <Th>Email</Th>
                <Th>Telefon</Th>
                <Th>Datum dolaska</Th>
                <Th>Datum odlaska</Th>
                <Th>Status</Th>
                <Th>Akcije</Th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer, index) => (
                <tr key={index}>
                  <Td>{customer.name}</Td>
                  <Td>{customer.email}</Td>
                  <Td>{customer.phone}</Td>
                  <Td>{formatDate(customer.checkIn)}</Td>
                  <Td>{formatDate(customer.checkOut)}</Td>
                  <StatusTd status={customer.status}>
                    {customer.status === "Pending"
                      ? "Na čekanju"
                      : customer.status === "Accepted"
                      ? "Prihvaćeno"
                      : "Otkazano"}
                  </StatusTd>
                  <Td>
                    {customer.status === "Pending" && (
                      <>
                        <Button
                          onClick={() =>
                            handleStatusChange(customer.id!, "Accepted")
                          }
                        >
                          Prihvati
                        </Button>
                        <Button
                          onClick={() =>
                            handleStatusChange(customer.id!, "Cancelled")
                          }
                        >
                          Otkazati
                        </Button>
                      </>
                    )}
                    {customer.status === "Accepted" && (
                      <Button
                        onClick={() =>
                          handleStatusChange(customer.id!, "Cancelled")
                        }
                      >
                        Otkazati
                      </Button>
                    )}
                    {customer.status === "Cancelled" && (
                      <Button
                        onClick={() =>
                          handleStatusChange(customer.id!, "Accepted")
                        }
                      >
                        Prihvati
                      </Button>
                    )}
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Section>
      </Container>
      <Footer />
    </>
  );
};

const Container = styled.div`
  padding: 2rem;
`;

const Section = styled.section`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  margin-bottom: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  background-color: #1a513a;
  color: #fff;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border-radius: 5px;

  &:hover {
    background-color: #16432a;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
`;

const Th = styled.th`
  border: 1px solid #ccc;
  padding: 0.5rem;
  text-align: left;
`;

const Td = styled.td`
  border: 1px solid #ccc;
  padding: 0.5rem;
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

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const Select = styled.select`
  margin-left: 0.5rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const StatusTd = styled(Td)<{ status?: string }>`
  background-color: ${(props) =>
    props.status === "Pending"
      ? "yellow"
      : props.status === "Accepted"
      ? "green"
      : "red"};
  font-weight: bold;
`;

export default AdminPanel;
