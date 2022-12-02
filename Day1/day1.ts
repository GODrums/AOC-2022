export const x = "";

const input = await Deno.readTextFile("input.txt");

function findMax(input: string): number {
    const data = input.split("\r\n\r\n").map((x) => x.split("\r\n").reduce((a, b) => Number(a) + Number(b), 0));
    return data.reduce((a, b) => a > b ? a : b, 0);
    //return data.sort().slice(1)[0];
}

function findTop3(input: string): number {
    const data = input.split("\r\n\r\n").map((x) => x.split("\r\n").reduce((a, b) => Number(a) + Number(b), 0));
    return data.sort((a, b) => b - a).slice(0, 3).reduce((a, b) => a + b, 0);
}

console.log("A) ", findMax(input));
console.log("B) ", findTop3(input));