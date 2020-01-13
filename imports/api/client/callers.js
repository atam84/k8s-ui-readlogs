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

askFor = (action, key='_trash', _objParams=undefined) => {
    if (_debug) {
        console.log(arguments.callee.name + " ***********   Params: ");
        console.dir(arguments);
    }
    //if (isUndefined(_objParams)) {
        Meteor.call(action, _objParams, (err, res) => {
            if (err) {
                console.log("ERROR : " + err);
            } else {
                if (_debug) {
                    console.log('Response :');
                    console.dir(res);
                }
                //_data.set(key, res.items);
                if(Array.isArray(res.items)) {
                   Collections[key].remove({});
                   res.items.forEach((item, index) => {
                      Collections[key].insert(transformObj(item, "encode"), (err, res) => {
                         if(err) {
                           console.log(err);
                         }
                      });
                   });
                } else {
                   Collections[key].insert(transformObj(res.items, "encode"), (err, res) => {
                      if(err) {
                         console.log(err);
                      }
                   });
                }
            }
        });
    /*} else {
        Meteor.call(action, _objParams, (err, res) => {
            if (err) {
                console.log("ERROR : " + err);
            } else {
                if (_debug) {
                    console.log('Response :');
                    console.dir(res);
                }
                _data.set(key, res.items);
                if(Array.isArray(res.items)) {
                   res.items.forEach((item, index) => {
                      console.log(' **** insert index : ' + index);
                      Collections[key].insert(item);
                   });
                } else {
                   Collections[key].insert(res.items);
                }
            }
        });
    } */
    //return _data.get(key);
    //return Collections[key].find({}).fetch();
}
