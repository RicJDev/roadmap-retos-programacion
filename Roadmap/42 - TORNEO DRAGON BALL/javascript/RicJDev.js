/*
  EJERCICIO:

  @RicJDev
*/

/* PERSONAJES */

class Figther {
  constructor(name, speed, attack, defenseRate) {
    this.name = name

    this.speed = speed
    this.attack = attack
    this.defenseRate = defenseRate

    this.health = 100
    this.isAlive = true
  }

  defense(attack) {
    if (this.defenseRate > attack) {
      attack -= Math.floor(attack * 0.1)

      console.log(`¡${this.name} ha amortiguado el ataque!`)
    }

    const dodgeRate = Math.random()

    if (dodgeRate > 0.8) {
      attack = 0

      console.log(`¡${this.name} ha esquivado el ataque!`)
    }

    this.health -= attack

    if (this.health < 0) this.health = 0
    if (this.health === 0) this.isAlive = false
  }
}

/* BATALLA */

function displayFigthers(player1, player2) {
  console.log(`${player1.name}: ${player1.health}`)
  console.log(`${player2.name}: ${player2.health}`)
  console.log(' ')
}

function simulateBattle(player1, player2) {
  player1.health = 100
  player2.health = 100

  let condition1 = player1.speed > player2.speed

  while (player1.health > 0 && player2.health > 0) {
    displayFigthers(player1, player2)

    condition1 ? player2.defense(player1.attack) : player1.defense(player2.attack)

    condition1 = !condition1
  }

  displayFigthers(player1, player2)

  const condition2 = player1.health === 0

  const loser = condition2 ? player1 : player2
  const winner = !condition2 ? player1 : player2

  console.log(`${loser.name} ha perdido.`)

  return winner
}

/* TORNEO */

class Tournament {
  figthers = []

  addParticipant(participant) {
    this.figthers.push(participant)
  }

  play() {
    if (this.isPlayable) {
      console.log('Que inicie el torneo!')

      //TODO: logica para gestionar el torneo

      return
    }

    //prettier-ignore
    console.log('No se puede iniciar un torneo si el número total de participantes no es potencia de 2')
    console.log(`Cantidad actual de participantes: ${this.figthers.length.toLocaleString()}`)
  }

  get isPlayable() {
    let count = this.figthers.length

    if (count < 1) return false
    if (count === 1) return true

    while (count % 2 === 0) count = Math.sqrt(count)

    return count === Math.sqrt(2)
  }
}

const tournament = new Tournament()

// tournament.addParticipant(new Figther('Goku', 20, 60, 45))

tournament.play()
