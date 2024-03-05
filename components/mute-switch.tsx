"use client";

import { FC, useEffect, useState } from "react";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { SwitchProps, useSwitch } from "@nextui-org/switch";
import clsx from "clsx";

import { UnMuteIcon, MuteIcon } from "@/components/icons";

export interface MuteSwitchProps {
  className?: string;
  classNames?: SwitchProps["classNames"];
}

export const MuteSwitch: FC<MuteSwitchProps> = ({ className, classNames }) => {
  const [audioEl, setAudioEl] = useState<HTMLAudioElement | undefined>(
    undefined
  );

  useEffect(() => {
    setAudioEl(
      document.querySelector("#backgroundMusic") as HTMLAudioElement | undefined
    );
  }, []);

  const onChange = () => {
    if (audioEl) {
      audioEl.paused ? audioEl.play() : audioEl.pause();
      setAudioEl(
        document.querySelector("#backgroundMusic") as
          | HTMLAudioElement
          | undefined
      );
    }
  };

  const {
    Component,
    slots,
    isSelected,
    getBaseProps,
    getInputProps,
    getWrapperProps,
  } = useSwitch({
    isSelected: audioEl?.paused,
    onChange,
  });

  return (
    <Component
      {...getBaseProps({
        className: clsx(
          "px-px transition-opacity hover:opacity-80 cursor-pointer",
          className,
          classNames?.base
        ),
      })}
    >
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <div
        {...getWrapperProps()}
        className={slots.wrapper({
          class: clsx(
            [
              "w-auto h-auto",
              "bg-transparent",
              "rounded-lg",
              "flex items-center justify-center",
              "group-data-[selected=true]:bg-transparent",
              "!text-default-500",
              "pt-px",
              "px-0",
              "mx-0",
            ],
            classNames?.wrapper
          ),
        })}
      >
        {!isSelected ? <MuteIcon size={22} /> : <UnMuteIcon size={22} />}
      </div>
    </Component>
  );
};
