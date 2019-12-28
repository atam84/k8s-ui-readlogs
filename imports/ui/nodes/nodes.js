import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Template } from 'meteor/templating';
import { _ } from 'underscore';

import './nodes.html';

node_info = (_object) => {
    let MemoryPressure = '';
    let NetworkUnavailable = '';
    let DiskPressure = '';
    let PIDPressure = '';
    let Ready = '';
    _.each(_object.status.conditions, (_condition) => {
        if (_condition.type === "Ready") {
            Ready = _condition.status;
        }
        if (_condition.type === "MemoryPressure") {
            MemoryPressure = _condition.status;
        }
        if (_condition.type === "NetworkUnavailable") {
            NetworkUnavailable = _condition.status;
        }
        if (_condition.type === "DiskPressure") {
            DiskPressure = _condition.status;
        }
        if (_condition.type === "PIDPressure") {
            PIDPressure = _condition.status;
        }
    });
    let nodeInfo = {
        'serverName': _object.metadata.name,
        'uid': _object.metadata.uid,
        'role': undefined,
        'ready': Ready,
        'memorypressure': MemoryPressure,
        'networkunavailable': NetworkUnavailable,
        'disckpressure': DiskPressure,
        'pidpressure': PIDPressure,
        'annotations': _object.metadata.annotations,
        'labels': _object.metadata.labels,
        'createDate': function () {
            let date = new Date(_object.metadata.creationTimestamp);
            let mounth = ("0" + (date.getMonth() + 1)).slice(-2);
            let day = ("0" + date.getDate()).slice(-2);
            return [date.getFullYear(), mounth, day].join("-");
        },
        'createTime': function () {
            let date = new Date(_object.metadata.creationTimestamp);
            let hour = date.getHours();
            let minutes = date.getMinutes();
            let seconds = date.getSeconds();
            return [hour, minutes, seconds].join(":");
        },
        'memory_gi': function() {
            return kiToGiga(_object.status.capacity.memory) + ' Gi';
        },
        'traints': _object.spec.traints,
        'addresses': _object.status.addresses,
        'allocatable': _object.status.allocatable,
        'capacity': _object.status.capacity,
        'conditions': _object.status.conditions,
        'daemonsetEndpoints': _object.status.daemonEndpoints,
        'images': _object.status.images,
        'architecture': _object.status.nodeInfo.architecture,
        'bootID': _object.status.nodeInfo.bootID,
        'containerRuntimeVersion': _object.status.nodeInfo.containerRuntimeVersion,
        'kernelVersion': _object.status.nodeInfo.kernelVersion,
        'kubeProxyVersion': _object.status.nodeInfo.kubeProxyVersion,
        'kubeletVersion': _object.status.nodeInfo.kubeletVersion,
        'machineID': _object.status.nodeInfo.machineID,
        'operatingSystem': _object.status.nodeInfo.operatingSystem,
        'osImage': _object.status.nodeInfo.osImage,
        'systemUUID': _object.status.nodeInfo.systemUUID
    };
    return nodeInfo;
}

nodes_info = (nodesObjects) => {
    let nodesInfo = [];
    _.each(nodesObjects, (_object) => {
        nodesInfo.push(node_info(_object));
    });
    return nodesInfo;
}

selectedNode = (_nodeName, _clusterArray) => {
    console.log("Selected node = " + _nodeName + "  " + _clusterArray.length + " elements");
    for(var i=0; i <= _clusterArray.length; i++) {
        console.log(_clusterArray[i].metadata.name + " == " + _nodeName);
        if (_clusterArray[i].metadata.name == _nodeName) {
            return _clusterArray[i];
        }
    }
    return undefined;
}

getClusterNodes = (refreshInterval=5000, _debug) => {
    console.log("Ask for cluster list, trigger autoreload data.");
    askFor('getNodes', 'cluster', '/cluster');
    updateCluster = Meteor.setInterval(() => {
        askFor('getNodes', 'cluster', '/cluster');
    }, refreshInterval);
}

Template.List_nodes.created = (refreshInterval=5000, _debug=true) => {
    getClusterNodes(refreshInterval, _debug);
}

Template.List_nodes.helpers({
    get_listNodes(_debug=true) {
        console.log("Ask for cluster list");
        return nodes_info(_data.get('cluster'));    
    },
    /**
     * Activate and deactivate the autoupdate
     */
});

Template.List_nodes.destroyed = function() {
    console.log("cluster remove autoreload data.");
    Meteor.clearInterval(updateCluster);
};


Template.Details_node.created = (refreshInterval=5000, _debug=true) => {
    getClusterNodes(refreshInterval, _debug);
}


Template.Details_node.helpers({
    get_nodeDetails() {
        let _nodeName = FlowRouter.getParam("_nodeName");
        let nodeInfo = node_info(selectedNode(_nodeName, _data.get('cluster')));
        console.dir(nodeInfo);
        return nodeInfo;
    },

});

Template.Details_node.destroyed = function() {
    console.log("cluster remove autoreload data.");
    Meteor.clearInterval(updateCluster);
};
