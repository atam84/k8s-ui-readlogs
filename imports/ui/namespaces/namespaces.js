import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Template } from 'meteor/templating';

import './namespaces.html';


Template.List_namespaces.onCreated(function() {
    /*if (_debug) {
       console.log(arguments.callee.name + "() Ask for all namespaces.");
    }
    _autoRefresh.set('target', "getNameSpaces");
    _autoRefresh.set('collection', "namespaces");
    _autoRefresh.set('arguments', undefined);
    askFor('getNameSpaces', 'namespaces', undefined);*/
    call_asker('getNameSpaces', 'namespaces', 'namespaces', undefined, false);
});

/*
Template.List_namespaces.helpers({
    get_listNameSpaces() {
        if (_debug) {
            console.log(arguments.callee.name + "()   Params: " + arguments);
        }
        return _data.get('namespaces');    
    },
    /**
     * Activate and deactivate the autoupdate
     *
});
*/
