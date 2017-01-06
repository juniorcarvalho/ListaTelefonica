angular.module("listaTelefonica").controller("listaTelefonicaCtrl",
    function($scope, contatosAPI, operadorasAPI, serialGenerator) {
        $scope.app = "Lista Telefônica";
        console.log(serialGenerator.generate());
        $scope.criterioDeOrdenacao = 'nome';
        $scope.direcaoDaOrdenacao = false;

        var carregarContatos = function() {
            contatosAPI.getContatos().then(function(data) {
                $scope.contatos = data.data;
                console.log('carregou contatos');
            }).catch(function(response) {
                $scope.error = "Não foi possível carregar os dados.";
                console.log(response);
            }).finally(function() {

            });
        };

        var carregarOperadoras = function() {
            operadorasAPI.getOperadoras().then(function(data) {
                $scope.operadoras = data.data;
                console.log('carregou operadoras');
            }).catch(function(response) {
                $scope.error = "Não foi possível carregar os dados.";
                console.log(response);
            }).finally(function() {

            });
        };

        $scope.adicionarContato = function(contato) {
            $scope.serial = serialGenerator.generate();
            contato.data = new Date().toISOString().slice(0, 10);

            // console.log(contato);

            contatosAPI.saveContato(contato).then(function(data) {
                delete $scope.contato;
                $scope.contatoForm.$setPristine();
                // console.log('gravou contato');
                carregarContatos();
            }).catch(function(response) {
                $scope.error = "Aconteceu um problema: " + response;
                console.log(response)
            }).finally(function() {

            });
        };

        $scope.apagarContatos = function(contatos) {
            $scope.contatos = contatos.filter(function(contato) {
                if (contato.selecionado) {
                    contatosAPI.deleteContato(contato).catch(function(response) {
                        $scope.error = "Aconteceu um problema: " + response;
                        console.log(response)
                    });
                } else {
                    return contato;
                }
            });
        };

        $scope.isContatoSelecionado = function(contatos) {
            return contatos.some(function(contato) {
                return contato.selecionado;
            });
        };

        $scope.ordernarPor = function(campo) {
            $scope.criterioDeOrdenacao = campo;
            $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
        };

        carregarContatos();
        carregarOperadoras();
    });
