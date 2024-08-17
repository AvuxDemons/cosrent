"use client";
import TestPage from "@/components/test/Page";
import Link from "next/link";

const Page = () => {
  return (
    <div>
      <Link href="https://api.whatsapp.com/send/?phone=6281393889505&text&type=phone_number&app_absent=0">
        Test Whatsapp
      </Link>
      <TestPage />
    </div>
  );
};

export default Page;
