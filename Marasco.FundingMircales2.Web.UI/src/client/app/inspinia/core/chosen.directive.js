(function () {
    'use strict';

    angular
        .module('mars.inspinia')
        .directive('olChosenModel', OlChosenModel);

    OlChosenModel.$inject = ['$timeout'];
    function OlChosenModel($timeout) {
        // Usage:
        // <ol-chosen-model>
        // Creates:
        //
        var directive = {
            link: link,
            restrict: 'A',
            replace: true,
            require: 'ngModel'
        };

        return directive;

        function link($scope, element, attrs, modelCtrl) {
            //Store JSON hierarchy of Model as an array in local variable
            var objects = attrs.olChosenModel.split('.');

            //modelCtrl.fireWatch set as false by default so first time this watch can not be fire
            modelCtrl.fireWatch = false;

            //check attribute ng-model is defined and not null
            //this is put watch over ng-model value so synchronization
            //between the drop-down's selected value and the actual model
            if (!angular.isUndefined(attrs.ngModel) && attrs.ngModel !== '') {

                //we put a watch over the ng-model attribute to check for value changes
                $scope.$watch(attrs.ngModel, function (value) {
                    if (!modelCtrl.fireWatch || modelCtrl.$pristine) {
                        return;
                    }

                    //check that attribute value after change is defined
                    if (!angular.isUndefined(value) &&
                        !angular.isUndefined(value[attrs.olChosenModelAttrib])) {
                        $timeout(function () {
                            //replace changed value attribue with corresponding model attribute after change
                            //this is for two hierarchy model
                            if (objects.length === 2 &&
                                $scope[objects[0]][objects[1]] !==
                                value[attrs.olChosenModelAttrib]) {
                                //check that changed value not equal with existing value
                                $scope.$apply(function () {
                                    //[objects[0]][objects[1] contains the model for two hierarchy model
                                    $scope[objects[0]][objects[1]] =
                                        value[attrs.olChosenModelAttrib];
                                });
                            }
                            //replace changed value attribue with corresponding model attribute after change
                            //this is for one hierarchy model
                            //check that changed value not equal with existing value
                            else if (objects.length === 1 &&
                                $scope[objects[0]] !==
                                value[attrs.olChosenModelAttrib]) {
                                $scope.$apply(function () {
                                    //[objects[0]][objects[1] contains the model for single hierarchy model
                                    $scope[objects[0]] = value[attrs.olChosenModelAttrib];
                                });
                            }
                        });
                    }
                    else {
                        //change corresponding attribute value as
                        //undefined if changed value is not defined
                        $timeout(function () {
                            if (objects.length === 2 &&
                                $scope[objects[0]][objects[1]] !==
                                undefined) {
                                $scope.$apply(function () {
                                    //set  attribute value as undifined for two hierarchy model
                                    $scope[objects[0]][objects[1]] = undefined;
                                });
                            }
                            else if (objects.length === 1 && $scope[objects[0]] !== undefined) {
                                $scope.$apply(function () {
                                    //set  attribute value as undifined for two hierarchy model
                                    $scope[objects[0]] = undefined;
                                });
                            }
                        });
                    }
                });
            }

            //check attribute ol-chosen-model is defined and not null
            //this is put watch over $scope value so synchronization
            //between the  the actual model and drop-down's selected value
            if (!angular.isUndefined(attrs.olChosenModel) && attrs.olChosenModel !== '') {

                //we put a watch over the $scope attribute to check for value changes in ol-chosen-model
                $scope.$watch(function ($scope) {
                    if (objects.length === 2) {
                        //return attribute value for two hierarchy model
                        return $scope[objects[0]][objects[1]];
                    }
                    else if (objects.length === 1) {
                        //return attribute value for one hierarchy model
                        return $scope[objects[0]];
                    }
                }, function (value) {
                    //set modelCtrl.fireWatch as a true so ng-model watch can fire after this watch fire.
                    modelCtrl.fireWatch = true;
                    $timeout(function () {
                        if ($scope[attrs.options] !== undefined &&
                            $scope[attrs.options].length > 0) {
                            var newValue;
                            if (!angular.isUndefined(value)) {
                                //filter attribute value from $scope options and set it to in newValue
                                newValue = $scope[attrs.options][$scope[attrs.options].map(
                                    function (x) {
                                        return x[attrs.olChosenModelAttrib];
                                    }).indexOf(value)];
                            }

                            //check if newValue not equal with existing value of dropdown list
                            //if not equals then replace dropdown value with new value
                            if ($scope[attrs.ngModel] !== newValue) {
                                //attrs.ngModel contains selected dropdown option
                                $scope[attrs.ngModel] = newValue;
                            }
                        }
                    });
                }, true);
            }

            //check attribute options is defined and not null
            //this is put watch over options so synchronization between
            //the actual model and drop-down's selected value
            $scope.$watch(attrs.options, function (value) {
                if (!modelCtrl.fireWatch) {
                    return;
                }

                $timeout(function () {
                    var newValue;
                    if (value !== undefined && value.length > 0) {
                        if (objects.length === 2) {
                            //filter attribute value from $scope options and
                            //set it to in newValue for two hierarchy model
                            newValue = $scope[attrs.options][$scope[attrs.options].map(
                                function (x) {
                                    return x[attrs.olChosenModelAttrib];
                                }).indexOf($scope[objects[0]][objects[1]])];
                        }
                        else if (objects.length === 1) {
                            //filter attribute value from $scope options
                            //and set it to in newValue for one hierarchy model
                            newValue = $scope[attrs.options][$scope[attrs.options].map(
                                function (x) {
                                    return x[attrs.olChosenModelAttrib];
                                }).indexOf($scope[objects[0]])];
                        }
                    }
                    //check if newValue not equal with existing value of dropdown list
                    //if not equals then replace dropdown option value with new value
                    if ($scope[attrs.ngModel] !== newValue) {
                        $scope[attrs.ngModel] = newValue;
                    }
                });
            });
        }

    }
})();

