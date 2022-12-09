export const x = "";

const input = await Deno.readTextFile("input.txt");

function calculateVisibleTrees(input: string): number {
    const trees = input.split("\r\n").map((line) => line.split("").map((char) => Number(char)));
    let visible = 0;
    
    for (let i = 0; i < trees.length; i++) {
        for (let j = 0; j < trees[i].length; j++) {
            if (i == 0 || j == 0 || i == trees.length - 1 || j == trees[i].length - 1) {
                visible++;
            } else {
                const selfVal = trees[i][j];
                const isLargestLeft = trees[i].findIndex(val => val >= selfVal) == j;
                const isLargestRight = trees[i].findLastIndex(val => val >= selfVal) == j;
                const isLargestUp = trees.map(row => row[j]).findIndex(val => val >= selfVal) == i;
                const isLargestDown = trees.map(row => row[j]).findLastIndex(val => val >= selfVal) == i;
                if (isLargestLeft || isLargestRight || isLargestUp || isLargestDown) {
                    visible++;
                }
            }
        }
    }
    return visible;
}

function calculateViewingDistance(input: string): number {
    const trees = input.split("\r\n").map((line) => line.split("").map((char) => Number(char)));
    const distances = trees.map(row => row.map(_ => 0));
    for (let i = 0; i < trees.length; i++) {
        for (let j = 0; j < trees[i].length; j++) {
            const selfVal = trees[i][j];
            let distanceLeft = 0;
            for (let k = j - 1; k >= 0; k--) {
                distanceLeft++;
                if (trees[i][k] >= selfVal) {
                    break;
                }
            }
            let distanceRight = 0;
            for (let k = j + 1; k < trees[i].length; k++) {
                distanceRight++;
                if (trees[i][k] >= selfVal) {
                    break;
                }
            }
            let distanceUp = 0;
            for (let k = i - 1; k >= 0; k--) {
                distanceUp++;
                if (trees[k][j] >= selfVal) {
                    break;
                }
            }
            let distanceDown = 0;
            for (let k = i + 1; k < trees.length; k++) {
                distanceDown++;
                if (trees[k][j] >= selfVal) {
                    break;
                }
            }
            distances[i][j] = distanceLeft * distanceRight * distanceUp * distanceDown;
        }
    }
    return Math.max(...distances.flat());
}

console.log("A) ", calculateVisibleTrees(input));
console.log("B) ", calculateViewingDistance(input));