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
const prices:Record<string,number>={"Café Noir":13,"Café Nespresso":18,"Café au Lait":16,"Café Allongé":18,"Café Séparé":16,"Double Espresso":18,"Lait Chaud":10,"Verveine au Lait":16,"Lipton au Lait":16,"Thé à la Menthe":15,"Thé Chamali":15,"Verveine":15,"Lipton":14,"Lait au Chocolat":18,"Chocolat à l'Ancienne":22,"Cappuccino":20};
const desc=l("Préparé avec soin, servi à la température idéale.","Carefully prepared and served just right.","محضّر بعناية ويُقدّم بدرجة مثالية.");
const slug=(name:string)=>name.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/['’]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");
let n=0; const p=(categoryId:string,name:string,price:number,description=desc,badge?:Product["badge"],imageSlug?:string):Product=>({id:`p${++n}`,categoryId,name:l(name,name,name),description,price,imageUrl:`/products/${imageSlug||slug(name)}.webp`,badge,available:true,ingredients:l("Ingrédients sélectionnés avec soin.","Carefully selected ingredients.","مكونات مختارة بعناية."),options:["No Sugar","Extra Sugar","Extra Milk","Hot","Cold","Without Ice"]});
export const products:Product[]=[
 ...Object.entries(prices).map(([name,price])=>p("hot",name,price,desc,name==="Cappuccino"?"Popular":undefined)),
 ...["Jus d'Orange","Jus de Citron","Jus Banane Lait","Jus Pomme Lait","Jus Avocat Lait","Jus Fraise Lait","Jus Banane Orange","Jus Pomme Orange","Jus Avocat Orange","Jus Fraise Orange","Jus Mangue","Jus Ananas","Jus Pêche","Panaché Lait","Panaché Orange"].map((x,i)=>p("juice",x,[18,20,17,17,20,20,20,20,23,23,22,22,20,23,25][i],l("Fruits frais pressés à la commande.","Fresh fruit, pressed to order.","فاكهة طازجة تُعصر عند الطلب."),i===0?"Popular":undefined)),
 ...["Eau Minérale","Soda","Oulmès","Mojito"].map((x,i)=>p("cold",x,[8,15,14,22][i],desc,i===3?"New":undefined)),
 p("breakfast","Express",25,l("Jus d'orange, boisson chaude, eau 33 cl, une grande viennoiserie ou deux petites, soupe belboula ou smida.","Orange juice, hot drink, water, pastry and belboula or smida soup.","عصير برتقال، مشروب ساخن، ماء، فطائر وحساء البلبولة أو السميدة."),undefined,"classique"),
 p("breakfast","Continental",28,l("Jus d'orange, boisson chaude, eau 33 cl, toast carré, œufs durs ou fromage et confiture, soupe belboula ou smida.","Orange juice, hot drink, water, toast, boiled eggs or cheese and jam, and soup.","عصير برتقال، مشروب ساخن، ماء، توست، بيض مسلوق أو جبن ومربى، وحساء."),undefined,"simple"),
 p("breakfast","Marocain",32,l("Jus d'orange, boisson chaude, eau 33 cl, harcha, rghaif ou melouia, amlou, miel, fromage, olives noires, huile d'olive et soupe.","Orange juice, hot drink, harcha, rghaif, amlou, honey, cheese, olives, olive oil and soup.","عصير برتقال، مشروب ساخن، حرشة، رغيف، أملو، عسل، جبن، زيتون، زيت الزيتون وحساء."),"Popular","marocain"),
 p("breakfast","Fassi",34,l("Jus d'orange, boisson chaude, eau 33 cl, œufs au khlie, olives noires et soupe belboula ou smida.","Orange juice, hot drink, eggs with khlii, black olives and belboula or smida soup.","عصير برتقال، مشروب ساخن، بيض بالخليع، زيتون أسود وحساء البلبولة أو السميدة."),undefined,"fassi"),
 p("breakfast","Chamali",36,l("Jus d'orange, thé chamali, eau 33 cl, deux œufs au choix, charcuterie, fromage rouge, jben, huile d'olive, olives noires et soupe.","Orange juice, Chamali tea, two eggs, turkey, cheese, jben, olive oil, black olives and soup.","عصير برتقال، شاي شمالي، بيضتان، جبن، زيت الزيتون، زيتون أسود وحساء."),undefined,"gourmand"),
 p("breakfast","Le Cinq",40,l("Jus d'orange, boisson chaude, eau 33 cl, toast aux œufs, charcuterie, fromage rouge, yaourt, olives noires et soupe.","Orange juice, hot drink, egg toast, turkey, cheese, yoghurt, black olives and soup.","عصير برتقال، مشروب ساخن، توست بالبيض، جبن، ياغورت، زيتون أسود وحساء."),"Chef Choice","maison"),
 ...[["Crêpe Nutella",26],["Crêpe Nutella Banane",30],["Toast Dinde Fromage",32]].map(([x,v],i)=>p("carte",x as string,v as number,desc,i===0?"Popular":undefined)),
 ...[["Nature",22],["Aux Herbes",25],["Fromage",28],["Khlie",34]].map(([x,v])=>p("omelettes",x as string,v as number,l("Œufs frais, cuits minute et servis moelleux.","Fresh eggs, cooked to order.","بيض طازج محضّر عند الطلب."))),
 ...[["Rghaif",5],["Viennoiserie",10],["Harcha",8]].map(([x,v])=>p("extras",x as string,v as number))
];
