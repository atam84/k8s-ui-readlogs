import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { _ } from 'underscore';

import './daemonsets.html';


Template.all_daemonsets.onCreated(function() {
   if (_debug) {
      console.log(arguments.callee.name + "() Ask for all daemonsets.");
   }
   _autoRefresh.set('target', "getDaemonsets");
   _autoRefresh.set('collection', "daemonsets");
   _autoRefresh.set('arguments', undefined);
   askFor('getDaemonsets', 'daemonsets', undefined);
});

Template.all_daemonsets.helpers({
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

