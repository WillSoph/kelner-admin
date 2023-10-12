export default class Cliente {
    #id: string
    #admin: string
    #nome: string
    #categoria: string
    #preco: number

    constructor(nome: string, categoria: string, preco: number, id: string = null, admin?: string) {
        this.#nome = nome;
        this.#categoria = categoria;
        this.#preco = preco;

        // Corrigindo a ordem dos parâmetros para evitar confusão
        this.#id = id;
        this.#admin = admin;
    }

    static vazio() {
        return new Cliente('', '', 0);
    }

    get id() {
        return this.#id;
    }

    get admin() {
        return this.#admin;
    }

    get nome() {
        return this.#nome;
    }

    get categoria() {
        return this.#categoria;
    }

    get preco() {
        return this.#preco;
    }
}