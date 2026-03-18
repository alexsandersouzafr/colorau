import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { galleryPhotos } from "@/lib/site-data";

export default function GaleriaPage() {
  return (
    <div className="py-10 md:py-16">
      <section className="container-width flex flex-col gap-8 md:gap-10">
        <Reveal className="section-card section-inverse p-0">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_160px]">
            <div className="px-6 py-7 md:px-10 md:py-10">
              <span className="pill bg-accent text-accent-foreground">Galeria de fotos</span>
              <h1 className="mt-4 text-3xl font-semibold md:text-5xl">
                Registros
              </h1>
              <p className="mt-4 max-w-3xl text-white/80">
                Ensaios, saraus, concertos e
                espetáculos.
              </p>
            </div>
            <div
              aria-hidden="true"
              className="texture-panel texture-3 texture-background hidden min-h-[200px] md:block"
            />
          </div>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {galleryPhotos.map((photo, index) => (
            <Reveal key={`${photo}-${index}`} className="p-0">
              <div className="relative aspect-4/5 w-full overflow-hidden">
                <Image
                  src={photo}
                  alt={`Registro fotográfico ${index + 1} do COLORAU`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
