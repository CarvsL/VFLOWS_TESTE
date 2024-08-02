let anexoCount = 0;
const anexos = {};

function addAnexo() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.style.display = 'none';
    fileInput.onchange = handleFileSelect;
    document.body.appendChild(fileInput);
    fileInput.click();
}

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        anexoCount++;
        const blob = new Blob([file], { type: file.type });
        const anexoId = `anexo-${anexoCount}`;
        anexos[anexoId] = blob;
        sessionStorage.setItem(anexoId, URL.createObjectURL(blob));
        addAnexoToList(anexoId, file.name);
    }
}

function addAnexoToList(anexoId, fileName) {
    const anexoDiv = document.createElement('div');
    anexoDiv.classList.add('anexo', 'mb-2', 'd-flex', 'align-items-center');
    anexoDiv.setAttribute('data-anexo-id', anexoId);
    anexoDiv.innerHTML = `
        <img src="Assets/lixeira.png" alt="Excluir" width="40" height="40" class="me-2 delete-icon" onclick="deleteAnexo('${anexoId}')">
        <img src="Assets/olho.png" alt="Visualizar" width="40" height="40" class="me-2 ml-3 view-icon" onclick="viewAnexo('${anexoId}')">
        <p class="mb-0 ml-3">${fileName}</p>
    `;
    document.getElementById('anexo-list').appendChild(anexoDiv);

    
    $(anexoDiv).find('.delete-icon, .view-icon').css('cursor', 'pointer');
}


function deleteAnexo(anexoId) {
    delete anexos[anexoId];
    sessionStorage.removeItem(anexoId);
    const anexoElements = document.querySelectorAll('.anexo');
    anexoElements.forEach((el) => {
        if (el.getAttribute('data-anexo-id') === anexoId) {
            el.remove();
        }
    });
}


function viewAnexo(anexoId) {
    const blobURL = sessionStorage.getItem(anexoId);
    const a = document.createElement('a');
    a.href = blobURL;
    a.download = anexos[anexoId].name || anexoId;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
