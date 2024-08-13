"use client";

import React, { useState } from "react";
import {
  SidebarWrapper,
  SidebarBody,
  SidebarLink,
  SidebarAvatar,
} from "@/components/ui/Sidebar";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  FaArrowLeft,
  FaBoxes,
  FaCalendar,
  FaFileInvoiceDollar,
  FaMask,
  FaPhoneAlt,
  FaTable,
  FaTshirt,
  FaUser,
} from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { TbLayoutDashboardFilled } from "react-icons/tb";

const Sidebar = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) => {
  const icons = {
    dashboard: (
      <TbLayoutDashboardFilled className="text-neutral-700 dark:text-neutral-200 h-6 w-6 flex-shrink-0" />
    ),
    pengajuan: (
      <FaFileInvoiceDollar className="text-neutral-700 dark:text-neutral-200 h-6 w-6 flex-shrink-0" />
    ),
    jadwal: (
      <FaCalendar className="text-neutral-700 dark:text-neutral-200 h-6 w-6 flex-shrink-0" />
    ),
    kostum: (
      <FaTshirt className="text-neutral-700 dark:text-neutral-200 h-6 w-6 flex-shrink-0" />
    ),
    bundle: (
      <FaBoxes className="text-neutral-700 dark:text-neutral-200 h-6 w-6 flex-shrink-0" />
    ),
    accessories: (
      <FaMask className="text-neutral-700 dark:text-neutral-200 h-6 w-6 flex-shrink-0" />
    ),
    support: (
      <FaPhoneAlt className="text-neutral-700 dark:text-neutral-200 h-6 w-6 flex-shrink-0" />
    ),
  };
  const navigationItems = [
    {
      title: "Home",
      data: [
        { label: "Dashboard", path: "/admin", icon: icons.dashboard },
        {
          label: "Pengajuan",
          path: "/admin/queue",
          icon: icons.pengajuan,
        },
        { label: "Jadwal", path: "/schedule", icon: icons.jadwal },
      ],
    },
    {
      title: "Katalog",
      data: [
        {
          label: "Kostum",
          path: "/admin/katalog/costume",
          icon: icons.kostum,
        },
        {
          label: "Bundle",
          path: "/admin/katalog/bundle",
          icon: icons.bundle,
        },
        {
          label: "Aksesoris",
          path: "/admin/katalog/accessories",
          icon: icons.accessories,
        },
      ],
    },
    {
      title: "Assets",
      data: [
        {
          label: "Kostum",
          path: "/admin/assets/costume",
          icon: icons.kostum,
        },
        {
          label: "Aksesoris",
          path: "/admin/assets/accessories",
          icon: icons.accessories,
        },
      ],
    },
  ];
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen"
      )}
    >
      <SidebarWrapper open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-5">
              {navigationItems.map((item, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  <p
                    className={`${
                      open ? "visible" : "invisible"
                    } text-xs font-medium`}
                  >
                    {item.title}
                  </p>
                  <div>
                    {item.data.map((data, idx) => (
                      <SidebarLink key={idx} link={data} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <SidebarAvatar session={session} />
        </SidebarBody>
      </SidebarWrapper>
      <div className="w-full">{children}</div>
    </div>
  );
};

export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-6 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Cosrent
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-6 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};

export default Sidebar;
