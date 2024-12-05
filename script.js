const changeDue = document.getElementById('change-due');
const cash = document.getElementById('cash');
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

let price = 20;
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
    while(customerChange >= amountToCheck && cid[currencyIndex][1] > 0) {
        customerChange = parseFloat(customerChange.toFixed(2));
        customerChange -= amountToCheck;
        cid[currencyIndex][1] -= amountToCheck;
        currencyUnitAmount[currencyIndex][1] += amountToCheck;
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
    const customerCash = Number(cash.value);
    console.log(`Clicou no botão, dinheiro: R$ ${customerCash}`);

    if(!customerCash){
        console.log('Nenhum valor adicionado.')
        return;
    }

    if(customerCash < price) {
        alert('Customer does not have enough money to purchase the item');
    } else if(customerCash === price) {
        changeDue.innerHTML = `<p>No change due - customer paid with exact cash</p>`
    } else {
        // TODO: tem um jeito melhor de fazer essas chamadas?
        let customerChange = checkAmount(parseFloat((customerCash - price).toFixed(2)), 100, 8);
        console.log(`Chamou check de R$ 100. Valor restante: ${customerChange}`);
        customerChange = checkAmount(customerChange, 20, 7);
        console.log(`Chamou check de R$ 20. Valor restante: ${customerChange}`);
        customerChange = checkAmount(customerChange, 10, 6);
        console.log(`Chamou check de R$ 10. Valor restante: ${customerChange}`);
        customerChange = checkAmount(customerChange, 5, 5);
        console.log(`Chamou check de R$ 5. Valor restante: ${customerChange}`);
        customerChange = checkAmount(customerChange, 1, 4);
        console.log(`Chamou check de R$ 1. Valor restante: ${customerChange}`);
        customerChange = checkAmount(customerChange, 0.25, 3);
        console.log(`Chamou check de R$ 0.25. Valor restante: ${customerChange}`);
        customerChange = checkAmount(customerChange, 0.1, 2);
        console.log(`Chamou check de R$ 0.1. Valor restante: ${customerChange}`);
        customerChange = checkAmount(customerChange, 0.05, 1);
        console.log(`Chamou check de R$ 0.05. Valor restante: ${customerChange}`);
        customerChange = checkAmount(customerChange, 0.01, 0);
        console.log(`Chamou check de R$ 0.01. Valor restante: ${customerChange}`);
        
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