import { moneyMatters } from "../scripts/utils/money.js";

console.log('testing money in cents');
if (moneyMatters(2095)==='20.95') {
    console.log('passed');
} else {
    console.log('failed');
}

if (moneyMatters(2000.4)==='20.00') {
    console.log(moneyMatters(2000.4));
    console.log('passed');
} else {
    console.log(moneyMatters(2000.4));
    console.log('failed');
}


if (moneyMatters(0)==='0.00') {
    console.log('passed');
} else {
    console.log('failed');
}


if (moneyMatters(2000.5)==='20.01') {
    console.log('passed');
} else {
    console.log('failed');
}

