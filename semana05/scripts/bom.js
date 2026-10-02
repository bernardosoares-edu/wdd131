const input = document.querySelector('#capfav');
const botao = document.querySelector('button');
const lista = document.querySelector('#list');
 
let arrayCapitulos = obterListaDeCapitulos() || [];
 
function obterListaDeCapitulos() {
    return JSON.parse(localStorage.getItem('minhaListaFavoritosLDM'));
}
 
function definirListaDeCapitulos() {
    localStorage.setItem('minhaListaFavoritosLDM', JSON.stringify(arrayCapitulos));
}
 
// Requisito 4
arrayCapitulos.forEach(capitulo => {
    exibirLista(capitulo);
});
 
// Requisito 6 e 7
function exibirLista(item) {
    const li = document.createElement('li');
    const botaoExcluir = document.createElement('button');
 
    li.textContent = item;
    botaoExcluir.textContent = '❌';
    botaoExcluir.setAttribute('aria-label', `Remover ${item}`);
    li.append(botaoExcluir);
    lista.append(li);
 
    botaoExcluir.addEventListener('click', function () {
        lista.removeChild(li);
        excluirCapitulo(li.textContent);
        input.focus();
    });
}
 
function excluirCapitulo(capitulo) {
    capitulo = capitulo.slice(0, capitulo.length - 1); // tira o ❌
    arrayCapitulos = arrayCapitulos.filter((item) => item !== capitulo);
    definirListaDeCapitulos();
}

botao.addEventListener('click', () => {
    if (input.value != '') {  // certifique-se de que a entrada não esteja vazia
        exibirLista(input.value); // chama a função que gera o capítulo enviado
        arrayCapitulos.push(input.value);  // adicione o capítulo ao array
        definirListaDeCapitulos(); // atualize o localStorage com o novo array
        
        input.value = ''; // limpe a entrada
        input.focus(); // defina o foco de volta para a entrada    
        
    }
});


