//Firebase snapshot, this is helpful for part 2 of the challenge
firebase.database().ref().once("value").then(function(snapshot){
    console.log(snapshot.val());
})

var _words = {
    nouns: '',
    verbs: '',
    adjectives: '',
    adverbs: ''
};
var _storyName = '';
var _storyText = '';
var _currStory = '';

// var _storyList = {};
var _storyTypes = [];
var _stories = [];
var _adjectives = [];
var _adverbs = [];
var _nouns = [];
var _verbs = [];

//getting data from DB
 getStoriesFromDb();

function updateUIWithStories(){
    var parentEl = document.getElementById('storyTypes');
    var label, input;
    for(var i = 0; i < _storyTypes.length; i++){
        label = document.createElement("LABEL");
        label.innerText = _storyTypes[i];
        input = document.createElement("INPUT");
        input.setAttribute("type", "radio");
        //added by me
        input.setAttribute("value", _storyTypes[i]);
        input.setAttribute("name","storyTypes");
        //
        input.setAttribute("onclick", "radioBtnClick(' " + _storyTypes[i] + " ')");
        label.appendChild(input);
        parentEl.appendChild(label);
    }
}

function radioBtnClick(storyType){
    _currStory = storyType;
}

function generateStory(){
    _storyName = _currStory.trim();
    _words.nouns = document.getElementById('nouns').value;
    _words.adverbs = document.getElementById('adverbs').value;
    _words.verbs = document.getElementById('verbs').value;
    _words.adjectives = document.getElementById('adjectives').value;
    if (!_storyName){
        alert("You should select an story.");
    return;
    }
    _storyText = createStory(_storyName, _words);
    document.getElementById('storyName').innerText = _storyName;  //storyName ,the n needs to be uppcase
    document.getElementById('storyText').innerText = _storyText;
}

function injectWords(story,words){
    for(var key in words){
        if(words.hasOwnProperty(key) && words[key].length > 0){
            for(var i = 0, target; i < words[key].length; i++){
                target = '#' + key;
                story = story.replace(target, words[key][i]);
            }
        }
    }
    return story;
}

function shuffle(arr) {
    var currIndex = arr.length-1, temp, randIndex ;
    // While there remain elements to shuffle...
    while (-1 !== currIndex) {
        // Pick a remaining element...
        randIndex = Math.floor(Math.random() * currIndex);
      //  currIndex -= 1; 
        // And swap it with the current element.
        temp = arr[currIndex];
        arr[currIndex] = arr[randIndex];
        arr[randIndex] = temp;

        currIndex -= 1;
    }
    return arr;
}
function combineWords(inputWords,defaultWords){
    var words = {
        nouns: new Array(4),
        verbs: new Array(4),
        adjectives: new Array(4),
        adverbs: new Array(4)
    };
    for(var key in defaultWords){
        if(defaultWords.hasOwnProperty(key)){
            shuffle(defaultWords[key]);
        }
    }
    for(var type in words){
        if(words.hasOwnProperty(type)){
            for (var i = 0; i < words[type].length; i++) {
                words[type][i] = (inputWords[type][i] !== undefined || null) ? inputWords[type][i] : defaultWords[type][i];
            }
        }
    }
    return words;
}

function stringObjToArrObj(obj){
    for(var key in obj){
        if(obj.hasOwnProperty(key) && typeof obj[key] !== 'object'){
            obj[key] =  obj[key].length > 0 ? obj[key].split(',') : [];
        }
    }
    return obj;
}

function createStory(name,input){
    var story = getStory(name);
    var defaultWords = getDefaultWords();
    var inputWords = stringObjToArrObj(input);
    var words = combineWords(inputWords,defaultWords);
    story = injectWords(story,words);
    
    //saving story in DB
    saveStory(story);
    
    return story;
}

function saveStory(story){
    let currStory = _currStory.trim();
    var messageListRef = firebase.database().ref('saved_stories');
    var newMessageRef = messageListRef.push();
    newMessageRef.set({
      'text': story,
      'story_type': currStory,
    });
}

function getStoriesFromDB(){
    firebase.database().ref("saved_stories").once("value").then(function(snapshot){
        if (snapshot.hasChildren() == true){
       
        _storyList = snapshot.val();
        generateStorylist();
        
        }
    })
}

function generateStorylist(){

 //Create Table
 var table = document.createElement("TABLE");
 table.setAttribute("class", "table");

 var row = table.insertRow(-1);
     var headerCell = document.createElement("TH");
     headerCell.innerHTML = "Saved Stories";
     row.appendChild(headerCell);
    
     for(var key in _storyList){
        if(_storyList.hasOwnProperty(key) ){
            row = table.insertRow(-1);  
            var cell = row.insertCell(-1);
            cell.innerHTML = _storyList[key]["text"];
        }
    }

 var dvTable = document.getElementById("dvStoryTable");
 dvTable.innerHTML = "";
 dvTable.appendChild(table);
}

function getStory(name){
    //return _stories[name || 'shopping'];
    return _stories[name];
}

function getStories(){
    return Object.keys(_stories);
}

function getDefaultWords(){
    return {
        nouns: _nouns,
        verbs: _verbs,
        adjectives: _adjectives,
        adverbs: _adverbs
    };
}
function getVerbs() {
    return ["leak", "capture", "create", "arrange"];
}
function getNouns() {
   return ["robot", "salamander", "communist", "bounty hunter"];
}
function getAdverbs() {
    return ["weakly", "mischievously", "indecisively", "heavenly"];

}
function getAdjectives() {
    return ["purple", "vengeful", "flirtatious", "definitive"];
  
}
function getStoriesFromDb() {
    // return {
    //     christmas:"Every Christmas we #verbs to a #adjectives tree farm far away. This is not just any #adjectives tree farm. My dad and I #verbs onto the #nouns to #verbs for the perfect #nouns. Some people like them #adjectives, but I prefer them #adjectives. After searching for hours I usually #adverbs exclaim \"Dad! The perfect tree is over there!\" Off we #verbs to get the tree. The problem is we always forget the #nouns and the #nouns. But at the end of the day we #adverbs get the tree and head home #adverbs. \"I wish it was Christmas all year round\"  I #adverbs think to myself.",
    //     cowboy:"There once was a #adjectives cowboy who liked to #verbs. Anytime he did, all his friends would #verbs #nouns #adverbs. Once, while rustling #adjectives cattle, he was #adverbs attacked by a #nouns. Using his trusty #nouns, he was able to #adverbs #verbs his #adjectives attackers. It would have been #adjectives if he had decided to #adverbs #verbs his #nouns instead.",
    //     shopping:"Today I went shopping. When I arrived at the store I saw a #adjectives #nouns, who upon noticing me #adverbs said \"I need to #verbs\". \"Well, that was #adjectives\", I thought to myself before walking to the store. The store had rearranged its inventory, so I felt #adverbs lost. I walked up to store clerk and #adverbs said, \"I am looking for a #adjectives #nouns that doesn’t #verbs as often as the last one I had.\" The store clerk looked at me with a #adjectives look in his eye and said, \"What you are looking for can be found by the #nouns, if you see a #nouns that #adverbs can #verbs, then you have gone too far.\" As I tried to understand his directions, I thought to myself, \"I should have just ordered it on amazon.com, Their products seem to #verbs the perfect amount\""
    // }

    firebase.database().ref().once("value").then(function(snapshot){
        if (snapshot.hasChildren() == true){
            _stories =  snapshot.child("stories").val();
            _storyTypes = Object.keys(_stories);
            
            _adjectives = snapshot.child("adjectives").val();
            _nouns = snapshot.child("nouns").val();
            _verbs = snapshot.child("verbs").val();
            _adverbs = snapshot.child("adverbs").val();

            updateUIWithStories();
        }else{
            alert("No story in the DB, you need enter one");
        }
    })
}
