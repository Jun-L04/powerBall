import { resolve } from "path";
import * as readline from "readline";
import { arrayBuffer } from "stream/consumers";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function powerball_game() {
  console.log("Do you want to choose your own numbers?");
  rl.question("[Y]es or [N]o.", async input => {
    // Y => prompts user to pick 5 && randomly generates 5 numbers as winning numbers
    // results are printed and compared
    if (input.toUpperCase() === "Y") {
      const usrArr: number[] = await promptPick(5, []);
      const winningPick: number[] = winningSeq();

      console.log("WINNING NUMBERS");
      printSeq(winningPick);
      console.log("PLAYER NUMBERS");
      printSeq(usrArr);
      compareArr(usrArr, winningPick);
      //compareArr([1, 2, 3, 4, 5], [1, 2, 3, 4, 5]);
      rl.close();
    } else if (input.toUpperCase() == "N") {
      // quickPick, which randomly generate 30 and picks the first 5 in ascending order
      // rest is the same as Y
      const usrArr: number[] = quickPick();
      const winningPick: number[] = quickPick();

      console.log("WINNING NUMBERS");
      printSeq(winningPick);
      console.log("PLAYER NUMBERS");
      printSeq(usrArr);
      compareArr(usrArr, winningPick);
      rl.close();
    } else {
      console.log(new Error("Invalid input"));
      rl.close();
    }
  });
}

function quickPick(): number[] {
  return mainNumbers();
}

function winningSeq(): number[] {
  return Array.from({ length: 5 }, () => Math.floor(Math.random() * 100));
}

function mainNumbers(): number[] {
  // creates random array of 30, sorts it ascending-ly, then takes the first 5 elements
  return Array.from({ length: 30 }, () => Math.floor(Math.random() * 100))
    .sort((a, b) => a - b)
    .slice(0, 5);
}

function promptPick(num: number, arr: number[]): Promise<number[]> {
  return new Promise<number[]>(async resolve => {
    for (let i = 0; i < num; i++) {
      await new Promise<void>(resolveInner => {
        rl.question("Enter your winning number: ", input => {
          arr.push(Number.parseInt(input));
          resolveInner();
        });
      });
    }
    resolve(arr);
  });
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

function compareArr(usr: number[], win: number[]) {
  //console.log(usr, win)
  const winner: boolean = usr.every((cur, index) => {
    //console.log("cur: ", cur, "   win: ", win[index]);
    return cur === win[index];
  });
  if (winner) return console.log("You won");
  else return console.log("Better luck next time");
}

function printSeq(arr: number[]) {
  arr.forEach(num => {
    process.stdout.write(`${num} \t`);
  });
  console.log();
}

//printSeq([1, 2, 3, 4, 5]);
powerball_game();
