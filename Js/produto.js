let productCount = 0;

function addProduct() {
    productCount++;
    const productDiv = $('<div class="border border-dark p-3 mb-3 position-relative rounded ml-5"></div>');

    productDiv.append(`
        <img src="Assets/lixeira.png" alt="Excluir" class="position-absolute delete-icon" width="40" height="40" onclick="removeProduct(this)" style="top: 70px; left: -55px;">
        <img src="Assets/caixa.png" alt="Produto" class="position-absolute" width="60" height="60" style="top: 63px; left: 5px;">
        <div class="bg-white p-0 mb-2 rounded position-absolute top-1 start-0 ms-4 mt-n4">
            <span class="font-weight-bold p-1">Produto ${productCount}</span>
        </div>
        <div class="form-group mt-1 ml-5">
            <label for="produto-nome-${productCount}" class="font-weight-bold">Produto</label>
            <input type="text" id="produto-nome-${productCount}" name="produto-nome-${productCount}" class="form-control border border-dark">
        </div>
        <div class="form-row ml-5">
            <div class="form-group col-md-3 mb-0">
                <label for="produto-unidade-${productCount}" class="font-weight-bold">UND. Medida</label>
                <select id="produto-unidade-${productCount}" name="produto-unidade-${productCount}" class="form-control border border-dark">
                    <option value=""></option>
                    <option value="unidade">Unidade</option>
                    <option value="pacote">Pacote</option>
                </select>
            </div>
            <div class="form-group col-md-3 mb-0">
                <label for="produto-quantidade-${productCount}" class="font-weight-bold">QDTDE. em Estoque</label>
                <input type="text" id="produto-quantidade-${productCount}" name="produto-quantidade-${productCount}" class="form-control border border-dark" oninput="this.value = this.value.replace(/[^0-9]/g, ''); calculateTotal(${productCount})">
            </div>
            <div class="form-group col-md-3 mb-0">
                <label for="produto-preco-${productCount}" class="font-weight-bold">Valor Unitário</label>
                <input type="text" id="produto-preco-${productCount}" name="produto-preco-${productCount}" class="form-control border border-dark" oninput="this.value = this.value.replace(/[^0-9,.]/g, '');" onblur="formatUnitPrice(${productCount}); calculateTotal(${productCount})">
            </div>
            <div class="form-group col-md-3 mb-0">
                <label for="produto-total-${productCount}" class="font-weight-bold">Valor Total</label>
                <input type="text" id="produto-total-${productCount}" name="produto-total-${productCount}" class="form-control border border-dark" readonly>
            </div>
        </div>
    `);
    
    $('#product-list').append(productDiv);
    productDiv.find('.delete-icon').css('cursor', 'pointer');
}

function formatCurrency(value) {
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
}

function formatUnitPrice(count) {
    let price = $(`#produto-preco-${count}`).val().replace(',', '.').replace(/[^\d.]/g, '');
    if (price === '') price = '0';
    $(`#produto-preco-${count}`).val(formatCurrency(parseFloat(price) || 0));
}

function calculateTotal(count) {
    const quantity = $(`#produto-quantidade-${count}`).val() || 0;
    const price = $(`#produto-preco-${count}`).val().replace('R$ ', '').replace('.', '').replace(',', '.');
    const total = quantity * (parseFloat(price) || 0);
    $(`#produto-total-${count}`).val(formatCurrency(total));
}

function removeProduct(element) {
    const productDiv = $(element).closest('div.border');
    productDiv.remove();

    $('#product-list > div').each(function(index) {
        const newCount = index + 1; 
        $(this).find('span').text(`Produto ${newCount}`); 

        
        $(this).find('label').each(function() {
            const labelFor = $(this).attr('for');
            const newLabel = labelFor.replace(/\d+$/, newCount); 
            $(this).attr('for', newLabel).text($(this).text().replace(/\d+$/, newCount));
        });

        
        $(this).find('input').each(function() {
            const inputId = $(this).attr('id').replace(/\d+$/, newCount);
            const inputName = $(this).attr('name').replace(/\d+$/, newCount);
            $(this).attr('id', inputId).attr('name', inputName);
        });

        $(this).find('select').each(function() {
            const selectId = $(this).attr('id').replace(/\d+$/, newCount);
            const selectName = $(this).attr('name').replace(/\d+$/, newCount);
            $(this).attr('id', selectId).attr('name', selectName);
        });
    });

    productCount--; 
}

//
