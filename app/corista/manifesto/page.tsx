import { Reveal } from "@/components/reveal";
import Link from "next/link";

export default function ManifestoPage() {
  return (
    <div className="py-10 md:py-16">
      <section className="container-width flex flex-col gap-8 md:gap-10">
        <Reveal className="section-card p-0 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_200px]">
            <div className="px-6 py-7 md:px-10 md:py-10">
              <Link href="/corista" className="text-sm text-black/50 hover:text-black/80 transition uppercase tracking-widest font-semibold">
                &larr; Voltar
              </Link>
              <h1 className="mt-6 text-3xl font-semibold md:text-5xl text-accent">
                Manifesto e Cultura
              </h1>
            </div>
            <div
              aria-hidden="true"
              className="texture-panel texture-3 hidden min-h-[160px] md:block"
            />
          </div>
        </Reveal>

        <Reveal className="section-card overflow-hidden text-black/80">
          <div className="px-6 py-7 md:px-10 md:py-10 space-y-10">
            <section>
              <h2 className="text-2xl font-semibold text-accent mb-4">Muitas Cores, Uma Voz</h2>
              <p className="mb-4 text-lg leading-relaxed">
                O Colorau é um coletivo coral independente que tem muito orgulho de ser de Belo Horizonte. Como o colorau, somos um tempero vibrante que aquece, mistura e revela potências. Acreditamos que <strong>a música não flui em corpos rígidos</strong>, mas naqueles que se permitem vibrar com leveza, e é isso que buscamos em cada ensaio.
              </p>
              <p className="mb-4 text-lg leading-relaxed">
                Nosso objetivo é <strong>expandir a experiência coral para quem canta e para quem assiste</strong>. Buscamos constantemente <strong>apresentar o que não se espera de um coral</strong>. O Colorau respira junto e transforma o encontro em uma experiência artística viva e impressionante. É um grupo leve, descontraído, seguro e que busca além da excelência artística. Queremos colecionar o máximo de experiências pessoais e afetivas que a arte puder nos proporcionar.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-accent mb-4">Cultura de Trabalho: Coletividade e Direção</h2>
              <p className="mb-4 text-lg leading-relaxed">
                O Colorau funciona como um <strong>laboratório artístico</strong> focado em resultados de alta qualidade técnica e impacto sensorial. Nossa cultura se baseia na construção artesanal da performance a partir do compromisso individual com o grupo.
              </p>
              <ul className="list-disc list-inside space-y-3 ml-2 text-lg leading-relaxed">
                <li><strong>Coletividade</strong>: As nossas vozes moldam nossa identidade no ensaio e no palco. É responsabilidade de todos manter o Colorau leve, excelente tecnicamente e imersivo. Fazemos todos juntos, cada um na sua designada função.</li>
                <li><strong>Confiança Técnica</strong>: O grupo precisa confiar no conhecimento e na experiência da direção artística e do maestro para filtrar propostas e decidir o que será levado ao palco e como.</li>
                <li><strong>Espaço para Propor</strong>: Os coristas sempre terão oportunidade de propor ideias artísticas e estas contribuições serão organizadas pela produção e pela direção.</li>
                <li><strong>Excelência com Afeto</strong>: Buscamos peças bem elaboradas que exigem esforço artesanal, utilizando o afeto e a leveza como combustíveis para um trabalho que é, ao mesmo tempo, divertido, mas com metas objetivas.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-accent mb-4">Funções e Responsabilidades</h2>
              <ul className="list-disc list-inside space-y-3 ml-2 text-lg leading-relaxed">
                <li><strong>Maestro (Direção Musical):</strong> Fornece conhecimento, guia o aprendizado e é responsável pela performance do grupo, decidindo os caminhos estéticos e musicais para cada peça, bem como se manter atento e filtrar as necessidades e sugestões de ttodos os artistas envolvidos.</li>
                <li><strong>Preparação Vocal:</strong> Orienta o aquecimento e orienta sobre técnica e saúde vocal. Os aquecimentos são elaborados a partir do programa escolhido para cada ensaio.</li>
                <li><strong>Produção Executiva:</strong> Equipe que trabalha em tudo que o grupo precisa para acontecer. Logísticas, locações, financeiro, gestão de crise, elaboração, execução e planejamentos, etc.</li>
                <li><strong>Pianista (Correpetição):</strong> O pianista acompanha o coro e dá suporte ao maestro no ensaio.</li>
              </ul>
            </section>
          </div>
        </Reveal>

        <Reveal className="section-card bg-accent/10 p-6 md:p-10 border border-accent/20">
          <h2 className="text-2xl font-semibold text-accent mb-4">Etiquetas de Ensaio: O Ritual da Imersão</h2>
          <p className="mb-4 text-lg text-black/80 leading-relaxed">
            Para que o Colorau transmita sempre cuidado com a música, com a cultura e com o processo criativo, o ensaio é tratado como um espaço sagrado de concentração e preparo técnico. Cada ensaio é elaborado pela direção musical que conta sempre com o grupo todo presente.
          </p>
          <div className="mb-8 p-4 bg-accent/20 border border-accent/30 text-accent-foreground font-semibold text-sm uppercase tracking-wider leading-relaxed">
            Faltas e atrasos precisam ser sempre notificados à direção previamente pois interferem no planejamento do ensaio. Se um naipe inteiro não puder comparecer, o ensaio é cancelado para todos.
          </div>

          <div className="space-y-8 mt-6">
            <div>
              <h3 className="text-xl font-semibold text-black mb-3">1. Foco e Respeito ao Processo</h3>
              <ol className="list-decimal list-inside space-y-2 ml-2 text-black/80 text-lg leading-relaxed">
                <li><strong>Imersão Total:</strong> Os ensaios exigem concentração do início ao fim; discussões paralelas devem ser deixadas para antes ou depois da prática.</li>
                <li><strong>O Silêncio como Base:</strong> O silêncio é uma base sólida que deve ser mantida o tempo inteiro; enquanto um naipe passa sua parte, os outros prestam atenção absoluta.</li>
                <li><strong>Prontidão Ativa:</strong> É responsabilidade do grupo estar a postos para receber comandos do maestro, mantendo um esforço ativo de atenção.</li>
              </ol>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-black mb-3">2. Responsabilidade do Corista</h3>
              <ol className="list-decimal list-inside space-y-2 ml-2 text-black/80 text-lg leading-relaxed">
                <li><strong>Preparo Individual:</strong> Cada corista deve se cobrar imersão e conhecer profundamente as peças do repertório.</li>
                <li><strong>Saúde Vocal:</strong> O aquecimento é indispensável e obrigatório para a prática saudável do canto.</li>
                <li><strong>Preservação da Concentração:</strong> Saídas para água ou banheiro, bem como a acomodação de quem chega, devem ocorrer apenas em momentos de silêncio para não atrapalhar o grupo.</li>
              </ol>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-black mb-3">3. Presença e Conduta (Inegociáveis)</h3>
              <ol className="list-decimal list-inside space-y-2 ml-2 text-black/80 text-lg leading-relaxed">
                <li><strong>Pontualidade:</strong> O compromisso com o horário é fundamental para o fluxo do trabalho coletivo. Chegar com mais de <strong>30 minutos</strong> de atraso configura falta.</li>
                <li><strong>Faltas:</strong> O limite é de <strong>6 faltas</strong> por temporada. Exceder esse número acarreta o desligamento do corista.</li>
                <li><strong>Hiatos e Desligamentos:</strong> Viagens ou interrupções devem ser comunicadas à direção com antecedência. Retornos após desligamentos ficam a critério da direção, podendo exigir novo processo seletivo.</li>
                <li><strong>Comunicação Direta:</strong> Qualquer desconforto com condutas ou decisões da direção ou qualquer outro incômodo em relação ao Colorau deve ser exposto diretamente aos responsáveis após o ensaio, evitando rumores ou conjecturas. Estamos sempre muito dispostos a conversar e resolver todo tipo de questão.</li>
              </ol>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
