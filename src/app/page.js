import React from 'react'
import Image from "next/image";
import Navbar from "./account/navbar/page";
import Cookies from 'js-cookie';
import Link from 'next/link';
import Slider from './(home)/(slider)/page'
import About from './(home)/(about)/page'
import Feature from './(home)/(feature)/page'
import Testimonials from './(home)/(testimonials)/page'
import Services from './(home)/(services)/page'
import Blog from './(home)/(blog)/page'
import Modalwindow from './(home)/(modalwindow)/page'
import Footer from './(home)/(footer)/page'
import axios from "axios";
import '../../public/css/style.css'


// export const metadata: Metadata = {
//   title: "Miracle Inside",
//   description: "Miracle Inside - Your trusted service",
//   alternates: {
//     canonical: "https://miracleinside.com/",
//   },
// };

async function fetchMetadata() {
  try {
    const [response, bannerResponse] = await Promise.all([
      axios.get("https://miracleinside.info/wp-json/wp/v2/pages/145"),
      axios.get("https://miracleinside.info/wp-json/wp/v2/homeslider/461"),
    ]);

    const metaData = response.data; // ✅ Axios stores the data in `data`
    const bannerData = bannerResponse.data;

    console.log("Metadata:", metaData);
    console.log("Banner Data:", bannerData);



    return {
      name: metaData.acf.meta_title || "",
      description: metaData.acf.meta_description || "",
      meta_keyword: metaData.acf.meta_keyword || "",
      bannerUrl: bannerData.acf.slider_image_1 || "",
    };
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return {
      name: "",
      description: "",
      meta_keyword: "",
      bannerUrl: "",
    };
  }
}


export default async function Home() {
  const { name, description, meta_keyword, bannerUrl } = await fetchMetadata();

  return (
 

<>
MI Image Viewer
   {/* <Link href={"/"}>Home</Link>
   <Link href={"/about"}>About</Link>
  <Link href={"/scan"}>scan</Link>
  <Link href={"/bloodtest"}>Blood Test</Link>
  <Link href={"/offers"}>Offers</Link>
  <Link href={"/giftvouchers"}>Gift Vouchers</Link>
  <Link href={"/franchise"}>Gift Vouchers</Link>
  <Link href={"/contact"}>Gift Vouchers</Link>

  <Slider image={bannerUrl} />
  <About/>
  <Feature />
        <Services />
        <Testimonials />
        <Modalwindow/>
        <Blog />
        <Footer /> */}
  </>
  );
}
