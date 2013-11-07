
function appConfig(){
    return JSON.parse(localStorage.getItem('config'));
}

function setConfig(config){
    localStorage.removeItem('config');
    localStorage.setItem('config', JSON.stringify(config));
}
function getParameters(url){
	
    var param = {};
    var paramConcatenated = url.split("?")[1];
    var paramStrings = {};
    if (paramConcatenated!=undefined){
        paramStrings = url.split("?")[1].split("&");
    }
    for(var i=0; i < paramStrings.length; i++){
        var paramPair = paramStrings[i].split("=");
        param[paramPair[0]] = paramPair[1];
    }
    return param;
};
