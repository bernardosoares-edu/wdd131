
const anoAtual = new Date().getFullYear();
document.getElementById("anoatual").textContent = anoAtual;
 
const ultimaModificacao = document.lastModified;
document.getElementById("ultimaModificacao").textContent = `Última Modificação: ${ultimaModificacao}`;