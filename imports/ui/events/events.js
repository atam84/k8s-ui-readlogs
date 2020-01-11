import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Template } from 'meteor/templating';
import { _ } from 'underscore';

import './events.html';


Template.all_events.helpers({
});

Template.all_events.onCreated(function() {
    /*if (_debug) {
       console.log(arguments.callee.name + "() Ask for all events.");
    }
    _autoRefresh.set('target', "getAllEvents");
    _autoRefresh.set('collection', "events");
    _autoRefresh.set('arguments', undefined);
    askFor('getAllEvents', 'events', undefined); */
    call_asker('getAllEvents', 'events', 'events', undefined, false);
});



