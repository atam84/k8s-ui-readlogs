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
    'getNamespacedPod': () => {
      console.log('*** Serving pods in default namespaces');
      return k8sApi.listNamespacedPod('default').then((res) => {
        return res.body;
      });
    },
    

});
