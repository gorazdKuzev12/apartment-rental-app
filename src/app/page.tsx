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
      <Main video={video} />
      <AboutUs />
      <Gallery />
      <ContactUs />
      <BookNow />
      <Footer />
    </>
  );
};

const video = "https://res.cloudinary.com/dw9cab9ab/video/upload/v1723104762/video_fvsvvx.mp4"

export default Home;
