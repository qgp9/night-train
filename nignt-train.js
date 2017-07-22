class Train {
  constructor(trainNames) {
    this.wagons = {}
    this.trainNames = [
      'register',
      ...trainNames
    ]
    this.trains = {}
    for (const name of this.trainNames) this.trains[name] = []
  }

  register (wagon) {
    if (!wagon) throw Error ('Wagon is empty')
    if (!wagon.register) throw Error('Wagon has no register method. ', wagon)
    this.wagons[wagon.name] = this.trains.register.length
    for (const name of this.trainNames) {
      if (wagon[train]) this.trains[name].push(wagon)
    }
  }

  async run (trainname, goods) {
    for (wagon of this.trains[trainname]) {
      await wagon[trainname](goods)
        .catch(e => { console.error(`Eorros of wagon ${wagon.name} in train ${tranname}.`); throw Error })
    }
  }
}
