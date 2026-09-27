
const menuBtn = document.querySelector('#menu');
const nav = document.querySelector('nav');
if(menuBtn){
  menuBtn.addEventListener('click', () => {
    nav.classList.toggle('open');
    menuBtn.textContent = nav.classList.contains('open') ? 'X' : '☰';
  });
}

const templos = [
  {
    nomeDoTemplo: "Aba Nigeria",
    localizacao: "Aba, Nigéria",
    consagracao: "2005, 7 de agosto",
    area: 11500,
    urlDaImagem:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    nomeDoTemplo: "Manti Utah",
    localizacao: "Manti, Utah, Estados Unidos",
    consagracao: "1888, 21 de maio",
    area: 74792,
    urlDaImagem:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    nomeDoTemplo: "Payson Utah",
    localizacao: "Payson, Utah, Estados Unidos",
    consagracao: "2015, 7 de junho",
    area: 96630,
    urlDaImagem:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    nomeDoTemplo: "Yigo Guam",
    localizacao: "Yigo, Guam",
    consagracao: "2020, 2 de maio",
    area: 6861,
    urlDaImagem:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    nomeDoTemplo: "Washington D.C.",
    localizacao: "Kensington, Maryland, Estados Unidos",
    consagracao: "1974, 19 de novembro",
    area: 156558,
    urlDaImagem:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    nomeDoTemplo: "Lima Peru",
    localizacao: "Lima, Peru",
    consagracao: "1986, 10 de janeiro",
    area: 9600,
    urlDaImagem:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    nomeDoTemplo: "Cidade do México, México",
    localizacao: "Cidade do México, México",
    consagracao: "1983, 2 de dezembro",
    area: 116642,
    urlDaImagem:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  // AQUI ESTÃO OS 3 EXTRAS
   {
    nomeDoTemplo: "Curitiba Brasil",
    localizacao: "Curitiba, Brasil",
    consagracao: "2008, 1 de junho",
    area: 27850,
    urlDaImagem: "imagens/templo-de-curitiba.jpg"
  },
  {
    nomeDoTemplo: "São Paulo Brasil",
    localizacao: "São Paulo, Brasil",
    consagracao: "1978, 30 de outubro",
    area: 59246,
    urlDaImagem: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/sao-paulo-brazil/400x250/sao-paulo-brazil-temple-lds-187030-wallpaper.jpg"
  },
  {
    nomeDoTemplo: "Rio de Janeiro Brasil",
    localizacao: "Rio de Janeiro, Brasil",
    consagracao: "2022, 8 de maio",
    area: 29966,
    urlDaImagem: "imagens/templo-rio-de-janeiro.jpg"
  },
];
 
//Loop e criação dos cartões
const container = document.querySelector('.container');
 
function criarCartoes(lista) {
  container.innerHTML = ""; // limpa
  lista.forEach(templo => {
    const card = document.createElement('section');
    card.classList.add('temple-card');
    card.innerHTML = `
      <h2>${templo.nomeDoTemplo}</h2>
      <p><strong>Localização:</strong> ${templo.localizacao}</p>
      <p><strong>Consagração:</strong> ${templo.consagracao}</p>
      <p><strong>Área:</strong> ${templo.area} sq ft</p>
      <img src="${templo.urlDaImagem}" alt="${templo.nomeDoTemplo}" loading="lazy">
    `;
    container.appendChild(card);
  });
}
 

criarCartoes(templos);
 
// Filtros do menu
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const filtro = e.target.textContent.toLowerCase();
    if(filtro.includes('inicial')) criarCartoes(templos);
    if(filtro.includes('antigo')) criarCartoes(templos.filter(t => parseInt(t.consagracao) < 1900));
    if(filtro.includes('novo')) criarCartoes(templos.filter(t => parseInt(t.consagracao) > 2000));
    if(filtro.includes('grande')) criarCartoes(templos.filter(t => t.area > 90000));
    if(filtro.includes('pequeno')) criarCartoes(templos.filter(t => t.area < 10000));
  });
}); 

document.querySelector('#anoatual').textContent = new Date().getFullYear();
document.querySelector('#ultimaModificacao').textContent = `Última modificação: ${document.lastModified}`;

