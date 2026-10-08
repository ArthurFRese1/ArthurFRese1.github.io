/* ============================================================
   ALIEN RPG — Criador de Ficha V0.1

   Arquivos esperados:

   Ficha.html
   Ficha.css
   Ficha.js
   Ficha.pdf

   IMPORTANTE:
   Ficha.pdf é o PDF ORIGINAL.
   Ele nunca é sobrescrito.

   A exportação cria:

   fichaAlien - PrimeiroNome.pdf

   ============================================================ */


const CAREERS = {

    "Fuzileiro Colonial": {
        main: "forca",

        skills: [
            "cc",
            "resistencia",
            "distancia"
        ],

        talents: [
            "Galhofa",
            "Violência",
            "Além do Limite"
        ]
    },


    "Xerife Colonial": {
        main: "perspicacia",

        skills: [
            "observacao",
            "distancia",
            "manipulacao"
        ],

        talents: [
            "Autoridade",
            "Investigador",
            "Subjugar"
        ]
    },


    "Agente da Companhia": {
        main: "perspicacia",

        skills: [
            "tecnologia",
            "observacao",
            "manipulacao"
        ],

        talents: [
            "Astúcia",
            "Segurança Pessoal",
            "Assumir o Controle"
        ]
    },


    "Criança": {
        main: "agilidade",

        skills: [
            "mobilidade",
            "sobrevivencia",
            "observacao"
        ],

        talents: [
            "Mal Notado",
            "Esquivar",
            "Ágil"
        ]
    },


    "Médico": {
        main: "empatia",

        skills: [
            "mobilidade",
            "observacao",
            "ajudaMedica"
        ],

        talents: [
            "Presença Calmante",
            "Compaixão",
            "Cirurgião de Campo"
        ]
    },


    "Oficial": {
        main: "empatia",

        skills: [
            "distancia",
            "comando",
            "manipulacao"
        ],

        talents: [
            "Comandante de Campo",
            "Influência",
            "Abuso de Poder"
        ]
    },


    "Piloto": {
        main: "agilidade",

        skills: [
            "pilotagem",
            "distancia",
            "tecnologia"
        ],

        talents: [
            "Aceleração Total",
            "Como a Palma da Mão",
            "Imprudente"
        ]
    },


    "Operário": {
        main: "forca",

        skills: [
            "maquinario",
            "resistencia",
            "cc"
        ],

        talents: [
            "Resiliente",
            "A Longa Jornada",
            "Determinação Verdadeira"
        ]
    },


    "Cientista": {
        main: "perspicacia",

        skills: [
            "observacao",
            "sobrevivencia",
            "tecnologia"
        ],

        talents: [
            "Análise",
            "Revelação",
            "Questionador"
        ]
    }

};

/* ============================================================
   EQUIPAMENTO INICIAL POR CARREIRA

   A estrutura é sempre uma lista de grupos.
   Cada grupo representa uma "opção" da carreira e o personagem
   escolhe exatamente 1 item daquele grupo.

   A quantidade de grupos é dinâmica: 4 grupos = 4 escolhas,
   5 grupos = 5 escolhas, 6 grupos = 6 escolhas, etc.

   Alguns itens do livro não são disponibilizados como seleção
   automática nesta interface. Eles aparecem como opção indisponível
   para manter a quantidade e a estrutura dos grupos.
============================================================ */
const CAREER_EQUIPMENT = {

    "Fuzileiro Colonial": [
        [],
        ["Traje de Pressão IRC MK.35", "Armadura Pessoal M3"],
        ["Sinalizador", "Baralho"],
        []
    ],

    "Xerife Colonial": [
        [],
        ["Binóculos", "Lanterna de feixe intenso"],
        ["Kit de primeiros socorros pessoal", "Bastão de choque"],
        ["Rádio de mão"]
    ],

    "Agente da Companhia": [
        ["Maleta de couro", "Maleta cromada"],
        ["Caneta banhada a ouro", "Relógio Rolex"],
        ["Cartão transmissor de dados com nível de autorização corporativa"],
        []
    ],

    "Criança": [
        ["Linha de pesca"],
        ["Ímã", "Carro de controle remoto a rádio"],
        ["Ioiô", "Jogo eletrônico portátil"],
        ["Localizador pessoal", "Canetinhas"]
    ],

    "Médico": [
        ["Kit cirúrgico", "Traje de Compressão IRC MK.50"],
        [],
        ["Kit de primeiros socorros pessoal"],
        ["Relógio Samani Série E", "Rádio de mão"]
    ],

    "Oficial": [
        [],
        ["Relógio Samani Série E", "Binóculos"],
        ["Rastreador de movimento M314", "Traje de Compressão IRC MK.50"],
        ["DAD-P Seegson", "Receptor-Transmissor IAI"]
    ],

    "Piloto": [
        ["Terminal por satélite TS-PRP"],
        ["Rádio de mão", "D6 sinalizadores"],
        ["Plugue de manutenção", "DAD-P Seegson"],
        ["Dispositivo de diagnóstico de sistema Seegson", "Traje de compressão IRC MK.50"]
    ],

    "Operário": [
        [],
        ["D6 doses de Hidratação", "Ferramenta Multiuso"],
        ["Traje de Compressão IRC MK.50"],
        ["Lanterna de feixe intenso", "Gravador de fita magnética Seegson Série C"]
    ],

    "Cientista": [
        ["Câmera de vídeo digital", "Rádio de mão"],
        ["DAD-P Seegson", "Neuro visor"],
        ["Dispositivo de Diagnóstico de Sistema Seegson", "Transmissor de Dados Pessoais"],
        ["Rastreador de movimento M314", "Kit de primeiros socorros pessoal"]
    ]
};



/* ============================================================
   ATRIBUTOS
============================================================ */

const ATTRIBUTES = {

    forca: {
        name: "FORÇA",
        short: "FOR"
    },

    agilidade: {
        name: "AGILIDADE",
        short: "AGI"
    },

    perspicacia: {
        name: "PERSPICÁCIA",
        short: "PER"
    },

    empatia: {
        name: "EMPATIA",
        short: "EMP"
    }

};



/* ============================================================
   HABILIDADES
============================================================ */

const SKILLS = {

    cc: {
        name: "Combate Corpo a Corpo",
        attr: "forca"
    },

    maquinario: {
        name: "Maquinário Pesado",
        attr: "forca"
    },

    resistencia: {
        name: "Resistência",
        attr: "forca"
    },

    mobilidade: {
        name: "Mobilidade",
        attr: "agilidade"
    },

    pilotagem: {
        name: "Pilotagem",
        attr: "agilidade"
    },

    distancia: {
        name: "Combate à Distância",
        attr: "agilidade"
    },

    observacao: {
        name: "Observação",
        attr: "perspicacia"
    },

    tecnologia: {
        name: "Tecnologia",
        attr: "perspicacia"
    },

    sobrevivencia: {
        name: "Sobrevivência",
        attr: "perspicacia"
    },

    manipulacao: {
        name: "Manipulação",
        attr: "empatia"
    },

    ajudaMedica: {
        name: "Ajuda Médica",
        attr: "empatia"
    },

    comando: {
        name: "Comando",
        attr: "empatia"
    }

};



/* ============================================================
   ESTADO
============================================================ */

const STORAGE_KEY = "alienRpgCriadorV01";


const state = {


    data: {

        name: "",
        career: "",

        characterType: "human",

        xp: 0,

        age: "",
        height: "",
        weight: "",

        eyes: "",
        skin: "",
        hair: "",

        appearance: "",

        buddy: "",
        rival: "",

        goal: "",

        history: "",

        emotionalItem: "",

        gear: "",
        selectedEquipment: [],
        weapons: "",

        armor: "",

        tinyItems: "",


        attributes: {

            forca: 2,
            agilidade: 2,
            perspicacia: 2,
            empatia: 2

        },


        skills: Object.fromEntries(
            Object.keys(SKILLS)
                .map(key => [key, 0])
        ),


        talent: "",


        androidBonus: []

    }

};



/* ============================================================
   HELPERS
============================================================ */

const $ = id =>
    document.getElementById(id);


const all = selector =>
    [...document.querySelectorAll(selector)];



function showToast(message) {

    const toast = $("toast");

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(showToast.timer);

    showToast.timer = setTimeout(() => {

        toast.classList.remove("show");

    }, 2300);

}



function currentCareer() {

    return CAREERS[state.data.career] || null;

}



function attributeTotal() {

    return Object
        .values(state.data.attributes)
        .reduce(
            (sum, value) => sum + value,
            0
        );

}



function skillTotal() {

    return Object
        .values(state.data.skills)
        .reduce(
            (sum, value) => sum + value,
            0
        );

}



function allowedAttributeMax(key) {

    const career = currentCareer();

    return career &&
           career.main === key
        ? 5
        : 4;

}



function allowedSkillMax(key) {

    const career = currentCareer();

    return career &&
           career.skills.includes(key)
        ? 3
        : 1;

}



/* ============================================================
   CONTADORES
============================================================ */

function updateAttributeCounter() {

    const used = attributeTotal();

    const counter =
        $("attributeCounter");


    counter.textContent =
        `${used} / 14`;


    counter.classList.toggle(
        "ok",
        used === 14
    );


    counter.classList.toggle(
        "bad",
        used > 14
    );

}



function updateSkillCounter() {

    const used = skillTotal();

    const counter =
        $("skillCounter");


    counter.textContent =
        `${used} / 10`;


    counter.classList.toggle(
        "ok",
        used === 10
    );


    counter.classList.toggle(
        "bad",
        used > 10
    );

}



/* ============================================================
   CARREIRAS
============================================================ */

function renderCareers() {

    const container =
        $("careers");


    if (!container)
        return;


    container.innerHTML = "";


    const descriptions = {

        "Fuzileiro Colonial":
            "Soldado colonial treinado para combate, operações militares e sobrevivência em situações extremas.",

        "Xerife Colonial":
            "Autoridade colonial responsável por investigação, segurança e manutenção da ordem.",

        "Agente da Companhia":
            "Representante da Companhia, especializado em tecnologia, observação e manipulação.",

        "Criança":
            "Personagem jovem que depende de mobilidade, percepção e capacidade de passar despercebido.",

        "Médico":
            "Profissional de saúde preparado para manter a tripulação viva em condições difíceis.",

        "Oficial":
            "Líder responsável por comando, negociação e tomada de decisões sob pressão.",

        "Piloto":
            "Especialista em pilotagem e operação de veículos, naves e sistemas técnicos.",

        "Operário":
            "Trabalhador especializado em máquinas, esforço físico e tarefas técnicas pesadas.",

        "Cientista":
            "Pesquisador especializado em observação, tecnologia e investigação científica."

    };


    Object.entries(CAREERS).forEach(([name, career]) => {

        const button =
            document.createElement("button");


        button.type =
            "button";


        button.className =
            `career-card ${
                state.data.career === name
                    ? "selected"
                    : ""
            }`;


        button.dataset.career =
            name;


        const skillNames =
            career.skills
                .map(key => SKILLS[key]?.name || key)
                .join(" • ");


        const mainName =
            ATTRIBUTES[career.main]?.short ||
            career.main;


        const icon =
            career.main === "forca"
                ? "⚔"
                : career.main === "agilidade"
                    ? "◈"
                    : career.main === "perspicacia"
                        ? "⌁"
                        : "✦";


        button.innerHTML = `

            <span class="career-card-check">
                ✓
            </span>

            <div class="career-card-icon">
                ${icon}
            </div>

            <div class="career-card-content">

                <div class="career-card-title">

                    <strong>
                        ${name}
                    </strong>

                    <span class="career-tag">
                        CARREIRA
                    </span>

                </div>

                <p>
                    ${descriptions[name] || "Carreira do ALIEN RPG."}
                </p>

                <div class="career-card-meta">

                    <span>
                        Principal:
                        <b>${mainName}</b>
                    </span>

                    <span>
                        Habilidades:
                        <b>${skillNames}</b>
                    </span>

                </div>

            </div>

        `;


        container.appendChild(button);

    });


    const selectedInfo = $("careerSelectedInfo");

    if (selectedInfo) {

        const selectedCareer = currentCareer();

        selectedInfo.textContent = selectedCareer
            ? `Carreira selecionada: ${state.data.career} · Atributo principal: ${ATTRIBUTES[selectedCareer.main].name}`
            : "Nenhuma carreira selecionada.";

    }

}



/* ============================================================
   ATRIBUTOS
============================================================ */

function renderAttributes() {

    const container =
        $("attributes");


    container.innerHTML = "";


    const career =
        currentCareer();


    Object.entries(ATTRIBUTES)
        .forEach(([key, attr]) => {

            const value =
                state.data.attributes[key];


            const max =
                allowedAttributeMax(key);


            const card =
                document.createElement("div");


            card.className =
                `attribute-card ${
                    career?.main === key
                        ? "main"
                        : ""
                }`;


            card.innerHTML = `

                <div class="attr-name">
                    ${attr.name}
                </div>

                <span class="attr-main">
                    ${
                        career?.main === key
                            ? "ATRIBUTO PRINCIPAL"
                            : ""
                    }
                </span>

                <div class="attr-controls">

                    <button
                        type="button"
                        data-attr-minus="${key}"
                    >
                        −
                    </button>


                    <span class="attr-value">
                        ${value}
                    </span>


                    <button
                        type="button"
                        data-attr-plus="${key}"
                    >
                        +
                    </button>

                </div>


                <div class="skill-attr">
                    mín. 2 · máx. ${max}
                </div>

            `;


            container.appendChild(card);

        });


    $("careerMainAttribute").textContent =
        career

            ? `Atributo principal de ${state.data.career}: ${
                ATTRIBUTES[career.main].name
              }. Ele pode chegar a 5 na criação.`

            : "Escolha uma carreira para saber qual é o atributo principal.";


    updateAttributeCounter();

    renderAndroidChoices();

}



/* ============================================================
   ANDROIDE
============================================================ */

function renderAndroidChoices() {

    const box =
        $("androidBonus");


    const choices =
        $("androidChoices");


    const android =
        state.data.characterType === "android";


    box.classList.toggle(
        "hidden",
        !android
    );


    if (!android)
        return;


    choices.innerHTML = "";


    Object.entries(ATTRIBUTES)
        .forEach(([key, attr]) => {

            const button =
                document.createElement("button");


            button.type =
                "button";


            button.className =
                `android-choice ${
                    state.data.androidBonus.includes(key)
                        ? "selected"
                        : ""
                }`;


            button.textContent =
                attr.name;


            button.dataset.androidChoice =
                key;


            choices.appendChild(button);

        });

}



/* ============================================================
   HABILIDADES
============================================================ */

function renderSkills() {

    const container =
        $("skills");


    const career =
        currentCareer();


    container.innerHTML = "";


    Object.entries(SKILLS)
        .forEach(([key, skill]) => {

            const value =
                state.data.skills[key];


            const isMain =
                career?.skills.includes(key);


            const row =
                document.createElement("div");


            row.className =
                `skill-row ${
                    isMain ? "main" : ""
                }`;


            row.innerHTML = `

                <div>

                    <div class="skill-name">

                        ${skill.name}

                        ${
                            isMain
                                ? '<span class="skill-tag">CARREIRA</span>'
                                : ""
                        }

                    </div>


                    <div class="skill-attr">
                        ${ATTRIBUTES[skill.attr].name}
                    </div>

                </div>


                <div class="skill-control">

                    <button
                        type="button"
                        data-skill-minus="${key}"
                    >
                        −
                    </button>


                    <strong>
                        ${value}
                    </strong>


                    <button
                        type="button"
                        data-skill-plus="${key}"
                    >
                        +
                    </button>

                </div>

            `;


            container.appendChild(row);

        });


    $("careerSkillsInfo").textContent =
        career

            ? `Habilidades principais de ${
                state.data.career
              }: ${
                career.skills
                    .map(key => SKILLS[key].name)
                    .join(", ")
              }. Cada uma pode chegar a 3.`

            : "Escolha uma carreira para destacar suas habilidades principais.";


    updateSkillCounter();

}



/* ============================================================
   EQUIPAMENTO
============================================================ */
function renderEquipment() {
    const container = $("careerEquipment");
    if (!container) return;

    const career = currentCareer();
    const selectedInfo = $("selectedEquipmentInfo");

    if (!career) {
        container.className = "career-equipment-picker empty";
        container.innerHTML = `
            <div class="career-equipment-empty">
                Escolha uma carreira primeiro.
            </div>
        `;

        if (selectedInfo) {
            selectedInfo.textContent =
                "Escolha uma carreira para ver as opções de equipamento.";
        }

        return;
    }

    const groups = CAREER_EQUIPMENT[state.data.career] || [];
    const selectedItems = Array.isArray(state.data.selectedEquipment)
        ? state.data.selectedEquipment
        : [];

    container.className = "career-equipment-picker";

    container.innerHTML = `
        <div class="career-equipment-groups">
            ${groups.map((group, index) => {
                const selected = selectedItems[index] || "";
                const available = Array.isArray(group) ? group : [];

                if (!available.length) {
                    return `
                        <div class="career-equipment-group unavailable">
                            <div class="career-equipment-group-title">
                                Opção ${index + 1}
                            </div>
                            <div class="career-equipment-unavailable">
                                Esta opção não está disponível para seleção automática.
                            </div>
                        </div>
                    `;
                }

                return `
                    <label class="career-equipment-group">
                        <span class="career-equipment-group-title">
                            Opção ${index + 1}
                        </span>

                        <select
                            class="career-equipment-select"
                            data-equipment-group="${index}"
                        >
                            <option value="">Escolha 1 item...</option>
                            ${available.map(item => `
                                <option
                                    value="${escapeHtml(item)}"
                                    ${selected === item ? "selected" : ""}
                                >
                                    ${escapeHtml(item)}
                                </option>
                            `).join("")}
                        </select>
                    </label>
                `;
            }).join("")}
        </div>
    `;

    const chosenCount = selectedItems.filter(Boolean).length;
    const availableGroups = groups.filter(group => Array.isArray(group) && group.length).length;

    if (selectedInfo) {
        selectedInfo.innerHTML = `
            <strong>Selecionados (${chosenCount}/${groups.length})</strong>
            <span>${
                selectedItems.filter(Boolean).length
                    ? selectedItems.filter(Boolean).map(escapeHtml).join(" • ")
                    : "Nenhum item selecionado."
            }</span>
            ${
                availableGroups < groups.length
                    ? `<small>${groups.length - availableGroups} opção(ões) não disponível(is) para seleção automática.</small>`
                    : ""
            }
        `;
    }
}

function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function selectEquipment(groupIndex, item) {
    const groups = CAREER_EQUIPMENT[state.data.career] || [];

    if (!groups[groupIndex]) return;

    if (!Array.isArray(state.data.selectedEquipment)) {
        state.data.selectedEquipment = [];
    }

    if (item && !groups[groupIndex].includes(item)) {
        return;
    }

    state.data.selectedEquipment[groupIndex] = item || "";

    state.data.selectedEquipment =
        state.data.selectedEquipment.slice(0, groups.length);

    state.data.gear = state.data.selectedEquipment
        .filter(Boolean)
        .join("\n");

    renderEquipment();
    renderPreview();
    renderReview();
}


/* ============================================================
   TALENTOS
============================================================ */

function renderTalents() {

    const container =
        $("talents");


    const career =
        currentCareer();


    container.innerHTML = "";


    if (!career) {

        container.className =
            "talent-grid empty";


        container.textContent =
            "Escolha uma carreira para ver os talentos disponíveis.";


        return;

    }


    container.className =
        "talent-grid";


    career.talents.forEach(talent => {

        const card =
            document.createElement("button");


        card.type =
            "button";


        card.className =
            `talent-card ${
                state.data.talent === talent
                    ? "selected"
                    : ""
            }`;


        card.dataset.talent =
            talent;


        card.innerHTML = `

            <strong>
                ${talent}
            </strong>

            <span>
                Talento de carreira
            </span>

        `;


        container.appendChild(card);

    });

}



/* ============================================================
   PRÉ-VISUALIZAÇÃO
============================================================ */

function valueOrDash(value) {

    return String(
        value || "—"
    );

}



function renderPreview() {

    const d =
        state.data;


    const career =
        currentCareer();


    $("pName").textContent =
        d.name ||
        "Personagem sem nome";


    $("pCareer").textContent =
        d.career ||
        "Escolha uma carreira";


    $("pBuddy").textContent =
        valueOrDash(d.buddy);


    $("pRival").textContent =
        valueOrDash(d.rival);


    $("pGoal").textContent =
        valueOrDash(d.goal);


    $("pXp").textContent =
        d.xp || 0;


    $("pType").textContent =
        d.characterType === "android"
            ? "AND"
            : "HUM";


    $("pHealth").textContent =
        d.attributes.forca;


    $("pStress").textContent =
        d.characterType === "android"
            ? "—"
            : "0";


    $("pTalent").textContent =
        d.talent ||
        "Nenhum selecionado";


    const pAttributes =
        $("pAttributes");


    pAttributes.innerHTML = "";


    Object.entries(ATTRIBUTES)
        .forEach(([key, attr]) => {

            const item =
                document.createElement("div");


            item.className =
                "preview-stat";


            item.innerHTML = `

                <span>
                    ${attr.short}
                </span>

                <b>
                    ${d.attributes[key]}
                </b>

            `;


            pAttributes.appendChild(item);

        });


    const pRes =
        $("pResistances");


    pRes.innerHTML =
        Object.entries(ATTRIBUTES)
            .map(([key, attr]) => {

                return `
                    <div>
                        ${attr.short}
                        <strong>
                            ${d.attributes[key]}
                        </strong>
                    </div>
                `;

            })
            .join("");


    const pSkills =
        $("pSkills");


    pSkills.innerHTML =
        Object.entries(SKILLS)
            .map(([key, skill]) => {

                return `
                    <div>
                        <span>
                            ${skill.name}
                        </span>

                        <b>
                            ${d.skills[key]}
                        </b>
                    </div>
                `;

            })
            .join("");


    const careerLabel =
        career
            ? ` · Principal: ${
                ATTRIBUTES[career.main].name
              }`
            : "";


    $("status").textContent =
        d.name
            ? `RASCUNHO${careerLabel}`
            : "RASCUNHO";

}



/* ============================================================
   ALERTAS
============================================================ */

function renderAlerts() {

    const alerts = [];


    const d =
        state.data;


    if (!d.name.trim()) {

        alerts.push([
            "Nome do personagem",
            "Preencha o nome para exportar com o nome correto."
        ]);

    }


    if (!d.career) {

        alerts.push([
            "Escolha uma carreira",
            "A carreira define o atributo principal, habilidades principais e talentos."
        ]);

    }


    if (attributeTotal() !== 14) {

        alerts.push([
            "Atributos incompletos",
            `Você distribuiu ${attributeTotal()} de 14 pontos.`
        ]);

    }


    if (skillTotal() !== 10) {

        alerts.push([
            "Habilidades incompletas",
            `Você distribuiu ${skillTotal()} de 10 pontos.`
        ]);

    }


    if (!d.talent) {

        alerts.push([
            "Escolha um talento",
            "A criação de campanha começa com um talento de carreira."
        ]);

    }


    if (
        d.characterType === "android" &&
        d.androidBonus.length !== 2
    ) {

        alerts.push([
            "Bônus de androide",
            "Escolha exatamente dois atributos para receber +3."
        ]);

    }


    $("alertCount").textContent =
        alerts.length;


    $("alertsList").innerHTML =
        alerts.length

            ? alerts
                .map(([title, text]) => `

                    <div class="alert-item">

                        <strong>
                            ${title}
                        </strong>

                        ${text}

                    </div>

                `)
                .join("")

            : `

                <div class="alert-item">

                    <strong>
                        Tudo certo
                    </strong>

                    Os dados básicos estão prontos para a revisão.

                </div>

            `;


    return alerts;

}



/* ============================================================
   REVISÃO
============================================================ */

function renderReview() {

    $("reviewName").textContent =
        valueOrDash(state.data.name);


    $("reviewCareer").textContent =
        valueOrDash(state.data.career);


    $("reviewAttributes").textContent =
        `${attributeTotal()} / 14 pontos`;


    $("reviewSkills").textContent =
        `${skillTotal()} / 10 pontos`;


    $("reviewTalent").textContent =
        valueOrDash(state.data.talent);


    const warnings =
        renderAlerts();


    const box =
        $("reviewWarnings");


    box.innerHTML =
        warnings.length

            ? warnings
                .map(([title, text]) => `

                    <div class="warning">

                        ${title}:
                        ${text}

                    </div>

                `)
                .join("")

            : `

                <div class="warning ok">

                    Ficha pronta para exportação.

                </div>

            `;

}



/* ============================================================
   RENDER GERAL
============================================================ */

function renderAll() {

    renderCareers();

    renderAttributes();

    renderSkills();

    renderTalents();

    renderEquipment();

    renderPreview();

    renderReview();

}



/* ============================================================
   CAMPOS
============================================================ */

function updateField(target) {

    const key =
        target.id;


    if (!(key in state.data))
        return;


    state.data[key] =
        target.type === "number"

            ? Number(target.value || 0)

            : target.value;


    renderPreview();

    renderReview();

}



/* ============================================================
   CARREGAR ESTADO NOS INPUTS
============================================================ */

function fillInputsFromState() {

    Object.entries(state.data)
        .forEach(([key, value]) => {

            const element =
                $(key);


            if (
                !element ||
                [
                    "attributes",
                    "skills",
                    "androidBonus",
                    "talent"
                ].includes(key)
            )
                return;


            if (element.type === "number") {

                element.value =
                    value;

            } else {

                element.value =
                    value ?? "";

            }

        });

}



/* ============================================================
   NORMALIZAÇÃO
============================================================ */

function normalizeLoadedData(loaded) {

    const d =
        loaded || {};


    state.data = {

        ...state.data,

        ...d,


        attributes: {

            ...state.data.attributes,

            ...(d.attributes || {})

        },


        skills: {

            ...state.data.skills,

            ...(d.skills || {})

        },


        androidBonus:

            Array.isArray(d.androidBonus)
                ? d.androidBonus
                : [],


        selectedEquipment:

            Array.isArray(d.selectedEquipment)
                ? d.selectedEquipment
                : [],


        xp:
            Number(d.xp || 0)

    };

}



/* ============================================================
   SALVAR
============================================================ */

function saveCharacter() {

    if (window.AlienDB) {

        const saved =
            window.AlienDB.salvar(state.data);

        state.data.id =
            saved.id;

        state.data.updatedAt =
            saved.updatedAt;

    } else {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(state.data)
        );

    }

    showToast(
        "Ficha salva no banco local."
    );

}



/* ============================================================
   CARREGAR
============================================================ */

function loadCharacter() {

    let saved = null;

    if (window.AlienDB) {

        const lista =
            window.AlienDB.listar();

        saved =
            lista[0] || null;

    }

    if (!saved) {

        const legacy =
            localStorage.getItem(STORAGE_KEY);

        if (legacy) {
            try {
                saved = JSON.parse(legacy);
            } catch (error) {
                console.error(error);
            }
        }

    }

    if (!saved) {

        showToast(
            "Nenhuma ficha salva foi encontrada."
        );

        return;

    }

    try {

        normalizeLoadedData(saved);

        fillInputsFromState();

        renderCareers();

        $("characterType").value =
            state.data.characterType;

        renderAll();

        showToast(
            "Última ficha carregada."
        );

    } catch (error) {

        console.error(error);

        showToast(
            "Não foi possível carregar a ficha."
        );

    }

}



/* ============================================================
   ALTERAR ATRIBUTOS
============================================================ */

function changeAttribute(key, delta) {

    const current =
        state.data.attributes[key];


    const next =
        current + delta;


    const max =
        allowedAttributeMax(key);


    if (
        next < 2 ||
        next > max
    )
        return;


    if (
        delta > 0 &&
        attributeTotal() >= 14
    )
        return;


    state.data.attributes[key] =
        next;


    renderAttributes();

    renderPreview();

    renderReview();

}



/* ============================================================
   ALTERAR HABILIDADES
============================================================ */

function changeSkill(key, delta) {

    const current =
        state.data.skills[key];


    const max =
        allowedSkillMax(key);


    const next =
        current + delta;


    if (
        next < 0 ||
        next > max
    )
        return;


    if (
        delta > 0 &&
        skillTotal() >= 10
    )
        return;


    state.data.skills[key] =
        next;


    renderSkills();

    renderPreview();

    renderReview();

}



/* ============================================================
   BÔNUS ANDROIDE
============================================================ */

function selectAndroidBonus(key) {

    const list =
        state.data.androidBonus;


    if (list.includes(key)) {

        state.data.androidBonus =
            list.filter(
                item => item !== key
            );

    } else if (list.length < 2) {

        state.data.androidBonus = [
            ...list,
            key
        ];

    }


    renderAndroidChoices();

    renderPreview();

    renderReview();

}



/* ============================================================
   TROCAR CARREIRA
============================================================ */

function setCareer(value) {

    const nextCareer =
        CAREERS[value];


    if (!nextCareer) {

        state.data.career = "";

        state.data.talent = "";

        renderAll();

        return;

    }


    const invalidAttribute =
        Object.entries(
            state.data.attributes
        )
        .some(([key, amount]) => {

            return amount >
                (
                    nextCareer.main === key
                        ? 5
                        : 4
                );

        });


    const invalidSkill =
        Object.entries(
            state.data.skills
        )
        .some(([key, amount]) => {

            return amount >
                (
                    nextCareer.skills.includes(key)
                        ? 3
                        : 1
                );

        });


    if (
        invalidAttribute ||
        invalidSkill
    ) {

        renderCareers();


        showToast(
            "Reduza os valores que ultrapassam os limites da nova carreira antes de trocar."
        );


        return;

    }


    state.data.career =
        value;


    state.data.talent =
        "";


    state.data.selectedEquipment =
        [];


    state.data.gear =
        "";


    renderAll();

}



/* ============================================================
   TIPO DE PERSONAGEM
============================================================ */

function setCharacterType(value) {

    state.data.characterType =
        value;


    if (value !== "android") {

        state.data.androidBonus =
            [];

    }


    renderAll();

}



/* ============================================================
   PRIMEIRO NOME
============================================================ */

function firstName() {

    const clean =
        state.data.name.trim();


    if (!clean)
        return "Sem Nome";


    return clean
        .split(/\s+/)[0]
        .replace(
            /[\\/:*?"<>|]/g,
            ""
        ) || "Sem Nome";

}



/* ============================================================
   PDF — CAMPOS DE TEXTO
============================================================ */

function setTextField(
    form,
    name,
    value
) {

    try {

        form
            .getTextField(name)
            .setText(
                value == null
                    ? ""
                    : String(value)
            );

    } catch (_) {

        /*
            O PDF pode não possuir determinado campo.
            Nesse caso continuamos preenchendo os demais.
        */

    }

}



/* ============================================================
   PDF — CHECKBOX
============================================================ */

function setCheck(
    form,
    name,
    checked
) {

    try {

        const field =
            form.getCheckBox(name);


        if (checked)
            field.check();
        else
            field.uncheck();


    } catch (_) {

        /*
            O PDF pode possuir um campo diferente
            ou uma caixa não compatível.
        */

    }

}



/* ============================================================
   PDF — BARRAS DE CHECKBOX
============================================================ */

function fillNumberBoxes(
    form,
    prefix,
    value,
    names
) {

    const amount =
        Math.max(
            0,
            Math.min(
                names.length,
                Number(value) || 0
            )
        );


    names.forEach(
        (name, index) => {

            setCheck(
                form,
                name,
                index < amount
            );

        }
    );

}



/* ============================================================
   PREENCHER PDF
============================================================ */

function fillPdfForm(form) {

    const d =
        state.data;


    /*
       IDENTIDADE
    */

    setTextField(
        form,
        "Name",
        d.name.trim()
    );


    setTextField(
        form,
        "Career",
        d.career
    );


    setTextField(
        form,
        "Buddy",
        d.buddy
    );


    setTextField(
        form,
        "Rival",
        d.rival
    );


    setTextField(
        form,
        "Appearance",
        d.appearance
    );


    setTextField(
        form,
        "Agenda",
        d.goal
    );


    setTextField(
        form,
        "Signature item",
        d.emotionalItem
    );


    setTextField(
        form,
        "Tiny items",
        d.tinyItems
    );


    setTextField(
        form,
        "Armor",
        d.armor
    );



    /*
       EQUIPAMENTO
    */

    const gearLines =
        String(d.gear || "")
            .split(/\r?\n/)
            .map(x => x.trim())
            .filter(Boolean);


    for (
        let i = 1;
        i <= 10;
        i++
    ) {

        setTextField(
            form,
            `Gear ${i}`,
            gearLines[i - 1] || ""
        );

    }



    /*
       ARMAS
    */

    const weaponLines =
        String(d.weapons || "")
            .split(/\r?\n/)
            .map(x => x.trim())
            .filter(Boolean);


    for (
        let i = 1;
        i <= 4;
        i++
    ) {

        setTextField(
            form,
            `Weapon${i}`,
            weaponLines[i - 1] || ""
        );

    }



    /*
       ATRIBUTOS
    */

    setTextField(
        form,
        "Str",
        d.attributes.forca
    );


    setTextField(
        form,
        "Ag",
        d.attributes.agilidade
    );


    setTextField(
        form,
        "Wits",
        d.attributes.perspicacia
    );


    setTextField(
        form,
        "Emp",
        d.attributes.empatia
    );



    /*
       HABILIDADES
    */

    setTextField(
        form,
        "CC",
        d.skills.cc
    );


    setTextField(
        form,
        "HM",
        d.skills.maquinario
    );


    setTextField(
        form,
        "St",
        d.skills.resistencia
    );


    setTextField(
        form,
        "Mo",
        d.skills.mobilidade
    );


    setTextField(
        form,
        "P",
        d.skills.pilotagem
    );


    setTextField(
        form,
        "RC",
        d.skills.distancia
    );


    setTextField(
        form,
        "O",
        d.skills.observacao
    );


    setTextField(
        form,
        "Enc",
        d.skills.tecnologia
    );


    setTextField(
        form,
        "Su",
        d.skills.sobrevivencia
    );


    setTextField(
        form,
        "Man",
        d.skills.manipulacao
    );


    setTextField(
        form,
        "MA",
        d.skills.ajudaMedica
    );


    setTextField(
        form,
        "Cmd",
        d.skills.comando
    );



    /*
       TALENTO

       O PDF possui vários campos de talento.
       Nesta primeira versão usamos o primeiro
       para o talento escolhido.
    */

    setTextField(
        form,
        "Talent 1",
        d.talent
    );


    setTextField(
        form,
        "Talent 2",
        ""
    );


    setTextField(
        form,
        "Talent 3",
        ""
    );


    setTextField(
        form,
        "Talent 4",
        ""
    );



    /*
       ESTRESSE

       Começa em 0.
       Androides não possuem estresse.
    */

    fillNumberBoxes(
        form,

        "Stress",

        d.characterType === "android"
            ? 0
            : 0,

        [
            "Stress1",
            "Stress2",
            "Stress3",
            "Stress4",
            "Stress5",
            "Stress6",
            "Stress7",
            "Stress8",
            "Stress9",
            "Stress10"
        ]
    );



    /*
       VITALIDADE

       Inicialmente igual à FORÇA.
    */

    fillNumberBoxes(
        form,

        "Health",

        d.attributes.forca,

        [
            "Heath 1",
            "Health2",
            "Health3",
            "Health4",
            "Health5",
            "Health6",
            "Health7",
            "Health8",
            "Health9",
            "Health10"
        ]
    );



    /*
       EXPERIÊNCIA

       O PDF possui 10 caixas.
    */

    fillNumberBoxes(
        form,

        "XP",

        d.xp,

        [
            "XP1",
            "XP2",
            "XP3",
            "XP4",
            "XP5",
            "XP6",
            "XP7",
            "XP8",
            "XP9",
            "XP10"
        ]
    );



    /*
       CONDIÇÕES

       Ainda não são escolhidas no editor V0.1.
    */

    setCheck(
        form,
        "starving",
        false
    );


    setCheck(
        form,
        "Dehydrated",
        false
    );


    setCheck(
        form,
        "Exhausted",
        false
    );


    setCheck(
        form,
        "Freezing",
        false
    );

}



/* ============================================================
   OBTER PDF ORIGINAL
============================================================ */

async function getPdfTemplateBytes() {

    try {

        const response =
            await fetch(
                "./Ficha.pdf",
                {
                    cache: "no-store"
                }
            );


        if (!response.ok)
            throw new Error(
                `HTTP ${response.status}`
            );


        return await response.arrayBuffer();


    } catch (error) {

        showToast(
            "Selecione o Ficha.pdf original para continuar."
        );


        return new Promise(resolve => {

            const picker =
                $("pdfPicker");


            picker.value = "";


            picker.onchange =
                async () => {

                    const file =
                        picker.files?.[0];


                    resolve(
                        file
                            ? await file.arrayBuffer()
                            : null
                    );

                };


            picker.click();

        });

    }

}



/* ============================================================
   EXPORTAR PDF
============================================================ */

async function exportPdf() {

    const alerts =
        renderAlerts();


    if (alerts.length) {

        showToast(
            "Corrija os alertas antes de exportar."
        );


        return;

    }


    if (!window.PDFLib) {

        showToast(
            "A biblioteca do PDF não carregou. Verifique sua internet."
        );


        return;

    }


    const templateBytes =
        await getPdfTemplateBytes();


    if (!templateBytes)
        return;


    try {

        /*
           Carrega uma cópia do PDF original
        */

        const pdfDoc =
            await PDFLib.PDFDocument.load(
                templateBytes
            );


        const form =
            pdfDoc.getForm();


        /*
           Preenche os campos
        */

        fillPdfForm(form);


        /*
           Atualiza a aparência dos campos,
           mas NÃO achata o formulário.

           Portanto eles continuam editáveis.
        */

        form.updateFieldAppearances();


        /*
           Gera os bytes do NOVO PDF.
        */

        const pdfBytes =
            await pdfDoc.save({
                useObjectStreams: false
            });


        const blob =
            new Blob(
                [pdfBytes],
                {
                    type: "application/pdf"
                }
            );


        const url =
            URL.createObjectURL(blob);


        const link =
            document.createElement("a");


        link.href =
            url;


        /*
           NOME FINAL

           fichaAlien - [Primeiro Nome].pdf
        */

        link.download =
            `fichaAlien - ${firstName()}.pdf`;


        document.body.appendChild(link);


        link.click();


        link.remove();


        setTimeout(
            () => URL.revokeObjectURL(url),
            1000
        );


        showToast(
            `PDF criado: fichaAlien - ${firstName()}.pdf`
        );


    } catch (error) {

        console.error(error);


        showToast(
            "Não foi possível preencher o PDF. Veja o console para detalhes."
        );

    }

}



/* ============================================================
   EVENTOS
============================================================ */

function bindEvents() {


    /*
       Inputs
    */

    document.addEventListener(
        "input",
        event => {

            if (
                event.target.matches(
                    "input, textarea, select"
                ) &&
                event.target.id
            ) {

                updateField(
                    event.target
                );

            }

        }
    );



    /*
       Tipo
    */

    $("characterType")
        .addEventListener(
            "change",
            event => {

                setCharacterType(
                    event.target.value
                );

            }
        );



    document.addEventListener(
        "change",
        event => {

            const select = event.target.closest(
                ".career-equipment-select"
            );

            if (!select) return;

            selectEquipment(
                Number(select.dataset.equipmentGroup),
                select.value
            );

        }
    );


    /*
       Botões dinâmicos
    */

    document.addEventListener(
        "click",
        event => {

            const target =
                event.target.closest(
                    "button"
                );


            if (!target)
                return;




            if (target.dataset.career) {

                setCareer(
                    target.dataset.career
                );

                return;

            }


            if (target.dataset.attrMinus) {

                changeAttribute(
                    target.dataset.attrMinus,
                    -1
                );

            }


            if (target.dataset.attrPlus) {

                changeAttribute(
                    target.dataset.attrPlus,
                    1
                );

            }


            if (target.dataset.skillMinus) {

                changeSkill(
                    target.dataset.skillMinus,
                    -1
                );

            }


            if (target.dataset.skillPlus) {

                changeSkill(
                    target.dataset.skillPlus,
                    1
                );

            }


            if (target.dataset.androidChoice) {

                selectAndroidBonus(
                    target.dataset.androidChoice
                );

            }


            if (target.dataset.talent) {

                state.data.talent =
                    target.dataset.talent;


                renderTalents();

                renderPreview();

                renderReview();

            }


        }
    );




    /*
       Salvar
    */

    $("btnSalvar")
        .addEventListener(
            "click",
            saveCharacter
        );


    $("btnSalvarTopo")
        .addEventListener(
            "click",
            saveCharacter
        );



    /*
       Carregar
    */

    $("btnCarregar")
        .addEventListener(
            "click",
            loadCharacter
        );


    $("btnCarregarTopo")
        .addEventListener(
            "click",
            loadCharacter
        );



    /*
       Exportar
    */

    $("btnExportar")
        .addEventListener(
            "click",
            exportPdf
        );


}



/* ============================================================
   API PARA OUTROS MÓDULOS
============================================================ */

function updateValueFromViewer(key, value) {

    if (key === "career") {
        setCareer(value);
        return;
    }

    if (key === "characterType") {
        setCharacterType(value);
        return;
    }

    if (!(key in state.data))
        return;

    state.data[key] = value;

    renderPreview();
    renderReview();

}

window.AlienFichaAPI = {

    getData() {
        return JSON.parse(JSON.stringify(state.data));
    },

    getAttributes() {
        return Object.entries(ATTRIBUTES).map(([key, attr]) => ({
            key,
            name: attr.name,
            value: state.data.attributes[key]
        }));
    },

    getSkills() {
        return Object.entries(SKILLS).map(([key, skill]) => ({
            key,
            name: skill.name,
            value: state.data.skills[key]
        }));
    },

    updateValue: updateValueFromViewer,

    changeAttribute,
    changeSkill,

    save: saveCharacter,

    refresh() {
        renderAll();
    }
};


/* ============================================================
   INICIALIZAÇÃO
============================================================ */

function init() {

    fillInputsFromState();


    bindEvents();


    renderAll();


}


init();