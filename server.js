var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

// en public vamos a colgar todos nuestro html y javascript.

app.use(express.static(__dirname)); // Directorio donde estamos parados
app.use(express.static(path.join(__dirname, 'public'))); 
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


let todosLosAlumnos = [{
    id : 1000,
    nombre: 'Daniel',
    apellido: 'Bermudez'
}, {
    id : 2000,
    nombre: 'Fernando', 
    apellido: 'Belizan'
}, {
    id : 3000,
    nombre: 'Gabriela',  
    apellido: 'Pesich'
},
{
    id : 4000,
    nombre: 'Julieta',
    apellido: 'Francisconi'
},{
    id : 5000,
    nombre: 'Lorena',
    apellido: 'Bellon'
},{
    id : 6000,  
    nombre: 'Judith',
    apellido: 'Cengarle'
}, {
    id : 7000,       
    nombre: 'Mariano',
    apellido: 'Sayagués'
}, {
    id : 8000,
    nombre: 'Sebastian',
    apellido: 'Maidana'
}];

app.get('/alumnos', function(req, res) {
    res.send(todosLosAlumnos);
});

app.get('/alumno/:id', function(req, res) {
    
    console.log(req.params.id);

    let alumnoFiltrado = 
        todosLosAlumnos.filter(z => z.id == req.params.id);

    console.log(alumnoFiltrado);

    res.send(alumnoFiltrado);
});

app.post('/alumno', function(req, res) {
    console.log(req.body);
    todosLosAlumnos.push(req.body);

    res.send({resultado:'ok'});
});

app.put('/alumno', function(req, res) {
    res.send({resultado:'ok'});
});

app.delete('/alumno/:id', function(req, res) {
    console.log(req.params.id);
    todosLosAlumnos = 
        todosLosAlumnos.filter(z => z.id != req.params.id);
    res.send({resultado:'ok'});
});

app.listen(80);
console.log('esuchando el puerto 80');

