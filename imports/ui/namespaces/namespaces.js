import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Template } from 'meteor/templating';

import './namespaces.html';


Template.List_namespaces.created = () => {
    if(_debug) {
        console.log("namespaces: list and trigger autoreload data.");
    }
    askFor('getNameSpaces', 'namespaces', undefined);
    /*updateNamespace = Meteor.setInterval(() => {
        askFor('getNameSpaces', 'namespaces', '/namespaces');
    }, 5000);*/
}

Template.List_namespaces.helpers({
    get_listNameSpaces() {
        if (_debug) {
            console.log(arguments.callee.name + "()   Params: " + arguments);
        }
        return _data.get('namespaces');    
    },
    /**
     * Activate and deactivate the autoupdate
     */
});


Template.List_namespaces.destroyed = function() {
    if(_debug) {
        console.log("namespaces: remove autoreload data.");
    }
    //Meteor.clearInterval(updateNamespace);
};
