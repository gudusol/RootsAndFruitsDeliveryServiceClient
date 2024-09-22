import { Button, Input } from "@components";
import { useOrderPostDataChange } from "@pages/orderInfo/hooks/useOrderPostDataChange";
import {
  addressFormWrapper,
  editReceiverLayout,
  mainSectionStyle,
  receiverSpan,
  zonecodeWrapper,
} from "./EditReceiver.style";
import { buttonSectionStyle } from "@pages/orderInfo/styles";
import { useState } from "react";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { useNavigate } from "react-router-dom";

const scriptUrl =
  "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";

interface DaumPostcodeData {
  address: string;
  addressType: string;
  bname: string;
  buildingName: string;
  zonecode: string;
}
interface EditReceiverProps {
  receiverIndex: number;
}

const EditReceiver = ({ receiverIndex }: EditReceiverProps) => {
  console.log(receiverIndex);
  const { orderPostDataState, handleRecipientInputChange } =
    useOrderPostDataChange();
  const receiver = orderPostDataState.recipientInfo[receiverIndex];
  const navigate = useNavigate();

  const [form, setForm] = useState({
    address: receiver?.recipientAddress || "",
    addressDetail: receiver?.recipientAddressDetail || "",
    zonecode: "",
  });

  const open = useDaumPostcodePopup(scriptUrl);

  const handleComplete = (data: DaumPostcodeData) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setForm((prevForm) => ({
      ...prevForm,
      address: fullAddress,
      zonecode: data.zonecode,
    }));
  };

  const handleButtonClick = () => {
    if (!form.address || !form.addressDetail || !form.zonecode) {
      alert("주소와 상세주소를 모두 입력해주세요.");
      return;
    }

    handleRecipientInputChange(
      {
        target: { value: form.address },
      } as React.ChangeEvent<HTMLInputElement>,
      "recipientAddress",
      receiverIndex
    );
    handleRecipientInputChange(
      {
        target: { value: form.addressDetail },
      } as React.ChangeEvent<HTMLInputElement>,
      "recipientAddressDetail",
      receiverIndex
    );
    navigate("/order-info/check-info");
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };
  return (
    <div css={editReceiverLayout}>
      <span css={receiverSpan}>받는 분</span>
      <section css={mainSectionStyle}>
        <Input
          value={
            orderPostDataState.recipientInfo[receiverIndex]?.recipientName || ""
          }
          onChange={(e) => handleRecipientInputChange(e, "recipientName")}
          type="text"
          placeholder="이름을 입력하세요"
          inputLabel="이름"
        />
        <Input
          value={
            orderPostDataState.recipientInfo[receiverIndex]?.recipientPhone ||
            ""
          }
          onChange={(e) => handleRecipientInputChange(e, "recipientPhone")}
          type="text"
          placeholder="휴대폰 번호를 입력하세요"
          inputLabel="휴대폰 번호"
        />
        <div css={addressFormWrapper}>
          <div css={zonecodeWrapper}>
            <Input
              value={form.zonecode}
              type="text"
              placeholder="우편번호"
              inputLabel="우편번호"
              aria-readonly
            />
            <Button variant="fill" onClick={handleClick}>
              주소 검색
            </Button>
          </div>
          <Input
            value={form.address}
            type="text"
            placeholder="건물, 지번 또는 도로명 검색"
            inputLabel="주소"
            aria-readonly
          />
          <Input
            value={form.addressDetail}
            onChange={(e) =>
              setForm({ ...form, addressDetail: e.target.value })
            }
            name="addressDetail"
            type="text"
            placeholder="상세주소 (예시: 101동 1201호 / 단독주택)"
          />
        </div>
        {/* 선택 상품 넣어야함 */}
      </section>
      <footer css={buttonSectionStyle}>
        <Button variant="fill" onClick={handleButtonClick}>
          수정 완료
        </Button>
      </footer>
    </div>
  );
};

export default EditReceiver;