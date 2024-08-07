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
import { AnimatePresence, motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import { GiSpiderMask } from "react-icons/gi";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { navbarItems } from "@/components/utilities/Navbar/data";
import clsx from "clsx";
import UserAccountNav from "@/components/auth/AccountNav";
import Theme from "@/components/ui/Theme";

const NavigationBar = ({ session }: { session: any }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path: string) => pathname === path;

  const handleDropdownToggle = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <nav>
      <Navbar isBordered onMenuOpenChange={setIsMenuOpen}>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => handleNavigation("/")}
          >
            <GiSpiderMask size={25} />
            <p className="font-bold text-inherit">COSRENT</p>
          </div>
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
                    onClick={() => handleNavigation(item.path)}
                  >
                    {item.label}
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
                <UserAccountNav session={session} />
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
              <div className="flex flex-col gap-3 w-full">
                <p className="font-bold text-sm uppercase">{section.title}</p>
                <div className="flex flex-col gap-1 ml-4">
                  {section.data.map((item, idx) => (
                    <NavbarMenuItem
                      key={idx}
                      className="w-full font-medium"
                      onClick={() => handleNavigation(item.path)}
                    >
                      {item.label}
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
