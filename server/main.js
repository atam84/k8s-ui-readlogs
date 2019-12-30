import { Meteor } from 'meteor/meteor';
//import { k8s } from '@kubernetes/client-node';

const k8s = require('@kubernetes/client-node');
const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
    'getNameSpaces': () => {
        console.log('*** Serving k8s namespaces');
        return k8sApi.listNamespace().then((res) => {
          return res.body;
        });
    },
    'getNodes': () => {
        console.log('*** Serving Cluster nodes');
        return k8sApi.listNode().then((res) => {
          return res.body;
        });
    },
    'getNamespacedPods': (_objParms) => {
      console.log('*** Serving pods in ' + _objParms.namespace + ' namespaces');
      return k8sApi.listNamespacedPod(_objParms.namespace).then((res) => {
        return res.body;
      });
    },
    'getAllPods': (_objParms) => {
      console.log('*** Serving pods in all namespaces');
      return k8sApi.listPodForAllNamespaces().then((res) => {
        return res.body;
      });
    },
    'getPodLogs': (_objParms) => {
      console.log('*** Serving logs for ' + _objParms.podName + ' in ' + _objParms.namespace + ' namespaces');
      return k8sApi.readNamespacedPodLog(_objParms.podName, _objParms.namespace).then((res) => {
        return { 'items': res.body } ;
      });
    },
    'getNamespacePod': (_objParms) => {
      console.log('*** Serving information about ' + _objParms.podName  + ' in ' + _objParms.namespace + ' namespaces');
      return k8sApi.readNamespacedPod(_objParms.podName, _objParms.namespace).then((res) => {
        return { 'items': res.body };
      });
    }

});
