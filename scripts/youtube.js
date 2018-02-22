$(document).ready(initializeApp);
/***************************************************************************************************
 * initializeApp
 * @params {undefined} none
 * @returns: {undefined} none
 * initializes the application, adds click handlers to submit buttons
 */
function initializeApp() {
    $('.submit-drink, .submit-food').click(add_vids_to_carousel);
}
/***************************************************************************************************
 * add_vids_to_carousel
 * @params {undefined} none
 * @returns  {undefined} none
 * when search is utilized, takes user's terms and uses youtube api to pull up related tutorials/recipes
 */

function add_vids_to_carousel() {
    if ($(this).attr('id') === 'submit-drink') {
        $(".drinks-item").empty();
        var drinksSearchTerm = $('.input-drink').val() + '';
        $('.drinks-search-term').text('"' + drinksSearchTerm + '"');
        var drinksDataObject = {
            q: drinksSearchTerm + ' alcohol drink recipe tutorial',
            maxResults: 5
        };
        $.ajax({
            dataType: 'json',
            method: 'post',
            url: 'http://s-apis.learningfuze.com/hackathon/youtube/search.php',
            data: drinksDataObject,
            success: function (result) {
                for (var i = 0; i < result.video.length; i++) {
                    $("#drinks-carousel").removeClass('hidden');
                    // if(i = 0){
                    //     console.log('i is 0: '+i);
                    //     var videosDiv = $("<div>", {
                    //         class: "item active drinks-item",
                    //         id: "drinks-video"+i,
                    //         style: "text-align: center"
                    //     });
                    //     return
                    // } else {
                    //     console.log('i is not 0: '+i);
                    //     var videosDiv = $("<div>", {
                    //         class: "item drinks-item",
                    //         id: "drinks-video"+i,
                    //         style: "text-align: center"
                    //     });
                    //     return
                    // }
                    var videosList = $("<iframe>", {
                        width: '90%',
                        height: 315,
                        src: 'https://www.youtube.com/embed/' + result.video[i].id
                    });
                    // videosDiv.append(videosList);
                    // $("#drinks-carousel-inner").append(videosDiv);
                    $('#drinks-video' + i).append(videosList);
                }
            }
        });
    } else if ($(this).attr('id') === 'submit-food') {
        $(".food-item").empty();
        var foodSearchTerm = $('#food-input').val() + '';
        $('.food-search-term').text('"' + foodSearchTerm + '"');
        var foodDataObject = {
            q: foodSearchTerm + ' meals recipe tutorial',
            maxResults: 5
        };
        $.ajax({
            dataType: 'json',
            method: 'post',
            url: 'http://s-apis.learningfuze.com/hackathon/youtube/search.php',
            data: foodDataObject,
            success: function (result) {
                for (var i = 0; i < result.video.length; i++) {
                    $("#food-carousel").removeClass('hidden');
                    var videosList = $("<iframe>", {
                        width: '90%',
                        height: 315,
                        src: 'https://www.youtube.com/embed/' + result.video[i].id
                    });
                    $('#food-video' + i).append(videosList);
                }
            }
        });
    }
}