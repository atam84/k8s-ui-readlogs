import 'bootstrap';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { ReactiveDict } from 'meteor/reactive-dict'
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import './main.html';
import '../lib/routes.js';


const _display = new ReactiveVar();
const _data = new ReactiveDict();


Template.List_namespaces.helpers({
  get_listNameSpaces() {
    return _data.get('namespaces');
  },
});

Template.mainMenu.events({
  'click .get-namespaces': (e, instance) => {
    e.preventDefault();
    console.log("Ask for namespaces list");
    Meteor.call('getNameSpaces', (err, res) => {
      if (err) {
        console.log("ERROR : " + err);
      } else {
        console.dir(res.items);
        _data.set('namespaces', res.items);
      }
    });
  },
  'click .get-cluster': (e, instance) => {
    e.preventDefault();
    console.log("Ask for cluster information");
    Meteor.call('getNodes', (err, res) => {
      if (err) {
        console.log("ERROR : " + err);
      } else {
        console.dir(res);
        _data.set('cluster', res);
      }
    });
  }
});

