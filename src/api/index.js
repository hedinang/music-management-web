import AuthApi from "./authApi";
import CategoryApi from "./categoryApi";
import CustomerApi from "./customerApi";
import SaleApi from "./saleApi";
import SongApi from "./songApi";



const apiFactory = {
    authApi: new AuthApi(),
    categoryApi: new CategoryApi(),
    customerApi: new CustomerApi(),
    songApi: new SongApi(),
    saleApi: new SaleApi()
};

export default apiFactory;
