import './scss/styles.scss';
import { ProductCatalog } from "./components/models/ProductCatalog";
import "./scss/styles.scss";
import { apiProducts } from "./utils/data";
import { ShoppingCart } from "./components/models/ShoppingСart";
import { BuyerInfo } from "./components/models/BuyerInfo";
import { Communication } from "./components/service/Communication";
import { Api } from "./components/base/Api";
import { API_URL } from "./utils/constants";

const productModel = new ProductCatalog();
const shoppingModel = new ShoppingCart();
const buyerModel = new BuyerInfo();

const api = new Api(API_URL);
const apiModel = new Communication(api);

//productCatalog
productModel.setProducts(apiProducts.items);

console.log("Массив товаров: ", productModel.getProducts());

console.log(
    "Товар по Айди: ",
    productModel.getProductById("854cef69-976d-4c2a-a18c-2aa45046c390"),
);

const productId = productModel.getProductById(
    "854cef69-976d-4c2a-a18c-2aa45046c390",
);

if (productId) {
    productModel.setSelectedProduct(productId);
}

console.log("Выбранный товар: ", productModel.getSelectedProduct());
//

//shoppingCart
const productCart = apiProducts.items[1];
const productCart2 = apiProducts.items[2];

shoppingModel.addProductsInCart(productCart);
shoppingModel.addProductsInCart(productCart2);

console.log("Товары в корзине: ", shoppingModel.getProductsInCart());

console.log(
    "Есть ли товар:",
    shoppingModel.hasProductsInCart("c101ab44-ed99-4a54-990d-47aa2bb4e7d9"),
);

shoppingModel.removeProductsInCart(productCart2);
console.log("Корзина после удаления ", shoppingModel.getProductsInCart());

console.log("Количество товаров:", shoppingModel.getProductsInCartCount());

console.log("Общая стоимость:", shoppingModel.getTotalPriceProductsInCart());

shoppingModel.clearCart();
console.log(
    "Товары в корзине после очистки: ",
    shoppingModel.getProductsInCart(),
);
//

//buyerInfo
buyerModel.setPayment("card");
buyerModel.setAddress("Москва, ул. Ленина, д. 1");
buyerModel.setEmail("test@mail.ru");
buyerModel.setPhone("+79999999999");
buyerModel.validateBuyerInfo(),

    console.log("Массив данных покупателя: ", buyerModel.getBuyerInfo());

buyerModel.clearBuyerInfo();
console.log("Модель после очистки: ", buyerModel.getBuyerInfo());

//

console.log(API_URL);

async function fetchCatalog() {
    try {
        const response = await apiModel.getItems();
        productModel.setProducts(response.items);
        console.log(
            "Массив товаров из каталога через API: ",
            productModel.getProducts(),
        );
    } catch (error: unknown) {
        console.error("Ошибка при загрузке каталога: ", error);
    }
}

fetchCatalog();

