const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

start();

async function start() {
  const welcomeMessage = `182 Main St.
You are standing on Main Street between Church and South Winooski.
There is a door here. A keypad sits on the handle.
On the door is a handwritten sign.`;
  let answer = await ask(welcomeMessage);
  console.log('Now write your code to make this work!');
  process.exit();
}



/*

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
