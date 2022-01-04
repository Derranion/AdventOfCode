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
        // slicing current element, checking for its duplicate
        return str.split('')
                  .every((curStr,ind,arr) => arr.slice(ind+1).indexOf(curStr) === -1)
    }
}

/*
 full task link: https://adventofcode.com/2017/day/4
 --- Part Two ---
 For added security, yet another system policy has been put in place.
 Now, a valid passphrase must contain no two words that are anagrams of each other - that is,
 a passphrase is invalid if any word's letters can be rearranged to form any other word in the passphrase.

 For example:

 abcde fghij is a valid passphrase.
 abcde xyz ecdab is not valid - the letters from the third word can be rearranged to form the first word.
 a ab abc abd abf abj is a valid passphrase, because all letters need to be used when forming another word.
 iiii oiii ooii oooi oooo is valid.
 oiii ioii iioi iiio is not valid - any of these words can be rearranged to form any other word.
 Under this new system policy, how many passphrases are valid?
 */

var input2 = `a ab abc abd abf abj
iiii oiii ooii oooi oooo
oiii ioii iioi iiio`

function validateStrings2(inputStr){
    return inputStr.split('\n').reduce( (acc,curr) => checkMatches(curr) ? acc+1 : acc, 0)

    function checkMatches(str){
        let arrStr = str.split(' ').map( el => el.split('').sort() ) // arrays of sorted strings
        // slicing current element & checking for its duplicate
        return arrStr.every( (currStrArr, index) => arrStr.slice(0, index).concat(arrStr.slice(index+1))
                                    .some( strArr => ''+strArr === ''+currStrArr ) == false )
    }
}
