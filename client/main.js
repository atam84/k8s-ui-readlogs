import 'bootstrap';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { ReactiveDict } from 'meteor/reactive-dict'
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Mongo } from 'meteor/mongo'
import { _ } from 'underscore';

_display = new ReactiveVar();
_data = new ReactiveDict();
_autoRefresh = new ReactiveDict();
/*
_autoRefresh = {
   target: string,
   collection: string,
   arguments: dict/undefined,
   interval: Num,
   isAutoRefresh: bool,
   stopAutoRefresh: bool
}
*/
_debug = true;
_app_name = 'k8s-ui-readLogs';
<<<<<<< HEAD
_version = 'beta v0.4.1';
let _intervalHandler = undefined;

Collections = {};
Collections.namespaces   = new Mongo.Collection(null);
Collections.nodes        = new Mongo.Collection(null);
Collections.pods         = new Mongo.Collection(null);
Collections.services     = new Mongo.Collection(null);
Collections.events       = new Mongo.Collection(null);
Collections.deployments  = new Mongo.Collection(null);
Collections.daemonsets   = new Mongo.Collection(null);
Collections.replicasets  = new Mongo.Collection(null);
Collections.statefulsets = new Mongo.Collection(null);
Collections.components   = new Mongo.Collection(null);
Collections._trash       = new Mongo.Collection(null);
Collections._data        = new Mongo.Collection(null);
=======
_version = 'beta v0.3.7';
>>>>>>> master

import './main.html';
import '../lib/routes';

import '../imports/api/client/helpers';
import '../imports/api/client/templates-helpers';

import '../imports/ui/namespaces/namespaces';
import '../imports/ui/nodes/nodes';
import '../imports/ui/pods/pods';
import '../imports/ui/services/services';
import '../imports/ui/mainpage/mainpage';
import '../imports/ui/events/events';
import '../imports/ui/deployments/deployments';


Template.refreshControl.events({
   'click .autoRefresh': (e, t) => {
      e.preventDefault();
      _autoRefresh.set('isAutoRefresh', true);
      _autoRefresh.set('stopAutoRefresh', false);
      let interval = parseInt(t.find('#interval').value);
      console.log(' interval = ' + interval + ' typeof interval = ' + typeof interval);
      if (interval !== undefined && interval !== null && typeof interval === 'number') {
         _autoRefresh.set('interval', interval * 1000);
      } 
   },
   'click .stopAutoRefresh': () => {
      _autoRefresh.set('isAutoRefresh', false);
      _autoRefresh.set('stopAutoRefresh', true);
   }
});


Tracker.autorun((internalHandle) => {
   if (_autoRefresh.get('isAutoRefresh') === true && _autoRefresh.get('stopAutoRefresh') === false) {
      if (_autoRefresh.get('interval') === undefined) {
         _autoRefresh.set('interval', 5000);
      }
      if (_intervalHandler === undefined) {
         if (_debug) {
            console.log('Auto refresh started, interval = ' + _autoRefresh.get('interval'));
         }
         _intervalHandler = Meteor.setInterval(function() {
            askFor(_autoRefresh.get('target'), _autoRefresh.get('collection'), _autoRefresh.get('arguments'))
         }, parseInt(_autoRefresh.get('interval')));
      }
      //askFor(_autoRefresh.get('target'), _autoRefresh.get('collection'), _autoRefresh.get('arguments'));
   }
   if (_autoRefresh.get('isAutoRefresh') === false && _autoRefresh.get('stopAutoRefresh') === true) {
      console.log('setInterval will be stopped.');
      if (_intervalHandler !== undefined) {
         if (_debug) {
            console.log('Auto refresh stopped.');
         }
         console.log('STOP REFRESH');
         Meteor.clearInterval(_intervalHandler);
      }
      _intervalHandler = undefined;
   }
   //internalHandle.stop();
   return;
});


