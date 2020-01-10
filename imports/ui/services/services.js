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


Template.list_services.helpers({
    generateTable() {
        let services = loadServices();
        let corpHTML = '';
        let dashIfUndef = function(_data) {
            if (_data === undefined || _data === 'undefined' || _data === null) {
                return '-';
            }
            return _data;
        };
        
        console.log(services);
        for (let i = 0; i < services.length; i++) {
            let rowspan = services[i].spec.ports.length;
            corpHTML = corpHTML + '<tr>';
            corpHTML = corpHTML + '    <td rowspan="' + rowspan + '"><a href="/service/' + services[i].metadata.namespace + '/' + services[i].metadata.name + '">' + services[i].metadata.name + '</a></td>';
            corpHTML = corpHTML + '    <td rowspan="' + rowspan + '">' + services[i].metadata.namespace + '</td>';
            corpHTML = corpHTML + '    <td rowspan="' + rowspan + '">' + services[i].metadata.creationTimestamp + '</td>';
            corpHTML = corpHTML + '    <td rowspan="' + rowspan + '">' + services[i].spec.clusterIP + '</td>';
            corpHTML = corpHTML + '    <td rowspan="' + rowspan + '">' + dashIfUndef(services[i].spec.externalTrafficPolicy) + '</td>';
            corpHTML = corpHTML + '    <td>' + dashIfUndef(services[i].spec.ports[0].nodePort) + '</td>';
            corpHTML = corpHTML + '    <td>' + dashIfUndef(services[i].spec.ports[0].port) + '</td>';
            corpHTML = corpHTML + '    <td>' + dashIfUndef(services[i].spec.ports[0].protocol) + '</td>';
            corpHTML = corpHTML + '    <td>' + dashIfUndef(services[i].spec.ports[0].targetPort) + '</td>';
            corpHTML = corpHTML + '    <td rowspan="' + rowspan + '">' + services[i].spec.type + '</td>';
            corpHTML = corpHTML + '    <td rowspan="' + rowspan + '">' + Object.keys(services[i].status) + '</td>';
            corpHTML = corpHTML + '</tr>';
            if (rowspan > 1) {
                for (let y = 1; y < rowspan; y++) {
                    corpHTML = corpHTML + '<tr>';
                    corpHTML = corpHTML + '    <td>' + dashIfUndef(services[i].spec.ports[y].nodePort) + '</td>';
                    corpHTML = corpHTML + '    <td>' + dashIfUndef(services[i].spec.ports[y].port) + '</td>';
                    corpHTML = corpHTML + '    <td>' + dashIfUndef(services[i].spec.ports[y].protocol) + '</td>';
                    corpHTML = corpHTML + '    <td>' + dashIfUndef(services[i].spec.ports[y].targetPort) + '</td>';
                    corpHTML = corpHTML + '</tr>';
                }
            }
        }
        console.log(corpHTML);
        return Spacebars.SafeString(corpHTML);
    }
});



Template.get_service.helpers({
    getService() {
        let _args = {};
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

