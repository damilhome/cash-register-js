const changeDue = document.getElementById('change-due');
const cash = document.getElementById('customer-input');
const purchaseBtn = document.getElementById('purchase-btn');
const purchasePrice = document.getElementById('drawer-purchase-price');
const changeInDrawer = document.querySelectorAll('.drawer-change span');
const currencyUnitAmount = [
    ['PENNY', 0],
    ['NICKEL', 0],
    ['DIME', 0],
    ['QUARTER', 0],
    ['ONE', 0],
    ['FIVE', 0],
    ['TEN', 0],
    ['TWENTY', 0],
    ['ONE HUNDRED', 0]
]

let price = 1.87;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

const loadPrice = () => {
    purchasePrice.textContent = `${price}`;
}

const loadDrawerChanges = () => {
    changeInDrawer.forEach((change, index) => {
        change.textContent = cid[index][1];
    })
}

const checkAmount = (customerChange, amountToCheck, currencyIndex) => {
    // TODO: corrigir lógica do cid[currencyIndex][1] >= amountToCheck
    // amount não precisa ser menor, basta eu conseguir tirar a parte do cid dele
    while(customerChange >= amountToCheck && cid[currencyIndex][1] >= amountToCheck) {
        customerChange -= amountToCheck;
        cid[currencyIndex][1] -= amountToCheck;
        currencyIndex[currencyIndex][1] += amountToCheck;
    }
    return customerChange;
}

const updateChangeDue = (status) => {
    changeDue.innerHTML += `<p>Status: ${status}</p>`

    for(let i = currencyUnitAmount.length - 1; i >= 0; i--) {
        if(currencyUnitAmount[i][1] > 0) {
            changeDue.innerHTML += `<p>${currencyUnitAmount[i][0]}: $${currencyUnitAmount[i][1]}</p>`
        }
    }
}

purchaseBtn.addEventListener('click', () => {
    const customerCash = cash.value;

    if(!customerCash){
        return;
    }

    if(customerCash < price) {
        alert('Customer does not have enough money to purchase the item');
    } else if(customerCash === price) {
        changeDue.innerHTML = `<p>No change due - customer paid with exact cash</p>`
    } else {
        // TODO: tem um jeito melhor de fazer essas chamadas?
        let customerChange = checkAmount(customerCash - price, 100, 8);
        customerChange = checkAmount(customerChange, 20, 7);
        customerChange = checkAmount(customerChange, 10, 6);
        customerChange = checkAmount(customerChange, 5, 5);
        customerChange = checkAmount(customerChange, 1, 4);
        customerChange = checkAmount(customerChange, 0.25, 3);
        customerChange = checkAmount(customerChange, 0.1, 2);
        customerChange = checkAmount(customerChange, 0.05, 1);
        customerChange = checkAmount(customerChange, 0.01, 0);
        
        if(customerChange === 0) {
            isCashInDrawerEqualToChange = true;
            cid.forEach(currency => {
                if(currency[1] > 0) {
                    isCashInDrawerEqualToChange = false
                }
            })

            if(isCashInDrawerEqualToChange) {
                // TODO: implementar código para inserir o troco do cliente na tela com STATUS: CLOSED
                updateChangeDue('CLOSED');
            } else {
                // TODO: implementar código para inserir o troco do cliente na tela com STATUS: OPEN
                updateChangeDue('OPEN');
            }
            
        } else {
            changeDue.innerHTML = `<p>Status: INSUFFICIENT_FUNDS</p>`
        }
    }
})

document.addEventListener('DOMContentLoaded', () => {
    loadPrice();
    loadDrawerChanges();
})