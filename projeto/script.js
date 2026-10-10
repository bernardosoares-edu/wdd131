const comidas = [
  { id: 1, nome: "Baião de Dois", tipo: "sertao", origem: "Sertão", desc: "Arroz, feijão de corda, queijo coalho e carne de sol.", imagem: "baiao-de-dois.jpg" },
  { id: 2, nome: "Carne de Sol com Macaxeira", tipo: "sertao", origem: "Sertão", desc: "Clássico sertanejo resistente como o povo.", imagem: "carne-sol-macaxeira.jpg" },
  { id: 3, nome: "Acarajé", tipo: "litoral", origem: "Litoral", desc: "Bolinho de feijão fradinho frito no dendê com vatapá.", imagem: "acaraje.jpg" },
  { id: 4, nome: "Moqueca Baiana", tipo: "litoral", origem: "Litoral", desc: "Peixe, leite de coco, dendê e coentro.", imagem: "moqueca-baiana.jpg" },
  { id: 5, nome: "Tapioca Recheada", tipo: "sertao", origem: "Ambos", desc: "Herança indígena que atravessou sertão e mar.", imagem: "tapioca-recheada.jpg" }
];

function iniciarMenu(){
  const btn = document.querySelector("#menu-btn");
  const lista = document.querySelector("#nav-lista");
  if(!btn || !lista) return;
  btn.addEventListener("click", () => lista.classList.toggle("aberto"));
}

function corrigirMenuAtivo(){
  const paginaAtual = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("#nav-lista a").forEach(link => {
    link.classList.remove("ativo");
    if(link.getAttribute("href") === paginaAtual) link.classList.add("ativo");
  });
}

function configurarSecionadores(){
  const grupos = document.querySelectorAll(".secionador");
  grupos.forEach(grupo => {
    const botoes = grupo.querySelectorAll("button[data-filtro]");
    const cards = document.querySelectorAll(".grid .card[data-tipo]");
    botoes.forEach(btn => {
      btn.addEventListener("click", () => {
        botoes.forEach(b => b.classList.remove("ativo"));
        btn.classList.add("ativo");
        const filtro = btn.dataset.filtro;
        cards.forEach(card => {
          card.style.display = (filtro === "todos" || card.dataset.tipo === filtro) ? "" : "none";
        });
        if(typeof filtrarComidas === "function" && document.querySelector("#lista-comidas")){
          filtrarComidas(filtro);
        }
      });
    });
  });
}

function renderizarComidas(filtro = "todos"){
  const container = document.querySelector("#lista-comidas");
  if(!container) return;
  const filtradas = filtro === "todos" ? comidas : comidas.filter(c => c.tipo === filtro || c.origem === "Ambos");
  container.innerHTML = filtradas.map(comida => {
    const favs = obterFavoritos();
    const ehFav = favs.includes(comida.id);
    return `
      <article class="card" data-tipo="${comida.tipo}">
        <img src="imagens/${comida.imagem}" alt="${comida.nome}" loading="lazy" width="600" height="400">
        <div class="conteudo">
          <h3>${comida.nome}</h3>
          <p><strong>Origem:</strong> ${comida.origem}</p>
          <p>${comida.desc}</p>
          <button class="btn" onclick="favoritarComida(${comida.id})">${ehFav ? '★ Favoritado' : '☆ Favoritar'}</button>
        </div>
      </article>`;
  }).join("");
}

function filtrarComidas(tipo){
  renderizarComidas(tipo);
  localStorage.setItem("filtroComida", tipo);
}

function obterFavoritos(){ return JSON.parse(localStorage.getItem("favoritosSertaoMar") || "[]"); }
function favoritarComida(id){
  let favs = obterFavoritos();
  favs = favs.includes(id) ? favs.filter(f => f !== id) : [...favs, id];
  localStorage.setItem("favoritosSertaoMar", JSON.stringify(favs));
  renderizarComidas(localStorage.getItem("filtroComida") || "todos");
  mostrarFavoritos();
}
function mostrarFavoritos(){
  const el = document.querySelector("#favoritos-lista");
  if(!el) return;
  const favs = obterFavoritos();
  if(favs.length === 0){ el.innerHTML = `<p>Nenhuma comida favoritada ainda.</p>`; return; }
  el.innerHTML = comidas.filter(c => favs.includes(c.id)).map(c => `<li>${c.nome} - ${c.origem}</li>`).join("");
  const cont = document.querySelector("#contador-fav");
  if(cont) cont.textContent = `Você tem ${favs.length} favorito(s) salvos.`;
}

function configurarFormularioCultura(){
  const form = document.querySelector("#form-contato");
  if(!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nome = form.querySelector("#nome").value.trim();
    const email = form.querySelector("#email").value.trim();
    const origem = document.querySelector("#origem")?.value;
    if(!nome || !email) return alert("Preencha nome e e-mail.");
    const lista = JSON.parse(localStorage.getItem("inscritosSertaoMar") || "[]");
    lista.push({ nome, email, origem, data: new Date().toLocaleDateString("pt-BR") });
    localStorage.setItem("inscritosSertaoMar", JSON.stringify(lista));
    document.querySelector("#form-msg").innerHTML = `<p>Obrigado, <strong>${nome}</strong>!</p>`;
    form.reset(); atualizarContadorInscritos();
  });
}

function configurarFormularioGastronomia(){
  const form = document.querySelector("#form-avaliacao");
  if(!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const dados = { nome: form.querySelector("#nome").value, prato: form.querySelector("#prato-select").value, nota: form.querySelector("#nota").value, comentario: form.querySelector("#comentario").value, data: new Date().toISOString() };
    let lista = JSON.parse(localStorage.getItem("avaliacoes") || "[]");
    lista.push(dados);
    localStorage.setItem("avaliacoes", JSON.stringify(lista));
    document.querySelector("#msg-form").textContent = `Obrigado ${dados.nome}! Avaliação salva. Total: ${lista.length}`;
    form.reset();
  });
}

function atualizarContadorInscritos(){
  const el = document.querySelector("#contador-inscritos");
  if(!el) return;
  el.textContent = `${JSON.parse(localStorage.getItem("inscritosSertaoMar") || "[]").length} pessoa(s) inscrita(s)`;
}

// FUNÇÃO CORRIGIDA - NÃO CONTA A CADA PÁGINA
function configurarFooter(){
  const anoEl = document.getElementById("anoatual");
  if(anoEl) anoEl.textContent = new Date().getFullYear();
  const modEl = document.getElementById("ultimaModificacao");
  if(modEl) modEl.textContent = `Última modificação: ${document.lastModified}`;

  const jaContouNestaSessao = sessionStorage.getItem("sessaoContada");
  let v = Number(localStorage.getItem("visitasSertaoMar")) || 0;
  if(!jaContouNestaSessao){
    v++;
    localStorage.setItem("visitasSertaoMar", v);
    sessionStorage.setItem("sessaoContada", "true");
  }
  const vEl = document.getElementById("visitas");
  if(vEl) vEl.textContent = `Visitas: ${v}`;
}

document.addEventListener("DOMContentLoaded", () => {
  iniciarMenu();
  corrigirMenuAtivo();
  configurarSecionadores();
  renderizarComidas(localStorage.getItem("filtroComida") || "todos");
  mostrarFavoritos();
  configurarFormularioCultura();
  configurarFormularioGastronomia();
  atualizarContadorInscritos();
  configurarFooter();
});