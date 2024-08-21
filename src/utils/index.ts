export const formatToIDRCurrency = (input: string | number): string => {
  let num: number;

  // Handle input with "Rp", "Rp.", or "rp" prefixes
  if (typeof input === "string") {
    num = parseFloat(input.replace(/^(Rp\.?|rp\.?)/i, "").replace(/,/g, ""));
  } else {
    num = input;
  }

  if (isNaN(num)) return "Invalid number";

  const formattedCurrency = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(num);

  return `${formattedCurrency}`;
};

export default formatToIDRCurrency;
