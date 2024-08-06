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
import { FaPhoneAlt, FaPlus, FaSignOutAlt, FaUser } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";

const UserAccountNav = ({ session }: { session: any }) => {
  return (
    <Dropdown
      radius="sm"
      classNames={{
        base: "before:bg-default-200",
        content: "p-0 border-small border-divider bg-background",
      }}
    >
      <DropdownTrigger className="flex items-center justify-center">
        <Avatar
          showFallback
          as="button"
          className="transition-transform"
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
        <DropdownSection aria-label="Profile & Actions" showDivider>
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
          <DropdownItem key="settings" startContent={<FaCartShopping />}>
            Orders
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
