angular.module("listaTelefonica").controller("listaTelefonicaCtrl", function($scope, $http) {
    $scope.app = "Lista Telefônica";
    // $scope.contatos = [];
    // $scope.operadoras = [];

    var carregarContatos = function() {
        $http.get("http://127.0.0.1:8000/contato/").then(function(data) {
            $scope.contatos = data;
        }).catch(function(response) {
            $scope.message = "Aconteceu um problema: " + response;
        }).finally(function() {
            console.log('carregou contatos');
        });
    };

    var carregarOperadoras = function() {
        $http.get("http://127.0.0.1:8000/operadora/").then(function(data) {
            $scope.operadoras = data;
        }).catch(function(response) {
            $scope.message = "Aconteceu um problema: " + response;
        }).finally(function() {
            console.log('carregou operadoras');
        });
    };

    $scope.adicionarContato = function(contato) {

        contato.data = new Date();
        $http.post("http://127.0.0.1:8000/operadora/", contato).success(function(data) {
            delete $scope.contato;
            $scope.contatoForm.$setPristine();
            carregarContatos();
        });
    };

    $scope.apagarContatos = function(contatos) {
        $scope.contatos = contatos.filter(function(contato) {
            if (!contato.selecionado) return contato;
        })
    };

    $scope.isContatoSelecionado = function(contatos) {
        // return contatos.some(function(contato) {
        //     return contato.selecionado;
        // });
    };

    $scope.ordernarPor = function(campo) {
        $scope.criterioDeOrdenacao = campo;
        $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
    };

    carregarContatos();
    carregarOperadoras();
});
