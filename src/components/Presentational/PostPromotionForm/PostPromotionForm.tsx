import React, { ChangeEvent, FormEvent, useState } from "react";
import type { FC, Dispatch, SetStateAction } from "react";
import { PromotionsData, PROMOTIONS_QUERY } from "@shared";
import { Button, Input, TextBox, Notification, WeekDayToggle } from "@base";
import { XIcon } from "@heroicons/react/solid";
import TimePicker, { TimePickerValue } from "react-time-picker";
import toast from "react-hot-toast";
import { usePostPromotionMutation } from "./PostPromotion.mutation";
import "./style.css";
import { Columns, Container, Column } from "@interface";
interface Props {
  onClose: Dispatch<SetStateAction<boolean>>;
  themeColour: string;
  themeTint: number;
  restaurantSlug: string;
}

enum Times {
  START = "start_time",
  END = "end_time",
}

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
interface NewPromotion {
  name: string;
  description: string;
  start_time: string;
  end_time: string;
  days: string[];
  id: 0;
  restaurant_id: string;
  __typename: string;
}
const PostPromotionForm: FC<Props> = ({ themeColour, themeTint, onClose, restaurantSlug }) => {
  const onSuccess = () => toast.custom(<Notification header="Promotion succesfully added!" />);

  const [input, setInput] = useState<NewPromotion>({
    name: "",
    description: "",
    start_time: "17:00",
    end_time: "21:00",
    days: [],
    id: 0,
    restaurant_id: restaurantSlug,
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

  const isPromoActive = (day: string) => input.days?.some((promoDay: string) => day === promoDay);

  const handleDayChange = (day: string) => {
    if (isPromoActive(day)) {
      setInput(prevState => ({
        ...prevState,
        days: [...prevState.days.filter((weekDay: string) => weekDay !== day)],
      }));
    } else setInput(prevState => ({ ...prevState, days: [...prevState.days, day] }));
  };

  const [postPromotion, { loading }] = usePostPromotionMutation({
    onCompleted: () => {
      onClose(false);
      onSuccess();
    },
    update(cache, { data: postPromotionData }) {
      const { promotions } = cache.readQuery({
        query: PROMOTIONS_QUERY,
        variables: {
          restaurantSlug,
        },
      }) as PromotionsData;

      cache.writeQuery({
        query: PROMOTIONS_QUERY,
        variables: {
          restaurantSlug,
        },
        data: {
          promotions: [...promotions, postPromotionData?.postPromotion],
        },
      });
    },
  });

  const handlePost = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postPromotion({
      variables: {
        input: {
          ...input,
          days: input.days.join(","),
        },
      },
    });
  };

  const renderWeekDays = () =>
    weekdays.map(day => (
      <Column columnWidth="six" key={day}>
        <WeekDayToggle
          handleDayChange={() => handleDayChange(day)}
          day={day}
          themeColour={themeColour}
          themeTint={themeTint}
          isPromoActive={isPromoActive(day)}
        />
      </Column>
    ));

  const isValid = input.name.length && input.description.length && input.days.length;

  const staticContent = (
    <div className="mb-4 flex items-center justify-between">
      <h3 className="mr-4 text-sm font-semibold uppercase tracking-wider text-gray-900">
        Create new promotion
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
  );

  return (
    <Container isScrollable adjustHeight={75} containerWidth="full" staticContent={staticContent}>
      <div className="font-Quicksand">
        <form onSubmit={handlePost} className="mt-4 flex flex-col">
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
          <div className="mt-4 mb-2">
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
          <p>
            <span className="mt-8 text-sm font-semibold text-gray-700">
              Active on the following days:
            </span>
            <span className="text-red-600">*</span>
          </p>
          <Columns isMarginless className="!flex-col">
            {renderWeekDays()}
          </Columns>
          <div className="mt-4 flex w-full justify-start">
            <div className="mr-4">
              <p>
                <span className="text-sm font-semibold text-gray-700">Start time: (24H)</span>
                <span className="text-red-600">*</span>
              </p>
              <TimePicker
                locale="en-US"
                maxDetail="minute"
                format="HH:mm"
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
                <span className="text-sm font-semibold text-gray-700">End time: (24H)</span>
                <span className="text-red-600">*</span>
              </p>
              <TimePicker
                minTime={input.start_time}
                locale="en-US"
                maxDetail="minute"
                format="HH:mm"
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
          <div className="mt-8 w-full">
            <Button
              disabled={!isValid}
              loading={loading}
              type="submit"
              size="XXL"
              isFullwidth
              themeColour={themeColour}
              themeTint={themeTint}
            >
              Add Promotion
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export { PostPromotionForm };
