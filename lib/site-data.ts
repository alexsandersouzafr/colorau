export const navItems = [
  { href: "/", label: "Home" },
  { href: "/sobre", label: "O Colorau" },
  { href: "/galeria", label: "Galeria" },
  { href: "/corista", label: "Área do Corista" },
  { href: "/contato", label: "Contato" },
];

const placeholderBio = ""
export const teamMembers = [
  {
    name: "Alexsander Souza",
    role: "Direção Musical",
    imageUrl: "/pessoas/alexsander.png",
    bio: placeholderBio,
  },
  {
    name: "Laura de Assis",
    role: "Preparação vocal",
    imageUrl: "/pessoas/laura.jpeg",
    bio: placeholderBio,
  },
  {
    name: "Ighor Bastos",
    role: "Pianista",
    imageUrl: "/pessoas/ighor.png",
    bio: placeholderBio,
  },
  {
    name: "Rafael Duarte",
    role: "Design e Produção executiva",
    imageUrl: "/pessoas/rafael.jpeg",
    bio: placeholderBio,
  },
  {
    name: "Rafaela Bueno",
    role: "Jurídico e Produção executiva",
    imageUrl: "/pessoas/rafaela.jpeg",
    bio: placeholderBio,
  },
  {
    name: "Iná Duarte",
    role: "Produção cultural",
    imageUrl: "/pessoas/ina.png",
    bio: placeholderBio,
  },
  {
    name: "Natalia Tavares",
    role: "Produção cultural",
    imageUrl: "/pessoas/natalia.jpeg",
    bio: placeholderBio,
  },
];

export const achievements = [
  {
    year: "2020",
    items: ["Hildegarda - coro virtual (streaming e YouTube)"],
  },
  {
    year: "2022",
    items: [
      "Festival Internacional de Corais - Praca da Liberdade (BH)",
      "Festival Internacional de Corais - Galeria Bichinho (Bichinho/MG)",
      "Concerto em evento - Museu de Ciências Naturais da PUC (BH)",
    ],
  },
  {
    year: "2023",
    items: [
      "Sarau Colorau I & II - Casa Híbrido (BH)",
      "Encontro de Coros do Retiro do Chalé (Brumadinho/MG)",
    ],
  },
  {
    year: "2024",
    items: [
      "1ª Feira de Artesanato Mãos Mágicas - Bichinho/MG",
      "Espetáculo A Saia - Escola de Arquitetura da UFMG",
      "Exposição Etéreos e Eternos - Asa de Papel (BH)",
      "Sarau Colorau III & IV - Sala Juvenal Dias, Palacio das Artes",
    ],
  },
  {
    year: "2025",
    items: [
      "Espetáculo A Saia - Sala Juvenal Dias, Palácio das Artes",
      "Coral UNIMED-BH Convida - Academia Mineira de Letras",
      "Espetáculo Cosmogonia - Sala Juvenal Dias, Palácio das Artes",
    ],
  },
];

export const repertoire: Array<{
  title: string;
  artist: string;
  audioUrl?: string;
  scoreUrl?: string;
  referenceUrl?: string;
}> = [
  {
    title: "Chiquilín de Bachín",
    artist: "Astor Piazzolla (arr. Liliane Cangiano)",
    audioUrl: "https://drive.google.com/drive/u/1/folders/12bQr_UCshi9MDaFCAbl_Np5t64uAzzy4",
    scoreUrl: "/scores/chiquilin.pdf",
    referenceUrl: "https://youtu.be/R8U138BwJrY?si=KxV2CYt3HgVm6dhS",
  },
  {
    title: "Águas de Março",
    artist: "Tom Jobim (arr. Martínez Dávila)",
    audioUrl: "https://drive.google.com/drive/u/1/folders/1xzoEccjJtHEGnzZMO-u_7wTav80QIMyB",
    scoreUrl: "/scores/aguas-de-marco.pdf",
    referenceUrl: "https://youtu.be/vRe1AGRyk94?si=0z7joP3Jz2F9XvS5",
  },
  {
    title: "Suíte dos Pescadores",
    artist: "Dorival Caymmi (arr. Damiano Cozzella)",
    audioUrl: "https://drive.google.com/drive/u/1/folders/157c7qqoAOfQiSS2Ayr87NqkEh8N00pWr",
    scoreUrl: "/scores/suite-dos-pescadores.pdf",
    referenceUrl: "https://youtu.be/bsS5wRDA3hE?si=KKWTWlbsfviGK931",
  },
  {
    title: "Baião de Quatro Toques",
    artist: "Luiz Tatit, José Miguel Wisnik (arr. Manuel Figueiredo de Abreu)",
    audioUrl: "https://drive.google.com/drive/u/1/folders/1wtzXygIKaYhqfufMXyZo8LZDhn5qIdCs",
    scoreUrl: "/scores/baiao.pdf",
    referenceUrl: "https://youtu.be/uDeem9Qjmhk?si=GyFqZhxAhLp2HgTK",
  },
  {
    title: "Lua, Lua, Lua",
    artist: "Caetano Veloso (arr. Marcos Leite)",
    audioUrl: "https://drive.google.com/drive/u/1/folders/1Sn3zLZcXUBvZ97mAp5sq5ZQoqI0vQRgJ",
    scoreUrl: "/scores/lua-lua-lua.pdf",
    referenceUrl: "https://youtu.be/NxpWF-jZUR4?si=Gnry3na1wv0u9hT7",
  },
  {
    title: "Suíte Nordestina: Morena Bonita",
    artist: "Ronaldo Miranda",
    scoreUrl: "/scores/suite-nordestina.pdf",
    referenceUrl: "https://youtu.be/9wPhqxuZstU?si=o8InKEpa7k6pcFSA",
  },
  {
    title: "Suíte Nordestina: Dendê Trapiá",
    artist: "Ronaldo Miranda",
    scoreUrl: "/scores/suite-nordestina.pdf",
    referenceUrl: "https://youtu.be/xKUWvKZIstA?si=zTBHh_DqgtT6fVhh",
  },
  {
    title: "Suíte Nordestina: Bumba Chora",
    artist: "Ronaldo Miranda",
    audioUrl: "https://drive.google.com/drive/u/1/folders/12OZ42HSfrUV3xsD_NwWy-kewF3Vrt3-a",
    scoreUrl: "/scores/suite-nordestina.pdf",
    referenceUrl: "https://youtu.be/uktsBR4-3EA?si=pdyNQWWeUT-CrTVe",
  },
  {
    title: "Suíte Nordestina: Eu vou, Eu Vou",
    artist: "Ronaldo Miranda",
    scoreUrl: "/scores/suite-nordestina.pdf",
    referenceUrl: "https://youtu.be/fDy7b955maU?si=0NM-lYblOmkyP3Ng",
  },
  {
    title: "Bom Dia",
    artist: "Nana Caymmi, Gilberto Gil (arr. Pedro Veneziani)",
    scoreUrl: "/scores/bom-dia.pdf",
    referenceUrl: "https://youtu.be/zcNzaS8Vb4E?si=MwFJgGvKlQE2hDQM",
  },
  {
    title: "Domingo no Parque",
    artist: "Gilberto Gil (arr. Lindembergue Cardoso)",
    scoreUrl: "/scores/domingo-no-parque.pdf",
    referenceUrl: "https://youtu.be/AyaAUah97wo?si=672lU6L2O27lx4kZ",
  },
];

export const coristaDocuments: Array<{
  title: string;
  url: string;
}> = [
  {
    title: "Discurso dos Sons (PDF)",
    url: "/docs/Discurso dos Sons.pdf",
  },
  {
    title: "The Structures and movement of breathing (PDF)",
    url: "/docs/The Structures and movement of breathing a primer for choirs and choruses.pdf",
  },
];

export const galleryPhotos = [
  "/Foto-113.jpg",
  "/Foto-13.jpg",
  "/Foto-19.jpg",
  "/Foto-22.jpg",
  "/Foto-52.jpg",
  "/Foto-6.jpg",
];
