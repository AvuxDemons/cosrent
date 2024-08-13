import Sidebar from "@/components/utilities/Sidebar";
import { getAuthSession } from "@/lib/auth";

export default async function LobbyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAuthSession();

  return <Sidebar children={children} session={session?.user} />;
}
