export const x = "";

const input = await Deno.readTextFile("input.txt");

function calculateInputMarker(input: string): number {
    const data: string[] = [];
    let index = 0;
    for (const char of input.split("")) {
        index++;
        if (data.includes(char)) {
            data.splice(0, data.indexOf(char)+1);
        } else if (data.length == 3) {
            return index;
        }
        data.push(char);
    }
    return -1;
}

function calculateMessageMarker(input: string): number {
    const data: string[] = [];
    let index = 0;
    for (const char of input.split("")) {
        index++;
        if (data.includes(char)) {
            data.splice(0, data.indexOf(char)+1);
        } else if (data.length == 13) {
            return index;
        }
        data.push(char);
    }
    return -1;
}

console.log("A) ", calculateInputMarker(input));
console.log("B) ", calculateMessageMarker(input));