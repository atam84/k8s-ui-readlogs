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
_debug = true;
_app_name = 'k8s-ui-readLogs';
_version = 'beta v0.3.5';

const namespaces = new Mongo.Collection('namespaces');
const nodes = new Mongo.Collection('nodes');
const pods = new Mongo.Collection('pods');
const services = new Mongo.Collection('services');
const events = new Mongo.Collection('events');
const deployments = new Mongo.Collection('deployments');

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



