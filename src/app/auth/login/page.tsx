import Image from "next/image";
import Link from "next/link";
import { UserAuthForm } from "@/app/auth/login/components/user-auth-form";
import { Metadata } from "next";
import Theme from "@/components/ui/Theme";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

const AuthenticationPage = () => {
  return (
    <>
      <div className="container relative h-svh flex flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="absolute right-4 top-4 md:right-8 md:top-8">
          <Theme />
        </div>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div>
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-gray-50/0 to-zinc-900/80 z-[2] h-full"></div>
            <Image
              src="https://i0.wp.com/server8.miterequest.my.id/public/1251/img_20231125_031320_0337.jpg"
              alt="Background Image"
              fill
              objectFit="cover"
              objectPosition="center 20%"
              className="absolute inset-0"
            />
          </div>
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            Acme Inc
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Cosplay bukan hanya tentang mengenakan kostum, tetapi
                juga tentang menghidupkan karakter yang kita cintai.&rdquo; -
                Kang Siomay
              </p>
              <footer className="text-sm">
                In Frame{" "}
                <Link className="underline" href={"https://x.com/vestiazeta"}>
                  @VestiaZeta
                </Link>
              </footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight capitalize">
                Mulai cari kostum Sekarang
              </h1>
              <p className="text-sm text-muted-foreground">
                Masuk untuk menikmati fitur yang lebih lengkap
              </p>
            </div>
            <UserAuthForm />
            <p className="text-center text-sm text-muted-foreground">
              Dengan melanjutkan, anda menyetujui{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Persyaratan
              </Link>{" "}
              dan{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Kebijakan
              </Link>{" "}
              kami.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthenticationPage;
