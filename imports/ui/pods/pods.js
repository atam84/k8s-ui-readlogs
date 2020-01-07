import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Template } from 'meteor/templating';
import { _ } from 'underscore';

import './pods.html';

Template.List_namespacePods.helpers({
    getNamespacePods() {
        let selected_namespace = FlowRouter.getParam('_namespace');
        if (_debug) {
            console.log(arguments.callee.name + "() Ask for pods in namespace : " + selected_namespace);
        }
        return askFor('getNamespacedPods', 'namespace_pods', undefined);
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
        return askFor('getAllPods', 'pods', undefined);
    }
});

Template.pod_Logs.helpers({
    getPodLogs() {
        let _args = {};
        let _path = "";
        let isContainer = FlowRouter.getParam('_container');
        if(isContainer == 'logs' || isContainer == undefined) {
            _args = {
                'namespace': FlowRouter.getParam('_namespace'),
                'podName': FlowRouter.getParam('_podName'),
                'container': undefined
            }
            path = '/pods/' + _args.namespace + '/' + _args.podName + '/logs';
        } else {
            _args = {
                'namespace': FlowRouter.getParam('_namespace'),
                'podName': FlowRouter.getParam('_podName'),
                'container': FlowRouter.getParam('_container')
            }
            path = '/pods/' + _args.namespace + '/' + _args.podName + '/' + _args.container + '/logs';
        }
        
        let logs = askFor('getPodLogs', 'pod_logs', _path, _args);
        if (_debug) {
            console.log(arguments.callee.name + "()  Ask for " + _args.podName + " in namespace : " + _args.namespace + " (" + _args.container + ")");
            console.log(logs);
        }
        return logs;
    },
    podLogsTitle() {
        let _args = {};
        let isContainer = FlowRouter.getParam('_container');
        if(isContainer == 'logs' || isContainer == undefined) {
            _args = {
                'namespace': FlowRouter.getParam('_namespace'),
                'podName': FlowRouter.getParam('_podName'),
                'container': undefined
            }
            return Spacebars.SafeString('Log pod: <font color="gray">' + _args.podName + '</font>  namespace: <font color="gray">' + _args.namespace + '</font>');
        } else {
            _args = {
                'namespace': FlowRouter.getParam('_namespace'),
                'podName': FlowRouter.getParam('_podName'),
                'container': FlowRouter.getParam('_container')
            }
            return Spacebars.SafeString('Log pod: <font color="gray">' + _args.podName + '</font> container : <font color="gray">' + _args.container + '</font>  namespace: <font color="gray">' + _args.namespace + '</font>');
        }
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
        let podInfo = askFor('getNamespacePod', 'selected_pod', undefined);
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

