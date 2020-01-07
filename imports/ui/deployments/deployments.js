import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Template } from 'meteor/templating';
import { _ } from 'underscore';

import './deployments.html';


Template.all_deployments.onCreated(function() {
   if (_debug) {
      console.log(arguments.callee.name + "() Ask for all deployments.");
   }
   askFor('getDeployments', 'deployments', undefined);
});

Template.all_deployments.helpers({
    getDeployments() {
        if (_debug) {
            console.log(arguments.callee.name + "() Ask for all deployments.");
        }
        return askFor('getDeployments', 'deployments', undefined);
    },
});

