import { Background } from "@/components/Background";
import { WrapperVideo } from "@/components/WrapperVideo";
import Image from "next/image";

export default function Home() {
  return (
    <main className="fixed inset-0">
      <WrapperVideo />
      <Background />
    </main>
  );
}
