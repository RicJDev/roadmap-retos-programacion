/*
  EJERCICIO:

  @RicJDev
*/

// PERSONAJES

class Fighter {
  constructor({ name, speed, attackRate, defenseRate }) {
    this.name = name
    this.speed = speed
    this.attackRate = attackRate
    this.defenseRate = defenseRate

    this.health = 100
  }

  attack(oponent) {
    let damage =
      oponent.defenseRate > this.attackRate ? this.attackRate * 0.1 : this.attackRate - oponent.defenseRate + 1
    if (Math.random() > 0.8) damage = 0

    oponent.health -= Math.floor(damage)
    if (oponent.health < 0) oponent.health = 0

    return damage
  }
}

// TORNEO

class Tournament {
  static #fighters = []

  static #shuffle(fighters) {
    const copy = [...fighters]
    let currentIndex = copy.length

    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--
      ;[copy[currentIndex], copy[randomIndex]] = [copy[randomIndex], copy[currentIndex]]
    }

    return copy
  }

  static get #rounds() {
    return Math.log(this.#fighters.length) / Math.log(2)
  }

  static add(...fighters) {
    for (const fighter of fighters) {
      this.#fighters.push(fighter)
    }
  }

  static #battle(fighterA, fighterB) {
    let first, second

    if (fighterA.speed == fighterB.speed) {
      ;[first, second] = Math.random() > 0.5 ? [fighterA, fighterB] : [fighterB, fighterA]
    } else {
      ;[first, second] = [fighterA, fighterB].sort((a, b) => b.speed - a.speed)
    }

    while (fighterA.health > 0 && fighterB.health > 0) {
      first.attack(second)
      ;[first, second] = [second, first]
    }

    const winner = fighterA.health > 0 ? fighterA : fighterB
    winner.health = 100

    console.log(`\n${fighterA.name} vs ${fighterB.name}. ${winner.name} gana!`)

    return winner
  }

  static start() {
    console.log(`Cantidad de luchadores actual: ${this.#fighters.length}`)

    if (!Number.isInteger(this.#rounds)) {
      console.log('Para empezar el torneo la cantidad de luchadores debe ser potencia de 2.')
      return
    }

    let inTournament = this.#shuffle(this.#fighters)

    let rounds = this.#rounds
    let roundCounter = 1

    while (rounds > 0) {
      console.log(`\n${roundCounter}° ronda. `)
      const winners = []

      for (let i = 0; i < inTournament.length; i += 2) {
        const winner = this.#battle(inTournament[i], inTournament[i + 1])

        winners.push(winner)
      }

      inTournament = this.#shuffle(winners)
      rounds--
      roundCounter++
    }
  }
}

Tournament.add(
  new Fighter({ name: 'Goku', speed: 95, attackRate: 90, defenseRate: 85 }),
  new Fighter({ name: 'Vegeta', speed: 90, attackRate: 88, defenseRate: 80 }),
  new Fighter({ name: 'Gohan', speed: 85, attackRate: 80, defenseRate: 75 }),
  new Fighter({ name: 'Freezer', speed: 90, attackRate: 95, defenseRate: 85 }),
  new Fighter({ name: 'Cell', speed: 88, attackRate: 90, defenseRate: 88 }),
  new Fighter({ name: 'Majin Buu', speed: 75, attackRate: 70, defenseRate: 80 }),
  new Fighter({ name: 'Trunks', speed: 85, attackRate: 80, defenseRate: 70 }),
  new Fighter({ name: 'Android 18', speed: 85, attackRate: 80, defenseRate: 75 })
)

Tournament.start()
