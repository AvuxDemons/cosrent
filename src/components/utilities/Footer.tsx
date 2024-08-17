import { Divider } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative bg-default-800 text-default-50">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center">
        <div className="py-3 sm:py-5 w-full mx-auto flex flex-row justify-center items-center gap-5 font-medium text-xs sm:text-[0.85rem] bg-gradient-to-r from-transparent via-default-900 to-transparent">
          <Link
            href={"/"}
            className="flex flex-row items-center gap-1 text-default-300 hover:text-default-50 hover:scale-110 transition duration-300"
          >
            <FaMapMarkerAlt />
            <p>Surabaya</p>
          </Link>
          <Link
            href={"/"}
            className="flex flex-row items-center gap-1 text-default-300 hover:text-default-50 hover:scale-110 transition duration-300"
          >
            <FaInstagram />
            <p>WeebDev.ID</p>
          </Link>
          <Link
            href={"/"}
            className="flex flex-row items-center gap-1 text-default-300 hover:text-default-50 hover:scale-110 transition duration-300"
          >
            <FaWhatsapp />
            <p>081234567890</p>
          </Link>
        </div>
        <div className="py-4 sm:py-10 flex flex-row gap-5 items-center">
          <Image
            src={"/logo.png"}
            alt="logo"
            width={160}
            height={160}
            className="dark:invert"
          />
          <Divider className="hidden sm:block" orientation="vertical" />
          <div className="flex flex-col text-xs">
            <p>&copy; WeebDev.Cosrent 2022.</p>
            <p className="text-default-300">
              Powered by{" "}
              <Link
                href={"/"}
                className="text-default-50 hover:text-focus transition duration-300"
              >
                WeebDev.ID
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
