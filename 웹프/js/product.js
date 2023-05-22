var products = ['상품 1', '상품 2', '상품 3', '상품 4', '상품 5', '상품 6',
                '상품 7', '상품 8', '상품 9', '상품 10', '상품 11', '상품 12',
                '상품 13', '상품 14', '상품 15', '상품 16', '상품 17', '상품 18',
                '상품 19', '상품 20'];

var productList = document.getElementById('productList');

for (var i = 0; i < products.length; i++){
    var productItem = document.createElement('div');
    productItem.classList.add('product-item');
    productItem.textContent = products[i];
    productList.appendChild(productItem);
}