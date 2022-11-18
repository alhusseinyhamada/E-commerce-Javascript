
// load data in cart

let dataStore = JSON.parse(localStorage.getItem('carttable'));

let counterCart = localStorage.getItem('counter');

let textCart = "";

dataStore.forEach(data => {

    textCart += `<tr>
            <td class="li-product-remove"><a href="#"  id="${data.id}" onclick="removebtn(this.id)"><i class="fa fa-times"></i></a></td>
            <td class="li-product-thumbnail"><a href="#"><img src="${data.image}" width="90" height="80"alt="Li's Product Image"></a></td>
            <td class="li-product-name" style="width:250px"><a href="#">${data.name}</a></td>
            <td class="li-product-price"><span class="amount">${data.price}</span></td>
            <td class="quantity">
               <label>Quantity</label>
               <div class="cart-plus-minus">
                     <input class="cart-plus-minus-box" value="${data.count}"  type="text">
                     <div class="dec qtybutton"><i class="fa fa-angle-down"></i></div>
                     <div class="inc qtybutton"><i class="fa fa-angle-up"></i></div>
               </div>
            </td>
            <td class="product-subtotal" style="width:100px"><span class="amount">$ ${data.total}</span></td>
         </tr> `

});


let parent = document.getElementById('carttable');

parent.innerHTML = textCart;

localStorage.setItem('carttable', JSON.stringify(dataStore));

let sum = 0;

for (let i = 0; i < dataStore.length; i++) {
    sum += dataStore[i].total;
}

localStorage.setItem('total', sum);
document.getElementById("subtotal").innerHTML = `$${sum - 5}`;
document.getElementById("total").innerHTML = `$${sum}`;
document.getElementById("carttotal").innerHTML = `$${sum}`;

// remove form cart product 
/**
 * 
 * @param {*} array 
 */
function appendCart(array) {
    let text = "";

    array.forEach(data => {
        text += `<tr>
                <td class="li-product-remove"><a href="javascript:void(0)" id="${data.id}" onclick="removebtn(this.id)"><i class="fa fa-times"></i></a></td>
                <td class="li-product-thumbnail"><a href="#"><img src="${data.image}" width="80" height="80"alt="Li's Product Image"></a></td>
                <td class="li-product-name" style="width:250px"><a href="#">${data.name}</a></td>
                <td class="li-product-price"><span class="amount">${data.price}</span></td>
                <td class="quantity">
                   <label>Quantity</label>
                   <div class="cart-plus-minus">
                         <input class="cart-plus-minus-box" value="${data.count}" type="text">
                         <div class="dec qtybutton"><i class="fa fa-angle-down"></i></div>
                         <div class="inc qtybutton"><i class="fa fa-angle-up"></i></div>
                   </div>
                </td>
                <td class="product-subtotal" style="width:100px"><span class="amount">$ ${data.total}</span></td>
             </tr> `

    });

    let parent = document.getElementById('carttable');

    parent.innerHTML = text;
}

/**
 * 
 * @param {*} ev 
 */
function removebtn(ev) {

    counterCart -= 1;

    let getCart = JSON.parse(localStorage.getItem('carttable'));

    let index = getCart.findIndex(object => object.id == ev);

    getCart.splice(index, 1);

    localStorage.setItem('carttable', JSON.stringify(getCart));

    appendCart(getCart)

    localStorage.setItem('counter', counterCart);

    let cartCount = document.getElementById('countItem') ?? 0;

    cartCount.innerHTML = counterCart

    let sum = 0;

    for (let i = 0; i < getCart.length; i++) {
        sum += getCart[i].total;
    }

    localStorage.setItem('total', sum);

    let subTotalPrice = sum;

    subTotalPrice = subTotalPrice > 5 ? subTotalPrice - 5 : subTotalPrice 

    document.getElementById("subtotal").innerHTML = `$${subTotalPrice}`;

    document.getElementById("total").innerHTML = `$${sum}`;
}

















