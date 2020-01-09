import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Template } from 'meteor/templating';
import { _ } from 'underscore';

import './pods.html';


Template.List_allPods.onCreated(function() {
    if (_debug) {
       console.log(arguments.callee.name + "() Ask for all pods.");
    }
    _autoRefresh.set('target', "getAllPods");
    _autoRefresh.set('collection', "pods");
    _autoRefresh.set('arguments', undefined);
    askFor('getAllPods', 'pods', undefined);
});

Template.List_namespacePods.onCreated(function() {
    if (_debug) {
       console.log(arguments.callee.name + "() Ask for all pods.");
    }
    _autoRefresh.set('target', "getAllPods");
    _autoRefresh.set('collection', "pods");
    _autoRefresh.set('arguments', undefined);
    askFor('getAllPods', 'pods', undefined);
});

Template.pod_Details.onCreated(function() {
    if (_debug) {
       console.log(arguments.callee.name + "() Ask for all pods.");
    }
    _autoRefresh.set('target', "getAllPods");
    _autoRefresh.set('collection', "pods");
    _autoRefresh.set('arguments', undefined);
    askFor('getAllPods', 'pods', undefined);
});

Template.List_namespacePods.helpers({
    getNamespacePods() {
        let selected_namespace = FlowRouter.getParam('_namespace');
        if (_debug) {
            console.log(arguments.callee.name + "() list pods in namespace : " + selected_namespace);
        }
        return findManyDocument('pods', {'metadata.namespace': selected_namespace});
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


Template.pod_Logs.helpers({
    loadPodLogs() {
       logLoader();
    },
    getPodLogs() {
       return _data.get('podLogs');
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

Template.pod_Logs.events({
   'click .reloadLog': (e) => {
      e.preventDefault();
      console.log('*** Reload LOG');
      logLoader();
   }
});

Template.pod_Logs.destroyed = function() {
    if(_debug) {
        console.log("Remove stored log.");
    }
    _data.set('pod_logs', undefined);
};

Template.pod_Details.helpers({
    podDetails() {
        let selected_namespace = FlowRouter.getParam('_namespace');
        let selected_pod = FlowRouter.getParam('_podName');
        let podInfo = findOneDocument('pods', {'metadata.namespace': selected_namespace, 'metadata.name': selected_pod});
        if(_debug) {
            console.log(arguments.callee.name + "()");
            console.log(podInfo);
        }
        return podInfo;
    }
});


