// ======================
// PERGUNTAS
// ======================

const perguntas = [
    {
        pergunta: "Quem é a mãe do Eric?",
        respostas: ["Regina", "Kelvin", "Enael", "Jorlan"],
        correta: 2
    },
    {
        pergunta: "Quem foi o ultimo a ser adicionado?",
        respostas: ["João", "H7", "Luizin", "Thulio"],
        correta: 1
    },
    {
        pergunta: "Em que ano o grupo foi criado?",
        respostas: ["31/12/2020", "01/01/2021", "06/07/2022", "16/03/2023"],
        correta: 3
    },
    {
        pergunta: "Qual jogo marcou o grupo?",
        respostas: ["Minecraft", "Red Dead Redemption", "GTA", "Roblox"],
        correta: 0
    },
    {
        pergunta: "Qual lugar mais frequentado pelo grupo?",
        respostas: ["Discord", "Parque", "Sandro", "Casa do Matheus"],
        correta: 2
    },
    {
        pergunta: "De quem era o tadalafila?",
        respostas: ["João", "Eric", "Fabriciano", "Matheus"],
        correta: 1
    },
    {
        pergunta: "Oque o clube do zap fez no dia 29 de julho?",
        respostas: ["Assistiu um filme", "Suruba", "Foi no sandro", "Jogou truco"],
        correta: 0
    }
];

// ======================
// ELEMENTOS
// ======================

const home = document.getElementById("home");
const quiz = document.getElementById("quiz");

const start = document.getElementById("start");
const next = document.getElementById("next");

const question = document.getElementById("question");
const answers = document.getElementById("answers");

const counter = document.getElementById("counter");
const timerElement = document.getElementById("timer");

const progress = document.querySelector(".progress-fill");

// ======================
// VARIÁVEIS
// ======================

let atual = 0;
let pontos = 0;
let respondeu = false;

let tempo = 15;
let intervalo;

// ======================
// COMEÇAR
// ======================

start.addEventListener("click", () => {

    home.classList.add("hidden");
    quiz.classList.remove("hidden");

    carregarPergunta();

});

// ======================
// CARREGAR PERGUNTA
// ======================

function carregarPergunta() {

    respondeu = false;

    clearInterval(intervalo);

    tempo = 15;

    timerElement.textContent = tempo + "s";

    counter.textContent = `Questão ${atual + 1}/${perguntas.length}`;

    progress.style.width = ((atual + 1) / perguntas.length) * 100 + "%";

    question.textContent = perguntas[atual].pergunta;

    answers.innerHTML = "";

    perguntas[atual].respostas.forEach((texto, index) => {

        const alternativa = document.createElement("div");

        alternativa.className = "answer";

        alternativa.textContent = texto;

        alternativa.onclick = () => selecionarResposta(index);

        answers.appendChild(alternativa);

    });

    iniciarTimer();

}

// ======================
// TIMER
// ======================

function iniciarTimer() {

    intervalo = setInterval(() => {

        tempo--;

        timerElement.textContent = tempo + "s";

        if (tempo <= 0) {

            clearInterval(intervalo);

            revelarResposta(-1);

        }

    }, 1000);

}

// ======================
// ESCOLHER
// ======================

function selecionarResposta(indice) {

    if (respondeu) return;

    revelarResposta(indice);

}

// ======================
// MOSTRAR RESULTADO
// ======================

function revelarResposta(escolha) {

    respondeu = true;

    clearInterval(intervalo);

    const alternativas = document.querySelectorAll(".answer");

    alternativas.forEach((item, index) => {

        item.style.pointerEvents = "none";

        if (index === perguntas[atual].correta) {

            item.classList.add("correct");

        }

    });

    if (escolha !== -1) {

        if (escolha === perguntas[atual].correta) {

            pontos++;

        } else {

            alternativas[escolha].classList.add("wrong");

        }

    }

}

// ======================
// PRÓXIMA
// ======================

next.addEventListener("click", () => {

    if (!respondeu) {

        alert("Escolha uma resposta.");

        return;

    }

    atual++;

    if (atual >= perguntas.length) {

        finalizar();

        return;

    }

    carregarPergunta();

});

// ======================
// FINAL
// ======================

function finalizar() {

    clearInterval(intervalo);

    let titulo;

    if (pontos === perguntas.length) {

        titulo = "ZAPPER SUPREMO 👑  ";

    } else if (pontos >= 4) {

        titulo = "CRIA DO ZAP 🔥 ";

    } else if (pontos >= 3) {

        titulo = "MEMBRO OFICIAL 😎 ";

    } else if (pontos >= 2) {

        titulo = "PARTICIPANTE 🙂 ";

    } else {

        titulo = "HORRÍVEL 😝 ";

    }

    quiz.innerHTML = `

        <h1>Fim de jogo</h1>

        <h2 style="margin:20px 0;">${titulo}</h2>

        <p style="margin-bottom:30px;">
            Você acertou <strong>${pontos}</strong> de
            <strong>${perguntas.length}</strong> perguntas.
        </p>

        <button onclick="location.reload()">
            Jogar novamente
        </button>

    `;

}
