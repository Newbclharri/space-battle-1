
alien = {
    "hull": (Math.random() * (6-3) + 3).toFixed(0),
    "firepower": (Math.random() * (0.4 - 0.2) + 0.2).toFixed(1),
    "accuracy": (Math.random() * (0.8 - 0.6) + 0.6).toFixed(1),
    "isAlive": true,
    "checkIsAlive": function (){
        if(this.hull <= 0 ){
            this.isAlive = false;
        }
        return this.isAlive;
    },
    "isAccurate": function(){
      const randomNum = Math.random().toFixed(1);
      let isAccurate = false;
      
      if(randomNum < alien.accuracy){
        isAccurate = true; 
      }else{
        isAccurate = false;  
      }
      return isAccurate;    
    },
    "attack": function (bool){
      if(bool){
        player.hull -= this.firepower
        alert(`YOU'VE BEEN HIT!\n-${this.firepower}!, HP: ${player.hull}`)
      }else{
        alert(`MAD SKILLS. YOU EVADED!\n-0, HP: ${player.hull}`)
      }        
    },
    "avatar": `
        ##          ##
          ##      ##
        ##############
      ####  ######  ####        
    ###################### 
    ##  ##############  ##
    ##  ##          ##  ##
          ####  ####`
    
}
player = {
    "hull": 8,
    "firepower": 5,
    "accuracy": 0.7,
    "isAlive": true,
    "checkIsAlive": function (){
        if(this.hull <= 0 ){
            this.isAlive = false;
        }
        return this.isAlive;
    },

     "isAccurate": function(){
      let isAccurate = false;
      let randomNum = Math.random().toFixed(1)      
      if(randomNum < player.accuracy){
        isAccurate = true;  
      }else{
        isAccurate = false;  
      }
      return isAccurate;    
    },
    "attack": function (bool){
      if(bool){
        alien.hull -= this.firepower;
        alert(`BINGO!\n+${this.firepower}!, Alien HP: ${alien.hull}`);
        
      }else{
        alert(`YOU MISSED!\n -0, Alien HP: ${alien.hull}`)         
      }
      return alien.hull;
       
    }  
}

game = {
    "title": `***DEFEND THE PLANET!***\n\nYOU: HULL: ${player.hull}, ATTACK: ${player.firepower}, ACCURACY: ${player.accuracy}\nVS.\nALIEN: HULL: ${alien.hull}, ATTACK: ${alien.firepower}, ACCURACY: ${alien.accuracy}`,
    // "quit": 0,
    "attack": 1,
    "retreat": 2,
    "getInput": function(){        
        let response = prompt(`Attack: ${this.attack}\nRetreat: ${this.retreat}`)
        response = parseInt(response)
        if(response == this.attack || response == this.retreat){
          return response
        }
        return this.getInput();
        
    },    
    "render": function(){
      if(player.hull == 0){
        return alert(`YOU: Vanished into the dark abyss :( \nALIEN: Imminent Earth Invasion`)
      }else if(player.hull < 0){
        return alert(`YOU: BLOWN TO SMITHEREANS! \nALIEN: Descending upon Earth`)
      }

      if(alien.hull == 0){
        return alert(`YOU: Champion of Earth! \nALIEN: SPACE DUST`)
      }else if(alien.hull < 0){
        return alert(`YOU: JUGGERNAUT! \nALIEN: BLOWN TO BITS`)
      }
        
    },
    "play": function(){
        let option;
        alert(this.title);
        //the game objective is for one oponent to destroy the other opponent's ship.  I removed the retreat  condition from the while loop expression because retreat is not the objective.
        //It's an option to break the loop
        while(player.isAlive && alien.isAlive){
          

          option = this.getInput();
          
          if(option === this.attack && player.isAlive){
              alert(`ATTACK!`)              
              player.attack(player.isAccurate());              
              alien.checkIsAlive();
            if(alien.isAlive){
              alert(`ALIEN STRIKES!\n${alien.avatar}`)
         

              alien.attack(alien.isAccurate());
              player.checkIsAlive();
            }
             
          }else if(option === this.retreat){
            alert(`RETREAT!`)
            break;
          }         
          // alert(`Player: ${player.isAlive}`) //Debug
        }
        this.render();
        if(option === this.retreat){ // Player should still be alive if retreat is selected.  This makes the logic simpler //(player.hull > 0 && alien.hull > 0) && (player.hull > alien.hull){
          if(player.hull > alien.hull){
            alert(`You escaped with your life!`);         
          }else if(alien.hull > player.hull){
            alert(`Alien scared you off!`);
          } else{
            alert("The battle we undecided.  The fate of the Earth is uncertain..."); //Player hull = alien hull
          }
        }else if(player.isAlive && !alien.isAlive){
          alert(`You defeated the alien menace :)`);
        }else{
          alert(`You let down the human race :(`);
        }          
      }        
    }

game.play()





