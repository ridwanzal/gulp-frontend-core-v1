$(function() {
    let attr_no_gallery = {
        delegate: 'a', // the selector for gallery item
        type: 'image'
    };

    let attr_gallery = {
        delegate: 'a', // the selector for gallery item
        type: 'image',
        gallery: {
            enabled: true
        }
    };

    $('.gallery_list').magnificPopup(attr_gallery);
    $('.gallery_banner').magnificPopup(attr_no_gallery);
    $('.gallery_list_daytrip').magnificPopup(attr_gallery);
})