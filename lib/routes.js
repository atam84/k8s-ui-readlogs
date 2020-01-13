FlowRouter.route('/', {
  name: 'mainPage',
  action: function() {
    BlazeLayout.render('AppMainView', {main: 'mainPage'});
  }
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

FlowRouter.route('/services', {
  name: 'allservices',
  action() {
    BlazeLayout.render('AppMainView', {main: 'list_services'});
  }
});

FlowRouter.route('/endpoints', {
  name: 'allendpoints',
  action() {
    BlazeLayout.render('AppMainView', {main: 'all_endpoints'});
  }
});

FlowRouter.route('/events', {
  name: 'allevents',
  action() {
    BlazeLayout.render('AppMainView', {main: 'all_events'});
  }
});

FlowRouter.route('/deployments', {
  name: 'alldeployments',
  action() {
    BlazeLayout.render('AppMainView', {main: 'all_deployments'});
  }
});

FlowRouter.route('/statefulsets', {
  name: 'allstatefulsets',
  action() {
    BlazeLayout.render('AppMainView', {main: 'all_statefulsets'});
  }
});

FlowRouter.route('/daemonsets', {
  name: 'alldaemonsets',
  action() {
    BlazeLayout.render('AppMainView', {main: 'all_daemonsets'});
  }
});

FlowRouter.route('/service/:_namespace/:_serviceName', {
  name: 'servicenamespace',
  action() {
    BlazeLayout.render('AppMainView', {main: 'get_service'});
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

FlowRouter.route('/pods/:_namespace/:_podName/logs', {
  name: 'podlogs',
  action() {
    BlazeLayout.render('AppMainView', {main: 'pod_Logs'});
  }
});

FlowRouter.route('/pods/:_namespace/:_podName/:_container/logs', {
  name: 'podContainerlogs',
  action() {
    BlazeLayout.render('AppMainView', {main: 'pod_Logs'});
  }
});

FlowRouter.route('/pods/:_namespace/:_podName', {
  name: 'poddetails',
  action() {
    BlazeLayout.render('AppMainView', {main: 'pod_Details'});
  }
});


