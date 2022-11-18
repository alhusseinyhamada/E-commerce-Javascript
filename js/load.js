

/**
 * 
 * ===================================    whislist   ==============================
 * 
 */
/// load count wishlist in navbar 

let arrayWishData = JSON.parse(localStorage.getItem('wishtable')) ?? 0;

let appendcountWish = document.getElementById('countWishItem');
let counter = arrayWishData.length
appendcountWish.innerHTML = counter ?? 0;


// add wishlist without append

function theFunction(ev){
    let arrBack = [];
    let newvar  = JSON.parse(localStorage.getItem('wishtable')) ?? [] ;
  
    let check = newvar.findIndex((el) => ev == el.id );
  
    check <= -1 ? addObj(ev) : countObj(ev)
  
    function addObj(ev){
        let arr = arrData.find((el) => (ev == (el.id )));
        let mainVar = arr.count = 1 ;
        arr.total = arr.price * arr.count
  
        newvar.push(arr);  
        arrBack = newvar;   
    }
  
    function countObj(ev){
        let index = newvar.findIndex(el => ev == el.id );
        newvar.splice(index,1)
        arrBack = newvar;
    }

    localStorage.setItem('wishtable',JSON.stringify(arrBack));
    let appendcountWish = document.getElementById('countWishItem');
    let counter = arrBack.length
    appendcountWish.innerHTML = counter;
}

/**
 * 
 * 
 * ===================================     cart   ==============================
 * 
 */

/// load count cart item  count
document.getElementById('countItem').innerHTML = localStorage.getItem('counter') ?? 0;


// load total price for cart 

let dataStoreCart = JSON.parse(localStorage.getItem('carttable')) ?? [];

let sumTotal = 0;

if (dataStoreCart.length > 0) {

    for (let i = 0; i < dataStoreCart.length; i++) {
        sumTotal += dataStoreCart[i].total;
    }
}

localStorage.setItem('total', sumTotal);
let totalPrice = document.getElementById("carttotal") ?? 0;
totalPrice.innerHTML = `$${sumTotal}`;



