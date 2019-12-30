import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Template } from 'meteor/templating';
import { _ } from 'underscore';

import './pods.html';
import { Z_DATA_ERROR } from 'zlib';



Template.List_namespacePods.helpers({
    getNamespacePods() {
        let selected_namespace = FlowRouter.getParam('_namespace');
        if (_debug) {
            console.log(arguments.callee.name + "() Ask for pods in namespace : " + selected_namespace);
        }
        return askFor('getNamespacedPods', 'namespace_pods', '/pods/' + selected_namespace, {'namespace': selected_namespace});
        //return nodes_info(_data.get('cluster'));
    },
    getNamespace() {
        let selected_namespace = FlowRouter.getParam('_namespace');
        if (_debug) {
            console.log(arguments.callee.name + "() selected namespace : " + selected_namespace);
        }
        return selected_namespace;
    }
});

Template.List_allPods.helpers({
    getAllPods() {
        if (_debug) {
            console.log(arguments.callee.name + "() Ask for all pods : ");
        }
        return askFor('getAllPods', 'all_pods', '/pods');
    }
});

Template.pod_Logs.helpers({
    getPodLogs() {
        let selected_namespace = FlowRouter.getParam('_namespace');
        let selected_pod = FlowRouter.getParam('_podName');
        let logs = askFor('getPodLogs', 'pod_logs', '/pods/' + selected_namespace + '/' + selected_pod, {'namespace': selected_namespace, 'podName': selected_pod});
        if (_debug) {
            console.log(arguments.callee.name + "()  Ask for " + selected_pod + " in namespace : " + selected_namespace);
            console.log(logs);
        }
        return logs;
    }
});

Template.pod_Logs.destroyed = function() {
    if(_debug) {
        console.log("Remove stored log.");
    }
    _data.set('pod_logs', undefined);
};


/*getPodDetails = (refreshInterval=5000) => {
    if (_debug) {
        console.log(arguments.callee.name + "() Ask for pod information and trigger autoreload data.");
    }
    let selected_namespace = FlowRouter.getParam('_namespace');
    let selected_pod = FlowRouter.getParam('_podName');
    askFor('getNamespacePod', 'selected_pod', '/pods/' + selected_namespace + '/' + selected_pod, {'namespace': selected_namespace, 'podName': selected_pod});
    updateCluster = Meteor.setInterval(() => {
        askFor('getNamespacePod', 'selected_pod', '/pods/' + selected_namespace + '/' + selected_pod, {'namespace': selected_namespace, 'podName': selected_pod});
    }, refreshInterval);
}

Template.pod_Details.created = (refreshInterval=5000) => {
    getPodDetails(refreshInterval);
}*/

Template.pod_Details.helpers({
    podDetails() {
        let selected_namespace = FlowRouter.getParam('_namespace');
        let selected_pod = FlowRouter.getParam('_podName');
        let podInfo = askFor('getNamespacePod', 'selected_pod', '/pods/' + selected_namespace + '/' + selected_pod, {'namespace': selected_namespace, 'podName': selected_pod});
        if(_debug) {
            console.log(arguments.callee.name + "()");
            console.log(podInfo);
        }
        return podInfo;
    }
});

/*
Template.pod_Details.destroyed = function() {
    if(_debug) {
        console.log("podDetails remove autoreload data.");
    }
    Meteor.clearInterval(updateCluster);
};*/

