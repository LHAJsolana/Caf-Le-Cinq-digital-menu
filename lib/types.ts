export type Locale = "fr" | "en" | "ar";
export type Localized = Record<Locale, string>;
export type Product = { id:string; categoryId:string; name:Localized; description:Localized; price:number; imageUrl?:string; badge?:"Popular"|"New"|"Chef Choice"|"Vegetarian"|"Spicy"; available?:boolean; ingredients?:Localized; options?:string[] };
export type Category = { id:string; icon:string; name:Localized; filter:string };
