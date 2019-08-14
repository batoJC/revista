function iniciar() {
    M.Sidenav.init(document.querySelectorAll('.sidenav'), {});
}

document.addEventListener('DOMContentLoaded', function () {
    iniciar();
});

function iniciarDatapicker() {
    M.Datepicker.init(document.querySelectorAll('.datepicker'), {
        format: 'yyyy-mm-dd'
    });
}

function getDato(id) {
    return document.querySelector('#' + id).value;
}

function iniciarSelect() {
    M.FormSelect.init(document.querySelectorAll('select'), {});
}


function closeModal(id) {
    var element = document.querySelector('#' + id);
    let instance = M.Modal.getInstance(element);
    instance.close();
}

function updateTextaeras() {
    M.textareaAutoResize(document.querySelector('textarea'));
}

function openModal(id, title) {
    try {
        var elems = document.querySelectorAll('.modal');
        M.Modal.init(elems, {});
        console.log(document.querySelector('#' + id));
        var modal = document.querySelector('#' + id);
        var titulo = document.querySelector(`#${id} div h4`);
        titulo.innerHTML = title;
        let instance = M.Modal.getInstance(modal);
        instance.open();
    } catch (err) {

    }
}

function activeLabels() {
    var labels = document.querySelectorAll('.input-field label');
    console.log(labels);
    labels.forEach(element => {
        console.log(element.htmlFor);
        if (element.htmlFor != 'level_education') {
            element.className = 'active';
        }
    });
}

function disableLabels() {
    var labels = document.querySelectorAll('.input-field label');
    console.log(labels);
    labels.forEach(element => {
        element.className = '';
    });
}


function getPdfById(id) {
    let pdf = document.getElementById(id);
    return pdf.files[0];
}


function startTooltip() {
    var elems = document.querySelectorAll('.tooltip');
    var instances = M.Tooltip.init(elems, { exitDelay: 1000, enterDelay: 10 });
}