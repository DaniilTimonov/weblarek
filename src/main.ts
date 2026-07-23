import { ProductCatalog } from "./components/models/ProductCatalog";
import "./scss/styles.scss";
import { ShoppingCart } from "./components/models/ShoppingСart";
import { BuyerInfo } from "./components/models/BuyerInfo";
import { Communication } from "./components/service/Communication";
import { Api } from "./components/base/Api";
import { API_URL } from "./utils/constants";
import { EventEmitter } from "./components/base/Events";
import { cloneTemplate, ensureElement } from "./utils/utils";
import { Header } from "./components/view/Header";
import { Gallery } from "./components/view/Gallery";
import { ModalWindow } from "./components/view/ModalWindow";
import { OrderSuccess } from "./components/view/OrderSuccess";
import { Basket } from "./components/view/Basket";
import { OrderForm } from "./components/view/form/OrderForm";
import { ContactForm } from "./components/view/form/ContactForm";
import { ProductInGallery } from "./components/view/productCards/ProductInGallery";
import { IProduct } from "./types";
import { ProductPreview } from "./components/view/productCards/ProductPreview";
import { ProductInBasket } from "./components/view/productCards/ProductInBasket";

const events = new EventEmitter();

const productModel = new ProductCatalog(events);
const shoppingModel = new ShoppingCart(events);
const buyerModel = new BuyerInfo(events);

const api = new Api(API_URL);
const apiModel = new Communication(api);

const header = new Header(ensureElement<HTMLElement>(".header"), events);
const gallery = new Gallery(ensureElement<HTMLElement>(".gallery"), events);
const modal = new ModalWindow(ensureElement<HTMLElement>(".modal"), events);

const successTemplate = ensureElement<HTMLTemplateElement>("#success");
const basketTemplate = ensureElement<HTMLTemplateElement>("#basket");
const orderTemplate = ensureElement<HTMLTemplateElement>("#order");
const contactsTemplate = ensureElement<HTMLTemplateElement>("#contacts");

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>("#card-catalog");
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>("#card-preview");
const cardBasketTemplate = ensureElement<HTMLTemplateElement>("#card-basket");

const productPreview = new ProductPreview(
    cloneTemplate<HTMLElement>(cardPreviewTemplate),
    {
        onClick: () => {
            const product = productModel.getSelectedProduct();

            if (!product) return;

            if (shoppingModel.hasProductsInCart(product.id)) {
                shoppingModel.removeProductsInCart(product);
            } else {
                shoppingModel.addProductsInCart(product);
            }

            modal.close();
        },
    }
);

const success = new OrderSuccess(
    cloneTemplate<HTMLElement>(successTemplate),
    events,
);
const basket = new Basket(cloneTemplate<HTMLElement>(basketTemplate), events);
const order = new OrderForm(
    cloneTemplate<HTMLFormElement>(orderTemplate),
    events,
);
const contacts = new ContactForm(
    cloneTemplate<HTMLFormElement>(contactsTemplate),
    events,
);

events.on("catalog:changed", () => {
    const catalogCards = productModel.getProducts().map((product) => {
        const card = new ProductInGallery(
            cloneTemplate<HTMLElement>(cardCatalogTemplate),
            {
                onClick: () => {
                    events.emit("card:select", product);
                },
            },
        );

        return card.render(product);
    });

    gallery.render({ catalog: catalogCards });
});

events.on("card:select", (product: IProduct) => {
    productModel.setSelectedProduct(product);
});

events.on("basket:open", () => {
    modal.content = basket.render();
    modal.open();
});

events.on("product:selected", () => {
    const product = productModel.getSelectedProduct();

    if (!product) return;

    const inBasket = shoppingModel.hasProductsInCart(product.id);

    modal.content = productPreview.render({
        ...product,
        buttonText:
            product.price === null
                ? "Недоступно"
                : inBasket
                    ? "Удалить из корзины"
                    : "Купить",

        buttonDisabled: product.price === null,
    });

    modal.open();
});

events.on("basket:add", () => {
    const product = productModel.getSelectedProduct();

    if (!product) return;

    if (!shoppingModel.hasProductsInCart(product.id)) {
        shoppingModel.addProductsInCart(product);
    }

    modal.close();
});

events.on("basket:remove", (product: IProduct) => {
    shoppingModel.removeProductsInCart(product);
});

events.on("basket:changed", () => {
    const basketItems = shoppingModel.getProductsInCart();

    const basketViews = basketItems
        .map((item, index) => {
            const product = productModel.getProductById(item.id);

            if (!product) return null;

            const basketCard = new ProductInBasket(
                cloneTemplate<HTMLElement>(cardBasketTemplate),
                {
                    onClick: () => {
                        events.emit("basket:remove", product);
                    },
                },
            );

            basketCard.index = index + 1;

            return basketCard.render(product);
        })
        .filter((el): el is HTMLElement => el !== null);

    const isEmpty = shoppingModel.getProductsInCartCount() === 0;
    basket.buttonStatus = isEmpty;
    header.counter = basketItems.length;
    basket.totalPrice = shoppingModel.getTotalPriceProductsInCart();
    basket.items = basketViews;
});

events.on("basket:submit", () => {
    modal.content = order.render();
    modal.open();
});

events.on("payment:card", () => {
    buyerModel.setPayment("card");
});

events.on("payment:cash", () => {
    buyerModel.setPayment("cash");
});

events.on("form:address", (data: { value: string }) => {
    buyerModel.setAddress(data.value);
});

events.on("form:email", (data: { value: string }) => {
    buyerModel.setEmail(data.value);
});

events.on("form:phone", (data: { value: string }) => {
    buyerModel.setPhone(data.value);
});

events.on("buyer:changed", () => {
    const buyerData = buyerModel.getBuyerInfo();
    const errors = buyerModel.validateBuyerInfo();

    order.render({
        payment: buyerData.payment,
        address: buyerData.address,
        valid: !errors.payment && !errors.address,
        errors: errors.payment || errors.address || "",
    });
    contacts.render({
        email: buyerData.email,
        phone: buyerData.phone,
        valid: !errors.email && !errors.phone,
        errors: errors.email || errors.phone || "",
    });
});

events.on("order:submit", () => {
    modal.content = contacts.render();
});

events.on("contacts:submit", async () => {
    apiModel
        .postOrder({
            items: shoppingModel.getProductsInCart().map((item) => item.id),
            total: shoppingModel.getTotalPriceProductsInCart(),
            ...buyerModel.getBuyerInfo(),
        })
        .then((result) => {
            shoppingModel.clearCart();
            buyerModel.clearBuyerInfo();
            modal.content = success.render({
                total: result.total,
            });

            modal.open();
        })
        .catch((error) => {
            console.log("Ошибка оформления заказа:", error);
        });
});

events.on("order-success:close", () => {
    modal.close();
});

async function fetchCatalog() {
    try {
        const response = await apiModel.getItems();
        productModel.setProducts(response.items);
    } catch (error: unknown) {
        console.error("Ошибка при загрузке каталога:  ", error);
    }
}

fetchCatalog();
