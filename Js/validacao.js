document.addEventListener('DOMContentLoaded', () => {
    function allowOnlyLetters(event) {
        const keyCode = event.keyCode || event.which;
        const char = String.fromCharCode(keyCode);
        const regex = /^[a-zA-Z\s]*$/;
        if (!regex.test(char) && ![8, 37, 39].includes(keyCode)) {
            event.preventDefault();
        }
    }

    function allowOnlyNumbers(event) {
        const keyCode = event.keyCode || event.which;
        const char = String.fromCharCode(keyCode);
        const regex = /^[0-9]*$/;
        if (!regex.test(char) && ![8, 37, 39].includes(keyCode)) {
            event.preventDefault();
        }
    }

    function formatCNPJ(value) {
        value = value.replace(/\D/g, '').slice(0, 14);
        return value
            .replace(/^(\d{2})(\d)/, '$1.$2')
            .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
            .replace(/\.(\d{3})(\d)/, '.$1/$2')
            .replace(/\/(\d{4})(\d)/, '/$1-$2')
            .replace(/-(\d{2})$/, '-$1');
    }

    function formatInscricaoEstadual(value) {
        return value.replace(/\D/g, '').slice(0, 12);
    }

    function formatInscricaoMunicipal(value) {
        return value.replace(/\D/g, '').slice(0, 10);
    }

    function formatPhoneNumber(event) {
        const input = event.target;
        let value = input.value.replace(/\D/g, '').slice(0, 10);
        if (value.length > 6) {
            value = `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`;
        } else if (value.length > 2) {
            value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
        } else {
            value = `(${value}`;
        }
        input.value = value.length < 2 ? value + ')' : value;
    }

    document.querySelectorAll('.text-only').forEach(input => {
        input.addEventListener('keypress', allowOnlyLetters);
    });

    document.querySelectorAll('.number-only').forEach(input => {
        input.addEventListener('keypress', allowOnlyNumbers);
        input.addEventListener('input', () => {
            input.value = input.value.replace(/[^0-9]/g, '');
        });
    });

    const cnpjInput = document.getElementById('cnpj');
    if (cnpjInput) {
        cnpjInput.addEventListener('input', (event) => {
            cnpjInput.value = formatCNPJ(event.target.value);
        });
    }

    const inscricaoEstadualInput = document.getElementById('inscricao-estadual');
    if (inscricaoEstadualInput) {
        inscricaoEstadualInput.addEventListener('input', (event) => {
            inscricaoEstadualInput.value = formatInscricaoEstadual(event.target.value);
        });
    }

    const inscricaoMunicipalInput = document.getElementById('inscricao-municipal');
    if (inscricaoMunicipalInput) {
        inscricaoMunicipalInput.addEventListener('input', (event) => {
            inscricaoMunicipalInput.value = formatInscricaoMunicipal(event.target.value);
        });
    }

    const telefoneInput = document.getElementById('telefone');
    if (telefoneInput) {
        telefoneInput.addEventListener('input', formatPhoneNumber);
    }
});
