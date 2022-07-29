/** Flappy Bird on Microbit */
//  Setting up global variables
let emptyObstacleY = 0
let ticks = 0
let bird : game.LedSprite = null
let obstacles : game.LedSprite[] = []
let rate = 3
bird = game.createSprite(1, 2)
bird.setBlink(300)
let score = -1
let pause_time = 1000
//  Moving the bird up if a is pressed
input.onButtonPressed(Button.A, function on_button_pressed_a() {
    bird.changeYBy(-1)
})
//  Moving the bird down if b is pressed
input.onButtonPressed(Button.B, function on_button_pressed_b() {
    bird.changeYBy(1)
})
//  Running the game state
basic.forever(function on_forever() {
    //  Bringing global variables into the function
    
    //  Removing any obstacles in the first x column
    while (obstacles.length > 0 && obstacles[0].get(LedSpriteProperty.X) == 0) {
        obstacles[0].delete()
        obstacles.removeAt(0)
    }
    //  Moving all of the obstacles to the left by one
    for (let obstacle of obstacles) {
        obstacle.change(LedSpriteProperty.X, -1)
    }
    //  Adding new obstacles based on the rate and score
    if (ticks % rate == 0 && score != 10) {
        emptyObstacleY = randint(0, 4)
        for (let index = 0; index < 5; index++) {
            if (index != emptyObstacleY) {
                obstacles.push(game.createSprite(4, index))
            }
            
        }
    }
    
    //  Checking if an obstacle was hit
    for (let obstacle2 of obstacles) {
        if (obstacle2.get(LedSpriteProperty.X) == bird.get(LedSpriteProperty.X) && obstacle2.get(LedSpriteProperty.Y) == bird.get(LedSpriteProperty.Y)) {
            if (score > 10) {
                score -= 1
            }
            
            game.setScore(score)
            game.gameOver()
        }
        
    }
    //  Adjusting the score if an obstacle is passed
    if (ticks % rate == 0) {
        score += 1
    }
    
    //  Adjusting game difficulty as score progresses
    if (score == 10) {
        rate = 2
    } else if (score == 20) {
        pause_time = 750
    } else if (score == 30) {
        pause_time = 500
    } else if (score == 40) {
        pause_time = 250
    }
    
    //  Incrementing ticks
    ticks += 1
    //  Pausing based on the pause time determined by difficulty
    pause(pause_time)
})
