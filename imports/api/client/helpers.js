import { _ } from 'underscore';
import { EJSON } from 'meteor/ejson';
import { isUndefined } from 'util';


encodeKey = (key) => {
   return key.replace(/\\/g, "\\\\").replace(/\$/g, "\\u0024").replace(/\./g, "\\u002e");
}

decodeKey = (key) => {
   return key.replace(/\\u002e/g, ".").replace(/\\u0024/g, "\$").replace(/\\\\/g, "\\");
}

transformObj = (obj, coder='encode') => {
   return Object.keys(obj).reduce((xformed, key) => {
      let value = obj[key];
      if (value === null) value = 'null';
      if (value === undefined) value = 'undefined';
      if (Object.prototype.toString.call(value) === '[object Date]') value = new Date(value).valueOf();
      if (Object.prototype.toString.call(value) === '[object Array]') {
        let val = value;
        value = [];
        for (var i = 0; i < val.length; i++) {
            if (Object.prototype.toString.call(val[i]) === '[object String]') {
               value.push(val[i]);
            } else {
               value.push(transformObj(val[i], coder));
            } 
        }
      }
      if (Object.prototype.toString.call(value) === '[object Object]') {
         value = transformObj(value, coder);
      }
      if (coder === 'encode') {
         xformed[encodeKey(key)] = value;
      } else if (coder === 'decode') {
         xformed[decodeKey(key)] = value;
      }
      return xformed;
   }, {});
   return obj;
}

logLoader = () => {
    let _args = {};
    let _path = '';
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

    let logs = getPodLogs(_args);
    if (_debug) {
       console.log(arguments.callee.name + "()  Ask for " + _args.podName + " in namespace : " + _args.namespace + " (" + _args.container + ")");
       console.log(logs);
    }
    return logs;
}

getPodLogs = (_objParams=undefined) => {
    let key = 'podLogs';
    let action = 'getPodLogs';
    if (_debug) {
        console.log(arguments.callee.name + "   Params: " + arguments);
    }
    if (isUndefined(_objParams)) {
        Meteor.call(action, (err, res) => {
            if (err) {
                console.log("ERROR : " + err);
            } else {
                if (_debug) {
                    console.log('Response :');
                    console.dir(res);
                }
                _data.set(key, res.items);
            }
        });
    } else {
        Meteor.call(action, _objParams, (err, res) => {
            if (err) {
                console.log("ERROR : " + err);
            } else {
                if (_debug) {
                    console.log('Response :');
                    console.dir(res);
                }
                _data.set(key, res.items);
            }
        });
    }
    return _data.get(key);
}

askFor = (action, key='_trash', _objParams=undefined) => {
    if (_debug) {
        console.log(arguments.callee.name + " ***********   Params: ");
        console.dir(arguments);
    }
    //if (isUndefined(_objParams)) {
        Meteor.call(action, _objParams, (err, res) => {
            if (err) {
                console.log("ERROR : " + err);
            } else {
                if (_debug) {
                    console.log('Response :');
                    console.dir(res);
                }
                _data.set(key, res.items);
                if(Array.isArray(res.items)) {
                   Collections[key].remove({});
                   res.items.forEach((item, index) => {
                      Collections[key].insert(transformObj(item, "encode"), (err, res) => {
                         if(err) {
                           console.log(err);
                         }
                      });
                   });
                } else {
                   Collections[key].insert(transformObj(res.items, "encode"), (err, res) => {
                      if(err) {
                         console.log(err);
                      }
                   });
                }
            }
        });
    /*} else {
        Meteor.call(action, _objParams, (err, res) => {
            if (err) {
                console.log("ERROR : " + err);
            } else {
                if (_debug) {
                    console.log('Response :');
                    console.dir(res);
                }
                _data.set(key, res.items);
                if(Array.isArray(res.items)) {
                   res.items.forEach((item, index) => {
                      console.log(' **** insert index : ' + index);
                      Collections[key].insert(item);
                   });
                } else {
                   Collections[key].insert(res.items);
                }
            }
        });
    } */
    //return _data.get(key);
    return Collections[key].find({}).fetch();
}

goTo = (path) => {
    if (_debug) {
        console.log(arguments.callee.name + "   Path: " + path);
    }
    FlowRouter.go(path);
    return true;
}

kiToGiga = (_str_value) => {
    return (_str_value.replace( /\D+/g, '')/1024**2).toFixed(2);
}

BytesToMib = (_str_value) => {
    return (_str_value/1000**2).toFixed(2);
}

dateAndTime = (_str_date) => {
    if(_str_date === null || _str_date === undefined || _str_date === 'null') {
       return "-";
    }
    let date = new Date(_str_date);
    let mounth = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    let hour = ("0" + date.getHours()).slice(-2);
    let minutes = ("0" + date.getMinutes()).slice(-2);
    let seconds = ("0" + date.getSeconds()).slice(-2);
    return [date.getFullYear(), mounth, day].join("-") + " " + [hour, minutes, seconds].join(":");
}

loadFetchedData = (_collection) => {
   if (_debug) {
      console.log('*** Load data from collection: ' + _collection);
   }
   return Collections[_collection].find({}).fetch();
}

findOneDocument = (_collection, _searchObj) => {
   return Collections[_collection].findOne(_searchObj);
}

findManyDocument = (_collection, _searchObj) => {
   return Collections[_collection].find(_searchObj).fetch();
}

nodes_info = (nodesObjects) => {
    let nodesInfo = [];
    _.each(nodesObjects, (_object) => {
        nodesInfo.push(node_info(_object));
    });
    return nodesInfo;
}


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

