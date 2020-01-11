import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { _ } from 'underscore';

import './deployments.html';


Template.all_deployments.onCreated(function() {
   /*if (_debug) {
      console.log(arguments.callee.name + "() Ask for all deployments.");
   }
   _autoRefresh.set('target', "getDeployments");
   _autoRefresh.set('collection', "deployments");
   _autoRefresh.set('arguments', undefined);
   askFor('getDeployments', 'deployments', undefined); */
   call_asker('getDeployments', 'deployments', 'deployments', undefined, false);
});

Template.all_deployments.helpers({
    getConditions(_conditionsArray) {
       if (_debug) {
          console.log(arguments.callee.name + "() get deployment availability. " + _conditionsArray.length);
          console.dir(_conditionsArray);
       }
       let available = {
           'string': 'Unknown',
           'status': 'False',
           'badge': 'badge-secondary'
       };
       for (var i = 0; i < _conditionsArray.length; i++) {
          if (_conditionsArray[i].type == 'Available') {
             if (_conditionsArray[i].status == 'True') {
                available = {
                   'string': 'Available',
                   'status': 'True',
                   'badge': 'badge-success'
                };
             } else if (_conditionsArray[i].status == 'False') {
                available = {
                   'string': 'Not Available',
                   'status': 'False',
                   'badge': 'badge-danger'
                };
             } else {
                available = {
                   'string': _conditionsArray[i].type,
                   'status': _conditionsArray[i].status,
                   'badge': 'badge-warning'
                };
             }
          }
       }
       return Spacebars.SafeString('<span class="badge ' + available.badge + '">' + available.string + '</span>');
    },
});

