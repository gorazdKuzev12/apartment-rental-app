import AboutUs from "@/components/aboutUs";
import BookNow from "@/components/book";
import ContactUs from "@/components/contactUs";
import Gallery from "@/components/gallery";
import Header from "@/components/header";
import Main from "@/components/main";
const Home = () => {
  return (
    <>
      <Header />
      <Main />
      <AboutUs />
      <Gallery />
      <ContactUs />
      <BookNow />
    </>
  );
};

export default Home;
