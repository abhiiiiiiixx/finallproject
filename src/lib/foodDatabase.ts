export interface FoodItem {
  name: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  alternatives?: string[];
  medicalSuitability?: string[];
}

// Vegetarian Weight Loss food items
export const vegetarianWeightLoss: FoodItem[] = [
 {
    "name": "Moong Dal Chilla",
    "description": "Savory pancakes made from moong dal batter, served with mint chutney",
    "calories": 190,
    "protein": 14,
    "carbs": 22,
    "fat": 5
  },
  {
    "name": "Sprouts Salad",
    "description": "Mixed sprouts with cucumber, tomato, lemon, and spices",
    "calories": 150,
    "protein": 12,
    "carbs": 20,
    "fat": 3
  },
  {
    "name": "Besan Cheela with Veggies",
    "description": "Gram flour pancakes mixed with chopped vegetables",
    "calories": 210,
    "protein": 10,
    "carbs": 24,
    "fat": 6
  },
  {
    "name": "Quinoa Upma",
    "description": "Quinoa cooked with vegetables and mild spices",
    "calories": 230,
    "protein": 9,
    "carbs": 30,
    "fat": 7
  },
  {
    "name": "Vegetable Daliya",
    "description": "Broken wheat porridge with vegetables and spices",
    "calories": 220,
    "protein": 8,
    "carbs": 32,
    "fat": 5
  },
  {
    "name": "Tofu Bhurji",
    "description": "Scrambled tofu cooked with onions, tomatoes, and Indian spices",
    "calories": 200,
    "protein": 18,
    "carbs": 10,
    "fat": 10
  },
  {
    "name": "Palak Paneer (Low-fat)",
    "description": "Low-fat paneer in spinach gravy with minimal oil",
    "calories": 240,
    "protein": 16,
    "carbs": 12,
    "fat": 14
  },
  {
    "name": "Oats Idli",
    "description": "Steamed oats-based idlis with grated veggies",
    "calories": 180,
    "protein": 6,
    "carbs": 28,
    "fat": 4
  },
  {
    "name": "Lauki Soup",
    "description": "Light bottle gourd soup with herbs and black pepper",
    "calories": 90,
    "protein": 4,
    "carbs": 10,
    "fat": 2
  },
  {
    "name": "Ragi Roti with Curd",
    "description": "Finger millet flatbread served with plain low-fat curd",
    "calories": 210,
    "protein": 9,
    "carbs": 22,
    "fat": 7
  }
];

// Vegetarian Weight Gain food items
export const vegetarianWeightGain: FoodItem[] = [
  {
    "name": "Paneer Paratha with Ghee",
    "description": "Whole wheat flatbread stuffed with paneer and topped with ghee",
    "calories": 450,
    "protein": 18,
    "carbs": 40,
    "fat": 22
  },
  {
    "name": "Dry Fruits and Banana Shake",
    "description": "Banana blended with milk, almonds, cashews, and dates",
    "calories": 500,
    "protein": 12,
    "carbs": 60,
    "fat": 22
  },
  {
    "name": "Rajma Chawal with Ghee",
    "description": "Kidney beans curry with white rice and a spoon of ghee",
    "calories": 520,
    "protein": 17,
    "carbs": 60,
    "fat": 20
  },
  {
    "name": "Besan Ladoo",
    "description": "Chickpea flour sweet made with ghee and jaggery",
    "calories": 180,
    "protein": 4,
    "carbs": 18,
    "fat": 10
  },
  {
    "name": "Methi Thepla with Curd",
    "description": "Gujarati flatbread made with fenugreek leaves and served with curd",
    "calories": 330,
    "protein": 10,
    "carbs": 36,
    "fat": 15
  },
  {
    "name": "Vegetable Pulao with Peanuts",
    "description": "Basmati rice with mixed vegetables and roasted peanuts",
    "calories": 440,
    "protein": 10,
    "carbs": 50,
    "fat": 18
  },
  {
    "name": "Sheera (Sooji Halwa)",
    "description": "Semolina dessert prepared in ghee and milk with dry fruits",
    "calories": 380,
    "protein": 6,
    "carbs": 45,
    "fat": 18
  },
  {
    "name": "Chole with Bhature",
    "description": "Spiced chickpea curry served with deep-fried bhature",
    "calories": 600,
    "protein": 16,
    "carbs": 55,
    "fat": 30
  },
  {
    "name": "Stuffed Sweet Potato Tikki",
    "description": "Sweet potato patties stuffed with paneer and dry fruits",
    "calories": 350,
    "protein": 10,
    "carbs": 35,
    "fat": 18
  },
  {
    "name": "Homemade Granola with Curd",
    "description": "Rolled oats, honey, seeds, and nuts mixed with curd",
    "calories": 400,
    "protein": 14,
    "carbs": 40,
    "fat": 20
  }
];

// Vegetarian Maintenance food items
export const vegetarianMaintenance: FoodItem[] = [
  {
    "name": "Vegetable Khichdi",
    "description": "Rice and lentils cooked with mixed vegetables and ghee",
    "calories": 320,
    "protein": 12,
    "carbs": 45,
    "fat": 10
  },
  {
    "name": "Masala Dosa with Sambhar",
    "description": "Crispy rice and lentil crepe filled with spiced potatoes, served with lentil soup",
    "calories": 350,
    "protein": 10,
    "carbs": 50,
    "fat": 12
  },
  {
    "name": "Paneer Tikka Salad",
    "description": "Grilled paneer cubes on a bed of mixed vegetable salad",
    "calories": 300,
    "protein": 18,
    "carbs": 15,
    "fat": 18
  },
  {
    "name": "Vegetable Upma",
    "description": "Semolina cooked with seasonal vegetables and mild spices",
    "calories": 280,
    "protein": 8,
    "carbs": 40,
    "fat": 9
  },
  {
    "name": "Curd Rice",
    "description": "Cooked rice mixed with yogurt, tempered with mustard seeds and curry leaves",
    "calories": 250,
    "protein": 8,
    "carbs": 40,
    "fat": 6
  },
  {
    "name": "Vegetable Pulao with Raita",
    "description": "Basmati rice cooked with mixed vegetables, served with yogurt side",
    "calories": 340,
    "protein": 8,
    "carbs": 50,
    "fat": 10
  },
  {
    "name": "Sattu Paratha",
    "description": "Whole wheat flatbread stuffed with roasted gram flour mix",
    "calories": 320,
    "protein": 12,
    "carbs": 45,
    "fat": 10
  },
  {
    "name": "Mixed Vegetable Uttapam",
    "description": "Thick rice pancake topped with chopped vegetables",
    "calories": 290,
    "protein": 9,
    "carbs": 42,
    "fat": 8
  },
  {
    "name": "Sprouts and Vegetable Sandwich",
    "description": "Whole grain bread sandwich with mixed sprouts and vegetables",
    "calories": 280,
    "protein": 12,
    "carbs": 35,
    "fat": 8
  },
  {
    "name": "Chana Kulcha",
    "description": "Spiced chickpea curry served with leavened bread",
    "calories": 370,
    "protein": 15,
    "carbs": 50,
    "fat": 10
  }
];

// Non-Vegetarian Weight Loss food items
export const nonVegetarianWeightLoss: FoodItem[] = [
  {
    "name": "Grilled Tandoori Chicken Breast",
    "description": "Boneless chicken breast marinated in tandoori spices and grilled",
    "calories": 230,
    "protein": 30,
    "carbs": 4,
    "fat": 10
  },
  {
    "name": "Boiled Egg Whites with Chaat Masala",
    "description": "Boiled egg whites seasoned with salt, pepper, and chaat masala",
    "calories": 80,
    "protein": 14,
    "carbs": 1,
    "fat": 0
  },
  {
    "name": "Chicken Soup (Clear)",
    "description": "Light chicken broth with shredded chicken and vegetables",
    "calories": 120,
    "protein": 15,
    "carbs": 6,
    "fat": 4
  },
  {
    "name": "Fish Tikka (Grilled)",
    "description": "Boneless chunks of fish marinated in spices and grilled",
    "calories": 210,
    "protein": 25,
    "carbs": 3,
    "fat": 12
  },
  {
    "name": "Egg Bhurji (No Oil)",
    "description": "Scrambled eggs with vegetables made with minimal oil",
    "calories": 180,
    "protein": 14,
    "carbs": 6,
    "fat": 10
  },
  {
    "name": "Chicken Salad",
    "description": "Grilled chicken mixed with lettuce, cucumbers, tomatoes, and lemon dressing",
    "calories": 220,
    "protein": 22,
    "carbs": 8,
    "fat": 10
  },
  {
    "name": "Masala Omelette (2 eggs)",
    "description": "Omelette with chopped onions, tomatoes, green chili, and coriander",
    "calories": 200,
    "protein": 12,
    "carbs": 4,
    "fat": 14
  },
  {
    "name": "Boiled Chicken Chaat",
    "description": "Shredded boiled chicken tossed with onion, lemon, and spices",
    "calories": 160,
    "protein": 20,
    "carbs": 4,
    "fat": 7
  },
  {
    "name": "Grilled Prawn Skewers",
    "description": "Prawns marinated in Indian spices and grilled on skewers",
    "calories": 190,
    "protein": 24,
    "carbs": 2,
    "fat": 10
  },
  {
    "name": "Chicken Stir Fry (Oil-free)",
    "description": "Chicken and veggies stir-fried with minimal oil in a non-stick pan",
    "calories": 240,
    "protein": 26,
    "carbs": 10,
    "fat": 8
  }
];

// Non-Vegetarian Weight Gain food items
export const nonVegetarianWeightGain: FoodItem[] = [
  {
    "name": "Butter Chicken with Naan",
    "description": "Chicken cooked in rich tomato and butter gravy, served with butter naan",
    "calories": 650,
    "protein": 40,
    "carbs": 50,
    "fat": 35
  },
  {
    "name": "Mutton Biryani",
    "description": "Fragrant rice cooked with spiced mutton pieces and aromatics",
    "calories": 700,
    "protein": 45,
    "carbs": 60,
    "fat": 30
  },
  {
    "name": "Chicken Kathi Roll",
    "description": "Paratha roll filled with egg and spiced chicken filling",
    "calories": 550,
    "protein": 30,
    "carbs": 45,
    "fat": 28
  },
  {
    "name": "Fish Curry with Coconut Milk",
    "description": "Fish cooked in rich coconut milk gravy with rice",
    "calories": 580,
    "protein": 35,
    "carbs": 40,
    "fat": 30
  },
  {
    "name": "Egg Keema Paratha",
    "description": "Whole wheat flatbread stuffed with spiced egg mince",
    "calories": 500,
    "protein": 25,
    "carbs": 40,
    "fat": 25
  },
  {
    "name": "Mutton Korma with Sheermal",
    "description": "Rich mutton curry served with sweet leavened bread",
    "calories": 750,
    "protein": 45,
    "carbs": 50,
    "fat": 40
  },
  {
    "name": "Chicken Malai Tikka with Rumali Roti",
    "description": "Creamy grilled chicken served with thin flatbread",
    "calories": 620,
    "protein": 50,
    "carbs": 35,
    "fat": 32
  },
  {
    "name": "Keema Pav",
    "description": "Spiced minced meat served with buttered buns",
    "calories": 580,
    "protein": 35,
    "carbs": 40,
    "fat": 30
  },
  {
    "name": "Mughlai Paratha",
    "description": "Layered flatbread stuffed with egg and minced meat",
    "calories": 600,
    "protein": 28,
    "carbs": 45,
    "fat": 32
  },
  {
    "name": "Hyderabadi Haleem",
    "description": "Slow-cooked stew made with meat, lentils, and pounded wheat",
    "calories": 650,
    "protein": 40,
    "carbs": 45,
    "fat": 30
  }
];

// Non-Vegetarian Maintenance food items
export const nonVegetarianMaintenance: FoodItem[] = [
  {
    "name": "Chicken Curry with Brown Rice",
    "description": "Lean chicken cooked in light curry, served with brown rice",
    "calories": 450,
    "protein": 28,
    "carbs": 38,
    "fat": 18
  },
  {
    "name": "Egg Curry with Roti",
    "description": "Boiled eggs simmered in tomato-onion gravy served with whole wheat roti",
    "calories": 420,
    "protein": 20,
    "carbs": 35,
    "fat": 20
  },
  {
    "name": "Fish Curry with Steamed Rice",
    "description": "Lightly spiced fish curry with steamed white rice",
    "calories": 480,
    "protein": 30,
    "carbs": 40,
    "fat": 20
  },
  {
    "name": "Chicken Keema with Multigrain Roti",
    "description": "Minced chicken cooked with peas and Indian spices, served with multigrain roti",
    "calories": 460,
    "protein": 32,
    "carbs": 30,
    "fat": 20
  },
  {
    "name": "Paneer and Chicken Tikka Combo",
    "description": "Mixed grilled paneer and chicken tikka with mint chutney",
    "calories": 400,
    "protein": 30,
    "carbs": 10,
    "fat": 25
  },
  {
    "name": "Oats Chicken Cutlet",
    "description": "Pan-seared chicken cutlets made with oats and spices",
    "calories": 380,
    "protein": 22,
    "carbs": 25,
    "fat": 18
  },
  {
    "name": "Egg Fried Rice (Home-style)",
    "description": "Rice stir-fried with scrambled eggs and vegetables in minimal oil",
    "calories": 460,
    "protein": 16,
    "carbs": 50,
    "fat": 18
  },
  {
    "name": "Chicken Pulao",
    "description": "Basmati rice cooked with chicken, spices, and vegetables",
    "calories": 470,
    "protein": 25,
    "carbs": 45,
    "fat": 20
  },
  {
    "name": "Tandoori Chicken with Curd Dip",
    "description": "Tandoori-spiced chicken drumsticks served with a curd-based dip",
    "calories": 420,
    "protein": 35,
    "carbs": 8,
    "fat": 22
  },
  {
    "name": "Egg & Veggie Wrap",
    "description": "Whole wheat wrap filled with scrambled eggs, veggies, and sauces",
    "calories": 400,
    "protein": 20,
    "carbs": 35,
    "fat": 18
  }
];

// Semi-Vegetarian Weight Loss food items
export const semiVegetarianWeightLoss: FoodItem[] = [
  {
    "name": "Grilled Paneer and Chicken Salad",
    "description": "Mixed greens with grilled paneer cubes and chicken strips in a lemon dressing",
    "calories": 250,
    "protein": 25,
    "carbs": 8,
    "fat": 12
  },
  {
    "name": "Moong Dal and Egg White Bowl",
    "description": "Cooked moong dal topped with boiled egg whites and coriander",
    "calories": 220,
    "protein": 20,
    "carbs": 18,
    "fat": 6
  },
  {
    "name": "Vegetable and Egg Bhurji",
    "description": "Scrambled eggs cooked with tomatoes, onions, and spinach",
    "calories": 200,
    "protein": 14,
    "carbs": 6,
    "fat": 12
  },
  {
    "name": "Curd Rice with Grilled Fish",
    "description": "Low-fat curd rice paired with a small grilled fish fillet",
    "calories": 300,
    "protein": 22,
    "carbs": 28,
    "fat": 10
  },
  {
    "name": "Oats Vegetable Omelette",
    "description": "Omelette made with eggs, oats, and vegetables like spinach and capsicum",
    "calories": 230,
    "protein": 16,
    "carbs": 12,
    "fat": 12
  },
  {
    "name": "Tofu and Boiled Egg Salad",
    "description": "Tofu cubes and sliced boiled eggs mixed with cucumber, lettuce, and lemon juice",
    "calories": 240,
    "protein": 20,
    "carbs": 6,
    "fat": 14
  },
  {
    "name": "Brown Rice Khichdi with Boiled Egg",
    "description": "High-fiber brown rice and moong dal khichdi served with a boiled egg",
    "calories": 290,
    "protein": 18,
    "carbs": 30,
    "fat": 10
  },
  {
    "name": "Grilled Chicken and Vegetable Skewers",
    "description": "Chicken and vegetable pieces grilled on skewers with mild spices",
    "calories": 260,
    "protein": 24,
    "carbs": 6,
    "fat": 14
  },
  {
    "name": "Low-Fat Paneer and Egg Wrap",
    "description": "Whole wheat wrap filled with low-fat paneer and a boiled egg slice",
    "calories": 280,
    "protein": 20,
    "carbs": 20,
    "fat": 14
  },
  {
    "name": "Masoor Dal with Grilled Fish",
    "description": "Protein-rich red lentil dal served with a piece of grilled fish",
    "calories": 300,
    "protein": 26,
    "carbs": 18,
    "fat": 12
  }
];

// Semi-Vegetarian Weight Gain food items
export const semiVegetarianWeightGain: FoodItem[] = [
  {
    "name": "Paneer Bhurji with Boiled Eggs",
    "description": "Scrambled paneer cooked with spices, served with 2 boiled eggs",
    "calories": 480,
    "protein": 28,
    "carbs": 20,
    "fat": 30
  },
  {
    "name": "Egg Curry with Jeera Rice",
    "description": "Spicy egg curry served with aromatic cumin-flavored rice",
    "calories": 520,
    "protein": 24,
    "carbs": 45,
    "fat": 26
  },
  {
    "name": "Banana, Peanut Butter & Boiled Egg Smoothie",
    "description": "High-calorie smoothie blended with banana, peanut butter, milk, and a boiled egg",
    "calories": 550,
    "protein": 22,
    "carbs": 40,
    "fat": 32
  },
  {
    "name": "Tofu and Egg Fried Rice",
    "description": "Fried rice made with tofu, scrambled eggs, and vegetables",
    "calories": 540,
    "protein": 26,
    "carbs": 50,
    "fat": 24
  },
  {
    "name": "Stuffed Paratha with Egg Bhurji",
    "description": "Aloo paratha served with spicy scrambled eggs on the side",
    "calories": 600,
    "protein": 22,
    "carbs": 55,
    "fat": 30
  },
  {
    "name": "Oats and Paneer Cutlets with Egg Dip",
    "description": "Pan-seared oats and paneer patties served with boiled egg slices",
    "calories": 470,
    "protein": 25,
    "carbs": 30,
    "fat": 22
  },
  {
    "name": "Grilled Fish with Mashed Sweet Potatoes",
    "description": "Spiced grilled fish fillet served with mashed sweet potato and herbs",
    "calories": 520,
    "protein": 30,
    "carbs": 36,
    "fat": 26
  },
  {
    "name": "Cheese and Egg Sandwich",
    "description": "Whole grain bread sandwich with cheese, scrambled eggs, and veggies",
    "calories": 510,
    "protein": 24,
    "carbs": 40,
    "fat": 28
  },
  {
    "name": "Boiled Egg and Paneer Chaat",
    "description": "Boiled eggs and paneer cubes tossed in spices, lemon, and onions",
    "calories": 440,
    "protein": 28,
    "carbs": 15,
    "fat": 28
  },
  {
    "name": "Tofu Bhurji with Multigrain Toast",
    "description": "Tofu scrambled with vegetables and spices, served with toasted multigrain bread",
    "calories": 460,
    "protein": 24,
    "carbs": 35,
    "fat": 22
  }
];

// Semi-Vegetarian Maintenance food items
export const semiVegetarianMaintenance: FoodItem[] = [
  {
    "name": "Egg and Vegetable Fried Rice",
    "description": "Rice stir-fried with vegetables and egg with minimal oil",
    "calories": 380,
    "protein": 15,
    "carbs": 50,
    "fat": 12
  },
  {
    "name": "Chicken and Vegetable Soup",
    "description": "Clear soup with chicken pieces and plenty of vegetables",
    "calories": 220,
    "protein": 20,
    "carbs": 15,
    "fat": 8
  },
  {
    "name": "Fish and Lentil Curry",
    "description": "Mixed protein curry with fish and lentils, served with rice",
    "calories": 420,
    "protein": 28,
    "carbs": 40,
    "fat": 15
  },
  {
    "name": "Multigrain Roti with Egg Curry",
    "description": "Mixed grain flatbread served with moderately spiced egg curry",
    "calories": 380,
    "protein": 18,
    "carbs": 40,
    "fat": 15
  },
  {
    "name": "Chicken and Vegetable Wrap",
    "description": "Whole wheat wrap filled with grilled chicken and vegetables",
    "calories": 350,
    "protein": 25,
    "carbs": 30,
    "fat": 14
  },
  {
    "name": "Spinach and Egg Curry",
    "description": "Nutritious curry with spinach and boiled eggs",
    "calories": 320,
    "protein": 16,
    "carbs": 20,
    "fat": 20
  },
  {
    "name": "Fish and Tofu Stir-Fry",
    "description": "Mixed protein stir-fry with mixed vegetables",
    "calories": 340,
    "protein": 30,
    "carbs": 20,
    "fat": 16
  },
  {
    "name": "Egg and Vegetable Uttapam",
    "description": "Rice pancake with eggs and vegetables on top",
    "calories": 360,
    "protein": 15,
    "carbs": 45,
    "fat": 12
  },
  {
    "name": "Chicken and Paneer Kebabs",
    "description": "Mixed grill with both chicken and paneer pieces with mint chutney",
    "calories": 380,
    "protein": 32,
    "carbs": 10,
    "fat": 22
  },
  {
    "name": "Dal and Fish Curry Combo",
    "description": "Balanced meal with lentil curry and light fish curry with rice",
    "calories": 420,
    "protein": 28,
    "carbs": 45,
    "fat": 12
  }
];

// Diabetic Vegetarian Weight Loss food items
export const diabeticVegetarianWeightLoss: FoodItem[] = [
  {
    name: "Methi Paneer Scramble",
    description: "Low-fat paneer scrambled with fenugreek leaves and spices",
    calories: 180,
    protein: 15,
    carbs: 10,
    fat: 8,
    medicalSuitability: ["diabetes"]
  },
  {
    name: "Cucumber and Sprouts Salad",
    description: "Mixed sprouts with cucumber, tomato, and lemon dressing",
    calories: 120,
    protein: 10,
    carbs: 15,
    fat: 2,
    medicalSuitability: ["diabetes"]
  },
  {
    name: "Low GI Ragi Roti",
    description: "Finger millet flatbread made with minimal oil",
    calories: 150,
    protein: 6,
    carbs: 18,
    fat: 4,
    medicalSuitability: ["diabetes"]
  },
  {
    name: "Spinach and Tofu Curry",
    description: "Protein-rich tofu in low-fat spinach gravy",
    calories: 200,
    protein: 18,
    carbs: 12,
    fat: 10,
    medicalSuitability: ["diabetes"]
  },
  {
    name: "Vegetable Quinoa Bowl",
    description: "Low GI quinoa with sautéed vegetables and herbs",
    calories: 210,
    protein: 8,
    carbs: 25,
    fat: 6,
    medicalSuitability: ["diabetes"]
  },
  {
    name: "Bottle Gourd Soup",
    description: "Light and nutritious soup with mild spices",
    calories: 80,
    protein: 3,
    carbs: 8,
    fat: 2,
    medicalSuitability: ["diabetes"]
  },
  {
    name: "Cinnamon Chia Seed Pudding",
    description: "Low sugar chia seeds soaked in almond milk with cinnamon",
    calories: 150,
    protein: 6,
    carbs: 12,
    fat: 8,
    medicalSuitability: ["diabetes"]
  },
  {
    name: "Bitter Gourd Stir Fry",
    description: "Blood sugar regulating bitter gourd sautéed with minimal oil",
    calories: 130,
    protein: 5,
    carbs: 15,
    fat: 4,
    medicalSuitability: ["diabetes"]
  },
  {
    name: "Roasted Makhana (Foxnuts)",
    description: "Low GI snack roasted with minimal oil and spices",
    calories: 140,
    protein: 4,
    carbs: 16,
    fat: 6,
    medicalSuitability: ["diabetes"]
  },
  {
    name: "Low-Sugar Yogurt with Flaxseeds",
    description: "Plain yogurt topped with ground flaxseeds",
    calories: 120,
    protein: 8,
    carbs: 10,
    fat: 5,
    medicalSuitability: ["diabetes"]
  }
];

// Diabetic Vegetarian Weight Gain food items
export const diabeticVegetarianWeightGain: FoodItem[] = [
  {
    name: "Multigrain Paneer Paratha",
    description: "Multigrain flour flatbread stuffed with low-fat paneer",
    calories: 350,
    protein: 18,
    carbs: 32,
    fat: 16,
    medicalSuitability: ["diabetes"]
  },
  {
    name: "Almond and Chia Shake",
    description: "Almond milk blended with chia seeds, protein powder and stevia",
    calories: 300,
    protein: 20,
    carbs: 20,
    fat: 15,
    medicalSuitability: ["diabetes"]
  },
  {
    name: "Rajma with Brown Rice",
    description: "Kidney beans curry with brown rice for slow-release carbs",
    calories: 400,
    protein: 15,
    carbs: 45,
    fat: 12,
    medicalSuitability: ["diabetes"]
  },
  {
    name: "Stevia-sweetened Besan Ladoo",
    description: "Chickpea flour sweet made with olive oil and stevia instead of sugar",
    calories: 150,
    protein: 5,
    carbs: 14,
    fat: 8,
    medicalSuitability: ["diabetes"]
  },
  {
    name: "Paneer and Vegetable Kebabs",
    description: "Grilled paneer and vegetable skewers with low-fat yogurt marinade",
    calories: 280,
    protein: 22,
    carbs: 18,
    fat: 14,
    medicalSuitability: ["diabetes"]
  },
  {
    name: "Millet Vegetable Pulao",
    description: "Low GI millet cooked with mixed vegetables and spices",
    calories: 320,
    protein: 10,
    carbs: 40,
    fat: 12,
    medicalSuitability: ["diabetes"]
  },
  {
    name: "Greek Yogurt with Seeds",
    description: "High-protein Greek yogurt with mixed seeds (chia, flax, pumpkin)",
    calories: 260,
    protein: 20,
    carbs: 14,
    fat: 15,
    medicalSuitability: ["diabetes"]
  },
  {
    name: "Low GI Dal Cheela",
    description: "Thick pancakes made from mixed lentils with vegetables",
    calories: 280,
    protein: 16,
    carbs: 28,
    fat: 10,
    medicalSuitability: ["diabetes"]
  },
  {
    name: "Avocado and Chickpea Salad",
    description: "Protein-rich chickpeas with avocado and olive oil dressing",
    calories: 350,
    protein: 12,
    carbs: 30,
    fat: 20,
    medicalSuitability: ["diabetes"]
  },
  {
    name: "Tofu and Vegetable Stir Fry",
    description: "High-protein tofu with stir-fried vegetables in minimal oil",
    calories: 310,
    protein: 24,
    carbs: 20,
    fat: 14,
    medicalSuitability: ["diabetes"]
  }
];

// Diabetic Vegetarian Maintenance food items
export const diabeticVegetarianMaintenance: FoodItem[] = [
  {
    name: "Methi and Moong Dal Khichdi",
    description: "Low GI split green gram and rice with fenugreek leaves",
    calories: 260,
    protein: 14,
    carbs: 35,
    fat: 6,
    medicalSuitability: ["diabetes"]
  },
  {
    name: "Oats Methi Cheela",
    description: "Savory pancakes made with oats and fenugreek leaves",
    calories: 220,
    protein: 12,
    carbs: 28,
    fat: 6,
    medicalSuitability: ["diabetes"]
  },
  {
    name: "Paneer Tikka Chaat",
    description: "Grilled low-fat paneer with spices and vegetables",
    calories: 280,
    protein: 18,
    carbs: 20,
    fat: 14,
    medicalSuitability: ["diabetes"]
  },
  {
    name: "Brown Rice Vegetable Pulao",
    description: "Brown rice cooked with mix vegetables and mild spices",
    calories: 290,
    protein: 8,
    carbs: 40,
    fat: 8,
    medicalSuitability: ["diabetes"]
  },
  {
    name: "Multigrain Dhokla",
    description: "Steamed savory cake made from mixed grains and mild spices",
    calories: 180,
    protein: 8,
    carbs: 24,
    fat: 4,
    medicalSuitability: ["diabetes"]
  },
  {
    name: "Karela Masala",
    description: "Bitter gourd curry with blood sugar regulating properties",
    calories: 150,
    protein: 6,
    carbs: 14,
    fat: 7,
    medicalSuitability: ["diabetes"]
  },
  {
    name: "Low GI Carrot and Cucumber Raita",
    description: "Cooling yogurt side dish with grated vegetables",
    calories: 120,
    protein: 6,
    carbs: 10,
    fat: 5,
    medicalSuitability: ["diabetes"]
  },
  {
    name: "Steamed Vegetable Momos with Spinach Dough",
    description: "Steamed dumplings with vegetable filling and spinach-infused dough",
    calories: 210,
    protein: 8,
    carbs: 28,
    fat: 6,
    medicalSuitability: ["diabetes"]
  },
  {
    name: "Jowar Roti with Baingan Bharta",
    description: "Sorghum flatbread with smoky eggplant curry",
    calories: 240,
    protein: 10,
    carbs: 32,
    fat: 7,
    medicalSuitability: ["diabetes"]
  },
  {
    name: "Almond Milk Cinnamon Porridge",
    description: "Oats cooked in almond milk with cinnamon and stevia",
    calories: 230,
    protein: 9,
    carbs: 30,
    fat: 8,
    medicalSuitability: ["diabetes"]
  }
];

// Diabetic Non-Vegetarian food options
export const diabeticNonVegetarianWeightLoss: FoodItem[] = [
  {
    name: "Grilled Fish with Broccoli",
    description: "Lightly seasoned grilled fish fillet with steamed broccoli",
    calories: 220,
    protein: 28,
    carbs: 8,
    fat: 9,
    medicalSuitability: ["diabetes"]
  },
  {
    name: "Egg White Omelette with Spinach",
    description: "Egg whites with spinach, tomatoes, and minimal oil",
    calories: 160,
    protein: 20,
    carbs: 6,
    fat: 5,
    medicalSuitability: ["diabetes"]
  },
  {
    name: "Chicken and Vegetable Soup",
    description: "Clear soup with chicken pieces and mixed vegetables",
    calories: 180,
    protein: 22,
    carbs: 12,
    fat: 4,
    medicalSuitability: ["diabetes"]
  },
  {
    name: "Steamed Fish Tikka",
    description: "Fish marinated in spices and steamed instead of fried",
    calories: 200,
    protein: 26,
    carbs: 5,
    fat: 8,
    medicalSuitability: ["diabetes"]
  },
  {
    name: "Grilled Chicken Salad",
    description: "Grilled chicken breast with leafy greens and low-fat dressing",
    calories: 240,
    protein: 30,
    carbs: 10,
    fat: 8,
    medicalSuitability: ["diabetes"]
  }
];

// Diabetic Non-Vegetarian Weight Gain food items
export const diabeticNonVegetarianWeightGain: FoodItem[] = [
  {
    name: "Baked Chicken with Quinoa",
    description: "Protein-rich baked chicken with low GI quinoa",
    calories: 380,
    protein: 32,
    carbs: 25,
    fat: 14,
    medicalSuitability: ["diabetes"]
  },
  {
    name: "Egg and Vegetable Brown Rice Bowl",
    description: "Brown rice topped with boiled eggs and stir-fried vegetables",
    calories: 360,
    protein: 20,
    carbs: 38,
    fat: 12,
    medicalSuitability: ["diabetes"]
  },
  {
    name: "Steamed Fish with Olive Oil",
    description: "Steamed fish with heart-healthy olive oil and herbs",
    calories: 320,
    protein: 28,
    carbs: 8,
    fat: 18,
    medicalSuitability: ["diabetes"]
  },
  {
    name: "Turkey and Vegetable Kebabs",
    description: "Lean turkey pieces with vegetables on skewers",
    calories: 340,
    protein: 36,
    carbs: 12,
    fat: 15,
    medicalSuitability: ["diabetes"]
  },
  {
    name: "Grilled Chicken with Sweet Potato",
    description: "Grilled chicken breast with steamed sweet potato",
    calories: 380,
    protein: 30,
    carbs: 28,
    fat: 12,
    medicalSuitability: ["diabetes"]
  }
];

// Update getRandomFoodItems function to include medical condition parameter
export const getRandomFoodItems = (
  dietPreference: 'vegetarian' | 'non-vegetarian' | 'semi-vegetarian',
  healthGoal: 'weight-loss' | 'weight-gain' | 'maintenance',
  count: number = 5,
  medicalCondition?: string
): FoodItem[] => {
  let foodItemPool: FoodItem[] = [];
  
  // If a medical condition is specified, use condition-specific food items
  if (medicalCondition === 'diabetes') {
    if (dietPreference === 'vegetarian') {
      if (healthGoal === 'weight-loss') {
        foodItemPool = diabeticVegetarianWeightLoss;
      } else if (healthGoal === 'weight-gain') {
        foodItemPool = diabeticVegetarianWeightGain;
      } else {
        foodItemPool = diabeticVegetarianMaintenance;
      }
    } else if (dietPreference === 'non-vegetarian') {
      if (healthGoal === 'weight-loss') {
        foodItemPool = diabeticNonVegetarianWeightLoss;
      } else if (healthGoal === 'weight-gain') {
        foodItemPool = diabeticNonVegetarianWeightGain;
      } else {
        // For maintenance, combine some items
        foodItemPool = [...diabeticNonVegetarianWeightLoss, ...diabeticNonVegetarianWeightGain];
      }
    } else if (dietPreference === 'semi-vegetarian') {
      // For semi-vegetarian, combine vegetarian and some non-vegetarian options
      if (healthGoal === 'weight-loss') {
        foodItemPool = [...diabeticVegetarianWeightLoss, ...diabeticNonVegetarianWeightLoss.slice(0, 3)];
      } else if (healthGoal === 'weight-gain') {
        foodItemPool = [...diabeticVegetarianWeightGain, ...diabeticNonVegetarianWeightGain.slice(0, 3)];
      } else {
        foodItemPool = [...diabeticVegetarianMaintenance, ...diabeticNonVegetarianWeightLoss.slice(0, 2), ...diabeticNonVegetarianWeightGain.slice(0, 2)];
      }
    }
  } else {
    // Use regular food items if no medical condition specified (original logic)
  if (dietPreference === 'vegetarian') {
    if (healthGoal === 'weight-loss') {
      foodItemPool = vegetarianWeightLoss;
    } else if (healthGoal === 'weight-gain') {
      foodItemPool = vegetarianWeightGain;
    } else {
      foodItemPool = vegetarianMaintenance;
    }
  } else if (dietPreference === 'non-vegetarian') {
    if (healthGoal === 'weight-loss') {
      foodItemPool = nonVegetarianWeightLoss;
    } else if (healthGoal === 'weight-gain') {
      foodItemPool = nonVegetarianWeightGain;
    } else {
      foodItemPool = nonVegetarianMaintenance;
    }
  } else if (dietPreference === 'semi-vegetarian') {
    if (healthGoal === 'weight-loss') {
      foodItemPool = semiVegetarianWeightLoss;
    } else if (healthGoal === 'weight-gain') {
      foodItemPool = semiVegetarianWeightGain;
    } else {
      foodItemPool = semiVegetarianMaintenance;
      }
    }
  }
  
  // If the food pool is too small, reuse some items to meet the requested count
  if (foodItemPool.length < count) {
    const repeats = Math.ceil(count / foodItemPool.length);
    foodItemPool = Array(repeats).fill(foodItemPool).flat();
  }
  
  // Shuffle and pick random items
  const shuffled = [...foodItemPool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}; 