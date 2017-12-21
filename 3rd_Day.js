/*
 full task link: https://adventofcode.com/2017/day/3
 */

//day 3 part 1
/*
 --- Day 3: Spiral Memory ---
 Each square on the grid is allocated in a spiral pattern starting at a location marked 1 and then counting up while spiraling outward. For example, the first few squares are allocated like this:

 17  16  15  14  13
 18   5   4   3  12
 19   6   1   2  11
 20   7   8   9  10
 21  22  23---> ...
 While this is very space-efficient (no squares are skipped), requested data must be carried back to square 1 (the location of the only access port for this memory system) by programs that can only move up, down, left, or right. They always take the shortest path: the Manhattan Distance between the location of the data and square 1.

 For example:

 Data from square 1 is carried 0 steps, since it's at the access port.
 Data from square 12 is carried 3 steps, such as: down, left, left.
 Data from square 23 is carried only 2 steps: up twice.
 Data from square 1024 must be carried 31 steps.
 How many steps are required to carry the data from the square identified in your puzzle input all the way to the access port?
 */

function roadToTheDream(input){
    let circles = 1,
        memSize = 9,
        prev = 1,
        curr = 2,
        next = {value: 0,
            calc: function() { next.value = ( curr - prev + 8 ) + curr }
            /* все числа находятся в этой зависимости, например:
             числа перпендикулярные \ диагональные первому кругу(из нового круга)
             связаны с ближайшими числами из предыдущего круга зависимостью:
             возрастают на 8 больше чем предыдущие ( т.е. 1 2(+1) 11(+9) 28(+17) +25 +33 +41 ... ) */
        };

    //находим номер круга (+размер +значение ближайшего там числа)
    while( memSize < input ){
        circles++
        //размеры любого круга выглядят так: 1^2 (1) 3^2 (9) 5^2 (25) => (1+2n)^2
        memSize = Math.pow(1 + 2 * circles, 2)
        //значение ближайшего числа в текущем круге 'circles'
        next.calc()
        prev = curr
        curr = next.value
    }

    /* ближайших путей до любого круга 4 (прямые)
     узнаем к какому из них ближе введенное значение */
    for(var shortestWays = 4, shortestDistances = []; shortestWays > 0; shortestWays--){
        shortestDistances.push( Math.abs( input - curr ) )
        /* новый круг разрастается на 8 элементов больше предыдущего, 8 \ 4 = 2, по 2 с каждого угла
         значит на каждой стороне будет добавляться circle * 2 элементов, т.е. добавив к центру одной стороны
         это значение получится центр другой стороны */
        curr = curr + circles * 2
    }

    return circles + Math.min(...shortestDistances)
}

//day 3 part 2
/*
As a stress test on the system, the programs here clear the grid and then store the value 1 in square 1. Then, in the same allocation order as shown above, they store the sum of the values in all adjacent squares, including diagonals.

    So, the first few squares' values are chosen as follows:

Square 1 starts with the value 1.
Square 2 has only one adjacent filled square (with value 1), so it also stores 1.
Square 3 has both of the above squares as neighbors and stores the sum of their values, 2.
Square 4 has all three of the aforementioned squares as neighbors and stores the sum of their values, 4.
Square 5 only has the first and fourth squares as neighbors, so it gets the value 5.
Once a square is written, its value does not change. Therefore, the first few squares would receive the following values:

    147  142  133  122   59
304    5    4    2   57
330   10    1    1   54
351   11   23   25   26
362  747  806--->   ...
What is the first value written that is larger than your puzzle input?
*/

function roadToTheDream(input){
    let circles = 1,
        sideLength = 2,
        maxCircles = 10,
        maxLength = Math.pow( 1 + 2 * maxCircles, 2)
        center = Math.floor( 1 + 2 * maxCircles / 2),
        matrix = [],
        //matrix = [...Array(maxLength)].fill([...Array(maxLength)]); //20 кругов, можно добавить создание если больше n circles -> ссылаются на одну и туже ячейку памяти
        matrix[center][center] = 1;
        currEl = 1,
        currX = center,
        currY = center;
    //sideLength = 0

    //set matrix
    for(let i = 0; i < maxLength; i++){
        let arr = []
        for(let j = 0; j < maxLength; j++){
            arr.push(0)
        }
        matrix.push(arr)
    }

// можно просто делать +2 на каждой расширении (как понять когда он расширяется? от circles зависит)
    // function sideLength(){
    // 	let size = Math.pow( 1 + 2 * circles, 2 ),
    // 		prevSize = Math.pow ( 1 + 2 * (circles - 1), 2 );
    // 	return (size - prevSize) / 4
    // }

// добавлять элементы по sideLength
    function newCircle(){
        currX++; currY++;

        let whichSide = {
            4: () => { currY--;  matrix[currX][currY] = 1;  }, // right, todo: function calculating sum of all around + add currEl check
            3: () => { currX--;  matrix[currX][currY] = 1;  }, // top
            2: () => { currY++;  matrix[currX][currY] = 1;  }, // left
            1: () => { currX++;  matrix[currX][currY] = 1;  }  // bot
        }

        for(let sidesLeft = 4; sidesLeft > 0; sidesLeft--){
            newSide(sidesLeft)
        }

        function newSide(sidesLeft){
            for(sideL = sideLength; sideL > 0; sideL--){
                whichSide[sidesLeft]()
                currEl = matrix[currX][currY]
            }
        }

        circles++
        sideLength += 2
    }

    while( currE < input) newCircle()

}