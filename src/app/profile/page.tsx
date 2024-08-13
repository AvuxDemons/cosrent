"use client";
import ImageWrapper from "@/components/ui/Image/ImageWrapper";
import TestPage from "@/components/test/Page";
import useImageStore from "@/stores/useImage";

const Page = () => {
  const { image, imgAfterCrop, setImage, setImgAfterCrop, resetImage } =
    useImageStore();

  return (
    <>
      <div className="h-full flex flex-col items-center justify-center">
        <p className="text-xl">Punten Paket</p>
        <ImageWrapper
          image={image}
          imgAfterCrop={imgAfterCrop}
          setImage={setImage}
          setImgAfterCrop={setImgAfterCrop}
          resetImage={resetImage}
        />
      </div>
      <TestPage />
    </>
  );
};

export default Page;
