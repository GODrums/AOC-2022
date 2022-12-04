export const x = "";

const input = await Deno.readTextFile("input.txt");

function calculateItemPrio(input: string): number {
    const data = input.split("\r\n").map((x) => {
        const middle = Math.floor(x.length / 2);
        const secondComp = x.split("");
        const firstComp = secondComp.splice(0, middle);
        const ascii = firstComp.find((x) => secondComp.includes(x))!;
        return ascii.charCodeAt(0) - ((ascii == ascii.toUpperCase()) ?  38 : 96);
    });
    return data.reduce((a, b) => a + b);
}

function calculateGroupPrio(input: string): number {
    let prio = 0;
    const temp: string[] = [];
    input.split("\r\n").forEach((rucksack, index) => {
        temp[index % 3] = rucksack;
        if ((index + 1) % 3 == 0) {
            const item = temp[0].split("").filter((x) => temp[1].includes(x) && temp[2].includes(x))[0];
            prio += item.charCodeAt(0) - ((item == item.toUpperCase()) ?  38 : 96);
        }
    });
    return prio;
}

console.log("A) ", calculateItemPrio(input));
console.log("B) ", calculateGroupPrio(input));