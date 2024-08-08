import Sidebar from "@/components/utilities/Sidebar";
import { getAuthSession } from "@/lib/auth";

export default async function LobbyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAuthSession();

  return (
    <div className="relative overflow-hidden">
      <div className="absolute top-0 left-0">
        <Sidebar session={session?.user} />
      </div>
      <div className="w-dvw h-dvh sm:pl-[80px] pt-[60px]">{children}</div>
    </div>
  );
}
