//  This is not my code!!! this is an example of how to use objects
const readline = require('readline')
const rlInterface = readline.createInterface(process.stdin, process.stdout)
function ask(questionText) {
    return new Promise((resolve, reject) => {
        rlInterface.question(questionText, resolve);
    })
}
let inventory = [] 
class Item {
    constructor(name, description, action, takeable) {
        this.name = name;
        this.desc = description;
        this.takeable = takeable || false 
        this.action = action || 'nothing happens...'
    }
    take() {
        if (this.takeable) {
            inventory.push(this.name) 
            return `You picked up ${this.name}`
        } else {
            return "You can't take that"
        }
    }
    use() {
        if (this.name === 'desk' && inventory.includes('smallKey')) {
            return 'you open the drawer, inside is a large key'
        } else {
            return this.action
        }
    }
}
let desk = new Item('desk', 'A small writing desk.\nThere is a single drawer.', 'the desk is locked');
let rug = new Item('rug', 'a faded rug', 'you lift the rug\nunderneath is a small key');
let clock = new Item('clock', `the clock keeps ticking away\nthere is no way to open it`);
let smallKey = new Item('smallKey', 'a small key', 'this looks like it would fit the lock on the desk...', true);
let largeKey = new Item('largeKey', 'a large key', 'this looks like it would fit the lock on the door...', true);
let lookupTable = {
    desk: desk,
    rug: rug,
    clock: clock,
    smallKey: smallKey,
    largeKey: largeKey
}
async function play() {
    let userAction = await ask('What would you like to do? ')
    let inputArray = userAction.split(' ');
    let action = inputArray[0]
    let target = inputArray[1]
    if (action === 'use') {
        console.log(lookupTable[target].use()) 
        return play()
    } else if (action === 'examine') {
        console.log(lookupTable[target].desc)
        return play()
    } else if (action === 'take') {
        console.log(lookupTable[target].take())
         return play()
    } else if (action === 'leave') {
        if (inventory.includes('largeKey')) {
            console.log('Congratulations you win!')
            process.exit()
        } else {
            console.log('the door is locked') 
            return play()
        }
    } else {
        console.log('sorry invalid input\ntry again...') 
        return play()
    }
}
console.log('Welcome brave traveler to your DOOOOOOM!\nYou find yourself trapped in a small room, to your left is a small desk\nin the middle of the floor is a faded rug\nto your right is a grandfather clock\ndirectly across from you is the door out');
play()