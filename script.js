

const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');

let lastHole;
let timeUp = false;
let score = 0;
let Players = [];

//create a function to make a random time for mole to pop from the hole
function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes){
    const index  = Math.floor(Math.random() * holes.length);
    const hole = holes[index];

    //prevent same hole from getting the same number
    if (hole === lastHole){
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

function peep() {
    const time = randomTime(500, 1000); //get a random time to determine how long mole should peep
    const hole = randomHole(holes); //get the random hole from the randomHole function
    hole.classList.add('up'); //add the CSS class so selected mole can "pop up"
    setTimeout(() => {
        hole.classList.remove('up'); //make the selected mole "pop down" after a random time
        if(!timeUp) {
            peep();
        }
    }, time);
}

function startGame() {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => timeUp = true, 15000) //show random moles for 15 seconds
}

function displayLeaderboard() {
    let theExport = ""; 
    Players.sort((aPlayer, bPlayer) => aPlayer.score - bPlayer.score).reverse();
    Players.forEach((player) => theExport += '<tr><td>' + player.name + '</td><td>' + player.score + '</td></tr>');
    document.getElementById("thingy").innerHTML = theExport; //Why have good ID's when you can have bad ones? | Who needs children when we can use innerHTML?
}



function wack(e){
    if(!e.isTrusted) return; //** new thing I learned */
    score++;
    this.parentNode.classList.remove('up'); //this refers to item clicked
    scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', wack))

function Player(myName, myScore) {
    this.name = myName;
    this.score = myScore;
}

// function saveGame(player) {
//         p1 = new Player(player, score);
//         Players.add(p1);
// }

function saveGame(player) {
        p1 = new Player(player, score);
        
        Players.push(p1);
        score = 0;
        
        //const jsonContent = JSON.stringify(Players);
        console.log(Players);
        displayLeaderboard();
        
        // fs.writeFile("./players.json", jsonContent, 'utf8', function (err) {
        //     if (err) {
        //         return console.log(err);
        //     }
        
        //     console.log("The file was saved!");
        // }); 
        
}

function popUpMojito() {
    var mojitoRecipe = 'RECIPE FOR ' + score + ' MOJITOS\n------\n' + 5*score + ' mint leaves for garnish\n' + 2*score + ' oz white rum\n' + 1*score + ' oz lime juice\n' + 0.5*score + 'oz simple syrup\nIce\nClub soda\nLime wedges for garnish';
    window.alert(mojitoRecipe);
}
