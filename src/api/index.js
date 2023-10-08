import AuthApi from "./authApi";
import AuthorApi from "./authorApi";
import CategoryApi from "./categoryApi";
import CustomerApi from "./customerApi";
import SaleApi from "./saleApi";
import SongApi from "./songApi";



const apiFactory = {
    authApi: new AuthApi(),
    categoryApi: new CategoryApi(),
    customerApi: new CustomerApi(),
    songApi: new SongApi(),
    saleApi: new SaleApi(),
    authorApi: new AuthorApi()
};

export default apiFactory;
