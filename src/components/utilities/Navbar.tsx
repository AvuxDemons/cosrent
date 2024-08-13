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
  Avatar,
  DropdownSection,
  User,
} from "@nextui-org/react";
import {
  FaChevronDown,
  FaComment,
  FaImages,
  FaInfoCircle,
  FaMask,
  FaPhoneAlt,
  FaQuestionCircle,
  FaSignOutAlt,
  FaTshirt,
  FaUser,
} from "react-icons/fa";
import { FaBook, FaBookAtlas, FaCartShopping } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { GiSpiderMask } from "react-icons/gi";
import { useState } from "react";
import clsx from "clsx";
import Theme from "@/components/ui/Theme";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { signOut } from "next-auth/react";

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

const navbarItems: NavbarSection[] = [
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
        label: "Feedback",
        description: "Pendapat cosplayer tentang kami.",
        startContent: icons.review,
        path: "/#feedback",
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

const NavigationBar = ({ session }: { session: any }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const handleDropdownToggle = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  return (
    <nav>
      <Navbar position="static" isBordered onMenuOpenChange={setIsMenuOpen}>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <GiSpiderMask size={25} />
            <p className="font-bold text-inherit">COSRENT</p>
          </Link>
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
        <NavbarContent justify="end">
          <AnimatePresence>
            <NavbarItem>
              {session ? (
                <Dropdown
                  radius="sm"
                  classNames={{
                    base: "before:bg-default-200",
                    content: "p-0 border-small border-divider bg-background",
                  }}
                >
                  <DropdownTrigger className="flex items-center justify-center">
                    <Avatar
                      as="button"
                      size="sm"
                      showFallback
                      className="hover:opacity-50 transition-opacity"
                      src={session?.image}
                    />
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="Custom item styles"
                    disabledKeys={["user"]}
                    className="p-3"
                    itemClasses={{
                      base: [
                        "rounded-md",
                        "text-default-600",
                        "transition-opacity",
                        "data-[hover=true]:text-foreground",
                        "data-[hover=true]:bg-default-100",
                        "dark:data-[hover=true]:bg-default-50",
                        "data-[selectable=true]:focus:bg-default-50",
                        "data-[pressed=true]:opacity-70",
                        "data-[focus-visible=true]:ring-default-500",
                      ],
                    }}
                  >
                    <DropdownSection aria-label="User" showDivider>
                      <DropdownItem
                        isReadOnly
                        key="user"
                        className="h-14 gap-2 opacity-100"
                      >
                        <User
                          name={session?.name}
                          description={session?.email}
                          classNames={{
                            name: "text-default-600",
                            description: "text-default-500",
                          }}
                          avatarProps={{
                            size: "sm",
                            src: session?.image,
                          }}
                        />
                      </DropdownItem>
                      <DropdownItem
                        key="profile"
                        href="/profile"
                        startContent={<FaUser />}
                      >
                        Profile
                      </DropdownItem>
                      {session?.role === "user" ? (
                        <DropdownItem
                          key="orders"
                          href="/orders"
                          startContent={<FaCartShopping />}
                        >
                          Orders
                        </DropdownItem>
                      ) : (
                        <DropdownItem
                          key="admin"
                          href="/admin"
                          startContent={<TbLayoutDashboardFilled />}
                        >
                          Dashboard
                        </DropdownItem>
                      )}
                    </DropdownSection>
                    <DropdownSection aria-label="Settings" showDivider>
                      <DropdownItem
                        isReadOnly
                        key="theme"
                        endContent={<Theme />}
                      >
                        Tema
                      </DropdownItem>
                    </DropdownSection>
                    <DropdownSection aria-label="Help & Feedback">
                      <DropdownItem
                        key="help_and_feedback"
                        startContent={<FaPhoneAlt />}
                      >
                        Help & Feedback
                      </DropdownItem>
                      <DropdownItem
                        key="logout"
                        startContent={<FaSignOutAlt />}
                        onClick={() => signOut()}
                      >
                        Log Out
                      </DropdownItem>
                    </DropdownSection>
                  </DropdownMenu>
                </Dropdown>
              ) : (
                <div className="flex flex-row gap-2">
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1 },
                      exit: { opacity: 0 },
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <Theme />
                  </motion.div>
                  <Link href="/auth/login">
                    <Button color="primary" size="sm">
                      Login
                    </Button>
                  </Link>
                </div>
              )}
            </NavbarItem>
          </AnimatePresence>
        </NavbarContent>
        <NavbarMenu>
          {navbarItems.map((section, index) => (
            <div key={index}>
              {index > 0 ? <Divider className="my-2" /> : <Spacer y={2} />}
              <div className="flex flex-col gap-3 w-full text-sm">
                <p className="font-medium uppercase">{section.title}</p>
                <div className="flex flex-col gap-1 ml-4">
                  {section.data.map((item, idx) => (
                    <NavbarMenuItem key={idx} className="w-full">
                      <Link href={item.path}>{item.label}</Link>
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
