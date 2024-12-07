export interface SubCategory {
  id: string;
  name: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  subcategories: SubCategory[];
}

export const blogCategories: BlogCategory[] = [
  {
    id: 'innovative-medicine',
    name: 'Innovative Medicine',
    subcategories: [
      { id: 'herbal-cures', name: 'Herbal Cures' },
      { id: 'marine-therapies', name: 'Marine Therapies' },
      { id: 'energy-healing', name: 'Energy Healing' },
      { id: 'mind-body-care', name: 'Mind-Body Care' },
      { id: 'ancient-remedies', name: 'Ancient Remedies' },
      { id: 'functional-health', name: 'Functional Health' }
    ]
  },
  {
    id: 'womens-health',
    name: 'Women\'s Health',
    subcategories: [
      { id: 'menopause', name: 'Menopause' },
      { id: 'beauty-aging', name: 'Beauty Aging' },
      { id: 'pregnancy', name: 'Pregnancy' },
      { id: 'period-care', name: 'Period Care' },
      { id: 'womens-nutrition', name: 'Women\'s Nutrition' },
      { id: 'womens-fitness', name: 'Women\'s Fitness' }
    ]
  },
  {
    id: 'smart-supplements',
    name: 'Smart Supplements',
    subcategories: [
      { id: 'essential-nutrients', name: 'Essential Nutrients' },
      { id: 'herbal-picks', name: 'Herbal Picks' },
      { id: 'sports-boosters', name: 'Sports Boosters' },
      { id: 'targeted-blends', name: 'Targeted Blends' },
      { id: 'supplement-trends', name: 'Supplement Trends' },
      { id: 'therapeutic-mixes', name: 'Therapeutic Mixes' }
    ]
  },
  {
    id: 'mind-wellness',
    name: 'Mind Wellness',
    subcategories: [
      { id: 'stress-hacks', name: 'Stress Hacks' },
      { id: 'therapy-options', name: 'Therapy Options' },
      { id: 'better-sleep', name: 'Better Sleep' },
      { id: 'mental-tech', name: 'Mental Tech' },
      { id: 'emotional-health', name: 'Emotional Health' },
      { id: 'brain-boosters', name: 'Brain Boosters' }
    ]
  },
  {
    id: 'fitness-recovery',
    name: 'Fitness & Recovery',
    subcategories: [
      { id: 'home-workouts', name: 'Home Workouts' },
      { id: 'functional-fitness', name: 'Functional Fitness' },
      { id: 'sports-fuel', name: 'Sports Fuel' },
      { id: 'cardio-tips', name: 'Cardio Tips' },
      { id: 'recovery-hacks', name: 'Recovery Hacks' },
      { id: 'muscle-building', name: 'Muscle Building' },
      { id: 'advanced-fitness', name: 'Advanced Fitness' },
      { id: 'injury-care', name: 'Injury Care' }
    ]
  },
  {
    id: 'skin-hair',
    name: 'Skin & Hair',
    subcategories: [
      { id: 'anti-aging', name: 'Anti-Aging' },
      { id: 'natural-beauty', name: 'Natural Beauty' },
      { id: 'protective-care', name: 'Protective Care' },
      { id: 'hair-growth', name: 'Hair Growth' },
      { id: 'skin-repair', name: 'Skin Repair' },
      { id: 'scalp-care', name: 'Scalp Care' }
    ]
  },
  {
    id: 'diet-healing',
    name: 'Diet & Healing',
    subcategories: [
      { id: 'custom-diets', name: 'Custom Diets' },
      { id: 'gut-health', name: 'Gut Health' },
      { id: 'brain-nutrition', name: 'Brain Nutrition' },
      { id: 'weight-loss', name: 'Weight Loss' },
      { id: 'healing-foods', name: 'Healing Foods' },
      { id: 'top-superfoods', name: 'Top Superfoods' }
    ]
  },
  {
    id: 'biohacking',
    name: 'Biohacking',
    subcategories: [
      { id: 'dna-health', name: 'DNA Health' },
      { id: 'circadian-care', name: 'Circadian Care' },
      { id: 'stress-hacks', name: 'Stress Hacks' },
      { id: 'mental-clarity', name: 'Mental Clarity' },
      { id: 'anti-aging', name: 'Anti-Aging' },
      { id: 'health-tech', name: 'Health Tech' }
    ]
  }
];

export const getAllSubcategories = (): SubCategory[] => {
  return blogCategories.flatMap(category => category.subcategories);
};

export const getSubcategoriesByMainCategory = (mainCategoryId: string): SubCategory[] => {
  const category = blogCategories.find(cat => cat.id === mainCategoryId);
  return category ? category.subcategories : [];
};
