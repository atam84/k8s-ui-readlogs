FlowRouter.route('/', {
    name: 'index',
});


FlowRouter.route('/namespaces', {
    name: 'namespaces',
    action: function() {
      BlazeLayout.render('AppMainView', {main: 'List_namespaces'});
    }
});

/*
FlowRouter.route('/namesapce/:_name', {
  name: 'Namespace.details',
  action() {
    BlazeLayout.render('AppMainView', {main: 'Lists_show_page'});
  }
});
*/

FlowRouter.route('/cluster', {
  name: 'cluster',
  action: function() {
    BlazeLayout.render('AppMainView', {main: 'List_nodes'});
  }
});

FlowRouter.route('/node/:_nodeName', {
  name: 'nodedetails',
  action: function() {
    BlazeLayout.render('AppMainView', {main: 'Details_node'});
  }
});

FlowRouter.route('/pods', {
  name: 'allpods',
  action() {
    BlazeLayout.render('AppMainView', {main: 'List_allPods'});
  }
});

FlowRouter.route('/pods/:_namespace', {
  name: 'podsinnamespace',
  action() {
    BlazeLayout.render('AppMainView', {main: 'List_namespacePods'});
  }
});

FlowRouter.route('/pods/:_namespace/:_podName', {
  name: 'podlogs',
  action() {
    BlazeLayout.render('AppMainView', {main: 'pod_Logs'});
  }
});
