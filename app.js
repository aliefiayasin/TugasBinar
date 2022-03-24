class Rochambeau {
    constructor(name, option) {
        this.name = name;
        this.option = option;
    }
}

let options = ["Rock", "Paper", "Scissor"];

$("#refresh").on('click', function(event){
    ResetGame();
});

$(".your-tool").on('click', function(event){
    if(!IsReady()) return;

    let targetId = event.currentTarget.id;
    UpdatePlayerSelection(targetId);
    let option = options[GetOption(targetId)];

    let player = new Rochambeau("player", option);

    let random = options[Math.floor(Math.random() * 3)];
    let computer = new Rochambeau("computer", random);
    UpdateComputerSelection(random);

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
        $('#h1').text("Draw");
    }else if(player.option === "Rock" && computer.option === "Paper"){
        $('#h1').text("Lose");
    }
    else{
        $('#h1').text("Win");
    }
    $('#box').addClass('result');
}

function UpdatePlayerSelection(targetId){
    $('#'+targetId).addClass('selected');
}

function UpdateComputerSelection(value){
    let id = '';
    if(value === 'Rock'){
        id = 'r-user';
    } else if (value === 'Paper'){
        id = 'p-user';
    } else if (value === 'Scissor'){
        id = 's-user';
    }
    UpdatePlayerSelection(id);
}

function ResetGame(){
    $('#h1').text("VS");
    $('#box').removeClass('result');
    $('.your-tool').removeClass('selected');
    $('.com-tool').removeClass('selected');
}