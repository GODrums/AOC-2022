export const x = "";

const input = await Deno.readTextFile("input.txt");

function calculateScore(input: string): number {
    const data = input.split("\r\n").map((x) => {
        const [a, b] = x.split(" ");
        const you: number = a.charCodeAt(0) - 64;
        const me: number = b.charCodeAt(0) - 87;
        const score = (me - you == 1 || me - you == -2) ? 6 : ((me==you) ? 3 : 0);
        return score + me;
    });
    return data.reduce((a, b) => a + b);
}

function calculateMyStrategy(input: string): number {
    const data = input.split("\r\n").map((x) => {
        const [a, b] = x.split(" ");
        const you: number = a.charCodeAt(0) - 64;
        const result: number = b.charCodeAt(0) - 88;
        const score = ((you + 1 + result) % 3) + 1;
        return score + result*3;
    });
    return data.reduce((a, b) => a + b);
}

console.log("A) ", calculateScore(input));
console.log("B) ", calculateMyStrategy(input));