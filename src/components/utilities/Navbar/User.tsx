"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  User,
  Avatar,
} from "@nextui-org/react";
import { signOut } from "next-auth/react";
import { FaPhoneAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { FaCartShopping } from "react-icons/fa6";
import Theme from "@/components/ui/Theme";
import Link from "next/link";

const UserAccountNav = ({
  trigger,
  session,
}: {
  trigger: "avatar" | "user";
  session: any;
}) => {
  return (
    <Dropdown
      radius="sm"
      classNames={{
        base: "before:bg-default-200",
        content: "p-0 border-small border-divider bg-background",
      }}
    >
      <DropdownTrigger className="flex items-center justify-center">
        {trigger === "avatar" ? (
          <Avatar
            as="button"
            size="sm"
            showFallback
            className="hover:opacity-50 transition-opacity"
            src={session?.image}
          />
        ) : (
          <User
            as="button"
            name={session?.name}
            classNames={{
              name: "text-default-600",
              description: "text-default-500",
              base: "hover:opacity-50 transition-opacity",
            }}
            avatarProps={{
              size: "sm",
              src: session?.image,
            }}
          />
        )}
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
          <DropdownItem key="profile" startContent={<FaUser />}>
            My Profile
          </DropdownItem>
          {session.role === "user" ? (
            <DropdownItem key="orders" startContent={<FaCartShopping />}>
              Orders
            </DropdownItem>
          ) : (
            <DropdownItem
              key="admin"
              startContent={<TbLayoutDashboardFilled />}
            >
              <Link href="/admin">Dashboard</Link>
            </DropdownItem>
          )}
        </DropdownSection>
        <DropdownSection aria-label="Settings" showDivider>
          <DropdownItem isReadOnly key="theme" endContent={<Theme />}>
            Tema
          </DropdownItem>
        </DropdownSection>
        <DropdownSection aria-label="Help & Feedback">
          <DropdownItem key="help_and_feedback" startContent={<FaPhoneAlt />}>
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
  );
};

export default UserAccountNav;
