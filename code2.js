function getPrice(qty, unitPrice) {
    let tax = 0.20;
    let subtotal = qty * unitPrice;
    let totalPrice = subtotal * (1 + tax);
    
    if (totalPrice > 100) {
        console.log("Discount applied");
        totalPrice = totalPrice * 0.9;
    }
    
    return totalPrice;
}

function displayResult(price) {
    console.log("The total price is : " + price);
}

let quantity = 5;
let price = 10;
let result = getPrice(quantity, price);
displayResult(result);
