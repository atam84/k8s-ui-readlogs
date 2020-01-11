import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Template } from 'meteor/templating';
import { _ } from 'underscore';

import '../events/events';
import './mainpage.html';

/*
Template.mainPage.helpers({
    getComponentStatus() {
        if (_debug) {
            console.log(arguments.callee.name + "() Ask for Component Status.");
        }
        return askFor('getComponentStatus', 'component_status', '/');
    }
});
*/

Template.mainPage.onCreated(function() {
    /*if (_debug) {
       console.log(arguments.callee.name + "() Ask for all component status.");
    }
    _autoRefresh.set('target', "getComponentStatus");
    _autoRefresh.set('collection', "components");
    _autoRefresh.set('arguments', undefined);
    askFor('getComponentStatus', 'components', undefined); */
    call_asker('getComponentStatus', 'components', 'components', undefined, false);
});

