import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Template } from 'meteor/templating';
import { _ } from 'underscore';

import './events.html';


Template.all_events.helpers({
    getAllEvents() {
        if (_debug) {
            console.log(arguments.callee.name + "() Ask for all events.");
        }
        return askFor('getAllEvents', 'all_events', undefined);
    }
});
