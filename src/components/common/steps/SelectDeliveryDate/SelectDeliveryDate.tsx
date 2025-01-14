import { Button, CustomCalendar, RadioInput } from "@components";
import {
  buttonSectionStyle,
  layoutStyle,
  coloredTextStyle,
  sectionStyle,
  textStyle,
} from "@pages/orderInfo/styles";
import { StepProps } from "@types";
import {
  boldText,
  calendarWrapper,
  mainSectionStyle,
  normalText,
  radioWrapper,
  textWrapper,
} from "./SelectDeliveryDate.style";
import React, { useState } from "react";
import { getTwoDaysLaterDate } from "@utils";
import { useOrderPostDataChange } from "src/hooks/useOrderPostDataChange";
import { useAtom } from "jotai";
import { categoryAtom } from "@stores";

const SelectDeliveryDate = ({ onNext }: StepProps) => {
  const [category] = useAtom(categoryAtom);

  const {
    orderPostDataState,
    currentRecipientIndex,
    handleRecipientInputChange,
  } = useOrderPostDataChange();

  const selectedOption =
    (orderPostDataState.recipientInfo[currentRecipientIndex] ?? {})
      .selectedOption ?? "regular";
  const [selectedDate, setSelectedDate] = useState(getTwoDaysLaterDate());

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleRecipientInputChange(e, "selectedOption");

    if (e.target.value === "regular") {
      setSelectedDate(getTwoDaysLaterDate());
    } else {
      setSelectedDate("");
    }
  };
  const handleDateChange = (date: string) => {
    setSelectedDate(date);
  };
  const handleNextClick = () => {
    if (selectedOption !== "regular" && selectedDate.length < 1) {
      alert("희망 배송일자를 선택해주세요");
      return;
    }
    handleRecipientInputChange(selectedOption, "selectedOption");
    handleRecipientInputChange(selectedDate, "deliveryDate");
    onNext();
  };

  return (
    <div css={layoutStyle}>
      <section css={sectionStyle}>
        <div css={textStyle}>
          희망하는
          <br />
          <span css={coloredTextStyle(category)}>배송일자</span>를 선택해주세요
        </div>
      </section>
      <main css={mainSectionStyle}>
        <section css={radioWrapper}>
          <RadioInput
            name="delivery"
            value="regular"
            checked={selectedOption === "regular"}
            onChange={handleOptionChange}
            label="일반 배송"
          />
          <RadioInput
            name="delivery"
            value="scheduled"
            checked={selectedOption === "scheduled"}
            onChange={handleOptionChange}
            label="예약 배송"
          />
        </section>
        <section css={textWrapper}>
          <span css={normalText}>
            {selectedOption === "regular"
              ? "일반배송은 가능한 가장 빠른 날짜에 발송해드려요."
              : "예약배송은 원하시는 날짜에 맞춰 발송해드려요."}
          </span>
          <span>
            {selectedOption === "regular" && (
              <span css={normalText}>
                보통 배송 출발까지 2일정도 소요되지만,
                <br />
              </span>
            )}
            <span css={boldText}>
              기상 상황에 따라 일정이 변동될 수 있어요.
            </span>
          </span>
        </section>
        <div css={calendarWrapper}>
          {selectedOption === "scheduled" && (
            <CustomCalendar onDateChange={handleDateChange} />
          )}
        </div>
      </main>
      <footer css={buttonSectionStyle}>
        <Button variant="fill" onClick={handleNextClick}>
          다음
        </Button>
      </footer>
    </div>
  );
};

export default SelectDeliveryDate;
