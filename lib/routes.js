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
