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

async function fetchGalleryData() {
  const res = await fetch("http://localhost:1337/api/gallery-components?populate=*", {
    cache: "force-cache",
  });
  const { data } = await res.json();
  return data; // Return the gallery component entries
}

const Home = async ({ params }: { params: { locale: string } }) => {
  const [mainPageData, aboutPageData, navigationItems, galleryData] = await Promise.all([
    fetchMainPageData(),
    fetchAboutPageData(),
    fetchNavigationItems(),
    fetchGalleryData(),
  ]);

  return (
    <>
      <Header navigationItems={navigationItems} />
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
      <Gallery galleryData={galleryData} language={params.locale} />
      <BookNow />
      <Footer navigationItems={navigationItems} languageCode={params.locale} />
    </>
  );
};

export default Home;
