document.addEventListener('DOMContentLoaded', () => {
    function formatCep(cep) {
        cep = cep.replace(/\D/g, '');
        if (cep.length > 5) {
            return cep.slice(0, 5) + '-' + cep.slice(5, 8);
        }
        return cep;
    }

    function clearAddressFields() {
        document.getElementById('endereco').value = '';
        document.getElementById('bairro').value = '';
        document.getElementById('municipio').value = '';
        document.getElementById('estado').value = '';
    }

    function fetchAddressByCep(cep) {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (!data.erro) {
                    document.getElementById('endereco').value = data.logradouro;
                    document.getElementById('bairro').value = data.bairro;
                    document.getElementById('municipio').value = data.localidade;
                    document.getElementById('estado').value = data.uf;
                } else {
                    alert('CEP não encontrado.');
                    clearAddressFields();
                }
            })
            .catch(() => {
                clearAddressFields();
            });
    }

    document.getElementById('cep').addEventListener('input', (event) => {
        const input = event.target;
        const rawValue = input.value.replace(/\D/g, '');
        input.value = formatCep(rawValue);
    });

    document.getElementById('cep').addEventListener('blur', (event) => {
        const rawValue = event.target.value.replace(/\D/g, '');
        if (rawValue.length === 8) {
            fetchAddressByCep(rawValue);
        } else {
            clearAddressFields();
        }
    });
});
