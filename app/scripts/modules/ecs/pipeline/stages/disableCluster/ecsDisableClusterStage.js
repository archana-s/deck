'use strict';

const angular = require('angular');

module.exports = angular.module('spinnaker.ecs.pipeline.stage.disableClusterStage', [
])
  .config(function(pipelineConfigProvider) {
    pipelineConfigProvider.registerStage({
      provides: 'disableCluster',
      cloudProvider: 'ecs',
      templateUrl: require('./disableClusterStage.html'),
      validators: [
        { type: 'requiredField', fieldName: 'cluster' },
        { type: 'requiredField', fieldName: 'remainingEnabledServerGroups', fieldLabel: 'Keep [X] enabled Server Groups'},
        { type: 'requiredField', fieldName: 'regions', },
        { type: 'requiredField', fieldName: 'credentials', fieldLabel: 'account'},
      ],
    });
  }).controller('ecsDisableClusterStageCtrl', function($scope, accountService) {
    var ctrl = this;

    let stage = $scope.stage;

    $scope.state = {
      accounts: false,
      regionsLoaded: false
    };

    accountService.listAccounts('ecs').then(function (accounts) {
      $scope.accounts = accounts;
      $scope.state.accounts = true;
    });

    ctrl.reset = () => {
      ctrl.accountUpdated();
      ctrl.resetSelectedCluster();
    };

    stage.regions = stage.regions || [];
    stage.cloudProvider = 'ecs';

    if (stage.isNew && $scope.application.attributes.platformHealthOnlyShowOverride && $scope.application.attributes.platformHealthOnly) {
      stage.interestingHealthProviderNames = ['Ecs'];
    }

    if (!stage.credentials && $scope.application.defaultCredentials.ecs) {
      stage.credentials = $scope.application.defaultCredentials.ecs;
    }
    if (!stage.regions.length && $scope.application.defaultRegions.ecs) {
      stage.regions.push($scope.application.defaultRegions.ecs);
    }

    if (stage.remainingEnabledServerGroups === undefined) {
      stage.remainingEnabledServerGroups = 1;
    }

    ctrl.pluralize = function(str, val) {
      if (val === 1) {
        return str;
      }
      return str + 's';
    };

    if (stage.preferLargerOverNewer === undefined) {
      stage.preferLargerOverNewer = 'false';
    }
    stage.preferLargerOverNewer = stage.preferLargerOverNewer.toString();
  });

