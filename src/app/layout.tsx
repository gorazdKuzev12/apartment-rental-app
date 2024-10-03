// src/app/layout.tsx

import { Metadata } from "next";
import GlobalStyle from "./styles/GlobalStyle";
import StyledJsxRegistry from "../../registry";
import { LanguageProvider } from "../context/LanguageContext";
import { Cormorant_Garamond } from 'next/font/google';

const cormorantGaramond = Cormorant_Garamond({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});

// SEO Metadata
export const metadata: Metadata = {
  title: "Vila Smaragdis - Luksuzna Vila na Fruškoj Gori",
  description: "Luksuzna vila sa bazenom i saunom na Fruškoj Gori, idealna za odmor blizu Novog Sada.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StyledJsxRegistry>
      <html lang="sr" className={cormorantGaramond.className}>
        <head>
          <link rel="icon" href="/favicon.ico" sizes="any" type="image/x-icon" />

          {/* Meta Tags for SEO */}
          <meta name="description" content="Luksuzna vila sa bazenom i saunom na Fruškoj Gori, idealna za odmor blizu Novog Sada." />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="robots" content="index, follow" />

          {/* Open Graph Meta Tags */}
          <meta property="og:title" content="Vila Smaragdis - Luksuzna Vila na Fruškoj Gori" />
          <meta property="og:description" content="Luksuzna vila sa bazenom i saunom na Fruškoj Gori, idealna za odmor blizu Novog Sada." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://villasmaragdis.com/" />
          <meta property="og:image" content="https://villasmaragdis.com/images/og-image.jpg" />

          {/* Twitter Card Meta Tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Vila Smaragdis - Luksuzna Vila na Fruškoj Gori" />
          <meta name="twitter:description" content="Luksuzna vila sa bazenom i saunom na Fruškoj Gori, idealna za odmor blizu Novog Sada." />
          <meta name="twitter:image" content="https://villasmaragdis.com/images/twitter-image.jpg" />

          {/* Structured Data for SEO */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LodgingBusiness",
              "name": "Vila Smaragdis",
              "description": "Luksuzna vila sa privatnim bazenom i saunom, smeštena u srcu Fruške gore. Idealna za porodice, parove i grupe koje traže odmor u prirodi.",
              "image": "https://villasmaragdis.com/images/vila.jpg",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Adresa vile", // Replace with actual address
                "addressLocality": "Novi Sad",
                "postalCode": "21000",
                "addressCountry": "RS"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "45.2600", // Replace with actual latitude
                "longitude": "19.8335" // Replace with actual longitude
              },
              "url": "https://villasmaragdis.com/",
              "telephone": "+381123456789", // Replace with actual phone number
              "amenityFeature": [
                {
                  "@type": "LocationFeatureSpecification",
                  "name": "Bazen",
                  "value": true
                },
                {
                  "@type": "LocationFeatureSpecification",
                  "name": "Sauna",
                  "value": true
                }
              ],
              "priceRange": "$$$",
              "openingHours": "Mo-Su"
            })}
          </script>

          <title>Vila Smaragdis - Luksuzna Vila na Fruškoj Gori</title>
        </head>

        <GlobalStyle />

        <body>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </body>
      </html>
    </StyledJsxRegistry>
  );
}
