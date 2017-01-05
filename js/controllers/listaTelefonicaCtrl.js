angular.module("listaTelefonica").controller("listaTelefonicaCtrl", function($scope, $http) {
    $scope.app = "Lista Telefônica";
    // $scope.contatos = [];
    // $scope.operadoras = [];

    var carregarContatos = function() {
        $http.get("https://listatelefonica-teste.herokuapp.com/contato/").then(function(data) {
            $scope.contatos = data;
        }).catch(function(response) {
            $scope.message = "Aconteceu um problema: " + response;
        }).finally(function() {
            console.log('carregou contatos');
        });
    };

    var carregarOperadoras = function() {
        $http.get("https://listatelefonica-teste.herokuapp.com/operadora/").then(function(data) {
            $scope.operadoras = data;
        }).catch(function(response) {
            $scope.message = "Aconteceu um problema: " + response;
        }).finally(function() {
            console.log('carregou operadoras');
        });
    };

    $scope.adicionarContato = function(contato) {

        contato.data = new Date();
        $http.post("https://listatelefonica-teste.herokuapp.com/contato/", contato).then(function(data) {
            delete $scope.contato;
            $scope.contatoForm.$setPristine();
            carregarContatos();
        }).catch(function(response) {
            $scope.message = "Aconteceu um problema: " + response;
        }).finally(function() {
            console.log('carregou operadoras');
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
