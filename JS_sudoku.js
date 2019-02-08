//(EXAM) Solve sudoku
/*zasada algorytmu:
1 policzyc ilosc danych cyfr i zaczac od tej, ktora powtarza sie najczesciej
2 wyeliminowac wszystkie pola, na ktorych nie moze ta cyfra wystepowac:
na podstawie kolumn, wierszy i kratek
3. znalezc kratke, gdzie dana cyfra moze wystapic tylko w jednym miejscu i uzupelnic to pole
4. gdy dana cyfra wyczerpie miejsca, gdzie mozna ja wstawic ze 100 procentowa pewnoscia, przejsc
do kolejnej najliczniejszej cyfry i powtarzac operacje w ten sposob az skoncza sie cyfry
5. w przypadku skonczenia cyfr i nie wypelnienia wszystkich pol, ponownie policzyc cyfry
i zaczac powyzszy algorytm od nowa z nowymi danymi
*/

//edit: teraz już wiem, że działa tylko na tych konkretnych liczbach i że algorytm jest błędny w samym założeniu, ale szkoda nie wrzucić
// skoro się napracowałem

const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./JS_sudoku.json'));
let mutableData = data;
let stop = false;



//------------------------------------------------------------------------------------------------

const clearWrongFields = (dat, num) => {

    let object = JSON.parse(JSON.stringify(dat));
    let iterationValueCounter = 0;


    let column1 = ["object[0][1]", "object[0][4]", "object[0][7]", "object[3][1]", "object[3][4]", "object[3][7]", "object[6][1]", "object[6][4]", "object[6][7]"];
    let column2 = ["object[0][2]", "object[0][5]", "object[0][8]", "object[3][2]", "object[3][5]", "object[3][8]", "object[6][2]", "object[6][5]", "object[6][8]"];
    let column3 = ["object[0][3]", "object[0][6]", "object[0][9]", "object[3][3]", "object[3][6]", "object[3][9]", "object[6][3]", "object[6][6]", "object[6][9]"];
    let column4 = ["object[1][1]", "object[1][4]", "object[1][7]", "object[4][1]", "object[4][4]", "object[4][7]", "object[7][1]", "object[7][4]", "object[7][7]"];
    let column5 = ["object[1][2]", "object[1][5]", "object[1][8]", "object[4][2]", "object[4][5]", "object[4][8]", "object[7][2]", "object[7][5]", "object[7][8]"];
    let column6 = ["object[1][3]", "object[1][6]", "object[1][9]", "object[4][3]", "object[4][6]", "object[4][9]", "object[7][3]", "object[7][6]", "object[7][9]"];
    let column7 = ["object[2][1]", "object[2][4]", "object[2][7]", "object[5][1]", "object[5][4]", "object[5][7]", "object[8][1]", "object[8][4]", "object[8][7]"];
    let column8 = ["object[2][2]", "object[2][5]", "object[2][8]", "object[5][2]", "object[5][5]", "object[5][8]", "object[8][2]", "object[8][5]", "object[8][8]"];
    let column9 = ["object[2][3]", "object[2][6]", "object[2][9]", "object[5][3]", "object[5][6]", "object[5][9]", "object[8][3]", "object[8][6]", "object[8][9]"];

    let row1 = ["object[0][1]", "object[0][2]", "object[0][3]", "object[1][1]", "object[1][2]", "object[1][3]", "object[2][1]", "object[2][2]", "object[2][3]"];
    let row2 = ["object[0][4]", "object[0][5]", "object[0][6]", "object[1][4]", "object[1][5]", "object[1][6]", "object[2][4]", "object[2][5]", "object[2][6]"];
    let row3 = ["object[0][7]", "object[0][8]", "object[0][9]", "object[1][7]", "object[1][8]", "object[1][9]", "object[2][7]", "object[2][8]", "object[2][9]"];
    let row4 = ["object[3][1]", "object[3][2]", "object[3][3]", "object[4][1]", "object[4][2]", "object[4][3]", "object[5][1]", "object[5][2]", "object[5][3]"];
    let row5 = ["object[3][4]", "object[3][5]", "object[3][6]", "object[4][4]", "object[4][5]", "object[4][6]", "object[5][4]", "object[5][5]", "object[5][6]"];
    let row6 = ["object[3][7]", "object[3][8]", "object[3][9]", "object[4][7]", "object[4][8]", "object[4][9]", "object[5][7]", "object[5][8]", "object[5][9]"];
    let row7 = ["object[6][1]", "object[6][2]", "object[6][3]", "object[7][1]", "object[7][2]", "object[7][3]", "object[8][1]", "object[8][2]", "object[8][3]"];
    let row8 = ["object[6][4]", "object[6][5]", "object[6][6]", "object[7][4]", "object[7][5]", "object[7][6]", "object[8][4]", "object[8][5]", "object[8][6]"];
    let row9 = ["object[6][7]", "object[6][8]", "object[6][9]", "object[7][7]", "object[7][8]", "object[7][9]", "object[8][7]", "object[8][8]", "object[8][9]"];


    if (object[0][1] == num) {
        for (let i = 0; i < column1.length; i++) {
            eval(column1[`${i}`] + '= 0');
        }
        for (let i = 0; i < row1.length; i++) {
             eval(row1[`${i}`] + '= 0');
        }
        for (let x in object[0]) {
            object[0][x] = 0;
        }
    } //1
    if (object[0][2] == num) {
        for (let i = 0; i < column2.length; i++) {
            eval(column2[`${i}`] + '= 0');
        }
        for (let i = 0; i < row1.length; i++) {
             eval(row1[`${i}`] + '= 0');
        }
        for (let x in object[0]) {
            object[0][x] = 0;
        }
    } //2
    if (object[0][3] == num) {
        for (let i = 0; i < column3.length; i++) {
            eval(column3[`${i}`] + '= 0');
        }
        for (let i = 0; i < row1.length; i++) {
             eval(row1[`${i}`] + '= 0');
        }
        for (let x in object[0]) {
            object[0][x] = 0;
        }
    } //3
    if (object[0][4] == num) {
        for (let i = 0; i < column1.length; i++) {
            eval(column1[`${i}`] + '= 0');
        }
        for (let i = 0; i < row2.length; i++) {
             eval(row2[`${i}`] + '= 0');
        }
        for (let x in object[0]) {
            object[0][x] = 0;
        }
    } //4
    if (object[0][5] == num) {
        for (let i = 0; i < column2.length; i++) {
            eval(column2[`${i}`] + '= 0');
        }
        for (let i = 0; i < row2.length; i++) {
             eval(row2[`${i}`] + '= 0');
        }
        for (let x in object[0]) {
            object[0][x] = 0;
        }
    } //5
    if (object[0][6] == num) {
        for (let i = 0; i < column3.length; i++) {
            eval(column3[`${i}`] + '= 0');
        }
        for (let i = 0; i < row2.length; i++) {
             eval(row2[`${i}`] + '= 0');
        }
        for (let x in object[0]) {
            object[0][x] = 0;
        }
    } //6
    if (object[0][7] == num) {
        for (let i = 0; i < column1.length; i++) {
            eval(column1[`${i}`] + '= 0');
        }
        for (let i = 0; i < row3.length; i++) {
             eval(row3[`${i}`] + '= 0');
        }
        for (let x in object[0]) {
            object[0][x] = 0;
        }
    } //7
    if (object[0][8] == num) {
        for (let i = 0; i < column2.length; i++) {
            eval(column2[`${i}`] + '= 0');
        }
        for (let i = 0; i < row3.length; i++) {
             eval(row3[`${i}`] + '= 0');
        }
        for (let x in object[0]) {
            object[0][x] = 0;
        }
    } //8
    if (object[0][9] == num) {
        for (let i = 0; i < column3.length; i++) {
            eval(column3[`${i}`] + '= 0');
        }
        for (let i = 0; i < row3.length; i++) {
             eval(row3[`${i}`] + '= 0');
        }
        for (let x in object[0]) {
            object[0][x] = 0;
        }
    } //9
    if (object[1][1] == num) {
        for (let i = 0; i < column4.length; i++) {
            eval(column4[`${i}`] + '= 0');
        }
        for (let i = 0; i < row1.length; i++) {
             eval(row1[`${i}`] + '= 0');
        }
        for (let x in object[1]) {
            object[1][x] = 0;
        }
    } //10
    if (object[1][2] == num) {
        for (let i = 0; i < column5.length; i++) {
            eval(column5[`${i}`] + '= 0');
        }
        for (let i = 0; i < row1.length; i++) {
            eval(row1[`${i}`] + '= 0');
        }
        for (let x in object[1]) {
            object[1][x] = 0;
        }
    } //11
    if (object[1][3] == num) {
        for (let i = 0; i < column6.length; i++) {
            eval(column6[`${i}`] + '= 0');
        }
        for (let i = 0; i < row1.length; i++) {
            eval(row1[`${i}`] + '= 0');
        }
        for (let x in object[1]) {
            object[1][x] = 0;
        }
    } //12
    if (object[1][4] == num) {
        for (let i = 0; i < column4.length; i++) {
            eval(column4[`${i}`] + '= 0');
        }
        for (let i = 0; i < row2.length; i++) {
            eval(row2[`${i}`] + '= 0');
        }
        for (let x in object[1]) {
            object[1][x] = 0;
        }
    } //13
    if (object[1][5] == num) {
        for (let i = 0; i < column5.length; i++) {
            eval(column5[`${i}`] + '= 0');
        }
        for (let i = 0; i < row2.length; i++) {
            eval(row2[`${i}`] + '= 0');
        }
        for (let x in object[1]) {
            object[1][x] = 0;
        }
    } //14
    if (object[1][6] == num) {
        for (let i = 0; i < column6.length; i++) {
            eval(column6[`${i}`] + '= 0');
        }
        for (let i = 0; i < row2.length; i++) {
            eval(row2[`${i}`] + '= 0');
        }
        for (let x in object[1]) {
            object[1][x] = 0;
        }
    } //15
    if (object[1][7] == num) {
        for (let i = 0; i < column4.length; i++) {
            eval(column4[`${i}`] + '= 0');
        }
        for (let i = 0; i < row3.length; i++) {
            eval(row3[`${i}`] + '= 0');
        }
        for (let x in object[1]) {
            object[1][x] = 0;
        }
    } //16
    if (object[1][8] == num) {
        for (let i = 0; i < column5.length; i++) {
            eval(column5[`${i}`] + '= 0');
        }
        for (let i = 0; i < row3.length; i++) {
            eval(row3[`${i}`] + '= 0');
        }
        for (let x in object[1]) {
            object[1][x] = 0;
        }
    } //17
    if (object[1][9] == num) {
        for (let i = 0; i < column6.length; i++) {
            eval(column6[`${i}`] + '= 0');
        }
        for (let i = 0; i < row3.length; i++) {
            eval(row3[`${i}`] + '= 0');
        }
        for (let x in object[1]) {
            object[1][x] = 0;
        }
    } //18
    if (object[2][1] == num) {
        for (let i = 0; i < column7.length; i++) {
            eval(column7[`${i}`] + '= 0');
        }
        for (let i = 0; i < row1.length; i++) {
            eval(row1[`${i}`] + '= 0');
        }
        for (let x in object[2]) {
            object[2][x] = 0;
        }
    } //19
    if (object[2][2] == num) {
        for (let i = 0; i < column8.length; i++) {
            eval(column8[`${i}`] + '= 0');
        }
        for (let i = 0; i < row1.length; i++) {
            eval(row1[`${i}`] + '= 0');
        }
        for (let x in object[2]) {
            object[2][x] = 0;
        }
    } //20
    if (object[2][3] == num) {
        for (let i = 0; i < column9.length; i++) {
            eval(column9[`${i}`] + '= 0');
        }
        for (let i = 0; i < row1.length; i++) {
            eval(row1[`${i}`] + '= 0');
        }
        for (let x in object[2]) {
            object[2][x] = 0;
        }
    } //21
    if (object[2][4] == num) {
        for (let i = 0; i < column7.length; i++) {
            eval(column7[`${i}`] + '= 0');
        }
        for (let i = 0; i < row2.length; i++) {
            eval(row2[`${i}`] + '= 0');
        }
        for (let x in object[2]) {
            object[2][x] = 0;
        }
    } //22
    if (object[2][5] == num) {
        for (let i = 0; i < column8.length; i++) {
            eval(column8[`${i}`] + '= 0');
        }
        for (let i = 0; i < row2.length; i++) {
            eval(row2[`${i}`] + '= 0');
        }
        for (let x in object[2]) {
            object[2][x] = 0;
        }
    } //23
    if (object[2][6] == num) {
        for (let i = 0; i < column9.length; i++) {
            eval(column9[`${i}`] + '= 0');
        }
        for (let i = 0; i < row2.length; i++) {
            eval(row2[`${i}`] + '= 0');
        }
        for (let x in object[2]) {
            object[2][x] = 0;
        }
    } //24
    if (object[2][7] == num) {
        for (let i = 0; i < column7.length; i++) {
            eval(column7[`${i}`] + '= 0');
        }
        for (let i = 0; i < row3.length; i++) {
            eval(row3[`${i}`] + '= 0');
        }
        for (let x in object[2]) {
            object[2][x] = 0;
        }
    } //25
    if (object[2][8] == num) {
        for (let i = 0; i < column8.length; i++) {
            eval(column8[`${i}`] + '= 0');
        }
        for (let i = 0; i < row3.length; i++) {
            eval(row3[`${i}`] + '= 0');
        }
        for (let x in object[2]) {
            object[2][x] = 0;
        }
    } //26
    if (object[2][9] == num) {
        for (let i = 0; i < column9.length; i++) {
            eval(column9[`${i}`] + '= 0');
        }
        for (let i = 0; i < row3.length; i++) {
            eval(row3[`${i}`] + '= 0');
        }
        for (let x in object[2]) {
            object[2][x] = 0;
        }
    } //27
    if (object[3][1] == num) {
        for (let i = 0; i < column1.length; i++) {
            eval(column1[`${i}`] + '= 0');
        }
        for (let i = 0; i < row4.length; i++) {
            eval(row4[`${i}`] + '= 0');
        }
        for (let x in object[3]) {
            object[3][x] = 0;
        }
    } //28
    if (object[3][2] == num) {
        for (let i = 0; i < column2.length; i++) {
            eval(column2[`${i}`] + '= 0');
        }
        for (let i = 0; i < row4.length; i++) {
            eval(row4[`${i}`] + '= 0');
        }
        for (let x in object[3]) {
            object[3][x] = 0;
        }
    } //29
    if (object[3][3] == num) {
        for (let i = 0; i < column3.length; i++) {
            eval(column3[`${i}`] + '= 0');
        }
        for (let i = 0; i < row4.length; i++) {
            eval(row4[`${i}`] + '= 0');
        }
        for (let x in object[3]) {
            object[3][x] = 0;
        }
    } //30
    if (object[3][4] == num) {
        for (let i = 0; i < column1.length; i++) {
            eval(column1[`${i}`] + '= 0');
        }
        for (let i = 0; i < row5.length; i++) {
            eval(row5[`${i}`] + '= 0');
        }
        for (let x in object[3]) {
            object[3][x] = 0;
        }
    } //31
    if (object[3][5] == num) {
        for (let i = 0; i < column2.length; i++) {
            eval(column2[`${i}`] + '= 0');
        }
        for (let i = 0; i < row5.length; i++) {
            eval(row5[`${i}`] + '= 0');
        }
        for (let x in object[3]) {
            object[3][x] = 0;
        }
    } //32
    if (object[3][6] == num) {
        for (let i = 0; i < column3.length; i++) {
            eval(column3[`${i}`] + '= 0');
        }
        for (let i = 0; i < row5.length; i++) {
            eval(row5[`${i}`] + '= 0');
        }
        for (let x in object[3]) {
            object[3][x] = 0;
        }
    } //33
    if (object[3][7] == num) {
        for (let i = 0; i < column1.length; i++) {
            eval(column1[`${i}`] + '= 0');
        }
        for (let i = 0; i < row6.length; i++) {
            eval(row6[`${i}`] + '= 0');
        }
        for (let x in object[3]) {
            object[3][x] = 0;
        }
    } //34
    if (object[3][8] == num) {
        for (let i = 0; i < column2.length; i++) {
            eval(column2[`${i}`] + '= 0');
        }
        for (let i = 0; i < row6.length; i++) {
            eval(row6[`${i}`] + '= 0');
        }
        for (let x in object[3]) {
            object[3][x] = 0;
        }
    } //35
    if (object[3][9] == num) {
        for (let i = 0; i < column3.length; i++) {
            eval(column3[`${i}`] + '= 0');
        }
        for (let i = 0; i < row6.length; i++) {
            eval(row6[`${i}`] + '= 0');
        }
        for (let x in object[3]) {
            object[3][x] = 0;
        }
    } //36
    if (object[4][1] == num) {
        for (let i = 0; i < column4.length; i++) {
            eval(column4[`${i}`] + '= 0');
        }
        for (let i = 0; i < row4.length; i++) {
            eval(row4[`${i}`] + '= 0');
        }
        for (let x in object[4]) {
            object[4][x] = 0;
        }
    } //37
    if (object[4][2] == num) {
        for (let i = 0; i < column5.length; i++) {
            eval(column5[`${i}`] + '= 0');
        }
        for (let i = 0; i < row4.length; i++) {
            eval(row4[`${i}`] + '= 0');
        }
        for (let x in object[4]) {
            object[4][x] = 0;
        }
    } //38
    if (object[4][3] == num) {
        for (let i = 0; i < column6.length; i++) {
            eval(column6[`${i}`] + '= 0');
        }
        for (let i = 0; i < row4.length; i++) {
            eval(row4[`${i}`] + '= 0');
        }
        for (let x in object[4]) {
            object[4][x] = 0;
        }
    } //39
    if (object[4][4] == num) {
        for (let i = 0; i < column4.length; i++) {
            eval(column4[`${i}`] + '= 0');
        }
        for (let i = 0; i < row5.length; i++) {
            eval(row5[`${i}`] + '= 0');
        }
        for (let x in object[4]) {
            object[4][x] = 0;
        }
    } //40
    if (object[4][5] == num) {
        for (let i = 0; i < column5.length; i++) {
            eval(column5[`${i}`] + '= 0');
        }
        for (let i = 0; i < row5.length; i++) {
            eval(row5[`${i}`] + '= 0');
        }
        for (let x in object[4]) {
            object[4][x] = 0;
        }
    } //41
    if (object[4][6] == num) {
        for (let i = 0; i < column6.length; i++) {
            eval(column6[`${i}`] + '= 0');
        }
        for (let i = 0; i < row5.length; i++) {
            eval(row5[`${i}`] + '= 0');
        }
        for (let x in object[4]) {
            object[4][x] = 0;
        }
    } //42
    if (object[4][7] == num) {
        for (let i = 0; i < column4.length; i++) {
            eval(column4[`${i}`] + '= 0');
        }
        for (let i = 0; i < row6.length; i++) {
            eval(row6[`${i}`] + '= 0');
        }
        for (let x in object[4]) {
            object[4][x] = 0;
        }
    } //43
    if (object[4][8] == num) {
        for (let i = 0; i < column5.length; i++) {
            eval(column5[`${i}`] + '= 0');
        }
        for (let i = 0; i < row6.length; i++) {
            eval(row6[`${i}`] + '= 0');
        }
        for (let x in object[4]) {
            object[4][x] = 0;
        }
    } //44
    if (object[4][9] == num) {
        for (let i = 0; i < column6.length; i++) {
            eval(column6[`${i}`] + '= 0');
        }
        for (let i = 0; i < row6.length; i++) {
            eval(row6[`${i}`] + '= 0');
        }
        for (let x in object[4]) {
            object[4][x] = 0;
        }
    } //45
    if (object[5][1] == num) {
        for (let i = 0; i < column7.length; i++) {
            eval(column7[`${i}`] + '= 0');
        }
        for (let i = 0; i < row4.length; i++) {
            eval(row4[`${i}`] + '= 0');
        }
        for (let x in object[5]) {
            object[5][x] = 0;
        }
    } //46
    if (object[5][2] == num) {
        for (let i = 0; i < column8.length; i++) {
            eval(column8[`${i}`] + '= 0');
        }
        for (let i = 0; i < row4.length; i++) {
            eval(row4[`${i}`] + '= 0');
        }
        for (let x in object[5]) {
            object[5][x] = 0;
        }
    } //47
    if (object[5][3] == num) {
        for (let i = 0; i < column9.length; i++) {
            eval(column9[`${i}`] + '= 0');
        }
        for (let i = 0; i < row4.length; i++) {
            eval(row4[`${i}`] + '= 0');
        }
        for (let x in object[5]) {
            object[5][x] = 0;
        }
    } //48
    if (object[5][4] == num) {
        for (let i = 0; i < column7.length; i++) {
            eval(column7[`${i}`] + '= 0');
        }
        for (let i = 0; i < row5.length; i++) {
            eval(row5[`${i}`] + '= 0');
        }
        for (let x in object[5]) {
            object[5][x] = 0;
        }
    } //49
    if (object[5][5] == num) {
        for (let i = 0; i < column8.length; i++) {
            eval(column8[`${i}`] + '= 0');
        }
        for (let i = 0; i < row5.length; i++) {
            eval(row5[`${i}`] + '= 0');
        }
        for (let x in object[5]) {
            object[5][x] = 0;
        }
    } //50
    if (object[5][6] == num) {
        for (let i = 0; i < column9.length; i++) {
            eval(column9[`${i}`] + '= 0');
        }
        for (let i = 0; i < row5.length; i++) {
            eval(row5[`${i}`] + '= 0');
        }
        for (let x in object[5]) {
            object[5][x] = 0;
        }
    } //51
    if (object[5][7] == num) {
        for (let i = 0; i < column7.length; i++) {
            eval(column7[`${i}`] + '= 0');
        }
        for (let i = 0; i < row5.length; i++) {
            eval(row5[`${i}`] + '= 0');
        }
        for (let x in object[5]) {
            object[5][x] = 0;
        }
    } //52
    if (object[5][8] == num) {
        for (let i = 0; i < column8.length; i++) {
            eval(column8[`${i}`] + '= 0');
        }
        for (let i = 0; i < row6.length; i++) {
            eval(row6[`${i}`] + '= 0');
        }
        for (let x in object[5]) {
            object[5][x] = 0;
        }
    } //53
    if (object[5][9] == num) {
        for (let i = 0; i < column9.length; i++) {
            eval(column9[`${i}`] + '= 0');
        }
        for (let i = 0; i < row6.length; i++) {
            eval(row6[`${i}`] + '= 0');
        }
        for (let x in object[5]) {
            object[5][x] = 0;
        }
    } //54
    if (object[6][1] == num) {
        for (let i = 0; i < column1.length; i++) {
            eval(column1[`${i}`] + '= 0');
        }
        for (let i = 0; i < row7.length; i++) {
            eval(row7[`${i}`] + '= 0');
        }
        for (let x in object[6]) {
            object[6][x] = 0;
        }
    } //55
    if (object[6][2] == num) {
        for (let i = 0; i < column2.length; i++) {
            eval(column2[`${i}`] + '= 0');
        }
        for (let i = 0; i < row7.length; i++) {
            eval(row7[`${i}`] + '= 0');
        }
        for (let x in object[6]) {
            object[6][x] = 0;
        }
    } //56
    if (object[6][3] == num) {
        for (let i = 0; i < column3.length; i++) {
            eval(column3[`${i}`] + '= 0');
        }
        for (let i = 0; i < row7.length; i++) {
            eval(row7[`${i}`] + '= 0');
        }
        for (let x in object[6]) {
            object[6][x] = 0;
        }
    } //57
    if (object[6][4] == num) {
        for (let i = 0; i < column1.length; i++) {
            eval(column1[`${i}`] + '= 0');
        }
        for (let i = 0; i < row8.length; i++) {
            eval(row8[`${i}`] + '= 0');
        }
        for (let x in object[6]) {
            object[6][x] = 0;
        }
    } //58
    if (object[6][5] == num) {
        for (let i = 0; i < column2.length; i++) {
            eval(column2[`${i}`] + '= 0');
        }
        for (let i = 0; i < row8.length; i++) {
            eval(row8[`${i}`] + '= 0');
        }
        for (let x in object[6]) {
            object[6][x] = 0;
        }
    } //59
    if (object[6][6] == num) {
        for (let i = 0; i < column3.length; i++) {
            eval(column3[`${i}`] + '= 0');
        }
        for (let i = 0; i < row8.length; i++) {
            eval(row8[`${i}`] + '= 0');
        }
        for (let x in object[6]) {
            object[6][x] = 0;
        }
    } //60
    if (object[6][7] == num) {
        for (let i = 0; i < column1.length; i++) {
            eval(column1[`${i}`] + '= 0');
        }
        for (let i = 0; i < row9.length; i++) {
            eval(row9[`${i}`] + '= 0');
        }
        for (let x in object[6]) {
            object[6][x] = 0;
        }
    } //61
    if (object[6][8] == num) {
        for (let i = 0; i < column2.length; i++) {
            eval(column2[`${i}`] + '= 0');
        }
        for (let i = 0; i < row9.length; i++) {
            eval(row9[`${i}`] + '= 0');
        }
        for (let x in object[6]) {
            object[6][x] = 0;
        }
    } //62
    if (object[6][9] == num) {
        for (let i = 0; i < column3.length; i++) {
            eval(column3[`${i}`] + '= 0');
        }
        for (let i = 0; i < row9.length; i++) {
            eval(row9[`${i}`] + '= 0');
        }
        for (let x in object[6]) {
            object[6][x] = 0;
        }
    } //63
    if (object[7][1] == num) {
        for (let i = 0; i < column4.length; i++) {
            eval(column4[`${i}`] + '= 0');
        }
        for (let i = 0; i < row7.length; i++) {
            eval(row7[`${i}`] + '= 0');
        }
        for (let x in object[7]) {
            object[7][x] = 0;
        }
    } //64
    if (object[7][2] == num) {
        for (let i = 0; i < column5.length; i++) {
            eval(column5[`${i}`] + '= 0');
        }
        for (let i = 0; i < row7.length; i++) {
            eval(row7[`${i}`] + '= 0');
        }
        for (let x in object[7]) {
            object[7][x] = 0;
        }
    } //65
    if (object[7][3] == num) {
        for (let i = 0; i < column6.length; i++) {
            eval(column6[`${i}`] + '= 0');
        }
        for (let i = 0; i < row7.length; i++) {
            eval(row7[`${i}`] + '= 0');
        }
        for (let x in object[7]) {
            object[7][x] = 0;
        }
    } //66
    if (object[7][4] == num) {
        for (let i = 0; i < column4.length; i++) {
            eval(column4[`${i}`] + '= 0');
        }
        for (let i = 0; i < row8.length; i++) {
            eval(row8[`${i}`] + '= 0');
        }
        for (let x in object[7]) {
            object[7][x] = 0;
        }
    } //67
    if (object[7][5] == num) {
        for (let i = 0; i < column5.length; i++) {
            eval(column5[`${i}`] + '= 0');
        }
        for (let i = 0; i < row8.length; i++) {
            eval(row8[`${i}`] + '= 0');
        }
        for (let x in object[7]) {
            object[7][x] = 0;
        }
    } //68
    if (object[7][6] == num) {
        for (let i = 0; i < column6.length; i++) {
            eval(column6[`${i}`] + '= 0');
        }
        for (let i = 0; i < row8.length; i++) {
            eval(row8[`${i}`] + '= 0');
        }
        for (let x in object[7]) {
            object[7][x] = 0;
        }
    } //69
    if (object[7][7] == num) {
        for (let i = 0; i < column4.length; i++) {
            eval(column4[`${i}`] + '= 0');
        }
        for (let i = 0; i < row9.length; i++) {
            eval(row9[`${i}`] + '= 0');
        }
        for (let x in object[7]) {
            object[7][x] = 0;
        }
    } //70
    if (object[7][8] == num) {
        for (let i = 0; i < column5.length; i++) {
            eval(column5[`${i}`] + '= 0');
        }
        for (let i = 0; i < row9.length; i++) {
            eval(row9[`${i}`] + '= 0');
        }
        for (let x in object[7]) {
            object[7][x] = 0;
        }
    } //71
    if (object[7][9] == num) {
        for (let i = 0; i < column6.length; i++) {
            eval(column6[`${i}`] + '= 0');
        }
        for (let i = 0; i < row9.length; i++) {
            eval(row9[`${i}`] + '= 0');
        }
        for (let x in object[7]) {
            object[7][x] = 0;
        }
    } //72
    if (object[8][1] == num) {
        for (let i = 0; i < column7.length; i++) {
            eval(column7[`${i}`] + '= 0');
        }
        for (let i = 0; i < row7.length; i++) {
            eval(row7[`${i}`] + '= 0');
        }
        for (let x in object[8]) {
            object[8][x] = 0;
        }
    } //73
    if (object[8][2] == num) {
        for (let i = 0; i < column8.length; i++) {
            eval(column8[`${i}`] + '= 0');
        }
        for (let i = 0; i < row7.length; i++) {
            eval(row7[`${i}`] + '= 0');
        }
        for (let x in object[8]) {
            object[8][x] = 0;
        }
    } //74
    if (object[8][3] == num) {
        for (let i = 0; i < column9.length; i++) {
            eval(column9[`${i}`] + '= 0');
        }
        for (let i = 0; i < row7.length; i++) {
            eval(row7[`${i}`] + '= 0');
        }
        for (let x in object[8]) {
            object[8][x] = 0;
        }
    } //75
    if (object[8][4] == num) {
        for (let i = 0; i < column7.length; i++) {
            eval(column7[`${i}`] + '= 0');
        }
        for (let i = 0; i < row8.length; i++) {
            eval(row8[`${i}`] + '= 0');
        }
        for (let x in object[8]) {
            object[8][x] = 0;
        }
    } //76
    if (object[8][5] == num) {
        for (let i = 0; i < column8.length; i++) {
            eval(column8[`${i}`] + '= 0');
        }
        for (let i = 0; i < row8.length; i++) {
            eval(row8[`${i}`] + '= 0');
        }
        for (let x in object[8]) {
            object[8][x] = 0;
        }
    } //77
    if (object[8][6] == num) {
        for (let i = 0; i < column9.length; i++) {
            eval(column9[`${i}`] + '= 0');
        }
        for (let i = 0; i < row8.length; i++) {
            eval(row8[`${i}`] + '= 0');
        }
        for (let x in object[8]) {
            object[8][x] = 0;
        }
    } //78
    if (object[8][7] == num) {
        for (let i = 0; i < column7.length; i++) {
            eval(column7[`${i}`] + '= 0');
        }
        for (let i = 0; i < row9.length; i++) {
            eval(row9[`${i}`] + '= 0');
        }
        for (let x in object[8]) {
            object[8][x] = 0;
        }
    } //79
    if (object[8][8] == num) {
        for (let i = 0; i < column8.length; i++) {
            eval(column8[`${i}`] + '= 0');
        }
        for (let i = 0; i < row9.length; i++) {
            eval(row9[`${i}`] + '= 0');
        }
        for (let x in object[8]) {
            object[8][x] = 0;
        }
    } //80
    if (object[8][9] == num) {
        for (let i = 0; i < column9.length; i++) {
            eval(column9[`${i}`] + '= 0');
        }
        for (let i = 0; i < row9.length; i++) {
            eval(row9[`${i}`] + '= 0');
        }
        for (let x in object[8]) {
            object[8][x] = 0;
        }
    } //81

    
    for (let i = 0; i < object.length; i++) {
        let emptyCounter = 0;
        for (let x in object[i]) {
            if (object[i][x] == 'empty') {
                emptyCounter++;
            }
        }
        if (emptyCounter == 1) {
            for (let x in object[i]) {
                if (object[i][x] == 'empty') {
                    mutableData[i][x] = num;
                }
            }
        }
    };
    
    for (let i = 0; i < mutableData.length; i++) {
        for (let x in mutableData[i]) {
            if (mutableData[i][x] !== 'empty') {
                iterationValueCounter = iterationValueCounter + Number(mutableData[i][x]);
            }
        }
    };
    console.log(Math.floor(((iterationValueCounter/405)*100))+ '% solved');
    
    if (iterationValueCounter == 405) {
        stop = true;
    } else {
        iterationValueCounter = 0;
    };



}



//--------------------------------------------------------------------------------------------


const iterationRepeater = () => {
    while (stop == false) {
        for (let i = 1; i < 10; i++) {
            clearWrongFields(mutableData, i);
        
        }
    }
};

iterationRepeater();
console.log(mutableData);



