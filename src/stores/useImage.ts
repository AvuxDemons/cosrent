import { create } from "zustand";

interface ImageState {
    image: string;
    imgAfterCrop: string;
    setImage: (image: string) => void;
    setImgAfterCrop: (imgAfterCrop: string) => void;
    resetImage: () => void;
}

const useImageStore = create<ImageState>((set) => ({
    image: "",
    imgAfterCrop: "",
    setImage: (image) => set({ image }),
    setImgAfterCrop: (imgAfterCrop) => set({ imgAfterCrop }),
    resetImage: () => set({ image: "", imgAfterCrop: "" }),
}));

export default useImageStore;
