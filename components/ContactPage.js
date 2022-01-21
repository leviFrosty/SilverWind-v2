import React, { useEffect, useState } from 'react'
import Container from './Container';
import CenterTitle from './CenterTitle';

const supportEmail = "support@silverwind.store"
const juliaEmail = "julia@silverwind.store"


export default function ContactPage() {
  const [phoneNumber, setPhoneNumber] = useState("")

  useEffect(() => {
    setPhoneNumber = "8597774380" // Loads client side to avoid bots

  }, [])

  return (
    <Container>
      <CenterTitle>Contact Us</CenterTitle>
      <div>
        <div>
          <h2>Email Support</h2>
          <a href={`mailto:${supportEmail}?subject="SilverWind - New Support Request"`}></a>
        </div>
        <div>

        </div>
      </div>
    </Container>
  )
}
