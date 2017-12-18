/* task: https://adventofcode.com/2017/day/1

 find the sum of all digits that match the next digit in the list. The list is circular, so the digit after the last digit is the first digit in the list.

 For example:

 1122 produces a sum of 3 (1 + 2) because the first digit (1) matches the second digit and the third digit (2) matches the fourth digit.
 1111 produces 4 because each digit (all 1) matches the next.
 1234 produces 0 because no digit matches the next.
 91212129 produces 9 because the only digit that matches the next one is the last digit, 9.

*/

function sumOfMatches(input){
    return input.split('').reduce((acc, curr, index, array)=>{
        if( curr === array[index+1] ) return acc += Number(curr)
        if( index === array.length-1 ) return curr === array[0] ? acc += Number(curr) : acc
        return acc
    }, 0)
}