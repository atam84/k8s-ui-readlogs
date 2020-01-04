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