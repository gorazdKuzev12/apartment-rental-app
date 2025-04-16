import GaleryComponent from "./GaleryComponent";

/** Fetch navigation items. Adjust URL as needed */
async function fetchNavigationItems() {
  const res = await fetch("http://localhost:1337/api/main-navigation-items?populate=*");
  const { data } = await res.json();
  return data; // Return the navigation items
}

/** Fetch gallery data. Adjust URL as needed */
async function fetchGalleryData() {
  const res = await fetch("http://localhost:1337/api/gallery-components?populate=*");
  const { data } = await res.json();

  // data is an array of objects: each has `title`, `poster_image`, `images`, ...
  // Each `images` item has { src, alt: { sr, en, de } } etc.

  // Flatten all images from all categories
  const allImages = data.flatMap((category: any) => {
    // category.images is an array of { src, alt: { sr, en, de } }
    return category.images.map((img: any) => ({
      src: img.src,
      alt: {
        sr: img.alt.sr,
        en: img.alt.en,
        de: img.alt.de,
        // ... any other languages you have
      },
    }));
  });

  return allImages;
}

const GaleryPage = async () => {
  // Fetch both nav items and gallery data in parallel
  const [navigationItems, galleryData] = await Promise.all([
    fetchNavigationItems(),
    fetchGalleryData(),
  ]);



  return (
    <>
      {/* Pass combined images & nav items to your gallery component */}
      <GaleryComponent navigationItems={navigationItems} images={galleryData} />
    </>
  );
};

export default GaleryPage;
