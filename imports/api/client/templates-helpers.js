import { _ } from 'underscore'

Template.registerHelper("objectToPairs",function(object){
    if (_.isArray(object)) {
        return { "value": value };
    }
    /*if (_isString(object)) {
        return { "value": value };
    }*/
    return _.map(object, function(value, key) {
        console.log(key + " --- " + value);
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


Template.registerHelper("selectClass",function(_value){
    let _classes = 'bg-success text-white';
    if (_value.toLowerCase() == "true") {
        _classes = 'bg-success text-white';
    } else if (_value.toLowerCase() == "false") {
        _classes = 'bg-danger text-white';
    } else {
        _classes = 'bg-warning text-white';
    }
    return _classes; 
});

Template.registerHelper("reverseSelectClass",function(_value){
    let _classes = 'bg-success text-white';
    if (_value.toLowerCase() == "true") {
        _classes = 'bg-danger text-white';
    } else if (_value.toLowerCase() == "false") {
        _classes = 'bg-success text-white';
    } else {
        _classes = 'bg-warning text-white';
    }
    return _classes; 
});
