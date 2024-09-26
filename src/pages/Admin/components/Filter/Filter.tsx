import { useEffect, useState } from "react";
import { Button, DateSelect } from "@components";
import FilterAttribute from "../FilterAttribute/FilterAttribute";
import {
  buttonContainer,
  filterContainer,
  filterTable,
  productSelectStyle,
  rowStyle,
  statusSelectStyle,
} from "./Filter.style";

import "react-datepicker/dist/react-datepicker.css";
import { Dayjs } from "dayjs";
import Select from "react-select";
import { useFetchSailedProduct } from "@apis/domains/admin/useFetchSailedProduct";

interface Option {
  value: string;
  label: string;
}

const statusOptions: Option[] = [
  { value: "접수완료", label: "접수 완료" },
  { value: "결제완료", label: "결제 완료" },
  { value: "결제취소", label: "결제 취소" },
  { value: "발송완료", label: "발송 완료" },
];

interface FilterProps {
  orderReceivedDateRef: React.MutableRefObject<Dayjs | null>;
  deliveryDateRef: React.MutableRefObject<Dayjs | null>;
  productRef: React.MutableRefObject<Option | null>;
  statusRef: React.MutableRefObject<Option | null>;
  handleSearchClick: () => void;
  handleResetClick: () => void;
}

const Filter = ({
  orderReceivedDateRef,
  deliveryDateRef,
  productRef,
  statusRef,
  handleSearchClick,
  handleResetClick,
}: FilterProps) => {
  const [productOptions, setProductOptions] = useState<Option[]>([]);

  const [orderReceivedDate, setOrderReceivedDate] = useState<Dayjs | null>(
    null
  );
  const [deliveryDate, setDeliveryDate] = useState<Dayjs | null>(null);
  const [product, setProduct] = useState<Option | null>(null);
  const [status, setStatus] = useState<Option | null>(null);

  const { isSuccess: isSuccessProduct, data: productData } =
    useFetchSailedProduct();

  useEffect(() => {
    if (isSuccessProduct && productData) {
      const options: Option[] = [
        ...productData.trialSailedProductList.map((product) => ({
          value: product.productName,
          label: product.productName,
        })),
        ...productData.sailedproductList.map((product) => ({
          value: product.productName,
          label: product.productName,
        })),
      ];
      setProductOptions(options);
    }
  }, [isSuccessProduct, productData]);

  return (
    <article css={filterContainer}>
      <div css={filterTable}>
        <div css={rowStyle}>
          <FilterAttribute label="접수 날짜">
            <DateSelect
              selected={orderReceivedDate}
              onChange={(date) => {
                orderReceivedDateRef.current = date;
                setOrderReceivedDate(date);
              }}
            />
          </FilterAttribute>
          <FilterAttribute label="출발 날짜">
            <DateSelect
              selected={deliveryDate}
              onChange={(date) => {
                deliveryDateRef.current = date;
                setDeliveryDate(date);
              }}
            />
          </FilterAttribute>
        </div>
        <div css={rowStyle}>
          <FilterAttribute label="상품">
            <Select
              css={productSelectStyle}
              options={productOptions}
              placeholder="상품을 선택해주세요"
              value={product}
              onChange={(selectedOption) => {
                const selectValue = selectedOption as Option | null;
                productRef.current = selectedOption as Option | null;
                setProduct(selectValue);
              }}
            />
          </FilterAttribute>
        </div>
        <div css={rowStyle}>
          <FilterAttribute label="상태">
            <Select
              css={statusSelectStyle}
              options={statusOptions}
              placeholder="상태을 선택해주세요"
              value={status}
              onChange={(selectedOption) => {
                const selectValue = selectedOption as Option | null;
                statusRef.current = selectValue;
                setStatus(selectValue);
              }}
            />
          </FilterAttribute>
        </div>
      </div>

      <div css={buttonContainer}>
        <Button variant="stroke" onClick={handleResetClick}>
          초기화
        </Button>
        <Button variant="fill" onClick={handleSearchClick}>
          검색
        </Button>
      </div>
    </article>
  );
};

export default Filter;