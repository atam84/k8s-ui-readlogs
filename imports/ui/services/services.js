import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Template } from 'meteor/templating';
import { _ } from 'underscore';

import './services.html';



Template.list_services.helpers({
    getAllServices() {
        if (_debug) {
            console.log(arguments.callee.name + "() Ask for all services.");
        }
        return askFor('getAllServices', 'services', '/services');
        //return nodes_info(_data.get('cluster'));
    },

});


Template.get_service.helpers({
    getService() {
        let _args = {};
        let _path = "";
        _args = {
            'namespace': FlowRouter.getParam('_namespace'),
            'serviceName': FlowRouter.getParam('_serviceName'),
        }
        path = '/service/' + _args.namespace + '/' + _args.serviceName;
        
        let logs = askFor('getService', 'service', _path, _args);
        if (_debug) {
            console.log(arguments.callee.name + "()  Ask for " + _args.serviceName + " in namespace : " + _args.namespace);
            console.log(logs);
        }
        return logs;
    },
});

