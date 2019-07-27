document.addEventListener('DOMContentLoaded', function() {
    M.FormSelect.init(document.querySelectorAll('select'), {
        classes : 'blue-text'
    });
});

function iniciar() {
    M.Sidenav.init(document.querySelectorAll('.sidenav'), {});
}