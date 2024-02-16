import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Material() {
  return (
    <div className="space-y-2 border p-2">
      <p className="uppercase font-bold">Nome da Música</p>
      <div className="flex gap-4">
        <Link href="/">
          <Button size="sm">Partitura</Button>
        </Link>
        <Link href="/">
          <Button size="sm">Áudios</Button>
        </Link>
      </div>
    </div>
  );
}
