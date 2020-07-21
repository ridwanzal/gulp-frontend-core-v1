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
    }else{
        $('#liveboard').show();
        $('#resort').hide();
    }
})

function passme(param){
    $('#resort_child_' + param).toggle(5, function(){
        let thiselem =  $('#resort_child_' + param)
        if((thiselem).is(":visible")){
            console.log('nampil')
            $('#resort_' + param).css({
                'border': '1px solid #37637B'
            });
        }else{
            console.log('ngga')
            $('#resort_' + param).css({
                'border': 'none'
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
        }else{
            console.log('ngga')
            $('#trip_list_' + param).css({
                'border': 'none'
            });
        }
    });
}