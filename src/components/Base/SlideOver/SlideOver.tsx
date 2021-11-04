import React, { FC, SetStateAction } from "react";
import { Button } from "src/components/Base";
import { SlideTransition } from "@transitions";
import { slideOver, section } from "./styles";

interface Props {
  isSlideOverOpen: boolean;
  setIsSlideOverOpen: (value: SetStateAction<boolean>) => void;
}

const SlideOver: FC<Props> = ({ isSlideOverOpen, setIsSlideOverOpen, children }) => {
  if (isSlideOverOpen) {
    return (
      <section
        className={section.container}
        aria-labelledby="slide-over-title"
        role="dialog"
        aria-modal="true"
      >
        <div className={section.wrapper}>
          {isSlideOverOpen && (
            <SlideTransition isVisible={isSlideOverOpen}>
              <div className={slideOver.container}>
                <div className={slideOver.wrapper}>
                  <div className={slideOver.content}>{children}</div>
                  <div className={slideOver.actions}>
                    <Button
                      type="button"
                      colour="primary"
                      size="M"
                      onClick={() => setIsSlideOverOpen(false)}
                    >
                      close
                    </Button>
                  </div>
                </div>
              </div>
            </SlideTransition>
          )}
        </div>
      </section>
    );
  }
  return null;
};

export { SlideOver };
