"use client";

import { ImSpinner8 } from "react-icons/im";
import { FaGoogle } from "react-icons/fa";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import { signIn } from "next-auth/react";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = () => {
    setLoading(true);
    signIn("google");
    setLoading(false);
  };

  return (
    <div className="grid gap-2">
      <Button
        type="button"
        disabled={loading}
        isLoading={loading}
        onClick={handleClick}
      >
        <FaGoogle className="mr-2 h-4 w-4" />
        Google
      </Button>
    </div>
  );
}
