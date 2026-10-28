// Function used to call an api(get method) and it will return that api's data
async function callAPI(api) {
  try {
    const response = await fetch(api);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    alert("Some Error In Calling API");
  }
}

async function getProducts(api) {
  const products = await callAPI(api);
  return products;
}

/* Function that will take an object of a single product and creates the html ui code of that product
Product schema should be like this 
{image:String, title: String, price: Number, rating: {count: Number}, category: String}
*/
function createProductHtmlCode(product) {
  const htmlCode = `
    <div class="product-card">
            <div class="product-image">
                <img src="${product.image}"
                    alt="Product Image">
            </div>
            <h1 class="product-title">${product.title}</h1>
            <h2 class="product-price">Rs. ${product.price}</h2>
            <div class="product-ratings">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
                <span class="ratings-count">(${product?.rating?.count} reviews)</span>
            </div>
            <div class="product-category">${product.category}</div>
            <button>
                <i class="fa-solid fa-cart-shopping"></i>
                Add To Cart</button>
                    </div>
    `;

  return htmlCode;
}

//This will take products array containing of all the products and create the html code of all the products
function createUICode(products) {
  let uiCode ="";
  for(let i =0; i < products.length;i++) {
    const currentProduct = products[i];
    const currProductUiCode = createProductHtmlCode(currentProduct);
    uiCode += currProductUiCode;
  }
  return uiCode;
}

async function main() {
  
  const API_URL = "https://fakestoreapi.com/products";
  const products = await getProducts(API_URL);
  
  const productsContainerElement = document.querySelector(
    ".products-container",
  );
  const ui = createUICode(products);
  productsContainerElement.innerHTML = ui;

}

main();

