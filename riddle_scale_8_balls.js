//8) Scale riddle. With 8 balls  EXAM

function scaleRiddle (fakeBallNumber) {

    if (!Number.isInteger(fakeBallNumber) || fakeBallNumber < 1 || fakeBallNumber > 8) {
        console.log('Please type one integer number of ball from 1 to 8.');
    };
    
    let ball = {

        one: 1,
        two: 1,
        three: 1,
        four: 1,
        five: 1,
        six: 1,
        seven: 1,
        eight: 1
    };

    switch (fakeBallNumber) {
        case 1:
            ball.one = 0;
            break;
        case 2:
            ball.two = 0;
            break;
        case 3:
            ball.three = 0;
            break;
        case 4:
            ball.four = 0;
            break;
        case 5:
            ball.five = 0;
            break;
        case 6:
            ball.six = 0;
            break;
        case 7:
            ball.seven = 0;
            break;
        case 8:
            ball.eight = 0;
            break;
    
        default:
            break;
    };
    
    if (ball.one + ball.two + ball.three > ball.four + ball.five + ball.six){
        if (ball.four === ball.five) {
            console.log('ball.six is fake');
        } else if (ball.four > ball.five) {
            console.log('ball.five is fake');
        } else {
            console.log('ball.four is fake');
        };
    } else if (ball.one + ball.two + ball.three < ball.four + ball.five + ball.six){
        if (ball.one === ball.two) {
            console.log('ball.three is fake');
        } else if (ball.one > ball.two) {
            console.log('ball.two is fake');
        } else {
            console.log('ball.one is fake');
        };
    } else {
        if (ball.seven > ball.eight){
            console.log('ball.eight is fake');
        } else {
            console.log('ball.seven is fake');
        };
    };
    
};

scaleRiddle(5);
