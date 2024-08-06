import { usePathname } from "next/navigation";

const TestPage = () => {
  const pathname = usePathname();
  return (
    <div className="absolute bottom-0 w-full flex justify-center">
      <p>Page {pathname}</p>
    </div>
  );
};

export default TestPage;
