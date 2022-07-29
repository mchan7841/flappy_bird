"""Flappy Bird on Microbit"""

# Setting up global variables
emptyObstacleY = 0
ticks = 0
bird: game.LedSprite = None
obstacles: List[game.LedSprite] = []
rate = 3
bird = game.create_sprite(1, 2)
bird.set_blink(300)
score = -1
pause_time = 1000

# Moving the bird up if a is pressed
def on_button_pressed_a():
    bird.change_yby(-1)
input.on_button_pressed(Button.A, on_button_pressed_a)

# Moving the bird down if b is pressed
def on_button_pressed_b():
    bird.change_yby(1)
input.on_button_pressed(Button.B, on_button_pressed_b)

# Running the game state
def on_forever():
    # Bringing global variables into the function
    global emptyObstacleY, ticks, obstacles, rate, score, pause_time

    # Removing any obstacles in the first x column
    while len(obstacles) > 0 and obstacles[0].get(LedSpriteProperty.X) == 0:
        obstacles[0].delete()
        obstacles.remove_at(0)

    # Moving all of the obstacles to the left by one
    for obstacle in obstacles:
        obstacle.change(LedSpriteProperty.X, -1)

    # Adding new obstacles based on the rate and score
    if ticks % rate == 0 and score != 10:
        emptyObstacleY = randint(0, 4)
        for index in range(5):
            if index != emptyObstacleY:
                obstacles.append(game.create_sprite(4, index))
    
    # Checking if an obstacle was hit
    for obstacle2 in obstacles:
        if obstacle2.get(LedSpriteProperty.X) == bird.get(LedSpriteProperty.X) and obstacle2.get(LedSpriteProperty.Y) == bird.get(LedSpriteProperty.Y):
            if score > 10:
                score -= 1
            game.set_score(score)
            game.game_over()
    
    # Adjusting the score if an obstacle is passed
    if ticks % rate == 0:
        score += 1

    # Adjusting game difficulty as score progresses
    if score == 10:
        rate = 2
    elif score == 20:
        pause_time = 750
    elif score == 30:
        pause_time = 500
    elif score == 40:
        pause_time = 250

    # Incrementing ticks
    ticks += 1

    # Pausing based on the pause time determined by difficulty
    pause(pause_time)
basic.forever(on_forever)
