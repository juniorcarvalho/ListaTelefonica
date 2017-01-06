angular.module("listaTelefonica").filter("ellipsis", function() {
    return function(input, size) {
        if (input.length <= size)
            return input;
        var outPut = input.substring(0, (size || 10)) + '...';
        return outPut;
    };
});
