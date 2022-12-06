export const x = "";

const input = await Deno.readTextFile("input.txt");

function calculateRangeContainment(input: string): number {
    const data = input.split("\r\n").filter((x) => {
        const [ rangeOne, rangeTwo ] = x.split(",").map((y) => y.split("-").map((z) => parseInt(z)));
        if (rangeOne[0] > rangeTwo[0]) {
            return rangeOne[1] <= rangeTwo[1];
        } else if (rangeOne[0] == rangeTwo[0]) {
            return true;
        } else {
            return rangeOne[1] >= rangeTwo[1];
        }
    });
    return data.length;
}

function calculateOverlap(input: string): number {
    const data = input.split("\r\n").filter((x) => {
        const [ rangeOne, rangeTwo ] = x.split(",").map((y) => y.split("-").map((z) => parseInt(z)));
        if (rangeOne[0] > rangeTwo[0]) {
            return rangeOne[0] <= rangeTwo[1];
        } else if (rangeOne[0] == rangeTwo[0]) {
            return true;
        } else {
            return rangeOne[1] >= rangeTwo[0];
        }
    });
    return data.length;
}

console.log("A) ", calculateRangeContainment(input));
console.log("B) ", calculateOverlap(input));