import Material from "@/components/material";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Corista() {
  return (
    <main className="p-16 flex items-center h-full gap-8 justify-center flex-col">
      <h1 className="text-3xl font-bold uppercase text-colorau-vermelho">
        Área do Corista
      </h1>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Material de Apoio</AccordionTrigger>
          <AccordionContent className="flex-col gap-2 flex">
            <Material />
            <Material />
            <Material />
            <Material />
            <Material />
            <Material />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Playlist YouTube</AccordionTrigger>
          <AccordionContent>
            <Link href="https://youtube.com/playlist?list=PLxATMDXeONjHucJ82CG4e0t20B1zjk1j7&si=2AvphIirLQKbja19">
              <Button>Acessar Playlist</Button>
            </Link>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Contribuição</AccordionTrigger>
          <AccordionContent>
            O Colorau é um projeto voluntário mas ainda assim temos algumas
            despesas como aluguel do espaço e locomoção. Contribua com o Colorau
            todos os meses com o valor mínimo de <strong>R$20</strong>.{" "}
            <div className="border p-2">
              <strong>Chave PIX:</strong> coloraucontato@gmail.com
            </div>
            <br />
            <br />
            Em caso de dúvidas ou esclarescimentos, procure alguém da equipe de
            produção.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </main>
  );
}
