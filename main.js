const model = {
    food: 100,
    play: 100,
    cleanlines: 100,
    score: 0,
    petName: "",
    avatar: ["(づ｡◕‿‿◕｡)づ",
        "(づ｡◕_◕｡)づ",
        "(づ｡◕-◕｡)づ",
        "(づ｡◕ ◕｡)づ",
        "(づ｡x x｡)づ",
        "x_x"],
    interval: null,
    gameOver: false,
    tickRate: 500,
}

//View
function updateGameWindow() {
    let game = `<div class="mainGame">`
    game += `<div>Ta vare på ${model.petName}</div>`
    game += `<div>Score = ${model.score}</div>`
    game += `<div>${model.avatar[selectAvatar()]}</div>`
    game += `<div> <div>Mat: ${model.food}%</div> <div>Humør: ${model.play}%</div> <div>Renslighet: ${model.cleanlines}%</div> </div>`
    document.getElementById("gameWindow").innerHTML = game, "</div>"

}

function updateControls() {
    document.getElementById("controls").innerHTML = `<div> 
    <button onclick="feed()">Gi mat</button>
    <button onclick="play()">Leke</button>
    <button onclick="clean()">Vask</button> 
    </div>`
}

function gameOverWindow() {
    if(model.petName == "Doffen") {
        window.location.replace("https://youtu.be/7iSki63ZDg0?t=39")
    } else {
    document.getElementById("gameWindow").innerHTML = `<div>Game Over</div> <div>Final score: ${model.score}</div> <div>${model.petName} er død :(</div> `
    document.getElementById("controls").innerHTML = ""
    }
}

//Controller
function startGame(inputFromUser) {
    model.petName = inputFromUser
    updateControls()
    model.interval = setInterval(newTick, model.tickRate)
}

function newTick() {
    subtractOne()
    gameOver()
    if (!model.gameOver) {
    model.score++
    updateGameWindow()
    } else {
        console.log("lol du tapte")
        gameOverWindow()
    }
}

function subtractOne() {
    model.food--
    model.play--
    model.cleanlines--
}

function selectAvatar() {
    let lowest = ""
    if (model.food < model.play) {
        lowest = model.food
    } else {
        lowest = model.play
    }

    if (lowest > model.cleanlines) {
        lowest = model.cleanlines
    }
    if (lowest < 5) return 5
    if (lowest < 20) return 4
    if (lowest < 40) return 3
    if (lowest < 60) return 2
    if (lowest < 80) return 1
    if (lowest < 101) return 0

}

function feed() {
    if(model.food < 90) {
        model.food += 10
    } else { model.food = 100}
}

function play() {
    if(model.play < 90) {
        model.play += 10
    } else { model.play = 100}
}

function clean() {
    if(model.cleanlines < 90) {
        model.cleanlines += 10
    } else { model.cleanlines = 100}
}

//game over
function gameOver() {
    if(model.food < 0 || model.cleanlines < 0 || model.play < 0) {
        clearInterval(model.interval)
        model.gameOver = true
    }


}



startGame("ape")

model.petName = prompt("Hva vil du kalle dyret ditt?")

