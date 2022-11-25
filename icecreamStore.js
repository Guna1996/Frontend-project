// let http = new XMLHttpRequest();
// http.open('get', 'icecream.json', true);
// http.send();
// http.onload = function () {
//     if (this.readyState == 4 && this.status == 200) {
//         let products = JSON.parse(this.responseText);
//         let output = "";
//         let outputrow = "";
//         let i = 0;
//         for (let item of products) {
//             if (i < 4) {
async function getProducts() {
    let response = await fetch('icecream.json');
    let data = await response.json()
    return data;

}
getProducts().then(function (products) {
    let output = "";
    let outputrow = "";
    let i = 0;
    for (let item of products) {
        if (i < 4) {
            output += ` <div class ="row_one">
            <div style="display:flex; flex-direction: column; ">
                <div class="product_description">
                    <img src="${item.img}" class = "shop-item-image" alt="photo" style="padding:2px;">
                    <div class="notice_button">
                        <button class="hot_button">HOT</button>
                    </div>
                </div>
                <div class="product_detail">
                    <h5 class = "shop-item-title">${item.name}</h5>
                    <p class = "shop-item-price">
                        ${item.price}
                    </p>
                    <button class="btn btn-primary shop-item-button" type="button">ADD TO CART</button>
                </div>
            </div>
            <br><br>
        </div> `;
        } else {
            outputrow += ` <div class ="row_one">
            <div style="display:flex; flex-direction: column; ">
                <div class="product_description">
                    <img src="${item.img}" class = "shop-item-image" alt="photo" style="padding:2px;">
                    <div class="notice_button">
                        <button class="hot_button">HOT</button>
                    </div>
                </div>
                <div class="product_detail">
                    <h5 class = "shop-item-title">${item.name}</h5>
                    <p class = "shop-item-price">
                        ${item.price}
                    </p>
                    <button class="btn btn-primary shop-item-button" type="button">ADD TO CART</button>
                </div>
            </div>
            <br><br>
        </div> `;

        }
        i++;
    }
    document.querySelector("#products_one").innerHTML = output;
    document.querySelector("#products_two").innerHTML = outputrow;
    ready()
}
);

function myfun() {
    const sample = document.querySelector("#name");
    sample.style.display = "block";
}


function funclose() {
    const sample = document.querySelector("#name");
    sample.style.display = "none";
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    var cartItemQuantity = cartItems.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            const sample = document.querySelector("#name");
            sample.style.display = "block";
            cartItemQuantity[i].value = parseInt(cartItemQuantity[i].value) + 1;
            return
        }
    }
    const sample = document.querySelector("#name");
    sample.style.display = "block";
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    var totalCount = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        totalCount =  totalCount + 1* quantity
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
    document.getElementsByClassName('added_item_count')[0].innerText = + totalCount
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}