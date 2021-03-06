import React, { useEffect, useState } from "react";
import FooterLink from "./FooterLink";
import FooterListHead from "./FooterListHead";
import Instagram from "../public/icons/instagram.svg";
import TikTok from "../public/icons/tiktok.svg";
import Etsy from "../public/icons/etsy-brands.svg";

import Container from "./Container";

export default function Footer() {
  const [isHelpOpen, setisHelpOpen] = useState(true);
  const [isAccountOpen, setisAccountOpen] = useState(true);
  const [isPagesOpen, setisPagesOpen] = useState(true);

  const setIsAllOpen = (boolean) => {
    setisHelpOpen(boolean);
    setisAccountOpen(boolean);
    setisPagesOpen(boolean);
  };

  const onWindowResize = () => {
    if (window.innerWidth > 768) {
      return setIsAllOpen(true);
    }
    return setIsAllOpen(false);
  };

  useEffect(() => {
    if (window.innerWidth < 768) setIsAllOpen(false);
    window.addEventListener("resize", onWindowResize);
    return () => window.removeEventListener("resize", onWindowResize);
  }, []);

  return (
    <footer className="bg-[#240066] text-white mt-10">
      <Container className="p-4 md:py-10 flex flex-col md:flex-row md:justify-between">
        <div className="flex flex-col md:flex-row md:gap-20">
          <ul>
            <FooterListHead openState={isHelpOpen} setIsOpen={setisHelpOpen}>
              Help
            </FooterListHead>
            {isHelpOpen ? (
              <>
                <FooterLink className="md" href="/contact">
                  Contact Us
                </FooterLink>
                <FooterLink href="/profile/orders">
                  Delivery Information
                </FooterLink>
                <FooterLink href="/return-policy">Return Policy</FooterLink>
                <FooterLink href="/frequently-asked-questions">FAQ</FooterLink>
              </>
            ) : null}
          </ul>
          <ul>
            <FooterListHead
              openState={isAccountOpen}
              setIsOpen={setisAccountOpen}
            >
              My Account
            </FooterListHead>
            {isAccountOpen ? (
              <>
                <FooterLink href="/login">Login</FooterLink>
                <FooterLink href="/signup">Register</FooterLink>
              </>
            ) : null}
          </ul>
          <ul>
            <FooterListHead openState={isPagesOpen} setIsOpen={setisPagesOpen}>
              Pages
            </FooterListHead>
            {isPagesOpen ? (
              <>
                {" "}
                <FooterLink href="/about">About</FooterLink>
                <FooterLink href="/products">All Products</FooterLink>
                <FooterLink href="/cart">Cart</FooterLink>
              </>
            ) : null}
          </ul>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-center">
            <span className="font-bold">More from SilverWind</span>
          </div>
          <div className="flex flex-row gap-4 justify-center">
            <a
              href="https://www.instagram.com/silverwind.store/"
              target="_blank"
              rel="noreferrer"
            >
              <Instagram width={30} height={30} />
            </a>
            <a
              href="https://www.tiktok.com/@silver.winds"
              target="_blank"
              rel="noreferrer"
            >
              <TikTok width={30} height={30} />
            </a>
            <a
              href="https://www.etsy.com/shop/ssilverwind"
              target="_blank"
              rel="noreferrer"
            >
              <Etsy width={30} height={30} className="opacity-60" />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
