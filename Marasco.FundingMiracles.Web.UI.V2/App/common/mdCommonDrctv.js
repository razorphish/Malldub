'use strict';

fundoloApp.directive('selectOnClick', [
    function() {
      var p = {};

      p.restrict = 'A';
      p.link = function(scope, element, attrs) {
        element.bind('click', function() {
          this.select();
        });
      }

      return p;
    }
  ])
  .directive('imageonload', [
    function() {
      var p = {};

      p.restrict = 'A';

      p.link = function(scope, element, attrs) {
        element.on('load', scope.callBack());
      }

      p.scope = {
        callBack: '&callBack'
      }

      return p;
    }
  ])
  .directive('mdPrint', [
    function () {
      'use strict';
      var p = {};
      p.restrict = 'A';

      var printSection = document.getElementById('printSection');

        // if there is no printing section, create one
        if (!printSection) {
          printSection = document.createElement('div');
          printSection.id = 'printSection';
          document.body.appendChild(printSection);
        }


        p.link = function (scope, element, attrs) {
          element.on('click', function () {
            var elemToPrint = document.getElementById(attrs.printElementId);
            if (elemToPrint) {
              printElement(elemToPrint);
            }
          });
          window.onafterprint = function () {
            // clean the print section before adding new content
            printSection.innerHTML = '';
          }
        }

        function printElement(elem) {
          // clones the element you want to print
          var domClone = elem.cloneNode(true);
          printSection.innerHTML = '';
          printSection.appendChild(domClone);
          window.print();
        }


      return p;
    }
  ]);
