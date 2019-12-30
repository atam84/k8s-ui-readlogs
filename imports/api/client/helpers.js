import { _ } from 'underscore'
import { isUndefined } from 'util';

askFor = (action, key='trash', path="/", _objParams=undefined) => {
    if (_debug) {
        console.log(arguments.callee.name + "   Params: " + arguments);
    }
    if (isUndefined(_objParams)) {
        Meteor.call(action, (err, res) => {
            if (err) {
                console.log("ERROR : " + err);
            } else {
                if (_debug) {
                    console.log('Response :');
                    console.dir(res);
                }
                _data.set(key, res.items);
            }
        });
    } else {
        Meteor.call(action, _objParams, (err, res) => {
            if (err) {
                console.log("ERROR : " + err);
            } else {
                if (_debug) {
                    console.log('Response :');
                    console.dir(res);
                }
                _data.set(key, res.items);
            }
        });
    }
    return _data.get(key);
}

goTo = (path) => {
    if (_debug) {
        console.log(arguments.callee.name + "   Params: " + arguments);
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
    if(_str_date === null || _str_date === undefined) return "--"
    let date = new Date(_str_date);
    let mounth = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    let hour = ("0" + date.getHours()).slice(-2);
    let minutes = ("0" + date.getMinutes()).slice(-2);
    let seconds = ("0" + date.getSeconds()).slice(-2);
    return [date.getFullYear(), mounth, day].join("-") + " " + [hour, minutes, seconds].join(":");
}

