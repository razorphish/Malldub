(function () {
    'use strict';

    angular
        .module('mars.inspinia.core')
        .controller('confirmationControllerModal', CommonCtrl);

    CommonCtrl.$inject = ['$modalInstance', 'message',
        'title', '$sce', 'hideCancel', 'isWarning'];

    function CommonCtrl($modalInstance, message,
        title, $sce, hideCancel, isWarning) {
        var vm = this;

        activate();

        vm.message = message;
        vm.title = title;
        vm.hideCancel = hideCancel;
        vm.isWarning = isWarning;

        vm.messageHtml = function () {
            return $sce.trustAsHtml(vm.message);
        };

        vm.close = function (reason) {
            $modalInstance.dismiss(reason);
        };

        vm.ok = function () {

            $modalInstance.close(true);

        };

        function activate() { }
    }
})();
