function atualizarSaudacao() {
    var saudacao = document.getElementById("saudacao");
    if (!saudacao) {
        return;
    }

    var agora = new Date();
    var hora = agora.getHours();
    var mensagem = "Bem-vindo ao petshop!";

    if (hora < 12) {
        mensagem = "Bom dia! Confira nossas ofertas para seu pet.";
    } else if (hora < 18) {
        mensagem = "Boa tarde! Temos servicos e produtos especiais hoje.";
    } else {
        mensagem = "Boa noite! Agende o atendimento do seu pet.";
    }

    saudacao.textContent = mensagem;
}

function configurarDataMinima() {
    var campoData = document.getElementById("dataAgendamento");
    if (!campoData) {
        return;
    }

    var hoje = new Date();
    var ano = hoje.getFullYear();
    var mes = String(hoje.getMonth() + 1).padStart(2, "0");
    var dia = String(hoje.getDate()).padStart(2, "0");
    campoData.min = ano + "-" + mes + "-" + dia;
}

function calcularEstimativa() {
    var servico = document.getElementById("servico");
    var metodo = document.getElementById("metodoAgendamento");
    var campoEstimativa = document.getElementById("estimativa");

    if (!servico || !metodo || !campoEstimativa) {
        return;
    }

    var valor = 0;
    if (servico.value === "Banho") {
        valor += 60;
    } else if (servico.value === "Tosa") {
        valor += 75;
    }

    if (metodo.value === "Tele-busca") {
        valor += 15;
    }

    campoEstimativa.value = "R$ " + valor.toFixed(2).replace(".", ",");
}

function configurarFormulario() {
    var form = document.getElementById("form-agendamento");
    if (!form) {
        return;
    }

    var cpf = document.getElementById("cpfCliente");
    var telefone = document.getElementById("telefoneCliente");
    var servico = document.getElementById("servico");
    var metodo = document.getElementById("metodoAgendamento");
    var resultado = document.getElementById("resultadoAgendamento");

    cpf.addEventListener("input", function () {
        var valor = cpf.value.replace(/\D/g, "").slice(0, 11);
        cpf.value = valor
            .replace(/^(\d{3})(\d)/, "$1.$2")
            .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
            .replace(/\.(\d{3})(\d)/, ".$1-$2");
    });

    telefone.addEventListener("input", function () {
        var valor = telefone.value.replace(/\D/g, "").slice(0, 11);
        if (valor.length <= 10) {
            telefone.value = valor
                .replace(/^(\d{2})(\d)/g, "($1) $2")
                .replace(/(\d)(\d{4})$/, "$1-$2");
        } else {
            telefone.value = valor
                .replace(/^(\d{2})(\d)/g, "($1) $2")
                .replace(/(\d)(\d{4})$/, "$1-$2");
        }
    });

    servico.addEventListener("change", calcularEstimativa);
    metodo.addEventListener("change", calcularEstimativa);

    form.addEventListener("submit", function (event) {
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
            form.classList.add("was-validated");
            return;
        }

        event.preventDefault();
        form.classList.remove("was-validated");

        var nomeCliente = document.getElementById("nomeCliente").value;
        var nomePet = document.getElementById("nomePet").value;
        var data = document.getElementById("dataAgendamento").value;
        var hora = document.getElementById("horaAgendamento").value;

        resultado.classList.remove("d-none");
        resultado.textContent =
            "Agendamento confirmado para " +
            nomeCliente +
            " e o pet " +
            nomePet +
            " em " +
            data +
            " às " +
            hora +
            ". Valor estimado: " +
            document.getElementById("estimativa").value +
            ".";
    });

    form.addEventListener("reset", function () {
        if (resultado) {
            resultado.classList.add("d-none");
            resultado.textContent = "";
        }

        setTimeout(function () {
            calcularEstimativa();
        }, 0);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    atualizarSaudacao();
    configurarDataMinima();
    configurarFormulario();
    calcularEstimativa();
});
