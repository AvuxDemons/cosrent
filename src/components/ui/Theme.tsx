"use client";

import { useEffect, useState } from "react";
import { Switch } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="relative">
      <p className="absolute top-[-5px] text-[0.5rem] uppercase tracking-widest ml-1">
        Tema ?
      </p>
      <Switch
        defaultSelected={theme === "dark"}
        size="sm"
        color="default"
        startContent={<FaSun />}
        endContent={<FaMoon />}
        onChange={toggleTheme}
        className="pt-4"
      />
    </div>
  );
};

export default ThemeSwitch;
