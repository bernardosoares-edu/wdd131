
const menuBtn = document.querySelector('#menu');
const nav = document.querySelector('nav');
if(menuBtn){
  menuBtn.addEventListener('click', () => {
    nav.classList.toggle('open');
    menuBtn.textContent = nav.classList.contains('open') ? 'X' : '☰';
  });
}
 
document.querySelector('#anoatual').textContent = new Date().getFullYear();
document.querySelector('#ultimaModificacao').textContent = `Última modificação: ${document.lastModified}`;