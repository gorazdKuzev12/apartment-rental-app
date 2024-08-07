import AboutUs from "@/components/aboutUs";
import BookNow from "@/components/book";
import ContactUs from "@/components/contactUs";
import Gallery from "@/components/gallery";
import Header from "@/components/header";
import Footer from "@/components/footer";

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
      <Footer />
    </>
  );
};

export default Home;
