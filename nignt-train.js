'use strict'
const debug = require('debug')('night-train')

function ERROR (...args) {
  return function (err) {
    console.error(...args)
    console.error(err)
    process.exit(1)
  }
}

const REGISTER = 'register'

class Train {
  constructor(trainNames) {
    this.wagons = {}
    this.trainNames = [
      REGISTER,
      ...trainNames
    ]
    this.trains = {}
    for (const name of this.trainNames) this.trains[name] = []
  }

  register (wagon) {
    debug('Register trains')
    if (!wagon) throw Error ('Wagon is empty')
    if (!wagon[REGISTER]) ERROR('Wagon has no register method. ', wagon)
    const index = this.trains[REGISTER].length
    this.wagons[wagon.name] = index
    this.trains.register.push([index, wagon])
    for (const name of this.trainNames) {
      if (name === REGISTER) continue
      if (wagon[name]) {
        this.trains[name].push([index, wagon])
        debug(wagon.name, 'is registered to', name)
      }
    }
  }

  async run (trainname, goods) {
    debug('Train runs.', trainname)
    for (const index in this.trains[trainname]) {
      const wagonInfo = this.trains[trainname][index]
      const registerIndex = wagonInfo[0]
      const wagon = wagonInfo[1]
      await wagon[trainname](goods, {
        index,
        registerIndex,
        trains: this.trains,
        wagons: this.wagos
      })
        .catch(ERROR(`Erros of wagon ${wagon.name} in train ${trainname}.`))
    }
  }

  async runAsync (trainname, goods) {
    debug('Train runs in async mode.', trainname)
    const plist = []
    for (const index in this.trains[trainname]) {
      const wagonInfo = this.trains[trainname][index]
      const registerIndex = wagonInfo[0]
      const wagon = wagonInfo[1]
      const promise = wagon[trainname](goods, {
        index,
        registerIndex,
        trains: this.trains,
        wagons: this.wagos
      })
        .catch(e => { console.error(`Erros of wagon ${wagon.name} in train ${trainname}.`); throw Error })
      plist.push(promise)
    }
    await Promise.all(plist)
  }

}

module.exports = Train
