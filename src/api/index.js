import AuthApi from "./authApi";
import CategoryApi from "./categoryApi";
import CustomerApi from "./customerApi";
import SongApi from "./songApi";



const apiFactory = {
    authApi: new AuthApi(),
    categoryApi: new CategoryApi(),
    customerApi: new CustomerApi(),
    songApi: new SongApi()
};

export default apiFactory;
