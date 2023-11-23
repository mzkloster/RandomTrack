$('#randomButton').on('click', function(event) {    
    const track = TracksMarioKartDoubleDash.getRandomTrack();
    const cup = TracksMarioKartDoubleDash.getTrackCupId(track);
    const cupImage = TracksMarioKartDoubleDash.getCupImage(cup);
    const trackLogo = TracksMarioKartDoubleDash.getTrackLogoImage(track);
    const trackImage = TracksMarioKartDoubleDash.getTrackImage(track);

    $(".random-track-card")
    .empty()    
    .append(
        `<div class="random-track-images" style="display:none;">
            <img id="randomTrackCupImage" src="`+cupImage+`" alt="...">
            <img src="`+trackLogo+`" alt="...">
            <img src="`+trackImage+`" alt="...">
        </div>`
    );

    $('.random-track-images').fadeIn(2000);
});

$('#resetCupsButton').on('click', function(event) {
    TracksMarioKartDoubleDash.addAllCupsToState();
    $('.cup-modal-cupLogo').children('img').removeClass("grayscaled");
    $('.cup-modal-cupLogo').children('.cup-modal-check').removeClass('d-none');
    $('.cup-modal-cupLogo').children('.cup-modal-x-icon').addClass('d-none');
    $('.cup-modal-card').removeClass("grayscaled");
    setSelectedCupsLogos();
});

$('#resetBansButton').on('click', function(event) {
    TracksMarioKartDoubleDash.emptyBansInState();
    setHtmlContentForEmptyBans();
    $(".ban-modal-card").removeClass("grayscaled");
});

//Cup modal
$('.cup-modal-cupLogo').on('click', function(event) {
    const cup = $(this).attr("value");
    if (TracksMarioKartDoubleDash.isCupSelected(cup)){
        TracksMarioKartDoubleDash.removeCupFromState(cup);
    } else {
        TracksMarioKartDoubleDash.addCupToState(cup);
    }
    setSelectedCupsLogos();
    $(this).children('img').toggleClass("grayscaled");
    $(this).children('.cup-modal-check, .cup-modal-x-icon').toggleClass('d-none');
    $('.cup-modal-card[value="' + cup + '"]').toggleClass("grayscaled");
});

//Ban modal
$('#bansModal .fa-chevron-right').on('click', function(event) {
    hideAllCupsInModal();
    let nextCup;
    let currentCup = $(this).closest('.cup-banModal').attr("value");
    switch(currentCup) {
        case "mushroomCup":
            nextCup = "flowerCup";
            break;
        case "flowerCup":
            nextCup = "starCup";
            break;
        case "starCup":
            nextCup = "specialCup";
            break;
    }
    showThisCupInModal(nextCup);
});
$('#bansModal .fa-chevron-left').on('click', function(event) {
    hideAllCupsInModal();
    let prevCup;
    let currentCup = $(this).closest('.cup-banModal').attr("value");
    switch(currentCup) {
        case "flowerCup":
            prevCup = "mushroomCup";
            break;
        case "starCup":
            prevCup = "flowerCup";
            break;
        case "specialCup":
            prevCup = "starCup";
            break;
    }
    showThisCupInModal(prevCup);
});
$('.ban-modal-card').on('click', function(event) {
    const track = $(this).attr("value");
    if (TracksMarioKartDoubleDash.isTrackBanned(track)){
        TracksMarioKartDoubleDash.removeTrackFromBansInState(track);
    } else {
        TracksMarioKartDoubleDash.addTrackToBansInState(track);
    }
    setBansLogos();
    $(this).toggleClass("grayscaled");
});



function setSelectedCupsLogos(){
    $('.cup-selected-logo').addClass('d-none');
    let selectedCups = TracksMarioKartDoubleDash.getSelectedCupsFromState();    

    if (selectedCups?.length === 0){
        $('.cup-selected-logo[id="allCupTourMKDD"]').removeClass('d-none');
        return;
    }

    for (const cup of selectedCups){        
        $('.cup-selected-logo[id="' + cup + '"]').removeClass('d-none');
    }
}

function setBansLogos(){
    let bannedTracks = TracksMarioKartDoubleDash.getBansFromState();
    const logoCardElement = $("#bansColumn .logo-card");
    logoCardElement.empty();

    if (bannedTracks?.length === 0){
        setHtmlContentForEmptyBans();
        return;
    }

    for (const bannedTrack of bannedTracks){        
        let imageSrc = TracksMarioKartDoubleDash.getTrackLogoImage(bannedTrack);
        let insertHtml = `<img src="${imageSrc}" alt="..."></img>`;
        logoCardElement.append(insertHtml);
    }
}

function setHtmlContentForEmptyBans(){
    $("#bansColumn .logo-card")
    .empty()
    .append('<img src="images/noBansMKDD.png" alt="...">');
}


//Ban modal
function hideAllCupsInModal(){
    $(".cup-banModal").addClass("d-none");
}

function showThisCupInModal(cup){
    $('.cup-banModal[value="' + cup + '"]').removeClass("d-none");
}




// On startup
$(document).ready(function(){
    console.log("test!")
    sessionStorage.setItem('game', JSON.stringify("MarioKartDoubleDash"));
    TracksMarioKartDoubleDash.addAllCupsToState();
    sessionStorage.setItem('bans', JSON.stringify([]));

    setSelectedCupsLogos();
    setBansLogos();
});
