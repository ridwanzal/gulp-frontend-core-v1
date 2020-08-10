$(function() {
    let xmodal_state = $('.xmodal_container').is(':visible');
    if (xmodal_state) {
        $('.ex_wrapper').addClass('modal_wrapper');
    }
    // xmodal
    $('.xmodal_close').on('click', function() {
        $('.xmodal_container').hide();
    });

    $('#lookfor').on('change', function() {
        let vals = $(this).val();
        console.log(vals);
        if (vals === 'resort') {
            $('#resort').show();
            $('#liveboard').hide();
            $('#filter_diveresort').show();
            $('#filter_liveboard').hide();
        } else {
            $('#liveboard').show();
            $('#resort').hide();
            $('#filter_diveresort').hide();
            $('#filter_liveboard').show();
        }
    });

    $('#start_date, #end_date').on('change', function() {
        console.log('checking started');
        if (($("#start_date").val() != "") && ($("#end_date").val() != "")) {
            var oneDay = 24 * 60 * 60 * 1000;
            var firstDate = new Date($("#start_date").val());
            var secondDate = new Date($("#end_date").val());
            var diffDays = Math.round(Math.round((secondDate.getTime() - firstDate.getTime()) / (oneDay)));
            if (diffDays < 0) {
                bootbox.alert("Please provide valid date or end date >= start date!");
                diffDays = 0;
                $('#end_date').val('');
                $('#end_date').text('');
                $("#night_counts").text('').text('0');
            } else {
                $("#night_counts").text('').text(diffDays);
            }
        }
    });

    // owl carousel
    $('.owl-carousel').owlCarousel({
        margin: 15
    });

    let check_modal_diving = $('#diving_image').is(':visible');
    if (check_modal_diving) {
        console.log('modal is open');
        $('#cabinGallery5').lightSlider({
            gallery: true,
            item: 1,
            loop: false,
            thumbItem: 9,
            slideMargin: 8,
            enableDrag: false,
            currentPagerPosition: 'left'
        });
    }

    // home search
    $('.submit_global_search').keypress(function(e) {
        console.log('keypress');
        if (e.which == 13) {
            console.log('you hit enter');
            searchModule();
        }
    });

})

function passme(param) {
    $('#resort_child_' + param).toggle(5, function() {
        let rotate_180 = {
            '-webkit-transform': 'rotate(180deg)',
            '-moz-transform': 'rotate(180deg)',
            '-o-transform': 'rotate(180deg)',
            'transform': 'rotate(180deg)'
        }
        let rotate_360 = {
            '-webkit-transform': 'rotate(360deg)',
            '-moz-transform': 'rotate(360deg)',
            '-o-transform': 'rotate(360deg)',
            'transform': 'rotate(360deg)'
        }

        let thiselem = $('#resort_child_' + param)
        if ((thiselem).is(":visible")) {
            $('#resort_' + param).css({
                'border': '1px solid #37637B'
            });
            $('#angle_icon_' + param).css(rotate_180);
        } else {
            $('#resort_' + param).css({
                'border': 'none'
            });
            $('#angle_icon_' + param).css(rotate_360);
        }
    });
}

function passme_tripdata(param) {
    let rotate_180 = {
        '-webkit-transform': 'rotate(180deg)',
        '-moz-transform': 'rotate(180deg)',
        '-o-transform': 'rotate(180deg)',
        'transform': 'rotate(180deg)'
    }
    let rotate_360 = {
        '-webkit-transform': 'rotate(360deg)',
        '-moz-transform': 'rotate(360deg)',
        '-o-transform': 'rotate(360deg)',
        'transform': 'rotate(360deg)'
    }

    $('#trip_child_' + param).toggle(5, function() {
        let thiselem = $('#trip_child_' + param)
        if ((thiselem).is(":visible")) {
            console.log('nampil')
            $('#trip_list_' + param).css({
                'border': '1px solid #37637B'
            });
            $('#angle_icon_trip_' + param).css(rotate_180);
        } else {
            console.log('ngga')
            $('#trip_list_' + param).css({
                'border': 'none',
            });
            $('#angle_icon_trip_' + param).css(rotate_360);
        }
    });
}

function readMore() {
    dots = $('.dots')
    more = $('.mores');
    rd_icon = $('.readmore-icon');
    if (more.is(':hidden')) {
        rd_icon.find('i').addClass('rotateme');
        more.show();
        dots.hide();
        console.log('more show');
    } else {
        console.log('more hide');
        rd_icon.find('i').removeClass('rotateme');
        more.hide();
        dots.show();
    }
}