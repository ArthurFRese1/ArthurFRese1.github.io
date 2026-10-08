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

    step: 1,

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


    const icons = [
        "⚔", "★", "◆", "●", "✚",
        "▣", "✈", "⚙", "⌕"
    ];


    Object.entries(CAREERS).forEach(
        ([name, career], index) => {

            const card =
                document.createElement("button");


            card.type = "button";

            card.className =
                `career-card ${
                    state.data.career === name
                        ? "selected"
                        : ""
                }`;

            card.dataset.career = name;


            const skillNames =
                career.skills
                    .map(key => SKILLS[key]?.name || key)
                    .join(" • ");


            card.innerHTML = `

                <div class="career-card-icon">
                    ${icons[index] || "◆"}
                </div>

                <div class="career-card-body">

                    <strong>
                        ${name}
                    </strong>

                    <small>
                        Atributo principal: 
                        ${ATTRIBUTES[career.main].name}
                    </small>

                    <div class="career-card-skills">
                        ${skillNames}
                    </div>

                    <div class="career-card-talent">
                        3 talentos disponíveis
                    </div>

                </div>

                ${
                    state.data.career === name
                        ? '<div class="career-card-check">✓</div>'
                        : ""
                }

            `;


            container.appendChild(card);

        }
    );


    const selectedInfo =
        $("careerSelectedInfo");


    if (selectedInfo) {

        const career =
            currentCareer();


        selectedInfo.textContent =
            career
                ? `${state.data.career} selecionada. Atributo principal: ${ATTRIBUTES[career.main].name}.`
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

    renderAttributes();

    renderSkills();

    renderTalents();

    renderPreview();

    renderReview();

}



/* ============================================================
   NAVEGAÇÃO
============================================================ */

function setStep(step) {

    state.step =
        Math.max(
            1,
            Math.min(7, step)
        );

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

        $("career").value =
            state.data.career;

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

        showToast(
            "Reduza os valores que ultrapassam os limites da nova carreira antes de trocar."
        );


        return;

    }


    state.data.career =
        value;


    state.data.talent =
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

        setStep(7);


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
   VISUALIZAÇÃO EM NOVA ABA
============================================================ */

function openViewerInNewTab() {

    const data = JSON.parse(JSON.stringify(state.data));

    const win = window.open("", "_blank");

    if (!win) {
        showToast("O navegador bloqueou a nova aba. Permita pop-ups para este site.");
        return;
    }

    const esc = value => String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

    const attributeRows = Object.entries(ATTRIBUTES).map(([key, attr]) => `
        <div class="stat">
            <span>${esc(attr.name)}</span>
            <strong>${esc(data.attributes[key])}</strong>
        </div>
    `).join("");

    const skillRows = Object.entries(SKILLS).map(([key, skill]) => `
        <div class="skill">
            <span>${esc(skill.name)}</span>
            <strong>${esc(data.skills[key])}</strong>
        </div>
    `).join("");

    win.document.write(`<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Ficha — ${esc(data.name || "Sem Nome")}</title>
<style>
*{box-sizing:border-box}body{margin:0;background:#090a0b;color:#eee;font-family:Arial,sans-serif;padding:28px}.toolbar{max-width:1000px;margin:0 auto 18px;display:flex;gap:10px;justify-content:flex-end}.toolbar button{background:#ff5b16;color:white;border:0;border-radius:8px;padding:10px 16px;font-weight:bold;cursor:pointer}.toolbar button.secondary{background:#202326;border:1px solid #444}.sheet{max-width:1000px;margin:auto;border:1px solid #4a4a4a;border-radius:14px;background:#151718;box-shadow:0 10px 35px #0008;overflow:hidden}.head{padding:26px;border-bottom:1px solid #3a3a3a;background:linear-gradient(135deg,#17191a,#101112)}.eyebrow{color:#ff6a1a;font-weight:bold;letter-spacing:2px;font-size:13px}.head h1{margin:7px 0;font-family:Georgia,serif;font-size:34px}.head p{margin:0;color:#aaa}.section{padding:22px 26px;border-bottom:1px solid #343434}.section:last-child{border-bottom:0}.section h2{margin:0 0 16px;font-family:Georgia,serif;font-size:21px}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.box{border:1px solid #3b3b3b;border-radius:9px;padding:12px;background:#111314}.box small{display:block;color:#888;text-transform:uppercase;font-size:10px;margin-bottom:5px}.box strong{font-size:15px}.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}.stat,.skill{border:1px solid #3b3b3b;border-radius:9px;padding:12px;background:#111314;display:flex;justify-content:space-between;gap:10px}.stat span,.skill span{color:#bbb}.stat strong,.skill strong{color:#ff6a1a}.skills{display:grid;grid-template-columns:repeat(2,1fr);gap:8px}.text{white-space:pre-wrap;color:#ddd;line-height:1.5;min-height:45px}@media(max-width:700px){body{padding:12px}.grid,.stats,.skills{grid-template-columns:1fr}.toolbar{justify-content:stretch}.toolbar button{flex:1}}
</style>
</head>
<body>
<div class="toolbar"><button class="secondary" onclick="window.close()">← Voltar</button></div>
<main class="sheet">
<header class="head"><span class="eyebrow">ALIEN RPG</span><h1>${esc(data.name || "Personagem sem nome")}</h1><p>${esc(data.career || "Carreira não escolhida")} · ${data.characterType === "android" ? "Androide" : "Humano"}</p></header>
<section class="section"><h2>Identidade</h2><div class="grid">
<div class="box"><small>Nome</small><strong>${esc(data.name)}</strong></div><div class="box"><small>Carreira</small><strong>${esc(data.career)}</strong></div><div class="box"><small>Tipo</small><strong>${data.characterType === "android" ? "Androide" : "Humano"}</strong></div><div class="box"><small>Idade</small><strong>${esc(data.age)}</strong></div><div class="box"><small>Altura</small><strong>${esc(data.height)}</strong></div><div class="box"><small>Peso</small><strong>${esc(data.weight)}</strong></div></div></section>
<section class="section"><h2>Atributos</h2><div class="stats">${attributeRows}</div></section>
<section class="section"><h2>Habilidades</h2><div class="skills">${skillRows}</div></section>
<section class="section"><h2>Talento</h2><div class="box"><strong>${esc(data.talent || "—")}</strong></div></section>
<section class="section"><h2>Relacionamentos</h2><div class="grid"><div class="box"><small>Camarada</small><strong>${esc(data.buddy || "—")}</strong></div><div class="box"><small>Rival</small><strong>${esc(data.rival || "—")}</strong></div><div class="box"><small>Meta pessoal</small><strong>${esc(data.goal || "—")}</strong></div></div></section>
<section class="section"><h2>História e Equipamento</h2><div class="grid"><div class="box"><small>História</small><div class="text">${esc(data.history || "—")}</div></div><div class="box"><small>Equipamento</small><div class="text">${esc(data.gear || "—")}</div></div><div class="box"><small>Armas</small><div class="text">${esc(data.weapons || "—")}</div></div><div class="box"><small>Armadura</small><div class="text">${esc(data.armor || "—")}</div></div></div></section>
</main>
</body></html>`);

    win.document.close();
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
       Carreira
    */

    document.addEventListener(
        "click",
        event => {

            const card =
                event.target.closest(
                    "[data-career]"
                );


            if (!card)
                return;


            setCareer(
                card.dataset.career
            );

        }
    );



    /*
       Tipo
    */

    const characterType = $("characterType");

    if (characterType) {
        characterType.addEventListener(
            "change",
            event => {
                setCharacterType(event.target.value);
            }
        );
    }



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


            if (target.dataset.step) {

                setStep(
                    Number(
                        target.dataset.step
                    )
                );

            }

        }
    );




    /*
       Salvar
    */

    const btnSalvar = $("btnSalvar");
    const btnSalvarTopo = $("btnSalvarTopo");
    const btnCarregar = $("btnCarregar");
    const btnCarregarTopo = $("btnCarregarTopo");
    const btnExportar = $("btnExportar");

    if (btnSalvar) btnSalvar.addEventListener("click", saveCharacter);
    if (btnSalvarTopo) btnSalvarTopo.addEventListener("click", saveCharacter);
    if (btnCarregar) btnCarregar.addEventListener("click", loadCharacter);
    if (btnCarregarTopo) btnCarregarTopo.addEventListener("click", loadCharacter);
    if (btnExportar) btnExportar.addEventListener("click", exportPdf);


    /*
       Visualizar em nova aba
    */

    const openViewer = event => {
        event.preventDefault();
        event.stopImmediatePropagation();
        openViewerInNewTab();
    };

    const btnVisualizarFicha = $("btnVisualizarFicha");
    const btnVisualizarLateral = $("btnVisualizarLateral");

    if (btnVisualizarFicha) {
        btnVisualizarFicha.addEventListener("click", openViewer, true);
    }

    if (btnVisualizarLateral) {
        btnVisualizarLateral.addEventListener("click", openViewer, true);
    }


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

    renderCareers();


    fillInputsFromState();


    bindEvents();


    renderAll();


    setStep(1);

}


init();