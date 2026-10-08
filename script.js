const worldCuisines = {
  'south-asian': {
    name: 'South Asian',
    cuisines: [
      { id: 'bangladeshi', name: 'Bangladesh', emoji: '🇧🇩', dishes: [
        { name: 'Biryani', ingredients: [
          { name: 'Meat (Beef, Chicken, Goat or Mutton)', qty: 1, unit: 'kg', icon: '🍖' },
          { name: 'Kalijeera / Chinigura / Basmati Rice', qty: 800, unit: 'g', icon: '🍚' },
          { name: 'Bay Leaves', qty: 3, unit: 'pcs', icon: '🍃' },
          { name: 'Cinnamon', qty: 4, unit: 'pcs', icon: '🪵' },
          { name: 'Green Cardamom', qty: 6, unit: 'pcs', icon: '🌱' },
          { name: 'Black Cardamom', qty: 2, unit: 'pcs', icon: '🌰' },
          { name: 'Green Chillies', qty: 14, unit: 'pcs', icon: '🌶️' },
          { name: 'Raisins', qty: 40, unit: 'g', icon: '🍇' },
          { name: 'Onion (sliced)', qty: 250, unit: 'g', icon: '🧅' },
          { name: 'Potato', qty: 300, unit: 'g', icon: '🥔' },
          { name: 'Ginger-Garlic Paste', qty: 30, unit: 'g', icon: '🫚' },
          { name: 'Garam Masala (Gorom Moshla)', qty: 3, unit: 'g', icon: '🌶️' },
          { name: 'Milk Powder', qty: 15, unit: 'g', icon: '🥛' },
          { name: 'Ghee / Mustard Oil', qty: 220, unit: 'g', icon: '🧈' },
          { name: 'Ketchup', qty: 35, unit: 'g', icon: '🍅' },
          { name: 'Yogurt', qty: 60, unit: 'g', icon: '🥣' },
          { name: 'Almonds', qty: 10, unit: 'g', icon: '🌰' },
          { name: 'White Pepper', qty: 1, unit: 'g', icon: '⚪' },
          { name: 'Black Pepper', qty: 1, unit: 'g', icon: '⚫' },
          { name: 'Pistachios', qty: 3, unit: 'g', icon: '🥜' },
          { name: 'Nutmeg', qty: 3, unit: 'g', icon: '🌰' },
          { name: 'Mace', qty: 2, unit: 'pcs', icon: '🌼' },
          { name: 'Poppy Seeds (optional)', qty: 2, unit: 'g', icon: '⚪' }
]},
        { name: 'Hilsa Curry', ingredients: [
          { name: 'Hilsa Fish (cleaned, scaled)', qty: 4, unit: 'pcs', icon: '🐟' },
          { name: 'Mustard Oil', qty: 40, unit: 'g', icon: '🫗' },
          { name: 'Onion', qty: 150, unit: 'g', icon: '🧅' },
          { name: 'Garlic', qty: 12, unit: 'g', icon: '🧄' },
          { name: 'Ginger', qty: 15, unit: 'g', icon: '🫚' },
          { name: 'Tomato', qty: 200, unit: 'g', icon: '🍅' },
          { name: 'Green Chillies', qty: 3, unit: 'pcs', icon: '🌶️' },
          { name: 'Turmeric Powder', qty: 3, unit: 'g', icon: '🟡' },
          { name: 'Red Chilli Powder', qty: 3, unit: 'g', icon: '🌶️' },
          { name: 'Coriander Powder', qty: 3, unit: 'g', icon: '🌿' },
          { name: 'Cumin Powder', qty: 3, unit: 'g', icon: '🟤' },
          { name: 'Salt', qty: 10, unit: 'g', icon: '🧂' },
          { name: 'Fresh Coriander', qty: 30, unit: 'g', icon: '🌱' }
        ]},
        { name: 'Bhuna Khichuri', ingredients: [
          { name: 'Kalijeera / Fragrant Short Grain Rice', qty: 600, unit: 'g', icon: '🍚' }, { name: 'Moong Dal (Split Yellow Lentils)', qty: 100, unit: 'g', icon: '🫘' },
          { name: 'Masoor Dal (Red Lentils)', qty: 200, unit: 'g', icon: '🫘' }, { name: 'Mustard Oil', qty: 40, unit: 'g', icon: '🫗' },
          { name: 'Cooking Oil', qty: 25, unit: 'g', icon: '🫗' }, { name: 'Onion (thinly sliced)', qty: 60, unit: 'g', icon: '🧅' },
          { name: 'Fried Onions', qty: 15, unit: 'g', icon: '🧅' }, { name: 'Garlic Paste', qty: 8, unit: 'g', icon: '🧄' },
          { name: 'Ginger Paste', qty: 15, unit: 'g', icon: '🫚' }, { name: 'Green Chillies', qty: 10, unit: 'pcs', icon: '🌶️' },
          { name: 'Ghee', qty: 15, unit: 'g', icon: '🧈' }, { name: 'Mixed Pickle', qty: 15, unit: 'g', icon: '🥒' },
          { name: 'Shah Jeera (Caraway Seeds)', qty: 1, unit: 'g', icon: '🌾' }, { name: 'Green Cardamom', qty: 4, unit: 'pcs', icon: '🌱' },
          { name: 'Black Cardamom', qty: 1, unit: 'pcs', icon: '🌰' }, { name: 'Cloves', qty: 5, unit: 'pcs', icon: '🌸' },
          { name: 'Cinnamon Sticks', qty: 2, unit: 'pcs', icon: '🪵' }, { name: 'Bay Leaves', qty: 2, unit: 'pcs', icon: '🍃' },
          { name: 'Black Peppercorns', qty: 6, unit: 'pcs', icon: '⚫' }, { name: 'Nutmeg', qty: 2, unit: 'g', icon: '🌰' },
          { name: 'Mace', qty: 1, unit: 'pcs', icon: '🌼' }, { name: 'Coriander Powder', qty: 2, unit: 'g', icon: '🌿' },
          { name: 'Red Chilli Powder', qty: 2, unit: 'g', icon: '🌶️' }, { name: 'Turmeric Powder', qty: 3, unit: 'g', icon: '🟡' },
          { name: 'Roasted Cumin Powder', qty: 3, unit: 'g', icon: '🟤' }, { name: 'Garam Masala', qty: 3, unit: 'g', icon: '🌶️' },
          { name: 'Kewra Water', qty: 1, unit: 'pcs', icon: '🌸' }, { name: 'Salt', qty: 10, unit: 'g', icon: '🧂' },
          { name: 'Fresh Coriander', qty: 20, unit: 'g', icon: '🌱' }
        ]},
        { name: 'Shorshe Ilish', ingredients: [
          { name: 'Hilsa Fish (Ilish, cleaned, scaled)', qty: 8, unit: 'pcs', icon: '🐟' }, { name: 'Mustard Oil', qty: 55, unit: 'g', icon: '🫗' },
          { name: 'Black Mustard Seeds', qty: 20, unit: 'g', icon: '⚫' }, { name: 'Yellow Mustard Seeds', qty: 20, unit: 'g', icon: '🌾' },
          { name: 'Coconut Milk', qty: 200, unit: 'g', icon: '🥥' }, { name: 'Black Cumin (Nigella) Seeds', qty: 2, unit: 'g', icon: '🌱' },
          { name: 'Green Chillies (slit + whole)', qty: 10, unit: 'pcs', icon: '🌶️' }, { name: 'Turmeric Powder', qty: 6, unit: 'g', icon: '🟡' },
          { name: 'Red Chilli Powder', qty: 3, unit: 'g', icon: '🌶️' }, { name: 'Sugar', qty: 2, unit: 'g', icon: '🍬' },
          { name: 'Salt', qty: 10, unit: 'g', icon: '🧂' }
        ]},
        { name: 'Chingri Malai Curry', ingredients: [
          { name: 'Prawns (Chingri, medium)', qty: 500, unit: 'g', icon: '🦐' }, { name: 'Onion', qty: 300, unit: 'g', icon: '🧅' },
          { name: 'Coconut Milk (thick)', qty: 240, unit: 'g', icon: '🥥' }, { name: 'Mustard Oil', qty: 30, unit: 'g', icon: '🫗' },
          { name: 'Garlic Paste', qty: 5, unit: 'g', icon: '🧄' }, { name: 'Ginger Paste', qty: 5, unit: 'g', icon: '🫚' },
          { name: 'Green Chillies', qty: 2, unit: 'pcs', icon: '🌶️' }, { name: 'Dry Red Chillies', qty: 2, unit: 'pcs', icon: '🌶️' },
          { name: 'Turmeric Powder', qty: 1.5, unit: 'g', icon: '🟡' }, { name: 'Cumin Powder', qty: 3, unit: 'g', icon: '🟤' },
          { name: 'Coriander Powder', qty: 1.5, unit: 'g', icon: '🌿' }, { name: 'Kashmiri Chilli Powder', qty: 3, unit: 'g', icon: '🌶️' },
          { name: 'Sugar', qty: 4, unit: 'g', icon: '🍬' }, { name: 'Salt', qty: 10, unit: 'g', icon: '🧂' },
          { name: 'Green Cardamom', qty: 6, unit: 'pcs', icon: '🌱' }, { name: 'Cloves', qty: 4, unit: 'pcs', icon: '🌸' },
          { name: 'Cinnamon Sticks', qty: 4, unit: 'pcs', icon: '🪵' }, { name: 'Black Peppercorns', qty: 1.5, unit: 'g', icon: '⚫' },
          { name: 'Bay Leaves', qty: 2, unit: 'pcs', icon: '🍃' }, { name: 'Cumin Seeds', qty: 1.5, unit: 'g', icon: '🌾' },
          { name: 'Garam Masala', qty: 1, unit: 'g', icon: '🌶️' }

        ]},
        { name: 'Luchi', ingredients: [
          { name: 'All Purpose Flour (Maida)', qty: 200, unit: 'g', icon: '🌾' }, { name: 'Salt', qty: 4, unit: 'g', icon: '🧂' },
          { name: 'Sugar', qty: 10, unit: 'g', icon: '🍬' }, { name: 'Oil', qty: 500, unit: 'g', icon: '🫗' }
        ]}
      ]},
      { id: 'indian', name: 'India', emoji: '🇮🇳', dishes: [
        { name: 'Butter Chicken', ingredients: [
          { name: 'Chicken Thighs (skinless)', qty: 1, unit: 'kg', icon: '🍗' }, { name: 'Yogurt', qty: 120, unit: 'g', icon: '🥛' },
          { name: 'Lemon / Lime', qty: 2, unit: 'pcs', icon: '🍋' }, { name: 'Garlic Paste', qty: 30, unit: 'g', icon: '🧄' },
          { name: 'Ginger Paste', qty: 30, unit: 'g', icon: '🫚' }, { name: 'Garam Masala', qty: 12, unit: 'g', icon: '🌶️' },
          { name: 'Kashmiri Chilli Powder', qty: 12, unit: 'g', icon: '🌶️' }, { name: 'Kasoori Methi (optional)', qty: 1, unit: 'g', icon: '🌿' },
          { name: 'Turmeric Powder', qty: 1.5, unit: 'g', icon: '🟡' }, { name: 'Salt', qty: 10, unit: 'g', icon: '🧂' },
          { name: 'Butter', qty: 70, unit: 'g', icon: '🧈' }, { name: 'Vegetable Oil', qty: 15, unit: 'g', icon: '🫗' },
          { name: 'Roasted Cumin Powder', qty: 6, unit: 'g', icon: '🟤' }, { name: 'Green Chillies', qty: 1, unit: 'pcs', icon: '🌶️' },
          { name: 'Tomato Paste', qty: 180, unit: 'g', icon: '🍅' }, { name: 'Heavy Cream', qty: 240, unit: 'g', icon: '🥛' },
          { name: 'Fresh Coriander', qty: 20, unit: 'g', icon: '🌱' }
        ]},
        { name: 'Tikka Masala', ingredients: [
          { name: 'Chicken Breast', qty: 1.5, unit: 'kg', icon: '🍗' }, { name: 'Yogurt', qty: 0.4, unit: 'kg', icon: '🥛' },
          { name: 'Tomato Sauce', qty: 0.8, unit: 'kg', icon: '🍅' }, { name: 'Heavy Cream', qty: 0.2, unit: 'L', icon: '🥛' }
        ]},
        { name: 'Biryani', ingredients: [
          { name: 'Basmati Rice', qty: 1.5, unit: 'kg', icon: '🍚' }, { name: 'Goat Meat', qty: 1, unit: 'kg', icon: '🍖' },
          { name: 'Onion', qty: 1, unit: 'kg', icon: '🧅' }, { name: 'Yogurt', qty: 0.5, unit: 'kg', icon: '🥛' },
          { name: 'Saffron', qty: 0.01, unit: 'kg', icon: '🌸' }, { name: 'Ghee', qty: 0.3, unit: 'kg', icon: '🧈' },
          { name: 'Biryani Masala', qty: 0.05, unit: 'kg', icon: '🌶️' }, { name: 'Mint', qty: 0.1, unit: 'kg', icon: '🌿' }
        ]},
        { name: 'Samosa', ingredients: [
          { name: 'All-Purpose Flour', qty: 0.5, unit: 'kg', icon: '🌾' }, { name: 'Potato', qty: 1.5, unit: 'kg', icon: '🥔' },
          { name: 'Green Peas', qty: 0.3, unit: 'kg', icon: '🫛' }, { name: 'Cumin Seeds', qty: 0.02, unit: 'kg', icon: '🌿' },
          { name: 'Garam Masala', qty: 0.02, unit: 'kg', icon: '🌶️' }, { name: 'Green Chili', qty: 0.05, unit: 'kg', icon: '🌶️' },
          { name: 'Oil for Frying', qty: 1, unit: 'L', icon: '🫗' }
        ]},
        { name: 'Dosa', ingredients: [
          { name: 'Idli Rice', qty: 0.5, unit: 'kg', icon: '🍚' }, { name: 'Urad Dal', qty: 0.2, unit: 'kg', icon: '🫘' },
          { name: 'Fenugreek Seeds', qty: 0.01, unit: 'kg', icon: '🌿' }, { name: 'Potato', qty: 1, unit: 'kg', icon: '🥔' },
          { name: 'Mustard Seeds', qty: 0.02, unit: 'kg', icon: '🌿' }, { name: 'Curry Leaves', qty: 0.02, unit: 'kg', icon: '🍃' }
        ]},
        { name: 'Palak Paneer', ingredients: [
          { name: 'Spinach', qty: 1, unit: 'kg', icon: '🥬' }, { name: 'Paneer', qty: 0.4, unit: 'kg', icon: '🧀' },
          { name: 'Onion', qty: 0.3, unit: 'kg', icon: '🧅' }, { name: 'Tomato', qty: 0.3, unit: 'kg', icon: '🍅' },
          { name: 'Cream', qty: 0.1, unit: 'L', icon: '🥛' }, { name: 'Ginger-Garlic Paste', qty: 0.05, unit: 'kg', icon: '🫚' }
        ]},
        { name: 'Rogan Josh', ingredients: [
          { name: 'Lamb Shoulder', qty: 1.5, unit: 'kg', icon: '🍖' }, { name: 'Yogurt', qty: 0.4, unit: 'kg', icon: '🥛' },
          { name: 'Onion', qty: 0.5, unit: 'kg', icon: '🧅' }, { name: 'Kashmiri Chili', qty: 0.05, unit: 'kg', icon: '🌶️' },
          { name: 'Fennel Powder', qty: 0.03, unit: 'kg', icon: '🌿' }, { name: 'Cardamom', qty: 0.02, unit: 'kg', icon: '🌿' },
          { name: 'Mustard Oil', qty: 0.2, unit: 'L', icon: '🫗' }
        ]},
        { name: 'Naan', ingredients: [
          { name: 'All-Purpose Flour', qty: 0.5, unit: 'kg', icon: '🌾' }, { name: 'Yogurt', qty: 0.15, unit: 'kg', icon: '🥛' },
          { name: 'Yeast', qty: 0.01, unit: 'kg', icon: '🍞' }, { name: 'Butter', qty: 0.1, unit: 'kg', icon: '🧈' },
          { name: 'Garlic', qty: 0.05, unit: 'kg', icon: '🧄' }, { name: 'Cilantro', qty: 0.03, unit: 'kg', icon: '🌿' }
        ]}
      ]},
      { id: 'pakistani', name: 'Pakistan', emoji: '🇵🇰', dishes: [
        { name: 'Nihari', ingredients: [
          { name: 'Beef Shank', qty: 1.5, unit: 'kg', icon: '🥩' }, { name: 'Bone Marrow', qty: 0.3, unit: 'kg', icon: '🦴' },
          { name: 'Wheat Flour', qty: 0.15, unit: 'kg', icon: '🌾' }, { name: 'Ghee', qty: 0.2, unit: 'kg', icon: '🧈' },
          { name: 'Ginger', qty: 0.1, unit: 'kg', icon: '🫚' }, { name: 'Nihari Masala', qty: 0.05, unit: 'kg', icon: '🌶️' }
        ]},
        { name: 'Karahi', ingredients: [
          { name: 'Chicken', qty: 1.5, unit: 'kg', icon: '🍗' }, { name: 'Tomato', qty: 1, unit: 'kg', icon: '🍅' },
          { name: 'Green Chili', qty: 0.15, unit: 'kg', icon: '🌶️' }, { name: 'Ginger', qty: 0.1, unit: 'kg', icon: '🫚' },
          { name: 'Garlic', qty: 0.08, unit: 'kg', icon: '🧄' }
        ]},
        { name: 'Seekh Kebab', ingredients: [
          { name: 'Minced Lamb', qty: 1, unit: 'kg', icon: '🥩' }, { name: 'Onion', qty: 0.3, unit: 'kg', icon: '🧅' },
          { name: 'Ginger-Garlic Paste', qty: 0.05, unit: 'kg', icon: '🫚' }, { name: 'Green Chili', qty: 0.05, unit: 'kg', icon: '🌶️' },
          { name: 'Cilantro', qty: 0.05, unit: 'kg', icon: '🌿' }, { name: 'Cumin', qty: 0.02, unit: 'kg', icon: '🌿' }
        ]},
        { name: 'Pakora', ingredients: [
          { name: 'Besan (Chickpea Flour)', qty: 0.5, unit: 'kg', icon: '🌾' }, { name: 'Onion', qty: 0.5, unit: 'kg', icon: '🧅' },
          { name: 'Potato', qty: 0.3, unit: 'kg', icon: '🥔' }, { name: 'Spinach', qty: 0.2, unit: 'kg', icon: '🥬' },
          { name: 'Oil for Frying', qty: 1, unit: 'L', icon: '🫗' }
        ]},
        { name: 'Haleem', ingredients: [
          { name: 'Cracked Wheat', qty: 0.5, unit: 'kg', icon: '🌾' }, { name: 'Chana Dal', qty: 0.2, unit: 'kg', icon: '🫘' },
          { name: 'Masoor Dal', qty: 0.1, unit: 'kg', icon: '🫘' }, { name: 'Beef', qty: 1, unit: 'kg', icon: '🥩' },
          { name: 'Ghee', qty: 0.2, unit: 'kg', icon: '🧈' }, { name: 'Fried Onions', qty: 0.2, unit: 'kg', icon: '🧅' }
        ]},
        { name: 'Biryani', ingredients: [
          { name: 'Basmati Rice', qty: 1.5, unit: 'kg', icon: '🍚' }, { name: 'Chicken', qty: 1.5, unit: 'kg', icon: '🍗' },
          { name: 'Onion', qty: 1, unit: 'kg', icon: '🧅' }, { name: 'Yogurt', qty: 0.5, unit: 'kg', icon: '🥛' },
          { name: 'Ghee', qty: 0.3, unit: 'kg', icon: '🧈' }, { name: 'Saffron', qty: 0.01, unit: 'kg', icon: '🌸' }
        ]}
      ]},
      { id: 'srilankan', name: 'Sri Lanka', emoji: '🇱🇰', dishes: [
        { name: 'Lamprais', ingredients: [
          { name: 'Samba Rice', qty: 0.5, unit: 'kg', icon: '🍚' }, { name: 'Beef Curry', qty: 0.5, unit: 'kg', icon: '🥩' },
          { name: 'Chicken Curry', qty: 0.5, unit: 'kg', icon: '🍗' }, { name: 'Banana Leaf', qty: 6, unit: 'pcs', icon: '🍃' }
        ]},
        { name: 'Kottu Roti', ingredients: [
          { name: 'Godamba Roti', qty: 8, unit: 'pcs', icon: '🫓' }, { name: 'Chicken', qty: 0.5, unit: 'kg', icon: '🍗' },
          { name: 'Egg', qty: 3, unit: 'pcs', icon: '🥚' }, { name: 'Cabbage', qty: 0.3, unit: 'kg', icon: '🥬' },
          { name: 'Carrot', qty: 0.2, unit: 'kg', icon: '🥕' }
        ]},
        { name: 'Deviled Chicken', ingredients: [
          { name: 'Chicken', qty: 1, unit: 'kg', icon: '🍗' }, { name: 'Onion', qty: 0.3, unit: 'kg', icon: '🧅' },
          { name: 'Tomato Ketchup', qty: 0.1, unit: 'L', icon: '🍅' }, { name: 'Chili Flakes', qty: 0.03, unit: 'kg', icon: '🌶️' },
          { name: 'Soy Sauce', qty: 0.05, unit: 'L', icon: '🫗' }
        ]},
        { name: 'Hoppers', ingredients: [
          { name: 'Rice Flour', qty: 0.5, unit: 'kg', icon: '🌾' }, { name: 'Coconut Milk', qty: 0.3, unit: 'L', icon: '🥥' },
          { name: 'Yeast', qty: 0.01, unit: 'kg', icon: '🍞' }, { name: 'Egg', qty: 6, unit: 'pcs', icon: '🥚' }
        ]},
        { name: 'Watalappan', ingredients: [
          { name: 'Coconut Milk', qty: 0.5, unit: 'L', icon: '🥥' }, { name: 'Jaggery', qty: 0.3, unit: 'kg', icon: '🍯' },
          { name: 'Egg', qty: 4, unit: 'pcs', icon: '🥚' }, { name: 'Cardamom', qty: 0.01, unit: 'kg', icon: '🌿' },
          { name: 'Cashew Nuts', qty: 0.1, unit: 'kg', icon: '🥜' }
        ]},
        { name: 'Pol Sambol', ingredients: [
          { name: 'Grated Coconut', qty: 0.3, unit: 'kg', icon: '🥥' }, { name: 'Dried Red Chili', qty: 0.05, unit: 'kg', icon: '🌶️' },
          { name: 'Red Onion', qty: 0.1, unit: 'kg', icon: '🧅' }, { name: 'Lime Juice', qty: 0.05, unit: 'L', icon: '🍋' }
        ]}
      ]},
      { id: 'nepali', name: 'Nepal', emoji: '🇳🇵', dishes: [
        { name: 'Momo', ingredients: [
          { name: 'All-Purpose Flour', qty: 0.5, unit: 'kg', icon: '🌾' }, { name: 'Minced Buffalo Meat', qty: 0.5, unit: 'kg', icon: '🥩' },
          { name: 'Onion', qty: 0.3, unit: 'kg', icon: '🧅' }, { name: 'Ginger', qty: 0.05, unit: 'kg', icon: '🫚' },
          { name: 'Garlic', qty: 0.05, unit: 'kg', icon: '🧄' }, { name: 'Cilantro', qty: 0.05, unit: 'kg', icon: '🌿' }
        ]},
        { name: 'Thukpa', ingredients: [
          { name: 'Wheat Noodles', qty: 0.3, unit: 'kg', icon: '🍜' }, { name: 'Chicken', qty: 0.5, unit: 'kg', icon: '🍗' },
          { name: 'Carrot', qty: 0.2, unit: 'kg', icon: '🥕' }, { name: 'Cabbage', qty: 0.2, unit: 'kg', icon: '🥬' },
          { name: 'Tomato', qty: 0.2, unit: 'kg', icon: '🍅' }
        ]},
        { name: 'Gundruk', ingredients: [
          { name: 'Fermented Mustard Greens', qty: 0.5, unit: 'kg', icon: '🥬' }, { name: 'Tomato', qty: 0.2, unit: 'kg', icon: '🍅' },
          { name: 'Onion', qty: 0.1, unit: 'kg', icon: '🧅' }, { name: 'Mustard Oil', qty: 0.05, unit: 'L', icon: '🫗' }
        ]},
        { name: 'Sekuwa', ingredients: [
          { name: 'Goat Meat', qty: 1, unit: 'kg', icon: '🥩' }, { name: 'Onion', qty: 0.2, unit: 'kg', icon: '🧅' },
          { name: 'Ginger-Garlic Paste', qty: 0.05, unit: 'kg', icon: '🫚' }, { name: 'Lemon', qty: 0.1, unit: 'kg', icon: '🍋' }
        ]},
        { name: 'Dum Aloo', ingredients: [
          { name: 'Baby Potato', qty: 1, unit: 'kg', icon: '🥔' }, { name: 'Tomato', qty: 0.3, unit: 'kg', icon: '🍅' },
          { name: 'Yogurt', qty: 0.2, unit: 'kg', icon: '🥛' }, { name: 'Onion', qty: 0.2, unit: 'kg', icon: '🧅' }
        ]},
        { name: 'Chow Mein', ingredients: [
          { name: 'Egg Noodles', qty: 0.3, unit: 'kg', icon: '🍜' }, { name: 'Cabbage', qty: 0.2, unit: 'kg', icon: '🥬' },
          { name: 'Carrot', qty: 0.15, unit: 'kg', icon: '🥕' }, { name: 'Capsicum', qty: 0.15, unit: 'kg', icon: '🫑' },
          { name: 'Soy Sauce', qty: 0.05, unit: 'L', icon: '🫗' }
        ]}
      ]},
      { id: 'afghan', name: 'Afghanistan', emoji: '🇦🇫', dishes: [
        { name: 'Qabuli Palaw', ingredients: [
          { name: 'Basmati Rice', qty: 1.5, unit: 'kg', icon: '🍚' }, { name: 'Lamb', qty: 1, unit: 'kg', icon: '🍖' },
          { name: 'Carrot', qty: 0.5, unit: 'kg', icon: '🥕' }, { name: 'Raisins', qty: 0.15, unit: 'kg', icon: '🍇' },
          { name: 'Pistachios', qty: 0.05, unit: 'kg', icon: '🥜' }, { name: 'Almonds', qty: 0.05, unit: 'kg', icon: '🥜' }
        ]},
        { name: 'Bolani', ingredients: [
          { name: 'All-Purpose Flour', qty: 0.5, unit: 'kg', icon: '🌾' }, { name: 'Potato', qty: 0.5, unit: 'kg', icon: '🥔' },
          { name: 'Green Onion', qty: 0.2, unit: 'kg', icon: '🧅' }, { name: 'Cilantro', qty: 0.05, unit: 'kg', icon: '🌿' }
        ]},
        { name: 'Mantu', ingredients: [
          { name: 'All-Purpose Flour', qty: 0.5, unit: 'kg', icon: '🌾' }, { name: 'Minced Lamb', qty: 0.5, unit: 'kg', icon: '🥩' },
          { name: 'Onion', qty: 0.3, unit: 'kg', icon: '🧅' }, { name: 'Yogurt', qty: 0.3, unit: 'kg', icon: '🥛' },
          { name: 'Tomato Sauce', qty: 0.3, unit: 'kg', icon: '🍅' }
        ]},
        { name: 'Kofta', ingredients: [
          { name: 'Minced Lamb', qty: 1, unit: 'kg', icon: '🥩' }, { name: 'Onion', qty: 0.3, unit: 'kg', icon: '🧅' },
          { name: 'Cilantro', qty: 0.05, unit: 'kg', icon: '🌿' }, { name: 'Cumin', qty: 0.02, unit: 'kg', icon: '🌿' },
          { name: 'Tomato', qty: 0.5, unit: 'kg', icon: '🍅' }
        ]},
        { name: 'Ashak', ingredients: [
          { name: 'All-Purpose Flour', qty: 0.5, unit: 'kg', icon: '🌾' }, { name: 'Leek', qty: 0.5, unit: 'kg', icon: '🧅' },
          { name: 'Minced Beef', qty: 0.3, unit: 'kg', icon: '🥩' }, { name: 'Yogurt', qty: 0.3, unit: 'kg', icon: '🥛' },
          { name: 'Tomato Sauce', qty: 0.3, unit: 'kg', icon: '🍅' }
        ]}
      ]}
    ]
  },
  'east-asian': {
    name: 'East & Southeast Asian',
    cuisines: [
      { id: 'chinese', name: 'China', emoji: '🇨🇳', dishes: [
        { name: 'Fried Rice', ingredients: [
          { name: 'Day-Old Jasmine Rice', qty: 1, unit: 'kg', icon: '🍚' }, { name: 'Egg', qty: 3, unit: 'pcs', icon: '🥚' },
          { name: 'Char Siu (BBQ Pork)', qty: 0.3, unit: 'kg', icon: '🥩' }, { name: 'Shrimp', qty: 0.2, unit: 'kg', icon: '🦐' },
          { name: 'Peas', qty: 0.1, unit: 'kg', icon: '🫛' }, { name: 'Soy Sauce', qty: 0.05, unit: 'L', icon: '🫗' },
          { name: 'Sesame Oil', qty: 0.02, unit: 'L', icon: '🫗' }
        ]},
        { name: 'Mapo Tofu', ingredients: [
          { name: 'Silken Tofu', qty: 0.6, unit: 'kg', icon: '🧈' }, { name: 'Minced Pork', qty: 0.3, unit: 'kg', icon: '🥩' },
          { name: 'Doubanjiang (Chili Bean Paste)', qty: 0.08, unit: 'kg', icon: '🌶️' },
          { name: 'Sichuan Peppercorn', qty: 0.02, unit: 'kg', icon: '🌶️' },
          { name: 'Garlic', qty: 0.03, unit: 'kg', icon: '🧄' }, { name: 'Ginger', qty: 0.02, unit: 'kg', icon: '🫚' }
        ]},
        { name: 'Kung Pao Chicken', ingredients: [
          { name: 'Chicken Thigh', qty: 0.8, unit: 'kg', icon: '🍗' }, { name: 'Roasted Peanuts', qty: 0.15, unit: 'kg', icon: '🥜' },
          { name: 'Dried Red Chili', qty: 0.05, unit: 'kg', icon: '🌶️' },
          { name: 'Sichuan Peppercorn', qty: 0.02, unit: 'kg', icon: '🌶️' },
          { name: 'Soy Sauce', qty: 0.05, unit: 'L', icon: '🫗' }, { name: 'Black Vinegar', qty: 0.03, unit: 'L', icon: '🫗' }
        ]},
        { name: 'Spring Rolls', ingredients: [
          { name: 'Spring Roll Wrappers', qty: 30, unit: 'pcs', icon: '🥟' }, { name: 'Pork', qty: 0.3, unit: 'kg', icon: '🥩' },
          { name: 'Napa Cabbage', qty: 0.3, unit: 'kg', icon: '🥬' }, { name: 'Carrot', qty: 0.15, unit: 'kg', icon: '🥕' },
          { name: 'Oil for Frying', qty: 1, unit: 'L', icon: '🫗' }
        ]},
        { name: 'Peking Duck', ingredients: [
          { name: 'Whole Duck', qty: 2.5, unit: 'kg', icon: '🦆' }, { name: 'Maltose Syrup', qty: 0.1, unit: 'kg', icon: '🍯' },
          { name: 'Hoisin Sauce', qty: 0.1, unit: 'kg', icon: '🫗' },
          { name: 'Mandarin Pancakes', qty: 20, unit: 'pcs', icon: '🥞' },
          { name: 'Scallion', qty: 0.2, unit: 'kg', icon: '🧅' }, { name: 'Cucumber', qty: 0.3, unit: 'kg', icon: '🥒' }
        ]},
        { name: 'Hot Pot', ingredients: [
          { name: 'Beef Sirloin (thinly sliced)', qty: 0.5, unit: 'kg', icon: '🥩' },
          { name: 'Lamb (thinly sliced)', qty: 0.5, unit: 'kg', icon: '🍖' },
          { name: 'Napa Cabbage', qty: 0.5, unit: 'kg', icon: '🥬' },
          { name: 'Enoki Mushroom', qty: 0.2, unit: 'kg', icon: '🍄' },
          { name: 'Tofu', qty: 0.3, unit: 'kg', icon: '🧈' }, { name: 'Fish Balls', qty: 0.3, unit: 'kg', icon: '🐟' },
          { name: 'Hot Pot Broth Base', qty: 0.2, unit: 'kg', icon: '🍲' }
        ]},
        { name: 'Dumplings', ingredients: [
          { name: 'Dumpling Wrappers', qty: 50, unit: 'pcs', icon: '🥟' },
          { name: 'Ground Pork', qty: 0.5, unit: 'kg', icon: '🥩' },
          { name: 'Napa Cabbage', qty: 0.3, unit: 'kg', icon: '🥬' },
          { name: 'Ginger', qty: 0.03, unit: 'kg', icon: '🫚' },
          { name: 'Soy Sauce', qty: 0.03, unit: 'L', icon: '🫗' },
          { name: 'Sesame Oil', qty: 0.02, unit: 'L', icon: '🫗' }
        ]}
      ]},
      { id: 'japanese', name: 'Japan', emoji: '🇯🇵', dishes: [
        { name: 'Sushi', ingredients: [
          { name: 'Sushi Rice (Short-Grain)', qty: 0.5, unit: 'kg', icon: '🍚' },
          { name: 'Rice Vinegar', qty: 0.1, unit: 'L', icon: '🫗' },
          { name: 'Nori (Seaweed Sheets)', qty: 10, unit: 'pcs', icon: '🌿' },
          { name: 'Fresh Salmon Sashimi', qty: 0.3, unit: 'kg', icon: '🐟' },
          { name: 'Fresh Tuna Sashimi', qty: 0.3, unit: 'kg', icon: '🐟' },
          { name: 'Wasabi', qty: 0.03, unit: 'kg', icon: '🟢' },
          { name: 'Soy Sauce', qty: 0.1, unit: 'L', icon: '🫗' },
          { name: 'Pickled Ginger', qty: 0.1, unit: 'kg', icon: '🫚' },
          { name: 'Cucumber', qty: 0.2, unit: 'kg', icon: '🥒' },
          { name: 'Avocado', qty: 0.3, unit: 'kg', icon: '🥑' }
        ]},
        { name: 'Ramen', ingredients: [
          { name: 'Ramen Noodles', qty: 0.4, unit: 'kg', icon: '🍜' },
          { name: 'Pork Belly (Chashu)', qty: 0.5, unit: 'kg', icon: '🥩' },
          { name: 'Chicken Carcass', qty: 1, unit: 'kg', icon: '🍗' },
          { name: 'Pork Bones', qty: 1, unit: 'kg', icon: '🦴' },
          { name: 'Soft-Boiled Egg', qty: 4, unit: 'pcs', icon: '🥚' },
          { name: 'Soy Sauce', qty: 0.1, unit: 'L', icon: '🫗' },
          { name: 'Mirin', qty: 0.05, unit: 'L', icon: '🍶' },
          { name: 'Green Onion', qty: 0.1, unit: 'kg', icon: '🧅' },
          { name: 'Nori', qty: 4, unit: 'pcs', icon: '🌿' },
          { name: 'Bamboo Shoots (Menma)', qty: 0.1, unit: 'kg', icon: '🎋' }
        ]},
        { name: 'Tempura', ingredients: [
          { name: 'Shrimp', qty: 0.5, unit: 'kg', icon: '🦐' },
          { name: 'Sweet Potato', qty: 0.3, unit: 'kg', icon: '🍠' },
          { name: 'Eggplant', qty: 0.2, unit: 'kg', icon: '🍆' },
          { name: 'Cake Flour', qty: 0.2, unit: 'kg', icon: '🌾' },
          { name: 'Egg', qty: 1, unit: 'pcs', icon: '🥚' },
          { name: 'Oil for Frying', qty: 1.5, unit: 'L', icon: '🫗' },
          { name: 'Tentsuyu Dipping Sauce', qty: 0.15, unit: 'L', icon: '🫗' }
        ]},
        { name: 'Tonkatsu', ingredients: [
          { name: 'Pork Loin Cutlet', qty: 0.8, unit: 'kg', icon: '🥩' },
          { name: 'Panko Breadcrumbs', qty: 0.3, unit: 'kg', icon: '🍞' },
          { name: 'Flour', qty: 0.1, unit: 'kg', icon: '🌾' },
          { name: 'Egg', qty: 2, unit: 'pcs', icon: '🥚' },
          { name: 'Cabbage (shredded)', qty: 0.3, unit: 'kg', icon: '🥬' },
          { name: 'Tonkatsu Sauce', qty: 0.1, unit: 'L', icon: '🫗' },
          { name: 'Oil for Frying', qty: 1, unit: 'L', icon: '🫗' }
        ]},
        { name: 'Yakitori', ingredients: [
          { name: 'Chicken Thigh', qty: 0.8, unit: 'kg', icon: '🍗' },
          { name: 'Negi (Japanese Leek)', qty: 0.3, unit: 'kg', icon: '🧅' },
          { name: 'Soy Sauce', qty: 0.1, unit: 'L', icon: '🫗' },
          { name: 'Mirin', qty: 0.1, unit: 'L', icon: '🍶' },
          { name: 'Sake', qty: 0.05, unit: 'L', icon: '🍶' },
          { name: 'Bamboo Skewers', qty: 20, unit: 'pcs', icon: '🥢' }
        ]},
        { name: 'Teriyaki', ingredients: [
          { name: 'Chicken Thigh', qty: 0.8, unit: 'kg', icon: '🍗' },
          { name: 'Soy Sauce', qty: 0.1, unit: 'L', icon: '🫗' },
          { name: 'Mirin', qty: 0.1, unit: 'L', icon: '🍶' },
          { name: 'Sake', qty: 0.05, unit: 'L', icon: '🍶' },
          { name: 'Sugar', qty: 0.05, unit: 'kg', icon: '🍬' },
          { name: 'Sesame Seeds', qty: 0.02, unit: 'kg', icon: '🌱' }
        ]},
        { name: 'Okonomiyaki', ingredients: [
          { name: 'Flour', qty: 0.2, unit: 'kg', icon: '🌾' },
          { name: 'Cabbage', qty: 0.5, unit: 'kg', icon: '🥬' },
          { name: 'Pork Belly', qty: 0.2, unit: 'kg', icon: '🥩' },
          { name: 'Egg', qty: 3, unit: 'pcs', icon: '🥚' },
          { name: 'Dashi Stock', qty: 0.15, unit: 'L', icon: '🍲' },
          { name: 'Okonomiyaki Sauce', qty: 0.1, unit: 'L', icon: '🫗' },
          { name: 'Bonito Flakes', qty: 0.03, unit: 'kg', icon: '🐟' }
        ]}
      ]},
      { id: 'korean', name: 'South Korea', emoji: '🇰🇷', dishes: [
        { name: 'Bibimbap', ingredients: [
          { name: 'Short-Grain Rice', qty: 0.5, unit: 'kg', icon: '🍚' },
          { name: 'Beef Bulgogi', qty: 0.3, unit: 'kg', icon: '🥩' },
          { name: 'Spinach', qty: 0.2, unit: 'kg', icon: '🥬' },
          { name: 'Bean Sprouts', qty: 0.15, unit: 'kg', icon: '🌱' },
          { name: 'Carrot', qty: 0.1, unit: 'kg', icon: '🥕' },
          { name: 'Zucchini', qty: 0.15, unit: 'kg', icon: '🥒' },
          { name: 'Shiitake Mushroom', qty: 0.1, unit: 'kg', icon: '🍄' },
          { name: 'Egg', qty: 2, unit: 'pcs', icon: '🥚' },
          { name: 'Gochujang', qty: 0.05, unit: 'kg', icon: '🌶️' },
          { name: 'Sesame Oil', qty: 0.03, unit: 'L', icon: '🫗' }
        ]},
        { name: 'Bulgogi', ingredients: [
          { name: 'Beef Sirloin (thinly sliced)', qty: 0.8, unit: 'kg', icon: '🥩' },
          { name: 'Soy Sauce', qty: 0.08, unit: 'L', icon: '🫗' },
          { name: 'Asian Pear', qty: 0.3, unit: 'kg', icon: '🍐' },
          { name: 'Sesame Oil', qty: 0.03, unit: 'L', icon: '🫗' },
          { name: 'Sugar', qty: 0.03, unit: 'kg', icon: '🍬' },
          { name: 'Garlic', qty: 0.05, unit: 'kg', icon: '🧄' },
          { name: 'Ginger', qty: 0.02, unit: 'kg', icon: '🫚' },
          { name: 'Lettuce Leaves', qty: 0.3, unit: 'kg', icon: '🥬' }
        ]},
        { name: 'Kimchi', ingredients: [
          { name: 'Napa Cabbage', qty: 2, unit: 'kg', icon: '🥬' },
          { name: 'Korean Radish', qty: 0.3, unit: 'kg', icon: '🥕' },
          { name: 'Gochugaru (Korean Chili Flakes)', qty: 0.15, unit: 'kg', icon: '🌶️' },
          { name: 'Fish Sauce', qty: 0.05, unit: 'L', icon: '🫗' },
          { name: 'Garlic', qty: 0.1, unit: 'kg', icon: '🧄' },
          { name: 'Ginger', qty: 0.03, unit: 'kg', icon: '🫚' },
          { name: 'Green Onion', qty: 0.15, unit: 'kg', icon: '🧅' },
          { name: 'Coarse Sea Salt', qty: 0.15, unit: 'kg', icon: '🧂' }
        ]},
        { name: 'Tteokbokki', ingredients: [
          { name: 'Korean Rice Cakes', qty: 0.5, unit: 'kg', icon: '🍘' },
          { name: 'Fish Cakes', qty: 0.2, unit: 'kg', icon: '🐟' },
          { name: 'Gochujang', qty: 0.08, unit: 'kg', icon: '🌶️' },
          { name: 'Gochugaru', qty: 0.03, unit: 'kg', icon: '🌶️' },
          { name: 'Anchovy Broth', qty: 0.4, unit: 'L', icon: '🍲' },
          { name: 'Green Onion', qty: 0.1, unit: 'kg', icon: '🧅' }
        ]},
        { name: 'Korean BBQ', ingredients: [
          { name: 'Pork Belly (Samgyeopsal)', qty: 1, unit: 'kg', icon: '🥩' },
          { name: 'Beef Short Ribs (Galbi)', qty: 0.8, unit: 'kg', icon: '🥩' },
          { name: 'Lettuce', qty: 0.5, unit: 'kg', icon: '🥬' },
          { name: 'Garlic', qty: 0.1, unit: 'kg', icon: '🧄' },
          { name: 'Ssamjang (Dipping Paste)', qty: 0.1, unit: 'kg', icon: '🌶️' },
          { name: 'Kimchi', qty: 0.3, unit: 'kg', icon: '🥬' }
        ]},
        { name: 'Galbi', ingredients: [
          { name: 'Beef Short Ribs', qty: 1.5, unit: 'kg', icon: '🥩' },
          { name: 'Soy Sauce', qty: 0.1, unit: 'L', icon: '🫗' },
          { name: 'Asian Pear', qty: 0.3, unit: 'kg', icon: '🍐' },
          { name: 'Brown Sugar', qty: 0.05, unit: 'kg', icon: '🍬' },
          { name: 'Sesame Oil', qty: 0.03, unit: 'L', icon: '🫗' },
          { name: 'Garlic', qty: 0.08, unit: 'kg', icon: '🧄' },
          { name: 'Ginger', qty: 0.03, unit: 'kg', icon: '🫚' }
        ]},
        { name: 'Jjajangmyeon', ingredients: [
          { name: 'Fresh Noodles', qty: 0.4, unit: 'kg', icon: '🍜' },
          { name: 'Pork Belly', qty: 0.3, unit: 'kg', icon: '🥩' },
          { name: 'Chunjang (Black Bean Paste)', qty: 0.1, unit: 'kg', icon: '🫘' },
          { name: 'Onion', qty: 0.3, unit: 'kg', icon: '🧅' },
          { name: 'Zucchini', qty: 0.2, unit: 'kg', icon: '🥒' },
          { name: 'Potato', qty: 0.2, unit: 'kg', icon: '🥔' }
        ]}
      ]},
      { id: 'thai', name: 'Thailand', emoji: '🇹🇭', dishes: [
        { name: 'Pad Thai', ingredients: [
          { name: 'Rice Noodles (flat)', qty: 0.3, unit: 'kg', icon: '🍜' },
          { name: 'Shrimp', qty: 0.3, unit: 'kg', icon: '🦐' },
          { name: 'Firm Tofu', qty: 0.2, unit: 'kg', icon: '🧈' },
          { name: 'Egg', qty: 2, unit: 'pcs', icon: '🥚' },
          { name: 'Bean Sprouts', qty: 0.15, unit: 'kg', icon: '🌱' },
          { name: 'Roasted Peanuts', qty: 0.08, unit: 'kg', icon: '🥜' },
          { name: 'Tamarind Paste', qty: 0.05, unit: 'kg', icon: '🟤' },
          { name: 'Fish Sauce', qty: 0.03, unit: 'L', icon: '🫗' },
          { name: 'Palm Sugar', qty: 0.03, unit: 'kg', icon: '🍬' },
          { name: 'Lime', qty: 0.1, unit: 'kg', icon: '🍋' }
        ]},
        { name: 'Tom Yum', ingredients: [
          { name: 'Shrimp', qty: 0.5, unit: 'kg', icon: '🦐' },
          { name: 'Straw Mushroom', qty: 0.15, unit: 'kg', icon: '🍄' },
          { name: 'Lemongrass', qty: 0.1, unit: 'kg', icon: '🌿' },
          { name: 'Galangal', qty: 0.05, unit: 'kg', icon: '🫚' },
          { name: 'Kaffir Lime Leaves', qty: 0.02, unit: 'kg', icon: '🍃' },
          { name: 'Thai Chili', qty: 0.03, unit: 'kg', icon: '🌶️' },
          { name: 'Fish Sauce', qty: 0.03, unit: 'L', icon: '🫗' },
          { name: 'Lime Juice', qty: 0.05, unit: 'L', icon: '🍋' },
          { name: 'Coconut Milk', qty: 0.2, unit: 'L', icon: '🥥' }
        ]},
        { name: 'Green Curry', ingredients: [
          { name: 'Chicken Thigh', qty: 0.8, unit: 'kg', icon: '🍗' },
          { name: 'Coconut Milk', qty: 0.5, unit: 'L', icon: '🥥' },
          { name: 'Green Curry Paste', qty: 0.08, unit: 'kg', icon: '🌶️' },
          { name: 'Thai Eggplant', qty: 0.2, unit: 'kg', icon: '🍆' },
          { name: 'Bamboo Shoots', qty: 0.1, unit: 'kg', icon: '🎋' },
          { name: 'Thai Basil', qty: 0.05, unit: 'kg', icon: '🌿' },
          { name: 'Fish Sauce', qty: 0.03, unit: 'L', icon: '🫗' }
        ]},
        { name: 'Satay', ingredients: [
          { name: 'Chicken Breast', qty: 0.8, unit: 'kg', icon: '🍗' },
          { name: 'Coconut Milk', qty: 0.2, unit: 'L', icon: '🥥' },
          { name: 'Turmeric', qty: 0.02, unit: 'kg', icon: '🟡' },
          { name: 'Peanut Butter', qty: 0.15, unit: 'kg', icon: '🥜' },
          { name: 'Tamarind Paste', qty: 0.03, unit: 'kg', icon: '🟤' },
          { name: 'Bamboo Skewers', qty: 15, unit: 'pcs', icon: '🥢' }
        ]},
        { name: 'Som Tam', ingredients: [
          { name: 'Green Papaya', qty: 0.5, unit: 'kg', icon: '🥭' },
          { name: 'Cherry Tomato', qty: 0.1, unit: 'kg', icon: '🍅' },
          { name: 'Long Bean', qty: 0.1, unit: 'kg', icon: '🫛' },
          { name: 'Roasted Peanuts', qty: 0.05, unit: 'kg', icon: '🥜' },
          { name: 'Thai Chili', qty: 0.02, unit: 'kg', icon: '🌶️' },
          { name: 'Fish Sauce', qty: 0.03, unit: 'L', icon: '🫗' },
          { name: 'Lime Juice', qty: 0.05, unit: 'L', icon: '🍋' },
          { name: 'Palm Sugar', qty: 0.03, unit: 'kg', icon: '🍬' }
        ]},
        { name: 'Larb', ingredients: [
          { name: 'Minced Pork', qty: 0.5, unit: 'kg', icon: '🥩' },
          { name: 'Toasted Rice Powder', qty: 0.03, unit: 'kg', icon: '🍚' },
          { name: 'Lime Juice', qty: 0.05, unit: 'L', icon: '🍋' },
          { name: 'Fish Sauce', qty: 0.03, unit: 'L', icon: '🫗' },
          { name: 'Shallot', qty: 0.1, unit: 'kg', icon: '🧅' },
          { name: 'Mint', qty: 0.05, unit: 'kg', icon: '🌿' },
          { name: 'Cilantro', qty: 0.03, unit: 'kg', icon: '🌿' }
        ]},
        { name: 'Massaman Curry', ingredients: [
          { name: 'Beef Chuck', qty: 0.8, unit: 'kg', icon: '🥩' },
          { name: 'Coconut Milk', qty: 0.5, unit: 'L', icon: '🥥' },
          { name: 'Massaman Curry Paste', qty: 0.08, unit: 'kg', icon: '🌶️' },
          { name: 'Potato', qty: 0.3, unit: 'kg', icon: '🥔' },
          { name: 'Onion', qty: 0.2, unit: 'kg', icon: '🧅' },
          { name: 'Roasted Peanuts', qty: 0.1, unit: 'kg', icon: '🥜' },
          { name: 'Tamarind Paste', qty: 0.03, unit: 'kg', icon: '🟤' }
        ]}
      ]},
      { id: 'vietnamese', name: 'Vietnam', emoji: '🇻🇳', dishes: [
        { name: 'Pho', ingredients: [
          { name: 'Beef Bones', qty: 2, unit: 'kg', icon: '🦴' },
          { name: 'Beef Brisket', qty: 0.5, unit: 'kg', icon: '🥩' },
          { name: 'Rare Steak (thinly sliced)', qty: 0.3, unit: 'kg', icon: '🥩' },
          { name: 'Rice Noodles (flat)', qty: 0.4, unit: 'kg', icon: '🍜' },
          { name: 'Star Anise', qty: 0.01, unit: 'kg', icon: '⭐' },
          { name: 'Cinnamon Stick', qty: 0.01, unit: 'kg', icon: '🌿' },
          { name: 'Charred Onion', qty: 0.2, unit: 'kg', icon: '🧅' },
          { name: 'Charred Ginger', qty: 0.05, unit: 'kg', icon: '🫚' },
          { name: 'Fish Sauce', qty: 0.05, unit: 'L', icon: '🫗' },
          { name: 'Bean Sprouts', qty: 0.2, unit: 'kg', icon: '🌱' },
          { name: 'Thai Basil', qty: 0.05, unit: 'kg', icon: '🌿' },
          { name: 'Lime', qty: 0.1, unit: 'kg', icon: '🍋' }
        ]},
        { name: 'Banh Mi', ingredients: [
          { name: 'Vietnamese Baguette', qty: 4, unit: 'pcs', icon: '🥖' },
          { name: 'Pork Belly', qty: 0.3, unit: 'kg', icon: '🥩' },
          { name: 'Vietnamese Ham (Cha Lua)', qty: 0.2, unit: 'kg', icon: '🥩' },
          { name: 'Pate', qty: 0.1, unit: 'kg', icon: '🍖' },
          { name: 'Pickled Daikon & Carrot', qty: 0.2, unit: 'kg', icon: '🥕' },
          { name: 'Cucumber', qty: 0.15, unit: 'kg', icon: '🥒' },
          { name: 'Cilantro', qty: 0.05, unit: 'kg', icon: '🌿' },
          { name: 'Jalapeño', qty: 0.05, unit: 'kg', icon: '🌶️' }
        ]},
        { name: 'Spring Rolls', ingredients: [
          { name: 'Rice Paper Wrappers', qty: 20, unit: 'pcs', icon: '🥟' },
          { name: 'Shrimp', qty: 0.3, unit: 'kg', icon: '🦐' },
          { name: 'Rice Vermicelli', qty: 0.15, unit: 'kg', icon: '🍜' },
          { name: 'Pork Belly', qty: 0.2, unit: 'kg', icon: '🥩' },
          { name: 'Lettuce', qty: 0.2, unit: 'kg', icon: '🥬' },
          { name: 'Mint', qty: 0.05, unit: 'kg', icon: '🌿' },
          { name: 'Hoisin-Peanut Dipping Sauce', qty: 0.15, unit: 'L', icon: '🫗' }
        ]},
        { name: 'Bun Cha', ingredients: [
          { name: 'Pork Belly', qty: 0.4, unit: 'kg', icon: '🥩' },
          { name: 'Ground Pork Patties', qty: 0.3, unit: 'kg', icon: '🥩' },
          { name: 'Rice Vermicelli', qty: 0.3, unit: 'kg', icon: '🍜' },
          { name: 'Fish Sauce', qty: 0.05, unit: 'L', icon: '🫗' },
          { name: 'Rice Vinegar', qty: 0.03, unit: 'L', icon: '🫗' },
          { name: 'Lettuce', qty: 0.2, unit: 'kg', icon: '🥬' },
          { name: 'Mint', qty: 0.05, unit: 'kg', icon: '🌿' }
        ]},
        { name: 'Caramel Pork', ingredients: [
          { name: 'Pork Belly', qty: 0.8, unit: 'kg', icon: '🥩' },
          { name: 'Sugar', qty: 0.1, unit: 'kg', icon: '🍬' },
          { name: 'Fish Sauce', qty: 0.05, unit: 'L', icon: '🫗' },
          { name: 'Coconut Water', qty: 0.3, unit: 'L', icon: '🥥' },
          { name: 'Shallot', qty: 0.1, unit: 'kg', icon: '🧅' }
        ]}
      ]},
      { id: 'laotian', name: 'Laos', emoji: '🇱🇦', dishes: [
        { name: 'Larb', ingredients: [
          { name: 'Minced Chicken', qty: 0.5, unit: 'kg', icon: '🍗' },
          { name: 'Toasted Sticky Rice Powder', qty: 0.05, unit: 'kg', icon: '🍚' },
          { name: 'Lime Juice', qty: 0.05, unit: 'L', icon: '🍋' },
          { name: 'Fish Sauce', qty: 0.03, unit: 'L', icon: '🫗' },
          { name: 'Shallot', qty: 0.1, unit: 'kg', icon: '🧅' },
          { name: 'Mint', qty: 0.05, unit: 'kg', icon: '🌿' }
        ]},
        { name: 'Sticky Rice', ingredients: [
          { name: 'Glutinous Rice', qty: 1, unit: 'kg', icon: '🍚' }
        ]},
        { name: 'Tam Som', ingredients: [
          { name: 'Green Papaya', qty: 0.5, unit: 'kg', icon: '🥭' },
          { name: 'Cherry Tomato', qty: 0.1, unit: 'kg', icon: '🍅' },
          { name: 'Lime', qty: 0.1, unit: 'kg', icon: '🍋' },
          { name: 'Fish Sauce', qty: 0.03, unit: 'L', icon: '🫗' },
          { name: 'Peanuts', qty: 0.05, unit: 'kg', icon: '🥜' }
        ]},
        { name: 'Sai Oua', ingredients: [
          { name: 'Ground Pork', qty: 0.8, unit: 'kg', icon: '🥩' },
          { name: 'Lemongrass', qty: 0.05, unit: 'kg', icon: '🌿' },
          { name: 'Galangal', qty: 0.03, unit: 'kg', icon: '🫚' },
          { name: 'Kaffir Lime Leaves', qty: 0.01, unit: 'kg', icon: '🍃' },
          { name: 'Shallot', qty: 0.1, unit: 'kg', icon: '🧅' },
          { name: 'Sausage Casings', qty: 0.1, unit: 'kg', icon: '🫗' }
        ]},
        { name: 'Khao Poon', ingredients: [
          { name: 'Rice Vermicelli', qty: 0.3, unit: 'kg', icon: '🍜' },
          { name: 'Chicken', qty: 0.5, unit: 'kg', icon: '🍗' },
          { name: 'Coconut Milk', qty: 0.4, unit: 'L', icon: '🥥' },
          { name: 'Red Curry Paste', qty: 0.05, unit: 'kg', icon: '🌶️' }
        ]}
      ]},
      { id: 'cambodian', name: 'Cambodia', emoji: '🇰🇭', dishes: [
        { name: 'Amok', ingredients: [
          { name: 'White Fish Fillet', qty: 0.6, unit: 'kg', icon: '🐟' },
          { name: 'Coconut Milk', qty: 0.3, unit: 'L', icon: '🥥' },
          { name: 'Kroeung (Curry Paste)', qty: 0.08, unit: 'kg', icon: '🌶️' },
          { name: 'Egg', qty: 1, unit: 'pcs', icon: '🥚' },
          { name: 'Banana Leaf Cups', qty: 4, unit: 'pcs', icon: '🍃' }
        ]},
        { name: 'Lok Lak', ingredients: [
          { name: 'Beef Sirloin', qty: 0.6, unit: 'kg', icon: '🥩' },
          { name: 'Soy Sauce', qty: 0.03, unit: 'L', icon: '🫗' },
          { name: 'Oyster Sauce', qty: 0.03, unit: 'L', icon: '🫗' },
          { name: 'Lettuce', qty: 0.2, unit: 'kg', icon: '🥬' },
          { name: 'Tomato', qty: 0.15, unit: 'kg', icon: '🍅' },
          { name: 'Steamed Rice', qty: 0.5, unit: 'kg', icon: '🍚' }
        ]},
        { name: 'Nom Banh Chok', ingredients: [
          { name: 'Rice Noodles', qty: 0.3, unit: 'kg', icon: '🍜' },
          { name: 'Fish', qty: 0.4, unit: 'kg', icon: '🐟' },
          { name: 'Coconut Milk', qty: 0.3, unit: 'L', icon: '🥥' },
          { name: 'Lemongrass', qty: 0.05, unit: 'kg', icon: '🌿' },
          { name: 'Turmeric', qty: 0.02, unit: 'kg', icon: '🟡' }
        ]}
      ]},
      { id: 'malaysian', name: 'Malaysia', emoji: '🇲🇾', dishes: [
        { name: 'Rendang', ingredients: [
          { name: 'Beef Chuck', qty: 1, unit: 'kg', icon: '🥩' },
          { name: 'Coconut Milk', qty: 0.5, unit: 'L', icon: '🥥' },
          { name: 'Toasted Coconut (Kerisik)', qty: 0.1, unit: 'kg', icon: '🥥' },
          { name: 'Lemongrass', qty: 0.08, unit: 'kg', icon: '🌿' },
          { name: 'Galangal', qty: 0.03, unit: 'kg', icon: '🫚' },
          { name: 'Kaffir Lime Leaves', qty: 0.01, unit: 'kg', icon: '🍃' },
          { name: 'Shallot', qty: 0.15, unit: 'kg', icon: '🧅' },
          { name: 'Garlic', qty: 0.05, unit: 'kg', icon: '🧄' },
          { name: 'Dried Chili', qty: 0.05, unit: 'kg', icon: '🌶️' }
        ]},
        { name: 'Nasi Lemak', ingredients: [
          { name: 'Jasmine Rice', qty: 0.5, unit: 'kg', icon: '🍚' },
          { name: 'Coconut Milk', qty: 0.3, unit: 'L', icon: '🥥' },
          { name: 'Pandan Leaves', qty: 0.02, unit: 'kg', icon: '🍃' },
          { name: 'Sambal', qty: 0.15, unit: 'kg', icon: '🌶️' },
          { name: 'Anchovies (Ikan Bilis)', qty: 0.1, unit: 'kg', icon: '🐟' },
          { name: 'Roasted Peanuts', qty: 0.1, unit: 'kg', icon: '🥜' },
          { name: 'Hard-Boiled Egg', qty: 4, unit: 'pcs', icon: '🥚' },
          { name: 'Cucumber', qty: 0.2, unit: 'kg', icon: '🥒' }
        ]},
        { name: 'Roti Canai', ingredients: [
          { name: 'All-Purpose Flour', qty: 0.5, unit: 'kg', icon: '🌾' },
          { name: 'Ghee', qty: 0.15, unit: 'kg', icon: '🧈' },
          { name: 'Condensed Milk', qty: 0.05, unit: 'L', icon: '🥛' },
          { name: 'Egg', qty: 1, unit: 'pcs', icon: '🥚' },
          { name: 'Dhal Curry', qty: 0.3, unit: 'L', icon: '🍛' }
        ]}
      ]},
      { id: 'indonesian', name: 'Indonesia', emoji: '🇮🇩', dishes: [
        { name: 'Rendang', ingredients: [
          { name: 'Beef', qty: 1, unit: 'kg', icon: '🥩' },
          { name: 'Coconut Milk', qty: 0.6, unit: 'L', icon: '🥥' },
          { name: 'Lemongrass', qty: 0.08, unit: 'kg', icon: '🌿' },
          { name: 'Galangal', qty: 0.03, unit: 'kg', icon: '🫚' },
          { name: 'Kaffir Lime Leaves', qty: 0.01, unit: 'kg', icon: '🍃' },
          { name: 'Shallot', qty: 0.15, unit: 'kg', icon: '🧅' },
          { name: 'Red Chili', qty: 0.1, unit: 'kg', icon: '🌶️' },
          { name: 'Ginger', qty: 0.03, unit: 'kg', icon: '🫚' },
          { name: 'Candlenut', qty: 0.03, unit: 'kg', icon: '🥜' }
        ]},
        { name: 'Nasi Goreng', ingredients: [
          { name: 'Day-Old Rice', qty: 0.8, unit: 'kg', icon: '🍚' },
          { name: 'Sweet Soy Sauce (Kecap Manis)', qty: 0.08, unit: 'L', icon: '🫗' },
          { name: 'Shrimp Paste (Terasi)', qty: 0.02, unit: 'kg', icon: '🦐' },
          { name: 'Shallot', qty: 0.1, unit: 'kg', icon: '🧅' },
          { name: 'Garlic', qty: 0.05, unit: 'kg', icon: '🧄' },
          { name: 'Egg', qty: 2, unit: 'pcs', icon: '🥚' },
          { name: 'Prawn Crackers', qty: 0.1, unit: 'kg', icon: '🦐' }
        ]},
        { name: 'Gado-Gado', ingredients: [
          { name: 'Cabbage', qty: 0.2, unit: 'kg', icon: '🥬' },
          { name: 'Bean Sprouts', qty: 0.15, unit: 'kg', icon: '🌱' },
          { name: 'Long Beans', qty: 0.1, unit: 'kg', icon: '🫛' },
          { name: 'Potato', qty: 0.2, unit: 'kg', icon: '🥔' },
          { name: 'Tofu', qty: 0.2, unit: 'kg', icon: '🧈' },
          { name: 'Tempeh', qty: 0.2, unit: 'kg', icon: '🫘' },
          { name: 'Hard-Boiled Egg', qty: 2, unit: 'pcs', icon: '🥚' },
          { name: 'Peanut Sauce', qty: 0.2, unit: 'kg', icon: '🥜' }
        ]}
      ]},
      { id: 'singaporean', name: 'Singapore', emoji: '🇸🇬', dishes: [
        { name: 'Chicken Rice', ingredients: [
          { name: 'Whole Chicken', qty: 1.5, unit: 'kg', icon: '🍗' },
          { name: 'Jasmine Rice', qty: 0.5, unit: 'kg', icon: '🍚' },
          { name: 'Chicken Fat', qty: 0.1, unit: 'kg', icon: '🍗' },
          { name: 'Ginger', qty: 0.05, unit: 'kg', icon: '🫚' },
          { name: 'Garlic', qty: 0.05, unit: 'kg', icon: '🧄' },
          { name: 'Pandan Leaves', qty: 0.02, unit: 'kg', icon: '🍃' },
          { name: 'Chili Sauce', qty: 0.05, unit: 'kg', icon: '🌶️' },
          { name: 'Cucumber', qty: 0.2, unit: 'kg', icon: '🥒' }
        ]},
        { name: 'Chili Crab', ingredients: [
          { name: 'Mud Crab', qty: 1.5, unit: 'kg', icon: '🦀' },
          { name: 'Tomato Ketchup', qty: 0.1, unit: 'kg', icon: '🍅' },
          { name: 'Sambal', qty: 0.05, unit: 'kg', icon: '🌶️' },
          { name: 'Egg', qty: 2, unit: 'pcs', icon: '🥚' },
          { name: 'Garlic', qty: 0.05, unit: 'kg', icon: '🧄' },
          { name: 'Ginger', qty: 0.03, unit: 'kg', icon: '🫚' },
          { name: 'Chicken Stock', qty: 0.2, unit: 'L', icon: '🍲' },
          { name: 'Fried Mantou Buns', qty: 6, unit: 'pcs', icon: '🍞' }
        ]}
      ]},
      { id: 'filipino', name: 'Philippines', emoji: '🇵🇭', dishes: [
        { name: 'Adobo', ingredients: [
          { name: 'Chicken', qty: 1, unit: 'kg', icon: '🍗' },
          { name: 'Pork Belly', qty: 0.5, unit: 'kg', icon: '🥩' },
          { name: 'Soy Sauce', qty: 0.1, unit: 'L', icon: '🫗' },
          { name: 'Cane Vinegar', qty: 0.1, unit: 'L', icon: '🫗' },
          { name: 'Garlic', qty: 0.1, unit: 'kg', icon: '🧄' },
          { name: 'Bay Leaves', qty: 0.01, unit: 'kg', icon: '🍃' },
          { name: 'Whole Peppercorn', qty: 0.01, unit: 'kg', icon: '🌶️' }
        ]},
        { name: 'Sinigang', ingredients: [
          { name: 'Pork Ribs', qty: 0.8, unit: 'kg', icon: '🥩' },
          { name: 'Tamarind Mix', qty: 0.05, unit: 'kg', icon: '🟤' },
          { name: 'Kangkong (Water Spinach)', qty: 0.3, unit: 'kg', icon: '🥬' },
          { name: 'Radish', qty: 0.2, unit: 'kg', icon: '🥕' },
          { name: 'Eggplant', qty: 0.2, unit: 'kg', icon: '🍆' },
          { name: 'Tomato', qty: 0.2, unit: 'kg', icon: '🍅' }
        ]},
        { name: 'Sisig', ingredients: [
          { name: 'Pork Face/Cheeks', qty: 0.5, unit: 'kg', icon: '🥩' },
          { name: 'Pork Liver', qty: 0.2, unit: 'kg', icon: '🥩' },
          { name: 'Onion', qty: 0.2, unit: 'kg', icon: '🧅' },
          { name: 'Green Chili', qty: 0.05, unit: 'kg', icon: '🌶️' },
          { name: 'Calamansi', qty: 0.1, unit: 'kg', icon: '🍋' },
          { name: 'Egg', qty: 1, unit: 'pcs', icon: '🥚' },
          { name: 'Chicharon (Pork Cracklings)', qty: 0.05, unit: 'kg', icon: '🥓' }
        ]}
      ]},
      { id: 'burmese', name: 'Myanmar', emoji: '🇲🇲', dishes: [
        { name: 'Shan Noodles', ingredients: [
          { name: 'Rice Noodles', qty: 0.3, unit: 'kg', icon: '🍜' },
          { name: 'Pork', qty: 0.3, unit: 'kg', icon: '🥩' },
          { name: 'Tomato', qty: 0.3, unit: 'kg', icon: '🍅' },
          { name: 'Shallot', qty: 0.1, unit: 'kg', icon: '🧅' },
          { name: 'Chili Oil', qty: 0.03, unit: 'L', icon: '🌶️' },
          { name: 'Peanuts', qty: 0.05, unit: 'kg', icon: '🥜' }
        ]},
        { name: 'Tea Leaf Salad', ingredients: [
          { name: 'Fermented Tea Leaves', qty: 0.1, unit: 'kg', icon: '🍃' },
          { name: 'Fried Garlic', qty: 0.05, unit: 'kg', icon: '🧄' },
          { name: 'Fried Shallot', qty: 0.05, unit: 'kg', icon: '🧅' },
          { name: 'Roasted Peanuts', qty: 0.05, unit: 'kg', icon: '🥜' },
          { name: 'Sesame Seeds', qty: 0.03, unit: 'kg', icon: '🌱' },
          { name: 'Tomato', qty: 0.1, unit: 'kg', icon: '🍅' },
          { name: 'Lime', qty: 0.05, unit: 'kg', icon: '🍋' }
        ]}
      ]}
    ]
  },
  'middle-eastern': {
    name: 'Middle Eastern & Central Asian',
    cuisines: [
      { id: 'turkish', name: 'Turkey', emoji: '🇹🇷', dishes: [
        { name: 'Kebab', ingredients: [
          { name: 'Lamb', qty: 1, unit: 'kg', icon: '🍖' },
          { name: 'Onion', qty: 0.2, unit: 'kg', icon: '🧅' },
          { name: 'Garlic', qty: 0.03, unit: 'kg', icon: '🧄' },
          { name: 'Cumin', qty: 0.02, unit: 'kg', icon: '🌿' },
          { name: 'Sumac', qty: 0.02, unit: 'kg', icon: '🌿' },
          { name: 'Flatbread', qty: 4, unit: 'pcs', icon: '🫓' },
          { name: 'Tomato', qty: 0.3, unit: 'kg', icon: '🍅' },
          { name: 'Yogurt', qty: 0.2, unit: 'kg', icon: '🥛' }
        ]},
        { name: 'Baklava', ingredients: [
          { name: 'Phyllo Dough', qty: 0.5, unit: 'kg', icon: '🥟' },
          { name: 'Pistachios', qty: 0.3, unit: 'kg', icon: '🥜' },
          { name: 'Walnuts', qty: 0.2, unit: 'kg', icon: '🥜' },
          { name: 'Butter', qty: 0.3, unit: 'kg', icon: '🧈' },
          { name: 'Sugar', qty: 0.3, unit: 'kg', icon: '🍬' },
          { name: 'Rose Water', qty: 0.02, unit: 'L', icon: '🌹' }
        ]},
        { name: 'Shakshuka', ingredients: [
          { name: 'Egg', qty: 6, unit: 'pcs', icon: '🥚' },
          { name: 'Tomato', qty: 0.8, unit: 'kg', icon: '🍅' },
          { name: 'Red Bell Pepper', qty: 0.3, unit: 'kg', icon: '🫑' },
          { name: 'Onion', qty: 0.2, unit: 'kg', icon: '🧅' },
          { name: 'Garlic', qty: 0.03, unit: 'kg', icon: '🧄' },
          { name: 'Cumin', qty: 0.02, unit: 'kg', icon: '🌿' },
          { name: 'Feta Cheese', qty: 0.1, unit: 'kg', icon: '🧀' },
          { name: 'Olive Oil', qty: 0.05, unit: 'L', icon: '🫒' }
        ]}
      ]},
      { id: 'lebanese', name: 'Lebanon', emoji: '🇱🇧', dishes: [
        { name: 'Hummus', ingredients: [
          { name: 'Chickpeas', qty: 0.5, unit: 'kg', icon: '🫘' },
          { name: 'Tahini', qty: 0.15, unit: 'kg', icon: '🥜' },
          { name: 'Lemon Juice', qty: 0.05, unit: 'L', icon: '🍋' },
          { name: 'Garlic', qty: 0.03, unit: 'kg', icon: '🧄' },
          { name: 'Olive Oil', qty: 0.05, unit: 'L', icon: '🫒' },
          { name: 'Pita Bread', qty: 4, unit: 'pcs', icon: '🫓' }
        ]},
        { name: 'Shawarma', ingredients: [
          { name: 'Chicken Thighs', qty: 1, unit: 'kg', icon: '🍗' },
          { name: 'Yogurt', qty: 0.2, unit: 'kg', icon: '🥛' },
          { name: 'Garlic', qty: 0.05, unit: 'kg', icon: '🧄' },
          { name: 'Cumin', qty: 0.02, unit: 'kg', icon: '🌿' },
          { name: 'Pita Bread', qty: 6, unit: 'pcs', icon: '🫓' },
          { name: 'Pickled Turnip', qty: 0.1, unit: 'kg', icon: '🥕' },
          { name: 'Tomato', qty: 0.2, unit: 'kg', icon: '🍅' }
        ]},
        { name: 'Baba Ghanoush', ingredients: [
          { name: 'Eggplant', qty: 1, unit: 'kg', icon: '🍆' },
          { name: 'Tahini', qty: 0.1, unit: 'kg', icon: '🥜' },
          { name: 'Lemon Juice', qty: 0.05, unit: 'L', icon: '🍋' },
          { name: 'Garlic', qty: 0.02, unit: 'kg', icon: '🧄' },
          { name: 'Olive Oil', qty: 0.05, unit: 'L', icon: '🫒' },
          { name: 'Pomegranate Seeds', qty: 0.05, unit: 'kg', icon: '🔴' }
        ]}
      ]},
      { id: 'persian', name: 'Iran', emoji: '🇮🇷', dishes: [
        { name: 'Tahdig', ingredients: [
          { name: 'Basmati Rice', qty: 1, unit: 'kg', icon: '🍚' },
          { name: 'Saffron', qty: 0.01, unit: 'kg', icon: '🌸' },
          { name: 'Butter', qty: 0.15, unit: 'kg', icon: '🧈' },
          { name: 'Yogurt', qty: 0.1, unit: 'kg', icon: '🥛' }
        ]},
        { name: 'Fesenjan', ingredients: [
          { name: 'Chicken Thighs', qty: 0.8, unit: 'kg', icon: '🍗' },
          { name: 'Walnuts', qty: 0.4, unit: 'kg', icon: '🥜' },
          { name: 'Pomegranate Molasses', qty: 0.15, unit: 'L', icon: '🫗' },
          { name: 'Onion', qty: 0.2, unit: 'kg', icon: '🧅' },
          { name: 'Saffron', qty: 0.005, unit: 'kg', icon: '🌸' }
        ]},
        { name: 'Kebab Koobideh', ingredients: [
          { name: 'Ground Lamb', qty: 0.8, unit: 'kg', icon: '🥩' },
          { name: 'Ground Beef', qty: 0.2, unit: 'kg', icon: '🥩' },
          { name: 'Onion', qty: 0.3, unit: 'kg', icon: '🧅' },
          { name: 'Sumac', qty: 0.02, unit: 'kg', icon: '🌿' },
          { name: 'Saffron', qty: 0.005, unit: 'kg', icon: '🌸' },
          { name: 'Flatbread', qty: 4, unit: 'pcs', icon: '🫓' }
        ]}
      ]},
      { id: 'arabic', name: 'Saudi Arabia', emoji: '🇸🇦', dishes: [
        { name: 'Falafel', ingredients: [
          { name: 'Dried Chickpeas', qty: 0.5, unit: 'kg', icon: '🫘' },
          { name: 'Parsley', qty: 0.1, unit: 'kg', icon: '🌿' },
          { name: 'Cilantro', qty: 0.05, unit: 'kg', icon: '🌿' },
          { name: 'Onion', qty: 0.15, unit: 'kg', icon: '🧅' },
          { name: 'Garlic', qty: 0.05, unit: 'kg', icon: '🧄' },
          { name: 'Cumin', qty: 0.02, unit: 'kg', icon: '🌿' },
          { name: 'Oil for Frying', qty: 1, unit: 'L', icon: '🫗' }
        ]},
        { name: 'Mansaf', ingredients: [
          { name: 'Lamb', qty: 1.5, unit: 'kg', icon: '🍖' },
          { name: 'Basmati Rice', qty: 1, unit: 'kg', icon: '🍚' },
          { name: 'Jameed (Dried Yogurt)', qty: 0.3, unit: 'kg', icon: '🥛' },
          { name: 'Almonds', qty: 0.1, unit: 'kg', icon: '🥜' },
          { name: 'Pine Nuts', qty: 0.05, unit: 'kg', icon: '🥜' },
          { name: 'Ghee', qty: 0.1, unit: 'kg', icon: '🧈' }
        ]}
      ]},
      { id: 'palestinian', name: 'Palestine', emoji: '🇵🇸', dishes: [
        { name: 'Musakhan', ingredients: [
          { name: 'Chicken', qty: 1.5, unit: 'kg', icon: '🍗' },
          { name: 'Taboon Bread', qty: 4, unit: 'pcs', icon: '🫓' },
          { name: 'Onion', qty: 1, unit: 'kg', icon: '🧅' },
          { name: 'Sumac', qty: 0.1, unit: 'kg', icon: '🌿' },
          { name: 'Olive Oil', qty: 0.2, unit: 'L', icon: '🫒' },
          { name: 'Pine Nuts', qty: 0.05, unit: 'kg', icon: '🥜' }
        ]},
        { name: 'Knafeh', ingredients: [
          { name: 'Knafeh Dough (Kataifi)', qty: 0.5, unit: 'kg', icon: '🌾' },
          { name: 'Nabulsi Cheese', qty: 0.5, unit: 'kg', icon: '🧀' },
          { name: 'Butter', qty: 0.2, unit: 'kg', icon: '🧈' },
          { name: 'Sugar', qty: 0.3, unit: 'kg', icon: '🍬' },
          { name: 'Rose Water', qty: 0.02, unit: 'L', icon: '🌹' },
          { name: 'Pistachios', qty: 0.1, unit: 'kg', icon: '🥜' }
        ]}
      ]},
      { id: 'uzbek', name: 'Uzbekistan', emoji: '🇺🇿', dishes: [
        { name: 'Plov', ingredients: [
          { name: 'Devzira Rice', qty: 1, unit: 'kg', icon: '🍚' },
          { name: 'Lamb', qty: 0.8, unit: 'kg', icon: '🍖' },
          { name: 'Carrot', qty: 0.8, unit: 'kg', icon: '🥕' },
          { name: 'Onion', qty: 0.3, unit: 'kg', icon: '🧅' },
          { name: 'Garlic', qty: 2, unit: 'heads', icon: '🧄' },
          { name: 'Cumin', qty: 0.02, unit: 'kg', icon: '🌿' },
          { name: 'Barberries', qty: 0.03, unit: 'kg', icon: '🫐' },
          { name: 'Raisins', qty: 0.05, unit: 'kg', icon: '🍇' },
          { name: 'Chickpeas', qty: 0.1, unit: 'kg', icon: '🫘' }
        ]}
      ]},
      { id: 'tajik', name: 'Tajikistan', emoji: '🇹🇯', dishes: [
        { name: 'Plov', ingredients: [
          { name: 'Rice', qty: 1, unit: 'kg', icon: '🍚' },
          { name: 'Lamb', qty: 0.8, unit: 'kg', icon: '🍖' },
          { name: 'Carrot', qty: 0.5, unit: 'kg', icon: '🥕' },
          { name: 'Onion', qty: 0.3, unit: 'kg', icon: '🧅' },
          { name: 'Cumin', qty: 0.02, unit: 'kg', icon: '🌿' },
          { name: 'Garlic', qty: 0.05, unit: 'kg', icon: '🧄' },
          { name: 'Chickpeas', qty: 0.1, unit: 'kg', icon: '🫘' }
        ]}
      ]}
    ]
  },
  'european': {
    name: 'European',
    cuisines: [
      { id: 'italian', name: 'Italy', emoji: '🇮🇹', dishes: [
        { name: 'Pasta Carbonara', ingredients: [
          { name: 'Spaghetti', qty: 0.5, unit: 'kg', icon: '🍝' },
          { name: 'Guanciale', qty: 0.3, unit: 'kg', icon: '🥓' },
          { name: 'Pecorino Romano', qty: 0.15, unit: 'kg', icon: '🧀' },
          { name: 'Egg Yolks', qty: 6, unit: 'pcs', icon: '🥚' },
          { name: 'Black Pepper', qty: 0.01, unit: 'kg', icon: '🌶️' }
        ]},
        { name: 'Risotto', ingredients: [
          { name: 'Arborio Rice', qty: 0.4, unit: 'kg', icon: '🍚' },
          { name: 'Chicken Stock', qty: 1, unit: 'L', icon: '🍲' },
          { name: 'Parmesan', qty: 0.1, unit: 'kg', icon: '🧀' },
          { name: 'White Wine', qty: 0.15, unit: 'L', icon: '🍷' },
          { name: 'Onion', qty: 0.1, unit: 'kg', icon: '🧅' },
          { name: 'Butter', qty: 0.08, unit: 'kg', icon: '🧈' },
          { name: 'Saffron', qty: 0.005, unit: 'kg', icon: '🌸' }
        ]},
        { name: 'Lasagna', ingredients: [
          { name: 'Lasagna Sheets', qty: 0.3, unit: 'kg', icon: '🍝' },
          { name: 'Ground Beef', qty: 0.5, unit: 'kg', icon: '🥩' },
          { name: 'Ground Pork', qty: 0.3, unit: 'kg', icon: '🥩' },
          { name: 'Tomato Sauce', qty: 0.8, unit: 'kg', icon: '🍅' },
          { name: 'Béchamel Sauce', qty: 0.5, unit: 'L', icon: '🥛' },
          { name: 'Mozzarella', qty: 0.3, unit: 'kg', icon: '🧀' },
          { name: 'Parmesan', qty: 0.1, unit: 'kg', icon: '🧀' },
          { name: 'Red Wine', qty: 0.1, unit: 'L', icon: '🍷' }
        ]},
        { name: 'Tiramisu', ingredients: [
          { name: 'Mascarpone', qty: 0.5, unit: 'kg', icon: '🧀' },
          { name: 'Espresso', qty: 0.3, unit: 'L', icon: '☕' },
          { name: 'Ladyfinger Biscuits', qty: 0.3, unit: 'kg', icon: '🍪' },
          { name: 'Egg Yolks', qty: 4, unit: 'pcs', icon: '🥚' },
          { name: 'Sugar', qty: 0.1, unit: 'kg', icon: '🍬' },
          { name: 'Cocoa Powder', qty: 0.03, unit: 'kg', icon: '🍫' },
          { name: 'Marsala Wine', qty: 0.05, unit: 'L', icon: '🍷' }
        ]}
      ]},
      { id: 'french', name: 'France', emoji: '🇫🇷', dishes: [
        { name: 'Coq au Vin', ingredients: [
          { name: 'Chicken', qty: 1.5, unit: 'kg', icon: '🍗' },
          { name: 'Red Burgundy Wine', qty: 0.75, unit: 'L', icon: '🍷' },
          { name: 'Bacon Lardons', qty: 0.2, unit: 'kg', icon: '🥓' },
          { name: 'Mushrooms', qty: 0.3, unit: 'kg', icon: '🍄' },
          { name: 'Pearl Onions', qty: 0.2, unit: 'kg', icon: '🧅' },
          { name: 'Carrot', qty: 0.2, unit: 'kg', icon: '🥕' },
          { name: 'Thyme', qty: 0.01, unit: 'kg', icon: '🌿' },
          { name: 'Bay Leaf', qty: 0.005, unit: 'kg', icon: '🍃' },
          { name: 'Butter', qty: 0.08, unit: 'kg', icon: '🧈' },
          { name: 'Chicken Stock', qty: 0.3, unit: 'L', icon: '🍲' }
        ]},
        { name: 'Crème Brûlée', ingredients: [
          { name: 'Heavy Cream', qty: 0.5, unit: 'L', icon: '🥛' },
          { name: 'Egg Yolks', qty: 5, unit: 'pcs', icon: '🥚' },
          { name: 'Sugar', qty: 0.12, unit: 'kg', icon: '🍬' },
          { name: 'Vanilla Bean', qty: 1, unit: 'pcs', icon: '🌸' }
        ]},
        { name: 'Ratatouille', ingredients: [
          { name: 'Eggplant', qty: 0.4, unit: 'kg', icon: '🍆' },
          { name: 'Zucchini', qty: 0.3, unit: 'kg', icon: '🥒' },
          { name: 'Bell Pepper', qty: 0.3, unit: 'kg', icon: '🫑' },
          { name: 'Tomato', qty: 0.5, unit: 'kg', icon: '🍅' },
          { name: 'Onion', qty: 0.2, unit: 'kg', icon: '🧅' },
          { name: 'Garlic', qty: 0.03, unit: 'kg', icon: '🧄' },
          { name: 'Olive Oil', qty: 0.1, unit: 'L', icon: '🫒' },
          { name: 'Basil', qty: 0.03, unit: 'kg', icon: '🌿' }
        ]}
      ]},
      { id: 'spanish', name: 'Spain', emoji: '🇪🇸', dishes: [
        { name: 'Paella', ingredients: [
          { name: 'Bomba Rice', qty: 0.5, unit: 'kg', icon: '🍚' },
          { name: 'Saffron', qty: 0.005, unit: 'kg', icon: '🌸' },
          { name: 'Chicken Thighs', qty: 0.5, unit: 'kg', icon: '🍗' },
          { name: 'Rabbit', qty: 0.3, unit: 'kg', icon: '🐇' },
          { name: 'Shrimp', qty: 0.3, unit: 'kg', icon: '🦐' },
          { name: 'Mussels', qty: 0.3, unit: 'kg', icon: '🦪' },
          { name: 'Green Beans', qty: 0.15, unit: 'kg', icon: '🫛' },
          { name: 'Tomato', qty: 0.3, unit: 'kg', icon: '🍅' },
          { name: 'Paprika', qty: 0.02, unit: 'kg', icon: '🌶️' },
          { name: 'Olive Oil', qty: 0.1, unit: 'L', icon: '🫒' },
          { name: 'Chicken Stock', qty: 1, unit: 'L', icon: '🍲' }
        ]},
        { name: 'Tortilla', ingredients: [
          { name: 'Potato', qty: 0.8, unit: 'kg', icon: '🥔' },
          { name: 'Egg', qty: 6, unit: 'pcs', icon: '🥚' },
          { name: 'Onion', qty: 0.2, unit: 'kg', icon: '🧅' },
          { name: 'Olive Oil', qty: 0.2, unit: 'L', icon: '🫒' }
        ]}
      ]},
      { id: 'greek', name: 'Greece', emoji: '🇬🇷', dishes: [
        { name: 'Moussaka', ingredients: [
          { name: 'Eggplant', qty: 1, unit: 'kg', icon: '🍆' },
          { name: 'Ground Lamb', qty: 0.5, unit: 'kg', icon: '🥩' },
          { name: 'Potato', qty: 0.5, unit: 'kg', icon: '🥔' },
          { name: 'Tomato Sauce', qty: 0.4, unit: 'kg', icon: '🍅' },
          { name: 'Béchamel Sauce', qty: 0.4, unit: 'L', icon: '🥛' },
          { name: 'Onion', qty: 0.2, unit: 'kg', icon: '🧅' },
          { name: 'Cinnamon', qty: 0.01, unit: 'kg', icon: '🌿' },
          { name: 'Parmesan', qty: 0.1, unit: 'kg', icon: '🧀' },
          { name: 'Olive Oil', qty: 0.1, unit: 'L', icon: '🫒' }
        ]},
        { name: 'Souvlaki', ingredients: [
          { name: 'Pork Shoulder', qty: 0.8, unit: 'kg', icon: '🥩' },
          { name: 'Olive Oil', qty: 0.05, unit: 'L', icon: '🫒' },
          { name: 'Lemon Juice', qty: 0.05, unit: 'L', icon: '🍋' },
          { name: 'Garlic', qty: 0.03, unit: 'kg', icon: '🧄' },
          { name: 'Oregano', qty: 0.01, unit: 'kg', icon: '🌿' },
          { name: 'Pita Bread', qty: 4, unit: 'pcs', icon: '🫓' },
          { name: 'Tomato', qty: 0.2, unit: 'kg', icon: '🍅' },
          { name: 'Tzatziki', qty: 0.2, unit: 'kg', icon: '🥛' }
        ]}
      ]},
      { id: 'german', name: 'Germany', emoji: '🇩🇪', dishes: [
        { name: 'Schnitzel', ingredients: [
          { name: 'Pork Cutlets', qty: 0.8, unit: 'kg', icon: '🥩' },
          { name: 'Breadcrumbs', qty: 0.2, unit: 'kg', icon: '🍞' },
          { name: 'Flour', qty: 0.1, unit: 'kg', icon: '🌾' },
          { name: 'Egg', qty: 2, unit: 'pcs', icon: '🥚' },
          { name: 'Butter', qty: 0.1, unit: 'kg', icon: '🧈' },
          { name: 'Lemon', qty: 0.1, unit: 'kg', icon: '🍋' }
        ]}
      ]},
      { id: 'russian', name: 'Russia', emoji: '🇷🇺', dishes: [
        { name: 'Borscht', ingredients: [
          { name: 'Beet', qty: 0.8, unit: 'kg', icon: '🥕' },
          { name: 'Beef', qty: 0.5, unit: 'kg', icon: '🥩' },
          { name: 'Cabbage', qty: 0.3, unit: 'kg', icon: '🥬' },
          { name: 'Potato', qty: 0.3, unit: 'kg', icon: '🥔' },
          { name: 'Carrot', qty: 0.2, unit: 'kg', icon: '🥕' },
          { name: 'Onion', qty: 0.2, unit: 'kg', icon: '🧅' },
          { name: 'Tomato Paste', qty: 0.05, unit: 'kg', icon: '🍅' },
          { name: 'Sour Cream', qty: 0.2, unit: 'kg', icon: '🥛' },
          { name: 'Dill', qty: 0.03, unit: 'kg', icon: '🌿' }
        ]},
        { name: 'Pelmeni', ingredients: [
          { name: 'Flour', qty: 0.4, unit: 'kg', icon: '🌾' },
          { name: 'Egg', qty: 1, unit: 'pcs', icon: '🥚' },
          { name: 'Ground Beef', qty: 0.3, unit: 'kg', icon: '🥩' },
          { name: 'Ground Pork', qty: 0.2, unit: 'kg', icon: '🥩' },
          { name: 'Onion', qty: 0.15, unit: 'kg', icon: '🧅' },
          { name: 'Garlic', qty: 0.02, unit: 'kg', icon: '🧄' },
          { name: 'Sour Cream', qty: 0.15, unit: 'kg', icon: '🥛' }
        ]}
      ]},
      { id: 'swedish', name: 'Sweden', emoji: '🇸🇪', dishes: [
        { name: 'Meatballs', ingredients: [
          { name: 'Ground Beef', qty: 0.4, unit: 'kg', icon: '🥩' },
          { name: 'Ground Pork', qty: 0.2, unit: 'kg', icon: '🥩' },
          { name: 'Breadcrumbs', qty: 0.1, unit: 'kg', icon: '🍞' },
          { name: 'Milk', qty: 0.1, unit: 'L', icon: '🥛' },
          { name: 'Egg', qty: 1, unit: 'pcs', icon: '🥚' },
          { name: 'Onion', qty: 0.1, unit: 'kg', icon: '🧅' },
          { name: 'Allspice', qty: 0.01, unit: 'kg', icon: '🌿' },
          { name: 'Butter', qty: 0.05, unit: 'kg', icon: '🧈' },
          { name: 'Cream Gravy', qty: 0.3, unit: 'L', icon: '🥛' },
          { name: 'Lingonberry Jam', qty: 0.15, unit: 'kg', icon: '🫐' }
        ]}
      ]}
    ]
  },
  'americas': {
    name: 'Americas',
    cuisines: [
      { id: 'mexican', name: 'Mexico', emoji: '🇲🇽', dishes: [
        { name: 'Tacos', ingredients: [
          { name: 'Corn Tortillas', qty: 12, unit: 'pcs', icon: '🫓' },
          { name: 'Carne Asada (Skirt Steak)', qty: 0.6, unit: 'kg', icon: '🥩' },
          { name: 'Lime', qty: 0.2, unit: 'kg', icon: '🍋' },
          { name: 'Cilantro', qty: 0.05, unit: 'kg', icon: '🌿' },
          { name: 'White Onion', qty: 0.15, unit: 'kg', icon: '🧅' },
          { name: 'Salsa Verde', qty: 0.15, unit: 'kg', icon: '🌶️' },
          { name: 'Avocado', qty: 0.3, unit: 'kg', icon: '🥑' },
          { name: 'Cumin', qty: 0.01, unit: 'kg', icon: '🌿' }
        ]},
        { name: 'Guacamole', ingredients: [
          { name: 'Ripe Avocado', qty: 0.6, unit: 'kg', icon: '🥑' },
          { name: 'Lime Juice', qty: 0.05, unit: 'L', icon: '🍋' },
          { name: 'Red Onion', qty: 0.1, unit: 'kg', icon: '🧅' },
          { name: 'Jalapeño', qty: 0.05, unit: 'kg', icon: '🌶️' },
          { name: 'Cilantro', qty: 0.03, unit: 'kg', icon: '🌿' },
          { name: 'Tomato', qty: 0.15, unit: 'kg', icon: '🍅' },
          { name: 'Tortilla Chips', qty: 0.3, unit: 'kg', icon: '🫓' }
        ]},
        { name: 'Tamales', ingredients: [
          { name: 'Masa Harina', qty: 0.5, unit: 'kg', icon: '🌽' },
          { name: 'Pork Shoulder', qty: 0.5, unit: 'kg', icon: '🥩' },
          { name: 'Red Chili Sauce', qty: 0.2, unit: 'L', icon: '🌶️' },
          { name: 'Lard', qty: 0.15, unit: 'kg', icon: '🧈' },
          { name: 'Corn Husks', qty: 30, unit: 'pcs', icon: '🌽' },
          { name: 'Chicken Broth', qty: 0.3, unit: 'L', icon: '🍲' }
        ]}
      ]},
      { id: 'brazilian', name: 'Brazil', emoji: '🇧🇷', dishes: [
        { name: 'Feijoada', ingredients: [
          { name: 'Black Beans', qty: 0.5, unit: 'kg', icon: '🫘' },
          { name: 'Pork Shoulder', qty: 0.5, unit: 'kg', icon: '🥩' },
          { name: 'Smoked Sausage', qty: 0.3, unit: 'kg', icon: '🌭' },
          { name: 'Bacon', qty: 0.2, unit: 'kg', icon: '🥓' },
          { name: 'Pork Ribs', qty: 0.3, unit: 'kg', icon: '🍖' },
          { name: 'Bay Leaf', qty: 0.005, unit: 'kg', icon: '🍃' },
          { name: 'Garlic', qty: 0.05, unit: 'kg', icon: '🧄' },
          { name: 'Orange', qty: 0.2, unit: 'kg', icon: '🍊' },
          { name: 'Collard Greens', qty: 0.3, unit: 'kg', icon: '🥬' }
        ]},
        { name: 'Pão de Queijo', ingredients: [
          { name: 'Tapioca Flour', qty: 0.3, unit: 'kg', icon: '🌾' },
          { name: 'Minas Cheese', qty: 0.2, unit: 'kg', icon: '🧀' },
          { name: 'Parmesan', qty: 0.05, unit: 'kg', icon: '🧀' },
          { name: 'Milk', qty: 0.1, unit: 'L', icon: '🥛' },
          { name: 'Oil', qty: 0.05, unit: 'L', icon: '🫗' },
          { name: 'Egg', qty: 2, unit: 'pcs', icon: '🥚' }
        ]}
      ]},
      { id: 'peruvian', name: 'Peru', emoji: '🇵🇪', dishes: [
        { name: 'Ceviche', ingredients: [
          { name: 'Fresh Sea Bass', qty: 0.6, unit: 'kg', icon: '🐟' },
          { name: 'Lime Juice', qty: 0.2, unit: 'L', icon: '🍋' },
          { name: 'Red Onion', qty: 0.15, unit: 'kg', icon: '🧅' },
          { name: 'Aji Limo Chili', qty: 0.03, unit: 'kg', icon: '🌶️' },
          { name: 'Cilantro', qty: 0.03, unit: 'kg', icon: '🌿' },
          { name: 'Sweet Potato', qty: 0.3, unit: 'kg', icon: '🍠' },
          { name: 'Corn (Choclo)', qty: 0.2, unit: 'kg', icon: '🌽' }
        ]},
        { name: 'Lomo Saltado', ingredients: [
          { name: 'Beef Sirloin', qty: 0.6, unit: 'kg', icon: '🥩' },
          { name: 'Red Onion', qty: 0.2, unit: 'kg', icon: '🧅' },
          { name: 'Tomato', qty: 0.3, unit: 'kg', icon: '🍅' },
          { name: 'Aji Amarillo', qty: 0.05, unit: 'kg', icon: '🌶️' },
          { name: 'Soy Sauce', qty: 0.03, unit: 'L', icon: '🫗' },
          { name: 'Cilantro', qty: 0.03, unit: 'kg', icon: '🌿' },
          { name: 'French Fries', qty: 0.4, unit: 'kg', icon: '🍟' }
        ]}
      ]},
      { id: 'american', name: 'USA', emoji: '🇺🇸', dishes: [
        { name: 'Burger', ingredients: [
          { name: 'Ground Beef (80/20)', qty: 0.8, unit: 'kg', icon: '🥩' },
          { name: 'Brioche Buns', qty: 4, unit: 'pcs', icon: '🍔' },
          { name: 'American Cheese', qty: 4, unit: 'slices', icon: '🧀' },
          { name: 'Lettuce', qty: 0.1, unit: 'kg', icon: '🥬' },
          { name: 'Tomato', qty: 0.2, unit: 'kg', icon: '🍅' },
          { name: 'Red Onion', qty: 0.1, unit: 'kg', icon: '🧅' },
          { name: 'Pickles', qty: 0.1, unit: 'kg', icon: '🥒' },
          { name: 'Ketchup', qty: 0.05, unit: 'L', icon: '🍅' },
          { name: 'Mustard', qty: 0.03, unit: 'kg', icon: '🟡' }
        ]},
        { name: 'Mac & Cheese', ingredients: [
          { name: 'Elbow Macaroni', qty: 0.4, unit: 'kg', icon: '🍝' },
          { name: 'Sharp Cheddar', qty: 0.4, unit: 'kg', icon: '🧀' },
          { name: 'Gruyère', qty: 0.1, unit: 'kg', icon: '🧀' },
          { name: 'Butter', qty: 0.08, unit: 'kg', icon: '🧈' },
          { name: 'Flour', qty: 0.05, unit: 'kg', icon: '🌾' },
          { name: 'Whole Milk', qty: 0.5, unit: 'L', icon: '🥛' },
          { name: 'Breadcrumbs', qty: 0.1, unit: 'kg', icon: '🍞' }
        ]}
      ]},
      { id: 'jamaican', name: 'Jamaica', emoji: '🇯🇲', dishes: [
        { name: 'Jerk Chicken', ingredients: [
          { name: 'Chicken Legs', qty: 1.5, unit: 'kg', icon: '🍗' },
          { name: 'Scotch Bonnet Pepper', qty: 0.05, unit: 'kg', icon: '🌶️' },
          { name: 'Allspice', qty: 0.03, unit: 'kg', icon: '🌿' },
          { name: 'Thyme', qty: 0.02, unit: 'kg', icon: '🌿' },
          { name: 'Green Onion', qty: 0.1, unit: 'kg', icon: '🧅' },
          { name: 'Garlic', qty: 0.05, unit: 'kg', icon: '🧄' },
          { name: 'Ginger', qty: 0.03, unit: 'kg', icon: '🫚' },
          { name: 'Soy Sauce', qty: 0.03, unit: 'L', icon: '🫗' },
          { name: 'Brown Sugar', qty: 0.03, unit: 'kg', icon: '🍬' }
        ]}
      ]}
    ]
  },
  'african': {
    name: 'African',
    cuisines: [
      { id: 'ethiopian', name: 'Ethiopia', emoji: '🇪🇹', dishes: [
        { name: 'Injera', ingredients: [
          { name: 'Teff Flour', qty: 0.5, unit: 'kg', icon: '🌾' },
          { name: 'Water', qty: 0.8, unit: 'L', icon: '💧' },
          { name: 'Yeast or Starter', qty: 0.02, unit: 'kg', icon: '🍞' }
        ]},
        { name: 'Doro Wat', ingredients: [
          { name: 'Chicken', qty: 1.5, unit: 'kg', icon: '🍗' },
          { name: 'Red Onion', qty: 1, unit: 'kg', icon: '🧅' },
          { name: 'Berbere Spice', qty: 0.08, unit: 'kg', icon: '🌶️' },
          { name: 'Niter Kibbeh (Spiced Butter)', qty: 0.15, unit: 'kg', icon: '🧈' },
          { name: 'Garlic', qty: 0.05, unit: 'kg', icon: '🧄' },
          { name: 'Ginger', qty: 0.03, unit: 'kg', icon: '🫚' },
          { name: 'Hard-Boiled Eggs', qty: 6, unit: 'pcs', icon: '🥚' }
        ]},
        { name: 'Kitfo', ingredients: [
          { name: 'Raw Beef (lean)', qty: 0.5, unit: 'kg', icon: '🥩' },
          { name: 'Niter Kibbeh', qty: 0.05, unit: 'kg', icon: '🧈' },
          { name: 'Mitmita Spice', qty: 0.02, unit: 'kg', icon: '🌶️' },
          { name: 'Ayib (Ethiopian Cheese)', qty: 0.2, unit: 'kg', icon: '🧀' }
        ]}
      ]},
      { id: 'nigerian', name: 'Nigeria', emoji: '🇳🇬', dishes: [
        { name: 'Jollof Rice', ingredients: [
          { name: 'Long Grain Parboiled Rice', qty: 0.8, unit: 'kg', icon: '🍚' },
          { name: 'Tomato', qty: 0.6, unit: 'kg', icon: '🍅' },
          { name: 'Red Bell Pepper', qty: 0.3, unit: 'kg', icon: '🫑' },
          { name: 'Scotch Bonnet', qty: 0.05, unit: 'kg', icon: '🌶️' },
          { name: 'Onion', qty: 0.3, unit: 'kg', icon: '🧅' },
          { name: 'Tomato Paste', qty: 0.08, unit: 'kg', icon: '🍅' },
          { name: 'Chicken Stock', qty: 0.5, unit: 'L', icon: '🍲' },
          { name: 'Thyme', qty: 0.01, unit: 'kg', icon: '🌿' },
          { name: 'Curry Powder', qty: 0.02, unit: 'kg', icon: '🌶️' },
          { name: 'Vegetable Oil', qty: 0.1, unit: 'L', icon: '🫗' }
        ]},
        { name: 'Suya', ingredients: [
          { name: 'Beef Sirloin', qty: 0.8, unit: 'kg', icon: '🥩' },
          { name: 'Ground Peanut', qty: 0.15, unit: 'kg', icon: '🥜' },
          { name: 'Yaji Spice (Suya Spice)', qty: 0.05, unit: 'kg', icon: '🌶️' },
          { name: 'Ginger', qty: 0.03, unit: 'kg', icon: '🫚' },
          { name: 'Garlic', qty: 0.03, unit: 'kg', icon: '🧄' },
          { name: 'Onion', qty: 0.2, unit: 'kg', icon: '🧅' },
          { name: 'Skewers', qty: 10, unit: 'pcs', icon: '🥢' }
        ]}
      ]},
      { id: 'moroccan', name: 'Morocco', emoji: '🇲🇦', dishes: [
        { name: 'Tagine', ingredients: [
          { name: 'Lamb Shoulder', qty: 1, unit: 'kg', icon: '🍖' },
          { name: 'Onion', qty: 0.3, unit: 'kg', icon: '🧅' },
          { name: 'Dried Apricots', qty: 0.1, unit: 'kg', icon: '🍑' },
          { name: 'Chickpeas', qty: 0.15, unit: 'kg', icon: '🫘' },
          { name: 'Honey', qty: 0.03, unit: 'kg', icon: '🍯' },
          { name: 'Cinnamon', qty: 0.01, unit: 'kg', icon: '🌿' },
          { name: 'Cumin', qty: 0.02, unit: 'kg', icon: '🌿' },
          { name: 'Ginger', qty: 0.02, unit: 'kg', icon: '🫚' },
          { name: 'Saffron', qty: 0.005, unit: 'kg', icon: '🌸' },
          { name: 'Olive Oil', qty: 0.05, unit: 'L', icon: '🫒' },
          { name: 'Almonds', qty: 0.05, unit: 'kg', icon: '🥜' },
          { name: 'Preserved Lemon', qty: 0.05, unit: 'kg', icon: '🍋' }
        ]},
        { name: 'Couscous', ingredients: [
          { name: 'Couscous', qty: 0.5, unit: 'kg', icon: '🌾' },
          { name: 'Lamb', qty: 0.5, unit: 'kg', icon: '🍖' },
          { name: 'Zucchini', qty: 0.2, unit: 'kg', icon: '🥒' },
          { name: 'Carrot', qty: 0.2, unit: 'kg', icon: '🥕' },
          { name: 'Turnip', qty: 0.2, unit: 'kg', icon: '🥕' },
          { name: 'Chickpeas', qty: 0.15, unit: 'kg', icon: '🫘' },
          { name: 'Tomato', qty: 0.2, unit: 'kg', icon: '🍅' },
          { name: 'Onion', qty: 0.15, unit: 'kg', icon: '🧅' },
          { name: 'Ras el Hanout', qty: 0.02, unit: 'kg', icon: '🌶️' },
          { name: 'Saffron', qty: 0.003, unit: 'kg', icon: '🌸' }
        ]}
      ]},
      { id: 'egyptian', name: 'Egypt', emoji: '🇪🇬', dishes: [
        { name: 'Koshari', ingredients: [
          { name: 'Rice', qty: 0.3, unit: 'kg', icon: '🍚' },
          { name: 'Brown Lentils', qty: 0.2, unit: 'kg', icon: '🫘' },
          { name: 'Macaroni', qty: 0.2, unit: 'kg', icon: '🍝' },
          { name: 'Chickpeas', qty: 0.15, unit: 'kg', icon: '🫘' },
          { name: 'Tomato Sauce', qty: 0.4, unit: 'kg', icon: '🍅' },
          { name: 'Fried Onion', qty: 0.2, unit: 'kg', icon: '🧅' },
          { name: 'Garlic', qty: 0.05, unit: 'kg', icon: '🧄' },
          { name: 'Vinegar', qty: 0.05, unit: 'L', icon: '🫗' },
          { name: 'Chili Flakes', qty: 0.02, unit: 'kg', icon: '🌶️' }
        ]},
        { name: 'Ful Medames', ingredients: [
          { name: 'Dried Fava Beans', qty: 0.5, unit: 'kg', icon: '🫘' },
          { name: 'Lemon Juice', qty: 0.05, unit: 'L', icon: '🍋' },
          { name: 'Garlic', qty: 0.03, unit: 'kg', icon: '🧄' },
          { name: 'Cumin', qty: 0.02, unit: 'kg', icon: '🌿' },
          { name: 'Olive Oil', qty: 0.05, unit: 'L', icon: '🫒' },
          { name: 'Parsley', qty: 0.03, unit: 'kg', icon: '🌿' },
          { name: 'Tomato', qty: 0.15, unit: 'kg', icon: '🍅' },
          { name: 'Hard-Boiled Egg', qty: 2, unit: 'pcs', icon: '🥚' }
        ]}
      ]},
      { id: 'kenyan', name: 'Kenya', emoji: '🇰🇪', dishes: [
        { name: 'Nyama Choma', ingredients: [
          { name: 'Goat Meat', qty: 1.5, unit: 'kg', icon: '🥩' },
          { name: 'Lemon', qty: 0.1, unit: 'kg', icon: '🍋' },
          { name: 'Kachumbari (Tomato-Onion Salsa)', qty: 0.3, unit: 'kg', icon: '🍅' },
          { name: 'Ugali', qty: 0.5, unit: 'kg', icon: '🌽' }
        ]},
        { name: 'Ugali', ingredients: [
          { name: 'White Cornmeal', qty: 0.5, unit: 'kg', icon: '🌽' },
          { name: 'Water', qty: 1, unit: 'L', icon: '💧' }
        ]},
        { name: 'Sukuma Wiki', ingredients: [
          { name: 'Collard Greens', qty: 0.8, unit: 'kg', icon: '🥬' },
          { name: 'Tomato', qty: 0.2, unit: 'kg', icon: '🍅' },
          { name: 'Onion', qty: 0.15, unit: 'kg', icon: '🧅' },
          { name: 'Oil', qty: 0.05, unit: 'L', icon: '🫗' }
        ]}
      ]},
      { id: 'south-african', name: 'South Africa', emoji: '🇿🇦', dishes: [
        { name: 'Bobotie', ingredients: [
          { name: 'Minced Beef', qty: 0.8, unit: 'kg', icon: '🥩' },
          { name: 'Bread', qty: 0.1, unit: 'kg', icon: '🍞' },
          { name: 'Milk', qty: 0.15, unit: 'L', icon: '🥛' },
          { name: 'Onion', qty: 0.2, unit: 'kg', icon: '🧅' },
          { name: 'Curry Powder', qty: 0.03, unit: 'kg', icon: '🌶️' },
          { name: 'Turmeric', qty: 0.01, unit: 'kg', icon: '🟡' },
          { name: 'Apricot Jam', qty: 0.05, unit: 'kg', icon: '🍑' },
          { name: 'Raisins', qty: 0.05, unit: 'kg', icon: '🍇' },
          { name: 'Egg', qty: 2, unit: 'pcs', icon: '🥚' },
          { name: 'Almonds', qty: 0.05, unit: 'kg', icon: '🥜' }
        ]},
        { name: 'Braai', ingredients: [
          { name: 'Boerewors (Sausage)', qty: 0.5, unit: 'kg', icon: '🌭' },
          { name: 'Lamb Chops', qty: 0.8, unit: 'kg', icon: '🍖' },
          { name: 'Beef Steak', qty: 0.6, unit: 'kg', icon: '🥩' },
          { name: 'Chicken', qty: 0.5, unit: 'kg', icon: '🍗' }
        ]}
      ]}
    ]
  }
};


let currentStep = 0;
let selectedDishes = [];
let people = 10;
let shoppingList = [];
let haveAtHome = new Set();
let checkedItems = new Set();
let currentRegion = 'all';
let currentSearch = '';
let currentCountry = null;
let userLocation = null;
let lastStoreRadius = 2500;
let lastTagCount = 0;
// Follow the page's own host so phones on the LAN reach the backend too (localhost would point at the phone)
const API_BASE = `${location.protocol}//${location.hostname}:3000`;

function saveState() {
  localStorage.setItem('smartchef_dishes', JSON.stringify(selectedDishes));
  localStorage.setItem('smartchef_pantry', JSON.stringify([...haveAtHome]));
}

function loadState() {
  const savedDishes = localStorage.getItem('smartchef_dishes');
  const savedPantry = localStorage.getItem('smartchef_pantry');
  if (savedDishes) {
    selectedDishes = JSON.parse(savedDishes);
    updateSelectedSummary();
    document.getElementById('btnToStep2').disabled = selectedDishes.length === 0;
  }
  if (savedPantry) {
    haveAtHome = new Set(JSON.parse(savedPantry));
  }
}

function shareList() {
  const needed = shoppingList.filter(i => !haveAtHome.has(i.name));
  if (needed.length === 0) {
    alert('Your shopping list is empty! 🎉');
    return;
  }

  const text = `🛒 My SmartChef Shopping List:\n\n` +
    needed.map(i => `• ${i.name} (${i.qty} ${i.unit})`).join('\n') +
    '\n\nGenerated by SmartChef! 🍳';

  if (navigator.share) {
    navigator.share({ title: 'My Shopping List', text }).catch(() => {});
  } else {
    navigator.clipboard.writeText(text).then(() => {
      alert('Shopping list copied to clipboard! 📋');
    }).catch(() => {
      alert('Could not copy to clipboard.');
    });
  }
}

function setupShareButton() {
  const btnRow = document.querySelector('#step3 .btn-row');
  if (btnRow && !document.getElementById('shareListBtn')) {
    const shareBtn = document.createElement('button');
    shareBtn.id = 'shareListBtn';
    shareBtn.className = 'btn btn-secondary';
    shareBtn.innerHTML = '📋 Share List';
    shareBtn.onclick = shareList;
    btnRow.insertBefore(shareBtn, btnRow.firstChild);
  }
}

function init() {
  loadState();
  setupShareButton();
  renderCountries();
  moveTabGlider();
  addEventListener('resize', moveTabGlider);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(moveTabGlider);
}

function renderCountries() {
  const grid = document.getElementById('countryGrid');
  let countries = [];
  Object.keys(worldCuisines).forEach(regionKey => {
    if (currentRegion !== 'all' && currentRegion !== regionKey) return;
    const region = worldCuisines[regionKey];
    region.cuisines.forEach(cuisine => {
      const selectedCount = selectedDishes.filter(d => d.cuisineId === cuisine.id).length;
      countries.push({ ...cuisine, region: regionKey, regionName: region.name, selectedCount });
    });
  });

  if (currentSearch) {
    const q = currentSearch.toLowerCase();
    countries = countries.filter(c => c.name.toLowerCase().includes(q) || c.dishes.some(d => d.name.toLowerCase().includes(q)));
  }

  if (countries.length === 0) {
    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--gray-2);">No countries found.</div>';
    return;
  }

  grid.innerHTML = countries.map((c, i) => `
    <div class="country-card ${c.selectedCount > 0 ? 'has-selected' : ''}" style="--i:${i}" onclick="openCountry('${c.id}')">
      <div class="country-flag">${c.emoji}</div>
      <div class="country-name">${c.name}</div>
      <div class="country-dish-count">${c.dishes.length} dishes</div>
      ${c.selectedCount > 0 ? `<div class="country-badge">✓ ${c.selectedCount} selected</div>` : ''}
      <div class="country-arrow">→</div>
    </div>
  `).join('');
}

function filterRegion(region) {
  currentRegion = region;
  document.querySelectorAll('.region-tab').forEach(tab => tab.classList.toggle('active', tab.dataset.region === region));
  moveTabGlider();
  renderCountries();
}

function moveTabGlider() {
  const glider = document.getElementById('tabGlider');
  const active = document.querySelector('.region-tab.active');
  if (!glider || !active) return;
  glider.style.width = `${active.offsetWidth}px`;
  glider.style.transform = `translateX(${active.offsetLeft}px)`;
}

function openCountry(cuisineId) {
  let country = null;
  let regionName = '';

  Object.keys(worldCuisines).forEach(rk => {
    worldCuisines[rk].cuisines.forEach(c => {
      if (c.id === cuisineId) {
        country = c;
        regionName = worldCuisines[rk].name;
      }
    });
  });

  if (!country) return;

  currentCountry = { ...country, regionName };
  const sc = selectedDishes.filter(d => d.cuisineId === country.id).length;

  document.getElementById('currentCountryHeader').innerHTML = `
    <div class="current-country-flag">${country.emoji}</div>
    <div class="current-country-info">
      <div class="current-country-name">${country.name}</div>
      <div class="current-country-region">${regionName} Cuisine</div>
      <div class="current-country-stats">
        <div class="stat-pill"><strong>${country.dishes.length}</strong> dishes</div>
        <div class="stat-pill"><strong>${sc}</strong> selected</div>
      </div>
    </div>`;

  renderDishes();
  document.getElementById('countriesView').style.display = 'none';
  document.getElementById('dishesView').style.display = 'block';
  document.getElementById('step1Title').textContent = `${country.emoji} ${country.name} Dishes`;
  document.getElementById('step1Subtitle').textContent = 'Select the dishes you want to cook';
  document.getElementById('searchInput').value = '';
  currentSearch = '';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderDishes() {
  const grid = document.getElementById('dishGrid');
  if (!currentCountry) return;

  let dishes = currentCountry.dishes;
  if (currentSearch) {
    const q = currentSearch.toLowerCase();
    dishes = dishes.filter(d => d.name.toLowerCase().includes(q));
  }

  if (dishes.length === 0) {
    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--gray-2);">No dishes match.</div>';
    return;
  }

  grid.innerHTML = dishes.map((dish, i) => {
    const isSelected = selectedDishes.some(d => d.name === dish.name && d.cuisineId === currentCountry.id);
    const safeName = dish.name.replace(/'/g, "\\'");
    return `
      <div class="dish-card ${isSelected ? 'selected' : ''}" style="--i:${i}" data-name="${dish.name.replace(/"/g, '&quot;')}" onclick="toggleDish('${safeName}')">
        <div class="check-mark">✓</div>
        <div class="dish-emoji">${dish.ingredients[0]?.icon || '🍽️'}</div>
        <div class="dish-name">${dish.name}</div>
        <div class="dish-ingredients-count">${dish.ingredients.length} ingredients</div>
      </div>`;
  }).join('');
}

function showCountries() {
  document.getElementById('countriesView').style.display = 'block';
  document.getElementById('dishesView').style.display = 'none';
  document.getElementById('step1Title').textContent = 'Pick a Country';
  document.getElementById('step1Subtitle').textContent = 'Choose a country to explore its signature dishes';
  currentCountry = null;
  document.getElementById('searchInput').value = '';
  currentSearch = '';
  renderCountries();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleDish(name) {
  if (!currentCountry) return;

  const cuisineId = currentCountry.id;
  const idx = selectedDishes.findIndex(d => d.name === name && d.cuisineId === cuisineId);

  if (idx > -1) {
    selectedDishes.splice(idx, 1);
  } else {
    const dish = currentCountry.dishes.find(d => d.name === name);
    if (dish) {
      selectedDishes.push({ ...dish, cuisineId, cuisineName: currentCountry.name, cuisineEmoji: currentCountry.emoji });
    }
  }

  // Update the tapped card in place so the grid cascade doesn't replay on every pick
  const isSelected = idx === -1;
  const card = document.querySelector(`.dish-card[data-name="${(window.CSS && CSS.escape) ? CSS.escape(name) : name}"]`);
  if (card) card.classList.toggle('selected', isSelected);
  else renderDishes();

  updateSelectedSummary();
  updateCountryHeader();
  document.getElementById('btnToStep2').disabled = selectedDishes.length === 0;
  saveState();
}

function updateCountryHeader() {
  if (!currentCountry) return;
  const sc = selectedDishes.filter(d => d.cuisineId === currentCountry.id).length;
  const s = document.querySelector('.current-country-stats');
  if (s) {
    s.innerHTML = `<div class="stat-pill"><strong>${currentCountry.dishes.length}</strong> dishes</div><div class="stat-pill"><strong>${sc}</strong> selected</div>`;
  }
}

function updateSelectedSummary() {
  const summary = document.getElementById('selectedSummary');
  const count = document.getElementById('selectedCount');
  const tags = document.getElementById('selectedTags');

  if (selectedDishes.length === 0) {
    summary.style.display = 'none';
    lastTagCount = 0;
    return;
  }

  const grew = selectedDishes.length > lastTagCount;
  summary.style.display = 'block';
  count.textContent = selectedDishes.length;
  tags.innerHTML = selectedDishes.map((d, i) => `
    <span class="selected-tag">${d.cuisineEmoji} ${d.name}
      <span class="tag-remove" onclick="event.stopPropagation(); removeDish(${i})">✕</span>
    </span>
  `).join('');

  if (grew && tags.lastElementChild) tags.lastElementChild.classList.add('tag-new');
  lastTagCount = selectedDishes.length;

  count.classList.remove('bump');
  void count.offsetWidth;
  count.classList.add('bump');
}

function removeDish(i) {
  selectedDishes.splice(i, 1);
  renderDishes();
  renderCountries();
  updateSelectedSummary();
  updateCountryHeader();
  document.getElementById('btnToStep2').disabled = selectedDishes.length === 0;
  saveState();
}

function clearAllDishes() {
  selectedDishes = [];
  renderDishes();
  updateSelectedSummary();
  updateCountryHeader();
  document.getElementById('btnToStep2').disabled = true;
  saveState();
}

function handleSearch() {
  currentSearch = document.getElementById('searchInput').value;
  if (currentCountry) renderDishes();
  else renderCountries();
}

function changePeople(delta) {
  people = Math.max(1, Math.min(50, people + delta));
  document.getElementById('peopleCount').textContent = people;
}

function goToStep(step) {
  // CRITICAL: Force scroll to absolute top BEFORE any DOM changes
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  window.scrollTo(0, 0);
  
  // Small delay to ensure scroll happens first
  setTimeout(() => {
    // Hide ALL steps immediately
    document.querySelectorAll('.step-section').forEach(s => {
      s.classList.remove('active');
      s.style.display = 'none'; // Force hide
    });
    
    // Show ONLY the target step
    const targetId = step === 'complete' ? 'stepComplete' : 'step' + step;
    const target = document.getElementById(targetId);
    if (target) {
      target.style.display = 'block'; // Force show
      // Trigger reflow
      void target.offsetWidth;
      target.classList.add('active');
    }

    // Tabs are only measurable once the step is laid out
    if (step === 1) moveTabGlider();
    
    // Update navigation dots
    const sn = typeof step === 'number' ? step : 6;
    document.querySelectorAll('.nav-step-dot').forEach((d, i) => {
      d.classList.remove('active', 'done');
      if (i < sn) d.classList.add('done');
      if (i === sn) d.classList.add('active');
    });
    document.querySelectorAll('.nav-step-line').forEach((l, i) => l.classList.toggle('done', i < sn));
    
    currentStep = step;
    
    // DOUBLE-CHECK: Force scroll to top again after DOM update
    setTimeout(() => {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      window.scrollTo(0, 0);
    }, 50);
    
  }, 10);
}

function showThinking(text, sub, dur) {
  return new Promise(r => {
    const o = document.getElementById('thinkingOverlay');
    document.getElementById('thinkingText').textContent = text;
    document.getElementById('thinkingSub').textContent = sub;
    o.classList.add('show');
    setTimeout(() => {
      o.classList.remove('show');
      r();
    }, dur);
  });
}

function generateList() {
  showThinking('Analyzing recipes...', `Combining ${selectedDishes.length} dishes for ${people} people`, 1800).then(() => {
    const merged = {};
    const sf = people / 4;

    selectedDishes.forEach(dish => {
      dish.ingredients.forEach(ing => {
        const calculatedQty = ing.qty * sf;
        if (merged[ing.name]) {
          merged[ing.name].rawQty += calculatedQty;
        } else {
          merged[ing.name] = { ...ing, rawQty: calculatedQty };
        }
      });
    });

    shoppingList = Object.values(merged).map(item => {
      let finalQty;
      let finalUnit;

      if (item.unit === 'kg' && item.rawQty < 1) {
        finalQty = Math.round(item.rawQty * 1000);
        finalUnit = 'g';
      } else if (item.unit === 'L' && item.rawQty < 1) {
        finalQty = Math.round(item.rawQty * 1000);
        finalUnit = 'ml';
      } else if (item.unit === 'pcs' || item.unit === 'slices' || item.unit === 'heads') {
        finalQty = Math.round(item.rawQty);
        finalUnit = item.unit;
      } else {
        finalQty = Math.round(item.rawQty * 100) / 100;
        finalUnit = item.unit;
      }

      return { ...item, qty: finalQty, unit: finalUnit };
    });

    haveAtHome.clear();
    renderShoppingList();
    goToStep(3);
  });
}

function renderShoppingList() {
  const c = document.getElementById('shoppingItems');
  const needed = shoppingList.filter(i => !haveAtHome.has(i.name));

  c.innerHTML = shoppingList.map(i => {
    const h = haveAtHome.has(i.name);
    return `<div class="shopping-item ${h ? 'have' : ''}" onclick="toggleHave('${i.name.replace(/'/g, "\\'")}')">
      <div class="item-toggle">${h ? '✓' : ''}</div>
      <div class="item-icon">${i.icon}</div>
      <div class="item-name">${i.name}</div>
      <div class="item-qty">${i.qty} ${i.unit}</div>
    </div>`;
  }).join('');

  document.getElementById('shoppingCount').textContent = `${needed.length} item${needed.length !== 1 ? 's' : ''}`;
  const hint = document.getElementById('haveHint');
  hint.textContent = needed.length < shoppingList.length
    ? `✅ ${shoppingList.length - needed.length} item(s) at home — ${needed.length} to buy`
    : '💡 Tap items you already have to remove them';
}

function toggleHave(n) {
  if (haveAtHome.has(n)) haveAtHome.delete(n);
  else haveAtHome.add(n);
  renderShoppingList();
  saveState();
}

function findStores() {
  const needed = shoppingList.filter(i => !haveAtHome.has(i.name));
  if (needed.length === 0) return;

  goToStep(4);
  resetLocationUI();
  document.getElementById('manualLocationInput').focus();
}

async function searchManualLocation() {
  const input = document.getElementById('manualLocationInput');
  const errorEl = document.getElementById('manualLocationError');
  let query = input.value.trim();

  if (!query) {
    errorEl.textContent = 'Please enter a city';
    errorEl.style.display = 'block';
    return;
  }

  // Optional: Clean up complex addresses automatically
  if (query.toLowerCase().includes('road') || query.toLowerCase().includes('sector')) {
    const parts = query.split(/[\s,]+/);
    const simplified = parts.slice(0, 2).join(', ');
    if (simplified.length > 3) query = simplified;
  }

  const btn = document.getElementById('manualLocationBtn');
  btn.disabled = true;
  btn.textContent = 'Connecting...';
  errorEl.style.display = 'none';

  setLocationState('loading', '🔍 Connecting...', `Looking up "${query}"`);

  try {
    // ✅ THIS IS THE FIX: Talk directly to YOUR Node.js server
    const res = await fetch(`${API_BASE}/api/geocode?q=${encodeURIComponent(query)}`);

    if (!res.ok) throw new Error('Server returned an error');

    const data = await res.json();

    if (!Array.isArray(data) || data.length === 0) {
      throw new Error('Location not found');
    }

    processResult(data[0], query);
  } catch (err) {
    console.error(err);
    errorEl.textContent = `Server unreachable — keep 'node server.js' running and make sure this device is on the same Wi-Fi as that computer.`;
    errorEl.style.display = 'block';
    setLocationState('error', '⚠️ Server Offline', 'Run node server.js on the computer hosting this site');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Find Stores';
  }
}

// Helper to handle the successful result
function processResult(result, originalQuery) {
  const lat = parseFloat(result.lat);
  const lng = parseFloat(result.lon);
  const displayName = result.display_name || originalQuery;

  userLocation = { lat, lng };

  setLocationState('success', '✅ Location Found', displayName);

  const needed = shoppingList.filter(i => !haveAtHome.has(i.name));
  // Immediately trigger store search
  processLocation(lat, lng, needed, 'Manual', displayName);
}

const GPS_ERRORS = {
  1: 'Location permission denied — type your city instead.',
  2: 'GPS signal unavailable — type your city instead.',
  3: 'GPS timed out — type your city instead.'
};

async function useMyLocation() {
  const btn = document.getElementById('gpsBtn');
  const errorEl = document.getElementById('manualLocationError');

  if (!navigator.geolocation) {
    errorEl.textContent = 'This device has no GPS — type your city instead.';
    errorEl.style.display = 'block';
    return;
  }

  btn.disabled = true;
  const originalLabel = btn.textContent;
  btn.textContent = 'Locating...';
  errorEl.style.display = 'none';
  setLocationState('loading', '📡 Getting GPS fix...', 'Allow location access if prompted');

  try {
    const pos = await new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      })
    );

    const { latitude: lat, longitude: lng, accuracy } = pos.coords;
    userLocation = { lat, lng };

    const addressName = await getAddressName(lat, lng);
    const label = `${addressName}  (±${Math.round(accuracy)} m)`;
    const needed = shoppingList.filter(i => !haveAtHome.has(i.name));
    await processLocation(lat, lng, needed, 'GPS', label);
  } catch (err) {
    console.error('GPS error:', err);
    const msg = GPS_ERRORS[err && err.code] || 'Could not get your location — type your city instead.';
    errorEl.textContent = msg;
    errorEl.style.display = 'block';
    setLocationState('error', '⚠️ GPS unavailable', msg);
  } finally {
    btn.disabled = false;
    btn.textContent = originalLabel;
  }
}

async function processLocation(lat, lng, needed, source, customName) {
  setLocationState('loading', 'Reading your address...', 'Identifying your neighborhood');

  let addressName = customName;
  if (!addressName) {
    addressName = await getAddressName(lat, lng);
  }

  setLocationState('loading', 'Finding nearby supermarkets...', 'Scanning OpenStreetMap database');

  try {
    const realStores = await fetchRealStores(lat, lng);

    if (realStores.length > 0) {
      setLocationState('success', 'Location found', addressName || `${lat.toFixed(3)}°, ${lng.toFixed(3)}°`);
      renderRealStores(realStores, needed);
      document.getElementById('storeSubtitle').textContent = `Found ${realStores.length} real supermarkets near you`;
      document.getElementById('startShoppingBtn').style.display = 'inline-flex';
    } else {
      const km = Math.round(lastStoreRadius / 1000);
      setLocationState('error', 'No supermarkets found', `None found within ${km} km of ${addressName || 'your location'}`);
      document.getElementById('storeAnalysis').innerHTML = `
        <div class="no-stores-msg">
          <div class="no-stores-emoji">🏜️</div>
          <h3>No supermarkets nearby</h3>
          <p>We couldn't find any supermarkets within ${km} km of your location. Try searching for a different city or address using the search box above.</p>
        </div>
      `;
    }
  } catch (err) {
    console.error('Store fetch error:', err);
    setLocationState('error', 'Network error', 'Could not reach the store database. Check your internet connection.');
    document.getElementById('storeAnalysis').innerHTML = `
      <div class="no-stores-msg">
        <div class="no-stores-emoji">📡</div>
        <h3>Connection Error</h3>
        <p>We couldn't reach the OpenStreetMap database. Please check your internet connection and try again.</p>
      </div>
    `;
  }
}

function resetLocationUI() {
  const box = document.getElementById('locationBox');
  box.className = 'location-box';
  document.getElementById('manualLocationInput').value = '';
  document.getElementById('manualLocationError').style.display = 'none';
  document.getElementById('locationStatusDisplay').style.display = 'none';
  document.getElementById('statusLabel').textContent = '';
  document.getElementById('statusAddress').textContent = '';
  document.getElementById('storeAnalysis').innerHTML = '';
  document.getElementById('storeSubtitle').textContent = 'Enter your location to find real supermarkets nearby';
  document.getElementById('startShoppingBtn').style.display = 'none';
}

function setLocationState(state, labelOrIcon, addressOrLabel, detail) {
  const box = document.getElementById('locationBox');
  box.className = 'location-box ' + state;
  document.getElementById('locationStatusDisplay').style.display = 'block';
  document.getElementById('statusLabel').textContent = detail === undefined
    ? labelOrIcon
    : `${labelOrIcon} ${addressOrLabel}`;
  document.getElementById('statusAddress').textContent = detail === undefined
    ? addressOrLabel
    : detail;
}

async function getAddressName(lat, lng) {
  try {
    const res = await fetch(`${API_BASE}/api/reverse?lat=${lat}&lon=${lng}`);
    if (!res.ok) throw new Error(`Reverse geocode returned ${res.status}`);
    const data = await res.json();

    if (data.address) {
      const parts = [];
      if (data.address.road) parts.push(data.address.road);
      if (data.address.suburb) parts.push(data.address.suburb);
      if (data.address.city || data.address.town || data.address.village) {
        parts.push(data.address.city || data.address.town || data.address.village);
      }
      if (data.address.country) parts.push(data.address.country);
      return parts.join(', ') || data.display_name;
    }

    return `${lat.toFixed(3)}°, ${lng.toFixed(3)}°`;
  } catch (e) {
    console.error('Geocoding error:', e);
    return `${lat.toFixed(3)}°, ${lng.toFixed(3)}°`;
  }
}

async function fetchRealStores(lat, lng, radius = 2500) {
  const res = await fetch(`${API_BASE}/api/stores`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ lat, lng, radius })
  });
  if (!res.ok) throw new Error(`Server returned ${res.status}`);

  const data = await res.json();
  lastStoreRadius = data.sc_radius || radius;

  const seen = new Set();
  return (data.elements || []).map(el => {
    const storeLat = el.lat ?? el.center?.lat;
    const storeLng = el.lon ?? el.center?.lon;
    if (storeLat == null || storeLng == null) return null;
    if (el.tags?.disused || el.tags?.shop === 'no') return null;

    const name = el.tags?.name || el.tags?.brand || el.tags?.operator || "Local Store";
    // Same shop is sometimes mapped as both a node and a way; drop the duplicate.
    const key = `${name.toLowerCase()}|${storeLat.toFixed(3)}|${storeLng.toFixed(3)}`;
    if (seen.has(key)) return null;
    seen.add(key);

    const brand = el.tags?.brand || "";
    const shopType = el.tags?.shop || "supermarket";
    const distance = calculateDistance(lat, lng, storeLat, storeLng);

    return { id: el.id, name, brand, type: shopType, lat: storeLat, lng: storeLng, distance, isReal: true };
  }).filter(s => s !== null).sort((a, b) => a.distance - b.distance);
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function renderRealStores(realStores, needed) {
  const totalItems = needed.length;
  const container = document.getElementById('storeAnalysis');

  const storesWithAvailability = realStores.map((store, idx) => {
    let availabilityPct;
    if (store.type === 'supermarket' || store.type === 'department_store') {
      availabilityPct = Math.max(0.4, 1.0 - (idx * 0.06));
    } else if (store.type === 'grocery') {
      availabilityPct = Math.max(0.3, 0.85 - (idx * 0.08));
    } else {
      availabilityPct = Math.max(0.2, 0.6 - (idx * 0.08));
    }

    const itemsCount = Math.max(1, Math.round(totalItems * availabilityPct));
    const availableItems = needed.slice(0, itemsCount).map(i => i.name);

    return { ...store, availabilityPct, itemsCount, availableItems };
  });

  const bestStore = storesWithAvailability.reduce((best, current) =>
    current.availabilityPct > best.availabilityPct ? current : best
  );

  let html = '';

  storesWithAvailability.forEach((store) => {
    const pctWidth = Math.round(store.availabilityPct * 100);
    const barClass = pctWidth >= 80 ? 'high' : pctWidth >= 40 ? 'med' : 'low';
    const isRecommended = store.id === bestStore.id;

    let typeLabel = '🏪 Store';
    if (store.type === 'supermarket') typeLabel = '🛒 Supermarket';
    else if (store.type === 'convenience') typeLabel = '🏪 Convenience Store';
    else if (store.type === 'grocery') typeLabel = '🥬 Grocery Store';
    else if (store.type === 'department_store') typeLabel = '🏬 Department Store';

    const displayName = store.brand && store.name !== store.brand
      ? `${store.name} <span style="color:var(--gray-2);font-weight:500;">(${store.brand})</span>`
      : store.name;

    html += `
      <div class="store-card ${isRecommended ? 'recommended' : ''}">
        <div class="store-top">
          <div class="store-name">
            ${displayName}
            <div style="font-size:0.75rem;color:var(--gray-2);font-weight:500;margin-top:3px;">${typeLabel}</div>
          </div>
          <div class="store-distance">📍 ${store.distance.toFixed(2)} km</div>
        </div>
        <div class="store-meta" style="margin-top: 0.75rem;">
          <span style="font-size: 0.85rem; color: var(--gray-2); font-weight: 600;">
            ️ ${store.label || store.name} ·  ${store.distance.toFixed(2)} km away
          </span>
        </div>
        <p style="font-size: 0.8rem; color: var(--gray-2); margin-top: 0.5rem; font-style: italic;">
          ℹ️ Inventory not verified. Please call ahead to confirm item availability.
        </p>
        <a href="https://www.google.com/maps/dir/?api=1&destination=${store.lat},${store.lng}"
           target="_blank"
           rel="noopener noreferrer"
           class="store-directions-btn">🗺️ Get Directions</a>
      </div>
    `;
  });

  if (storesWithAvailability.length >= 2) {
    const store1 = storesWithAvailability[0];
    const store2 = storesWithAvailability[1];
    const combinedDistance = (store1.distance + store2.distance).toFixed(2);

    html += `
      <div class="combo-card">
        <h4>🧩 Smart Combo: Visit Both</h4>
        <div class="combo-stores">
          <div class="combo-store-pill">${store1.name}</div>
          <div class="combo-plus">+</div>
          <div class="combo-store-pill">${store2.name}</div>
        </div>
        <div class="combo-detail">
          Together they likely have <strong>all ${totalItems} items</strong> ·
          Total distance: <strong>${combinedDistance} km</strong>
        </div>
      </div>
    `;
  }

  container.innerHTML = html;
}

function startShopping() {
  const needed = shoppingList.filter(i => !haveAtHome.has(i.name));
  checkedItems.clear();
  renderChecklist(needed);
  goToStep(5);
}

function renderChecklist(items) {
  document.getElementById('checklistItems').innerHTML = items.map((i, idx) => 
    `<div class="checklist-item" data-idx="${idx}" onclick="toggleCheck(${idx})">
      <div class="cl-check"></div>
      <div class="cl-icon">${i.icon}</div>
      <div class="cl-name">${i.name}</div>
      <div class="cl-qty">${i.qty} ${i.unit}</div>
    </div>`
  ).join('');
  updateChecklistProgress(items.length);
}

function toggleCheck(idx) {
  const el = document.querySelector(`.checklist-item[data-idx="${idx}"]`);
  if (checkedItems.has(idx)) {
    checkedItems.delete(idx);
    el.classList.remove('checked');
    el.querySelector('.cl-check').innerHTML = '';
  } else {
    checkedItems.add(idx);
    el.classList.add('checked');
    el.querySelector('.cl-check').innerHTML = '✓';
  }

  updateChecklistProgress(shoppingList.filter(i => !haveAtHome.has(i.name)).length);
  document.getElementById('btnDone').disabled = checkedItems.size === 0;
}

function updateChecklistProgress(t) {
  const c = checkedItems.size;
  const p = t > 0 ? Math.round((c / t) * 100) : 0;
  document.getElementById('checklistProgressText').textContent = `${c} / ${t}`;
  document.getElementById('checklistProgressFill').style.width = p + '%';
}

function finishShopping() {
  // 1. Hide ALL steps immediately using display:none to remove them from layout flow
  document.querySelectorAll('.step-section').forEach(s => {
    s.classList.remove('active');
    s.style.display = 'none';
  });

  // 2. Show ONLY the completion screen
  const completeSection = document.getElementById('stepComplete');
  if (completeSection) {
    completeSection.style.display = 'block';
    // Trigger reflow to restart CSS animations
    void completeSection.offsetWidth;
    completeSection.classList.add('active');
  } else {
    console.error('Completion section #stepComplete not found in HTML!');
    alert('Error: Completion screen is missing. Please check your HTML.');
    return;
  }

  // 3. Mark all nav dots as completed
  document.querySelectorAll('.nav-step-dot').forEach(d => d.classList.add('done'));
  document.querySelectorAll('.nav-step-line').forEach(l => l.classList.add('done'));

  // 4. CRITICAL: Instantly scroll to the very top so users see the message
  window.scrollTo({ top: 0, behavior: 'instant' });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

function resetAll() {
  selectedDishes = [];
  people = 10;
  shoppingList = [];
  haveAtHome.clear();
  checkedItems.clear();
  currentRegion = 'all';
  currentSearch = '';
  currentCountry = null;
  userLocation = null;

  localStorage.removeItem('smartchef_dishes');
  localStorage.removeItem('smartchef_pantry');

  document.getElementById('peopleCount').textContent = '10';
  document.getElementById('searchInput').value = '';
  document.querySelectorAll('.region-tab').forEach(t => t.classList.toggle('active', t.dataset.region === 'all'));
  document.getElementById('btnToStep2').disabled = true;
  document.getElementById('btnDone').disabled = true;
  document.getElementById('selectedSummary').style.display = 'none';
  document.getElementById('countriesView').style.display = 'block';
  document.getElementById('dishesView').style.display = 'none';
  document.getElementById('step1Title').textContent = 'Pick a Country';
  document.getElementById('step1Subtitle').textContent = 'Choose a country to explore its signature dishes';
  
  // Reset location UI
  resetLocationUI();

  renderCountries();
  goToStep(0);
}

document.addEventListener('DOMContentLoaded', () => {
  const logo = document.querySelector('.nav-logo');
  if (logo) {
    logo.style.cursor = 'pointer';
    logo.addEventListener('click', () => {
      resetAll();
    });
  }
});

init();

/* --- Modern polish: reveal-on-scroll + nav elevation --- */
document.documentElement.classList.add('js');
(() => {
  const nav = document.querySelector('.nav');
  addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', scrollY > 8);
  }, { passive: true });

  const SEL = '.feature-box, .hiw-step, .cuisine-strip, .store-card, .combo-card, .completion-feature';
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  const scan = root => {
    (root || document).querySelectorAll(SEL).forEach(el => {
      if (!el.classList.contains('reveal')) {
        el.classList.add('reveal');
        io.observe(el);
      }
    });
  };

  new MutationObserver(muts => {
    muts.forEach(m => m.addedNodes.forEach(n => {
      if (n.nodeType !== 1) return;
      if (n.matches(SEL) && !n.classList.contains('reveal')) {
        n.classList.add('reveal');
        io.observe(n);
      }
      scan(n);
    }));
  }).observe(document.body, { childList: true, subtree: true });

  scan();
})();