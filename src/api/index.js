import AuthApi from "./authApi";
import CategoryApi from "./categoryApi";
import CustomerApi from "./customerApi";



const apiFactory = {
    authApi: new AuthApi(),
    categoryApi: new CategoryApi(),
    customerApi: new CustomerApi()
};

export default apiFactory;
