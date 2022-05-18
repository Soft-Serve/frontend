import { TabWrapper, Card, CardContent } from "@base";
import type { FC } from "react";
import { SettingsHeader } from "../SettingsHeader";

interface Props {
  restaurantSlug: string;
  themeColour: string;
  themeTint: number;
}
const PromotionSettings: FC<Props> = ({ restaurantSlug, themeColour, themeTint }) => {
  return (
    <TabWrapper>
      <Card css="mb-4">
        <CardContent>
          <SettingsHeader>Promotions</SettingsHeader>
        </CardContent>
      </Card>
    </TabWrapper>
  );
};
export { PromotionSettings };
