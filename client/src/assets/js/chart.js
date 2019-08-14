document.addEventListener('DOMContentLoaded', function () {
    ejecutar()
});

function ejecutar(){
    setTimeout(() => {
        alert('')
         var ctx = document.getElementById('maricada').getContext('2d');
        console.log(ctx);
         var chart = new Chart(ctx, {
        //     // The type of chart we want to create
             type: 'line',
    
             // The data for our dataset
             data: {
                 labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                 datasets: [{
                     label: 'My First dataset',
                     backgroundColor: 'rgb(255, 99, 132)',
                     borderColor: 'rgb(255, 99, 132)',
                     data: [0, 10, 5, 2, 20, 30, 45]
                 }]
             },
    
        //     // Configuration options go here
             options: {}
         });
    }, 2000)
}



console.log('hola');