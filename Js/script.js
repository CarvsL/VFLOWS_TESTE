document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('btn-salvar').onclick = function(event) {
        event.preventDefault();

        const errors = [];
        const fornecedorData = {
            razaoSocial: document.getElementById('razao-social').value,
            nomeFantasia: document.getElementById('nome-fantasia').value,
            cnpj: document.getElementById('cnpj').value,
            inscricaoEstadual: document.getElementById('inscricao-estadual').value,
            inscricaoMunicipal: document.getElementById('inscricao-municipal').value,
            cep: document.getElementById('cep').value,
            endereco: document.getElementById('endereco').value,
            numero: document.getElementById('numero').value,
            complemento: document.getElementById('complemento').value,
            bairro: document.getElementById('bairro').value,
            municipio: document.getElementById('municipio').value,
            estado: document.getElementById('estado').value,
            nomeContato: document.getElementById('nome-contato').value,
            telefoneContato: document.getElementById('telefone').value,
            emailContato: document.getElementById('email').value,
            produtos: [],
            anexos: []
        };

        if (!fornecedorData.razaoSocial) errors.push("Razão Social é obrigatório.");
        if (!fornecedorData.nomeFantasia) errors.push("Nome Fantasia é obrigatório.");
        if (!fornecedorData.cnpj || fornecedorData.cnpj.length < 14) errors.push("CNPJ deve ser preenchido completamente.");
        if (!fornecedorData.endereco) errors.push("Endereço é obrigatório.");
        if (!fornecedorData.numero) errors.push("Número é obrigatório.");
        if (!fornecedorData.nomeContato) errors.push("Nome da pessoa de contato é obrigatório.");
        if (!fornecedorData.telefoneContato || fornecedorData.telefoneContato.replace(/\D/g, '').length < 10) {
            errors.push("Telefone deve ser preenchido completamente.");
        }
        if (!fornecedorData.emailContato) errors.push("E-mail é obrigatório.");

        const productList = document.getElementById('product-list').children;
        if (productList.length === 0) {
            errors.push("Pelo menos 1 produto deve ser incluído.");
        } else {
            for (let i = 0; i < productList.length; i++) {
                const product = productList[i];
                const descricaoProduto = product.querySelector(`[id^="produto-nome-"]`)?.value || '';
                const unidadeMedida = product.querySelector(`[id^="produto-unidade-"]`)?.value || '';
                const qtdeEstoque = product.querySelector(`[id^="produto-quantidade-"]`)?.value || '';
                const valorUnitario = parseFloat(product.querySelector(`[id^="produto-preco-"]`)?.value.replace(',', '.') || 0);

                if (!descricaoProduto) errors.push(`Descrição do Produto ${i + 1} é obrigatório.`);
                if (!unidadeMedida) errors.push(`Unidade de Medida do Produto ${i + 1} é obrigatória.`);
                if (!qtdeEstoque) errors.push(`Quantidade em Estoque do Produto ${i + 1} é obrigatória.`);
                if (valorUnitario <= 0) errors.push(`Valor Unitário do Produto ${i + 1} é obrigatório.`);
            }
        }

        const anexoList = document.getElementById('anexo-list').children;
        if (anexoList.length === 0) {
            errors.push("Pelo menos 1 anexo deve ser incluído.");
        }

        if (errors.length > 0) {
            alert(errors.join("\n"));
            return;
        }

        $('#loadingModal').modal('show');

        for (let i = 0; i < productList.length; i++) {
            const product = productList[i];
            fornecedorData.produtos.push({
                indice: i + 1,
                descricaoProduto: product.querySelector(`[id^="produto-nome-"]`)?.value || '',
                unidadeMedida: product.querySelector(`[id^="produto-unidade-"]`)?.value || '',
                qtdeEstoque: product.querySelector(`[id^="produto-quantidade-"]`)?.value || 0,
                valorUnitario: parseFloat(product.querySelector(`[id^="produto-preco-"]`)?.value.replace(',', '.') || 0),
                valorTotal: parseFloat(product.querySelector(`[id^="produto-total-"]`)?.value.replace('R$ ', '').replace(',', '.') || 0)
            });
        }

        for (let i = 0; i < anexoList.length; i++) {
            const anexo = anexoList[i];
            const nomeArquivo = anexo.querySelector('p').innerText;
            const anexoId = anexo.getAttribute('data-anexo-id');

            if (nomeArquivo && anexoId) {
                fornecedorData.anexos.push({
                    indice: i + 1,
                    nomeArquivo: nomeArquivo,
                    blobArquivo: sessionStorage.getItem(anexoId)
                });
            }
        }

        console.log(JSON.stringify(fornecedorData, null, 2));

        function downloadJSON(content, filename) {
            const blob = new Blob([content], { type: 'application/json' });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }

        downloadJSON(JSON.stringify(fornecedorData, null, 2), 'fornecedor.json');

        setTimeout(() => {
            $('#loadingModal').modal('hide');
        }, 2000);
    };
});
