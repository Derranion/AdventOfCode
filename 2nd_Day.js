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
            console.log('Acc: '+acc+' Curr: '+curr)
            if( +curr < acc[0] || acc[0] === 0 ) acc[0] = +curr
            if( +curr > acc[1] ) acc[1] = +curr
            if( index === currArr.length - 1 ) { console.log('acc[1]: '+acc[1]+' acc[0]'+acc[0]); return acc[1] - acc[0] }
            return acc
    },[0,0])
}