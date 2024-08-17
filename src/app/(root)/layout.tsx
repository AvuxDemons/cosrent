import Footer from "@/components/utilities/Footer";
import NavigationBar from "@/components/utilities/Navbar";
import { getAuthSession } from "@/lib/auth";

export default async function LobbyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAuthSession();

  return (
    <div className="min-h-screen flex flex-col justify-between overflow-hidden">
      <NavigationBar session={session?.user} />
      <div>{children}</div>
      <Footer />
    </div>
  );
}
