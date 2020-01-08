import { _ } from 'underscore';
import { EJSON } from 'meteor/ejson';
import { isUndefined } from 'util';


encodeKey = (key) => {
   return key.replace(/\\/g, "\\\\").replace(/\$/g, "\\u0024").replace(/\./g, "\\u002e");
}

decodeKey = (key) => {
   return key.replace(/\\u002e/g, ".").replace(/\\u0024/g, "\$").replace(/\\\\/g, "\\");
}

transformObj = (obj, coder='encode') => {
   return Object.keys(obj).reduce((xformed, key) => {
      let value = obj[key];
      if (value === null) value = 'null';
      if (value === undefined) value = 'undefined';
      if (Object.prototype.toString.call(value) === '[object Date]') value = new Date(value).valueOf();
      if (Object.prototype.toString.call(value) === '[object Array]') {
        let val = value;
        value = [];
        for (var i = 0; i < val.length; i++) {
            value.push(transformObj(val[i], coder)); 
        }
      }
      if (Object.prototype.toString.call(value) === '[object Object]') {
         value = transformObj(value, coder);
      }
      if (coder === 'encode') {
         xformed[encodeKey(key)] = value;
      } else if (coder === 'decode') {
         xformed[decodeKey(key)] = value;
      }
      return xformed;
   }, {});
   return obj;
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
                _data.set(key, res.items);
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
    return Collections[key].find({}).fetch();
}

loadFetchedData = (_collection) => {
   if (_debug) {
      console.log('*** Load data from collection: ' + _collection);
   }
   return Collections[_collection].find({}).fetch();
}

goTo = (path) => {
    if (_debug) {
        console.log(arguments.callee.name + "   Path: " + path);
    }
    FlowRouter.go(path);
    return true;
}

kiToGiga = (_str_value) => {
    return (_str_value.replace( /\D+/g, '')/1024**2).toFixed(2);
}

BytesToMib = (_str_value) => {
    return (_str_value/1000**2).toFixed(2);
}

dateAndTime = (_str_date) => {
    if(_str_date === null || _str_date === undefined) {
       return "-";
    }
    let date = new Date(_str_date);
    let mounth = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    let hour = ("0" + date.getHours()).slice(-2);
    let minutes = ("0" + date.getMinutes()).slice(-2);
    let seconds = ("0" + date.getSeconds()).slice(-2);
    return [date.getFullYear(), mounth, day].join("-") + " " + [hour, minutes, seconds].join(":");
}

