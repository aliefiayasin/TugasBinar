class Rochambeau {
    constructor(name, option) {
        this.name = name;
        this.option = option;
    }
}

let options = ["Rock", "Paper", "Scissor"];

$("#refresh").on('click', function(event){
    $('#h1').text("VS");
    $('#h1').css("color", "red");
});

$(".your-tool").on('click', function(event){
    let option = options[GetOption(event.currentTarget.id)];

    let player = new Rochambeau("player", option);

    let random = options[Math.floor(Math.random() * 3)];
    let computer = new Rochambeau("computer", random);

    CheckResult(player, computer);
});

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
        $('#h1').css("color", "yellow")
    }else if(player.option === "Rock" && computer.option === "Paper"){
        $('#h1').text("Lose");
        $('#h1').css("color", "red")
    }
    else{
        $('#h1').text("Win");
        $('#h1').css("color", "green")
    }
}