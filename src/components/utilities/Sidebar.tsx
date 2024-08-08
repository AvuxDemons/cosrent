"use client";

import Image from "next/image";
import Link from "next/link";
import UserAccountNav from "./Navbar/User";
import { BreadcrumbItem, Breadcrumbs, Button } from "@nextui-org/react";
import { useState } from "react";
import {
  FaBoxes,
  FaCalendar,
  FaFileInvoiceDollar,
  FaMask,
  FaPhoneAlt,
  FaTimes,
  FaTshirt,
} from "react-icons/fa";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { AnimatePresence, motion } from "framer-motion";
import { FaBars } from "react-icons/fa6";
import { usePathname } from "next/navigation";

const icons = {
  dashboard: <TbLayoutDashboardFilled className="h-6 w-6" />,
  pengajuan: <FaFileInvoiceDollar className="h-6 w-6" />,
  jadwal: <FaCalendar className="h-6 w-6" />,
  kostum: <FaTshirt className="h-6 w-6" />,
  bundle: <FaBoxes className="h-6 w-6" />,
  accessories: <FaMask className="h-6 w-6" />,
  support: <FaPhoneAlt className="h-6 w-6" />,
};

const navigationItems = [
  {
    title: "Home",
    data: [
      { label: "Dashboard", path: "/admin", startContent: icons.dashboard },
      {
        label: "Pengajuan",
        path: "/admin/queue",
        startContent: icons.pengajuan,
      },
      { label: "Jadwal", path: "/schedule", startContent: icons.jadwal },
    ],
  },
  {
    title: "Katalog",
    data: [
      {
        label: "Kostum",
        path: "/admin/katalog/costume",
        startContent: icons.kostum,
      },
      {
        label: "Bundle",
        path: "/admin/katalog/bundle",
        startContent: icons.bundle,
      },
      {
        label: "Aksesoris",
        path: "/admin/katalog/accessories",
        startContent: icons.accessories,
      },
    ],
  },
  {
    title: "Assets",
    data: [
      {
        label: "Kostum",
        path: "/admin/assets/costume",
        startContent: icons.kostum,
      },
      {
        label: "Aksesoris",
        path: "/admin/assets/accessories",
        startContent: icons.accessories,
      },
    ],
  },
];

const Sidebar = ({ session }: { session: any }) => {
  const pathname = usePathname();
  const breadcrumbs: string[] = pathname.split("/").filter(Boolean);
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="flex flex-row">
      {/* Desktop */}
      <motion.div
        initial={{ width: "120px" }}
        animate={{ width: open ? "400px" : "120px" }}
        exit={{ width: "120px" }}
        transition={{ duration: 0.3 }}
        className={`hidden relative overflow-hidden sm:flex flex-col justify-between h-screen py-8 overflow-y-auto bg-content2 border-r rtl:border-r-0 rtl:border-l`}
      >
        <div className="flex justify-center">
          <Image
            width={40}
            height={40}
            src="https:merakiui.com/images/logo.svg"
            alt=""
          />
        </div>

        <aside className="absolute w-full h-[85%] top-[100px] flex flex-col justify-between flex-1">
          <nav className={`space-y-6 ${open && "px-4"} `}>
            {navigationItems.map((item) => (
              <div
                key={item.title}
                className={`flex flex-col space-y-3
                  ${open ? "items-start" : "items-center"}
                  `}
              >
                <label className="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">
                  {item.title}
                </label>
                <div className="flex flex-col gap-1 w-full">
                  {item.data.map((data) => (
                    <Link
                      key={data.label}
                      className={`flex flex-row items-center px-3 py-2 rounded-lg text-default-700 hover:bg-default-200 transition-colors duration-300 transform
                         ${!open && "justify-center"}`}
                      href={data.path}
                    >
                      {data.startContent}
                      <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        animate={{
                          opacity: open ? 1 : 0,
                          width: open ? "auto" : 0,
                        }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{
                          duration: 0.3,
                        }}
                      >
                        <span className="mx-2 text-sm">{data.label}</span>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </aside>

        {open ? (
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: open ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <UserAccountNav trigger="user" session={session} />
          </motion.div>
        ) : (
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 1 }}
            animate={{ opacity: open ? 0 : 1 }}
            exit={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <UserAccountNav trigger="avatar" session={session} />
          </motion.div>
        )}
      </motion.div>

      {/* Mobile */}
      <motion.div
        initial={{ width: "0px" }}
        animate={{ width: open ? "400px" : "0px" }}
        exit={{ width: "0px" }}
        transition={{ duration: 0.3 }}
        className={`relative overflow-hidden flex sm:hidden flex-col justify-between h-screen py-8 overflow-y-auto bg-content2 border-r rtl:border-r-0 rtl:border-l`}
      >
        <div className="flex justify-center">
          <Image
            width={40}
            height={40}
            src="https:merakiui.com/images/logo.svg"
            alt=""
          />
        </div>

        <aside className="absolute w-full h-[85%] top-[100px] flex flex-col justify-between flex-1">
          <nav className={`space-y-6 ${open && "px-4"} `}>
            {navigationItems.map((item) => (
              <div key={item.title} className="flex flex-col space-y-3">
                <label className="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">
                  {item.title}
                </label>
                <div className="flex flex-col gap-1">
                  {item.data.map((data) => (
                    <Link
                      key={data.label}
                      className="flex flex-row items-center px-3 py-2 rounded-lg text-default-700 hover:bg-default-200 transition-colors duration-300 transform"
                      href={data.path}
                    >
                      {data.startContent}
                      <span className="mx-2 text-sm">{data.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </aside>

        {open ? (
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: open ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <UserAccountNav trigger="user" session={session} />
          </motion.div>
        ) : (
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 1 }}
            animate={{ opacity: open ? 0 : 1 }}
            exit={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <UserAccountNav trigger="avatar" session={session} />
          </motion.div>
        )}
      </motion.div>

      <div className="p-2 h-14 w-full flex flex-row items-center gap-2">
        <Button onClick={() => setOpen(!open)} variant="light" isIconOnly>
          <AnimatePresence>
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: open ? 90 : 0 }}
              exit={{ rotate: 0 }}
              transition={{ duration: 0.3 }}
            >
              {open ? <FaTimes size={20} /> : <FaBars size={20} />}
            </motion.div>
          </AnimatePresence>
        </Button>
        <div className="flex flex-col gap-0">
          <Breadcrumbs size="sm">
            {breadcrumbs?.map((path, index) => (
              <BreadcrumbItem
                href={`/${path}`}
                key={index}
                classNames={{ item: "capitalize" }}
              >
                {path}
              </BreadcrumbItem>
            ))}
          </Breadcrumbs>
          <p>Admin</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
