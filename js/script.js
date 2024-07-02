document.body.addEventListener('click', (evento) => {
    if (evento.target.id !== 'botao-verificar' && evento.target.id !== 'botao-voltar' && evento.target.id !== 'resultados' && evento.target.id !== 'novo-conteudo') {
        const conteudoInicial = document.getElementById('conteudo-inicial');
        const novoConteudo = document.getElementById('novo-conteudo');

        conteudoInicial.classList.add('fade');
        setTimeout(() => {
            conteudoInicial.style.display = 'none';
            novoConteudo.style.display = 'block';
            setTimeout(() => {
                novoConteudo.style.opacity = '1';
            }, 10);
        }, 1000);
    }
});

document.getElementById('botao-verificar').addEventListener('click', () => {
    const caixasMarcadas = document.querySelectorAll('.container-checkbox input[type="checkbox"]:checked');
    const sintomasSelecionados = Array.from(caixasMarcadas).map(caixa => caixa.value);
    const novoConteudo = document.getElementById('novo-conteudo');
    const resultados = document.getElementById('resultados');

    const doencas = {
        "Leptospirose": ["Dor nas articulações", "Dor muscular", "Dor de cabeça", "Febre alta", "Desidratação"],
        "Tétano": ["Dor muscular", "Espasmos musculares", "Rigidez dos músculos do pescoço", "Dificuldade e dor para abrir a boca", "Cãibra na mandíbula"],
        "Diarreia aguda": ["Diarréia", "Desidratação", "Febre alta", "Vômito", "Náuseas"],
        "Hepatite A": ["Dor abdominal", "Amarelamento dos olhos e da pele", "Perda de apetite", "Febre inferior a 38ºC", "Urina escura"],
        "Dengue": ["Dor nas articulações", "Dor de cabeça", "Dor muscular intensa", "Dor na parte de trás dos olhos", "Erupções cutâneas"]
    };

    const possiveisDoencas = Object.keys(doencas).map(doenca => {
        const sintomasCorrespondentes = doencas[doenca].filter(sintoma => sintomasSelecionados.includes(sintoma));
        return {
            nome: doenca,
            contagem: sintomasCorrespondentes.length
        };
    }).filter(doenca => doenca.contagem > 0);

    novoConteudo.style.display = 'none';

    if (possiveisDoencas.length > 0) {
        resultados.innerHTML = `<h2>Possíveis doenças:</h2><ul>${possiveisDoencas.map(doenca => {
            const sintomaOuSintomas = doenca.contagem > 1 ? 'sintomas' : 'sintoma';
            return `<li>${doenca.nome}: ${doenca.contagem} ${sintomaOuSintomas}</li>`;
        }).join('')}</ul><button id="botao-voltar">Voltar</button>`;
    } else {
        resultados.innerHTML = `<h2>Nenhuma doença correspondente encontrada.</h2><button id="botao-voltar">Voltar</button>`;
    }

    resultados.style.display = 'block';
});

document.getElementById('resultados').addEventListener('click', (evento) => {
    if (evento.target.id === 'botao-voltar') {
        const novoConteudo = document.getElementById('novo-conteudo');
        const resultados = document.getElementById('resultados');

        resultados.style.display = 'none';
        novoConteudo.style.display = 'block';
    }
});
