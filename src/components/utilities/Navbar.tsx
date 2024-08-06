"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Divider,
  Spacer,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
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
import { GiSpiderMask } from "react-icons/gi";
import { useState } from "react";
import clsx from "clsx";
import ThemeSwitch from "../ui/Theme";
import { useSession } from "next-auth/react";
import UserAccountNav from "../auth/AccountNav";

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

const NavigationBar = () => {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

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

  const navbarItems: NavbarSection[] = [
    {
      title: "Home",
      data: [
        {
          label: "Galeri",
          description: "Galeri Kostum & Aksesoris kami.",
          startContent: icons.gallery,
          path: "/",
        },
        {
          label: "Testimoni",
          description: "Pendapat cosplayer tentang kami.",
          startContent: icons.review,
          path: "/",
        },
        {
          label: "FAQ",
          description: "Pertanyaan yang sering ditanyakan.",
          startContent: icons.faq,
          path: "/",
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
          path: "/",
        },
        {
          label: "Aksesoris",
          description: "Aksesoris pelengkap karakter impianmu.",
          startContent: icons.accessories,
          path: "/",
        },
        {
          label: "Cara & Peraturan Sewa",
          description: "Cara & Peraturan Sewa kami.",
          startContent: icons.book,
          path: "/",
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

  const handleDropdownToggle = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  return (
    <nav>
      <Navbar isBordered onMenuOpenChange={setIsMenuOpen}>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand className="flex items-center gap-2">
          <GiSpiderMask size={25} />
          <p className="font-bold text-inherit">COSRENT</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {navbarItems.map((section, index) => (
            <Dropdown
              key={section.title}
              isOpen={openDropdown === index}
              onOpenChange={() => handleDropdownToggle(index)}
            >
              <NavbarItem>
                <DropdownTrigger>
                  <Button
                    disableRipple
                    className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                    endContent={
                      <FaChevronDown
                        size={10}
                        className={clsx({
                          "rotate-180": openDropdown === index,
                          "rotate-0": openDropdown !== index,
                        })}
                      />
                    }
                    radius="sm"
                    variant="light"
                  >
                    {section.title}
                  </Button>
                </DropdownTrigger>
              </NavbarItem>
              <DropdownMenu
                aria-label={`${section.title} features`}
                className="w-[340px]"
                itemClasses={{
                  base: "gap-4 px-4 py-2",
                }}
              >
                {section.data.map((item) => (
                  <DropdownItem
                    key={item.label}
                    description={item.description}
                    startContent={item.startContent}
                    className={clsx({
                      "text-primary": isActive(item.path),
                    })}
                  >
                    <Link href={item.path}>{item.label}</Link>
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          ))}
        </NavbarContent>
        <NavbarContent justify="end" className="sm:flex gap-0">
          <NavbarItem>
            <ThemeSwitch />
          </NavbarItem>
          <NavbarItem>
            <UserAccountNav session={session} />
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu>
          {navbarItems.map((section, index) => (
            <div key={index}>
              {index > 0 ? <Divider className="my-2" /> : <Spacer y={2} />}
              <div className="flex flex-col gap-3 w-full">
                <p className="font-bold text-sm uppercase">{section.title}</p>
                <div className="flex flex-col gap-1 ml-4">
                  {section.data.map((item, idx) => (
                    <NavbarMenuItem key={idx}>
                      <Link className="w-full font-medium" href="#">
                        {item.label}
                      </Link>
                    </NavbarMenuItem>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </NavbarMenu>
      </Navbar>
    </nav>
  );
};

export default NavigationBar;
