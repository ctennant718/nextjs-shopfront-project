import Head from "next/head";
import Image from "next/image";
import Layout from "@/components/Layout";
import Heading from "@/components/Heading";
import ContactForm from "@/components/forms/ContactForm";
import { sendEmail } from "@/lib/api-functions/client";
import {Typography} from "@/components/mui/index.js"


export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Heading component="h2">Contact Us</Heading>
        <Typography sx={{marginBlockEnd: "1em", color: "rgb(59, 73, 111)"}}>If you are not completly satifisfied with your order, please do not hesitate to contact us.</Typography>
        <ContactForm submitHandler={sendEmail}/>
      </Layout>
    </>
  );
}
