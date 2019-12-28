import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Template } from 'meteor/templating';
import { _ } from 'underscore';

import './pods.html';



Template.List_namespacePods.helpers({
    getNamespacePods(_debug=true) {
        console.log("Ask for pods in namespace : " + FlowRouter.getParam('_namespace'));
        console.log(askFor('getNamespacedPods', 'namespace_pods', '/pods/kube-system', true));
        //return nodes_info(_data.get('cluster'));
    },
});

