//side med alle bildene: https://www.mariowiki.com/Mario_Kart:_Double_Dash!!
class TracksMarioKartDoubleDash {


    static getAllCups(){
        return this.cups
    }

    static getAllCupIds(){
        let allCupIds = [];
        let allCups = this.getAllCups();
        for (const cup of allCups){
            allCupIds.push(cup.id);
        }

        return allCupIds;
    }

    static getCupName(cupId){
        let cup = this.cups.find(cup => cup.id === cupId);
        return cup.name;
    }

    static getCupImage(cupId){
        let cup = this.cups.find(cup => cup.id === cupId);
        return cup.image;
    }

    static getCupDifficulty(cupId){
        let cup = this.cups.find(cup => cup.id === cupId);
        return cup.difficulty;
    }


    static getAllTracks(){
        return this.tracks;
    }

    static getAllTrackIds(){
        let allTrackIds = [];
        let allTracks = this.getAllTracks();
        for (const track of allTracks){
            allTrackIds.push(track.id);
        }

        return allTrackIds;
    }

    static getTrackName(trackId){
        let track = this.tracks.find(track => track.id === trackId);
        return track.name;
    }

    static getTrackCupId(trackId){
        let track = this.tracks.find(track => track.id === trackId);
        return track.cupId;
    }

    static getTrackLogoImage(trackId){
        let track = this.tracks.find(track => track.id === trackId);
        return track.logoImage;
    }

    static getTrackImage(trackId){
        let track = this.tracks.find(track => track.id === trackId);
        return track.image;
    }

    static getTrackDifficulty(trackId){
        let track = this.tracks.find(track => track.id === trackId);        
        return this.getCupDifficulty(track.cupId);
    }


    static getAllTracksInACup(cupId){
        let tracks = this.tracks.filter(track => track.cupId === cupId);
        let listOfTrackIds = [];
        for (const track of tracks){
            listOfTrackIds.push(track.id);
        }
        return listOfTrackIds;
    }


    static getAllTracksInListOfCups(cups){
        if (cups?.length < 1){
            return;
        }

        let allTracks = [];
        for (const cup of cups){
            let tracksInCup = this.getAllTracksInACup(cup);
                for (const track of tracksInCup){
                    allTracks.push(track);
                }            
        }
        return allTracks;
    }

    static removeListOfBannedTracksFromListOfTracks(bans, tracks){
        if (bans.length < 1){
            return;
        }

        let filteredListOfTracks = tracks.filter((track) => {
            let trackIsBanned = false;
            for (const ban of bans){
                if (track === ban){
                    trackIsBanned = true;
                }                
            }
            return !trackIsBanned;
        })

        return filteredListOfTracks;

    }

    static getRelevantTracksAfterCupSelectionAndBans(cups, bans){
        //cups input is list of cupId's. Could be empty. Bans is a list of trackId's, could be empty
        let allRelevantTracks = [];

        if (cups?.length > 0){
            allRelevantTracks = this.getAllTracksInListOfCups(cups);
        } else {
            allRelevantTracks = this.getAllTrackIds();
        }

        if (bans?.length > 0) {
            allRelevantTracks = this.removeListOfBannedTracksFromListOfTracks(bans, allRelevantTracks);
        }
        return allRelevantTracks;
    }

    static getRandomlySelectedTrackFromListOfTracks(tracks){    
        return tracks[Math.floor(Math.random()*tracks.length)];
    }
    
    static getRandomTrack(){
        const selectedCups = this.getSelectedCupsFromState();        
        const bans = this.getBansFromState();
        const relevantTracks = this.getRelevantTracksAfterCupSelectionAndBans(selectedCups, bans);
        return this.getRandomlySelectedTrackFromListOfTracks(relevantTracks);
    }


    static getSelectedCupsFromState(){
        const selectedCups = sessionStorage.getItem('selectedCups');         
        return JSON.parse(selectedCups);
    }

    static emptyCupsInState(){
        sessionStorage.setItem('selectedCups', JSON.stringify([]));
    }

    static addAllCupsToState(){
        const allCups = this.getAllCupIds();
        sessionStorage.setItem('selectedCups', JSON.stringify(allCups));
    }

    static addCupToState(cup){
        let cups= this.getSelectedCupsFromState();
        cups.push(cup);
        sessionStorage.setItem('selectedCups', JSON.stringify(cups));
    }

    static removeCupFromState(cupToBeRemoved){
        let cups= this.getSelectedCupsFromState();
        cups = cups.filter(cup => cup !== cupToBeRemoved);
        sessionStorage.setItem('selectedCups', JSON.stringify(cups));
    }

    static isCupSelected(cup){
        let cups= this.getSelectedCupsFromState();
        return cups.includes(cup);
    }

    static getBansFromState(){
        const bans = sessionStorage.getItem('bans');
        return JSON.parse(bans);
    }

    static emptyBansInState(){
        sessionStorage.setItem('bans', JSON.stringify([]));
    }

    static addTrackToBansInState(track){
        let bans= this.getBansFromState()
        bans.push(track);
        sessionStorage.setItem('bans', JSON.stringify(bans));
    }

    static removeTrackFromBansInState(trackToBeRemoved){
        let bans= this.getBansFromState()
        bans = bans.filter(track => track !== trackToBeRemoved);
        sessionStorage.setItem('bans', JSON.stringify(bans));
    }

    static isTrackBanned(track){
        let bans= this.getBansFromState()
        return bans.includes(track);
    }



    static cups = [
        {
            name: "Mushroom Cup",
            id: "mushroomCupMKDD",            
            difficulty: 1,
            image: "images/tracks/marioKartDoubleDash/cups/MushroomCupLogo_MKDD.jpg"
        },
        {
            name: "Flower Cup",
            id: "flowerCupMKDD",            
            difficulty: 2,
            image: "images/tracks/marioKartDoubleDash/cups/FlowerCupLogo_MKDD.jpg"
        },
        {
            name: "Star Cup",
            id: "starCupMKDD",            
            difficulty: 3,
            image: "images/tracks/marioKartDoubleDash/cups/StarCupLogo_MKDD.jpg"
        },
        {
            name: "Special Cup",
            id: "specialCupMKDD",            
            difficulty: 4,
            image: "images/tracks/marioKartDoubleDash/cups/SpecialCupLogo_MKDD.jpg"
        }
    ]

    static tracks = [
        //Mushroom Cup
        {
            name: "Luigi Circuit",
            id: "luigiCircuitMKDD",
            cupId: "mushroomCupMKDD",        
            logoImage: "images/tracks/marioKartDoubleDash/tracks/mushroomCup/LuigiCircuitLogo-MKDD.jpg",
            image: "images/tracks/marioKartDoubleDash/tracks/mushroomCup/LuigiCircuit-MKDD.jpg",
        },
        {
            name: "Peach Beach",
            id: "peachBeachMKDD",
            cupId: "mushroomCupMKDD",        
            logoImage: "images/tracks/marioKartDoubleDash/tracks/mushroomCup/PeachBeachLogo-MKDD.jpg",
            image: "images/tracks/marioKartDoubleDash/tracks/mushroomCup/PeachBeach-MKDD.jpg",
        },
        {
            name: "Baby Park",
            id: "babyParkMKDD",
            cupId: "mushroomCupMKDD",        
            logoImage: "images/tracks/marioKartDoubleDash/tracks/mushroomCup/BabyParkLogo-MKDD.jpg",
            image: "images/tracks/marioKartDoubleDash/tracks/mushroomCup/BabyPark-MKDD.jpg",
        },
        {
            name: "Dry Dry Desert",
            id: "dryDryDesertMKDD",
            cupId: "mushroomCupMKDD",
            logoImage: "images/tracks/marioKartDoubleDash/tracks/mushroomCup/DryDryDesertLogo-MKDD.jpg",
            image: "images/tracks/marioKartDoubleDash/tracks/mushroomCup/DryDryDesert-MKDD.jpg",
        },
        //Flower Cup
        {
            name: "Mushroom Bridge",
            id: "mushroomBridgeMKDD",
            cupId: "flowerCupMKDD",        
            logoImage: "images/tracks/marioKartDoubleDash/tracks/flowerCup/MushroomBridgeLogo-MKDD.jpg",
            image: "images/tracks/marioKartDoubleDash/tracks/flowerCup/MushroomBridge-MKDD.jpg",
        },
        {
            name: "Mario Circuit",
            id: "marioCircuitMKDD",
            cupId: "flowerCupMKDD",        
            logoImage: "images/tracks/marioKartDoubleDash/tracks/flowerCup/MarioCircuitLogo-MKDD.jpg",
            image: "images/tracks/marioKartDoubleDash/tracks/flowerCup/MarioCircuit-MKDD.jpg",
        },
        {
            name: "Daisy Cruiser",
            id: "daisyCruiserMKDD",
            cupId: "flowerCupMKDD",        
            logoImage: "images/tracks/marioKartDoubleDash/tracks/flowerCup/DaisyCruiserLogo-MKDD.jpg",
            image: "images/tracks/marioKartDoubleDash/tracks/flowerCup/DaisyCruiser-MKDD.jpg",
        },
        {
            name: "Waluigi Stadium",
            id: "waluigiStadiumMKDD",
            cupId: "flowerCupMKDD",
            logoImage: "images/tracks/marioKartDoubleDash/tracks/flowerCup/WaluigiStadiumLogo-MKDD.jpg",
            image: "images/tracks/marioKartDoubleDash/tracks/flowerCup/WaluigiStadium-MKDD.jpg",
        },
        //Star Cup
        {
            name: "Sherbet Land",
            id: "sherbetLandMKDD",
            cupId: "starCupMKDD",        
            logoImage: "images/tracks/marioKartDoubleDash/tracks/starCup/SherbetLandLogo-MKDD.jpg",
            image: "images/tracks/marioKartDoubleDash/tracks/starCup/SherbetLand-MKDD.jpg",
        },
        {
            name: "Mushroom City",
            id: "mushroomCityMKDD",
            cupId: "starCupMKDD",        
            logoImage: "images/tracks/marioKartDoubleDash/tracks/starCup/MushroomCityLogo-MKDD.jpg",
            image: "images/tracks/marioKartDoubleDash/tracks/starCup/MushroomCity-MKDD.jpg",
        },
        {
            name: "Yoshi Circuit",
            id: "yoshiCircuitMKDD",
            cupId: "starCupMKDD",        
            logoImage: "images/tracks/marioKartDoubleDash/tracks/starCup/YoshiCircuitLogo-MKDD.jpg",
            image: "images/tracks/marioKartDoubleDash/tracks/starCup/YoshiCircuit-MKDD.jpg",
        },
        {
            name: "DK Mountain",
            id: "dkMountainMKDD",
            cupId: "starCupMKDD",
            logoImage: "images/tracks/marioKartDoubleDash/tracks/starCup/DKMountainLogo-MKDD.jpg",
            image: "images/tracks/marioKartDoubleDash/tracks/starCup/DKMountain-MKDD.jpg",
        },
        //Special Cup
        {
            name: "Wario Colosseum",
            id: "warioColosseumMKDD",
            cupId: "specialCupMKDD",        
            logoImage: "images/tracks/marioKartDoubleDash/tracks/specialCup/WarioColosseumLogo-MKDD.jpg",
            image: "images/tracks/marioKartDoubleDash/tracks/specialCup/WarioColosseum-MKDD.jpg",
        },
        {
            name: "Dino Dino Jungle",
            id: "dinoDinoJungleMKDD",
            cupId: "specialCupMKDD",        
            logoImage: "images/tracks/marioKartDoubleDash/tracks/specialCup/DinoDinoJungleLogo-MKDD.jpg",
            image: "images/tracks/marioKartDoubleDash/tracks/specialCup/DinoDinoJungle-MKDD.jpg",
        },
        {
            name: "Bowser's Castle",
            id: "bowserCastleMKDD",
            cupId: "specialCupMKDD",        
            logoImage: "images/tracks/marioKartDoubleDash/tracks/specialCup/BowserCastleLogo-MKDD.jpg",
            image: "images/tracks/marioKartDoubleDash/tracks/specialCup/BowserCastle-MKDD.jpg",
        },
        {
            name: "Rainbow Road",
            id: "rainbowRoadMKDD",
            cupId: "specialCupMKDD",
            logoImage: "images/tracks/marioKartDoubleDash/tracks/specialCup/RainbowRoadLogo-MKDD.jpg",
            image: "images/tracks/marioKartDoubleDash/tracks/specialCup/RainbowRoad-MKDD.jpg",
        },
    ]


}
