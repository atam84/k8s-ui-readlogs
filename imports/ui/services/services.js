import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Template } from 'meteor/templating';
import { _ } from 'underscore';

import './services.html';



Template.list_services.helpers({

});

Template.list_services.onCreated(function() {
    if (_debug) {
       console.log(arguments.callee.name + "() Ask for all services.");
    }
    _autoRefresh.set('target', "getAllServices");
    _autoRefresh.set('collection', "services");
    _autoRefresh.set('arguments', undefined);
    askFor('getAllServices', 'services', undefined);
});

Template.get_service.onCreated(function() {
    if (_debug) {
       console.log(arguments.callee.name + "() Ask for all services.");
    }
    _autoRefresh.set('target', "getAllServices");
    _autoRefresh.set('collection', "services");
    _autoRefresh.set('arguments', undefined);
    askFor('getAllServices', 'services', undefined);
});

Template.get_service.helpers({
    getService() {
        let _args = {};
        let _path = '';
        _args = {
            'metadata.namespace': FlowRouter.getParam('_namespace'),
            'metadata.name': FlowRouter.getParam('_serviceName'),
        }
        
        
        let service = findOneDocument('services', _args);
        if (_debug) {
            console.log(arguments.callee.name + "()  Service details " + _args['metadata.name'] + " in namespace : " + _args['metadata.namespace']);
            console.log(service);
        }
        return service;
    },
});

