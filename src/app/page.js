"use client"
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import Navbar from "./account/navbar/page";
import Cookies from 'js-cookie';
import Link from 'next/link';

export default function Home() {



  return (
   <>


   <Link href={"/"}>Home</Link>
   <Link href={"/about"}>About</Link>
<Link href={"/scan"}>scan</Link>
<Link href={"/bloodtest"}>Blood Test</Link>
<Link href={"/offers"}>Offers</Link>
<Link href={"/giftvouchers"}>Gift Vouchers</Link>
<Link href={"/franchise"}>Gift Vouchers</Link>
<Link href={"/contact"}>Gift Vouchers</Link>
</>
  );
}