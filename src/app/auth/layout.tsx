import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function LobbyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAuthSession();

  if (session?.user) {
    redirect("/");
  }

  return <div>{children}</div>;
}
