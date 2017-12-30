/*
 full task link: https://adventofcode.com/2017/day/4

 Day 4 part 1
 To ensure security, a valid passphrase must contain no duplicate words.
 For example:

 aa bb cc dd ee is valid.
 aa bb cc dd aa is not valid - the word aa appears more than once.
 aa bb cc dd aaa is valid - aa and aaa count as different words.
 The system's full passphrase list is available as your puzzle input. How many passphrases are valid?
 */

var input = `aa bb cc dd ee
aa bb cc dd aa
isjur jppvano mnxxes zqwgnd giqh`

function validateStrings(inputStr){
    return inputStr.split('\n').reduce( (acc,curr) => checkMatches(curr) ? acc+1 : acc, 0)

    function checkMatches(str){
        let arrStr = str.split(' ')
        // slicing current element, checking for it's duplicate
        return arrStr.every( (el, index) => arrStr.slice(0, index).concat(arrStr.slice(index+1)).indexOf(el) == -1 )
    }
}