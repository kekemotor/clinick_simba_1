let products = requester("POST","backInfoAway/backPillsAway")
const productsList = document.querySelector(".cards")
if(products.isError){
    alert('Извините, произошла ошибка')
}

// "itemId": "0",
//                 "userEmail": "derebenko23@gmail.com",
//                 "randomNumber": "989",
//                 "pillsName": "Активированный уголь",
//                 "pillsCategory": "no",
//                 "createDate": "2024-07-08T16:52:22.826Z"
function printProduct(products){
    products.forEach(product => {
        productsList.insertAdjacentHTML(`beforeend`,
            `

                <div class="card">
                  <div class="card__top">
                    <a href="#" class="card__image">
                      <img
                        src="./images/ugol.jpg"
                        alt="${product.pillsName}"
                      />
                    </a>
                    <div class="card__label">-1%</div>
                  </div>
                  <div class="card__bottom">
                    <div class="card__prices">
                      <div class="card__price card__price--discount">52</div>
                      <div class="card__price card__price--common">1488</div>
                    </div>`)
    });
}