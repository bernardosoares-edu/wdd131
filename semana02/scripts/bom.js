const input = document.querySelector('#capfav');
const botao = document.querySelector('button');
const lista = document.querySelector('#list');

botao.addEventListener('click', function() {
    if (input.value.trim() !== '') {
        const li = document.createElement('li');
        const botaoExcluir = document.createElement('button');

        li.textContent = input.value;
        botaoExcluir.textContent = '❌';
        botaoExcluir.setAttribute('aria-label', 'Close');
        li.append(botaoExcluir);
        lista.append(li);
        input,value = ''; // limpa o "Alma 5"que fica na caixa
        input.focus();
        botaoExcluir.addEventListener('click', function() {
            lista.removeChild(li);
            input.focus();
        });
    }            // Código a ser executado quando o botão for clicado
});



