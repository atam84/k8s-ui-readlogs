import { Meteor } from 'meteor/meteor';
//import { k8s } from '@kubernetes/client-node';

const _server_version = 'beta v0.1.5';
const _app_name = 'k8s-readLogs-server';
const k8s = require('@kubernetes/client-node');
const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
const k8sApiApps = kc.makeApiClient(k8s.AppsV1Api);

Meteor.startup(() => {
  // code to run on server at startup
  console.log('######################################################################');
  console.log('Start ' + _app_name + ' version : ' + _server_version);
  console.log('######################################################################');
});

Meteor.methods({
    'getNameSpaces': () => {
        console.log('*** (NAMESPACES) Serving k8s namespaces');
        return k8sApi.listNamespace().then((res) => {
          return res.body;
        });
    },
    'getNodes': () => {
        console.log('*** (NODES) Serving Cluster nodes');
        return k8sApi.listNode().then((res) => {
          return res.body;
        });
    },
    'getComponentStatus': () => {
      console.log('*** (COMPONENT STATUS) Serving Component Status');
      return k8sApi.listComponentStatus().then((res) => {
        return res.body;
      });
    },
    'getDeployments': () => {
      console.log('*** (DEPLOYMENTS) Serving all deployments');
      return k8sApiApps.listDeploymentForAllNamespaces().then((res) => {
        return res.body;
      });
    },
    'getDaemonsets': () => {
      console.log('*** (DAEMONSETS) Serving all daemonsets');
      return k8sApiApps.listDaemonSetForAllNamespaces().then((res) => {
        return res.body;
      });
    },
    'getStatefulsets': () => {
      console.log('*** (STATEFULSETS) Serving all statefulsets');
      return k8sApiApps.listStatefulSetForAllNamespaces().then((res) => {
        return res.body;
      });
    },
    'getAllEvents': () => {
      console.log('*** (ALL EVENTS) Serving all events');
      return k8sApi.listEventForAllNamespaces().then((res) => {
        return res.body;
      });
    },
    'getAllServices': () => {
      console.log('*** (SERVICES) Serving all services');
      return k8sApi.listServiceForAllNamespaces().then((res) => {
        return res.body;
      });
    },
    'getNamespacedPods': (_objParms) => {
      console.log('*** (PODS NS) Serving pods in ' + _objParms.namespace + ' namespaces');
      return k8sApi.listNamespacedPod(_objParms.namespace).then((res) => {
        return res.body;
      });
    },
    'getAllPods': (_objParms) => {
      console.log('*** (ALL PODS) Serving pods in all namespaces');
      return k8sApi.listPodForAllNamespaces().then((res) => {
        return res.body;
      });
    },
    'getPodLogs': (_objParms) => {
      console.log('*** (POD LOG) Serving logs for ' + _objParms.podName + ' in ' + _objParms.namespace + ' namespaces (' + _objParms.container + ')');
      return k8sApi.readNamespacedPodLog(_objParms.podName, _objParms.namespace, _objParms.container).then((res) => {
        return { 'items': res.body } ;
      });
    },
    'getNamespacePod': (_objParms) => {
      console.log('*** (POD) Serving information about ' + _objParms.podName  + ' in ' + _objParms.namespace + ' namespaces');
      return k8sApi.readNamespacedPod(_objParms.podName, _objParms.namespace).then((res) => {
        return { 'items': res.body };
      });
    },
    'getService': (_objParms) => {
      console.log('*** (SERVICE) Serving information about ' + _objParms.serviceName  + ' in ' + _objParms.namespace + ' namespaces');
      return k8sApi.readNamespacedService(_objParms.serviceName, _objParms.namespace).then((res) => {
        return { 'items': res.body };
      });
    }
});


