import {
  FaChevronDown,
  FaComment,
  FaImages,
  FaInfoCircle,
  FaMask,
  FaPhoneAlt,
  FaQuestionCircle,
  FaTshirt,
} from "react-icons/fa";
import { FaBook, FaBookAtlas } from "react-icons/fa6";

type NavbarItemData = {
  label: string;
  description: string;
  startContent: JSX.Element;
  path: string;
};

type NavbarSection = {
  title: string;
  data: NavbarItemData[];
};

const icons = {
  chevron: <FaChevronDown size={10} />,
  gallery: <FaImages size={25} />,
  review: <FaComment size={25} />,
  faq: <FaQuestionCircle size={25} />,
  costume: <FaTshirt size={25} />,
  accessories: <FaMask size={25} />,
  book: <FaBook size={25} />,
  about: <FaInfoCircle size={25} />,
  bookAtlas: <FaBookAtlas size={25} />,
  support: <FaPhoneAlt size={25} />,
};

export const navbarItems: NavbarSection[] = [
  {
    title: "Home",
    data: [
      {
        label: "Galeri",
        description: "Galeri Kostum & Aksesoris kami.",
        startContent: icons.gallery,
        path: "/#gallery",
      },
      {
        label: "Testimoni",
        description: "Pendapat cosplayer tentang kami.",
        startContent: icons.review,
        path: "/#review",
      },
      {
        label: "FAQ",
        description: "Pertanyaan yang sering ditanyakan.",
        startContent: icons.faq,
        path: "/#faq",
      },
    ],
  },
  {
    title: "Katalog",
    data: [
      {
        label: "Kostum",
        description: "kostum dengan kualitas terbaik.",
        startContent: icons.costume,
        path: "/katalog",
      },
      {
        label: "Aksesoris",
        description: "Aksesoris pelengkap karakter impianmu.",
        startContent: icons.accessories,
        path: "/katalog",
      },
      {
        label: "Cara & Peraturan Sewa",
        description: "Cara & Peraturan Sewa kami.",
        startContent: icons.book,
        path: "/rules",
      },
    ],
  },
  {
    title: "About",
    data: [
      {
        label: "About Us",
        description: "Tentang Kami & Visi Misi kami.",
        startContent: icons.about,
        path: "/",
      },
      {
        label: "TOS & Privacy Policy",
        description: "Persyaratan Layanan dan Kebijakan Privasi.",
        startContent: icons.bookAtlas,
        path: "/",
      },
      {
        label: "Support",
        description: "Butuh Bantuan ? Hubungi Kami.",
        startContent: icons.support,
        path: "/",
      },
    ],
  },
];
