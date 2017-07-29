# night-train

Simple plugin system for nodejs with Promise

## What is night-train

night-train runs series of plugins(a.k.a Wagon) for each task(a.k.a Train)

## Trains
Trains are tasks which contain wagons.
### init

```js
const trains = new night-train([
  'processCollection',
  'processItems',
  'processInstall',
  ])

trains.register(new MyWagon1) // Actual registration of wagon doesn't run here.
trains.register(new MyWagon2) // Registration of a wagon is global not for each train.
```

### Run
`Run` method return Promise. Register train should be ran before any other runs.
For wagons, a register train can run any time and several times, so it's important to make it stateless.
However it's optional, actuall way of usage is on your own.

Every wagons in a train will run sequincely as order of registrations.

```js
await trains.run('register', payload)
  .then(() => console.log('registration done'))
  .catch(err => { throw Error(err) }

await trains.run('processCollection', payload)
  .then(() => console.log('processColection done'))
  .catch(err => { throw Error(err) }
  
await trains.run('processItems', payload)
  .then(() => console.log('processItems done'))
  .catch(err => { throw Error(err) }
  
await trains.run('processInstall', payload)
  .then(() => console.log('processInstall done'))
  .catch(err => { throw Error(err) }
```

## Wagons
Each  wagong must have 'name' properity and 'register' method and optionally methods/functions named same as a train name.
Night-train will check methods  of wagon and automatically link them with a train of same name.

Every methods must return a Promise

### Example Wagon
```js
// MyWagon only runs for 'register' and 'processCollection' trains
class MyWagon {
  constructor () {
   this.name = 'MyWagon' 
  }

  async register (payload) {
    // initialize properities here with payload
    
  }

  async processCollection (payload) {
    // do process Collection
  }
}

module.exports = MyWagon
```
