import React from "react";
import FileInput from "./ImageInput";
import ImageCropper from "./ImageCropper";
import { Area } from "react-easy-crop";

interface ImageWrapperProps {
  image: string;
  imgAfterCrop: string;
  setImage: (image: string) => void;
  setImgAfterCrop: (image: string) => void;
  resetImage: () => void;
}

const ImageWrapper: React.FC<ImageWrapperProps> = ({
  image,
  imgAfterCrop,
  setImage,
  setImgAfterCrop,
  resetImage,
}: ImageWrapperProps) => {
  // Invoked when new image file is selected
  const onImageSelected = (selectedImg: string | ArrayBuffer | null) => {
    if (typeof selectedImg === "string") {
      setImage(selectedImg);
    } else {
      resetImage();
    }
  };

  const onCropDone = (imgCroppedArea: Area | null) => {
    if (!imgCroppedArea) return;

    const canvasEle = document.createElement("canvas");
    canvasEle.width = imgCroppedArea.width;
    canvasEle.height = imgCroppedArea.height;

    const context = canvasEle.getContext("2d");

    if (context) {
      let imageObj1 = new Image();
      imageObj1.src = image;
      imageObj1.onload = function () {
        context.drawImage(
          imageObj1,
          imgCroppedArea.x,
          imgCroppedArea.y,
          imgCroppedArea.width,
          imgCroppedArea.height,
          0,
          0,
          imgCroppedArea.width,
          imgCroppedArea.height
        );

        const dataURL = canvasEle.toDataURL("image/jpeg");

        setImgAfterCrop(dataURL);
      };
    }
  };

  const onCropCancel = () => {
    resetImage();
  };

  return (
    <div className="container">
      {!image && <FileInput onImageSelected={onImageSelected} />}
      {image && (
        <ImageCropper
          image={image}
          onCropDone={onCropDone}
          onCropCancel={onCropCancel}
        />
      )}
      {imgAfterCrop && (
        <div>
          <div>
            <img
              src={imgAfterCrop}
              className="cropped-img"
              alt="Cropped result"
            />
          </div>

          <button onClick={() => setImage(image)} className="btn">
            Crop
          </button>

          <button
            onClick={() => {
              resetImage();
            }}
            className="btn"
          >
            New Image
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageWrapper;
