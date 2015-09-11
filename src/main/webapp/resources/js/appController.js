var appController = angular.module('appController', []);

var wsRaiz = 'http://192.168.200.9:7005/tsys-back-end-skeleton-1.0/service/rest';

appController.controller('LoginController', function($scope, $location, $http,
		$rootScope, $window) {
	$scope.username = '';
	$scope.password = '';

	$scope.login = function() {
		$scope.alertUsuarioRequiredData = '';
		$scope.alertPasswordRequiredData = '';

		if ($scope.username == '') {
			$scope.alertUsuarioRequiredData = 'Dato requerido';
			$scope.classFormUsuario = 'has-warning';
		} else if ($scope.password == '') {
			$scope.alertPasswordRequiredData = 'Dato requerido';
			$scope.classFormPassword = 'has-warning';
		} else {

			$http.get(
					wsRaiz + '/login/' + $scope.username + '/'
							+ $scope.password).success(function(response) {
				console.log("Response: ", response);
				$rootScope.loginUser = response.user;
				$rootScope.user = response;
				switch ($rootScope.user.perfil) {

				case "1":
					$scope.admin = "show";
					$scope.usr = "hide";
					if (response.solicitarPassword == "1") {
						$location.path('/cambioPswd');
					} else {
						$location.path('/alta');
					}
					break;
				default:
					$scope.admin = "hide";
					$scope.usr = "show";
					if (response.solicitarPassword == "1") {
						$location.path('/cambioPswd');
					} else {
						$location.path('/cuentas');
					}
					break;

				}

			}).error(
					function(response) {
						console.log("Error: ", response);
						$window.alert('Usuario y Contrase' + '\u00f1'
								+ 'a incorrectos favor de validar');
					});
		}
		;
	}

	$scope.rstPswd = function() {

		$location.path('/resetPswd');

	};

});

appController.controller('resetPswdController', function($scope, $location,
		$http, $window) {

	$scope.resetPswd = function() {

		$http.get(wsRaiz + '/passProv/' + $scope.usr + '/resetPswd').success(
				function(response) {
					alert('Se ha enviado correo con la nueva contrase'
							+ '\u00f1' + 'a');
					$location.path('/');
				}).error(function(response) {
			console.log("Error: ", response);
			$window.alert('Usuario incorrecto favor de validar');
		});
	}

	$scope.login = function() {
		$location.path('/');
	}

});

appController.controller('reporteController', function($scope, $location,
		$http, $window, $rootScope) {
	
	 if ($rootScope.user == null) {
		 $location.path('/');
		 }

	$scope.varHeader = 'Reporte';
	$scope.varDescription = 'Busqueda por fechas';
	$scope.date = '';
	$scope.dateFin = '';
	$scope.users = null;
	
	$scope.find = function() {

		$http.get(
				wsRaiz + '/reporteUsuarios/' + $rootScope.user.token + '/'
						+ $scope.date + '/' + $scope.dateFin).success(
				function(response) {
					$scope.users = response;
					console.log("Response =", response);
				}).error(function(response) {
			console.log("Error: ", response);
			$window.alert('Valores Incorrectos');
		});
	}

});

appController.directive('datepicker', function() {
	    return {
	        restrict: 'A',
	        require : 'ngModel',
	        link : function (scope, element, attrs, ngModelCtrl) {
	            $(function(){
	                $(element).datepicker({
	                    dateFormat:'dd-mm-yy',
	                    onSelect:function (date) {
	                        ngModelCtrl.$setViewValue(date);
	                        ngModelCtrl.$render();
	                        scope.$apply();
	                    }
	                });
	            });
	        }
	    }
	});



appController.controller('altaController', function($scope, $location,
		$rootScope, $http) {

	 if ($rootScope.user == null) {
	 $location.path('/');
	 }

	$scope.varHeader = 'Alta';
	$scope.varDescription = 'Alta de nuevos usuarios';
	$scope.alta = "active";

	$scope.alta = function() {

		console.log(wsRaiz + '/newUsr/' + $rootScope.user.token + '/'
				+ $scope.username + '/' + $scope.nombre + '/'
				+ $scope.apPaterno + '/' + $scope.apMaterno);

		$http.get(
				wsRaiz + '/newUsr/' + $rootScope.user.token + '/'
						+ $scope.username + '/' + $scope.nombre + '/'
						+ $scope.apPaterno + '/' + $scope.apMaterno).success(
				function(response) {
					console.log("Response: ", response);
					alert("Se ha dado de alta el usuario");
					$scope.username = "";
					$scope.nombre = "";
					$scope.apPaterno = "";
					$scope.apMaterno = "";
					$location.path('/alta');
				}).error(function(response) {
			console.log("Error: ", response);
			$location.path('/error500');
		});

	};
});

appController.controller('cambioController', function($scope, $location,
		$rootScope, $http) {

	$scope.alertMessage = '¡Alerta!';
	$scope.alertMessageDescription = '';
	$scope.alertMessageDisplay = 'none';

	if ($rootScope.user == null) {
		$location.path('/');
	}

	$scope.cambioPswd = function() {

		if ($scope.pswd != $scope.pswd2) {

			$scope.alertMessageDisplay = 'block';
			$scope.alertMessageDescription = 'Las contrase' + '\u00f1'
					+ 'as no son iguales favor de Verificar';
			$scope.classFormUsuario = 'has-error';
			$scope.classFormPassword = 'has-error';

		} else {

			console.log(wsRaiz + '/actualizarPass/' + $rootScope.user.token
					+ '/' + $rootScope.user.user + '/' + $scope.pswd);

			$http.get(
					wsRaiz + '/actualizarPass/' + $rootScope.user.token + '/'
							+ $rootScope.user.user + '/' + $scope.pswd)
					.success(function(response) {
						console.log("Response: ", response);
						alert("Se ha cambiado la contrase' + '\u00f1' +'a");

						switch ($rootScope.user.perfil) {

						case "1":
							$scope.admin = "show";
							$scope.usr = "hide";
							$location.path('/alta');
							break;
						default:
							$scope.admin = "hide";
							$scope.usr = "show";
							$location.path('/cuentas');
							break;

						}
					}).error(function(response) {
						console.log("Error: ", response);
						$location.path('/error500');
					});
		}
	};
});

appController
		.controller(
				'bajaController',
				function($scope, $location, $rootScope, $http) {

					 if ($rootScope.user == null) {
					 $location.path('/');
					 }

					$scope.varHeader = 'Modificacion';
					$scope.varDescription = 'Usuarios';
					$scope.baja = "active";

					$http
							.get(
									wsRaiz + '/listarUsuarios/'
											+ $rootScope.user.token).success(
									function(response) {
										console.log("Response: ", response);
										$rootScope.users = response
									}).error(function(response) {
								console.log("Error: ", response);
								$location.path('/error500');
							});

					$scope.baja = function(usr) {

						$http
								.get(
										wsRaiz + '/delUsr/' + usr.email + '/'
												+ $rootScope.user.token)
								.success(
										function(response) {
											console.log("Response: ", response);
											alert("El usuario"
													+ usr.email
													+ ' ha sido dado de baja exitosamente.');
											$location.path('/alta');
										}).error(function(response) {
									console.log("Error: ", response);
									$location.path('/error500');
								});

					};

					$scope.resetPswd = function(usr) {

						console.log(wsRaiz + '/desbloqueaUsr/' + usr.email
								+ '/' + $rootScope.user.token);

						$http
								.get(
										wsRaiz + '/desbloqueaUsr/' + usr.email
												+ '/' + $rootScope.user.token)
								.success(
										function(response) {
											console.log("Response: ", response);
											alert("El usuario"
													+ usr.email
													+ ' ha sido restablecido exitosamente se le ha enviado al correo electronico registrado una nueva contrase'
													+ '\u00f1'
													+ 'a provicional.');
											$location.path('/alta');
										}).error(function(response) {
									console.log("Error: ", response);
									$location.path('/error500');
								});

					};

				});

appController.controller('HeaderController', function($scope, $location,
		$rootScope) {
	$rootScope.loginUser = 'Invitado';
	$scope.varHeader = 'Home';
	$scope.varDescription = 'Descripcion del home';
	$scope.perfil = function() {
		$location.path('/perfil');
	};
	$scope.logout = function() {
		$rootScope.user = null;
		$location.path('/');
	};
});

appController.controller('indexController', function($scope, $location,
		$rootScope) {

	$scope.logout = function() {
		$rootScope.user = null;
		$rootScope.loginUser = 'Invitado';
		$location.path('/');
	};

});

appController.controller('MenuController', function($scope, $location,
		$rootScope) {

	$scope.linkAlta = function() {
		$location.path('/alta');
	};
	$scope.linkBaja = function() {
		$location.path('/baja');
	};

	$scope.linkReporte = function() {
		$location.path('/reporte');
	};

	$scope.linkForm = function() {
		$location.path('/formulario');
	};

	$scope.linkTablas = function() {
		$location.path('/tables');
	};

	$scope.linkBloqueo = function() {
		$location.path('/bloqueo');
	};

	$scope.error404 = function() {
		$location.path('/error404');
	};

	$scope.error500 = function() {
		$location.path('/error500');
	};

});

appController.controller('PrincipalController', function($scope, $location,
		$rootScope) {
	$scope.varHeader = 'Pagina principal';
	$scope.varDescription = 'Descripcion de la pagina principal';
});

appController.controller('FormController', function($scope, $location,
		$rootScope) {
	$scope.varHeader = 'Pagina principal';
	$scope.varDescription = 'Descripcion de la pagina principal';
});

appController.controller('TablesController', function($scope, $location,
		$rootScope) {
	$scope.varHeader = 'Pagina principal';
	$scope.varDescription = 'Descripcion de la pagina principal';
});

appController.controller('BloqueoController', function($scope, $location,
		$rootScope) {
	$scope.varHeader = 'Pagina principal';
	$scope.varDescription = 'Descripcion de la pagina principal';
});

appController.controller('404Controller', function($scope, $location,
		$rootScope) {
	$scope.varHeader = 'Pagina principal';
	$scope.varDescription = 'Descripcion de la pagina principal';
});

appController.controller('500Controller', function($scope, $location,
		$rootScope) {
	$scope.varHeader = 'Pagina principal';
	$scope.varDescription = 'Descripcion de la pagina principal';
});

appController.run(function($rootScope) {
	  var lastDigestRun = new Date();
	  $rootScope.$watch(function detectIdle() {
	    var now = new Date();
	    if (now - lastDigestRun > 10*60*60) {
	       // logout here, like delete cookie, navigate to login ...
	    }
	    lastDigestRun = now;
	  });
	});

appController
		.controller(
				'HomeControllerRest',
				function($scope, $http) {
					$http
							.get(
									'http://192.168.1.195:7001/tsys-ws-0.0.1-SNAPSHOT/rest/users/allUsers')
							.success(function(response) {
								console.log("Response: ", response);
								$scope.users = response;
							}).error(function(response) {
								console.log("Error: ", response);
							});
				});