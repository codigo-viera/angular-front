var appRoute = angular.module('appRoute', []);

//Configurando el flujo de la app
appRoute.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl : 'views/login.html',
		controller : 'LoginController'
	}).when('/cambioPswd', {
		templateUrl : 'views/cambioPswd.html',
		controller : 'cambioController'
	}).when('/reporte', {
		templateUrl : 'views/reporte.html',
		controller : 'reporteController'
	}).when('/resetPswd', {
		templateUrl : 'views/resetPswd.html',
		controller : 'resetPswdController'
	}).when('/alta', {
		templateUrl : 'views/alta.html',
		controller : 'altaController'
	}).when('/baja', {
		templateUrl : 'views/baja.html',
		controller : 'bajaController'
	}).when('/formulario', {
		templateUrl : 'views/formularios.html',
		controller : 'FormController'
	}).when('/tables', {
		templateUrl : 'views/tables.html',
		controller : 'TablesController'
	}).when('/bloqueo', {
		templateUrl : 'views/bloqueo.html',
		controller : 'BloqueoController'
	}).when('/error404', {
		templateUrl : 'views/errors/404.html',
		controller : '404Controller'
	}).when('/error500', {
		templateUrl : 'views/errors/500.html',
		controller : '500Controller'
	}).when('/perfil', {
		templateUrl : 'views/perfil.html',
		controller : 'perfilController'
	}).otherwise({
		redirectTo : 'views/errors/404.xhtml',
		controller : '404Controller'
	});	
} ]);