import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Template } from 'meteor/templating';
import { _ } from 'underscore';

import '../events/events';
import './mainpage.html';


Template.mainPage.helpers({
    getComponentStatus() {
        if (_debug) {
            console.log(arguments.callee.name + "() Ask for Component Status.");
        }
        return askFor('getComponentStatus', 'component_status', '/');
    }
});


