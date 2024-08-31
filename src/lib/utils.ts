import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shortenProductName(name: string) {
  // Step 1: Remove category words
  const categoryWords = ["Headphones", "Earphones", "Speakers"];
  categoryWords.forEach((word) => {
    name = name.replace(new RegExp(word, "gi"), "").trim();
  });

  // Step 2: Abbreviate specific terms
  const abbreviations: { [key: string]: string } = {
    Mark: "MK",
    Wireless: " ",
  };
  const words = name.split(" ");

  for (let i = 0; i < words.length; i++) {
    if (abbreviations[words[i]]) {
      words[i] = abbreviations[words[i]];
    }
  }

  // Step 3: Return the shortened name
  return words.join(" ").trim();
}
