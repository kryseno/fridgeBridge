$(document).ready(initializeApp);
/***************************************************************************************************
 * initializeApp
 * @param {undefined} none
 * @returns {undefined} none
 * initializes the application, adds click handlers to submit buttons
 */
function initializeApp() {
    $('.submit-drink, .submit-food').click(add_vids_to_carousel);
}
/***************************************************************************************************
 * add_vids_to_carousel
 * @param {undefined} none
 * @returns  {undefined} none
 * determines which category search terms are coming from, and then renders youtube videos to correct section
 */
function add_vids_to_carousel() {
    if ($(this).attr('id') === 'submit-drink') {
        var item = 'drink';
        $("."+item+"-item").empty();
        renderVideos(item);
        var drinkErrorMsg = "."+item+"ErrorMsg";
        if($(drinkErrorMsg)[0]){
            $(drinkErrorMsg).remove();
        }
    } else if ($(this).attr('id') === 'submit-food') {
        var item = 'food';
        $("."+item+"-item").empty();
        renderVideos(item);
        var foodErrorMsg = "."+item+"ErrorMsg";
        if($(foodErrorMsg)[0]){
            $(foodErrorMsg).remove();
        }
    }
}
/***************************************************************************************************
 * renderVideos
 * @param {string} category - Category of search terms.
 * @returns  {undefined} none
 * when search is utilized, takes user's terms and uses youtube api to pull up related tutorials/recipes
 */
function renderVideos(category){
    var item = "." + category + "-item";
    var searchTerm = ".input-" + category;
    var searchItemText = "." + category + "-search-item";
    var searchTerm = $(searchTerm).val() + '';

    //Determine search category to collect correct data
    if (category === 'food') {
        var dataObject = {
            q: searchTerm + ' meals recipe tutorial',
            maxResults: 5
        };        
    } else if (category === 'drink') {
        var dataObject = {
            q: searchTerm + ' alcohol drink recipe tutorial',
            maxResults: 5
        };
    }
    $(searchItemText).text('"' + searchTerm + '"');
    
    //AJAX call to YouTube API
    $.ajax({
        dataType: 'json',
        method: 'post',
        url: 'http://s-apis.learningfuze.com/hackathon/youtube/search.ph',
        data: dataObject,
        success: function (result) {
            for (var i = 0; i < result.video.length; i++) {
                $("#" + category + "-carousel").removeClass('hidden');
                var videosList = $("<iframe>", {
                    width: '90%',
                    height: 315,
                    src: 'https://www.youtube.com/embed/' + result.video[i].id
                });
                $("#" + category + "-video" + i).append(videosList);
            }
        },
        error: function (error) {
            if(error){
                // $("#" + category + "-carousel").removeClass('hidden');
                videoErrorMessage(category);
            }
        }
    })
}
/***************************************************************************************************
 * videoErrorMessage
 * @param {string} category - Category of search items.
 * @returns  {undefined} none
 * if error in ajax call, displays error message in youtube video div
 */
function videoErrorMessage(category) {
    var section = "#" + category + "-sec";
    var message = $("<div>", {
        class: category + 'ErrorMsg',
        text: 'There was an error obtaining video tutorials. Please try again.'
    });
    $(section).append(message);
}