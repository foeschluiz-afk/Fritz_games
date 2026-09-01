const modos = {
  natureza: [
    { palavra: "floresta", dica: "Um vasto conjunto de árvores e vida selvagem" },
    { palavra: "rio", dica: "Curso de água que molda paisagens" },
    { palavra: "deserto", dica: "Lugar árido onde a sobrevivência é difícil" },
    { palavra: "montanha", dica: "Gigante de pedra que toca o céu" }
  ],
  tecnologia: [
    { palavra: "algoritmo", dica: "Sequência lógica que resolve problemas" },
    { palavra: "processador", dica: "Cérebro que executa instruções digitais" },
    { palavra: "rede", dica: "Estrutura invisível que conecta máquinas" },
    { palavra: "robô", dica: "Máquina que imita ações humanas" }
  ],
  animais: [
    { palavra: "elefante", dica: "Gigante da savana com memória notável" },
    { palavra: "águia", dica: "Ave que enxerga longe e voa alto" },
    { palavra: "tigre", dica: "Predador listrado que reina nas florestas" },
    { palavra: "golfinho", dica: "Mamífero marinho conhecido por sua inteligência" }
  ],
  mitologia: [
    { palavra: "zeus", dica: "Figura que lança raios e governa o Olimpo" },
    { palavra: "valhala", dica: "Salão dos guerreiros honrados após a morte" },
    { palavra: "medusa", dica: "Criatura cujo olhar transforma em pedra" },
    { palavra: "thor", dica: "Deus que empunha um martelo poderoso" }
  ]
};

let palavraSecreta, palavraExibida, letrasErradas, tentativas, listaAtual;

const desenhos = [
` 
 +---+
 |   |
     |
     |
     |
     |
=======`,
` 
 +---+
 |   |
 O   |
     |
     |
     |
=======`,
` 
 +---+
 |   |
 O   |
 |   |
     |
     |
=======`,
` 
 +---+
 |   |
 O   |
/|   |
     |
     |
=======`,
` 
 +---+
 |   |
 O   |
/|\\  |
     |
     |
=======`,
` 
 +---+
 |   |
 O   |
/|\\  |
/    |
     |
=======`,
` 
 +---+
 |   |
 O   |
/|\\  |
/ \\  |
     |
=======`
];

function iniciarJogo() {
  const sorteio = listaAtual[Math.floor(Math.random() * listaAtual.length)];
  palavraSecreta = sorteio.palavra;
  palavraExibida = Array(palavraSecreta.length).fill("_");
  letrasErradas = [];
  tentativas = 6;

  atualizarPalavra();
  document.getElementById("dica").textContent = "💡 Dica: " + sorteio.dica;
  document.getElementById("letrasErradas").textContent = "";
  document.getElementById("forca").textContent = desenhos[0];
  document.getElementById("mensagem").textContent = "";
  document.getElementById("mensagem").style.color = "";
  document.getElementById("letraInput").focus();
}

function atualizarPalavra() {
  const palavraDiv = document.getElementById("palavra");
  palavraDiv.innerHTML = "";
  palavraExibida.forEach(letra => {
    const span = document.createElement("span");
    span.textContent = letra;
    palavraDiv.appendChild(span);
  });
}

function jogar() {
  const letra = document.getElementById("letraInput").value.toLowerCase();
  document.getElementById("letraInput").value = "";

  if (!letra || letra.length !== 1) {
    alert("Digite apenas uma letra!");
    return;
  }

  if (palavraExibida.includes(letra) || letrasErradas.includes(letra)) {
    alert("Você já tentou essa letra!");
    return;
  }

  if (palavraSecreta.includes(letra)) {
    for (let i = 0; i < palavraSecreta.length; i++) {
      if (palavraSecreta[i] === letra) {
        palavraExibida[i] = letra;
      }
    }
  } else {
    letrasErradas.push(letra);
    tentativas--;
  }

  atualizarPalavra();
  document.getElementById("letrasErradas").textContent = "Letras erradas: " + letrasErradas.join(", ");
  document.getElementById("forca").textContent = desenhos[6 - tentativas];

  if (!palavraExibida.includes("_")) {
    document.getElementById("mensagem").textContent = "🎉 Você venceu!";
    document.getElementById("mensagem").style.color = "limegreen";
  } else if (tentativas === 0) {
    document.getElementById("mensagem").textContent = "💀 Você perdeu! A palavra era: " + palavraSecreta;
    document.getElementById("mensagem").style.color = "red";
  }
}

function reiniciar() {
  iniciarJogo();
}

function alterarModo() {
  const modoSelecionado = document.getElementById("modo").value;
  listaAtual = modos[modoSelecionado];

  // muda estilo do container
  const container = document.getElementById("container");
  container.className = modoSelecionado;

  iniciarJogo();
}

// Inicializa com Natureza
window.onload = () => {
  listaAtual = modos["natureza"];
  document.getElementById("container").className = "natureza";
  iniciarJogo();
};

//