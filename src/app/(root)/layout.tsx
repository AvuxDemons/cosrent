import NavigationBar from "@/components/utilities/Navbar/Navbar";
import { getAuthSession } from "@/lib/auth";

export default async function LobbyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAuthSession();

  return (
    <div>
      <NavigationBar session={session?.user} />
      <div>{children}</div>
    </div>
  );
}
