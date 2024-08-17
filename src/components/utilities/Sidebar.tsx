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
  FaBoxes,
  FaCalendar,
  FaFileInvoiceDollar,
  FaPhoneAlt,
  FaTshirt,
  FaWrench,
} from "react-icons/fa";
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
    settings: (
      <FaWrench className="text-neutral-700 dark:text-neutral-200 h-6 w-6 flex-shrink-0" />
    ),
    support: (
      <FaPhoneAlt className="text-neutral-700 dark:text-neutral-200 h-6 w-6 flex-shrink-0" />
    ),
  };
  const navigationItems = [
    {
      label: "Dashboard",
      path: "/admin",
      icon: icons.dashboard,
    },
    {
      label: "Pengajuan",
      path: "/admin/queue",
      icon: icons.pengajuan,
    },
    {
      label: "Jadwal",
      path: "/schedule",
      icon: icons.jadwal,
    },
    {
      label: "Katalog",
      path: "/admin/katalog/costume",
      icon: icons.kostum,
    },
    {
      label: "Assets",
      path: "/admin/katalog/bundle",
      icon: icons.bundle,
    },
    {
      label: "Pengaturan",
      path: "/admin/settings",
      icon: icons.settings,
    },
  ];
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row w-full flex-1 mx-autooverflow-hidden",
        "h-screen"
      )}
    >
      <SidebarWrapper open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8">
              {navigationItems.map((item, idx) => (
                <SidebarLink key={idx} link={item} />
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
        className="font-bold text-black dark:text-white whitespace-pre"
      >
        WEEBDEV.ID
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
