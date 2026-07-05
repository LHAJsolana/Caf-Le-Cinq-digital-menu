import { Category, Product } from "./types";
const l=(fr:string,en=fr,ar=fr)=>({fr,en,ar});
export const categories:Category[]=[
 {id:"hot",icon:"☕",name:l("Boissons chaudes","Hot drinks","مشروبات ساخنة"),filter:"Coffee"},
 {id:"juice",icon:"🍊",name:l("Jus de fruits","Fresh juices","عصائر طازجة"),filter:"Juices"},
 {id:"cold",icon:"🥤",name:l("Boissons froides","Cold drinks","مشروبات باردة"),filter:"Cold Drinks"},
 {id:"breakfast",icon:"🍳",name:l("Petits déjeuners","Breakfast","وجبات الفطور"),filter:"Breakfast"},
 {id:"carte",icon:"🥞",name:l("À la carte","À la carte","حسب الطلب"),filter:"Desserts"},
 {id:"omelettes",icon:"🍳",name:l("Omelettes","Omelettes","عجة"),filter:"Breakfast"},
 {id:"extras",icon:"＋",name:l("Suppléments","Extras","إضافات"),filter:"Snacks"}
];
const prices:Record<string,number>={"Café Noir":14,"Café Nespresso":18,"Café au Lait":16,"Café Allongé":15,"Café Séparé":17,"Double Espresso":22,"Lait Chaud":12,"Verveine au Lait":15,"Lipton au Lait":15,"Thé à la Menthe":14,"Thé Chamali":16,"Verveine":14,"Lipton":14,"Lait au Chocolat":17,"Chocolat à l'Ancienne":24,"Cappuccino":22};
const desc=l("Préparé avec soin, servi à la température idéale.","Carefully prepared and served just right.","محضّر بعناية ويُقدّم بدرجة مثالية.");
const slug=(name:string)=>name.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/['’]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");
let n=0; const p=(categoryId:string,name:string,price:number,description=desc,badge?:Product["badge"]):Product=>({id:`p${++n}`,categoryId,name:l(name,name,name),description,price,imageUrl:`/products/${slug(name)}.webp`,badge,available:true,ingredients:l("Ingrédients sélectionnés avec soin.","Carefully selected ingredients.","مكونات مختارة بعناية."),options:["No Sugar","Extra Sugar","Extra Milk","Hot","Cold","Without Ice"]});
export const products:Product[]=[
 ...Object.entries(prices).map(([name,price])=>p("hot",name,price,desc,name==="Cappuccino"?"Popular":undefined)),
 ...["Jus d'Orange","Jus de Citron","Jus Banane Lait","Jus Pomme Lait","Jus Avocat Lait","Jus Fraise Lait","Jus Banane Orange","Jus Pomme Orange","Jus Avocat Orange","Jus Fraise Orange","Jus Mangue","Jus Ananas","Jus Pêche","Panaché Lait","Panaché Orange"].map((x,i)=>p("juice",x,18+(i%4)*2,l("Fruits frais pressés à la commande.","Fresh fruit, pressed to order.","فاكهة طازجة تُعصر عند الطلب."),i===0?"Popular":undefined)),
 ...["Eau Minérale","Soda","Oulmès","Mojito"].map((x,i)=>p("cold",x,[10,14,14,28][i],desc,i===3?"New":undefined)),
 p("breakfast","Classique",38,l("Boisson chaude, jus d'orange, viennoiserie et pain grillé.","Hot drink, orange juice, pastry and toast.","مشروب ساخن، عصير برتقال، كرواسون وخبز محمص.")),
 p("breakfast","Simple",30,l("Boisson chaude, viennoiserie et pain grillé.","Hot drink, pastry and toast.","مشروب ساخن، كرواسون وخبز محمص.")),
 p("breakfast","Gourmand",58,l("Boisson chaude, jus frais, œufs, fromage, charcuterie et viennoiserie.","Hot drink, fresh juice, eggs, cheese, turkey and pastry.","مشروب ساخن، عصير، بيض، جبن، ديك رومي وكرواسون."),"Chef Choice"),
 p("breakfast","Marocain",48,l("Thé à la menthe, jus d'orange, msemen, harcha, miel et amlou.","Mint tea, orange juice, msemen, harcha, honey and amlou.","شاي بالنعناع، عصير برتقال، مسمن، حرشة، عسل وأملو."),"Popular"),
 p("breakfast","Fassi",55,l("Thé, khlii aux œufs, pain maison, olives, miel et huile d'olive.","Tea, eggs with khlii, homemade bread, olives, honey and olive oil.","شاي، بيض بالخليع، خبز الدار، زيتون، عسل وزيت الزيتون.")),
 p("breakfast","Maison",65,l("La sélection complète du Cinq : chaud, frais, salé et sucré.","The complete Le Cinq selection: hot, fresh, savoury and sweet.","تشكيلة لو سانك الكاملة: ساخن، طازج، مالح وحلو."),"Chef Choice"),
 ...[["Crêpe Nutella",26],["Crêpe Nutella Banane",30],["Toast Dinde Fromage",32]].map(([x,v],i)=>p("carte",x as string,v as number,desc,i===0?"Popular":undefined)),
 ...[["Nature",22],["Aux Herbes",25],["Fromage",28],["Khlie",34]].map(([x,v])=>p("omelettes",x as string,v as number,l("Œufs frais, cuits minute et servis moelleux.","Fresh eggs, cooked to order.","بيض طازج محضّر عند الطلب."))),
 ...[["Rghaif",8],["Viennoiserie",10],["Harcha",8]].map(([x,v])=>p("extras",x as string,v as number))
];
