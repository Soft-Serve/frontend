import { TabWrapper, Button } from "@base";
import type { FC } from "react";
import { SettingsHeader } from "../SettingsHeader";
import { QRCodeSVG } from "qrcode.react";
import { Box, Column, Columns } from "@interface";

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
        <Box>
          <Columns isMarginless isStackingOnMobile={false}>
            <Column className="justify-center">
              <SettingsHeader>QR Code</SettingsHeader>
            </Column>
            <Column columnWidth="small">
              <div className="w-full print:hidden">
                <Button
                  isFullwidth
                  onClick={() => window.print()}
                  size="XXL"
                  themeColour={themeColour}
                  themeTint={themeTint}
                >
                  Print QR Code
                </Button>
              </div>
            </Column>
          </Columns>
        </Box>
      </div>
      <div className="mt-10 w-full print:block">
        <div className="mt-5 flex flex-col items-center justify-center md:col-span-2 md:mt-0">
          <QRCodeSVG size={300} includeMargin value={url} />
        </div>
      </div>
    </TabWrapper>
  );
};
export { QRCodeSettings };
