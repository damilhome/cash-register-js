const changeDueElement = document.getElementById('change-due');
const cashElement = document.getElementById('cash');
const purchaseBtn = document.getElementById('purchase-btn');
const purchasePriceElement = document.getElementById('drawer-purchase-price');
const changeInDrawerElements = document.querySelectorAll('.drawer-change span');

const currencyChange = [
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

const price = 3.26;
const cid = [
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
    purchasePriceElement.textContent = `${price}`;
};

const loadDrawerChanges = () => {
    changeInDrawerElements.forEach((change, index) => {
        change.textContent = cid[index][1];
    })
};

const loadChangeDueElement = (status) => {
    changeDueElement.innerHTML = `<p>Status: ${status}</p>`

    for(let i = currencyChange.length - 1; i >= 0; i--) {
        if(currencyChange[i][1] > 0) {
            changeDueElement.innerHTML += `<p> ${currencyChange[i][0]}: $${currencyChange[i][1]}</p>`
        }
    }
};

const initialize = () => {
    loadPrice();
    loadDrawerChanges();
};

const updateChange = (customerChange, amountToCheck, currencyIndex) => {
    while(customerChange >= amountToCheck && cid[currencyIndex][1] > 0) {
        customerChange = parseFloat((customerChange - amountToCheck).toFixed(2));
        cid[currencyIndex][1] = parseFloat((cid[currencyIndex][1] - amountToCheck).toFixed(2));
        currencyChange[currencyIndex][1] = parseFloat((currencyChange[currencyIndex][1] + amountToCheck).toFixed(2));
    }
    return customerChange;
};

const resetCurrencyChange = () => {
    currencyChange.forEach(currency => currency[1] = 0);
};

purchaseBtn.addEventListener('click', () => {
    const customerCash = Number(cashElement.value);
    cashElement.value = '';

    if(!customerCash){
        return;
    }

    if(customerCash < price) {
        alert('Customer does not have enough money to purchase the item');
    } else if(customerCash === price) {
        changeDueElement.innerHTML = `<p>No change due - customer paid with exact cash</p>`
    } else {
        let customerChange = parseFloat((customerCash - price).toFixed(2));
        const currencyValues = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100];
        for(let i = currencyValues.length - 1; i >= 0; i--) {
            customerChange = updateChange(customerChange, currencyValues[i], i)
        }

        if(customerChange === 0) {
            let isCashInDrawerEqualToChange = true;
            for(let i = 0; i < cid.length; i++) {
                if(cid[i][1] > 0) {
                    isCashInDrawerEqualToChange = false;
                    break;
                }
            }

            if(isCashInDrawerEqualToChange) {
                loadChangeDueElement('CLOSED');
            } else {
                loadChangeDueElement('OPEN');
            }
            
        } else {
            changeDueElement.innerHTML = `<p>Status: INSUFFICIENT_FUNDS</p>`
        }

        resetCurrencyChange();
        loadDrawerChanges();
    }
});

cashElement.addEventListener('keydown', e => {
    if(e.key === 'Enter') {
        e.preventDefault();
        purchaseBtn.click();
    }
})

document.addEventListener('DOMContentLoaded', initialize);