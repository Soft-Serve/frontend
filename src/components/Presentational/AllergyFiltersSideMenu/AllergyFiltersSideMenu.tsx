import React from "react";
import type { FC } from "react";
import {
  MobileNavigation,
  MobileNavigationWrapper,
  MobileNavigationProfile,
  AllergyLegend,
} from "@presentational";

interface Props {
  isOpen: boolean;
  onClose: any;
}

const AllergyFiltersSideMenu: FC<Props> = ({ isOpen, onClose }) => {
  return (
    <MobileNavigation isOpen={isOpen} onClose={onClose}>
      <MobileNavigationWrapper>
        <AllergyLegend />
      </MobileNavigationWrapper>
      <MobileNavigationProfile />
    </MobileNavigation>
  );
};

export { AllergyFiltersSideMenu };
