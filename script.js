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

document.addEventListener('DOMContentLoaded', () => {
    loadPrice();
    loadDrawerChanges();
})