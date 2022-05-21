import React, { ChangeEvent, useState } from "react";
import type { FC, Dispatch, SetStateAction } from "react";
import { Promotion } from "@shared";
import { Button, Grid, Input, TextBox } from "@base";
import { XIcon } from "@heroicons/react/solid";
import { WeekDayButton } from "./WeekDayButton";
import TimePicker, { TimePickerValue } from "react-time-picker";
import "./style.css";

interface Props {
  onClose: Dispatch<SetStateAction<boolean>>;
  promotion?: Promotion;
  themeColour: string;
  themeTint: number;
}

enum Times {
  START = "start_time",
  END = "end_time",
}
const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const UpdatePromotionForm: FC<Props> = ({ themeColour, themeTint, promotion, onClose }) => {
  const [input, setInput] = useState({
    name: promotion?.name ?? "",
    description: promotion?.description,
    start_time: new Date(promotion?.start_time ?? ""),
    end_time: new Date(promotion?.end_time ?? ""),
    days: promotion?.days.split(",") ?? [],
    id: promotion?.id ?? 0,
    restaurant_id: promotion?.restaurant_id,
    __typename: "Promotion",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = e.target;
    setInput(prevState => ({ ...prevState, [name]: value }));
  };

  const handleTimeChange = (name: string, e: TimePickerValue) => {
    setInput(prevState => ({
      ...prevState,
      [name]: e,
    }));
  };

  const isPromoActive = (day: string) => input.days?.some(promoDay => day === promoDay);

  const handleDayChange = (day: string) => {
    if (isPromoActive(day)) {
      setInput(prevState => ({
        ...prevState,
        days: [...prevState.days.filter(weekDay => weekDay !== day)],
      }));
    } else {
      setInput(prevState => ({
        ...prevState,
        days: [...prevState.days, day],
      }));
    }
  };

  const renderWeekDays = () =>
    weekdays.map(day => (
      <WeekDayButton
        key={day}
        handleDayChange={handleDayChange}
        day={day}
        themeColour={themeColour}
        themeTint={themeTint}
        isPromoActive={isPromoActive(day)}
      />
    ));

  return (
    <div className="font-Quicksand">
      <div className="flex items-center justify-between">
        <h3 className="mr-4 text-sm font-semibold uppercase tracking-wider text-gray-900">
          Update {input?.name}
        </h3>
        <Button
          onClick={() => onClose(false)}
          themeColour={themeColour}
          themeTint={themeTint}
          size="S"
        >
          <XIcon className="h-5 w-5" />
        </Button>
      </div>
      <form className="mt-4 flex flex-col">
        <Input
          onChange={handleInputChange}
          value={input.name}
          themeColour={themeColour}
          themeTint={themeTint}
          labelText="Name:"
          type="text"
          name="name"
          id="name"
          required
        />
        <div className="mt-4">
          <TextBox
            required
            themeColour={themeColour}
            themeTint={themeTint}
            labelText="Description"
            onChange={handleInputChange}
            value={input.description}
            name="description"
            id="description"
          />
        </div>
        <div className="w-full overflow-scroll">
          <p>
            <span className="mt-8 text-sm font-semibold text-gray-700">
              Active on the following days:
            </span>
            <span className="text-red-600">*</span>
          </p>
          <Grid isSmallGap size="M">
            {renderWeekDays()}
          </Grid>
        </div>
        <div className="mt-4 flex w-full justify-start">
          <div className="mr-4">
            <p>
              <span className="text-sm font-semibold text-gray-700">Start time:</span>
              <span className="text-red-600">*</span>
            </p>
            <TimePicker
              clearIcon={null}
              autoFocus={false}
              disableClock
              name={Times.START}
              onChange={(e: TimePickerValue) => handleTimeChange(Times.START, e)}
              value={input.start_time}
              className={`bg-${themeColour}-${themeTint} border-2 font-bold text-white border-${themeColour}-${themeTint} rounded-md p-1`}
            />
          </div>
          <div>
            <p>
              <span className="text-sm font-semibold text-gray-700">End time:</span>
              <span className="text-red-600">*</span>
            </p>
            <TimePicker
              clearIcon={null}
              autoFocus={false}
              disableClock
              name={Times.END}
              onChange={(e: TimePickerValue) => handleTimeChange(Times.END, e)}
              value={input.end_time}
              className={`bg-${themeColour}-${themeTint} border-2 font-bold text-white border-${themeColour}-${themeTint} rounded-md p-1`}
            />
          </div>
        </div>
        <div className="mt-4 w-full">
          <Button size="XL" isFullwidth themeColour={themeColour} themeTint={themeTint}>
            Update
          </Button>
        </div>
      </form>
    </div>
  );
};

export { UpdatePromotionForm };
