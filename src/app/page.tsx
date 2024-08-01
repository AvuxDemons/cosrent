"use client";
import useSession from "@/stores/useSession";

const Page = () => {
  const { currentSession } = useSession();

  if (!currentSession) {
    return (
      <div>
        <p className="text-3xl font-bold underline">Halo !</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-500">
      <p className="text-3xl font-bold underline">Hello world!</p>
    </div>
  );
};

export default Page;
