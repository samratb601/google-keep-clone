import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function debounce<T extends (...args: any[]) => void>(func: T, timeout = 300): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | undefined;
  return function (this: any, ...args: Parameters<T>): void {
    const context = this;
    if (timer) clearTimeout(timer);
    timer = setTimeout(function () {
      func.apply(context, args);
    }, timeout) as ReturnType<typeof setTimeout>;
  };
}
