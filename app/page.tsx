import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="p-16 flex items-center h-full gap-8 justify-center flex-col">
      <Logo className="text-colorau-vermelho h-72 w-72" />
      <p>Site em construção</p>
      <Link href="/corista">
        <Button>ÁREA DO CORISTA</Button>
      </Link>
    </main>
  );
}
