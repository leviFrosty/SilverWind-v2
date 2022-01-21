import React, { useState } from "react";
import CenterTitle from "./CenterTitle";
import Input from "./input";
import Stone from "../classes/Stone";
import Container from "./Container";
import NewStone from "./CustomOrderFormAdminSections/NewStone";
import ChevronRight from "../public/icons/chevron-right-solid.svg";
import NecklaceLengths from "./CustomOrderFormAdminSections/NecklaceLengths";
import NewStoneSetting from "./CustomOrderFormAdminSections/NewStoneSetting";
import NewRingBand from "./CustomOrderFormAdminSections/NewRingBand";

export default function CustomRingConfigurer() {
  const [isStoneOpen, setisStoneOpen] = useState(false);
  const [isLengthsOpen, setisLengthsOpen] = useState(false);
  const [isStoneSettingOpen, setisStoneSettingOpen] = useState(true);
  const [isRingBandOpen, setisRingBandOpen] = useState(true);

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
          className="flex w-full items-center mb-2"
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
        <button
          className="flex w-full items-center mb-2"
          onClick={() => setisLengthsOpen(!isLengthsOpen)}
        >
          {" "}
          <h2 className="text-lg font-bold text-violet-900 inline">
            Edit Necklace Lengths
          </h2>
          <span>
            <ChevronRight
              style={isLengthsOpen ? { transform: "rotate(90deg)" } : {}}
              className="ml-1 w-4 h-4 transition-transform text-violet-900"
            />
          </span>
        </button>
        {isLengthsOpen ? (
          <NecklaceLengths
            isLengthsOpen={isLengthsOpen}
            setisLengthsOpen={setisLengthsOpen}
          />
        ) : null}
        <button
          className="flex w-full items-center mb-2"
          onClick={() => setisStoneSettingOpen(!isStoneSettingOpen)}
        >
          {" "}
          <h2 className="text-lg font-bold text-violet-900 inline">
            New Stone Setting
          </h2>
          <span>
            <ChevronRight
              style={isStoneSettingOpen ? { transform: "rotate(90deg)" } : {}}
              className="ml-1 w-4 h-4 transition-transform text-violet-900"
            />
          </span>
        </button>
        {isStoneSettingOpen ? (
          <NewStoneSetting
            isStoneSettingOpen={isStoneSettingOpen}
            setisStoneSettingOpen={setisStoneSettingOpen}
          />
        ) : null}
        <button
          className="flex w-full items-center mb-2"
          onClick={() => setisRingBandOpen(!isRingBandOpen)}
        >
          {" "}
          <h2 className="text-lg font-bold text-violet-900 inline">
            New Ring Band
          </h2>
          <span>
            <ChevronRight
              style={isRingBandOpen ? { transform: "rotate(90deg)" } : {}}
              className="ml-1 w-4 h-4 transition-transform text-violet-900"
            />
          </span>
        </button>
        {isRingBandOpen ? (
          <NewRingBand
            isRingBandOpen={isRingBandOpen}
            setisRingBandOpen={setisRingBandOpen}
          />
        ) : null}
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
