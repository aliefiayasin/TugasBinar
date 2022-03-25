class Rochambeau {
    constructor(name, id, option) {
        this.name = name;
        this.id = id;
        this.option = option;
    }
    updateSelection(){
        UpdatePlayerSelection(this.id);
    }
}

class Player extends Rochambeau{
    reset(){
        $('.your-tool').removeClass('selected');
    }
}

class Computer extends Rochambeau{
    reset(){
        $('.com-tool').removeClass('selected');
    }
}

var player;
var computer;

let options = ["Rock", "Paper", "Scissor"];

$("#refresh").on('click', function(event){
    ResetGame();
});

$(".your-tool").on('click', function(event){
    if(!IsReady()) return;

    let targetId = event.currentTarget.id;
    UpdatePlayerSelection(targetId);
    let option = options[GetOption(targetId)];

    player = new Player("player", targetId, option);
    player.updateSelection();

    let random = options[Math.floor(Math.random() * 3)];
    let computerId = GetComputerTarget(random);
    computer = new Computer("computer", computerId, random);
    
    computer.updateSelection();

    CheckResult(player, computer);
});

function IsReady(){
    return $('#h1').text() === "VS";
}

function GetOption(expr){
    switch (expr) {
        case 'rock':
            return 0;
        case 'paper':
            return 1;
        case 'scissor':
            return 2;
        default:
            return -1;
    }
}

function CheckResult(player, computer){
    if(player.option === computer.option){
        // change css VS => DRAW 
        $('#h1').text("DRAW");
    }else if(player.option === "Rock" && computer.option === "Paper"){
        $('#h1').text("COM WIN");
    }
    else{
        $('#h1').text("PLAYER 1 WIN");
    }
    $('#box').addClass('result');
}

function UpdatePlayerSelection(targetId){
    $('#'+targetId).addClass('selected');
}

function GetComputerTarget(value){
    let id = '';
    if(value === 'Rock'){
        id = 'r-user';
    } else if (value === 'Paper'){
        id = 'p-user';
    } else if (value === 'Scissor'){
        id = 's-user';
    }
    return id;
}

function ResetGame(){
    $('#h1').text("VS");
    $('#box').removeClass('result');
    computer?.reset();
    player?.reset();
}