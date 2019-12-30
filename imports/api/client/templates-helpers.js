import { _ } from 'underscore'

Template.registerHelper("objectToPairs",function(object){
    if (_.isArray(object)) {
        return { "value": value };
    }
    /*if (_isString(object)) {
        return { "value": value };
    }*/
    return _.map(object, function(value, key) {
        if(_debug) {
            console.log(' ** key: ' + key + "  value: " + value);
        }
        return {
            "key": key,
            "value": value
        };
    });
});

Template.registerHelper("kiToGiga",function(_str_value){
    return kiToGiga(_str_value);
});

Template.registerHelper("BytesToMib",function(_str_value){
    return BytesToMib(_str_value);
});

Template.registerHelper("dateAndTime",function(_str_date){
    return dateAndTime(_str_date);
});

Template.registerHelper("arrayCount", function(_arrayCount){
    return _arrayCount.length;
});

Template.registerHelper("hasOneContainer", function(_arrayCount){
    if(_arrayCount.length > 1) {
        return false;
    }
    return true;
});

Template.registerHelper("selectClass",function(_value){
    let _classes = 'bg-success text-white';
    if (_value.toLowerCase() == "true") {
        _classes = 'bg-success text-white';
    } else if (_value.toLowerCase() == "false") {
        _classes = 'bg-warning text-white';
    } else {
        _classes = 'bg-danger text-white';
    }
    return _classes; 
});

Template.registerHelper("reverseSelectClass",function(_value){
    let _classes = 'bg-success text-white';
    if (_value.toLowerCase() == "true") {
        _classes = 'bg-warning text-white';
    } else if (_value.toLowerCase() == "false") {
        _classes = 'bg-success text-white';
    } else {
        _classes = 'bg-danger text-white';
    }
    return _classes; 
});


Template.registerHelper("statusClass",function(_value){
    let _val = _value.toLowerCase();
    switch (_val) {
        case "pending":
            return "badge-secondary";
        case "running":
        case "true":
        case true:
        case "active":
            return "badge-success";
        case "succeeded":
            return "badge-info";
        case "failed":
        case "unknown":
            return "badge-danger";
        case "false":
        case false:
        case "terminating":
            return "badge-warning";
        default:
            return "badge-warning";
    }
});

