// global variables
var colleges;
var blades;
var college;
var give_up;
var tries;
var wrongs;
var solutions;
var time;
var start;
var end;

function fileName(collegeName){
    return collegeName.replace(' ','').replace(' ','').replace('.','').replace("'","");
}
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
function init(){
    // colleges blades names & filename
    colleges = ['Balliol', 'Balliol 1st VIII', 'Brasenose', 'Christ Church', 'Corpus Christi', 'Exeter', 'Green Templeton', 
    'Hertford', 'Hertford M1', 'Hertford W1', 'Jesus', 'Keble', 'Lady Margaret Hall', 'Linacre', 'Lincoln', 
    'Lincoln 1st VIII', 'Magdalen', 'Mansfield', 'Merton', 'New College', 'Oriel', 'Oriel M1', 'Oriel W1', 
    'Osler', 'Pembroke', 'Queens', "Regent's Park", 'Somerville', "St. Anne's", "St. Antony's", "St. Benet's Hall", 
    "St. Caterine's", "St. Caterine's M1", "St. Caterine's W1", 'St. Edmond Hall', "St. Hilda's", "St. Hugh's", 
    "St. John's", "St. Peter's", 'St. Peters Bis', 'Trinity', 'University', 'Wadham', 'Wolfson', 'Wolfson M2', 
    'Worcester Men', 'Worcester Women'];
    // randomize images order
    shuffleArray(colleges);
    var s=""
    for (var i=0; i < colleges.length; i++) {
        s+='<img src="CollegeBlades/'+fileName(colleges[i])+'.png" class="blade">';
    }
    document.getElementById("blades").innerHTML = s;

    // global variables
    blades = document.getElementById("blades").children;
    college = document.getElementById("college");
    give_up = document.getElementById("give_up");
    tries = 0;
    wrongs = 0;
    solutions = 0;
    time = 0;
    start = Date.now();

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
                if(tries===0 || true){
                    const index = colleges.indexOf(college.innerText);
                    colleges.splice(index, 1);
                }
                setTimeout(drawCollege, 1000);
            }
            else{
                //console.log('wrong')
                e.target.style.borderColor = "red";
                tries += 1;
                wrongs += 1;
            }
        });
    }

    //draw first
    drawCollege();
    document.getElementById("give_up").addEventListener("click", giveUp);
}



// main engine
function drawCollege(){
    noFrame()
    if(colleges.length===0){
        if(time===0){
            end = Date.now();
            time = end-start;
            document.getElementById("results_total").textContent = "Total Colleges Blades: 47";
            document.getElementById("results_wrong").textContent = "Wrong Tries: " + wrongs;
            document.getElementById("results_given_up").textContent = "Given Up: " + solutions;
            document.getElementById("results_time").textContent = "Time: " + time/1000 + "s";
            document.getElementById("results").style.display = "flex";
            document.getElementById("give_up").onclick = "";
        }
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
            element.scrollIntoView();
            const index = colleges.indexOf(college.innerText);
            colleges.splice(index, 1);
            solutions += 1;
        }
        else{
            element.style.borderColor = "white";
        }
    }
    setTimeout(drawCollege, 1000);
}
function playAgain(){
    document.getElementById("results").style.display = "none";
    init();
}
function backToMenu(){
    window.location.replace("index.html");
}
//init
init();
