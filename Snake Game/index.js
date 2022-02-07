const grid = document.querySelector('.grid')
const button = document.querySelector(".button")
const submit = document.querySelector(".submit")
const scoreDisplay = document.getElementById('score')
let squares = []
let currentSnake = [2,1,0]
let direction = 1
const width = 10
let appleIndex = 0
let score = 0
let intervalTime = 1000
let timerId = 0




function createGrid() {
    for (let i=0; i < width*width; i++) {
    const square = document.createElement('div')
    square.classList.add('square')
    grid.appendChild(square) 
    squares.push(square)
    }
}
createGrid()

currentSnake.forEach(index => squares[index].classList.add('snake'))

function startGame() {
    currentSnake.forEach(index => squares[index].classList.remove("snake"))
    squares[appleIndex].classList.remove("apple")
    clearInterval(timerId)
    currentSnake = [2,1,0]
    direction = 1
    score = 0
    scoreDisplay.textContent = score
    intervalTime = 1000
    generateApple()
    currentSnake.forEach(index => squares[index].classList.add("snake"))
    timerId = setInterval(move, intervalTime)
}

function move() {
    if (
        (currentSnake[0] + width >= width*width && direction === width) || 
        (currentSnake[0] % width === width-1 && direction === 1) || 
        (currentSnake[0] % width === 0 && direction === -1) || 
        (currentSnake[0] - width < 0 && direction === -width) || 
        squares[currentSnake[0] + direction].classList.contains('snake')
    )
    return clearInterval(timerId)


    const tail = currentSnake.pop()
    squares[tail].classList.remove('snake')
    currentSnake.unshift(currentSnake[0] + direction)
    
    if (squares[currentSnake[0]].classList.contains('apple')) {
        squares[currentSnake[0]].classList.remove('apple')
        squares[tail].classList.add('snake')
        currentSnake.push(tail)
        generateApple()
        score++
        scoreDisplay.textContent = score
        clearInterval(timerId)
        intervalTime = intervalTime * 0.9
        timerId = setInterval(move, intervalTime)
    }
    
    
    
    squares[currentSnake[0]].classList.add('snake')
}




function generateApple() {
    do {
        appleIndex = Math.floor(Math.random() * squares.length)
    } while (squares[appleIndex].classList.contains('snake'))
    squares[appleIndex].classList.add('apple')
} 
generateApple()

function control(e) {
    if (e.keyCode === 39) {
        console.log('right pressed')
        direction = 1
    } else if (e.keyCode === 38) {
        console.log('up pressed')
        direction = -width
    } else if (e.keyCode === 37) {
        console.log('left pressed')
        direction = -1
    } else if (e.keyCode === 40) {
        console.log('down pressed')
        direction = +width
    }
}
document.addEventListener('keyup', control)
button.getElementsByClassName("button")