
// preloding section of products

const productSection = document.getElementById("list-view-product");
const load = document.getElementById("preloader");
function intial() {

    setTimeout(() => {
        load.style.opacity = 0;
        load.style.display = 'none';

        productSection.style.display = 'block';

        productSection.animationName = "productOpicity";

    }, 3000)
}
intial();

// end


/**
 * Store data
 */
let arrData = [];

/**
 * 
 * @param {*} array 
 */
function append(array) {
    let text = ''
    array.forEach(data => {
        text += `<div class="row product-layout-list">
        <div class="col-lg-3 col-md-5 ">
            <div class="product-image">
                <a href="single-product.html">
                    <img src="${data.image}" alt="Li's Product Image">
                </a>
                <span class="sticker">New</span>
            </div>
        </div>
        <div class="col-lg-5 col-md-7">
            <div class="product_desc">
                <div class="product_desc_info">
                    <div class="product-review">
                        <h5 class="manufacturer">
                            <a href="product-details.html">${data.category}</a>
                        </h5>
                        <div class="rating-box">
                            <ul class="rating">
                                <li><i class="fa fa-star-o"></i></li>
                                <li><i class="fa fa-star-o"></i></li>
                                <li><i class="fa fa-star-o"></i></li>
                                <li class="no-star"><i class="fa fa-star-o"></i></li>
                                <li class="no-star"><i class="fa fa-star-o"></i></li>
                            </ul>
                        </div>
                    </div>
                    <h4><a class="product_name" href="single-product.html">${data.name}</a></h4>
                    <div class="price-box">
                        <span class="new-price">${data.price}</span>
                    </div>
                    <p>${data.description}</p>
                </div>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="shop-add-action mb-xs-30">
                <ul class="add-actions-link">
                    <li class="add-cart" id="${data.id}" onclick="addData(this.id)"><a href="javascript:void(0)">Add to cart</a></li>
                    <li class="wishlist" ><a onclick="theFunction(${data.id})"  href="javascript:void(0)"><i class="fa fa-heart-o"></i>Add to wishlist</a></li>
                </ul>
            </div>
        </div>
    </div>`
    })

    document.getElementById("list-view-product").innerHTML = text;

}

let httpRequest = new XMLHttpRequest();

httpRequest.open('GET', 'data/data.json', true);
httpRequest.send();
httpRequest.onreadystatechange = () => {

    if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        let response = JSON.parse(httpRequest.responseText);

        for (let item of response['products']) {
            arrData.push({
                id: item.id,
                name: item.name,
                description: item.description,
                category: item.category,
                image: item.image,
                price: item.price,
                rate: item.rate,
            })
        }
        append(arrData)
    }
}

function nameAsc() {
    arrData.sort((a, b) => a.name > b.name ? 1 : -1);
    append(arrData)
}

function nameDesc() {
    arrData.sort((a, b) => a.name < b.name ? 1 : -1);
    append(arrData)
}

function priceAsc() {
    arrData.sort((a, b) => a.price > b.price ? 1 : -1);
    append(arrData)
}

function priceDesc() {
    arrData.sort((a, b) => a.price < b.price ? 1 : -1);
    append(arrData)
}

function ratingAsc() {
    arrData.sort((a, b) => a.rate > b.rate ? 1 : -1);
    append(arrData)
}

function ratingDesc() {
    arrData.sort((a, b) => a.rate < b.rate ? 1 : -1);
    append(arrData)
}


function filterData() {
    let selectFilter = document.getElementById('filter-product');
    let valueFilter = selectFilter.options[selectFilter.selectedIndex].value;
    switch (valueFilter) {
        case 'name-asc':
            nameAsc()
            break;
        case 'name-desc':
            nameDesc()
            break;
        case 'price-asc':
            priceAsc()
            break;
        case 'price-desc':
            priceDesc()
            break;
        case 'rating-asc':
            ratingAsc()
            break;
        case 'rating-desc':
            ratingDesc()
            break;
        default:
            nameAsc()
    }
}

// let counter = 0;

function addData(ev) {
    // counter++;

    let arrBack = [];
    let newvar = JSON.parse(localStorage.getItem('carttable')) ?? [];

    let check = newvar.findIndex((el) => ev == el.id);

    check <= -1 ? addObj(ev) : countObj(ev)

    function addObj(ev) {
        let arr = arrData.find((el) => (ev == (el.id)));
        let mainVar = arr.count = 1;
        arr.total = arr.price * arr.count;

        newvar.push(arr);
        arrBack = newvar;

    }

    function countObj(ev) {
        let index = newvar.findIndex(el => ev == el.id);
        newvar[index].count += 1;
        newvar[index].total = newvar[index].price * newvar[index].count
        arrBack = newvar;
    }

    let sum = 0;
    
    newvar.forEach(object => {
        sum += object.price * object.count
    })

    localStorage.setItem('total', sum);
    document.getElementById("carttotal").innerHTML = `$${sum}`;

    localStorage.setItem('carttable', JSON.stringify(arrBack));
    let counter = arrBack.length
    localStorage.setItem('counter', counter)
    let btnCount = document.getElementById('countItem');
    btnCount.innerHTML = counter
}


// let btnCount = document.getElementById('countItem');
// btnCount.innerHTML = localStorage.getItem('counter');
// console.log(localStorage.getItem('total'));
// document.getElementById('totalCount').innerHTML = `$${localStorage.getItem('total')}`;


// search function 
function search() {

    const inputSearch = document.getElementById("inputSearch").value;

    let arryFilter = arrData.filter(function (el) {

        //  return el.name.toLowerCase().indexOf(inputSearch.toLowerCase()) !== -1

        return el.name.toLowerCase().indexOf(inputSearch.toLowerCase()) > -1

    })

    append(arryFilter);

    document.getElementById("singleBanner").style.display = 'none';
    document.getElementById("resetBtn").style.display = 'block';
    document.getElementById("filterBar").style.display = 'none';
}

// reset function

function resetFun() {

    document.getElementById("singleBanner").style.display = 'block';
    document.getElementById("resetBtn").style.display = 'none';
    document.getElementById("filterBar").style.display = 'flex';

    append(arrData);
}


// cart search function 
function cartSearchFun() {

    let cartSearchInput = document.getElementById("cartSearchInput").value;
    document.getElementById("inputSearch").innerText;
    window.open("index.html", "_blank");

}
