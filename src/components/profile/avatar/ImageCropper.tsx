import React, { useState, useEffect, useCallback } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Slider,
  RadioGroup,
  Radio,
} from "@nextui-org/react";
import Cropper, { Area } from "react-easy-crop";

interface ImageCropperProps {
  image: string;
  onCropDone: (croppedArea: Area | null) => void;
  onCropCancel: () => void;
}

const ImageCropper: React.FC<ImageCropperProps> = ({
  image,
  onCropDone,
  onCropCancel,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState<Area | null>(null);
  const [aspectRatio, setAspectRatio] = useState<number>(4 / 3);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const onCropComplete = (_: Area, croppedAreaPixels: Area) => {
    setCroppedArea(croppedAreaPixels);
  };

  const handleZoomChange = useCallback((value: number | number[]) => {
    if (Array.isArray(value)) {
      setZoom(value[0]);
    } else {
      setZoom(value);
    }
  }, []);

  const onAspectRatioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAspectRatio(parseFloat(event.target.value));
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      onClose={() => {
        setIsOpen(false);
        onCropCancel();
      }}
      placement="center"
      size="5xl"
      classNames={{ base: "h-[80vh]" }}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Crop Image</ModalHeader>
        <ModalBody>
          <div className="relative h-full">
            <Cropper
              image={image}
              aspect={aspectRatio}
              crop={crop}
              zoom={zoom}
              onCropChange={setCrop}
              onZoomChange={handleZoomChange}
              onCropComplete={onCropComplete}
              style={{
                containerStyle: {
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                },
              }}
            />
          </div>

          <div className="flex flex-col items-center justify-center">
            <Slider
              aria-label="Zoom Image"
              label="Zoom"
              hideValue={true}
              step={0.01}
              maxValue={3}
              minValue={1}
              value={zoom}
              classNames={{ base: "w-full max-w-md" }}
              onChange={handleZoomChange}
            />
            <RadioGroup
              orientation="horizontal"
              value={aspectRatio.toString()}
              onChange={onAspectRatioChange}
            >
              <Radio value={(1 / 1).toString()}>1:1</Radio>
              <Radio value={(4 / 3).toString()}>4:3</Radio>
              <Radio value={(16 / 9).toString()}>16:9</Radio>
            </RadioGroup>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            variant="light"
            onPress={() => {
              onCropCancel();
              setIsOpen(false);
            }}
          >
            Close
          </Button>
          <Button
            color="primary"
            onPress={() => {
              onCropDone(croppedArea);
              setIsOpen(false);
            }}
          >
            Action
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ImageCropper;
