"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline"));
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
function powerball_game() {
    console.log("Do you want to choose your own numbers?");
    rl.question("[Y]es or [N]o.", (input) => __awaiter(this, void 0, void 0, function* () {
        // Y => prompts user to pick 5 && randomly generates 5 numbers as winning numbers
        // results are printed and compared
        if (input.toUpperCase() === "Y") {
            const usrArr = yield promptPick(5, []);
            const winningPick = winningSeq();
            console.log("WINNING NUMBERS");
            printSeq(winningPick);
            console.log("PLAYER NUMBERS");
            printSeq(usrArr);
            compareArr(usrArr, winningPick);
            //compareArr([1, 2, 3, 4, 5], [1, 2, 3, 4, 5]);
            rl.close();
        }
        else if (input.toUpperCase() == "N") {
            // quickPick, which randomly generate 30 and picks the first 5 in ascending order
            // rest is the same as Y
            const usrArr = quickPick();
            const winningPick = quickPick();
            console.log("WINNING NUMBERS");
            printSeq(winningPick);
            console.log("PLAYER NUMBERS");
            printSeq(usrArr);
            compareArr(usrArr, winningPick);
            rl.close();
        }
        else {
            console.log(new Error("Invalid input"));
            rl.close();
        }
    }));
}
function quickPick() {
    return mainNumbers();
}
function winningSeq() {
    return Array.from({ length: 5 }, () => Math.floor(Math.random() * 100));
}
function mainNumbers() {
    // creates random array of 30, sorts it ascending-ly, then takes the first 5 elements
    return Array.from({ length: 30 }, () => Math.floor(Math.random() * 100))
        .sort((a, b) => a - b)
        .slice(0, 5);
}
function promptPick(num, arr) {
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < num; i++) {
            yield new Promise(resolveInner => {
                rl.question("Enter your winning number: ", input => {
                    arr.push(Number.parseInt(input));
                    resolveInner();
                });
            });
        }
        resolve(arr);
    }));
}
// function promptPick(num: number, arr: number[]): Promise<number[]> {
//   // if (num === 0) return arr
//   // rl.question("Enter your next winning number: ", async input => {
//   //     arr.push(Number.parseInt(input))
//   // })
//   // return promptPick(--num, arr)
//   return new Promise<number[]>(resolve => {
//     while (--num >= 0) {
//         rl.question("Enter your winning number", async input => {
//             arr.push(Number.parseInt(input))
//         })
//     }
//     resolve(arr)
//     // if (num === 0) {
//     //     resolve(arr);
//     // } else {
//     //     rl.question("Enter your winning number: ", input => {
//     //     arr.push(Number.parseInt(input));
//     //     });
//     // }
//     // return resolve(promptPick(--num, arr));
//   });
// }
function compareArr(usr, win) {
    //console.log(usr, win)
    const winner = usr.every((cur, index) => {
        //console.log("cur: ", cur, "   win: ", win[index]);
        return cur === win[index];
    });
    if (winner)
        return console.log("You won");
    else
        return console.log("Better luck next time");
}
function printSeq(arr) {
    arr.forEach(num => {
        process.stdout.write(`${num} \t`);
    });
    console.log();
}
//printSeq([1, 2, 3, 4, 5]);
powerball_game();
