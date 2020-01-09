import { _ } from 'underscore'
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { isObject } from 'util';

Template.registerHelper("objectToPairs",function(object){
    if (_.isArray(object)) {
        return { "value": value };
    }
    /*if (_isString(object)) {
        return { "value": value };
    }*/
    return _.map(object, function(value, key) {
        if(_debug) {
            console.log(' ** key: ' + key + "  value: " + value);
        }
        return {
            "key": key,
            "value": value
        };
    });
});

/***************************  Begin data loaders ***************************/

Template.registerHelper("loadDeployments", function(){
    return loadFetchedData('deployments');
});

Template.registerHelper("loadEvents", function(){
    return loadFetchedData('events');
});

Template.registerHelper("loadServices", function(){
    return loadFetchedData('services');
});

Template.registerHelper("loadNamespaces", function(){
    return loadFetchedData('namespaces');
});

Template.registerHelper("loadNodes", function(){
    return nodes_info(loadFetchedData('nodes'));
});

Template.registerHelper("loadPods", function(){
    return loadFetchedData('pods');
});

Template.registerHelper("loadComponentStatus", function(){
    return loadFetchedData('components');
});
/*************************** End of data loaders ***************************/

Template.registerHelper("kiToGiga",function(_str_value){
    return kiToGiga(_str_value);
});

Template.registerHelper("BytesToMib",function(_str_value){
    return BytesToMib(_str_value);
});

Template.registerHelper("dateAndTime",function(_str_date){
    if (_str_date === null) {
        return '-';
    }
    return dateAndTime(_str_date);
});

Template.registerHelper("numberOrZero",function(_num){
    if (_num === null || _num === undefined) {
        return 0;
    }
    return _num;
});

Template.registerHelper("arrayCount", function(_arrayCount) {
    
    return _arrayCount.length;
});

Template.registerHelper("hasOneContainer", function(_arrayCount){
    if(_arrayCount.length > 1) {
        return false;
    }
    return true;
});

Template.registerHelper("jsonPrint", function(jsonObject) {
    if (typeof jsonObject === 'object') {
        return JSON.stringify(jsonObject, undefined, 4);
    }
    return jsonObject;
});

Template.registerHelper("getAppVersion", function() {
    return _version;
});

Template.registerHelper("getAppName", function() {
    return _app_name;
});

Template.registerHelper("plusOne", function(_index) {
    if (typeof _index === 'number') {
        return _index + 1;
    }
    return _index;
});

Template.registerHelper("selectClass",function(_value){
    let _classes = 'bg-success text-white';
    if (_value.toLowerCase() == "true") {
        _classes = 'bg-success text-white';
    } else if (_value.toLowerCase() == "false") {
        _classes = 'bg-warning text-white';
    } else {
        _classes = 'bg-danger text-white';
    }
    return _classes; 
});

Template.registerHelper("reverseSelectClass",function(_value){
    let _classes = 'bg-success text-white';
    if (_value.toLowerCase() == "true") {
        _classes = 'bg-warning text-white';
    } else if (_value.toLowerCase() == "false") {
        _classes = 'bg-success text-white';
    } else {
        _classes = 'bg-danger text-white';
    }
    return _classes; 
});


Template.registerHelper("statusClass",function(_value){
    let _val = _value.toLowerCase();
    switch (_val) {
        case "pending":
            return "badge-secondary";
        case "running":
        case "true":
        case true:
        case "active":
        case "normal":
            return "badge-success";
        case "succeeded":
            return "badge-info";
        case "failed":
        case "unknown":
        case "error":
        case "fatal":
            return "badge-danger";
        case "false":
        case false:
        case "terminating":
        case "warning":
            return "badge-warning";
        default:
            return "badge-warning";
    }
});


Template.registerHelper("TrueFalseClass",function(_value){
    let _val = _value.toLowerCase();
    switch (_val) {
        case "true":
        case true:
            return "badge-success";
        case "false":
        case false:
            return "badge-danger";
        default:
            return "badge-warning";
    }
});


Template.registerHelper("getContainerStatuses",function(_containerStatuses){
    let ready_count = 0;
    let higth_restart = 0;
    let total = _containerStatuses.length;
    let badge = "badge-warning";
    for (i=0; i<total; i++) {
        if (_containerStatuses[i].ready) {
            ready_count += 1;
        }
        if (_containerStatuses[i].restartCount > higth_restart) {
            higth_restart = _containerStatuses[i].restartCount;
        }
    }
    if (ready_count == total) {
        badge = "badge-success";
    } else if (ready_count == 0) {
        badge = "badge-danger";
    } else {
        badge = "badge-warning";
    }
    let status = {
        "countainers": total,
        "higth_restart": higth_restart,
        "ready": ready_count,
        "failed": total - ready_count,
        "badge": badge
    }
    return status;
});


/*
{
    "containerID": "cri-o://ad3bccd5914bb4465be5e07baf329a6af18a5fb8d6f02535029f04e55c1c97f3",
    "image": "quay.io/coreos/kube-state-metrics:v1.6.0",
    "imageID": "quay.io/coreos/kube-state-metrics@sha256:00ac168a1775e7a972019135dc25f1fc30bd8b30eb6a35b2d4e1621089f2eedf",
    "lastState": {},
    "name": "prometheus-kube-state-metrics",
    "ready": true,
    "restartCount": 0,
    "state": {
      "running": {
        "startedAt": "2019-12-26T18:06:16.000Z"
      }
    }
}


[
    {
      "containerID": "cri-o://afa957896d0897c8a4dcf0d05d83c3f5f09c331357410e99e248776020853d16",
      "image": "docker.io/kubernetesui/dashboard:v2.0.0-beta6",
      "imageID": "docker.io/kubernetesui/dashboard@sha256:a3309c71ebb85a555371e427be52e02cbd20ae4684069357121335f5ee00e8bc",
      "lastState": {
        "terminated": {
          "containerID": "cri-o://afa957896d0897c8a4dcf0d05d83c3f5f09c331357410e99e248776020853d16",
          "exitCode": 2,
          "finishedAt": "2020-01-02T03:22:59.000Z",
          "reason": "Error",
          "startedAt": "2020-01-02T03:22:29.000Z"
        }
      },
      "name": "kubernetes-dashboard",
      "ready": false,
      "restartCount": 27,
      "state": {
        "waiting": {
          "message": "back-off 5m0s restarting failed container=kubernetes-dashboard pod=kubernetes-dashboard-b65488c4-ztmx2_kubernetes-dashboard(4f0c698c-b47e-42b3-b4c3-1e18d12202cd)",
          "reason": "CrashLoopBackOff"
        }
      }
    }
]

*/


