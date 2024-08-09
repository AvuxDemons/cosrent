"use client";
import ImageWrapper from "@/components/profile/avatar/ImageWrapper";
import TestPage from "@/components/test/Page";

const Page = () => {
  return (
    <>
      <div className="h-full flex flex-col items-center justify-center">
        <p className="text-xl">Punten Paket</p>
        <ImageWrapper />
      </div>
      <TestPage />
    </>
  );
};

export default Page;
