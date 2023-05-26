var products = [
    {title: '상품 1', image: '상품1.jpg', description: '상품 1에 대한 설명'},
    {title: '상품 2', image: '상품1.jpg', description: '상품 1에 대한 설명'},
    {title: '상품 3', image: '상품1.jpg', description: '상품 1에 대한 설명'},
    {title: '상품 4', image: '상품1.jpg', description: '상품 1에 대한 설명'},
    {title: '상품 5', image: '상품1.jpg', description: '상품 1에 대한 설명'},
    {title: '상품 6', image: '상품1.jpg', description: '상품 1에 대한 설명'},
    {title: '상품 7', image: '상품1.jpg', description: '상품 1에 대한 설명'},
    {title: '상품 7', image: '상품1.jpg', description: '상품 1에 대한 설명'},
    {title: '상품 7', image: '상품1.jpg', description: '상품 1에 대한 설명'},
    {title: '상품 7', image: '상품1.jpg', description: '상품 1에 대한 설명'},
    {title: '상품 7', image: '상품1.jpg', description: '상품 1에 대한 설명'},
    {title: '상품 7', image: '상품1.jpg', description: '상품 1에 대한 설명'},
    {title: '상품 7', image: '상품1.jpg', description: '상품 1에 대한 설명'},
    {title: '상품 7', image: '상품1.jpg', description: '상품 1에 대한 설명'},
];

var productList = document.getElementById('productList');

for (var i = 0; i < products.length; i++) {
    var productItem = document.createElement('div');
    productItem.classList.add('product-item');
    
    var titleElement = document.createElement('h3');
    titleElement.textContent = products[i].title;
    productItem.appendChild(titleElement);

    var descriptionElement = document.createElement('p');
    descriptionElement.textContent = products[i].description;
    productItem.appendChild(descriptionElement);


    var imageElement = document.createElement('img');
    imageElement.src = products[i].image;
    productItem.appendChild(imageElement);
    
    productList.appendChild(productItem);
}



