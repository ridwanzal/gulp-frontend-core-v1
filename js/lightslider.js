// modal gallery for package details
$(function() {
    let attr_slides = {
        item: 3,
        loop: false,
        slideMove: 2,
        auto: false,
        pauseOnHover: true,
        slideMargin: 8,
        enableDrag: false,
    }

    let attr_slides_thumb = {
        gallery: true,
        item: 1,
        loop: false,
        thumbItem: 9,
        slideMargin: 8,
        enableDrag: false,
        currentPagerPosition: 'left',
        onSliderLoad: function(el) {}
    }
    $('#imageGallery_modal').lightSlider(attr_slides);
    $('#imageGallery_modal').lightSlider(attr_slides);
    $('#imageGallery').lightSlider(attr_slides);
    $('#boatsGallery').lightSlider(attr_slides_thumb);
    $('#cabinGallery1').lightSlider(attr_slides_thumb);
    $('#cabinGallery2, #cabinGallery3, #cabinGallery4').lightSlider(attr_slides_thumb);
    $('#cabinGallery2, #cabinGallery3, #cabinGallery4').lightSlider(attr_slides_thumb);

});