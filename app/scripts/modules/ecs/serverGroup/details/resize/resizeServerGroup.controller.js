'use strict';

const angular = require('angular');

import { SERVER_GROUP_WRITER, TASK_MONITOR_BUILDER } from '@spinnaker/core';

import { ECS_RESIZE_CAPACITY_COMPONENT } from './resizeCapacity.component';

module.exports = angular.module('spinnaker.ecs.serverGroup.details.resize.controller', [
  SERVER_GROUP_WRITER,
  TASK_MONITOR_BUILDER,
  ECS_RESIZE_CAPACITY_COMPONENT,
])
  .controller('ecsResizeServerGroupCtrl', function($scope, $uibModalInstance, serverGroupWriter,
                                                   taskMonitorBuilder,
                                                   application, serverGroup) {
    $scope.serverGroup = serverGroup;
    $scope.currentSize = {
      min: serverGroup.capacity.min,
      max: serverGroup.capacity.max,
      desired: serverGroup.capacity.desired,
      newSize: null
    };

    $scope.verification = {};

    $scope.command = angular.copy($scope.currentSize);
    $scope.command.advancedMode = serverGroup.capacity.min !== serverGroup.capacity.max;

    if (application && application.attributes) {
      if (application.attributes.platformHealthOnlyShowOverride && application.attributes.platformHealthOnly) {
        $scope.command.interestingHealthProviderNames = ['Ecs'];
      }

      $scope.command.platformHealthOnlyShowOverride = application.attributes.platformHealthOnlyShowOverride;
    }

    this.isValid = function () {
      var command = $scope.command;
      if (!$scope.verification.verified) {
        return false;
      }
      return command.advancedMode ?
        command.min <= command.max && command.desired >= command.min && command.desired <= command.max :
        command.newSize !== null;
    };

    $scope.taskMonitor = taskMonitorBuilder.buildTaskMonitor({
      application: application,
      title: 'Resizing ' + serverGroup.name,
      modalInstance: $uibModalInstance,
    });

    this.resize = function () {
      if (!this.isValid()) {
        return;
      }
      var capacity = { min: $scope.command.min, max: $scope.command.max, desired: $scope.command.desired };
      if (!$scope.command.advancedMode) {
        capacity = { min: $scope.command.newSize, max: $scope.command.newSize, desired: $scope.command.newSize };
      }

      var submitMethod = function() {
        return serverGroupWriter.resizeServerGroup(serverGroup, application, {
          capacity: capacity,
          interestingHealthProviderNames: $scope.command.interestingHealthProviderNames,
          reason: $scope.command.reason,
        });
      };

      $scope.taskMonitor.submit(submitMethod);
    };

    this.cancel = function () {
      $uibModalInstance.dismiss();
    };
  });
