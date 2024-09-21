import { routePath } from "@constants";
import OrderInfoPage from "@pages/orderInfo/page/OrderInfoPage/OrderInfoPage";
import { RouteType } from "@types";

const orderInfoRoutes: RouteType[] = [
  {
    path: routePath.ORDER_INFO,
    element: <OrderInfoPage />,
  },
];

export default orderInfoRoutes;