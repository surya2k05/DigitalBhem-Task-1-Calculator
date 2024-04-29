var app = angular.module('Calculator', []);

app.controller('DisplayController', ['$scope', function($scope) {
    $scope.display = "";
}]);

app.controller('ArthmeticController', ['$scope', function($scope){
    $scope.operatorLastUsed = false;
    $scope.equation = "0";
    $scope.isFloat = false;
    $scope.isInit = true;
    $scope.isOff = false;

    $scope.concatOperator = function(operator) {
        if(operator === 'AC') {
            $scope.equation = "0";
            $scope.isInit = true;
        } else {
            if(!$scope.equation[$scope.equation.length - 1].match(/[-+*\/]/)) {
                $scope.equation += operator;
                $scope.isFloat = false;
            }
        }
    }

    $scope.command = function(command) {
        if(command === 'Off') {
            // Toggle the calculator on/off
            if($scope.isOff === false) {
                $(".display").css("color", '#95A799');
                $("button:contains('OFF')").text("ON");
                $scope.isOff = true;
            } else {
                $(".display").css("color", 'black');
                $("button:contains('ON')").text("OFF");
                $scope.isOff = false;
            }
        } else if(command === '%') {
            // Handle percentage calculation
            var lastChar = $scope.equation[$scope.equation.length - 1];
            // Only add '%' if the last character is a number
            if(!isNaN(lastChar)) {
                $scope.equation += "%";
            }
        } else if(command === 'DEL') {
            // Handle deletion of the last character
            if($scope.equation.length == 1) {
                $scope.equation = "0";
                $scope.isInit = true;
            } else {
                $scope.equation = $scope.equation.substring(0,$scope.equation.length - 1);
            }
        }
    }

    $scope.addDecimal = function() {
        $scope.isFloat = true;
        $scope.equation += ".";
    }

    $scope.updateCurrNum = function(num) {
        if($scope.isInit) {
            $scope.equation = num.toString();
            $scope.isInit = false;
        } else
            $scope.equation += num;
    }

    $scope.calculate = function() {
        $scope.equation = eval($scope.equation).toString();
    }
}]);
