$('select.SelectMonth').live('change', function(e) {
    var year = $(this).parents('fieldset').find('select.SelectYear').val();
    var month =  $(this).val();
    var date = $(this).parents('fieldset').find('select.SelectDate').val();
	var fieldName = $(this).parents('fieldset').attr('id');
	var minDate = getMinDate(fieldName, year,month);
	var maxDate = getMaxDate(fieldName, year, month);
	initDate(fieldName,date,minDate, maxDate);
});

$('.SelectYear').live('change', function(e) {
    var year = $(this).val();
    var month = $(this).parents('fieldset').find('select.SelectMonth').val();
	var date = $(this).parents('fieldset').find('select.SelectDate').val();
	var fieldName = $(this).parents('fieldset').attr('id');
	var minDate = getMinDate(fieldName, year,month);
	var maxDate = getMaxDate(fieldName, year, month);
	var minMonth = getMinMonth(fieldName, year);
	var maxMonth = getMaxMonth(fieldName, year);
	initDate(fieldName,date,minDate,maxDate);
	initMonth(fieldName,date,minMonth,maxMonth);
});

function getFieldDate(fieldName){
	var year = $('#'+fieldName).find('select.SelectYear').val();
	var month = $('#'+fieldName).find('select.SelectMonth').val();
	var date = $('#'+fieldName).find('select.SelectDate').val();
	return year+'-'+month+'-'+date;
}

function getMaxDate(fieldName, year, month){
	var maxFullDate = offsetDate(fieldName,'forward');
	var maxDate=31;
    if (maxFullDate.month == month && maxFullDate.year == year){
    	maxDate = maxFullDate.date;
    } else if (month == 3 || month == 5 || month == 8  || month == 10){
        maxDate = 30;
    } else if (month == 1){
        maxDate = 28;
        if (year%4==0) {
            maxDate = 29;
            if (year%100==0) {
                maxDate = 28;
                if (year%400==0) {
                    maxDate = 29;
                }
            }
        }
    }
    return maxDate;
}

function getMinDate(fieldName, year, month){
	var minFullDate = offsetDate(fieldName,'backward');
	var minDate=1;
    if (minFullDate.month == month && minFullDate.year == year){
    	minDate = minFullDate.date;
    } 
    return minDate;
}

function getMaxMonth(fieldName, year){
	var maxFullDate = offsetDate(fieldName,'forward');
	var maxMonth = maxFullDate.year>year?12:maxFullDate.month;
    return maxMonth;
}

function getMinMonth(fieldName, year){
	var minFullDate = offsetDate(fieldName,'backward');
	var minMonth=minFullDate.year<year?1:minFullDate.month;
    return minMonth;
}

function initDateSelect(fieldName,date){
	var dateDate = new Date();
	var selectedYear = dateDate.getFullYear();
	var selectedMonth = dateDate.getMonth()+1;
	var selectedDate = dateDate.getDate();
	if (date != undefined){
		dateArray = date.split('-');
		selectedYear = dateArray[0]*1;
		selectedMonth = dateArray[1]*1;
		selectedDate = dateArray[2]*1;
	} else {
		date = selectedYear+'-'+selectedMonth+'-'+selectedDate;
	}
	//alert('date@initDateSelect: ' + selectedYear+'-'+selectedMonth+'-'+selectedDate);
	////
	//Putting all the elements in order
	////
	$('#'+fieldName).find('input.date').remove();
	$('#'+fieldName).find('select').empty();
	$('#'+fieldName).append('<input class="date" type="hidden"/>');
	$('#'+fieldName).find('input.date').val(date);
    //
    //now we find out the lower and upper bound of the dateselect
    //
    var maxFullDate = offsetDate(fieldName,'forward');
    var minFullDate = offsetDate(fieldName,'backward');
    //
    //We set the year value
    //
    for (i = minFullDate.year; i <= maxFullDate.year; i++){
        var selected = i==selectedYear?'selected':'';
        $('#'+fieldName).find('select.SelectYear').append('<option value="'+i+'" '+selected+'>'+i+'</option>');
    }
    $('#'+fieldName).find('select.SelectYear').selectmenu('refresh', true);
    var minMonth = getMinMonth(fieldName,selectedYear);
    var maxMonth = getMaxMonth(fieldName,selectedYear);
 	initMonth(fieldName, selectedMonth, minMonth, maxMonth);
 	/////
    // Now we do the same with date.
    //// 
	//alert('selectedDate@initDateSelect: ' + selectedDate);	   
    var minDate = getMinDate(fieldName, selectedYear,selectedMonth);
    var maxDate = getMaxDate(fieldName, selectedYear,selectedMonth);
    initDate(fieldName, selectedDate, minDate, maxDate);
}

function offsetDate(fieldName,direction){
	var dateString = $('#'+fieldName).find('input.date').val();
	var date = new Date(dateString);
	var offset= $('#'+fieldName).find('input.'+direction).val()*1;
	////
	//offset the date
	////
	date.setDate(date.getDate()+offset);
	var dateArray = {};
	dateArray.year = date.getFullYear();
    dateArray.month = date.getMonth();
    dateArray.date = date.getDate();
	return dateArray;
}

function initDate(fieldName, selectedDate, minDate, maxDate){
	$('#'+fieldName).find('select.SelectDate').empty();
	if (selectedDate > maxDate){
		selectedDate = maxDate;
	}
    for (i = minDate; i <= maxDate; i++){
        var selected = '';
		if(i==selectedDate){
			selected = 'selected';
			//alert(selectedDate+'-'+selected);
		}
        $('#'+fieldName).find('select.SelectDate').append('<option value="'+i+'" '+selected+'>'+i+'</option>');    
    }
    $('#'+fieldName).find('select.SelectDate').selectmenu('refresh', true);
 }
 
 function initMonth(fieldName, selectedMonth, minMonth, maxMonth){
 	$('#'+fieldName).find('select.SelectMonth').empty();
 	var month = ['December','January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November',   'December'];    
    for (i = minMonth; i <= maxMonth; i++){
        var selected = i==selectedMonth?'selected':'';
        $('#'+fieldName).find('select.SelectMonth').append('<option value="'+i+'" '+selected+'>'+month[i]+'</option>');
    }
        $('#'+fieldName).find('select.SelectMonth').selectmenu('refresh', true);
 }