import { TabWrapper, Card, CardContent, Button } from "@base";
import type { FC } from "react";
import { SettingsHeader } from "../SettingsHeader";
import { QRCodeSVG } from "qrcode.react";

interface Props {
  restaurantSlug: string;
  themeColour: string;
  themeTint: number;
}
const QRCodeSettings: FC<Props> = ({ restaurantSlug, themeColour, themeTint }) => {
  const url = `https://softserveapp.com/restaurants/${restaurantSlug}`;
  return (
    <TabWrapper>
      <div className="print:hidden">
        <Card css="mb-4">
          <CardContent>
            <SettingsHeader>QR Code</SettingsHeader>
          </CardContent>
        </Card>
      </div>
      <div className="mt-10 w-full print:block">
        <div className="mt-5 flex flex-col items-center justify-center md:col-span-2 md:mt-0">
          <QRCodeSVG size={300} includeMargin value={url} />
          <div className="w-full print:hidden">
            <Button
              onClick={() => window.print()}
              isFullwidth
              css="mt-4"
              size="XL"
              themeColour={themeColour}
              themeTint={themeTint}
            >
              Print QR Code
            </Button>
          </div>
        </div>
      </div>
    </TabWrapper>
  );
};
export { QRCodeSettings };
