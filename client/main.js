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
_version = 'beta v0.4.0';


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
Collections._trash       = new Mongo.Collection(null);
Collections._data        = new Mongo.Collection(null);

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


