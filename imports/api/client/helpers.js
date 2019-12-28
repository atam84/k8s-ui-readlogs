import { _ } from 'underscore'

askFor = (action, key='trash', path="/", _debug=false) => {
    console.log("Ask for " + action + " => " + path);
    Meteor.call(action, (err, res) => {
        if (err) {
            console.log("ERROR : " + err);
        } else {
            if (_debug) {
                console.log("Asl for : " + action);
                console.log("  Path : " + path);
                console.dir(res.items);
            } 
          _data.set(key, res.items);
        }
    });
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

