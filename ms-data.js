// =====================================================================
// MediShop Shared Data & Utilities
// =====================================================================

const MS_PRODUCTS = [
  // FITNESS (7 products from your JSON + extras)
  {id:1,  name:"Multi-functional Gym Equipment", brand:"FitPro",      price:600,  oldPrice:750,  cat:"fitness",     badge:"top",  image:"assets/images/products/product01.png",    rating:4.9, reviews:312, stock:5},
  {id:2,  name:"Titan Grip Gloves",              brand:"Titan",        price:2,    oldPrice:null, cat:"fitness",     badge:"new",  image:"assets/images/products/product02.png",    rating:4.5, reviews:88,  stock:50},
  {id:3,  name:"Kettlebell 16kg",                brand:"IronEdge",     price:80,   oldPrice:100,  cat:"fitness",     badge:"sale", image:"assets/images/products/product03.png",    rating:4.7, reviews:204, stock:22},
  {id:4,  name:"Commercial Treadmill",           brand:"TechRun",      price:422,  oldPrice:520,  cat:"fitness",     badge:"sale", image:"assets/images/products/product04.png",    rating:4.8, reviews:156, stock:8},
  {id:5,  name:"Adjustable Dumbbells Set",       brand:"PowerMax",     price:12,   oldPrice:null, cat:"fitness",     badge:null,   image:"assets/images/products/product05.png",    rating:4.6, reviews:445, stock:35},
  {id:6,  name:"BN Micro PU Boxing Bag",         brand:"BN Sport",     price:220,  oldPrice:280,  cat:"fitness",     badge:"sale", image:"assets/images/products/product06.png",    rating:4.7, reviews:132, stock:15},
  {id:7,  name:"Speed Jump Rope",                brand:"AgileFit",     price:10,   oldPrice:null, cat:"fitness",     badge:"new",  image:"assets/images/products/product07.png",    rating:4.4, reviews:78,  stock:60},
  // SUPPLEMENTS (from your JSON + extras)
  {id:8,  name:"CHLOROPHYLL Supplement",         brand:"GreenLife",    price:9,    oldPrice:12,   cat:"supplements", badge:"sale", image:"assets/images/products/product-p91.png",  rating:4.6, reviews:198, stock:30},
  {id:9,  name:"Freak Show Pre-Workout 500mg",   brand:"Outbreak",     price:95,   oldPrice:null, cat:"supplements", badge:"top",  image:"assets/images/products/product1 1.png",   rating:4.8, reviews:342, stock:18},
  {id:10, name:"Drink Sleep Grow Recovery",      brand:"Applied Nutr", price:38,   oldPrice:48,   cat:"supplements", badge:"sale", image:"assets/images/products/product2 1.png",   rating:4.7, reviews:218, stock:9},
  {id:11, name:"G Fuel Energy Formula",          brand:"G Fuel",       price:43,   oldPrice:55,   cat:"supplements", badge:"sale", image:"assets/images/products/product3 1.png",   rating:4.6, reviews:512, stock:25},
  {id:28, name:"Zinc + Selenium Complex",        brand:"VitaShield",   price:20,   oldPrice:null, cat:"supplements", badge:"new",  image:"assets/images/products/product1 1.png",   rating:4.6, reviews:234, stock:65},
  {id:29, name:"Creatine Monohydrate 500g",      brand:"BulkPower",    price:30,   oldPrice:38,   cat:"supplements", badge:null,   image:"assets/images/products/product2 1.png",   rating:4.8, reviews:670, stock:40},
  {id:30, name:"Magnesium Glycinate 400mg",      brand:"SleepWell",    price:22,   oldPrice:null, cat:"supplements", badge:null,   image:"assets/images/products/product3 1.png",   rating:4.7, reviews:290, stock:55},
  // MEDICAL
  {id:12, name:"Comtrex Cold & Flu Relief",      brand:"Comtrex",      price:2.05, oldPrice:null, cat:"medical",     badge:"new",  image:"assets/images/products/product-p5 1.png", rating:4.5, reviews:89,  stock:50},
  {id:13, name:"Enalapril 10mg Tablets",         brand:"Pharma",       price:5,    oldPrice:null, cat:"medical",     badge:null,   image:"assets/images/products/product-p8 1.png", rating:4.9, reviews:156, stock:40},
  {id:14, name:"Hemorroimed 30mg Capsules",      brand:"EgyPharma",    price:9,    oldPrice:12,   cat:"medical",     badge:"sale", image:"assets/images/products/product-p91.png",  rating:4.3, reviews:73,  stock:6},
  {id:31, name:"Paracetamol 500mg 20 Tabs",      brand:"Panadol",      price:1.50, oldPrice:null, cat:"medical",     badge:null,   image:"assets/images/products/product-p5 1.png", rating:4.9, reviews:1200,stock:200},
  {id:32, name:"Ibuprofen 400mg Tabs",           brand:"Brufen",       price:3,    oldPrice:null, cat:"medical",     badge:null,   image:"assets/images/products/product-p8 1.png", rating:4.8, reviews:876, stock:150},
  {id:33, name:"Vitamin C 1000mg Effervescent",  brand:"Redoxon",      price:12,   oldPrice:15,   cat:"medical",     badge:"sale", image:"assets/images/products/product2 1.png",   rating:4.7, reviews:543, stock:80},
  // PHARMACY
  {id:25, name:"Omega-3 Fish Oil 1000mg",        brand:"CardioPlus",   price:25,   oldPrice:30,   cat:"pharmacy",    badge:null,   image:"assets/images/products/product-p91.png",  rating:4.7, reviews:445, stock:60},
  {id:26, name:"CoQ10 Coenzyme 200mg",           brand:"HeartGuard",   price:40,   oldPrice:50,   cat:"pharmacy",    badge:"sale", image:"assets/images/products/product3 1.png",   rating:4.8, reviews:312, stock:18},
  {id:34, name:"Multivitamin Daily Complete",    brand:"Centrum",      price:18,   oldPrice:22,   cat:"pharmacy",    badge:null,   image:"assets/images/products/product1 1.png",   rating:4.8, reviews:980, stock:120},
  {id:35, name:"Probiotic 10 Billion CFU",       brand:"BioFlora",     price:28,   oldPrice:null, cat:"pharmacy",    badge:"new",  image:"assets/images/products/product2 1.png",   rating:4.6, reviews:345, stock:75},
  {id:36, name:"Melatonin 5mg Sleep Aid",        brand:"NightRest",    price:15,   oldPrice:19,   cat:"pharmacy",    badge:"sale", image:"assets/images/products/product-p8 1.png", rating:4.7, reviews:521, stock:90},
  // CARDIOLOGY
  {id:37, name:"Aspirin Cardio 100mg",           brand:"Bayer",        price:8,    oldPrice:null, cat:"cardiology",  badge:null,   image:"assets/images/products/product-p5 1.png", rating:4.9, reviews:1100,stock:200},
  {id:38, name:"Blood Pressure Support Blend",   brand:"CardioNat",    price:35,   oldPrice:42,   cat:"cardiology",  badge:"sale", image:"assets/images/products/product-p91.png",  rating:4.6, reviews:187, stock:45},
  {id:39, name:"Hawthorn Berry Extract 500mg",   brand:"HeartHerb",    price:22,   oldPrice:null, cat:"cardiology",  badge:"new",  image:"assets/images/products/product3 1.png",   rating:4.5, reviews:143, stock:60},
  {id:40, name:"Potassium & Magnesium Complex",  brand:"VitalMin",     price:30,   oldPrice:38,   cat:"cardiology",  badge:null,   image:"assets/images/products/product2 1.png",   rating:4.7, reviews:267, stock:55},
  {id:41, name:"Red Yeast Rice 600mg",           brand:"CholestClear",  price:45,  oldPrice:55,   cat:"cardiology",  badge:"sale", image:"assets/images/products/product1 1.png",   rating:4.6, reviews:198, stock:33},
  // DEVICES
  {id:15, name:"Digital Blood Pressure Monitor", brand:"Omron",        price:55,   oldPrice:70,   cat:"devices",     badge:"top",  image:"assets/images/products/product08 1.png",  rating:4.9, reviews:523, stock:20},
  {id:16, name:"Smart Pulse Oximeter",           brand:"MedTech",      price:28,   oldPrice:35,   cat:"devices",     badge:"sale", image:"assets/images/products/product-p7 1.png", rating:4.7, reviews:341, stock:14},
  {id:42, name:"Infrared Thermometer",           brand:"iHealth",      price:38,   oldPrice:48,   cat:"devices",     badge:null,   image:"assets/images/products/product08 1.png",  rating:4.8, reviews:612, stock:30},
  {id:43, name:"Digital Glucose Meter Kit",      brand:"AccuCheck",    price:65,   oldPrice:80,   cat:"devices",     badge:"sale", image:"assets/images/products/product-p7 1.png", rating:4.9, reviews:445, stock:18},
  {id:44, name:"TENS Muscle Stimulator",         brand:"ReliefPro",    price:90,   oldPrice:110,  cat:"devices",     badge:null,   image:"assets/images/products/product08 1.png",  rating:4.6, reviews:234, stock:12},
  {id:45, name:"Smart Body Weight Scale",        brand:"FitScale",     price:48,   oldPrice:60,   cat:"devices",     badge:"new",  image:"assets/images/products/product-p7 1.png", rating:4.7, reviews:389, stock:25},
  // NATURAL
  {id:17, name:"Organic Turmeric + Black Pepper", brand:"NaturePure",  price:22,   oldPrice:null, cat:"natural",     badge:"new",  image:"assets/images/products/product-p91.png",  rating:4.6, reviews:167, stock:45},
  {id:18, name:"Manuka Honey MGO 400+",          brand:"BeeWell",      price:35,   oldPrice:42,   cat:"natural",     badge:null,   image:"assets/images/products/product2 1.png",   rating:4.8, reviews:289, stock:28},
  {id:46, name:"Black Seed Oil 500ml",           brand:"NigellaGold",  price:28,   oldPrice:35,   cat:"natural",     badge:"sale", image:"assets/images/products/product-p91.png",  rating:4.9, reviews:1456,stock:80},
  {id:47, name:"Moringa Leaf Powder 200g",       brand:"GreenEarth",   price:18,   oldPrice:null, cat:"natural",     badge:"new",  image:"assets/images/products/product3 1.png",   rating:4.7, reviews:321, stock:55},
  {id:48, name:"Rosehip Vitamin C Capsules",     brand:"PureHip",      price:25,   oldPrice:32,   cat:"natural",     badge:null,   image:"assets/images/products/product2 1.png",   rating:4.6, reviews:198, stock:70},
  {id:49, name:"Ashwagandha Root 600mg",         brand:"StressLess",   price:30,   oldPrice:null, cat:"natural",     badge:"top",  image:"assets/images/products/product1 1.png",   rating:4.8, reviews:567, stock:45},
  // BABY
  {id:19, name:"Baby Vitamin D3 Drops",          brand:"BabyLife",     price:18,   oldPrice:null, cat:"baby",        badge:"top",  image:"assets/images/products/product3 1.png",   rating:4.9, reviews:412, stock:55},
  {id:20, name:"Infant Saline Nasal Spray",      brand:"LittleCare",   price:8,    oldPrice:10,   cat:"baby",        badge:"sale", image:"assets/images/products/product1 1.png",   rating:4.7, reviews:198, stock:33},
  {id:50, name:"Baby Probiotic Drops",           brand:"TummyCare",    price:24,   oldPrice:30,   cat:"baby",        badge:null,   image:"assets/images/products/product2 1.png",   rating:4.8, reviews:287, stock:40},
  {id:51, name:"Organic Baby Cereal Starter",    brand:"GrowWell",     price:15,   oldPrice:null, cat:"baby",        badge:"new",  image:"assets/images/products/product3 1.png",   rating:4.7, reviews:165, stock:60},
  {id:52, name:"Nipple Cream Lanolin 30g",       brand:"MomCare",      price:12,   oldPrice:15,   cat:"baby",        badge:"sale", image:"assets/images/products/product-p5 1.png", rating:4.9, reviews:543, stock:75},
  {id:53, name:"Baby Teething Gel",              brand:"SoothGel",     price:9,    oldPrice:null, cat:"baby",        badge:null,   image:"assets/images/products/product-p8 1.png", rating:4.6, reviews:321, stock:88},
  // PERSONAL / SKINCARE
  {id:21, name:"SPF50 Sunscreen Moisturizer",    brand:"DermaCare",    price:30,   oldPrice:38,   cat:"personal",    badge:"sale", image:"assets/images/products/product-p5 1.png", rating:4.8, reviews:563, stock:42},
  {id:22, name:"Hyaluronic Acid Serum 2%",       brand:"GlowLab",      price:45,   oldPrice:null, cat:"personal",    badge:"new",  image:"assets/images/products/product-p8 1.png", rating:4.9, reviews:891, stock:37},
  {id:54, name:"Niacinamide 10% Face Serum",     brand:"Ordinary+",    price:38,   oldPrice:48,   cat:"personal",    badge:"sale", image:"assets/images/products/product-p5 1.png", rating:4.8, reviews:723, stock:50},
  {id:55, name:"Retinol 0.5% Night Cream",       brand:"AgeRewind",    price:55,   oldPrice:70,   cat:"personal",    badge:null,   image:"assets/images/products/product-p8 1.png", rating:4.7, reviews:412, stock:28},
  {id:56, name:"Micellar Cleansing Water 400ml", brand:"BioClean",     price:18,   oldPrice:22,   cat:"personal",    badge:"sale", image:"assets/images/products/product-p5 1.png", rating:4.6, reviews:567, stock:80},
  {id:57, name:"Vitamin C Brightening Toner",    brand:"GlowBoost",    price:28,   oldPrice:null, cat:"personal",    badge:"new",  image:"assets/images/products/product-p8 1.png", rating:4.8, reviews:345, stock:65},
];

const MS_FLASH = [
  {id:1,  name:"Multi-functional Gym Equipment", price:480, oldPrice:600, discount:20, image:"assets/images/products/product01.png",   sold:68, total:100},
  {id:9,  name:"Freak Show Pre-Workout",          price:75,  oldPrice:95,  discount:21, image:"assets/images/products/product1 1.png",  sold:82, total:100},
  {id:10, name:"Drink Sleep Grow",                price:28,  oldPrice:48,  discount:42, image:"assets/images/products/product2 1.png",  sold:55, total:80},
  {id:15, name:"Blood Pressure Monitor",          price:42,  oldPrice:70,  discount:40, image:"assets/images/products/product08 1.png", sold:40, total:60},
  {id:4,  name:"Commercial Treadmill",            price:320, oldPrice:422, discount:24, image:"assets/images/products/product04.png",   sold:12, total:30},
];

const MS_ARTICLES = [
  {
    id:1, slug:"home-gym-budget",
    title:"The Complete Guide to Building a Home Gym on a Budget",
    excerpt:"Discover the essential equipment and smart strategies to maximize your workout space without overspending.",
    cat:"FITNESS", tagCls:"to", date:"Mar 20, 2026", readTime:"6 min",
    author:"Coach Mahmoud Ali", authorRole:"Certified Fitness Trainer",
    image:"https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=900&q=85",
    content:`
      <p>Building a home gym doesn't require a massive budget. With the right approach and smart choices, you can create a fully functional workout space that rivals commercial gyms — for a fraction of the cost.</p>
      <h3>Start with the Essentials</h3>
      <p>Before buying expensive machines, focus on versatile equipment that delivers the most value per dollar. A good set of adjustable dumbbells, resistance bands, and a jump rope can handle 80% of your fitness needs at a tiny fraction of the cost of machines.</p>
      <h3>The Must-Have Equipment List</h3>
      <ul>
        <li><strong>Adjustable Dumbbells</strong> — Replace an entire rack of weights in one compact unit. Look for sets that go from 5–52 lbs for maximum versatility.</li>
        <li><strong>Pull-up Bar</strong> — Fits in any doorframe, works your entire upper body including lats, biceps, and core.</li>
        <li><strong>Resistance Bands</strong> — Perfect for stretching, warmups, and assisted exercises. Three resistance levels covers most needs.</li>
        <li><strong>Jump Rope</strong> — The most effective cardio tool per dollar spent. Burns 10 calories per minute and improves coordination.</li>
        <li><strong>Yoga Mat</strong> — Essential for floor work, stretching, and all bodyweight exercises.</li>
        <li><strong>Kettlebell</strong> — One 16kg kettlebell opens up an enormous range of functional movements unavailable with dumbbells.</li>
      </ul>
      <h3>Smart Buying Strategy</h3>
      <p>Start minimal — one set of dumbbells, a pull-up bar, and bands. Train with those for 4–6 weeks. You'll quickly identify real gaps in your training versus imagined ones. Add equipment only when a specific movement is genuinely limited.</p>
      <p>Patience pays off. Used gym equipment holds its value extremely well and you can often find commercial-quality pieces for 30–50% off retail by watching local marketplaces.</p>
      <h3>Space Optimization</h3>
      <p>Even a 10×10 ft area is enough for a comprehensive workout space. Use wall-mounted storage for bands and accessories. Foldable benches and rubber mat tiles let you transform any room into a gym in under two minutes.</p>
      <h3>The Bottom Line</h3>
      <p>You don't need a full commercial gym. You need consistency. A minimal home setup removes every barrier — no commute, no wait times, no membership fee. That alone makes it the most effective gym you'll ever use.</p>
    `
  },
  {
    id:2, slug:"medication-storage",
    title:"How to Safely Store Your Medications at Home",
    excerpt:"Proper medication storage is crucial for effectiveness and safety. Our pharmacists break it all down simply.",
    cat:"MEDICAL", tagCls:"tb", date:"Mar 15, 2026", readTime:"4 min",
    author:"Pharmacist Sara Khaled", authorRole:"Clinical Pharmacist",
    image:"https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=900&q=85",
    content:`
      <p>Improper medication storage is one of the most overlooked health risks in Egyptian households. Heat, humidity, and light can degrade medications significantly faster than their expiration dates suggest — meaning you might be taking an ineffective or even harmful product.</p>
      <h3>The Golden Rules</h3>
      <ul>
        <li><strong>Cool and Dry</strong> — Store most medications below 25°C, away from humidity. Egypt's summer heat is a real threat to drug stability.</li>
        <li><strong>Not the Bathroom Cabinet</strong> — Despite popular belief, bathrooms are the worst place for medications due to steam and temperature swings. Use a bedroom drawer instead.</li>
        <li><strong>Away from Direct Light</strong> — UV light breaks down many active pharmaceutical compounds, especially liquids and biologics.</li>
        <li><strong>Original Packaging</strong> — Keep medications in their original bottles or blister packs. These are engineered to protect the contents.</li>
        <li><strong>Childproof Storage</strong> — Use child-resistant caps and store in locked cabinets if you have young children at home.</li>
      </ul>
      <h3>Medications That Need Refrigeration</h3>
      <p>Insulin, certain eye drops, some antibiotics (like amoxicillin suspension), and most vaccines require refrigeration at 2–8°C. Store these in the main compartment of your fridge — never the door, where temperatures fluctuate with every opening.</p>
      <h3>Checking Expiry Dates</h3>
      <p>Do a medicine cabinet audit every 3 months. Discard anything expired. Don't flush medications down the toilet — return them to your pharmacist. MediShop offers free medication disposal at all partner locations.</p>
      <h3>Signs a Medication Has Degraded</h3>
      <p>Tablets that have changed color or crumbled, liquids that have separated or changed odor, or creams that have separated into layers should all be discarded, regardless of expiry date.</p>
    `
  },
  {
    id:3, slug:"top-supplements",
    title:"Top 10 Supplements for Energy and Muscle Recovery",
    excerpt:"Our fitness experts review the most effective compounds backed by science for optimal performance and recovery.",
    cat:"NUTRITION", tagCls:"tg", date:"Mar 10, 2026", readTime:"8 min",
    author:"Dr. Karim Saad", authorRole:"Sports Nutritionist",
    image:"https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=900&q=85",
    content:`
      <p>With thousands of supplements on the market, it's hard to know what actually works. This guide focuses exclusively on compounds with solid, replicated clinical evidence for energy and muscle recovery.</p>
      <h3>For Energy</h3>
      <ol>
        <li><strong>Creatine Monohydrate</strong> — The single most studied sports supplement in history. Increases phosphocreatine stores, enhancing ATP regeneration for explosive strength and power output. 3–5g daily. No loading required.</li>
        <li><strong>Caffeine</strong> — Not just for alertness. A genuine ergogenic aid that improves endurance by 2–4%, increases strength by 1–3%, and enhances mental focus. 3–6mg/kg body weight 30–60 minutes before training.</li>
        <li><strong>B-Complex Vitamins</strong> — Essential cofactors in energy metabolism. Deficiency is surprisingly common, especially B12 in those eating limited animal products.</li>
        <li><strong>CoQ10</strong> — Supports mitochondrial function, especially important over age 30. Clinical evidence supports 100–300mg daily for energy and cardiovascular health.</li>
        <li><strong>Iron (if deficient)</strong> — Often overlooked. Even mild anemia dramatically reduces aerobic capacity and energy levels. Test before supplementing.</li>
      </ol>
      <h3>For Recovery</h3>
      <ol>
        <li><strong>Whey Protein</strong> — Fast-absorbing, complete amino acid profile. 20–40g within 30 minutes post-training maximizes muscle protein synthesis.</li>
        <li><strong>Magnesium Glycinate</strong> — Supports sleep quality and muscle relaxation. Deficiency is extremely common and heavily depleted by sweat and stress.</li>
        <li><strong>Omega-3 Fish Oil</strong> — Reduces exercise-induced inflammation and DOMS. 2–3g EPA+DHA daily.</li>
        <li><strong>Tart Cherry Extract</strong> — Clinically proven to reduce muscle soreness by up to 24%. Take 480mg twice daily around training.</li>
        <li><strong>Zinc</strong> — Critical for testosterone production and immune function, heavily depleted by intense exercise and sweating.</li>
      </ol>
      <h3>What Doesn't Work</h3>
      <p>Save your money on BCAAs (redundant if you eat enough protein), most "fat burners," and anything promising dramatic results from a single ingredient. Real progress comes from training, sleep, and nutrition — supplements fill gaps, not replace fundamentals.</p>
    `
  },
  {
    id:4, slug:"heart-health-daily",
    title:"5 Daily Habits That Protect Your Heart",
    excerpt:"Simple, science-backed lifestyle changes that dramatically reduce your cardiovascular risk — starting today.",
    cat:"CARDIOLOGY", tagCls:"tb", date:"Mar 5, 2026", readTime:"5 min",
    author:"Dr. Fatma Nour", authorRole:"Interventional Cardiologist",
    image:"https://images.unsplash.com/photo-1559757175-5700dde675bc?w=900&q=85",
    content:`
      <p>Cardiovascular disease remains Egypt's leading cause of mortality, yet research consistently shows that up to 80% of cases are preventable through lifestyle modifications. These five daily habits have the strongest evidence base for cardiac protection.</p>
      <h3>1. Walk 8,000 Steps Daily</h3>
      <p>A landmark 2023 meta-analysis of 226,889 participants found that 8,000 steps/day reduces all-cause mortality by 51% compared to 4,000 steps. You don't need a gym membership — consistent daily walking is one of the most powerful cardiovascular interventions available.</p>
      <h3>2. Sleep 7–9 Hours</h3>
      <p>Sleep deprivation elevates cortisol, increases blood pressure, and disrupts glucose metabolism. Chronic short sleep (under 6 hours) independently doubles your risk of hypertension and significantly raises heart attack risk, separate from all other risk factors.</p>
      <h3>3. Eat Mediterranean-Style</h3>
      <p>The PREDIMED trial — 7,447 participants over 5 years — showed a Mediterranean diet supplemented with olive oil or nuts reduces major cardiovascular events by 30%. Focus on vegetables, legumes, fish, and olive oil as your primary fat source.</p>
      <h3>4. Manage Stress Actively</h3>
      <p>Chronic psychological stress elevates inflammatory markers including CRP and IL-6, which are directly linked to atherosclerosis progression. Meditation, regular exercise, and adequate social connection all demonstrably reduce stress-related cardiovascular risk.</p>
      <h3>5. Monitor Your Numbers</h3>
      <p>Blood pressure, fasting glucose, and lipid levels are largely silent — you won't feel them until damage is done. Home monitoring with a validated blood pressure cuff catches hypertension early when it's most treatable and least dangerous.</p>
    `
  },
  {
    id:5, slug:"baby-nutrition-guide",
    title:"Essential Nutrition for Babies 0–12 Months",
    excerpt:"Everything parents need to know about infant nutrition from birth through the first critical year of life.",
    cat:"BABY CARE", tagCls:"to", date:"Feb 28, 2026", readTime:"7 min",
    author:"Dr. Amira Hassan", authorRole:"Consultant Pediatrician",
    image:"https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=900&q=85",
    content:`
      <p>The first year of life sets the nutritional foundation for decades to come. Getting it right has lifelong implications for your child's immune system, cognitive development, and metabolic health.</p>
      <h3>0–6 Months: Breast Milk is Complete</h3>
      <p>Human breast milk is the gold standard — it provides all required macronutrients and micronutrients, passive immunity through immunoglobulins, and bioactive compounds no formula can replicate. Exclusive breastfeeding for 6 months is the recommendation of every major medical organization worldwide.</p>
      <h3>Vitamin D — Non-Negotiable</h3>
      <p>All breastfed infants require Vitamin D3 supplementation of 400 IU/day from birth. Breast milk contains insufficient Vitamin D regardless of maternal status. Without it, rickets — a preventable bone disease — remains a real risk in Egypt.</p>
      <h3>6–12 Months: Starting Solids</h3>
      <p>Introduce single-ingredient purees at 6 months. Start with iron-rich foods first — iron-fortified cereals, pureed meats, or mashed legumes — because breast milk iron is insufficient from this age onward. Introduce one new food every 3–5 days to identify potential allergies.</p>
      <h3>Foods to Avoid Before Age 1</h3>
      <ul>
        <li><strong>Honey</strong> — Risk of infant botulism, which can be fatal in babies under 12 months</li>
        <li><strong>Cow's milk as a main drink</strong> — Infant kidneys cannot handle the protein and mineral load</li>
        <li><strong>Added salt or sugar</strong> — Damages developing kidneys and sets unhealthy taste preferences</li>
        <li><strong>Hard choking hazards</strong> — Whole grapes, nuts, raw carrots, popcorn</li>
      </ul>
    `
  },
  {
    id:6, slug:"skincare-egyptian-climate",
    title:"Dermatologist's Guide to Skincare for the Egyptian Climate",
    excerpt:"Adapted skincare advice for Egypt's extreme UV index, heat, and humidity from a Cairo dermatologist.",
    cat:"SKINCARE", tagCls:"tg", date:"Feb 20, 2026", readTime:"5 min",
    author:"Dr. Rania Omar", authorRole:"Consultant Dermatologist",
    image:"https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=900&q=85",
    content:`
      <p>Egypt's climate presents unique skincare challenges: extreme UV radiation, high temperatures, and either desert dryness or coastal humidity. Here's how to adapt your routine for optimal skin health.</p>
      <h3>Sunscreen is Non-Negotiable</h3>
      <p>Egypt's UV index regularly reaches 10–11 (Extreme) in summer months. Daily SPF50+ broad-spectrum sunscreen is the single most impactful skincare product you can use — it prevents photoaging, hyperpigmentation, and significantly reduces skin cancer risk. Apply every morning, rain or shine.</p>
      <h3>Morning Routine</h3>
      <ol>
        <li>Gentle gel or foam cleanser</li>
        <li>Vitamin C serum (10–20% L-ascorbic acid) for antioxidant protection against UV-generated free radicals</li>
        <li>Lightweight oil-free moisturizer</li>
        <li>SPF50+ broad-spectrum sunscreen — this step is non-optional</li>
      </ol>
      <h3>Evening Routine</h3>
      <ol>
        <li>Double cleanse: oil cleanser first (removes sunscreen), then foam cleanser</li>
        <li>Retinol 0.25–0.5% (2–3x per week, build up slowly)</li>
        <li>Hyaluronic acid serum for hydration</li>
        <li>Moisturizer to seal everything in</li>
      </ol>
      <h3>Hyperpigmentation — Egypt's #1 Skin Concern</h3>
      <p>Melasma and post-inflammatory hyperpigmentation are extremely common due to high sun exposure and skin types III–VI that are prone to pigmentation changes. The evidence-based treatment trio: Niacinamide 10%, Vitamin C, and — above all — consistent daily sunscreen use. Avoid harsh physical scrubs, which worsen pigmentation through inflammation.</p>
    `
  },
];

const MS_HERO_SLIDES = [
  {
    bg: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1400&q=85",
    eyebrow: "🏋️ FITNESS COLLECTION",
    title: "Build the Body <span>You Deserve</span>",
    desc: "Premium gym equipment & supplements delivered to your door. Join 67,000+ Egyptians crushing their fitness goals.",
    cta: "Shop Fitness",
    filter: "fitness"
  },
  {
    bg: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1400&q=85",
    eyebrow: "💊 PHARMACY EXPRESS",
    title: "Your <span>Medicines</span>,<br>30 Minutes Away",
    desc: "Certified, authentic medications fast-delivered anywhere in Cairo and Giza. Licensed pharmacists available 24/7.",
    cta: "Order Now",
    filter: "medical"
  },
  {
    bg: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=1400&q=85",
    eyebrow: "🌿 NATURAL & ORGANIC",
    title: "Nature's <span>Best</span> for<br>Your Wellbeing",
    desc: "Curated organic supplements, natural remedies, and holistic wellness products sourced from trusted producers.",
    cta: "Shop Natural",
    filter: "natural"
  },
  {
    bg: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1400&q=85",
    eyebrow: "🩺 HEALTH DEVICES",
    title: "Smart <span>Health</span><br>Monitoring at Home",
    desc: "Clinical-grade blood pressure monitors, glucose meters, and oximeters — delivered same day.",
    cta: "Shop Devices",
    filter: "devices"
  },
];

// ── Shared helpers ──────────────────────────────────────────────────
function msGetCart()    { try{ return JSON.parse(localStorage.getItem('ms_cart')||'[]'); }catch(e){ return []; } }
function msGetUser()    { try{ return JSON.parse(localStorage.getItem('ms_user')||'null'); }catch(e){ return null; } }
function msGetWL()      { try{ return JSON.parse(localStorage.getItem('ms_wl')||'[]'); }catch(e){ return []; } }
function msSave(k,v)    { try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} }
function msCartCount()  { return msGetCart().reduce((s,i)=>s+i.qty,0); }
function msCartTotal()  { return msGetCart().reduce((s,i)=>s+i.price*i.qty,0); }

function msAddToCart(id,name,price,image){
  let c=msGetCart();
  const ex=c.find(i=>i.id===id);
  if(ex) ex.qty++; else c.push({id,name,price,image,qty:1});
  msSave('ms_cart',c);
  return c;
}

function msToast(html,type='s',containerId='msToastC'){
  let tc=document.getElementById(containerId);
  if(!tc) return;
  const t=document.createElement('div');
  t.className=`ms-toast ms-toast-${type}`;
  t.innerHTML=html;
  tc.appendChild(t);
  setTimeout(()=>{t.style.opacity='0';t.style.transform='translateX(2rem)';t.style.transition='all .3s';setTimeout(()=>t.remove(),300);},3200);
}

function msStartCountdown(secs,hId,mId,sId){
  let rem=secs;
  const fmt=n=>String(n).padStart(2,'0');
  const els=[document.getElementById(hId),document.getElementById(mId),document.getElementById(sId)];
  const tick=()=>{
    if(rem<=0) rem=6*3600;
    const h=Math.floor(rem/3600),m=Math.floor((rem%3600)/60),s=rem%60;
    if(els[0]) els[0].textContent=fmt(h);
    if(els[1]) els[1].textContent=fmt(m);
    if(els[2]) els[2].textContent=fmt(s);
    rem--;
  };
  tick(); setInterval(tick,1000);
}

function msUpdateCartBadge(badgeId='msCartBadge'){
  const el=document.getElementById(badgeId);
  if(el) el.textContent=msCartCount();
}

function msStars(rating){
  return [1,2,3,4,5].map(i=>`<i class="${i<=Math.floor(rating)?'fas':'far'} fa-star"></i>`).join('');
}
