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

    // modal gallery for package details
    $('#imageGallery_modal').lightSlider({
        item: 3,
        loop: false,
        slideMove: 2,
        auto: false,
        pauseOnHover: true,
        slideMargin: 8,
        enableDrag: false,
    });

    $('#imageGallery_modal').lightSlider({
        item: 3,
        loop: false,
        slideMove: 2,
        auto: false,
        pauseOnHover: true,
        slideMargin: 8,
        enableDrag: false,
    });

    $('#imageGallery').lightSlider({
        item: 3,
        loop: false,
        slideMove: 2,
        auto: false,
        pauseOnHover: true,
        slideMargin: 8,
        enableDrag: false,
    });

    $('#boatsGallery').lightSlider({
        gallery: true,
        item: 1,
        loop: false,
        thumbItem: 9,
        slideMargin: 8,
        enableDrag: false,
        currentPagerPosition: 'left',
        onSliderLoad: function(el) {}
    });

    $('#cabinGallery1').lightSlider({
        gallery: true,
        item: 1,
        loop: false,
        thumbItem: 9,
        slideMargin: 8,
        enableDrag: false,
        currentPagerPosition: 'left',
        onSliderLoad: function(el) {}
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


    $('#cabinGallery2, #cabinGallery3, #cabinGallery4').lightSlider({
        gallery: true,
        item: 1,
        loop: false,
        thumbItem: 9,
        slideMargin: 8,
        enableDrag: false,
        currentPagerPosition: 'left'
    });

    $('.gallery_list').magnificPopup({
        delegate: 'a', // the selector for gallery item
        type: 'image',
        gallery: {
            enabled: true
        }
    });

    $('.gallery_banner').magnificPopup({
        delegate: 'a', // the selector for gallery item
        type: 'image'
    });

    $('.gallery_list_daytrip').magnificPopup({
        delegate: 'a', // the selector for gallery item
        type: 'image',
        gallery: {
            enabled: true
        }
    });

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
        let thiselem = $('#resort_child_' + param)
        if ((thiselem).is(":visible")) {
            $('#resort_' + param).css({
                'border': '1px solid #37637B'
            });
            $('#angle_icon_' + param).css({
                '-webkit-transform': 'rotate(180deg)',
                '-moz-transform': 'rotate(180deg)',
                '-o-transform': 'rotate(180deg)',
                'transform': 'rotate(180deg)'
            });
        } else {
            $('#resort_' + param).css({
                'border': 'none'
            });
            $('#angle_icon_' + param).css({
                '-webkit-transform': 'rotate(360deg)',
                '-moz-transform': 'rotate(360deg)',
                '-o-transform': 'rotate(360deg)',
                'transform': 'rotate(360deg)'
            });
        }
    });
}

function passme_tripdata(param) {
    $('#trip_child_' + param).toggle(5, function() {
        let thiselem = $('#trip_child_' + param)
        if ((thiselem).is(":visible")) {
            console.log('nampil')
            $('#trip_list_' + param).css({
                'border': '1px solid #37637B'
            });
            $('#angle_icon_trip_' + param).css({
                '-webkit-transform': 'rotate(180deg)',
                '-moz-transform': 'rotate(180deg)',
                '-o-transform': 'rotate(180deg)',
                'transform': 'rotate(180deg)'
            });
        } else {
            console.log('ngga')
            $('#trip_list_' + param).css({
                'border': 'none',
            });
            $('#angle_icon_trip_' + param).css({
                '-webkit-transform': 'rotate(360deg)',
                '-moz-transform': 'rotate(360deg)',
                '-o-transform': 'rotate(360deg)',
                'transform': 'rotate(360deg)'
            });
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

function searchModule() {
    $('#search_result').empty();
    let arr_check = [];
    let values = $('.submit_global_search').val();
    if (values !== '') {
        let url = '../data/search.json';
        $.ajax({
            url: url,
            type: 'GET',
            success: function(res) {
                console.log(res);
                let i = 0;
                let check;
                for (i; i < res.length; i++) {
                    check = res[i].name.toLowerCase().includes(values);
                    if (check) {
                        arr_check.push(res[i]);
                    }
                }
                let j = 0;
                console.log(arr_check);
                if (arr_check.length > 0) {
                    for (j; j < arr_check.length; j++) {
                        let adapters =
                            `<div class="card_product_wrapper product_list_resort" id="resort_1">
                              <div class="row">
                                  <div class="col-lg-4 col-md-4 col-xs-4 space_inside_product">
                                      <img class="image_products" src="img/resorts/1.jpeg">
                                  </div>
                                  <div class="col-lg-5 col-md-5 col-xs-5 product_separator">
                                      <div class="wrapper_product_info">
                                          <label class="label_card" >` + arr_check[j].name + `</label>
                                              <div class="review_wrapper spacer_bottom" >
                                                  <span class="fa fa-star checked_star star_list"></span>
                                                  <span class="fa fa-star checked_star star_list"></span>
                                                  <span class="fa fa-star checked_star star_list"></span>
                                                  <span class="fa fa-star checked_star star_list"></span>
                                                  <div>&nbsp; &centerdot; &nbsp;</div>
                                                  <span class="mybadge2">Featured</span>
                                                  <div>&nbsp; &centerdot; &nbsp;</div>
                                                  <label class="label_small_widget">Raja Ampat</label>
                                              </div>
                                              <div class="review_wrapper">
                                                  <span class="mybadge3 img_services"><img src="img/clock.svg">&nbsp;Free Cancelation</span>
                                                  <span class="mybadge3 img_services"><img src="img/menu.svg">&nbsp;Full Board</span>
                                                  <span class="mybadge4">+1</span>
                                              </div>
                                              <div class="review_wrapper">
                                                  <img class="facilities" src="img/facilities.svg">
                                              </div>
                                              <div class="review_wrapper">
                                                  <label class="label_light">Dive with &nbsp;
                                                  </label>
                                                  <span class="label_small_widget" onclick="passme('1')" id="label_excol_1">Purwi Wirata Dive Center&nbsp;<i class="fa fa-angle-down" id="angle_icon_1"></i></span>
                                              </div>
                                              
                                          </div>
                                      </div>
                                  <div class="space_inside_product2">
                                      <div class="row">
                                          <div class="col-lg-4 col-md-4 col-xs-4 scores_container">
                                              <div class="scores">4,2</div>
                                          </div>
                                          <div class="col-lg-8 col-md-8 col-xs-8 reviews_result">
                                              <label class="label_small_widget_green">Excellent</label>
                                              <p class="label_light">196 Review</p>
                                          </div>
                                      </div>  
                                      <div class="row">
                                          <div class="col-lg-12 col-md-12 col-xs-12">
                                              <div class="label_light">Starts from &nbsp; </div>
                                              <div class="label_prices">IDR 12.593.583</div>
                                              <div class="label_light">7 nights incl. 12 dives/diver&nbsp; </div>
                                              <button class="button_packages">View Packages</button>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                              <div class="row" style="display:none;" id="resort_child_1">
                                  <div class="col-lg-4 col-md-4">
                                  </div>
                                  <div class="col-lg-3 col-md-3">
                                      <div class="review_wrapper" >
                                          <ul class="list-unstyled list-package-trip">
                                              <li><img class="img-package-trip" src="img/pin.svg">&nbsp;Onsite</li>
                                              <li><img class="img-package-trip" src="img/rate.svg">&nbsp;5 Star Padi Dive Center</li>
                                              <li><img class="img-package-trip" src="img/tracking.svg">&nbsp;12 dive instructors</li>
                                              <li><img class="img-package-trip" src="img/divers.svg">&nbsp;Max 8 divers per guide</li>
                                              <li><img class="img-package-trip" src="img/boat.svg">&nbsp;6 Boats Available</li>
                                          </ul>
                                      </div>
                                  </div>
                                  <div class="col-lg-5 col-md-5">
                                      <span class="label_small_widget_big">Language Spoken</span>
                                      <p class="label_light" >English, French, German, Portuguese</p>
                                      <span class="label_small_widget_big">Equipment Rental</span>
                                      <p class="label_light" >Fins, BCD, mask, weights, regulator, snorkel, tank, wet suit and more</p>
                                  </div>
                              </div>
                          </div>`;
                        $('#search_result').show();
                        $('#search_result').append(adapters);
                        $('.loader').fadeOut('slow');
                        arr_check = [];
                    }
                } else {
                    $('#search_result').show();
                    $('#search_result').append('<h6 style="margin: 0 auto;">Data Not found <a href="javascript:history.go(0)">Refresh Page</a></h6>');
                    $('.loader').fadeOut('slow');
                }
            },
            error: function(e) {
                console.log(e);
            }
        });
        console.log(values);
        $('#nav-home').hide();
        $('#pagination').hide();
        $('#liveboard').hide();
        $('#resort_child_main').hide();
        $('.loader').show();
    } else {
        $('#nav-home').show();
        $('#liveboard').hide();
        $('#search_result').hide();
        $('#pagination').show();
        $('#resort_child_main').show();
        $('.loader').fadeOut('slow');
    }

}

var mymap = L.map('mapid').setView([51.505, -0.09], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoicmlkd2FuemFsIiwiYSI6ImNrNm40eWI0eTA3MG8zcHFiODZsdDV1aHMifQ.HBLx-EceW5xn0z5XhR-5PQ', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 9,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoicmlkd2FuemFsIiwiYSI6ImNrNm40eWI0eTA3MG8zcHFiODZsdDV1aHMifQ.HBLx-EceW5xn0z5XhR-5PQ'
}).addTo(mymap);

L.marker([51.5, -0.09]).addTo(mymap)
    .bindPopup("<b>Batu Bolong!</b><br />I am a popup.").openPopup();

L.marker([51.5, -0.085]).addTo(mymap)
    .bindPopup("<b>Batu Bolong!</b><br />I am a popup.").openPopup();

L.marker([51.52, -0.092]).addTo(mymap)
    .bindPopup("<b>Batu Bolong!</b><br />I am a popup.").openPopup();

tippy('.mybadge4', {
    content: 'Score Rating',
    animation: 'scale-subtle'
});