import Head from "next/head";
import React from "react";
import Layout, { siteTitlePrefix } from "./layout";


export default function CustomRingConfigurer() {


const exampleOutput = {
  // General Options
  stones: [
    {
      id: "someid1231252341",
      image: "https://someimgurl/",
      description: "Stone name",
      quantity: 10,
      size: "1x3",
    },
  ],
  stoneSettings: [
    {
      id: "someid1231252341",
      image: "https://someimgurl/",
      description: "Stone name",
    },
  ],
  backExposed: Boolean,
  // Category Specific
  categories: [
    {
      name: "necklaces",
      options: {
        lengths: [8, 10, 12, 14, 16],
      },
    },
    ,
    {
      name: "rings",
      options: {
        bands: [
          {
            id: "someid1231252341",
            image: "https://someimgurl/",
            description: "Stone name",
          },
        ],
      },
    },
    {
      name: "earrings",
      options: {
        earringType: [
          { name: "stud", image: "https://someimgurl/", id: "someid" },
          { name: "dangly", image: "https://someimgurl/", id: "someid" },
        ],
      },
    },
  ],
};


  // Form
  // Stones
  // Settings
  // Necklaces
  //  - Lengths
  // Rings
  //  - Bands
  // Earrings
  //  - Type

  // Desired Output For End User Selection Process:
  // Descriptions on each user input section
  // Category ? Necklace / Ring / Earring / etc.
  // Stone ? (Pull from list of stones available)
  // Setting ? Bezel Wire Types
  // Switch (category)
  // case (necklace):
  //  - length of chain options
  //  - personalization (initials stamped - max length 2)
  // case (Ring):
  //  - band selections
  //  - personalization (initials / word - max length 10)
  //  case (earrings):
  //  - Studs / dangly(hanging) earrings?
  // Notes for order (specifications)

  return (
    <Layout>
      <Head>
        <title>{siteTitlePrefix} </title>
      </Head>
    </Layout>
  );
}
