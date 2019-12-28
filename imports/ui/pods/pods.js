import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Template } from 'meteor/templating';
import { _ } from 'underscore';

import './pods.html';



Template.List_namespacePods.helpers({
    getNamespacePods(_debug=true) {
        console.log("Ask for pods in namespace : " + FlowRouter.getParam('_namespace'));
        return askFor('getNamespacedPods', 'namespace_pods', '/pods/' + FlowRouter.getParam('_namespace'), {'namespace': FlowRouter.getParam('_namespace')});
        //return nodes_info(_data.get('cluster'));
    },
    getNamespace() {
        return FlowRouter.getParam('_namespace');
    }
});

Template.List_allPods.helpers({
    getAllPods() {
        console.log("Ask for pods in namespace : " + FlowRouter.getParam('_namespace'));
        return askFor('getAllPods', 'all_pods', '/pods');
    }
});

Template.pod_Logs.helpers({
    getPodLogs() {
        console.log("Ask for " + FlowRouter.getParam('_podName') + " in namespace : " + FlowRouter.getParam('_namespace'));
        let logs = askFor('getPodLogs', 'pod_logs', '/pods/' + FlowRouter.getParam('_namespace') + '/' + FlowRouter.getParam('_podName'), {'namespace': FlowRouter.getParam('_namespace'), 'podName': FlowRouter.getParam('_podName')});
        console.log(logs);
        return logs;
    }
});
