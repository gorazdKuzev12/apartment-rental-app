import AboutUs from "@/components/aboutUs";
import BookNow from "@/components/book";
import ContactUs from "@/components/contactUs";
import Gallery from "@/components/gallery";
import Header from "@/components/header";
import Footer from "@/components/footer";

import Main from "@/components/main";

// Fetch data from Strapi
async function fetchMainPageData() {
  const res = await fetch("http://localhost:1337/api/main-pages?populate=*", {
    cache: "force-cache",
  });
  const { data } = await res.json();
  return data[0]; // Return the main page attributes
}

async function fetchAboutPageData() {
  const res = await fetch("http://localhost:1337/api/about-uses?populate=*");
  const { data } = await res.json();
  return data[0]; // Return the about page attributes
}

async function fetchNavigationItems() {
  const res = await fetch("http://localhost:1337/api/main-navigation-items?populate=*");
  const { data } = await res.json();
  return data; // Return the navigation items
}

const Home = async ({ params }: { params: { locale: string } }) => {
  const [mainPageData, aboutPageData, navigationItems] = await Promise.all([
    fetchMainPageData(),
    fetchAboutPageData(),
    fetchNavigationItems(),
  ]);

  return (
    <>
      <Header navigationItems={navigationItems}  />
      <Main
        video={mainPageData.video}
        title={mainPageData.title}
        subtitle={mainPageData.subtitle}
        buttonText={mainPageData.button_text}
        posterImage={mainPageData.poster_image?.data?.attributes?.url || ""}
        translations={mainPageData.translations}
        languageCode={params.locale}
      />
      <AboutUs
        aboutData={{
          title: aboutPageData.title,
          description: aboutPageData.description,
          tagline: aboutPageData.tagline,
          button_text: aboutPageData.button_text,
          address: aboutPageData.address,
          logo: aboutPageData.logo?.data?.attributes?.url || "",
          amenities: aboutPageData.amenities,
          languageCode: params.locale,
        }}
      />
      <Gallery />
      <ContactUs />
      <BookNow />
      <Footer />
    </>
  );
};

export default Home;
