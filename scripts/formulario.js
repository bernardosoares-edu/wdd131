const produtos = [
  { id: "fc-1888", nome: "capacitor de fluxo", classificacaomedia: 4.5 },
  { id: "fc-2050", nome: "fios elétricos", classificacaomedia: 4.7 },
  { id: "fs-1987", nome: "circuitos de tempo", classificacaomedia: 3.5 },
  { id: "ac-2000", nome: "reator de baixa tensão", classificacaomedia: 3.9 },
  { id: "jj-1969", nome: "equalizador de distorção", classificacaomedia: 5.0 }
];
 
document.addEventListener("DOMContentLoaded", () => {
  const selectProduto = document.querySelector("#produto");
  if (selectProduto) {
    produtos.forEach(produto => {
      const option = document.createElement("option");
      option.value = produto.id;
      option.textContent = produto.nome.charAt(0).toUpperCase() + produto.nome.slice(1);
      selectProduto.appendChild(option);
    });
  }
 
  const ano = document.getElementById("anoatual");
  const mod = document.getElementById("ultimaModificacao");
 
  if (ano) ano.textContent = new Date().getFullYear();
  if (mod) mod.textContent = `Última modificação: ${document.lastModified}`;

  const contadorSpan = document.getElementById("contador");
  if (contadorSpan) {
    let numAvaliacoes = Number(localStorage.getItem("avaliacoes")) || 0;
    
    numAvaliacoes++;
    
    localStorage.setItem("avaliacoes", numAvaliacoes);
    
    contadorSpan.textContent = numAvaliacoes;
  }
});