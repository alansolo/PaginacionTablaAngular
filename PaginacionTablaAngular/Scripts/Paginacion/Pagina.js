var app = angular.module("MyApp", ['ui.bootstrap']);

app.filter('beginning_data', function () {
    return function (input, begin) {
        if (input) {
            begin = +begin;
            return input.slice(begin);
        }
        return [];
    }
});

app.controller("MyController", function ($scope, $http, $window, $timeout) {

    $.ajax({
        type: "POST",
        url: "/Paginacion/CargarDatos",
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (datos) {

            $scope.file = datos;
            $scope.current_grid = 1;
            $scope.data_limit = 10;
            $scope.filter_data = $scope.file.length;
            $scope.entire_user = $scope.file.length;


            $scope.$apply();
        },
        error: function (error) {

        }
    });

    $scope.page_position = function (page_number) {
        $scope.current_grid = page_number;
    };
    $scope.filter = function () {
        $timeout(function () {
            $scope.filter_data = $scope.searched.length;
        }, 20);
    };
    $scope.sort_with = function (base) {
        $scope.base = base;
        $scope.reverse = !$scope.reverse;
    };

    $scope.CargarDatos = function () {
        $.ajax({
            type: "POST",
            url: "/Paginacion/CargarDatos",
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (datos) {

                $scope.file = datos;
                $scope.current_grid = 1;
                $scope.data_limit = 10;
                $scope.filter_data = $scope.file.length;
                $scope.entire_user = $scope.file.length;


                $scope.$apply();
            },
            error: function (error) {

            }
        });
    };

});