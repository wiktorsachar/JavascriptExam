/* Create a solution that will tell us what poker set we have. 
The solution is to deal us 5 cards from the standard 52 card deck. 
After that the solution is to tell us what is the best poker set. EXAM*/

const fs = require('fs');
const deck = JSON.parse(fs.readFileSync('poker_checker.json')); 

console.log('YOUR CARDS ARE:');

const hand = ((array) => {
    let fiveCards = [];
    let currentCardNumber = 0;
    let usedCardNumbers = [];
    while (fiveCards.length<5) {
        currentCardNumber = Math.floor(Math.random()*array.length);
            if (!usedCardNumbers.includes(currentCardNumber)) {
                    fiveCards.push(array[currentCardNumber]);
                     usedCardNumbers.push(currentCardNumber);
                     console.log(`The ${array[currentCardNumber].rank} of ${array[currentCardNumber].suit}.`)
                }
        
    }
    return fiveCards;

})(deck); 


const handCheck = ((playersHand) => { 
    let handOrderedIds = []; 
    let handOrdered = []; 

    for (let i = 0; i < playersHand.length; i++) {
        handOrderedIds.push(playersHand[i].id);
    }; 

    handOrderedIds.sort(function(a, b){return a-b}); 

    playersHand.forEach(function (a) {
        handOrdered[handOrderedIds.indexOf(a.id)] = a;
    }); 

    let one = playersHand[0];
    let two = playersHand[1];
    let three = playersHand[2];
    let four = playersHand[3];
    let five = playersHand[4]; 

    let jeden = (()=>{
        if (playersHand[0].id) {
            return playersHand[0].id;
        } else {
            return 0;
        }
    })();
    let dwa = (()=>{
        if (playersHand[1].id) {
            return playersHand[1].id;
        } else {
            return 0;
        }
    })();
    let trzy = (()=>{
        if (playersHand[2].id) {
            return playersHand[2].id;
        } else {
            return 0;
        }
    })();
    let cztery = (()=>{
        if (playersHand[3].id) {
            return playersHand[3].id;
        } else {
            return 0;
        }
    })();
    let piec = (()=>{
        if (playersHand[4].id) {
            return playersHand[4].id;
        } else {
            return 0;
        }
    })(); 
    

    if (one.id>8 && two.id>8 && three.id>8 && four.id>8 && five.id>8 
        && one.suit==two.suit && two.suit==three.suit && three.suit==four.suit 
        && four.suit==five.suit) {
                return 'Royal flush'; 

    } else if (one.suit==two.suit && two.suit==three.suit && three.suit==four.suit 
        && four.suit==five.suit && (
        (jeden==1 && dwa==2 && trzy==3 && cztery==4 && piec==5) 
        || (jeden==2 && dwa==3 && trzy==4 && cztery==5 && piec==6) 
        || (jeden==3 && dwa==4 && trzy==5 && cztery==6 && piec==7)
        || (jeden==4 && dwa==5 && trzy==6 && cztery==7 && piec==8)
        || (jeden==5 && dwa==6 && trzy==7 && cztery==8 && piec==9)
        || (jeden==6 && dwa==7 && trzy==8 && cztery==9 && piec==10)
        || (jeden==7 && dwa==8 && trzy==9 && cztery==10 && piec==11)
        || (jeden==8 && dwa==9 && trzy==10 && cztery==11 && piec==12)
        )) {
                return 'Straight flush'; 

    } else if ((one.id==two.id && two.id==three.id && three.id==four.id) || (two.id==three.id 
        && three.id==four.id && four.id==five.id) || (one.id==two.id && two.id==four.id 
        && four.id==five.id) || (one.id==three.id && three.id==four.id && four.id==five.id) 
        || (one.id==two.id && two.id==three.id && three.id==five.id)) {
                return 'Four of a kind'; 
    } else if ((one.id==two.id && three.id==four.id && four.id==five.id) 
        || (one.id==three.id && two.id==four.id && four.id==five.id) 
        || (one.id==four.id && two.id==three.id && three.id==five.id) 
        || (one.id==five.id && two.id==three.id && three.id==four.id) 
        || (two.id==three.id && one.id==four.id && four.id==five.id) 
        || (two.id==four.id && one.id==three.id && three.id==five.id) 
        || (two.id==five.id && one.id==three.id && three.id==four.id) 
        || (three.id==four.id && one.id==two.id && two.id==five.id) 
        || (three.id==five.id && one.id==two.id && two.id==four.id) 
        || (four.id==five.id && one.id==two.id && two.id==three.id)) {
                return 'Full house'; 
    } else if (one.suit==two.suit && two.suit==three.suit && three.suit==four.suit && four.suit==five.suit){
                return 'Flush'; 
    } else if (
        (jeden==1 && dwa==2 && trzy==3 && cztery==4 && piec==5) 
        || (jeden==2 && dwa==3 && trzy==4 && cztery==5 && piec==6) 
        || (jeden==3 && dwa==4 && trzy==5 && cztery==6 && piec==7)
        || (jeden==4 && dwa==5 && trzy==6 && cztery==7 && piec==8)
        || (jeden==5 && dwa==6 && trzy==7 && cztery==8 && piec==9)
        || (jeden==6 && dwa==7 && trzy==8 && cztery==9 && piec==10)
        || (jeden==7 && dwa==8 && trzy==9 && cztery==10 && piec==11)
        || (jeden==8 && dwa==9 && trzy==10 && cztery==11 && piec==12)
        || (jeden==9 && dwa==10 && trzy==11 && cztery==12 && piec==13)
        || (jeden==10 && dwa==11 && trzy==12 && cztery==13 && piec==1)
        ) {
                return 'Straight'; 
    } else if ((three.id==four.id && four.id==five.id) 
        || (two.id==four.id && four.id==five.id) 
        || (two.id==three.id && three.id==five.id) 
        || (two.id==three.id && three.id==four.id) 
        || (one.id==four.id && four.id==five.id) 
        || (one.id==three.id && three.id==five.id) 
        || (one.id==three.id && three.id==four.id) 
        || (one.id==two.id && two.id==five.id) 
        || (one.id==two.id && two.id==four.id) 
        || (one.id==two.id && two.id==three.id)) {
                return 'Three of a kind'; 
    } else if ((one.id==two.id && three.id==four.id)
        || (one.id==three.id && two.id==four.id)
        || (one.id==two.id && three.id==five.id)
        || (one.id==three.id && two.id==five.id)
        || (one.id==two.id && four.id==five.id)
        || (one.id==four.id && two.id==five.id)
        || (one.id==three.id && four.id==five.id)
        || (one.id==four.id && three.id==five.id)
        || (two.id==three.id && four.id==five.id)
        || (two.id==four.id && three.id==five.id)) {
                return 'Two pair'; 
    } else if (one.id==two.id || one.id==three.id || one.id==four.id || one.id==five.id 
        || two.id==three.id || two.id==four.id || two.id==five.id || three.id==four.id 
        || three.id==five.id || four.id==five.id) {
                return 'One pair'; 
    } else {
                return 'High card'; 
    };
    
})(hand);

console.log('YOUR HAND IS:');
console.log(handCheck);







