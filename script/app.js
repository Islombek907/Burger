const products = {
    crazy: {
        name: 'Crazy',
        price: 31000,
        img: 'images/products/burger-1.png', 
        amount: 0,
        get totalSumm() {
            return this. price * this.amount
        } 
    },    
    light: {
        name: 'Light',
        price: 26000,
        img: 'images/products/burger-2.png', 
        amount: 0,
        get totalSumm() {
            return this. price * this.amount
        }
    },   
    cheeseburger: {
        name: 'CheeseBurger',
        price: 29000,
        img: 'images/products/burger-3.png', 
        amount: 0,
        get totalSumm() {
            return this. price * this.amount
        }
    },   
    dburger: {
        name: 'dBurger',
        price: 24000,
        img: 'images/products/burger-4.png', 
        amount: 0,
        get totalSumm() {
            return this. price * this.amount
        }
    },   
}

const productsBtns = document.querySelectorAll('.wrapper__list-btn'),
      basketBtnCount = document.querySelector('.warapper__navbar-count'),
      basketChecklist = document.querySelector('.wrapper__navbar-checklist'),
      basketModal = document.querySelector('.wrapper__navbar-basket'),
      basketTotalprice = document.querySelector('.wrapper__navbar-totalprice'), 
      basketBottom = document.querySelector('.wrapper__navbar-bottom');
      printBody = document.querySelector('.print__body'),
      printFooter = document.querySelector('.print__footer');


window.addEventListener('click', function (e) {
    if(
        e.target.offsetParent.className === 'wrapper__navbar-btn' || 
        e.target.className === 'wrapper__navbar-close'
    ) {
        basketModal.classList.toggle('active')
    }else if(
        basketModal.classList.contains('active') && 
        e.target.className != 'wrapper__navbar-checklist' &&
        e.target.className == 'wrapper__navbar-product'
    ) {
        basketModal.classList.remove('active')
    }
})
// window.addEventListener('click', function (e) {
//     if(e.target.offsetParent.className === 'wrapper__navbar-btn' || 
//         e.target.className === 'wrapper__navbar-close') {
//         basketModal.classList.toggle('active')
//     }
// })
productsBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        plusOrMinus(btn)
    })
})
function plusOrMinus(btn){
    let parent = btn.closest('.wrapper__list-card'),
        parentId = parent.getAttribute('id')
    // products[parentId].amount++
    products[parentId].amount < 10 ? products[parent.id].amount++ : 10
    basket()
}
function basket() {
    const productsArray = []
    for (const key in products) {
        let totalCount = 0
        let po = products[key] // productObject (po)
        let productCard = document.querySelector(`#${po.name.toLowerCase()}`)
        let parentIndicator = productCard.querySelector('.wrapper__list-count');        
        if(po.amount) {
            productsArray.push(po)
            basketBtnCount.classList.add('active')
            totalCount += po.amount
            parentIndicator.classList.add('active')     
            parentIndicator.innerHTML = po.amount
        } else {
            parentIndicator.classList.remove('active')
            parentIndicator.innerHTML = 0
        }
        basketChecklist.innerHTML = ''
        basketBtnCount.innerHTML = totalCount
    }
    for (let i = 0; i < productsArray.length; i++) {
        basketChecklist.innerHTML += cardItemBurger(productsArray[i])
    }
    const allCount = totalCountProducts()
    if(allCount){
        basketBtnCount.classList.add('active')
    }else {
        basketBtnCount.classList.remove('active')
    }
    basketBtnCount.innerHTML = allCount
    basketTotalprice.innerHTML = totalSummProducts().toLocaleString() + " сум"
}
function cardItemBurger(productData) {
    const {name, price, amount, img} = productData
    return `
    <div class="wrapper__navbar-product">
    <div class="wrapper__navbar-info">
        <img src="${img}" alt="" class="wrapper__navbar-productImage"> 
        <div>
            <p class="wrapper__navbar-infoName">${name}</p>  
            <p class="wrapper__navbar-infoPrice">${price}</p>
        </div>
    </div>   
    <div class="wrapper__navbar-option" id="${name.toLowerCase()}_option">
        <button class="wrapper__navbar-symbol fa-minus" data-symbol="-">-</button> 
        <output class="wrapper__navbar-count">${amount}</output>
        <button class="wrapper__navbar-symbol fa-plus" data-symbol="+">+</button> 
    </div>
</div> 
`
}
window.addEventListener('click', e => {
    const btn = e.target
    if(btn.classList.contains('wrapper__navbar-symbol')){
        const attr = btn.dataset.symbol
        const parent = btn.closest('.wrapper__navbar-option')
        if(parent) {
            const idProduct = parent.id.split('_')[0]
            attr === '-' ? products[idProduct].amount-- :
            attr === '+' && products[idProduct].amount < 10 ? products[idProduct].amount++ : ''
            basket()
        }
    }
})
function totalCountProducts() {
    let total = 0
    for (const key in products) {
        total += products[key].amount
    }
    return total
}
function totalSummProducts() {
    let total = 0
    for (const key in products) {
        total += products[key].totalSumm
    }
    return total
}
basketBottom.addEventListener('click', () => {
    printBody.innerHTML = ''
    for (const key in products) {
        const {name, amount, totalSumm} = products[key]
        if(amount) {
            printBody.innerHTML += `
            <div class="print__body-item">
                <p class="print__body-item_name">
                    <span class="name">${name}</span>
                    <span class="count">${amount}</span>
                </p>
                <p class="print__body-item_summ">${totalSumm}</p>
            </div>`
      }
    }
    printFooter.innerHTML = totalSummProducts()
    window.print()
})
// basketBtnCount.addEventListener('click', function(){
//     printBody.innerHTML = ''
//     for (const key in products){
//         const {name, totalSumm:total, amount} = products[key]
//         if(amount) {
//             printBody.innerHTML += `
//                 <div class="print__body-item">
//                     <p class="print__body-item_name">
//                         <span>${name}</span>
//                         <span>${amount}</span>
//                     </p>
//                     <p>${total.toLocaleString()} sum</p>
//                 </div>`
//         }
//     }
//     printFooter.innerHTML = totalSummProducts().toLocaleString() + ' sum'
//     window.print()
// })
