const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

class Player {
  constructor() {
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.rotation = 0

    const image = new Image();
    image.src =
      "https://www.pngkit.com/png/full/32-328881_player-space-ship-space-ship-png-pixel-art.png";
    image.onload = () => {
      const scale = 0.15
      this.image = image;
      this.width = image.width * scale;
      this.height = image.height * scale;
      this.position = {
        x: canvas.width / 2 - this.width / 2,
        y: canvas.height - this.height - 20
      };
    };
  }

  draw() {
    // c.fillStyle = 'red'
    // c.fillRect(this.position.x, this.position.y, this.width,
    //     this.height)
    ////was supposed to cut line 37 for move it for line 48, but wouldn't draw the ship and background. 
    ////probably because the image isn't local and taken from an http. 27:10/2:06:38 from video
    c.save()
    // c.translate(
    //   player.position.x + player.width / 2,
    //   player.position.y + player.height / 2)

    if (this.image)
    c.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
    c.restore()
  }

  update() {
    if (this.image) {
    this.draw()
    this.position.x += this.velocity.x
    }
  }
}

const player = new Player()
const keys = {
  a: {
    pressed: false
  },
  d: {
    pressed: false
  },
  space: {
    pressed: false
  }
}
player.draw();

function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
//still goes through the left side but fine on right. 32:10
  if (keys.a.pressed && player.position.x >= 0) {
    player.velocity.x = -5
    player.rotation = -.15
  } else if (keys.d.pressed && 
    player.position.x +player.width <= canvas.width) {
    player.velocity.x = 5
  } else {
    player.velocity.x = 0
  }
}

animate()

addEventListener('keydown', ({key}) => {
  switch(key) {
    case 'a':
      console.log('left')
      player.velocity.x = -5
      keys.a.pressed = true
      break
      case 'd':
        console.log('right')
        keys.d.pressed = true
        break
        case ' ':
          console.log('space')
          break
  }
})

addEventListener('keyup', ({key}) => {
  switch(key) {
    case 'a':
      console.log('left')
      player.velocity.x = -5
      keys.a.pressed = false
      break
      case 'd':
        console.log('right')
        keys.d.pressed = false
        break
        case ' ':
          console.log('space')
          break
  }
})
//// separate code

// const START_GAME = 0;

// const PLAY_GAME = 1;

// const GAME_OVER = 2;

// const gameState = {
//   score: 0,
//   lives: 3,
//   barriers: [],
//   enemies: [],
//   activeState: START_GAME,
// };

// function createBarrier(id) {
//   return { damage: 0, id };
// }

// function createEnemy() {
//   constructor(x, y, speed);
// }

// function createShip() {}

// //draws the game(draw loop)
// function updateGame() {
//   if (gameState.activeState === START_GAME) {
//   } else if (gameState.activeState === PLAY_GAME) {
//   } else if (gameState.activeState === GAME_OVER) {
//   }
// }

// //something that handles button
// function addButtonListeners() {
//   addEventListener();
// }

// function removeButtonListeners() {}

// //something that updates scores
// function updateScores() {}

// //something that handles interaction between bullets and enemy
// function handleInteraction() {}

// function main() {}
