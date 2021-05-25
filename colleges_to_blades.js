// colleges blades names & filename
var colleges = [
    "Balliol", "Lady Margaret Hall", "Pembroke", "St. Hugh's", "Balliol 1st VIII", "Linacre", "Queens", "St. John's", "Brasenose",
    "Lincoln", "Regent's Park", "St. Peter's", "Christ Church", "Lincoln 1st VIII", "Somerville", "Corpus Christi",
    "Magdalen", "St. Anne's", "Trinity", "Exeter", "Mansfield", "St. Antony's", "University", "Green Templeton", "Merton",
    "St. Benet's Hall", "Wadham", "Hertford", "New College", "St. Caterine's", "Wolfson", "Hertford M1", "Oriel", "St. Caterine's M1",
    "Wolfson M2", "Hertford W1", "Oriel M1", "St. Caterine's W1", "Worcester Men", "Jesus", "Oriel W1", "St. Edmond Hall", 
    "Worcester Women", "Keble", "Osler", "St. Hilda's", "St. Peters Bis", 
]
function fileName(collegeName){
    return collegeName.replace(' ','').replace(' ','').replace('.','').replace("'","")
}

// randomize images order
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
shuffleArray(colleges)
var s=""
for (var i=0; i < colleges.length; i++) {
    s+='<img src="CollegeBlades/'+fileName(colleges[i])+'.png" class="blade">'
}
document.getElementById("blades").innerHTML = s;

// global variables
var blades = document.getElementById("blades").children
var college = document.getElementById("college")
var give_up = document.getElementById("give_up")
var tries = 0;
var wrongs = 0;

// main engine
function drawCollege(){
    noFrame()
    if(colleges.length===0){
        window.location.replace("index.html");
    }
    else{
        college.innerText = colleges[Math.floor(Math.random() * colleges.length)];
        tries = 0;
    }
}
function noFrame(){
    for(var i=0; i<blades.length; i++){
        var element = blades[i];
        element.style.borderColor = "white";
    }
}
function giveUp(){
    for(var i=0; i<blades.length; i++){
        var element = blades[i];
        var selected = element.getAttribute("src").split('/')[1].split('.')[0]
        if(selected==fileName(college.innerText)){
            element.style.borderColor = "black";
        }
        else{
            element.style.borderColor = "white";
        }
    }
    setTimeout(drawCollege, 1000)
}
//click listeners
for(var i=0; i<blades.length; i++){
    var element = blades[i];
    element.addEventListener("click", function(e){
        noFrame()
        e.target.style.borderColor = "black";
        var selected = e.target.getAttribute("src").split('/')[1].split('.')[0]
        //console.log(selected)
        if(selected==fileName(college.innerText)){
            //console.log('right')
            e.target.style.borderColor = "green";
            if(tries===0){
                const index = colleges.indexOf(college.innerText);
                colleges.splice(index, 1);
            }
            setTimeout(drawCollege, 1000)
        }
        else{
            //console.log('wrong')
            e.target.style.borderColor = "red";
            tries += 1;
            wrongs += 1;
        }
    });
}

//init
drawCollege()