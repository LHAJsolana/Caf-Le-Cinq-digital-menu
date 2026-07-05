"use client";
import { products as initial } from "./menu-data"; import { Product } from "./types";
export const STORAGE_KEY="le5-products-v2";
export function getProducts():Product[]{if(typeof window==="undefined")return initial; try{const saved:Product[]=JSON.parse(localStorage.getItem(STORAGE_KEY)||"");if(!saved)return initial;return saved.map(p=>({...p,imageUrl:p.imageUrl||initial.find(x=>x.id===p.id)?.imageUrl}))}catch{return initial}}
export function saveProducts(p:Product[]){localStorage.setItem(STORAGE_KEY,JSON.stringify(p));window.dispatchEvent(new Event("menu-updated"))}
