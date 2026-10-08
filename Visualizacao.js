/* ============================================================
   VISUALIZAÇÃO FINAL — ALIEN RPG

   Abre a ficha em uma NOVA ABA do navegador.
   A ficha continua editável e usa os mesmos dados do criador.
============================================================ */

(function () {
    let viewerWindow = null;

    function esc(value) {
        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function getData() {
        return window.AlienFichaAPI
            ? window.AlienFichaAPI.getData()
            : null;
    }

    function getAttributes() {
        return window.AlienFichaAPI
            ? window.AlienFichaAPI.getAttributes()
            : [];
    }

    function getSkills() {
        return window.AlienFichaAPI
            ? window.AlienFichaAPI.getSkills()
            : [];
    }

    function field(key, label, value, type = "text") {
        return `
            <label class="field">
                <span>${esc(label)}</span>
                <input
                    type="${type}"
                    data-field="${esc(key)}"
                    value="${esc(value)}"
                >
            </label>
        `;
    }

    function textarea(key, label, value) {
        return `
            <label class="field field-wide">
                <span>${esc(label)}</span>
                <textarea data-field="${esc(key)}" rows="5">${esc(value)}</textarea>
            </label>
        `;
    }

    function stepper(type, key, label, value) {
        return `
            <div class="stepper">
                <div>
                    <span>${esc(label)}</span>
                    <small>${type === "attribute" ? "Atributo" : "Habilidade"}</small>
                </div>
                <div class="stepper-controls">
                    <button type="button" data-minus="${esc(type)}:${esc(key)}">−</button>
                    <strong>${esc(value)}</strong>
                    <button type="button" data-plus="${esc(type)}:${esc(key)}">+</button>
                </div>
            </div>
        `;
    }

    function buildPage() {
        const data = getData();
        if (!data) return "";

        const attributes = getAttributes();
        const skills = getSkills();

        return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>ALIEN RPG — Ficha de ${esc(data.name || "Personagem")}</title>
<style>
    * { box-sizing: border-box; }

    :root {
        color-scheme: dark;
        --bg: #080909;
        --panel: #111314;
        --panel-2: #17191a;
        --line: #3b3f40;
        --orange: #ff641c;
        --orange-soft: rgba(255,100,28,.16);
        --text: #f0f0ed;
        --muted: #9b9e9d;
    }

    body {
        margin: 0;
        padding: 34px 18px 60px;
        background:
            radial-gradient(circle at top, rgba(255,100,28,.07), transparent 35%),
            var(--bg);
        color: var(--text);
        font-family: Arial, Helvetica, sans-serif;
    }

    .page {
        width: min(100%, 1050px);
        margin: 0 auto;
    }

    .top {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        gap: 20px;
        margin-bottom: 22px;
        padding: 0 4px;
    }

    .eyebrow {
        display: block;
        color: var(--orange);
        font-size: 12px;
        font-weight: 800;
        letter-spacing: 2px;
        margin-bottom: 5px;
    }

    h1 {
        margin: 0;
        font-family: Georgia, serif;
        font-size: clamp(32px, 5vw, 52px);
    }

    .top small { color: var(--muted); }

    .sheet {
        border: 1px solid #55595a;
        border-radius: 16px;
        background: linear-gradient(145deg, #151718, #0e1011);
        box-shadow: 0 18px 60px rgba(0,0,0,.45), inset 0 1px rgba(255,255,255,.04);
        overflow: hidden;
    }

    .sheet-header {
        padding: 26px;
        border-bottom: 1px solid var(--line);
        background: linear-gradient(135deg, rgba(255,100,28,.12), transparent 50%);
    }

    .identity-title {
        display: flex;
        align-items: center;
        gap: 16px;
    }

    .mark {
        width: 54px;
        height: 54px;
        display: grid;
        place-items: center;
        border: 1px solid var(--orange);
        border-radius: 12px;
        color: var(--orange);
        font-size: 24px;
    }

    .identity-title h2 {
        margin: 0 0 5px;
        font-family: Georgia, serif;
        font-size: 30px;
    }

    .identity-title p { margin: 0; color: var(--muted); }

    .quick-stats {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
        margin-top: 20px;
    }

    .quick-stat {
        border: 1px solid var(--line);
        border-radius: 10px;
        padding: 12px;
        background: rgba(255,255,255,.025);
    }

    .quick-stat span {
        display: block;
        color: var(--muted);
        font-size: 10px;
        letter-spacing: 1.4px;
        margin-bottom: 5px;
    }

    .quick-stat strong { font-size: 20px; }

    .section {
        padding: 24px 26px;
        border-bottom: 1px solid var(--line);
    }

    .section:last-child { border-bottom: 0; }

    .section h3 {
        margin: 0 0 16px;
        font-family: Georgia, serif;
        font-size: 23px;
    }

    .grid {
        display: grid;
        gap: 12px;
    }

    .grid.two { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .grid.three { grid-template-columns: repeat(3, minmax(0, 1fr)); }

    .field {
        display: flex;
        flex-direction: column;
        gap: 7px;
    }

    .field-wide { margin-top: 12px; }

    .field span {
        color: #bfc1c0;
        font-size: 11px;
        font-weight: 800;
        letter-spacing: 1px;
        text-transform: uppercase;
    }

    input, textarea {
        width: 100%;
        border: 1px solid #484c4d;
        border-radius: 8px;
        background: #0c0e0f;
        color: var(--text);
        padding: 11px 12px;
        font: inherit;
        outline: none;
        transition: border-color .15s, box-shadow .15s;
    }

    textarea { resize: vertical; min-height: 105px; }

    input:focus, textarea:focus {
        border-color: var(--orange);
        box-shadow: 0 0 0 2px var(--orange-soft);
    }

    .stat-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 10px;
    }

    .stepper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 14px;
        border: 1px solid var(--line);
        border-radius: 10px;
        padding: 12px;
        background: rgba(255,255,255,.02);
    }

    .stepper span { display: block; font-weight: 700; }
    .stepper small { color: var(--muted); }

    .stepper-controls {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .stepper-controls button,
    .actions button {
        border: 1px solid #55595a;
        border-radius: 8px;
        background: #17191a;
        color: var(--text);
        cursor: pointer;
    }

    .stepper-controls button {
        width: 32px;
        height: 32px;
        font-size: 18px;
    }

    .stepper-controls button:hover,
    .actions button:hover { border-color: var(--orange); }

    .stepper-controls strong {
        min-width: 28px;
        text-align: center;
    }

    .actions {
        display: flex;
        justify-content: space-between;
        gap: 12px;
        margin-top: 22px;
    }

    .actions button {
        padding: 12px 18px;
        font-weight: 700;
    }

    .actions .primary {
        background: var(--orange);
        border-color: var(--orange);
        color: #fff;
    }

    @media (max-width: 720px) {
        body { padding: 18px 10px 40px; }
        .top { align-items: flex-start; flex-direction: column; }
        .grid.two, .grid.three, .stat-grid { grid-template-columns: 1fr; }
        .sheet-header, .section { padding: 20px 16px; }
        .quick-stats { grid-template-columns: 1fr; }
    }
</style>
</head>
<body>
<div class="page">
    <div class="top">
        <div>
            <span class="eyebrow">PRÉ-VISUALIZAÇÃO</span>
            <h1>Ficha</h1>
        </div>
        <small>Ficha editável · ALIEN RPG</small>
    </div>

    <main id="sheet" class="sheet">
        ${renderSheet(data, attributes, skills)}
    </main>
</div>
<script>
(function () {
    const openerWindow = window.opener;

    function api() {
        return openerWindow && openerWindow.AlienFichaAPI
            ? openerWindow.AlienFichaAPI
            : null;
    }

    function renderAgain() {
        if (!openerWindow || openerWindow.closed || !api()) return;
        const data = api().getData();
        const attributes = api().getAttributes();
        const skills = api().getSkills();
        document.getElementById("sheet").innerHTML = openerWindow.__AlienViewerRender(data, attributes, skills);
        bind();
    }

    function bind() {
        document.querySelectorAll("[data-field]").forEach(function (element) {
            element.addEventListener("change", function () {
                const currentApi = api();
                if (!currentApi) return;
                currentApi.updateValue(
                    element.dataset.field,
                    element.type === "number" ? Number(element.value || 0) : element.value
                );
                currentApi.save();
            });
        });

        document.querySelectorAll("[data-minus], [data-plus]").forEach(function (button) {
            button.addEventListener("click", function () {
                const currentApi = api();
                if (!currentApi) return;
                const source = button.dataset.minus || button.dataset.plus;
                const parts = source.split(":");
                const type = parts[0];
                const key = parts[1];
                const delta = button.dataset.plus ? 1 : -1;

                if (type === "attribute") currentApi.changeAttribute(key, delta);
                else currentApi.changeSkill(key, delta);

                currentApi.save();
                renderAgain();
            });
        });
    }

    window.addEventListener("storage", renderAgain);
    bind();
})();
</script>
</body>
</html>`;
    }

    function renderSheet(data, attributes, skills) {
        const attrHtml = attributes.map(item => stepper("attribute", item.key, item.name, item.value)).join("");
        const skillHtml = skills.map(item => stepper("skill", item.key, item.name, item.value)).join("");

        return `
            <section class="sheet-header">
                <div class="identity-title">
                    <div class="mark">◆</div>
                    <div>
                        <span class="eyebrow">ALIEN RPG</span>
                        <h2>${esc(data.name || "Personagem sem nome")}</h2>
                        <p>${esc(data.career || "Carreira não escolhida")} · ${data.characterType === "android" ? "Androide" : "Humano"}</p>
                    </div>
                </div>

                <div class="quick-stats">
                    <div class="quick-stat"><span>VITALIDADE</span><strong>${esc(data.attributes?.forca ?? 0)}</strong></div>
                    <div class="quick-stat"><span>ESTRESSE</span><strong>${esc(data.stress ?? 0)}</strong></div>
                    <div class="quick-stat"><span>EXPERIÊNCIA</span><strong>${esc(data.xp ?? 0)}</strong></div>
                </div>
            </section>

            <section class="section">
                <h3>Identidade</h3>
                <div class="grid three">
                    ${field("name", "Nome", data.name)}
                    ${field("career", "Carreira", data.career)}
                    ${field("xp", "Experiência", data.xp, "number")}
                    ${field("age", "Idade", data.age)}
                    ${field("height", "Altura", data.height)}
                    ${field("weight", "Peso", data.weight)}
                    ${field("eyes", "Olhos", data.eyes)}
                    ${field("skin", "Pele", data.skin)}
                    ${field("hair", "Cabelos", data.hair)}
                </div>
                ${textarea("appearance", "Aparência", data.appearance)}
            </section>

            <section class="section">
                <h3>Atributos</h3>
                <div class="stat-grid">${attrHtml}</div>
            </section>

            <section class="section">
                <h3>Habilidades</h3>
                <div class="stat-grid">${skillHtml}</div>
            </section>

            <section class="section">
                <h3>Talento</h3>
                ${field("talent", "Talento escolhido", data.talent)}
            </section>

            <section class="section">
                <h3>Relacionamentos e história</h3>
                <div class="grid two">
                    ${field("buddy", "Camarada", data.buddy)}
                    ${field("rival", "Rival", data.rival)}
                    ${field("goal", "Meta pessoal", data.goal)}
                    ${textarea("history", "História", data.history)}
                </div>
            </section>

            <section class="section">
                <h3>Equipamento</h3>
                <div class="grid two">
                    ${textarea("gear", "Equipamento", data.gear)}
                    ${textarea("weapons", "Armas", data.weapons)}
                    ${textarea("armor", "Armadura", data.armor)}
                    ${textarea("tinyItems", "Itens pequenos", data.tinyItems)}
                    ${textarea("emotionalItem", "Objeto emocional", data.emotionalItem)}
                </div>
            </section>

            <section class="section">
                <div class="actions">
                    <button type="button" onclick="window.close()">← Voltar ao editor</button>
                    <button type="button" class="primary" onclick="window.opener?.document.getElementById('btnExportar')?.click()">↓ Baixar PDF editável</button>
                </div>
            </section>
        `;
    }

    function field(key, label, value, type = "text") {
        return `
            <label class="field">
                <span>${esc(label)}</span>
                <input type="${type}" data-field="${esc(key)}" value="${esc(value)}">
            </label>
        `;
    }

    function textarea(key, label, value) {
        return `
            <label class="field field-wide">
                <span>${esc(label)}</span>
                <textarea data-field="${esc(key)}" rows="5">${esc(value)}</textarea>
            </label>
        `;
    }

    function stepper(type, key, label, value) {
        return `
            <div class="stepper">
                <div>
                    <span>${esc(label)}</span>
                    <small>${type === "attribute" ? "Atributo" : "Habilidade"}</small>
                </div>
                <div class="stepper-controls">
                    <button type="button" data-minus="${esc(type)}:${esc(key)}">−</button>
                    <strong>${esc(value)}</strong>
                    <button type="button" data-plus="${esc(type)}:${esc(key)}">+</button>
                </div>
            </div>
        `;
    }

    function open() {
        const data = getData();
        if (!data) return;

        // Disponibiliza o renderizador apenas para a nova aba.
        window.__AlienViewerRender = renderSheet;

        if (viewerWindow && !viewerWindow.closed) {
            viewerWindow.focus();
            viewerWindow.location.reload();
            return;
        }

        viewerWindow = window.open("", "AlienRPGFicha", "width=1100,height=850,resizable=yes,scrollbars=yes");

        if (!viewerWindow) {
            alert("O navegador bloqueou a nova aba. Permita pop-ups para este site.");
            return;
        }

        viewerWindow.document.open();
        viewerWindow.document.write(buildPage());
        viewerWindow.document.close();
        viewerWindow.focus();
    }

    window.AlienViewer = {
        open,
        close: function () {
            if (viewerWindow && !viewerWindow.closed) viewerWindow.close();
        },
        render: open
    };

    document.addEventListener("DOMContentLoaded", function () {
        const openButton = document.getElementById("btnVisualizarFicha");
        const openLateralButton = document.getElementById("btnVisualizarLateral");

        openButton?.addEventListener("click", open);
        openLateralButton?.addEventListener("click", open);
    });
})();
