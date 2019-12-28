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

FlowRouter.route('/node', {
  name: 'nodedetails',
  action: function() {
    BlazeLayout.render('AppMainView', {main: 'Details_node'});
  }
});

