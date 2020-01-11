import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { _ } from 'underscore';

import './statefulsets.html';


Template.all_statefulsets.onCreated(function() {
   /*if (_debug) {
      console.log(arguments.callee.name + "() Ask for all daemonsets.");
   }
   _autoRefresh.set('target', "getStatefulsets");
   _autoRefresh.set('collection', "statefulsets");
   _autoRefresh.set('arguments', undefined);
   askFor('getStatefulsets', 'statefulsets', undefined); */
   call_asker('getStatefulsets', 'statefulsets', 'statefulsets', undefined, false);
});

Template.all_statefulsets.helpers({
    getConditions(_statusObj) {
       if (_debug) {
          console.log(arguments.callee.name + "() set daemonset availability. ");
          console.dir(_statusObj);
       }
       let available = {
           'string': 'Unknown',
           'status': 'False',
           'badge': 'badge-secondary'
       };
       if (_statusObj.desiredNumberScheduled === _statusObj.numberReady) {
          available = {
             'string': 'Available',
             'status': 'True',
             'badge': 'badge-success'
          };
       } else if (_statusObj.desiredNumberScheduled !== _statusObj.numberReady) {
          if (_statusObj.numberReady === 0) {
             available = {
                'string': 'Not Available',
                'status': 'False',
                'badge': 'badge-danger'
             };
          } else {
             available = {
                'string': 'Not fully Available',
                'status': 'False',
                'badge': 'badge-warning'
             };
          }
       }
       return Spacebars.SafeString('<span class="badge ' + available.badge + '">' + available.string + '</span>');
    },
});

