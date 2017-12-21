/* full task 2nd day: https://adventofcode.com/2017/day/2
calculate the spreadsheet's checksum. For each row, determine the difference between the largest value and the smallest value; the checksum is the sum of all of these differences.

For example, given the following spreadsheet:

5 1 9 5
7 5 3
2 4 6 8
The first row's largest and smallest values are 9 and 1, and their difference is 8.
The second row's largest and smallest values are 7 and 3, and their difference is 4.
The third row's difference is 6.
In this example, the spreadsheet's checksum would be 8 + 4 + 6 = 18.
*/

//day 2 part 1
var input = `5	1	9	5
7	5	3
2	4	6	8`

var arrays = input.split('\n').map(e=>e.split('\t'))
arrays.reduce((acc,curr)=>acc+=maxMinDifference(curr),0)

function maxMinDifference(inputArray){
    return inputArray.reduce((acc, curr, index, currArr)=>{
            if( +curr < acc[0] || acc[0] === 0 ) acc[0] = +curr
            if( +curr > acc[1] ) acc[1] = +curr
            if( index === currArr.length - 1 ) { return acc[1] - acc[0] }
            return acc
    },[0,0])
}

//day 2 part 2
/* full task link: https://adventofcode.com/2017/day/2
the goal is to find the only two numbers in each row where one evenly divides the other - that is, where the result of the division operation is a whole number. They would like you to find those numbers on each line, divide them, and add up each line's result.

For example, given the following spreadsheet:

5 9 2 8
9 4 7 3
3 8 6 5
In the first row, the only two numbers that evenly divide are 8 and 2; the result of this division is 4.
In the second row, the two numbers are 9 and 3; the result is 3.
In the third row, the result is 2.
In this example, the sum of the results would be 4 + 3 + 2 = 9.

What is the sum of each row's result in your puzzle input?
*/

function evenlyDivisible(inputArray){
    return inputArray.reduce((acc, curr, index, array)=>{
        curr = +curr;
        return array.slice(index+1).reduce((acc2, curr2, index2, array2)=>{
            curr2 = +curr2;
            if( curr % curr2 === 0 ) return curr / curr2
            if( curr2 % curr === 0 ) return curr2 / curr
            return acc2
        },0) + acc
    },0)
}
