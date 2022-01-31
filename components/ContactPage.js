import React, { useEffect, useState } from "react";
import Container from "./Container";
import CenterTitle from "./CenterTitle";
import ExternalLink from "../public/icons/external-link-square-alt-solid.svg";
import Phone from "../public/icons/phone-solid.svg";
import MapPin from "../public/icons/map-pin-solid.svg";
import Envelope from "../public/icons/envelope-solid.svg";
import Image from "next/image";
const supportEmail = "support@silverwind.store";

export default function ContactPage({ PORTRAIT_PHOTO_URL }) {
  const [phoneNumber, setPhoneNumber] = useState("");

  function normalize(phone) {
    phone = phone.replace(/[^\d]/g, "");
    if (phone.length == 10) {
      return phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
    }
    return null;
  }

  useEffect(() => {
    setPhoneNumber("8597774380"); // Loads client side to avoid scraping bots
  }, []);

  return (
    <Container>
      <CenterTitle>Contact Us</CenterTitle>
      <div className="flex flex-col md:flex-row text-violet-900 text-center md:text-left mt-4">
        <div className="w-full">
          <div className="flex flex-row gap-3">
            <div className="mt-1">
              <Envelope className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">Chat with us</h2>
              <p className="mb-3 opacity-70 font-light">
                Our friendly staff is here to help.
              </p>
              <a
                className="font-semibold hover:underline flex flex-row justify-center md:justify-start gap-1 cursor-pointer transition-opacity"
                href={`mailto:${supportEmail}?subject="SilverWind - New Support Request"`}
              >
                {supportEmail}{" "}
                <span className="flex items-center">
                  <ExternalLink className="inline h-3 w-3" />
                </span>
              </a>
            </div>
          </div>
          <div className="flex flex-row mt-5 gap-3">
            <div className="mt-1">
              <MapPin className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">Office</h2>
              <p className="mb-3 opacity-70 font-light">
                Located in KY, United States!
              </p>
            </div>
          </div>
          <div className="flex flex-row mt-5 gap-3">
            <div className="mt-1">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2 ">Phone</h2>
              <p className="mb-3 opacity-70 font-light">
                Have a complex question? Give us a call.
              </p>
              <a
                className="font-semibold hover:underline flex flex-row justify-center md:justify-start gap-1 cursor-pointer transition-opacity"
                href={`tel:${phoneNumber}`}
              >
                {normalize(phoneNumber)}{" "}
                <span className="flex items-center">
                  <ExternalLink className="inline h-3 w-3" />
                </span>
              </a>
            </div>
          </div>
        </div>
        <div className="relative w-full h-[450px] mt-8 md:mt-0">
          <Image
            src={PORTRAIT_PHOTO_URL}
            alt="Julia Hodory"
            layout="fill"
            className="object-cover"
          />
        </div>
      </div>
    </Container>
  );
}
