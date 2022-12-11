export const x = "";

const input = await Deno.readTextFile("input.txt");

function calculateVisitedPositions(input: string): number {
    const visited: Position[] = [];
    const posTail = new Position(0, 0);
    const posHead = new Position(0, 0);
    input.split("\r\n").forEach(row => {
        const dir = row.split(" ")[0];
        const amount = parseInt(row.split(" ")[1]);
        for (let i = 0; i < amount; i++) {
            if (visited.find(p => p.x === posTail.x && p.y === posTail.y) === undefined) {
                visited.push(new Position(posTail.x, posTail.y));
            }
            switch (dir) {
                case "U":
                    if (++posHead.y - posTail.y > 1) {
                        if (posHead.x !== posTail.x) {
                            posTail.x = posHead.x;
                        }
                        posTail.y++;
                    }
                    break;
                case "D":
                    if (posTail.y - (--posHead.y) > 1) {
                        if (posHead.x !== posTail.x) {
                            posTail.x = posHead.x;
                        }
                        posTail.y--;
                    }
                    break;
                case "L":
                    if (posTail.x - (--posHead.x) > 1) {
                        if (posHead.y !== posTail.y) {
                            posTail.y = posHead.y;
                        }
                        posTail.x--;
                    }
                    break;
                case "R":
                    if (++posHead.x - posTail.x > 1) {
                        if (posHead.y !== posTail.y) {
                            posTail.y = posHead.y;
                        }
                        posTail.x++;
                    }
                    break;
            }
        }
    });
    return visited.length;
}

function calculateLongRopes(input: string): number {
    const visited: Position[] = [];
    const posKnots = new Array(9).fill(null).map(() => new Position(0, 0));
    const posHead = new Position(0, 0);
    input.split("\r\n").forEach((row, index) => {
        const dir = row.split(" ")[0];
        const amount = parseInt(row.split(" ")[1]);
        for (let i = 0; i < amount; i++) {
            if (visited.find(p => p.x === posKnots[posKnots.length - 1].x && p.y === posKnots[posKnots.length - 1].y) === undefined) {
                visited.push(new Position(posKnots[posKnots.length - 1].x, posKnots[posKnots.length - 1].y));
            }
            switch (dir) {
                case "U":
                    if (++posHead.y - posKnots[0].y > 1) {
                        if (posHead.x !== posKnots[0].x) {
                            posKnots[0].x = posHead.x;
                        }
                        posKnots[0].y++;
                    }
                    break;
                case "D":
                    if (posKnots[0].y - (--posHead.y) > 1) {
                        if (posHead.x !== posKnots[0].x) {
                            posKnots[0].x = posHead.x;
                        }
                        posKnots[0].y--;
                    }
                    break;
                case "L":
                    if (posKnots[0].x - (--posHead.x) > 1) {
                        if (posHead.y !== posKnots[0].y) {
                            posKnots[0].y = posHead.y;
                        }
                        posKnots[0].x--;
                    }
                    break;
                case "R":
                    if (++posHead.x - posKnots[0].x > 1) {
                        if (posHead.y !== posKnots[0].y) {
                            posKnots[0].y = posHead.y;
                        }
                        posKnots[0].x++;
                    }
                    break;
            }
            for (let j = 1; j < posKnots.length; j++) {
                movePos(posKnots, j);
            }
        }
    });
    return visited.length;
}

function movePos(posKnots: Position[], j: number) {
    if (posKnots[j-1].y - posKnots[j].y > 1 && posKnots[j-1].x === posKnots[j].x) {
        posKnots[j].y++;
    } else if (posKnots[j-1].y - posKnots[j].y < -1 && posKnots[j-1].x === posKnots[j].x) {
        posKnots[j].y--;
    } else if (posKnots[j-1].x - posKnots[j].x > 1 && posKnots[j-1].y === posKnots[j].y) {
        posKnots[j].x++;
    } else if (posKnots[j-1].x - posKnots[j].x < -1 && posKnots[j-1].y === posKnots[j].y) {
        posKnots[j].x--;
    } else if (posKnots[j-1].y - posKnots[j].y > 1 && posKnots[j-1].x > posKnots[j].x) {
        posKnots[j].x++;
        posKnots[j].y++;
    } else if (posKnots[j-1].y - posKnots[j].y > 1 && posKnots[j-1].x < posKnots[j].x) {
        posKnots[j].x--;
        posKnots[j].y++;
    } else if (posKnots[j-1].y - posKnots[j].y < -1 && posKnots[j-1].x > posKnots[j].x) {
        posKnots[j].x++;
        posKnots[j].y--;
    } else if (posKnots[j-1].y - posKnots[j].y < -1 && posKnots[j-1].x < posKnots[j].x) {
        posKnots[j].x--;
        posKnots[j].y--;
    } else if (posKnots[j-1].x - posKnots[j].x > 1 && posKnots[j-1].y > posKnots[j].y) {
        posKnots[j].x++;
        posKnots[j].y++;
    } else if (posKnots[j-1].x - posKnots[j].x > 1 && posKnots[j-1].y < posKnots[j].y) {
        posKnots[j].x++;
        posKnots[j].y--;
    } else if (posKnots[j-1].x - posKnots[j].x < -1 && posKnots[j-1].y > posKnots[j].y) {
        posKnots[j].x--;
        posKnots[j].y++;
    } else if (posKnots[j-1].x - posKnots[j].x < -1 && posKnots[j-1].y < posKnots[j].y) {
        posKnots[j].x--;
        posKnots[j].y--;
    }


}

class Position {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

console.log("A) ", calculateVisitedPositions(input));
console.log("B) ", calculateLongRopes(input));