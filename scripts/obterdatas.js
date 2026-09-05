// scripts/obterdatas.js
 
// 1. Ano atual - id="anoatual"
const anoAtual = new Date().getFullYear();
document.getElementById("anoatual").textContent = anoAtual;
 
// 2. Última modificação - id="ultimaModificacao"
const ultimaModificacao = document.lastModified;
document.getElementById("ultimaModificacao").textContent = `Última Modificação: ${ultimaModificacao}`;