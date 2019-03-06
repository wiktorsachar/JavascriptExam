//Josephus problem


const josephusProblem = (n, k) => {
    let squad = [];
    let killingOrder = [];
    while (squad.length !== n) {
        squad.push(1);
    };

    const isAllDead = () => {
        let sum = 0;
        for (let i = 0; i < squad.length; i++) {
            sum = sum + squad[i];
        }
        if (sum === 0) {
            return true;
        } else {
            return false;
        }
    };

    let counter = 0;

    while (!isAllDead()) {
        for (let i = 0; i < squad.length; i++) {

            if (squad[i] === 1) {
                counter ++
            };

            if (counter === k && squad[i] === 1) {
                squad[i] = 0;
                killingOrder.push(i+1);
                counter = 0;
            };
        }
    };

    console.log('The order of killing is: ' + killingOrder);
    console.log(`Titus Flavius Josephus and his friend should have positions ${killingOrder[killingOrder.length-1]} and ${killingOrder[killingOrder.length-2]} to not get killed.`);

};

josephusProblem(41,3);

