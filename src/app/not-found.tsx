import { Button } from "@nextui-org/react";
import { FaAngleLeft } from "react-icons/fa";
import { LuAlertTriangle } from "react-icons/lu";

export default function Component() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <LuAlertTriangle className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Oops, page not found!
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>
        <div className="mt-6">
          <Button startContent={<FaAngleLeft />}>Back</Button>
        </div>
      </div>
    </div>
  );
}
