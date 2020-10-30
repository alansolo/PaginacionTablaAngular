var app = angular.module("MyApp", ['ngTable']);

app.controller("MyController", function ($scope, $http, $window, $filter, ngTableParams) {


    $.ajax({
        type: "POST",
        url: "/Paginacion/CargarDatos",
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (datos) {


            $scope.ListaDatos = datos;

            data = $scope.ListaDatos;

            $scope['tableParams'] = new ngTableParams({
                page: 1,            // show first page
                count: 10,          // count per page
                sorting: {
                    Id: 'asc'     // initial sorting
                }
            },
            {
                total: data.length, // length of data
                getData: function ($defer, params) {
                    var orderedData = params.sorting() ?
                        $filter('orderBy')(data, params.orderBy()) :
                        data;
                    params.total(orderedData.length);
                    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    // use build-in angular filter
                    
            }
            });

            $scope.$apply();
        },
        error: function (error) {

        }
    });

    $scope.CargarDatos = function () {



        $.ajax({
            type: "POST",
            url: "/Paginacion/CargarDatos",
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (datos) {



                $scope.ListaDatos = datos;

                data = $scope.ListaDatos;

                $scope.tableParams.reload();

                $scope['tableParams'] = new ngTableParams({
                    page: 1,            // show first page
                    count: 10          // count per page
                },
                    {
                        total: data.length, // length of data
                        getData: function ($defer, params) {
                            // use build-in angular filter
                            var filteredData = params.filter() ?
                                $filter('filter')(data, params.filter()) :
                                data;
                            var orderedData = params.sorting() ?
                                $filter('orderBy')(filteredData, params.orderBy()) :
                                data;

                            params.total(orderedData.length); // set total for recalc pagination
                            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                        }
                    });

                $scope.$apply();

            },
            error: function (error) {

            }
        });
    };
    

});