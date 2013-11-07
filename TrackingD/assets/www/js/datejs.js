
function parseDate(jsonDate) {
    if(jsonDate==undefined) return '';
    var offset = new Date().getTimezoneOffset() * 60000;
    var parts = /\/Date\((-?\d+)([+-]\d{2})?(\d{2})?.*/.exec(jsonDate);
    if (parts[2] == undefined) parts[2] = 0;
    if (parts[3] == undefined) parts[3] = 0;
    var date = new Date(+parts[1] + offset + parts[2]*3600000 + parts[3]*60000);
    var m_names = new Array("January", "February", "March",  "April", "May", "June", "July", "August", "September",  "October", "November", "December");
    //return date.getFullYear() + '  ' + m_names[date.getMonth()]  + ' '  + date.getDate();
	return date.getDate() + ' ' + m_names[date.getMonth()] + ' ' + date.getFullYear();
}

function getJSDate(jsonDate){
    var date = new Date();
    if(jsonDate==undefined) return date;
    var offset = new Date().getTimezoneOffset() * 60000;
    var parts = /\/Date\((-?\d+)([+-]\d{2})?(\d{2})?.*/.exec(jsonDate);
    if (parts[2] == undefined) parts[2] = 0;
    if (parts[3] == undefined) parts[3] = 0;
    date = new Date(+parts[1] + offset + parts[2]*3600000 + parts[3]*60000);
    return date;
}

function getJsonDate(date){
    return '\/Date(' + date.getTime() + '+0700)\/';
}// JavaScript Document