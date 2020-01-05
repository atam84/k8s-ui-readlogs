import 'bootstrap';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { ReactiveDict } from 'meteor/reactive-dict'
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { _ } from 'underscore';

_display = new ReactiveVar();
_data = new ReactiveDict();
_debug = true;
_app_name = 'k8s-ui-readLogs';
_version = 'beta v0.3.6';

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

/**
 * MainMenu click event that forward to the rigth route using href
 */
Template.mainMenu.events({
  'click .get-cluster-res': (e) => {
    e.preventDefault();
    let _path = e.target.pathname;
    if (_debug) {
      console.log("*** Selected target : " + _path);
    }
    goTo(_path);
  },
});

