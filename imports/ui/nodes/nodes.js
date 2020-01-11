import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Template } from 'meteor/templating';
import { _ } from 'underscore';

import './nodes.html';


Template.List_nodes.onCreated(function() {
    /*if (_debug) {
       console.log(arguments.callee.name + "() Ask for all nodes.");
    }
    _autoRefresh.set('target', "getNodes");
    _autoRefresh.set('collection', "nodes");
    _autoRefresh.set('arguments', undefined);
    askFor('getNodes', 'nodes', undefined); */
    call_asker('getNodes', 'nodes', 'nodes', undefined, false);
});

/*
*/
Template.Details_node.onCreated(function() {
    /*if (_debug) {
       console.log(arguments.callee.name + "() Ask for all nodes.");
    }
    _autoRefresh.set('target', "getNodes");
    _autoRefresh.set('collection', "nodes");
    _autoRefresh.set('arguments', undefined); */
    call_asker('getNodes', 'nodes', 'nodes', undefined, false);
});


Template.Details_node.helpers({
    get_nodeDetails() {
        let _nodeName = FlowRouter.getParam("_nodeName");
        //let nodeInfo = node_info(selectedNode(_nodeName, _data.get('nodes')));
        let nodeInfo = node_info(findOneDocument('nodes', {'metadata.name': _nodeName}));
        if(_debug) {
            console.log(arguments.callee.name + '() : ');
            console.dir(nodeInfo);
        }
        return nodeInfo;
    },

});


