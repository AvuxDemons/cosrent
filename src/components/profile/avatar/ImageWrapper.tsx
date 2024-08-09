import React, { useState } from "react";
import FileInput from "./ImageInput";
import ImageCropper from "./ImageCropper";
import { Area } from "react-easy-crop";

const ImageWrapper: React.FC = () => {
  const [image, setImage] = useState<string>("");
  const [imgAfterCrop, setImgAfterCrop] = useState<string>("");

  // Invoked when new image file is selected
  const onImageSelected = (selectedImg: string) => {
    setImage(selectedImg);
  };

  // Generating Cropped Image When Done Button Clicked
  const onCropDone = (imgCroppedArea: Area) => {
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

  // Handle Cancel Button Click
  const onCropCancel = () => {
    setImage("");
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
              setImage("");
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
