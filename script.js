

let arrProducts = [
    {
        img: 'https://mobimania.ua/wp-content/uploads/2022/06/zahysne-sklo-iphone-12_12-pro-tempered-glass-4d-anty-shpion.jpg.pagespeed.ce.lvRroU0PcY.jpg',
        name: 'Захисне скло 4D iPhone 14 Black',
        price: 240
    },
    {
        img: 'https://mobimania.ua/wp-content/uploads/2023/01/uuuu.jpg.pagespeed.ce.lo76xf5R8m.jpg',
        name: 'Зарядка 12V XO CC30 2.4A 2USB Grey',
        price: 150
    },
    {
        img: 'https://mobimania.ua/wp-content/uploads/2023/06/1.jpg',
        name: 'Навушники Hoco EW26 TWS White',
        price: 800
    },
    {
        img: 'https://mobimania.ua/wp-content/uploads/2021/09/iphone-silicone-case-sylykon-soft-touch-iphone-12-pro-max-black.jpg.pagespeed.ce.kOWgP3PaI2.jpg',
        name: 'Чохли iPhone iPhone 12 Pro Max Black',
        price: 500
    },
    {
        img: 'https://mobimania.ua/wp-content/uploads/2023/06/1.jpg',
        name: 'Навушники Hoco EW26 TWS White',
        price: 300
    },
    {
        img: 'https://mobimania.ua/wp-content/uploads/2021/09/iphone-silicone-case-sylykon-soft-touch-iphone-12-pro-max-black.jpg.pagespeed.ce.kOWgP3PaI2.jpg',
        name: 'Чохли iPhone iPhone 12 Pro Max Black',
        price: 100
    }
]

let basket = document.getElementById('btn-amount');
let productsBlock = document.getElementById('container_for_products');
let basket_clear = document.getElementById('clear_basket');

let basketArray = [];

class Product {
    constructor(img, name, price) {
        this.img = img;
        this.name = name;
        this.price = price;
    }
    fillProductInfo() {
        this.wrapContent = document.createElement('div');
        this.wrapContent.className = 'p-3 m-1 text-center border border-secondary bg-white rounded';
        let divPhoto = document.createElement('img');
        let divName = document.createElement('div');
        let divPrice = document.createElement('div');
        let btnBasket = document.createElement('div');
        btnBasket.textContent = 'У кошик';
        btnBasket.className = 'btn btn-dark';
        btnBasket.setAttribute('type', 'button');
        btnBasket.onclick = this.addToBasket.bind(this);
        this.wrapContent.append(divPhoto, divName, divPrice, btnBasket);

        divPhoto.src = this.img;
        divPhoto.style.width = '100%';
        divPhoto.style.height = '80%';
        divName.textContent = this.name;
        divPrice.textContent = this.price +'грн';
    }
    addToBasket() {

        if (JSON.parse(localStorage.getItem('basket'))) {
            basketArray = JSON.parse(localStorage.getItem('basket'))
        }
        basketArray.push(this);

        localStorage.setItem('basket', JSON.stringify(basketArray));
        let sum = 0;
        for (let i = 0; i < basketArray.length; i++) {
            sum += basketArray[i].price;
        }
        basket.textContent = sum;
        basket_clear.style.display = 'block';
    }
    insertTo(container) {
        container.append(this.wrapContent);
    }
}

function render() {
    let local = JSON.parse(localStorage.getItem('basket'));
    if (local) {
        let sum = 0;
        for (i = 0; i < local.length; i++) {
            sum += local[i].price;
        }
        basket.textContent = sum;
        basket_clear.style.display = 'block';

    } else {
        basket_clear.style.display = 'none';
    }
    for (i = 0; i < arrProducts.length; i++) {
        let productItemCont = document.createElement('div');
        productItemCont.className = 'col-md-4';
        productsBlock.append(productItemCont);
        let product = new Product(arrProducts[i].img, arrProducts[i].name, arrProducts[i].price);
        product.fillProductInfo();
        product.insertTo(productItemCont);
    }
}


render();
basket_clear.onclick = function () {
    localStorage.clear();
    basket.textContent = 0;
    basket_clear.style.display = 'none';
}