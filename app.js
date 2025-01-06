const grid = document.querySelector(".grid")
const resultDisplay = document.querySelector(".results")
const timer = document.querySelector(".timer")
let init = 0
let currentShooterIndex = 172
const width = 15
const aliensRemoved = []
let invadersId
let crowShits
let makeItRain
let isGoingRight = true
let direction = 1
let results = 0
let won = false

for (let i = 0; i < width * width; i++) {
    const square = document.createElement("div")
    grid.appendChild(square)
}

const squares = Array.from(document.querySelectorAll(".grid div"))


const alienInvaders = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39
]

function draw() {
    for (let i = 0; i < alienInvaders.length; i++) {
        if (!aliensRemoved.includes(i)) {
            squares[alienInvaders[i]].classList.add("crow1_r")
        }
    }
}

draw()

squares[currentShooterIndex].classList.add("shooter_UuR")
squares[currentShooterIndex+width].classList.add("shooter_UbR")
squares[currentShooterIndex+width+width].classList.add("shooter_BuR")
squares[currentShooterIndex+width+width+width].classList.add("shooter_BbR")
squares[currentShooterIndex-1].classList.add("shooter_UuL")
squares[currentShooterIndex-1+width].classList.add("shooter_UbL")
squares[currentShooterIndex-1+width+width].classList.add("shooter_BuL")
squares[currentShooterIndex-1+width+width+width].classList.add("shooter_BbL")

function remove() {
    for (let i = 0; i < alienInvaders.length; i++) {
        squares[alienInvaders[i]].classList.remove("crow1_r")
        squares[alienInvaders[i]].classList.remove("crow1_l")
    }
}

function moveShooter(e) {
    squares[currentShooterIndex].classList.remove("shooter_UuR")
    squares[currentShooterIndex+width].classList.remove("shooter_UbR")
    squares[currentShooterIndex+width+width].classList.remove("shooter_BuR")
    squares[currentShooterIndex+width+width+width].classList.remove("shooter_BbR")
    squares[currentShooterIndex-1].classList.remove("shooter_UuL")
    squares[currentShooterIndex-1+width].classList.remove("shooter_UbL")
    squares[currentShooterIndex-1+width+width].classList.remove("shooter_BuL")
    squares[currentShooterIndex-1+width+width+width].classList.remove("shooter_BbL")
    switch (e.key) {
        case "ArrowLeft":
            if (currentShooterIndex % width !== 1) currentShooterIndex -= 1
            break
        case "ArrowRight":
            if (currentShooterIndex % width < width - 1) currentShooterIndex += 1
            break
    }
    squares[currentShooterIndex].classList.add("shooter_UuR")
    squares[currentShooterIndex+width].classList.add("shooter_UbR")
    squares[currentShooterIndex+width+width].classList.add("shooter_BuR")
    squares[currentShooterIndex+width+width+width].classList.add("shooter_BbR")
    squares[currentShooterIndex-1].classList.add("shooter_UuL")
    squares[currentShooterIndex-1+width].classList.add("shooter_UbL")
    squares[currentShooterIndex-1+width+width].classList.add("shooter_BuL")
    squares[currentShooterIndex-1+width+width+width].classList.add("shooter_BbL")
}

document.addEventListener("keydown", moveShooter)

function moveInvaders() {
    if(init<=100){
        const leftEdge = alienInvaders[0] % width === 0
        const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1
        remove()

        if (rightEdge && isGoingRight) {
            direction = -1
            isGoingRight = false
        }

        if (leftEdge && !isGoingRight) {
            direction = 1
            isGoingRight = true
        }

        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += direction
            if(!isGoingRight && !aliensRemoved.includes(i)){
                squares[alienInvaders[i]].classList.add("crow1_r")
                squares[alienInvaders[i]].classList.remove("crow1_l")
            } else if(!aliensRemoved.includes(i)){
                squares[alienInvaders[i]].classList.remove("crow1_r")
                squares[alienInvaders[i]].classList.add("crow1_l")
            }
        }

        draw()

        if (aliensRemoved.length === alienInvaders.length) {
            resultDisplay.innerHTML = "YOU WON"
            clearInterval(invadersId)
            won = true
        }
    }
}

invadersId = setInterval(moveInvaders, 600)

function shoot(e) {
    let laserId
    let currentLaserIndex = currentShooterIndex

    function moveLaser() {
        if(init<=50){
            squares[currentLaserIndex].classList.remove("bullet")
            currentLaserIndex -= width
            squares[currentLaserIndex].classList.add("bullet")

            if ((squares[currentLaserIndex].classList.contains("crow1_r")) || (squares[currentLaserIndex].classList.contains("crow1_l"))) {
                squares[currentLaserIndex].classList.remove("bullet")
                squares[currentLaserIndex].classList.remove("crow1_r")
                squares[currentLaserIndex].classList.remove("crow1_l")
                squares[currentLaserIndex].classList.add("boom")

                setTimeout(() => squares[currentLaserIndex].classList.remove("boom"), 300)
                clearInterval(laserId)

                const alienRemoved = alienInvaders.indexOf(currentLaserIndex)
                aliensRemoved.push(alienRemoved)
                results++
                resultDisplay.innerHTML = `Crows Murdered: ${results}`
            }
        } else if(init<=75){
            squares[currentLaserIndex].classList.remove("bullet")
            squares[currentLaserIndex].classList.remove("bullet_o")
            currentLaserIndex -= width
            squares[currentLaserIndex].classList.add("bullet_o")

            if ((squares[currentLaserIndex].classList.contains("crow1_r")) || (squares[currentLaserIndex].classList.contains("crow1_l"))) {
                squares[currentLaserIndex].classList.remove("bullet_o")
                squares[currentLaserIndex].classList.remove("crow1_r")
                squares[currentLaserIndex].classList.remove("crow1_l")
                squares[currentLaserIndex].classList.add("boom")

                setTimeout(() => squares[currentLaserIndex].classList.remove("boom"), 300)
                clearInterval(laserId)

                const alienRemoved = alienInvaders.indexOf(currentLaserIndex)
                aliensRemoved.push(alienRemoved)
                results++
                resultDisplay.innerHTML = `Crows Murdered: ${results}`
            }
        } else{
            squares[currentLaserIndex].classList.remove("bullet_o")
            squares[currentLaserIndex].classList.remove("bullet_r")
            currentLaserIndex -= width
            squares[currentLaserIndex].classList.add("bullet_r")

            if ((squares[currentLaserIndex].classList.contains("crow1_r")) || (squares[currentLaserIndex].classList.contains("crow1_l"))) {
                squares[currentLaserIndex].classList.remove("bullet_r")
                squares[currentLaserIndex].classList.remove("crow1_r")
                squares[currentLaserIndex].classList.remove("crow1_l")
                squares[currentLaserIndex].classList.add("boom")

                setTimeout(() => squares[currentLaserIndex].classList.remove("boom"), 300)
                clearInterval(laserId)

                const alienRemoved = alienInvaders.indexOf(currentLaserIndex)
                aliensRemoved.push(alienRemoved)
                results++
                resultDisplay.innerHTML = `Crows Murdered: ${results}`
            }
        }
    }

    if (e.key === " " && init<100) {
        laserId = setInterval(moveLaser, 100)
    }
}

function crowShitting(crowIndex) {
    let laserId
    let i = crowIndex

    function moveShit() {
        squares[i].classList.remove("shit")
        if(i!==83 && i!== 84 && i!== 85 && i!== 112 && i!== 126 && i!== 140 && init<=100){
            i += width
            squares[i].classList.add("shit")
        }
    }

    laserId = setInterval(moveShit, 100)

}

document.addEventListener('keydown', shoot)

function makeItShit(){
    if(!won){
        let i = Math.floor(Math.random()*5) + 35
        setInterval(crowShitting(i), 500)
    }
}

makeItRain = setInterval(makeItShit, 300)

function shitCounter(){
    if(init<=100 && !won){
        timer.innerHTML = `Amount of Shit on Statue: ${init}%`
        init++
    }
    else resultDisplay.innerHTML = "YOU LOST"

    if(init>=10 && init<20){
        grid.classList.remove("grid")
        grid.classList.add("grid10")
    } else if(init>=20 && init<30){
        grid.classList.remove("grid10")
        grid.classList.add("grid20")
    } else if(init>=30 && init<40){
        grid.classList.remove("grid20")
        grid.classList.add("grid30")
    } else if(init>=40 && init<50){
        grid.classList.remove("grid30")
        grid.classList.add("grid40")
    } else if(init>=50 && init<60){
        grid.classList.remove("grid40")
        grid.classList.add("grid50")
    } else if(init>=60 && init<70){
        grid.classList.remove("grid50")
        grid.classList.add("grid60")
    } else if(init>=70 && init<80){
        grid.classList.remove("grid60")
        grid.classList.add("grid70")
    } else if(init>=80 && init<90){
        grid.classList.remove("grid70")
        grid.classList.add("grid80")
    } else if(init>=90 && init<100){
        grid.classList.remove("grid80")
        grid.classList.add("grid90")
    } else if(init>=100){
        grid.classList.remove("grid90")
        grid.classList.add("grid100")
    }
}

setInterval(shitCounter, 300)