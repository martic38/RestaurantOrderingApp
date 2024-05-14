import { menuArray } from "./data.js";
import { v4 as uuidv4 } from 'https://jspm.dev/uuid'

const orderArray = []
let totalPrice = 0
let mealDeal = false
render()
document.addEventListener('click', function(e){
    console.log('event listener triggered')
   if (e.target.dataset.add){
  handleAddClick(e.target.dataset.add)
   } else if (e.target.dataset.remove){
    handleRemoveClick(e.target.dataset.remove)
   } else if (e.target.id === 'complete-order-btn'){
    console.log('complete ordererer')
    handleCompleteOrderClick()
   } else if (e.target.id === 'pay-btn'){
    console.log('pay button clicked')
    e.preventDefault()
    handlePayClick()
   }
})

function render(){   
  let menuHTML = ''  
  let checkoutHTML = ''
    menuArray.forEach((item)=>{
        menuHTML += `
        <div id="menu-item">
                    <div id="item-content">
                        <img src="/images/icons/${item.name}.png" id="icons">
                        <div id="item-info">
                            <h2>${item.name}</h2>
                            <p>${item.ingredients}</p>
                            <h3>$${item.price}</h3>
                        </div> 
                    </div>
                    <button id="add-btn" data-add="${item.id}">+</button>
                </div>`
    })
    if (orderArray){
    orderArray.forEach((item)=>{
        checkoutHTML += `
                    <div id="order-item-container">
                        <div id="item-block">
                            <h2>${item.name}</h2>
                            <a id="remove-btn" data-remove="${item.id}">remove</a>
                        </div>
                        <h3>$${item.price}</h3>
                    </div>
                    `
    })}
    
    document.getElementById('menu-container').innerHTML = menuHTML
    document.getElementById('checkout-items').innerHTML = checkoutHTML
    document.getElementById('total-price-number').innerText = '$' + totalPrice.toFixed(2)
}

function handleAddClick(itemId){
    if (totalPrice === 0){
        toggleCheckoutVisibility()}

    menuArray.forEach((item) => {
    
        if (Number(itemId)  === item.id ){
            orderArray.push(item)
            
            totalPrice += item.price
        }
    })
    if (mealDeal === false){
        checkForMealDeal()
    }
   
    render()
}

function handleRemoveClick(itemId){
    
    const index = orderArray.findIndex(item => item.id === Number(itemId))
    console.log(index)
    
    if (index > -1){
        orderArray.splice(index, 1)
       
     }
     getTotalPrice()
     checkForMealDeal()
    if (totalPrice === 0) {
        document.getElementById('checkout-container').classList.toggle('hidden')}
        render()
}

function handleCompleteOrderClick(){
   togglePaymentModal()
}

function handlePayClick(){
    document.getElementById('order-complete-prompt').innerHTML = `<h2>Thanks, ${document.getElementById('name-entry').value}! Your order is on its way!</h2>`
    toggleCompletePromptVisibility()
    toggleCheckoutVisibility()
    togglePaymentModal()
}

function getTotalPrice () {
    totalPrice = 0
    orderArray.forEach((item)=>{
        totalPrice += item.price
    })

    if (mealDeal === false){
        checkForMealDeal()
    }
}

function toggleCheckoutVisibility(){
    document.getElementById('checkout-container').classList.toggle('hidden')
}

function toggleCompletePromptVisibility(){
    document.getElementById('order-complete-prompt').classList.toggle('hidden')
}

function togglePaymentModal(){
    document.getElementById('payment-modal').classList.toggle('hidden')
}

function checkForMealDeal() {
   
    if( (orderArray.some(e => e.name === 'Pizza') && orderArray.some(e => e.name === 'Beer')) || (orderArray.some(e => e.name === 'Hamburger') && orderArray.some(e => e.name === 'Beer'))){
        totalPrice = totalPrice*0.85
        console.log('you have a meal deal!')
        // mealDeal = true
    } 
   
}