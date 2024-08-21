import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatToIDRCurrency = (input: string | number): string => {
  let num: number;

  // Handle input with "Rp", "Rp.", or "rp" prefixes
  if (typeof input === "string") {
    num = parseFloat(input.replace(/^(Rp\.?|rp\.?)/i, "").replace(/,/g, ""));
  } else {
    num = input;
  }

  if (isNaN(num)) return "Invalid number";

  // let formattedNumber;

  // if (num >= 1e12) {
  //   formattedNumber = (num / 1e12).toFixed(1).replace(/\.0$/, "") + "T";
  // } else if (num >= 1e9) {
  //   formattedNumber = (num / 1e9).toFixed(1).replace(/\.0$/, "") + "M";
  // } else if (num >= 1e6) {
  //   formattedNumber = (num / 1e6).toFixed(1).replace(/\.0$/, "") + "JT";
  // } else {
  //   formattedNumber = num.toString();
  // }

  // Format with Indonesian Rupiah currency format
  const formattedCurrency = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(num);

  return `${formattedCurrency}`;
};

export default formatToIDRCurrency;
