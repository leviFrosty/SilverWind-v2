import React, { useState } from "react";
import CenterTitle from "./CenterTitle";
import Input from "./input";
import Stone from "../classes/Stone";
import Container from "./Container";
import NewStone from "./CustomOrderFormAdminSections/NewStone";
import ChevronRight from "../public/icons/chevron-right-solid.svg";

export default function CustomRingConfigurer() {
  const [isStoneOpen, setisStoneOpen] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    
  };

  return (
    <Container>
      <h2 className="text-lg font-bold text-violet-900 inline mx-auto mt-1">
        Custom Order Settings
      </h2>
      <div className="p-2">
        <button
          className="flex w-full items-center"
          onClick={() => setisStoneOpen(!isStoneOpen)}
        >
          {" "}
          <h2 className="text-lg font-bold text-violet-900 inline">
            New Stone
          </h2>
          <span>
            <ChevronRight
              style={isStoneOpen ? { transform: "rotate(90deg)" } : {}}
              className="ml-1 w-4 h-4 transition-transform text-violet-900"
            />
          </span>
        </button>
        {isStoneOpen ? (
          <NewStone isStoneOpen={isStoneOpen} setisStoneOpen={setisStoneOpen} />
        ) : null}
        <h2 className="text-lg font-bold text-violet-900">New Setting</h2>
        <Input />
        <h2 className="text-lg font-bold text-violet-900">Necklace Length</h2>
        <Input />
        <h2 className="text-lg font-bold text-violet-900">New Ring Band</h2>
        <Input />
        <h2 className="text-lg font-bold text-violet-900">New Earring Type</h2>
        <Input />
      </div>
    </Container>
  );
}

// Notes:
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
