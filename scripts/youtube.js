$(document).ready(initializeApp);
/***************************************************************************************************
 * initializeApp
 * @params {undefined} none
 * @returns {undefined} none
 * initializes the application, adds click handlers to submit buttons
 */
function initializeApp() {
    $('.submit-drink, .submit-food').click(add_vids_to_carousel);
}
/***************************************************************************************************
 * add_vids_to_carousel
 * @params {undefined} none
 * @returns  {undefined} none
 * determines which category search terms are coming from, and then renders youtube videos to correct section
 */
function add_vids_to_carousel() {
    if ($(this).attr('id') === 'submit-drink') {
        var item = 'drink';
        renderVideos(item);
    } else if ($(this).attr('id') === 'submit-food') {
        var item = 'food';
        renderVideos(item);
    }
}
/***************************************************************************************************
 * renderVideos
 * @params {string} category
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
        url: 'http://s-apis.learningfuze.com/hackathon/youtube/search.php',
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
        error: function (result) {
            errorMessage(result, category);
        }
    })
}
/***************************************************************************************************
 * errorMessage
 * @params {object} data
 * @returns  {undefined} none
 * if error in ajax call, determines which type of error occurs and calls appropriate display message function
 */
function errorMessage(data, category) {
    if (data.status ==404) {
        displayErrorMessage('Not Found', category);
    } else if (data.status === 500) {
        displayErrorMessage('Internal Server Error', category);
    }
}
/***************************************************************************************************
 * displayErrorMessage
 * @params {string} message
 * @returns  {undefined} none
 *  displays specific message to user in carousel div
 */
function displayErrorMessage(message, category) {
    if (category === "drink") {
        $("#drink-carousel-inner").empty();
        $("#drink-carousel-inner").text(message);
    } else if (category === "food") {
        $("#food-carousel-inner").empty();
        $("#food-carousel-inner").text(message);
    }
}
    