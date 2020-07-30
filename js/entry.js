
tippy('.mybadge4', {
    content: 'Score Rating',
    animation : 'scale-subtle'
});

$('#lookfor').on('change', function(){
    let vals = $(this).val();
    console.log(vals);
    if(vals === 'resort'){
        $('#resort').show();
        $('#liveboard').hide();
        $('#filter_diveresort').show();
        $('#filter_liveboard').hide();
    }else{
        $('#liveboard').show();
        $('#resort').hide();
        $('#filter_diveresort').hide();
        $('#filter_liveboard').show();
    }
})

function passme(param){
    $('#resort_child_' + param).toggle(5, function(){
        let thiselem =  $('#resort_child_' + param)
        if((thiselem).is(":visible")){
            $('#resort_' + param).css({
                'border': '1px solid #37637B'
            });
            $('#angle_icon_'+param).css({
                '-webkit-transform':'rotate(180deg)',
                '-moz-transform':'rotate(180deg)',
                '-o-transform':'rotate(180deg)',
                'transform': 'rotate(180deg)'
            });
        }else{
            $('#resort_'+param).css({
                'border': 'none'
            });
            $('#angle_icon_'+param).css({
                '-webkit-transform':'rotate(360deg)',
                '-moz-transform':'rotate(360deg)',
                '-o-transform':'rotate(360deg)',
                'transform': 'rotate(360deg)'
            });
        }
    });
}

function passme_tripdata(param){
    $('#trip_child_' + param).toggle(5, function(){
        let thiselem =  $('#trip_child_' + param)
        if((thiselem).is(":visible")){
            console.log('nampil')
            $('#trip_list_' + param).css({
                'border': '1px solid #37637B'
            });
            $('#angle_icon_trip_'+param).css({
                '-webkit-transform':'rotate(180deg)',
                '-moz-transform':'rotate(180deg)',
                '-o-transform':'rotate(180deg)',
                'transform': 'rotate(180deg)'
            });
        }else{
            console.log('ngga')
            $('#trip_list_' + param).css({
                'border': 'none',
            });
            $('#angle_icon_trip_'+param).css({
                '-webkit-transform':'rotate(360deg)',
                '-moz-transform':'rotate(360deg)',
                '-o-transform':'rotate(360deg)',
                'transform': 'rotate(360deg)'
            });
        }
    });
}

$('#start_date, #end_date').on('change', function () {
    console.log('checking started');
    if ( ($("#start_date").val() != "") && ($("#end_date").val() != "")) {
        var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
        var firstDate = new  Date($("#start_date").val());
        var secondDate = new Date($("#end_date").val());
        var diffDays = Math.round(Math.round((secondDate.getTime() - firstDate.getTime()) / (oneDay)));
        if(diffDays < 0){
            bootbox.alert("Please provide valid date or end date >= start date!");
            diffDays = 0;
            $('#end_date').val('');
            $('#end_date').text('');
            $("#night_counts").text('').text('0');
        }else{
            $("#night_counts").text('').text(diffDays);
        }
    }
});

