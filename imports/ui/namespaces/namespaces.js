import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Template } from 'meteor/templating';

import './namespaces.html';


Template.List_namespaces.created = (_debug=true) => {
    console.log("Ask for namespaces list, trigger autoreload data.");
    askFor('getNameSpaces', 'namespaces', '/namespaces', true);
    updateNamespace = Meteor.setInterval(() => {
        askFor('getNameSpaces', 'namespaces', '/namespaces', true);
    }, 5000);
}

Template.List_namespaces.helpers({
    get_listNameSpaces(_debug=true) {
        console.log("Ask for namespaces list");
        return _data.get('namespaces');    
    },
    /**
     * Activate and deactivate the autoupdate
     */
});


Template.List_namespaces.destroyed = function() {
    console.log("namespaces remove autoreload data.");
    Meteor.clearInterval(updateNamespace);
};
