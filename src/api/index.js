import AdminApi from "./adminApi";
import AuthApi from "./authApi";
import AuthorApi from "./authorApi";
import CategoryApi from "./categoryApi";
import CustomerApi from "./customerApi";
import DashboardApi from "./dashboardApi";
import SaleApi from "./saleApi";
import SongApi from "./songApi";



const apiFactory = {
    authApi: new AuthApi(),
    categoryApi: new CategoryApi(),
    customerApi: new CustomerApi(),
    adminApi: new AdminApi(),
    songApi: new SongApi(),
    saleApi: new SaleApi(),
    authorApi: new AuthorApi(),
    dashboardApi: new DashboardApi()
};

export default apiFactory;
