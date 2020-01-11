import { _ } from 'underscore';
import { EJSON } from 'meteor/ejson';
import { isUndefined } from 'util';

call_asker = (_target, _collection, _purpose, _args=undefined, _update=false) => {
    if (_debug) {
       console.log(arguments.callee.name + "() Ask for all " + _purpose + ".");
       console.log('  => target: ' + _target);
       console.log('  => collection: ' + _collection);
       console.log('  => purpose: ' + _purpose);
       console.log('  => update: ' + _update);
       console.dir('  => args: ' + _args);
    }
    _autoRefresh.set('target', _target);
    _autoRefresh.set('collection', _collection);
    _autoRefresh.set('arguments', _args);
    _autoRefresh.set('update', _update);
    askFor(_target, _collection, _args, _update);
}

