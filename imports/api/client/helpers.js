import { _ } from 'underscore'
import { isUndefined } from 'util';

askFor = (action, key='trash', path="/", _objParams=undefined) => {
    console.log("Ask for " + action + " => " + path);
    if (isUndefined(_objParams)) {
        Meteor.call(action, (err, res) => {
            if (err) {
                console.log("ERROR : " + err);
            } else {
                _data.set(key, res.items);
            }
        });
    } else {
        Meteor.call(action, _objParams, (err, res) => {
            if (err) {
                console.log("ERROR : " + err);
            } else {
                console.log(' Meteor.call : ');
                console.dir(res);
                _data.set(key, res.items);
            }
        });
    }
    return _data.get(key);
}

goTo = (path='/', _debug=false) => {
    if(_debug) {
        console.log(' ** goTo() => ' + path);
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
    let date = new Date(_str_date);
    let mounth = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    return [date.getFullYear(), mounth, day].join("-") + " " + [hour, minutes, seconds].join(":");
}

