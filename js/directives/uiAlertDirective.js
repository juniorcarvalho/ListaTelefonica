angular.module("listaTelefonica").directive("uiAlert", function() {
    return {
        templateUrl: "view/alert.html", replace: true,
        // A - Diretiva restrita ao atributo do elemento
        //        <div alert></div>
        // E - Diretiva restrita ao elemento
        //        <alert></alert>
        // C - Diretiva restrita a classe do elemento
        //        <div class="alert"></div>
        // M - Diretiva restrita ao comentário do elemento
        //        <!-- directive:alert -->
        restrict: "AE",
        scope: {
          topic: "@title", // se a os nomes forem iguais usar apenas @. Ex. title: "@"
          message: "="
        }
    };
});
