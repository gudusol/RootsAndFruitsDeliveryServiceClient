import {
  activeTabButtonStyle,
  AdminLayout,
  pageLayout,
  tabButtonStyle,
  tabTextStyle,
  tapLayoutStyle,
} from "./AdminPage.style";
import { useNavigate, useParams } from "react-router-dom";
import { OrderCheck, ProductCheck, DeliveryCheck } from "./";

const Admin = () => {
  const { tab = "order" } = useParams<{ tab: string }>();
  const navigate = useNavigate();

  const handleButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    navigate(`/admin/${event.currentTarget.name}`);
  };

  return (
    <div css={AdminLayout}>
      <div css={tapLayoutStyle}>
        <h1 css={tabTextStyle}>Course</h1>
        <button
          css={[tabButtonStyle, tab === "order" && activeTabButtonStyle]}
          onClick={handleButtonClick}
          name="order"
        >
          주문 조회
        </button>
        <button
          css={[tabButtonStyle, tab === "product" && activeTabButtonStyle]}
          onClick={handleButtonClick}
          name="product"
        >
          상품 조회
        </button>
        <button
          css={[tabButtonStyle, tab === "delivery" && activeTabButtonStyle]}
          onClick={handleButtonClick}
          name="delivery"
        >
          배송 가능 날짜
        </button>
      </div>

      <div css={pageLayout}>
        {tab === "order" && <OrderCheck />}
        {tab === "product" && <ProductCheck />}
        {tab === "delivery" && <DeliveryCheck />}
      </div>
    </div>
  );
};

export default Admin;