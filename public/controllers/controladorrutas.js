(function() {
    var cursoAngular = angular.module('CursoAngular', ["ngRoute"]);

    cursoAngular.controller('homeController', function($scope) {

    });

    cursoAngular.controller('infoappController', function() {

    });

    cursoAngular.controller('alumnosController', function($scope, $http, $location) {
        console.log('entra a alumnos controller');
        function innerFnRealizarGet() {
            $http.get('/alumnos').then(function(respuesta) {
                $scope.alumnos = respuesta.data;
                console.log(respuesta);
            });
        }
        innerFnRealizarGet();
        
        $scope.ver = function(alumno) {
            $location.url('/alumno/' + alumno.id);
        }
        $scope.borrar = function(alumno) {
            $http.delete('/alumno/'+alumno.id).then(function() {
                innerFnRealizarGet();
            });
            
        }
    });

    cursoAngular.controller('alumnoUnicoController', function($scope, $routeParams, $http) {
        $scope.idAlumno = $routeParams.id;
        $http.get('alumno/'+$scope.idAlumno).then(function(resp) {
            $scope.alumno = resp.data[0];
        });
    });

    cursoAngular.controller('agregarAlumnoController', function($scope, $http, $location) {
        $scope.agregar = function() {
            console.log($scope.id);
            console.log($scope.nombre);
            console.log($scope.apellido);
            $http.post('/alumno', {
                id: $scope.id,
                nombre: $scope.nombre,
                apellido: $scope.apellido
            }).then(function() {
                $location.url('/alumnos');
            })
        }
    });

    cursoAngular.controller('notFoundController', function() {
        
    });

    cursoAngular.config(function($routeProvider) {        
        $routeProvider
        .when('/', {
            templateUrl: 'paginas/home.html',
            controller: 'homeController'
        })
        .when('/infoapp', {
            templateUrl: 'paginas/infoapp.html',
            controller: 'infoappController'
        })
        .when('/alumnos', {
            templateUrl: 'paginas/alumnos.html',
            controller: 'alumnosController'
        })
        .when('/alumno/:id', {
            templateUrl: 'paginas/alumnounico.html',
            controller: 'alumnoUnicoController'
        })
        .when('/agregaralumno', {
            templateUrl: 'paginas/agregaralumno.html',
            controller: 'agregarAlumnoController'
        })
        .otherwise({
            templateUrl: 'paginas/notfound404.html',
            controller: 'notFoundController'
        })
    });

})();