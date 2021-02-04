const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

start();

async function start() {
  const welcomeMessage = `The year is 2050.  Covid-19 has just been eradicated and you are now aloud to go out! \n You meet your friends at your favorite spot for ONE drink.  As you finish, your friends ask if the night should continue... \n\nDo you want to continue your night out?`;
  let answer = await ask(welcomeMessage);

  if (answer === 'no') {
    console.log('Enjoy your lame night in!');
    process.exit();
  } else {
    console.log('You exit the Radio Bean and find yourself at the intersection of Pearl and N.Winooski.  To the east is the hill to UVM and to the north a familiar sight.....')
    let firstDirection = await ask("Where would you like to go?")
    console.log(firstDirection);
    process.exit();
  }
}

//--------------------------------- TABI + OLIVES CODE ------------------------------------------------

//  start of player object... 
let player = {
  name: [],
  inventory: [],
  currentRoom: [],
  susPoints: []

  //moveRoom : function() {}
}

// room lookup table object
const rooms = {
  'radio bean': radioBean,
  'three needs': threeNeeds,
  'pool room': threeNeedsPoolRoom,
  'food cart': foodCart,
  'finnegans': finnegans,
  'deli': deli126,
  'deli 126': deli126,
  'red square': redSquare,
  'kkd': kkd,
  'kountry kart deli': kkd,
  'jps': jps,
}

// Room class. including name, description inventory, directionals and will have actions available later
class RoomClass {
  constructor(name, description, inventory, north, east, south, west) {
    this.name = name
    this.description = description
    this.inventory = inventory
    this.north = north || null
    this.east = east || null
    this.south = south || null
    this.west = west || null
  }
  //will need "if" drop item - add to inventory
}

//  user actions look table object

let userAction = {
  move: ['go', 'walk'],
  use: ['use', 'play', 'get', 'drink', 'eat'], //tip?
  take: ['take', 'grab', 'order'],
  open: ['open', 'unlock'],
  drop: ['drop'],
}

// inventory look up table
let invObjects = {
  'map': map,
  'water': water,
  'sparkling water': sparkWater,
  'shot': alcohol,
  'food': food,
  'sandwich': prize
}

//  inventory class
class InvObjectsClass {
  constructor(name, description, startingRoom, currentRoom, action) {
    this.name = name
    this.description = description
    this.startingRoom = startingRoom
    this.currentRoom = currentRoom || startingRoom // may need an inventory room for objects to be in... 
    this.action = action || [] // action array
  }

}

const map = new InvObjectsClass(map, "this is a map of Burlington's downtown area", threeNeedsPoolRoom, undefined, [use, take, drop])


//  need another async (?) play function... that 
//  1)takes a user input 
//  2) sanitizes it into multiple parts.. 
// one part will need action = userInputAction
// second part will need to be direction/object = userInputObject
//  3) jump into conditional ifs based on userInput.. where we do what the user said or... console.log(i dont know what your talking about)
//  4) at end want to jump to very top of play function...  will take you to top of function.. return function(); recursive loop 


async function play (){
  //  sanitize
  let input = await ask(`Current Room: ${player.currentRoom} \nWhat would you like to do....\n\n>_`);
  let inputSanitize = input.trim().toLowerCase(); 
  let inputArray = inputSanitize.split(' ');
  let inputAction = inputArray[0];
  let inputObject = inputArray[1]; // Can also be direction if action is go , walk, etc.


}





/*

//  structure hypothetical

//  print inventory if user enters i
let userInput = await ask(What do you want to do...);

if (userInput === 'i'){
  console.log(player.inventory);
}


- Intro: its the year XXXX its your first time out with your friends since covid ended......... said one drink , you finish.. do you want to continue your night out? Y/N
- Radio bean [optional, could just start outside]
  - "open" - check book
      -- "use" - check
  - "go" w to leave
      -- outside of Bean.. the intersection of Pearl and N.Winooski lies ahead to the east theres a the hill to UVM nw theres a familiar sight... 
        -- "go" e ["the hills too big"]
        -- "go" nw come across the three needs [depending on data type can change direction from nw to n or w as to not introduce new variable] describe scene... specifically door so that its clear you can go in
            -- "open" door 
                -- enter, describe what you see.. what would you like to do?
                -- "go" n : describe you see a the bar, a doorway
                    -- "open" doorway: describe what you see.. only one exit, pool table, a bar, and the map
                      -- "get" a drink
                      -- "get" a water [sustenance point]
                      -- "use" pool
                      -- "take" map -- needed for later
                      -- "go" s 
                         -- exit 
                    -- "get" a drink
                    -- "get" a water [sustenance point]
                    -- "go" s 
                         -- exit
            -- "go" n 
                -- going to church st.: see food cart
                      -- "use" food cart
                          -- eat [give you sustenance points]
                      -- "go" no: state reach college st. where would you like to go?
                          -- go e
                              -- at finn
                                 -- "open" door
                                    --
                                    --
                                    -- go w
                                      -- exit
                          -- go w
                              -- at deli 126: describe it
                                  -- "open" door
                                    -- get water
                                        -- sparkling (2XP)
                                        -- still (1XP)
                                    -- get drink
                                  -- go w
                                    -- exit
                                
                          -- go n
                              -- further down church st.
                                  -- obstacle: need map -- out of towners or drunk biddies... need a map
                                        -- if no map must go back - display "i dont have a map"
                                            -- no option to go n, must go s to find map
                                        -- if have map can "use" map allowed to proceed
                                            -- go n
                                                -- redsquare: describe the scene
                                                    -- wait in line
                                                        -- "open" door: describe bar
                                                          -- "get" a drink 
                                                        -- "go" s 
                                                          -- exit
                                                    -- dont wait
                                                        -- "go" s
                                                          -- back to intersect college st.
                                                        -- "go" n: intersection of church and main
                                                            -- "go" e
                                                                -- hill death
                                                            -- "go" w
                                                                -- kkd: describe -- so bright!!
                                                                  -- "open" door
                                                                      -- get sandwich: FROM BOB
                                                                          -- if sustenence points == x guy is able to understand your order! congrats you win - bob comes out from behind grill and hugs you!!
                                                                          -- if sustenence points < x guy is NOT able to understand your order!  sorry no food
                                                                      -- "go" e
                                                                        -- exit
                                                                  -- go "e"
                                                                      -- go back
                                                                  -- go "w"
                                                                      -- JPs 
                                                                        -- "open" door: describe bar
                                                                            -- "get" a drink 
                                                                            -- "get" water
                                                                            -- "go" e 
                                                                              -- exit
                                                                        -- "go" w
                                                                            -- die
                                                                        -- "go" e
                                                                            -- back

                                                                        
                                                                      




                          -- go s   
                              -- return to previous options... 

        
  - "go" e to bathroom
      -- no toilet paper do you still go? 
      -- have to exit lav "go w"
        -- go w to leave 



        ADDITIONAL IDEAS/NOTES:
        - maybe cant back track all the way to needs/bean
        - tip the bar tender for XP?
        - if go down hill at deli == die
        - if go up hill at finns == cant go or die
        - park shortcut 
        - cocktail at deli 126 too expensive?
        - redsquare die case: pick wrong song, attacked by college mob.. or bro pick up.. or spill drink