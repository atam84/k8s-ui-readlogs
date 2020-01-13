import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Template } from 'meteor/templating';
import { _ } from 'underscore';

import './endpoints.html';


Template.all_endpoints.helpers({
});

Template.all_endpoints.onCreated(function() {
    call_asker('getEndpoints', 'endpoints', 'endpoints', undefined, false);
});

