import { Meteor } from 'meteor/meteor';
//import { k8s } from '@kubernetes/client-node';

const _server_version = 'beta v0.1.6';
const _app_name = 'k8s-readLogs-server';
const k8s = require('@kubernetes/client-node');
const sizeof = require('object-sizeof');
const dateNow = () => {
  let date = new Date();
  let mounth = ("0" + (date.getMonth() + 1)).slice(-2);
  let day = ("0" + date.getDate()).slice(-2);
  let hour = ("0" + date.getHours()).slice(-2);
  let minutes = ("0" + date.getMinutes()).slice(-2);
  let seconds = ("0" + date.getSeconds()).slice(-2);
  return [date.getFullYear(), mounth, day].join("-") + " " + [hour, minutes, seconds].join(":");

}
const dataSize = (_data, _adaptUnit=true) => {
  let logsize = sizeof(_data);
  if (logsize >= 1024000) {
    return ((logsize/1000)/1024).toFixed(2) + ' Mb';
  } else if (logsize <= 1024000 && logsize >= 1000) {
    return (logsize/1000).toFixed(2) + ' Kb'
  }
  return logsize + ' Bytes';
}
const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
const k8sApiApps = kc.makeApiClient(k8s.AppsV1Api);

Meteor.startup(() => {
  // code to run on server at startup
  console.log('Staring time : ' + dateNow());
  console.log('######################################################################');
  console.log('Start ' + _app_name + ' version : ' + _server_version);
  console.log('######################################################################');
});

Meteor.methods({
    'getNameSpaces': () => {
        console.log(dateNow() + ' *** (NAMESPACES) Serving k8s namespaces');
        return k8sApi.listNamespace().then((res) => {
          return res.body;
        });
    },
    'getNodes': () => {
        console.log(dateNow() + ' *** (NODES) Serving Cluster nodes');
        return k8sApi.listNode().then((res) => {
          return res.body;
        });
    },
    'getComponentStatus': () => {
      console.log(dateNow() + ' *** (COMPONENT STATUS) Serving Component Status');
      return k8sApi.listComponentStatus().then((res) => {
        return res.body;
      });
    },
    'getDeployments': () => {
      console.log(dateNow() + ' *** (DEPLOYMENTS) Serving all deployments');
      return k8sApiApps.listDeploymentForAllNamespaces().then((res) => {
        return res.body;
      });
    },
    'getDaemonsets': () => {
      console.log(dateNow() + ' *** (DAEMONSETS) Serving all daemonsets');
      return k8sApiApps.listDaemonSetForAllNamespaces().then((res) => {
        return res.body;
      });
    },
    'getStatefulsets': () => {
      console.log(dateNow() + ' *** (STATEFULSETS) Serving all statefulsets');
      return k8sApiApps.listStatefulSetForAllNamespaces().then((res) => {
        return res.body;
      });
    },
    'getAllEvents': () => {
      console.log(dateNow() + ' *** (ALL EVENTS) Serving all events');
      return k8sApi.listEventForAllNamespaces().then((res) => {
        return res.body;
      });
    },
    'getAllServices': () => {
      console.log(dateNow() + ' *** (SERVICES) Serving all services');
      return k8sApi.listServiceForAllNamespaces().then((res) => {
        return res.body;
      });
    },
    'getNamespacedPods': (_objParms) => {
      console.log(dateNow() + ' *** (PODS NS) Serving pods in ' + _objParms.namespace + ' namespaces');
      return k8sApi.listNamespacedPod(_objParms.namespace).then((res) => {
        return res.body;
      });
    },
    'getAllPods': (_objParms) => {
      console.log(dateNow() + ' *** (ALL PODS) Serving pods in all namespaces');
      return k8sApi.listPodForAllNamespaces().then((res) => {
        return res.body;
      });
    },
    'getPodLogs': (_objParms) => {
      let logsize = 0;
      return k8sApi.readNamespacedPodLog(_objParms.podName, _objParms.namespace, _objParms.container).then((res) => {
        logsize = dataSize({ 'items': res.body });
        console.log(dateNow() + ' *** (POD LOG) Serving logs for ' + _objParms.podName + ' in ' + _objParms.namespace + ' namespaces.');
        console.log(dateNow() + ' *** (POD LOG) Container : ' + _objParms.container);
        console.log(dateNow() + ' *** (POD LOG) Log size: ' + logsize);
        return { 'items': res.body };
      });
    },
    'getNamespacePod': (_objParms) => {
      console.log(dateNow() + ' *** (POD) Serving information about ' + _objParms.podName  + ' in ' + _objParms.namespace + ' namespaces');
      return k8sApi.readNamespacedPod(_objParms.podName, _objParms.namespace).then((res) => {
        return { 'items': res.body };
      });
    },
    'getService': (_objParms) => {
      console.log(dateNow() + ' *** (SERVICE) Serving information about ' + _objParms.serviceName  + ' in ' + _objParms.namespace + ' namespaces');
      return k8sApi.readNamespacedService(_objParms.serviceName, _objParms.namespace).then((res) => {
        return { 'items': res.body };
      });
    }
});


