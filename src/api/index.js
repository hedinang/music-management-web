import AuthApi from "./authApi";
import CategoryApi from "./categoryApi";



const apiFactory = {
    authApi: new AuthApi(),
    categoryApi: new CategoryApi(),
};

export default apiFactory;
