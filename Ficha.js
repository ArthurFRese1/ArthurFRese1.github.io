/* ============================================================
   ALIEN RPG — CRIADOR DE FICHA
   Ficha.js
============================================================ */


/* ============================================================
   DADOS DAS HABILIDADES
============================================================ */

const habilidades = [

    {
        nome: "Maquinário Pesado",
        atributo: "Força"
    },

    {
        nome: "Resistência",
        atributo: "Força"
    },

    {
        nome: "Combate Corpo a Corpo",
        atributo: "Força"
    },

    {
        nome: "Mobilidade",
        atributo: "Agilidade"
    },

    {
        nome: "Combate à Distância",
        atributo: "Agilidade"
    },

    {
        nome: "Pilotagem",
        atributo: "Agilidade"
    },

    {
        nome: "Observação",
        atributo: "Perspicácia"
    },

    {
        nome: "Tecnologia",
        atributo: "Perspicácia"
    },

    {
        nome: "Sobrevivência",
        atributo: "Perspicácia"
    },

    {
        nome: "Comando",
        atributo: "Empatia"
    },

    {
        nome: "Manipulação",
        atributo: "Empatia"
    },

    {
        nome: "Ajuda Médica",
        atributo: "Empatia"
    }

];


/* ============================================================
   DADOS DAS CARREIRAS
============================================================ */

const carreiras = {

    "Fuzileiro Colonial": {

        atributo: "Força",

        habilidades: [
            "Combate Corpo a Corpo",
            "Resistência",
            "Combate à Distância"
        ],

        talentos: [
            "Galhofa",
            "Violência",
            "Além do Limite"
        ]

    },


    "Xerife Colonial": {

        atributo: "Perspicácia",

        habilidades: [
            "Observação",
            "Combate à Distância",
            "Manipulação"
        ],

        talentos: [
            "Autoridade",
            "Investigador",
            "Subjugar"
        ]

    },


    "Agente da Companhia": {

        atributo: "Perspicácia",

        habilidades: [
            "Comando",
            "Manipulação",
            "Observação"
        ],

        talentos: [
            "Assumir o Controle",
            "Astúcia",
            "Segurança Pessoal"
        ]

    },


    "Criança": {

        atributo: "Agilidade",

        habilidades: [
            "Mobilidade",
            "Sobrevivência",
            "Observação"
        ],

        talentos: [
            "Mal Notado",
            "Esquivar",
            "Ágil"
        ]

    },


    "Médico": {

        atributo: "Empatia",

        habilidades: [
            "Mobilidade",
            "Observação",
            "Ajuda Médica"
        ],

        talentos: [
            "Presença Calmante",
            "Compaixão",
            "Cirurgião de Campo"
        ]

    },


    "Oficial": {

        atributo: "Empatia",

        habilidades: [
            "Combate à Distância",
            "Comando",
            "Manipulação"
        ],

        talentos: [
            "Comandante de Campo",
            "Influência",
            "Abuso de Poder"
        ]

    },


    "Piloto": {

        atributo: "Agilidade",

        habilidades: [
            "Pilotagem",
            "Combate à Distância",
            "Tecnologia"
        ],

        talentos: [
            "Aceleração Total",
            "Mecânico da Nave",
            "Imprudente"
        ]

    },


    "Operário": {

        atributo: "Força",

        habilidades: [
            "Maquinário Pesado",
            "Resistência",
            "Combate Corpo a Corpo"
        ],

        talentos: [
            "Resiliente",
            "A Longa Jornada",
            "Determinação Verdadeira"
        ]

    },


    "Cientista": {

        atributo: "Perspicácia",

        habilidades: [
            "Observação",
            "Sobrevivência",
            "Tecnologia"
        ],

        talentos: [
            "Análise",
            "Revelação",
            "Questionador"
        ]

    }

};


/* ============================================================
   ESTADO
============================================================ */

const estado = {

    etapa: 0,

    especie: "humano",

    carreira: "",

    talento: "",

    atributos: {

        forca: 2,
        agilidade: 2,
        perspicacia: 2,
        empatia: 2

    },

    habilidades: {}

};


/* Inicializa todas as habilidades em 0 */

habilidades.forEach(habilidade => {

    estado.habilidades[habilidade.nome] = 0;

});


/* ============================================================
   ELEMENTOS
============================================================ */

const pages =
    document.querySelectorAll(".page");

const steps =
    document.querySelectorAll(".step");

const sectionTitle =
    document.getElementById("sectionTitle");

const sectionDescription =
    document.getElementById("sectionDescription");

const sectionCounter =
    document.getElementById("sectionCounter");


/* ============================================================
   INFORMAÇÕES DAS ETAPAS
============================================================ */

const etapas = [

    {
        titulo: "Identidade",
        descricao: "Quem é seu personagem?"
    },

    {
        titulo: "Atributos + Espécie",
        descricao: "Defina a base física e mental do personagem."
    },

    {
        titulo: "Carreira",
        descricao: "Escolha a carreira do personagem."
    },

    {
        titulo: "Perícias",
        descricao: "Distribua os pontos entre as habilidades."
    },

    {
        titulo: "Talento",
        descricao: "Escolha um talento de carreira."
    },

    {
        titulo: "Equipamento",
        descricao: "Registre o equipamento inicial."
    },

    {
        titulo: "Complementos",
        descricao: "Complete as informações adicionais."
    },

    {
        titulo: "Revisão Final",
        descricao: "Confira tudo antes de exportar."
    }

];


/* ============================================================
   NAVEGAÇÃO
============================================================ */

function mostrarEtapa(numero) {

    estado.etapa = numero;


    pages.forEach(page => {

        const pageNumber =
            Number(page.dataset.page);

        page.classList.toggle(
            "active-page",
            pageNumber === numero
        );

    });


    steps.forEach(step => {

        const stepNumber =
            Number(step.dataset.step);

        step.classList.toggle(
            "active",
            stepNumber === numero
        );

        step.classList.toggle(
            "completed",
            stepNumber < numero
        );

    });


    sectionCounter.textContent =
        `ETAPA ${numero + 1} DE 8`;

    sectionTitle.textContent =
        etapas[numero].titulo;

    sectionDescription.textContent =
        etapas[numero].descricao;


    document.getElementById("btnAnterior").style.visibility =
        numero === 0
            ? "hidden"
            : "visible";


    document.getElementById("btnProximo").textContent =
        numero === 7
            ? "Finalizar ✓"
            : "Próximo →";


    if (numero === 2) {

        renderizarCarreiras();

    }


    if (numero === 3) {

        renderizarHabilidades();

    }


    if (numero === 4) {

        renderizarTalentos();

    }


    if (numero === 7) {

        renderizarRevisao();

    }

}


/* ============================================================
   BOTÃO PRÓXIMO
============================================================ */

document
    .getElementById("btnProximo")
    .addEventListener("click", () => {

        if (estado.etapa < 7) {

            mostrarEtapa(
                estado.etapa + 1
            );

            return;

        }

        exportarPDF();

    });


/* ============================================================
   BOTÃO VOLTAR
============================================================ */

document
    .getElementById("btnAnterior")
    .addEventListener("click", () => {

        if (estado.etapa > 0) {

            mostrarEtapa(
                estado.etapa - 1
            );

        }

    });


/* ============================================================
   CLIQUE NA BARRA DE ETAPAS
============================================================ */

steps.forEach(step => {

    step.addEventListener("click", () => {

        const numero =
            Number(step.dataset.step);

        mostrarEtapa(numero);

    });

});


/* ============================================================
   IDENTIDADE
============================================================ */

const camposTexto = [

    "nome",
    "jogador",
    "descricao",
    "metaPessoal",
    "historia",
    "camarada",
    "rival",
    "equipamento",
    "armas",
    "aparencia",
    "itemEmocional",
    "experiencia",
    "estresse"

];


camposTexto.forEach(id => {

    const elemento =
        document.getElementById(id);

    if (!elemento) {
        return;
    }


    elemento.addEventListener(
        "input",
        atualizarPreview
    );

});


/* ============================================================
   ESPÉCIE
============================================================ */

document
    .querySelectorAll("[data-species]")
    .forEach(button => {

        button.addEventListener("click", () => {

            document
                .querySelectorAll("[data-species]")
                .forEach(item => {

                    item.classList.remove(
                        "selected"
                    );

                });


            button.classList.add(
                "selected"
            );


            estado.especie =
                button.dataset.species;


            atualizarPreview();

        });

    });


/* ============================================================
   ATRIBUTOS
============================================================ */

document
    .querySelectorAll("[data-attribute]")
    .forEach(button => {

        button.addEventListener("click", () => {

            const atributo =
                button.dataset.attribute;

            const acao =
                button.dataset.action;

            alterarAtributo(
                atributo,
                acao
            );

        });

    });


function alterarAtributo(
    atributo,
    acao
) {

    let valor =
        estado.atributos[atributo];


    const total =
        Object.values(
            estado.atributos
        ).reduce(
            (a, b) => a + b,
            0
        );


    if (acao === "plus") {

        if (total >= 14) {
            return;
        }


        if (valor >= 4) {

            const carreira =
                carreiras[
                    estado.carreira
                ];


            if (
                !carreira ||
                carreira.atributo !== atributoNome(atributo)
            ) {

                return;

            }

        }


        valor++;

    }


    if (acao === "minus") {

        if (valor <= 2) {
            return;
        }

        valor--;

    }


    estado.atributos[atributo] =
        valor;


    atualizarAtributos();

}


/* ============================================================
   NOME DO ATRIBUTO
============================================================ */

function atributoNome(nome) {

    const mapa = {

        forca: "Força",

        agilidade: "Agilidade",

        perspicacia: "Perspicácia",

        empatia: "Empatia"

    };


    return mapa[nome];

}


/* ============================================================
   ATUALIZAR ATRIBUTOS
============================================================ */

function atualizarAtributos() {

    const nomes = {

        forca: "Forca",

        agilidade: "Agilidade",

        perspicacia: "Perspicacia",

        empatia: "Empatia"

    };


    Object.keys(nomes).forEach(chave => {

        document
            .getElementById(
                `attr${nomes[chave]}Value`
            )
            .textContent =
            estado.atributos[chave];

    });


    const total =
        Object.values(
            estado.atributos
        ).reduce(
            (a, b) => a + b,
            0
        );


    document.getElementById(
        "attributeUsed"
    ).textContent = total;


    document.getElementById(
        "attributeRemaining"
    ).textContent =
        14 - total;


    atualizarPreview();

}


/* ============================================================
   CARREIRAS
============================================================ */

function renderizarCarreiras() {

    const container =
        document.getElementById(
            "careerGrid"
        );


    container.innerHTML = "";


    Object.keys(carreiras)
        .forEach(nome => {

            const carreira =
                carreiras[nome];


            const button =
                document.createElement("button");


            button.className =
                "career-card";


            if (
                estado.carreira === nome
            ) {

                button.classList.add(
                    "selected"
                );

            }


            button.innerHTML = `

                <strong>${nome}</strong>

                <span>
                    Atributo principal:
                    ${carreira.atributo}
                </span>

            `;


            button.addEventListener(
                "click",
                () => {

                    escolherCarreira(nome);

                }
            );


            container.appendChild(
                button
            );

        });


    atualizarInformacoesCarreira();

}


/* ============================================================
   ESCOLHER CARREIRA
============================================================ */

function escolherCarreira(nome) {

    estado.carreira =
        nome;


    const carreira =
        carreiras[nome];


    /* Se o atributo principal estiver em 4,
       permite posteriormente chegar a 5. */


    renderizarCarreiras();

    atualizarInformacoesCarreira();

    atualizarPreview();

}


/* ============================================================
   INFORMAÇÕES DA CARREIRA
============================================================ */

function atualizarInformacoesCarreira() {

    const container =
        document.getElementById(
            "careerInfo"
        );


    if (!estado.carreira) {

        container.innerHTML = `

            <div class="empty-state">
                Escolha uma carreira para
                ver suas informações.
            </div>

        `;

        return;

    }


    const carreira =
        carreiras[
            estado.carreira
        ];


    container.innerHTML = `

        <div class="career-info-grid">

            <div class="info-block">

                <span>
                    Atributo principal
                </span>

                <strong>
                    ${carreira.atributo}
                </strong>

            </div>


            <div class="info-block">

                <span>
                    Habilidades principais
                </span>

                <strong>
                    ${carreira.habilidades.join(", ")}
                </strong>

            </div>


            <div class="info-block">

                <span>
                    Talentos disponíveis
                </span>

                <strong>
                    ${carreira.talentos.join(", ")}
                </strong>

            </div>

        </div>

    `;

}


/* ============================================================
   HABILIDADES
============================================================ */

function renderizarHabilidades() {

    const container =
        document.getElementById(
            "skillsList"
        );


    container.innerHTML = "";


    habilidades.forEach(
        habilidade => {

            const nivel =
                estado.habilidades[
                    habilidade.nome
                ];


            const row =
                document.createElement(
                    "div"
                );


            row.className =
                "skill-row";


            row.innerHTML = `

                <div class="skill-name">

                    <strong>
                        ${habilidade.nome}
                    </strong>

                    <span>
                        ${habilidade.atributo}
                    </span>

                </div>


                <div class="skill-controls">

                    <button
                        data-skill="${habilidade.nome}"
                        data-action="minus"
                    >
                        −
                    </button>

                    <strong>
                        ${nivel}
                    </strong>

                    <button
                        data-skill="${habilidade.nome}"
                        data-action="plus"
                    >
                        +
                    </button>

                </div>

            `;


            row
                .querySelectorAll(
                    "button"
                )
                .forEach(button => {

                    button.addEventListener(
                        "click",
                        () => {

                            alterarHabilidade(
                                habilidade.nome,
                                button.dataset.action
                            );

                        }
                    );

                });


            container.appendChild(row);

        }
    );


    atualizarPontosHabilidade();

}


/* ============================================================
   ALTERAR HABILIDADE
============================================================ */

function alterarHabilidade(
    nome,
    acao
) {

    const atual =
        estado.habilidades[nome];


    const total =
        Object.values(
            estado.habilidades
        ).reduce(
            (a, b) => a + b,
            0
        );


    if (acao === "plus") {

        if (total >= 10) {
            return;
        }


        const carreira =
            carreiras[
                estado.carreira
            ];


        const ePrincipal =
            carreira &&
            carreira.habilidades.includes(
                nome
            );


        const limite =
            ePrincipal
                ? 3
                : 1;


        if (atual >= limite) {
            return;
        }


        estado.habilidades[nome] =
            atual + 1;

    }


    if (acao === "minus") {

        if (atual <= 0) {
            return;
        }


        estado.habilidades[nome] =
            atual - 1;

    }


    renderizarHabilidades();

}


/* ============================================================
   PONTOS DE HABILIDADE
============================================================ */

function atualizarPontosHabilidade() {

    const total =
        Object.values(
            estado.habilidades
        ).reduce(
            (a, b) => a + b,
            0
        );


    document.getElementById(
        "skillUsed"
    ).textContent = total;


    document.getElementById(
        "skillRemaining"
    ).textContent =
        10 - total;

}


/* ============================================================
   TALENTOS
============================================================ */

function renderizarTalentos() {

    const container =
        document.getElementById(
            "talentGrid"
        );


    container.innerHTML = "";


    if (!estado.carreira) {

        container.innerHTML = `

            <div class="empty-state">
                Escolha uma carreira primeiro.
            </div>

        `;

        return;

    }


    const talentos =
        carreiras[
            estado.carreira
        ].talentos;


    talentos.forEach(talento => {

        const button =
            document.createElement("button");


        button.className =
            "talent-card";


        if (
            estado.talento === talento
        ) {

            button.classList.add(
                "selected"
            );

        }


        button.innerHTML = `

            <strong>
                ${talento}
            </strong>

            <span>
                Talento de carreira disponível
                para ${estado.carreira}.
            </span>

        `;


        button.addEventListener(
            "click",
            () => {

                estado.talento =
                    talento;

                renderizarTalentos();

                atualizarPreview();

            }
        );


        container.appendChild(
            button
        );

    });

}


/* ============================================================
   PREVIEW
============================================================ */

function atualizarPreview() {

    const nome =
        document.getElementById(
            "nome"
        ).value.trim();


    const experiencia =
        Number(
            document.getElementById(
                "experiencia"
            ).value || 0
        );


    const estresse =
        Number(
            document.getElementById(
                "estresse"
            ).value || 0
        );


    document.getElementById(
        "previewNome"
    ).textContent =
        nome ||
        "Personagem sem nome";


    document.getElementById(
        "previewCareer"
    ).textContent =
        estado.carreira ||
        "Nenhuma carreira";


    document.getElementById(
        "previewVitality"
    ).textContent =
        estado.atributos.forca;


    document.getElementById(
        "previewStress"
    ).textContent =
        estresse;


    document.getElementById(
        "previewXP"
    ).textContent =
        experiencia;


    document.getElementById(
        "sideForca"
    ).textContent =
        estado.atributos.forca;


    document.getElementById(
        "sideAgilidade"
    ).textContent =
        estado.atributos.agilidade;


    document.getElementById(
        "sidePerspicacia"
    ).textContent =
        estado.atributos.perspicacia;


    document.getElementById(
        "sideEmpatia"
    ).textContent =
        estado.atributos.empatia;


    document.getElementById(
        "sideCareer"
    ).textContent =
        estado.carreira ||
        "Nenhuma escolhida";


    document.getElementById(
        "sideTalent"
    ).textContent =
        estado.talento ||
        "Nenhum escolhido";


    atualizarStatus();

}


/* ============================================================
   STATUS
============================================================ */

function atualizarStatus() {

    let pendentes = 0;


    const nome =
        document.getElementById(
            "nome"
        ).value.trim();


    if (!nome) {
        pendentes++;
    }


    if (!estado.carreira) {
        pendentes++;
    }


    const totalAtributos =
        Object.values(
            estado.atributos
        ).reduce(
            (a, b) => a + b,
            0
        );


    if (totalAtributos !== 14) {
        pendentes++;
    }


    const totalHabilidades =
        Object.values(
            estado.habilidades
        ).reduce(
            (a, b) => a + b,
            0
        );


    if (totalHabilidades !== 10) {
        pendentes++;
    }


    if (!estado.talento) {
        pendentes++;
    }


    document.getElementById(
        "statusPending"
    ).textContent =
        pendentes;


    document.getElementById(
        "statusWarnings"
    ).textContent =
        estado.especie === "androide"
            ? 1
            : 0;

}


/* ============================================================
   REVISÃO
============================================================ */

function renderizarRevisao() {

    const container =
        document.getElementById(
            "review"
        );


    const nome =
        document.getElementById(
            "nome"
        ).value.trim();


    const experiencia =
        document.getElementById(
            "experiencia"
        ).value || 0;


    const estresse =
        document.getElementById(
            "estresse"
        ).value || 0;


    const totalHabilidades =
        Object.values(
            estado.habilidades
        ).reduce(
            (a, b) => a + b,
            0
        );


    container.innerHTML = `

        <div class="review-item">

            <span>Nome</span>

            <strong>
                ${nome || "Não informado"}
            </strong>

        </div>


        <div class="review-item">

            <span>Espécie</span>

            <strong>
                ${
                    estado.especie === "humano"
                        ? "Humano"
                        : "Androide"
                }
            </strong>

        </div>


        <div class="review-item">

            <span>Carreira</span>

            <strong>
                ${estado.carreira || "Não escolhida"}
            </strong>

        </div>


        <div class="review-item">

            <span>Talento</span>

            <strong>
                ${estado.talento || "Não escolhido"}
            </strong>

        </div>


        <div class="review-item">

            <span>Vitalidade</span>

            <strong>
                ${estado.atributos.forca}
            </strong>

        </div>


        <div class="review-item">

            <span>Estresse</span>

            <strong>
                ${estresse}
            </strong>

        </div>


        <div class="review-item">

            <span>Experiência</span>

            <strong>
                ${experiencia}
            </strong>

        </div>


        <div class="review-item">

            <span>Pontos de habilidades</span>

            <strong>
                ${totalHabilidades} / 10
            </strong>

        </div>

    `;

}


/* ============================================================
   SALVAR
============================================================ */

document
    .getElementById("btnSalvar")
    .addEventListener("click", salvarFicha);


function coletarDados() {

    const dados = {

        estado: JSON.parse(
            JSON.stringify(estado)
        ),

        campos: {}

    };


    camposTexto.forEach(id => {

        const elemento =
            document.getElementById(id);


        if (elemento) {

            dados.campos[id] =
                elemento.value;

        }

    });


    return dados;

}


function salvarFicha() {

    const dados =
        coletarDados();


    localStorage.setItem(
        "alienRpgFicha",
        JSON.stringify(dados)
    );


    alert(
        "Ficha salva no navegador."
    );

}


/* ============================================================
   CARREGAR
============================================================ */

document
    .getElementById("btnCarregar")
    .addEventListener(
        "click",
        carregarFicha
    );


function carregarFicha() {

    const salvo =
        localStorage.getItem(
            "alienRpgFicha"
        );


    if (!salvo) {

        alert(
            "Nenhuma ficha salva encontrada."
        );

        return;

    }


    const dados =
        JSON.parse(salvo);


    if (dados.estado) {

        estado.etapa =
            dados.estado.etapa ?? 0;

        estado.especie =
            dados.estado.especie ?? "humano";

        estado.carreira =
            dados.estado.carreira ?? "";

        estado.talento =
            dados.estado.talento ?? "";


        if (dados.estado.atributos) {

            estado.atributos =
                dados.estado.atributos;

        }


        if (dados.estado.habilidades) {

            estado.habilidades =
                dados.estado.habilidades;

        }

    }


    if (dados.campos) {

        Object.keys(dados.campos)
            .forEach(id => {

                const elemento =
                    document.getElementById(id);


                if (elemento) {

                    elemento.value =
                        dados.campos[id];

                }

            });

    }


    document
        .querySelectorAll("[data-species]")
        .forEach(button => {

            button.classList.toggle(
                "selected",
                button.dataset.species ===
                estado.especie
            );

        });


    atualizarAtributos();

    renderizarCarreiras();

    renderizarHabilidades();

    renderizarTalentos();

    atualizarPreview();

    mostrarEtapa(
        estado.etapa
    );


    alert(
        "Ficha carregada."
    );

}


/* ============================================================
   EXPORTAÇÃO
============================================================ */

function exportarPDF() {

    /*
        IMPORTANTE:

        Aqui NÃO vamos usar window.print().

        A versão final vai abrir o Ficha.pdf original,
        localizar os campos AcroForm e preencher seus
        valores.

        Assim o PDF continuará editável.

        Esta função fica separada para receber a rotina
        de preenchimento do PDF na próxima etapa.
    */


    alert(
        "A exportação para o PDF editável será conectada ao modelo Ficha.pdf."
    );

}


/* ============================================================
   INICIALIZAÇÃO
============================================================ */

atualizarAtributos();

atualizarPreview();

mostrarEtapa(0);