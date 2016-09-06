"use strict";

angular.module('automationApp.runner')
    .directive('runnerLauncher', ['$timeout', function($timeout) {
        return {
            restrict: 'A',
            templateUrl: 'modules/runner/runnerLauncher.tpl.html',
            scope:{
                'items' : '='
            },
            link: function (scope, element, attributes) {
                scope.itemSelection;
                scope.methodSelection;

                scope.iCheckOptions = {
                    checkboxClass: 'icheckbox_square-blue',
                    radioClass: 'iradio_minimal',
                    inheritClass: true
                };

                scope.selectRunTaskItems = function(){

                    if ( $("input.runner-item-check").is(":checked")) {
                           $(".run-task-btn").attr("disabled", false);
                           $(".run-task-btn").removeClass("disablebtn");
                    } else {
                           $(".run-task-btn").attr("disabled", true);
                           $(".run-task-btn").addClass("disablebtn");
                    }

                    event.stopPropagation();
                }

                $timeout(function(){
                    element.on('click',".item-level-0.dd3-content",function(event) {

                        event.preventDefault();

                        if($(this).hasClass('bg-primary')) {
                            $(this).siblings(".data-items").hide();
                            $(this).removeClass('bg-primary');
                        }
                        else {
                            $(this).siblings(".data-items").show();
                            $(this).addClass('bg-primary');
                        }

                        event.stopPropagation();
                    });

                    element.on('click',".run-task-btn",function(event) {
						event.preventDefault();
						
                        event.stopPropagation();
                    });

                    element.on('click',".delete-pathway",function(event) {
                        event.preventDefault();

                        var delIndex = $(this).closest('.pathway-list').index() - 2;
                        scope.items[1].splice(delIndex, 1);
                        scope.$apply();

                        if( scope.items[1] !== undefined && scope.items[1].length === 0 ) {
                            $(".run-pathway").attr("disabled", true);
                            $(".run-pathway").addClass("disablebtn");
                        }

                        event.stopPropagation();
                    });

                    element.on('click',".add-pathway",function(event) {
                        event.preventDefault();

                        var pathwayInfo = $.map(scope.items[0].items, function(value, index) {
                                return $('input[name=method-radio-'+index +']:checked').val();
                        });

                        var obj = {
                            "pathway" : pathwayInfo,
                            "group" : $(".pathway-group").val().join()
                        };

                        if(scope.items[1] === undefined) {
                            scope.items[1] = [ obj ];
                        } else {
                            scope.items[1].splice(scope.items[1].length, 0, obj);
                        }

                        scope.$apply();

                        if( scope.items[1] !== undefined && scope.items[1].length !== 0 ) {
                            $(".run-pathway").attr("disabled", false);
                            $(".run-pathway").removeClass("disablebtn");
                        }

                        event.stopPropagation();
                    });
                });
            }
        }
    }]);

