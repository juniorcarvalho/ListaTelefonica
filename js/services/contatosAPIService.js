// factory
angular.module("listaTelefonica").factory("contatosAPI", function($http, config) {
    var _getContatos = function() {
        return $http.get(config.baseUrl + "/contato/");
    };

    var _saveContato = function(contato) {
        return $http.post(config.baseUrl + "/contato/", contato);
    };

    var _deleteContato = function(contato) {
        var urlDel = config.baseUrl + "/contato/" + contato.id + '/';
        return $http.delete(urlDel);
    };

    return {
        getContatos: _getContatos,
        saveContato: _saveContato,
        deleteContato: _deleteContato
    };
});
