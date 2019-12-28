import 'bootstrap';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { ReactiveDict } from 'meteor/reactive-dict'
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { _ } from 'underscore';

_display = new ReactiveVar();
_data = new ReactiveDict();

import './main.html';
import '../lib/routes';

import '../imports/api/client/helpers';
import '../imports/api/client/templates-helpers'
import '../imports/ui/namespaces/namespaces';
import '../imports/ui/nodes/nodes';

/**
 * MainMenu click event that forward to the rigth route using href
 */
Template.mainMenu.events({
  'click .get-cluster-res': (e) => {
    e.preventDefault();
    let _path = e.target.pathname;
    console.log("*** Selected target : " + _path);
    goTo(_path);
  },
});

