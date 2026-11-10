// ==========================================
// 1. CLASSE ENDEREÇO
// ==========================================
class Endereco {
    #logradouro;
    #numero;
    #cidade;
    #uf;

    constructor(logradouro, numero, cidade, uf) {
        this.#logradouro = logradouro;
        this.#numero = numero;
        this.#cidade = cidade;
        this.#uf = uf;
    }
}

// ==========================================
// 2. CLASSE MÃE (PESSOA)
// ==========================================
class Pessoa {
    #nome;
    #endereco;

    constructor(nome, endereco) {
        this.nome = nome;
        this.endereco = endereco;
    }

    get nome() {
        return this.#nome;
    }

    set nome(valor) {
        if (!valor || valor.trim().length < 3) {
            throw new Error("O nome deve ter ao menos 3 caracteres.");
        }
        this.#nome = valor;
    }

    get endereco() {
        return this.#endereco;
    }

    set endereco(valor) {
        this.#endereco = valor;
    }
}

// ==========================================
// 3. CLASSE FILHA: PESSOA FÍSICA
// ==========================================
class PessoaFisica extends Pessoa {
    #cpf;
    #dataNascimento;

    constructor(nome, endereco, cpf, dataNascimento) {
        super(nome, endereco);
        this.cpf = cpf;
        this.dataNascimento = dataNascimento;
    }

    get cpf() {
        return this.#cpf;
    }

    set cpf(valor) {
        const cpfLimpo = valor ? valor.replace(/[^\d]/g, '') : '';
        if (cpfLimpo.length !== 11) {
            throw new Error("O CPF deve ter exatamente 11 dígitos.");
        }
        this.#cpf = cpfLimpo;
    }

    get dataNascimento() {
        return this.#dataNascimento;
    }

    set dataNascimento(valor) {
        const data = new Date(valor + "T00:00:00");
        if (isNaN(data.getTime())) {
            throw new Error("Data de nascimento inválida.");
        }
        if (data > new Date()) {
            throw new Error("A data de nascimento não pode estar no futuro.");
        }
        this.#dataNascimento = data;
    }
}

// ==========================================
// 4. CLASSE FILHA: PESSOA JURÍDICA
// ==========================================
class PessoaJuridica extends Pessoa {
    #cnpj;
    #razaoSocial;

    constructor(nome, endereco, cnpj, razaoSocial) {
        super(nome, endereco);
        this.cnpj = cnpj;
        this.razaoSocial = razaoSocial;
    }

    get cnpj() {
        return this.#cnpj;
    }

    set cnpj(valor) {
        const cnpjLimpo = valor ? valor.replace(/[^\d]/g, '') : '';
        if (cnpjLimpo.length !== 14) {
            throw new Error("O CNPJ deve ter exatamente 14 dígitos.");
        }
        this.#cnpj = cnpjLimpo;
    }

    get razaoSocial() {
        return this.#razaoSocial;
    }

    set razaoSocial(valor) {
        if (!valor || valor.trim() === '') {
            throw new Error("A razão social é obrigatória.");
        }
        this.#razaoSocial = valor;
    }
}

// ==========================================
// 5. EXECUÇÃO E CENÁRIOS DE TESTE (TRY/CATCH)
// ==========================================

const listaClientes = [];
const enderecoPadrao = new Endereco("Av. Senai", "1000", "Natal", "RN");

console.log("--- INICIANDO TESTES DE CADASTRO ---\n");

// Cenário 1: Pessoa Física Válida
try {
    const pfValida = new PessoaFisica("Ana Souza", enderecoPadrao, "123.456.789-00", "1995-05-20");
    listaClientes.push(pfValida);
    console.log("✅ Sucesso: Pessoa Física cadastrada.");
} catch (erro) {
    console.error("❌ Erro PF Válida:", erro.message);
}

// Cenário 2: Pessoa Jurídica Válida
try {
    const pjValida = new PessoaJuridica("Electronic Comércio", enderecoPadrao, "12.345.678/0001-99", "Electronic LTDA");
    listaClientes.push(pjValida);
    console.log("✅ Sucesso: Pessoa Jurídica cadastrada.");
} catch (erro) {
    console.error("❌ Erro PJ Válida:", erro.message);
}

// Cenário 3: Pessoa Física Inválida (CPF incompleto)
try {
    const pfInvalida = new PessoaFisica("João", enderecoPadrao, "123.456", "1990-01-01");
    listaClientes.push(pfInvalida);
    console.log("✅ Sucesso: Pessoa Física cadastrada.");
} catch (erro) {
    console.error("❌ Erro PF Inválida:", erro.message);
}
// Cenário 4: Pessoa Jurídica Inválida (Razão Social vazia)
try {
    const pjInvalida = new PessoaJuridica("Empresa X", enderecoPadrao, "12.345.678/0001-99", "");
    listaClientes.push(pjInvalida);
    console.log("✅ Sucesso: Pessoa Jurídica cadastrada.");
} catch (erro) {
    console.error("❌ Erro PJ Inválida:", erro.message);
}

// Exibição dos cadastros válidos
console.log("\n--- CLIENTES VÁLIDOS CADASTRADOS ---");
console.log(listaClientes);