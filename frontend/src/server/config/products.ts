import type { Option } from "~/types";

import type { Product } from "~/data/db/schema";

export const sortOptions = [
	{ label: "Date: Old to new", value: "createdAt.asc" },
	{
		label: "Date: New to old",
		value: "createdAt.desc",
	},
	{ label: "Price: Low to high", value: "price.asc" },
	{ label: "Price: High to low", value: "price.desc" },
	{
		label: "Alphabetical: A to Z",
		value: "name.asc",
	},
	{
		label: "Alphabetical: Z to A",
		value: "name.desc",
	},
];

export const productCategories = [
	{
		title: "Asian",
		image: "/images/food/asian-food.png",
		subcategories: [
			{
				title: "Chinese",
				description: "Diverse, regional, and rich in flavors.",
				image: "/images/food/chinese-food.png",
				slug: "chinese-food",
			},
			{
				title: "Indian",
				description: "Colorful, aromatic, and diverse.",
				image: "/images/food/indian-food.png",
				slug: "indian-food",
			},
			{
				title: "Japanese",
				description: "Delicate, refined, and balanced.",
				image: "/images/food/japanese-food.png",
				slug: "japanese-food",
			},
			{
				title: "Korean",
				description: "Bold and spicy.",
				image: "/images/food/korean-food.png",
				slug: "korean-food",
			},
			{
				title: "Thai",
				description: "Aromatic, spicy, and harmonious flavors.",
				image: "/images/food/thai-food.png",
				slug: "thai-food",
			},
		],
	},
	{
		title: "Dessert",
		image: "/images/food/dessert.png",
		subcategories: [
			{
				title: "Ice Creams",
				description: "Creamy and indulgent treats for a refreshing dessert.",
				image: "/images/food/ice-creams.png",
				slug: "ice-creams",
			},
			{
				title: "Cakes",
				description: "Decadent and sweet delights for special occasions.",
				image: "/images/food/cakes.png",
				slug: "cakes",
			},
			{
				title: "Puddings",
				description:
					"Smooth and comforting desserts for a satisfying end to a meal.",
				image: "/images/food/puddings.png",
				slug: "puddings",
			},
		],
	},
	{
		title: "Drinks",
		image: "/images/food/drink.png",
		subcategories: [
			{
				title: "Coffee",
				description:
					"A beverage brewed from the roasted and ground seeds of coffee plants",
				image: "/frontend/images/food/coffee-cup.png",
				slug: "coffee",
			},
			{
				title: "Juices",
				description:
					"Beverages made by extracting natural liquid from fruits or vegetables",
				image: "/images/food/juice.png",
				slug: "juices",
			},
			{
				title: "Soft Drinks",
				description: "Nonalcoholic beverages, often carbonated",
				image: "/images/food/soft-drink.png",
				slug: "soft-drinks",
			},
			{
				title: "Teas",
				description:
					"Aromatic beverages prepared by steeping cured or fresh leaves of the tea plant.",
				image: "/images/food/tea.png",
				slug: "teas",
			},
		],
	},
	{
		title: "Western",
		image: "/images/food/burgers.png",
		subcategories: [
			{
				title: "French Cuisine",
				description:
					"Indulge in the flavors of France with our exquisite dishes.",
				image: "/images/food/french-food.png",
				slug: "french-cuisine",
			},
			{
				title: "Italian Cuisine",
				description:
					"Experience the taste of Italy with our authentic Italian dishes.",
				image: "/images/food/italian-cuisine.png",
				slug: "italian-cuisine",
			},
			{
				title: "Spanish Tapas",
				description:
					"Savor the vibrant flavors of Spain with our delicious tapas selection.",
				image: "/images/food/spanish-tapas.png",
				slug: "spanish-tapas",
			},
		],
	},
	{
		title: "Fast Food",
		image: "/images/food/fast-food.png",
		subcategories: [
			{
				title: "Burgers",
				description:
					"Juicy burgers made with premium ingredients for a satisfying meal on the go.",
				image: "/images/food/burgers.png",
				slug: "burgers",
			},
			{
				title: "Pizza",
				description:
					"Delicious pizzas topped with your favorite toppings, hot and fresh.",
				image: "/images/food/pizza.webp",
				slug: "pizza",
			},
			{
				title: "Fried Chicken",
				description:
					"Crispy fried chicken, seasoned to perfection, a classic fast food favorite.",
				image: "/images/food/fried-chicken.webp",
				slug: "fried-chicken",
			},
		],
	},
	{
		title: "Mexican",
		image: "/images/food/mexican.png",
		subcategories: [
			{
				title: "Burritos",
				description:
					"Juicy burgers made with premium ingredients for a satisfying meal on the go.",
				image: "/images/food/burgers.png",
				slug: "burgers",
			},
			{
				title: "Empanadas",
				description:
					"Delicious pizzas topped with your favorite toppings, hot and fresh.",
				image: "/images/food/pizza.webp",
				slug: "pizza",
			},
			{
				title: "Enchiladas",
				description:
					"Crispy fried chicken, seasoned to perfection, a classic fast food favorite.",
				image: "/images/food/fried-chicken.webp",
				slug: "fried-chicken",
			},
			{
				title: "Tacos",
				description:
					"Tasty tacos filled with savory meats and fresh ingredients for a flavor-packed experience.",
				image: "/images/food/tacos.webp",
				slug: "tacos",
			},
		],
	},
] satisfies {
	title: Product["category"];
	image: string;
	subcategories: {
		title: string;
		description?: string;
		image?: string;
		slug: string;
	}[];
}[];

export const productTags = [
	"new",
	"sale",
	"bestseller",
	"featured",
	"popular",
	"trending",
	"limited",
	"exclusive",
];

export function getSubcategories(category?: string): Option[] {
	if (!category) return [];

	const subcategories =
		productCategories
			.find((c) => c.title === category)
			?.subcategories.map((s) => ({
				label: s.title,
				value: s.slug,
			})) ?? [];

	return subcategories;
}
