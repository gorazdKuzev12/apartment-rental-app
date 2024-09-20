// src/app/layout.tsx

import { Metadata } from "next";
import GlobalStyle from "./styles/GlobalStyle"; // Ensure this path is correct
import StyledJsxRegistry from "../../registry"; // Correct the import path
import { LanguageProvider } from "../context/LanguageContext"; // Correct import for LanguageContext

// Import the Cormorant Garamond font from Google using Next.js font optimization
import { Cormorant_Garamond } from 'next/font/google';

// Configure the Cormorant Garamond font
const cormorantGaramond = Cormorant_Garamond({
  weight: ["300", "400", "600", "700"], // Choose a variety of weights for flexibility
  subsets: ["latin"],
});

// SEO Metadata: Expanded Description and Keywords for Serbian and International Audiences
export const metadata: Metadata = {
  title: "Vila Smaragdis",
  description: `Vila Smaragdis - Luksuzna vila smeštena u predivnom okruženju Fruške gore, samo 23 km od Novog Sada. Savršen odmor sa privatnim bazenom, finskom saunom, i prostranim terenom. Uživajte u miru i prirodi, idealno za porodice, grupe i parove. Otkrijte luksuz i komfor u najlepšoj vili u Srbiji, blizu Novog Sada. Rezervišite svoj odmor sada i provedite nezaboravne trenutke u luksuznom smeštaju.`,
  keywords: "Vila Smaragdis, luksuzna vila Fruška Gora, bazen, sauna, vila Novi Sad, iznajmljivanje vile, smeštaj Novi Sad, odmor u Srbiji, privatna vila, Fruška Gora, vikendica sa bazenom, luksuzna vikendica, priroda, apartmani Fruška Gora, vikend smeštaj Novi Sad, vikendica Srbija, vila sa pogledom na planinu, luksuzni smeštaj Srbija, apartmani sa saunom, Fruška Gora vikendica, prirodni odmor, apartmani Novi Sad, bazen Fruška Gora, vikendice sa saunom, odmor na planini, vila za porodice Srbija, luksuzna vila sa bazenom, vikendica sa bazenom, luksuzno iznajmljivanje Srbija, iznajmljivanje luksuzne vikendice, vikendica sa pogledom, wellness vikend Srbija, vila sa saunom Srbija, smeštaj sa bazenom, vila u prirodi, luksuzna kuća za odmor, romantični vikend Srbija, vikend odmor Fruška Gora",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StyledJsxRegistry>
      <html lang="en" className={cormorantGaramond.className}>
      <head>
          <link rel="icon" href="/favicon.ico" sizes="any" type="image/x-icon" /> {/* Favicon added here */}
          
          {/* Meta tags for SEO */}
          <meta name="description" content="Vila Smaragdis - Luksuzna vila smeštena u predivnom okruženju Fruške gore, samo 23 km od Novog Sada. Savršen odmor sa privatnim bazenom, finskom saunom, i prostranim terenom. Uživajte u miru i prirodi, idealno za porodice, grupe i parove. Otkrijte luksuz i komfor u najlepšoj vili u Srbiji, blizu Novog Sada. Rezervišite svoj odmor sada i provedite nezaboravne trenutke u luksuznom smeštaju." />
          
          <meta name="keywords" content="Vila Smaragdis, luksuzna vila Fruška Gora, bazen, sauna, vila Novi Sad, iznajmljivanje vile, smeštaj Novi Sad, odmor u Srbiji, privatna vila, Fruška Gora, vikendica sa bazenom, luksuzna vikendica, priroda, apartmani Fruška Gora, vikend smeštaj Novi Sad, vikendica Srbija, vila sa pogledom na planinu, luksuzni smeštaj Srbija, apartmani sa saunom,Vila u Novi Sad, Novisad, odmor, uzivanje, vila so bazen u Novom Sadu Fruška Gora vikendica, prirodni odmor, apartmani Novi Sad, bazen Fruška Gora, vikendice sa saunom, odmor na planini, vila za porodice Srbija, luksuzna vila sa bazenom, vikendica sa bazenom, luksuzno iznajmljivanje Srbija, iznajmljivanje luksuzne vikendice, vikendica sa pogledom, wellness vikend Srbija, vila sa saunom Srbija, smeštaj sa bazenom, vila u prirodi, luksuzna kuća za odmor, romantični vikend Srbija, vikend odmor Fruška Gora" />
          
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          {/* Structured Data for SEO */}
          <script type="application/ld+json">
            {`
              {
                "@context": "https://schema.org",
                "@type": "LodgingBusiness",
                "name": "Vila Smaragdis",
                "description": "Luksuzna vila sa privatnim bazenom i saunom, smeštena u srcu Fruške gore. Idealna za porodice, parove, i grupe koji traže odmor u prirodi.",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Adresa vile",
                  "addressLocality": "Novi Sad",
                  "postalCode": "21000",
                  "addressCountry": "Serbia"
                },
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": "45.2600", // Replace with actual coordinates
                  "longitude": "19.8335" // Replace with actual coordinates
                },
                "amenityFeature": [
                  {
                    "@type": "LocationFeatureSpecification",
                    "name": "Pool",
                    "value": "true"
                  },
                  {
                    "@type": "LocationFeatureSpecification",
                    "name": "Sauna",
                    "value": "true"
                  }
                ],
                "url": https://villasmaragdis.com/", // Replace with your actual URL
              }
            `}
          </script>

          <title>Vila Smaragdis</title> {/* Page title */}
        </head>

        <GlobalStyle /> {/* Global styles */}
        
        <body>
          <LanguageProvider>
            {/* Wrap the children with LanguageProvider for context */}
            {children}
          </LanguageProvider>
        </body>
      </html>
    </StyledJsxRegistry>
  );
}
