
// load wishlist in body wishlist page only

let arrayWish = JSON.parse(localStorage.getItem('wishtable'));
appendFunc(arrayWish)


// update count wishlist
function updateWishCountNavbar(arrayWishData){
  let appendcountWish = document.getElementById('countWishItem');
  let counter = arrayWishData.length
  appendcountWish.innerHTML = counter ?? 0;
}

// wishlist.html page

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
  appendFunc(arrBack)
}

function appendFunc(arrayWish) {
  let text = ''
  arrayWish.forEach(data =>{
    text += `<tr >
      <td class="li-product-remove" ><a href="javascript:void(0)" onclick="wishRemove(this.id)"><i class="fa fa-times"></i></a>
      </td>
      <td class="li-product-thumbnail"><a href="#" ><img
                  src="${data.image}" width="100" height="100" alt=""></a></td>
      <td class="li-product-name" style="font-size: 16px;
      font-weight: 500;
      text-transform: capitalize;"><a href="#">${data.name}</a></td>
      <td class="li-product-price"><span class="amount">${data.price}</span></td>
      <td class="li-product-stock-status"><span class="in-stock">in stock</span>
      </td>
  </tr>`
  })

  document.getElementById("wishtable").innerHTML=text;
}

/**
 * 
 * @param {*} ev 
 */
function wishRemove(ev) {
    // counter -= 1;
    let index = arrayWish.findIndex(el => el.id == ev );
    arrayWish.splice(index, 1)
    localStorage.setItem('wishtable', JSON.stringify(arrayWish));
    let counter = arrayWish.length
    appendFunc(arrayWish)
    localStorage.setItem('wishcounter', counter);
    updateWishCountNavbar(arrayWish)
}









