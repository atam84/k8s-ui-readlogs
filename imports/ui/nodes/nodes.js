import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Template } from 'meteor/templating';
import { _ } from 'underscore';
const c3 = require('c3');
//import { c3 } from 'c3';
import './nodes.html';

Template.List_nodes.onRendered(() => {
    var chart1 = c3.generate({
        data: {
            columns: [

                ['data3', 69]
            ],
            type: 'gauge',
            onclick: function (d, i) { console.log("onclick", d, i); },
            onmouseover: function (d, i) { console.log("onmouseover", d, i); },
            onmouseout: function (d, i) { console.log("onmouseout", d, i); }
        },
        gauge: {
    //        label: {
    //            format: function(value, ratio) {
    //                return value;
    //            },
    //            show: false // to turn off the min/max labels.
    //        },
    //    min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
    //    max: 100, // 100 is default
    //    units: ' %',
    //    width: 39 // for adjusting arc thickness
        },
        color: {
            pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
            threshold: {
                values: [30, 60, 90, 100]
            }
        },
        size: {
            height: 180
        }
    });
});



Template.List_nodes.onCreated(function() {

    call_asker('getNodes', 'nodes', 'nodes', undefined, false);
});

/*
*/
Template.Details_node.onCreated(function() {
    call_asker('getNodes', 'nodes', 'nodes', undefined, false);
});

Template.List_nodes.helpers({
    createGraph() {
        return Spacebars.SafeString('<div id="chart1"></div>');
    }
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


