
document.getElementById("anoatual").textContent = new Date().getFullYear();
document.getElementById("ultimaModificacao").textContent = `Last Modification: ${document.lastModified}`;
 
const temperatura = -10;
const velocidadeVento = 12;
 
function calcularSensacaoTermica(temp, vento) {
  return (13.12 + 0.6215 * temp - 11.37 * Math.pow(vento, 0.16) + 0.3965 * temp * Math.pow(vento, 0.16)).toFixed(1);
}
 
let sensacaoTermica = "N/A";
 
if (temperatura <= 10 && velocidadeVento > 4.8) {
  sensacaoTermica = calcularSensacaoTermica(temperatura, velocidadeVento) + " °C";
} else {
  sensacaoTermica = "N/A";
}
 
document.getElementById("sensacao").textContent = sensacaoTermica;