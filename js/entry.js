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

var numItems = $('.product_list_resort').length
// alert(numItems);

// let i = 0;
// for(i; i <= numItems; i++){
//     $('#resort_detail_' + i).on('click', function(){
//         alert(i);
//         $('#resort_child_' + i).show();
//     });
// } 

function passme(param){
    $('#resort_child_' + param).toggle("fast", function(){
        let thiselem =  $('#resort_child_' + param)
        if((thiselem).is(":visible")){
            console.log('nampil')
            alert('nampil');
        }else{
            console.log('ngga')
        }
    });
}