


function appConfig(){
    return JSON.parse(localStorage.getItem('config'));
}

(function($) {
    /*
     * Changes the displayed text for a jquery mobile button.
     * Encapsulates the idiosyncracies of how jquery re-arranges the DOM
     * to display a button for either an <a> link or <input type="button">
     */
    $.fn.changeButtonText = function(newText) {
        return this.each(function() {
            $this = $(this);
            if( $this.is('a') ) {
                $('span.ui-btn-text',$this).text(newText);
                return;
            }
            if( $this.is('input') ) {
                $this.val(newText);
                // go up the tree
                var ctx = $this.closest('.ui-btn');
                $('span.ui-btn-text',ctx).text(newText);
                return;
            }
        });
    };
})(jQuery);

$('.ui-page-active').live('pageinit',function(event){
    if(localStorage.getItem('userid')==null){
        $.mobile.changePage( "index.html", { transition: "slideup"} );
    }
});


function createLi (label,value){
    return '<li><p>'+label+':</p>'+value+'</li>'
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
}

function setConfig(config){
    localStorage.removeItem('config');
    localStorage.setItem('config', JSON.stringify(config));
}