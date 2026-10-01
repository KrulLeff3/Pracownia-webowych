const readline = require('readline'); 

const price = 20;
const limit = 18;
const discount = 5;

function checkPrice(age) {
    if (age >= limit) {
        return price;
    } else {
        return price - discount;
    }
}

function printInfo(age, res) {
    console.log(`Wiek: ${age} lat -> Cena biletu: ${res} zł`);
}


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


rl.question('Podaj swój wiek:\n', (input) => {
    const userAge = parseInt(input); 

    console.log("\n--- Cennik biletów ---");
   
    for (let i = userAge; i < userAge + 5; i++) {
        const finalPrice = checkPrice(i);
        printInfo(i, finalPrice);
    }

    rl.close(); 
});
