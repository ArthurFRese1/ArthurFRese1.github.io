/* ============================================================
   BANCO DE DADOS LOCAL — ALIEN RPG

   Usa localStorage do navegador.
   Não envia os personagens para a internet.
============================================================ */

(function () {

    const STORAGE_KEY = "alienRpgBancoLocalV01";

    function lerTodos() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            const lista = raw ? JSON.parse(raw) : [];
            return Array.isArray(lista) ? lista : [];
        } catch (error) {
            console.error("Erro ao ler banco local:", error);
            return [];
        }
    }

    function salvarTodos(lista) {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(lista)
        );
    }

    function criarId() {
        return "alien-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8);
    }

    function salvar(personagem) {
        const lista = lerTodos();
        const copia = JSON.parse(JSON.stringify(personagem));

        if (!copia.id) {
            copia.id = criarId();
        }

        copia.updatedAt = new Date().toISOString();

        const index = lista.findIndex(item => item.id === copia.id);

        if (index >= 0) {
            lista[index] = copia;
        } else {
            lista.push(copia);
        }

        salvarTodos(lista);
        return copia;
    }

    function buscar(id) {
        return lerTodos().find(item => item.id === id) || null;
    }

    function listar() {
        return lerTodos().sort((a, b) => {
            return String(b.updatedAt || "").localeCompare(
                String(a.updatedAt || "")
            );
        });
    }

    function excluir(id) {
        const novaLista = lerTodos().filter(item => item.id !== id);
        salvarTodos(novaLista);
    }

    function limpar() {
        localStorage.removeItem(STORAGE_KEY);
    }

    window.AlienDB = {
        salvar,
        buscar,
        listar,
        excluir,
        limpar
    };

})();
