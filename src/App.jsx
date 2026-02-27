import React, { useState, useEffect, useRef, useCallback } from "react";

// ─── QUESTION BANK ────────────────────────────────────────────────────────────
const DEFAULT_QUESTIONS = {
  Starter: [
    { id:"s1", emoji:"🛒", title:"Grocery Run", topic:"Addition", story:"You're grabbing snacks for movie night! Chips ($3.50), soda ($2.25), candy ($1.75). You hand over a crisp $10 bill.", question:"How much change do you pocket? 💸", options:["$2.50","$3.50","$2.00","$4.50"], answer:"$2.50", hint:"Add all three prices together first, THEN subtract from $10.", steps:["$3.50 + $2.25 + $1.75 = $7.50","$10.00 − $7.50 = $2.50 change!"], whyItMatters:"Next time you're at checkout, your brain will do this automatically. You'll never get shortchanged again! 🙌" },
    { id:"s2", emoji:"🍕", title:"Pizza Party", topic:"Division", story:"You and 5 friends ordered 3 pizzas (8 slices each). Everyone's starving — time to divide it up!", question:"How many slices does each person get?", options:["3 slices","4 slices","5 slices","6 slices"], answer:"4 slices", hint:"Find the TOTAL slices first, then share equally between 6 people.", steps:["3 pizzas × 8 slices = 24 total slices","24 slices ÷ 6 people = 4 slices each 🍕"], whyItMatters:"Fair sharing is a life skill you'll use forever — splitting bills, food, work... everything!" },
    { id:"s3", emoji:"⏰", title:"Movie Night", topic:"Time Math", story:"The movie starts at 7:45 PM. It's 2 hours and 35 minutes long. You want to text your friend when it ends.", question:"What time does it end?", options:["9:45 PM","10:20 PM","10:15 PM","10:30 PM"], answer:"10:20 PM", hint:"Add the hours first (7:45 + 2hrs = 9:45), then add the remaining minutes.", steps:["7:45 PM + 2 hours = 9:45 PM","9:45 PM + 35 minutes = 10:20 PM ⏰"], whyItMatters:"Time math keeps you on schedule — knowing when to leave, arrive, and how long things take!" },
    { id:"s4", emoji:"🎮", title:"Gaming Budget", topic:"Subtraction", story:"You saved $45 doing chores. A new game costs $29.99 and a cool controller skin costs $8.50. Worth it?", question:"How much money do you have left?", options:["$6.51","$7.01","$16.01","$5.51"], answer:"$6.51", hint:"Add the two costs together first, then subtract from your $45.", steps:["$29.99 + $8.50 = $38.49 spent","$45.00 − $38.49 = $6.51 left 🎮"], whyItMatters:"Budget math stops you from spending money you don't have. Your future self will thank you!" },
    { id:"s5", emoji:"🏃", title:"Track Star", topic:"Multiplication", story:"You're training for the school track meet! You run 4 laps around a 400-meter track every practice session, 5 days a week.", question:"How many total meters do you run this week?", options:["1,600 m","8,000 m","2,000 m","4,000 m"], answer:"8,000 m", hint:"Meters per session × days per week. (Hint: calculate one practice first!)", steps:["4 laps × 400 meters = 1,600 meters per session","1,600 × 5 days = 8,000 meters this week! 🏃"], whyItMatters:"Athletes, coaches, and fitness apps all use this math to track training progress!" },
    { id:"s6", emoji:"🎂", title:"Birthday Cake", topic:"Fractions", story:"You baked an amazing birthday cake and cut it into 12 equal slices. The party was wild — 7 slices disappeared fast!", question:"What fraction of the cake is left?", options:["5/12","7/12","1/2","1/3"], answer:"5/12", hint:"Slices left = 12 minus 7. Then put that number over 12.", steps:["12 − 7 = 5 slices remaining","5 out of 12 = 5/12 of the cake 🎂"], whyItMatters:"Fractions describe parts of anything — data, money, ingredients, probability. They're everywhere!" },
    { id:"s7", emoji:"💧", title:"Hydration Hero", topic:"Multiplication", story:"Your doctor says drink 8 cups of water per day. You want to fill up a big jug for the whole week at once.", question:"How many cups of water do you need for a full week?", options:["48 cups","56 cups","64 cups","72 cups"], answer:"56 cups", hint:"8 cups per day × 7 days in a week.", steps:["8 cups × 7 days = 56 cups per week 💧"], whyItMatters:"Tracking your health goals — water, sleep, steps — all uses this kind of multiplication!" },
    { id:"s8", emoji:"📚", title:"Reading Quest", topic:"Division", story:"Your English class challenge: read 120 pages in 4 weeks. You want to spread it out evenly so it's not stressful.", question:"How many pages per week do you need to read?", options:["20 pages","25 pages","30 pages","35 pages"], answer:"30 pages", hint:"Divide total pages by number of weeks.", steps:["120 pages ÷ 4 weeks = 30 pages per week 📚"], whyItMatters:"Breaking big goals into small weekly chunks is how every successful person stays on track!" },
    { id:"s9", emoji:"🌡️", title:"Weather Whoa", topic:"Negative Numbers", story:"At noon it was a cozy 14°F outside. By midnight, the temperature dropped a brutal 23 degrees. Brr! 🥶", question:"What's the midnight temperature?", options:["-9°F","-7°F","9°F","-11°F"], answer:"-9°F", hint:"14 minus 23... that goes below zero! Use a number line if it helps.", steps:["14 − 23 = −9°F","It's 9 degrees BELOW zero! 🥶"], whyItMatters:"Negative numbers describe tons of real things: sub-zero temps, bank overdrafts, sea depths, and more!" },
    { id:"s10", emoji:"🎁", title:"Group Gift", topic:"Division", story:"You and 4 friends (5 people total) are pooling money for a $67.50 birthday present. Everyone pays equally — no drama!", question:"How much does each person chip in?", options:["$12.50","$13.00","$13.50","$14.00"], answer:"$13.50", hint:"Divide the total cost by 5 people.", steps:["$67.50 ÷ 5 people = $13.50 each 🎁"], whyItMatters:"You'll split costs with friends your whole life — dinners, gifts, trips, apartments!" },
    { id:"s11", emoji:"🍦", title:"Ice Cream Run", topic:"Multiplication", story:"You're making an ice cream run for you and 3 friends (4 people). Each scoop costs $3.25. Time to do the math before you get there!", question:"What's the total cost?", options:["$12.00","$12.75","$13.00","$13.25"], answer:"$13.00", hint:"$3.25 multiplied by 4 people.", steps:["$3.25 × 4 people = $13.00 total 🍦"], whyItMatters:"Estimating costs before you buy prevents those awkward 'I don't have enough money' moments!" },
    { id:"s12", emoji:"🎒", title:"Back to School", topic:"Addition", story:"School supply haul! Backpack ($24.00), notebooks ($6.50), and pencil set ($2.75). What's the damage?", question:"What's the total cost?", options:["$31.25","$33.25","$32.75","$34.25"], answer:"$33.25", hint:"Add all three prices together.", steps:["$24.00 + $6.50 = $30.50","$30.50 + $2.75 = $33.25 total 🎒"], whyItMatters:"Adding up a cart before checkout is a habit that saves you from budget surprises every time you shop!" },
  ],
  Challenger: [
    { id:"c1", emoji:"👟", title:"Sneaker Drop!", topic:"Percentages", story:"Your dream sneakers normally cost $80, but there's a 25% OFF sale! BUT — there's 8% tax on the sale price. Let's figure this out before someone else grabs your size!", question:"What's the final price you actually pay?", options:["$60.00","$64.80","$62.40","$58.80"], answer:"$64.80", hint:"Step 1: Calculate the discount. Step 2: Add tax to the SALE price (not original).", steps:["Discount: 25% of $80 = $20 off","Sale price: $80 − $20 = $60","Tax: 8% of $60 = $4.80","Final: $60 + $4.80 = $64.80 👟"], whyItMatters:"Sales + tax math is used literally every time you shop. Master this and you'll always know the REAL price!" },
    { id:"c2", emoji:"🚲", title:"Bike to Friend's", topic:"Speed & Rates", story:"You can bike 12 miles in 45 minutes. Your friend just texted — they need you. Their house is 8 miles away. How long until you arrive?", question:"How many minutes will the trip take?", options:["25 min","30 min","35 min","40 min"], answer:"30 min", hint:"Find your speed (miles per minute), then use it to calculate the time for 8 miles.", steps:["Your rate: 12 miles ÷ 45 min = 4/15 miles per minute","Time for 8 miles: 8 ÷ (4/15) = 30 minutes 🚲"], whyItMatters:"Speed, distance, and time calculations are essential for travel planning — whether biking, driving, or flying!" },
    { id:"c3", emoji:"🎨", title:"Room Glow-Up", topic:"Area Math", story:"Your bedroom wall needs a fresh coat of paint! It's 12 feet wide and 8 feet tall. Each can of paint covers 40 square feet.", question:"How many paint cans do you need to buy?", options:["2 cans","3 cans","4 cans","5 cans"], answer:"3 cans", hint:"Calculate the wall area first, then divide by 40. Remember: always round UP — you can't buy half a can!", steps:["Wall area: 12 × 8 = 96 sq ft","96 ÷ 40 = 2.4 → Round UP to 3 cans 🎨"], whyItMatters:"Area math is used in construction, interior design, flooring, and any home project you'll ever do!" },
    { id:"c4", emoji:"🍔", title:"Restaurant Moment", topic:"Percentages", story:"You and a friend grab burgers. Your total bill is $24. The service was great, so you want to leave a 20% tip. Be the hero! 🦸", question:"What's the total amount you pay (meal + tip)?", options:["$27.20","$28.80","$29.20","$26.40"], answer:"$28.80", hint:"Calculate 20% of $24 for the tip, then add it to the meal price.", steps:["Tip: 20% of $24 = 0.20 × $24 = $4.80","Total: $24 + $4.80 = $28.80 🍔"], whyItMatters:"Tipping correctly is a real-life social skill everyone needs. You'll use this at every restaurant!" },
    { id:"c5", emoji:"🏊", title:"Pool Party Planning", topic:"Volume", story:"You're designing a backyard pool! The pool will be 15 ft long, 8 ft wide, and 4 ft deep. You need to know the volume to order the right amount of water.", question:"What's the pool volume in cubic feet?", options:["420 cu ft","480 cu ft","520 cu ft","560 cu ft"], answer:"480 cu ft", hint:"Volume = length × width × depth. All three dimensions!", steps:["V = 15 × 8 × 4","V = 480 cubic feet 🏊"], whyItMatters:"Volume calculations are used in construction, cooking (scaling recipes), shipping, and science experiments!" },
    { id:"c6", emoji:"📊", title:"Grade Grind", topic:"Averages", story:"You've been working hard all semester! Your test scores: 78, 92, 85, 90, and 75. What's your average?", question:"What is your test average?", options:["82","83","84","85"], answer:"84", hint:"Add ALL scores together, then divide by the number of tests (5).", steps:["78 + 92 + 85 + 90 + 75 = 420","420 ÷ 5 tests = 84 average 📊"], whyItMatters:"Averages are everywhere: GPA, sports stats, weather forecasts, stock prices, and survey results!" },
    { id:"c7", emoji:"🎪", title:"Carnival Boss", topic:"Profit Math", story:"You're running a carnival game! It costs $2 to play. You get 200 players tonight. But 15% of players WIN a prize that costs you $5 to make.", question:"What's your total profit tonight?", options:["$150","$250","$200","$300"], answer:"$250", hint:"Revenue = players × entry fee. Cost = number of winners × prize cost. Profit = Revenue − Cost.", steps:["Revenue: 200 × $2 = $400","Winners: 15% × 200 = 30 players","Prize cost: 30 × $5 = $150","Profit: $400 − $150 = $250 🎪"], whyItMatters:"Every business owner calculates revenue, costs, and profit exactly like this — including game developers and YouTubers!" },
    { id:"c8", emoji:"🌿", title:"Garden Project", topic:"Perimeter", story:"You're building a fence around your rectangular garden (9 ft × 6 ft) so your dog doesn't eat everything. Fencing costs $3.50 per foot.", question:"How much does the fencing cost?", options:["$94.50","$105.00","$189.00","$126.00"], answer:"$105.00", hint:"Find the perimeter (total distance around all 4 sides), then multiply by the cost per foot.", steps:["Perimeter: 2 × (9 + 6) = 2 × 15 = 30 ft","Cost: 30 ft × $3.50 = $105.00 🌿"], whyItMatters:"Perimeter math is used for fencing, picture frames, running tracks, and border calculations in architecture!" },
    { id:"c9", emoji:"⚽", title:"Soccer Analytics", topic:"Percentages", story:"Your team's star player attempted 40 shots this season and scored 14 goals. The coach wants to know the conversion rate for the stats sheet.", question:"What's the goal conversion rate?", options:["30%","32%","35%","38%"], answer:"35%", hint:"Divide goals scored by shots attempted, then multiply by 100.", steps:["14 goals ÷ 40 shots = 0.35","0.35 × 100 = 35% conversion rate ⚽"], whyItMatters:"Sports analytics — used by every professional team — is built entirely on this kind of percentage math!" },
    { id:"c10", emoji:"🏠", title:"Fair Rent Split", topic:"Ratios", story:"Three roommates split rent based on room size: Room A = 200 sq ft, Room B = 150 sq ft, Room C = 100 sq ft. Total rent = $1,800/month.", question:"How much does the person in the 200 sq ft room pay?", options:["$700","$750","$800","$900"], answer:"$800", hint:"Find the total square footage, then calculate what FRACTION is 200/total. Multiply that by $1,800.", steps:["Total: 200+150+100 = 450 sq ft","Room A fraction: 200/450 = 4/9","Rent: (4/9) × $1,800 = $800 🏠"], whyItMatters:"Proportional splits are used for rent, profit sharing, inheritance, and splitting any shared costs fairly!" },
    { id:"c11", emoji:"🌮", title:"Taco Deal Math", topic:"Unit Price", story:"The taco stand sells a 12-pack for $9.60 OR individual tacos for $0.95 each. You want 12 tacos. Which is the better deal and by how much?", question:"How much do you save per taco by buying the pack?", options:["$0.05","$0.10","$0.15","$0.20"], answer:"$0.15", hint:"Find the cost per taco in the pack (divide pack price by 12), then compare to the single price.", steps:["Pack price per taco: $9.60 ÷ 12 = $0.80 each","Single price: $0.95 each","Savings: $0.95 − $0.80 = $0.15 per taco 🌮"], whyItMatters:"Unit price comparison is the secret weapon savvy shoppers use at every grocery store and fast food run!" },
    { id:"c12", emoji:"🌍", title:"Time Zone Trip", topic:"Time Math", story:"Your flight from New York (EST) to Los Angeles (PST — 3 hours BEHIND) departs at 6:00 AM EST and takes 5.5 hours. When do you land?", question:"What's the local arrival time in LA?", options:["8:30 AM","11:30 AM","9:00 AM","10:30 AM"], answer:"8:30 AM", hint:"First add flight time to departure. THEN subtract 3 hours for the time zone change.", steps:["Arrival in EST: 6:00 AM + 5.5 hrs = 11:30 AM EST","Convert to PST: 11:30 AM − 3 hours = 8:30 AM 🌍"], whyItMatters:"Time zone math is essential for booking flights, scheduling international calls, and global business!" },
  ],
  Expert: [
    { id:"e1", emoji:"☕", title:"Lemonade Empire", topic:"Algebra", story:"You're building a lemonade empire! 🍋 Supplies cost $12. You sell each cup for $2.50. Your goal: make at least $28 in PROFIT.", question:"How many cups (c) do you need to sell? Solve: 2.50c − 12 ≥ 28", options:["14 cups","16 cups","18 cups","20 cups"], answer:"16 cups", hint:"Get the variable alone! Add 12 to both sides first, then divide by 2.50.", steps:["2.50c − 12 ≥ 28","Add 12: 2.50c ≥ 40","Divide by 2.50: c ≥ 16 cups! ☕"], whyItMatters:"This is literally how EVERY business owner thinks — break-even and profit calculations are pure algebra!" },
    { id:"e2", emoji:"✈️", title:"Dream Vacation", topic:"Algebra", story:"You're saving for a trip that costs $450. You already have $90 saved. You can save $45 per week from your allowance.", question:"How many weeks (w) until you can go? Solve: 90 + 45w = 450", options:["6 weeks","7 weeks","8 weeks","9 weeks"], answer:"8 weeks", hint:"Subtract 90 from both sides first, then divide both sides by 45.", steps:["90 + 45w = 450","Subtract 90: 45w = 360","Divide by 45: w = 8 weeks ✈️"], whyItMatters:"This is exactly how financial planners help people save for goals — houses, cars, college, vacations!" },
    { id:"e3", emoji:"📱", title:"Phone Plan Showdown", topic:"Algebra", story:"Plan A costs $30/month PLUS $10 per extra GB. Plan B costs $55 flat with unlimited data. At exactly how many extra GB do they cost the same?", question:"Solve: 30 + 10g = 55. Find g.", options:["1.5 GB","2 GB","2.5 GB","3 GB"], answer:"2.5 GB", hint:"Subtract 30 from both sides to isolate the variable, then divide by 10.", steps:["30 + 10g = 55","Subtract 30: 10g = 25","Divide by 10: g = 2.5 GB 📱"], whyItMatters:"'Break-even' analysis helps you choose the best phone plan, gym membership, or any subscription service!" },
    { id:"e4", emoji:"🚗", title:"Road Trip Math", topic:"Multi-Step", story:"Your family car gets 28 miles per gallon. Gas costs $3.80/gallon. You need to drive 196 miles to the theme park. 🎢 How much gas money do you need?", question:"What's the total fuel cost?", options:["$24.60","$25.80","$26.60","$27.00"], answer:"$26.60", hint:"First find how many gallons you need (miles ÷ mpg), then multiply by the price per gallon.", steps:["Gallons needed: 196 ÷ 28 = 7 gallons","Cost: 7 × $3.80 = $26.60 🚗"], whyItMatters:"Every driver calculates fuel costs before road trips. This will save you from running out of gas in the middle of nowhere!" },
    { id:"e5", emoji:"🏦", title:"Money Grows!", topic:"Interest", story:"You put $500 in a savings account with 4% annual interest. You don't touch it for 3 years. (Simple interest: I = P × r × t)", question:"How much total money do you have after 3 years?", options:["$550","$560","$572","$580"], answer:"$560", hint:"Use the formula I = P × r × t to find interest earned. Add it to the original amount.", steps:["Interest: I = $500 × 0.04 × 3 = $60","Total: $500 + $60 = $560 🏦"], whyItMatters:"Understanding how interest works is the foundation of building wealth — or avoiding debt traps!" },
    { id:"e6", emoji:"🎓", title:"Scholarship Math", topic:"Weighted Averages", story:"A scholarship calculates scores like this: Tests = 50%, Projects = 30%, Participation = 20%. Your scores: Tests 88, Projects 95, Participation 70. What did you get?", question:"What is your weighted score?", options:["84.5","86.5","87.0","88.5"], answer:"86.5", hint:"Multiply each score by its decimal weight, then ADD all three results together.", steps:["Tests: 88 × 0.50 = 44.0","Projects: 95 × 0.30 = 28.5","Participation: 70 × 0.20 = 14.0","Total: 44 + 28.5 + 14 = 86.5 🎓"], whyItMatters:"GPA calculations, job performance reviews, and scholarship rankings all use weighted averages — now you know how!" },
    { id:"e7", emoji:"🏪", title:"Entrepreneur Mode", topic:"Markup Math", story:"You buy a jacket for $45 wholesale and sell it in your online store. You apply a 60% markup to make profit.", question:"What's your selling price?", options:["$69","$72","$75","$78"], answer:"$72", hint:"Markup amount = 60% of your cost. Selling price = cost + markup amount.", steps:["Markup: 60% × $45 = $27","Selling price: $45 + $27 = $72 🏪"], whyItMatters:"Every retailer, drop-shipper, and entrepreneur uses markup math to price their products — including YouTubers with merch!" },
    { id:"e8", emoji:"🌎", title:"World Traveler", topic:"Ratios", story:"You're heading to Paris! 🗼 The exchange rate today is $1 USD = 0.92 euros. You have $350 to convert at the airport.", question:"How many euros will you receive?", options:["310 euros","315 euros","322 euros","330 euros"], answer:"322 euros", hint:"Multiply your dollar amount by the exchange rate.", steps:["€ = $350 × 0.92","€ = 322 euros 🌎"], whyItMatters:"Currency conversion is essential for international travel, online shopping from abroad, and global business!" },
    { id:"e9", emoji:"📈", title:"Stock Market Buzz", topic:"Percent Change", story:"You bought a stock at $24 per share. A year later, it's worth $30 per share. How much did it grow in percentage?", question:"What is the percent increase?", options:["20%","25%","30%","35%"], answer:"25%", hint:"Percent change formula: (new value − old value) ÷ old value × 100.", steps:["Change: $30 − $24 = $6","% increase: ($6 ÷ $24) × 100 = 25% 📈"], whyItMatters:"Percent change is how investors, analysts, and news reporters describe growth or loss — you'll see this everywhere!" },
    { id:"e10", emoji:"🏗️", title:"Build It!", topic:"Algebra", story:"A contractor charges $45/hour for labor plus $320 for materials. You have exactly $680 in your budget.", question:"Maximum labor hours you can afford? Solve: 45h + 320 = 680", options:["7 hours","8 hours","9 hours","10 hours"], answer:"8 hours", hint:"Subtract 320 from both sides first to isolate the term with h, then divide by 45.", steps:["45h + 320 = 680","Subtract 320: 45h = 360","Divide by 45: h = 8 hours 🏗️"], whyItMatters:"Homeowners and project managers solve equations like this EVERY day when hiring contractors!" },
    { id:"e11", emoji:"🎰", title:"Game of Chance", topic:"Probability", story:"A bag has 4 red, 6 blue, and 2 green marbles. You reach in without looking.", question:"What's the probability of pulling out a blue marble?", options:["1/3","1/2","2/5","3/5"], answer:"1/2", hint:"Probability = favorable outcomes ÷ total outcomes. Count all the marbles first!", steps:["Total marbles: 4 + 6 + 2 = 12","P(blue) = 6/12 = 1/2 🎰"], whyItMatters:"Probability runs games, insurance rates, weather forecasts, medical treatments, and AI — it's literally everywhere!" },
    { id:"e12", emoji:"🍔", title:"Calorie Detective", topic:"Algebra & Health", story:"Your daily calorie goal is 2,000. So far today: breakfast 480 cal, lunch 620 cal, snack 300 cal. Dinner is next.", question:"How many calories can dinner be to stay on goal?", options:["500 cal","580 cal","600 cal","620 cal"], answer:"600 cal", hint:"Add up what you've already eaten, then subtract from 2,000.", steps:["Eaten so far: 480 + 620 + 300 = 1,400 cal","Remaining: 2,000 − 1,400 = 600 cal 🍔"], whyItMatters:"Nutritionists, athletes, and anyone tracking their health uses this calculation every single day!" },
  ],
};

const RANKS = [
  { min:0,    label:"Math Rookie",     icon:"🥉", color:"#cd7f32", bg:"rgba(205,127,50,0.15)" },
  { min:100,  label:"Number Cruncher", icon:"📐", color:"#94a3b8", bg:"rgba(148,163,184,0.15)" },
  { min:300,  label:"Algebra Ace",     icon:"⚡", color:"#fbbf24", bg:"rgba(251,191,36,0.15)" },
  { min:600,  label:"Math Wizard",     icon:"🔮", color:"#a78bfa", bg:"rgba(167,139,250,0.15)" },
  { min:1000, label:"Math Legend",     icon:"🏆", color:"#f472b6", bg:"rgba(244,114,182,0.15)" },
  { min:1800, label:"Galaxy Brain",    icon:"🌌", color:"#67e8f9", bg:"rgba(103,232,249,0.15)" },
];

const FUN_ENCOURAGEMENTS_CORRECT = [
  "BOOM! You nailed it! 🎉", "That's what I'm talking about! 🔥", "You're on fire! ⚡",
  "Math champion energy! 🏆", "Too easy for you! 😎", "Absolutely CRUSHED it! 💪",
  "Brain = Big. 🧠", "Yesss!! Keep it up! 🎊", "You make this look easy! ✨",
];
const FUN_ENCOURAGEMENTS_WRONG = [
  "Ooh, close! Check the steps below 👇", "Not quite — but now you'll remember it! 💡",
  "Good try! The explanation below will help 📖", "That's how you learn! Let's see why 🤔",
  "Every mistake = brain upgrade! 🧠", "No stress! Check it out below 👇",
];

const TEACHER_PW = "mathteacher2024";
const LS_XP = "rwm_xp3";
const LS_LB = "rwm_lb3";
const LS_QS = "rwm_qs3";
const LS_NAME = "rwm_autoname3";

// ─── KID-SAFE NAME GENERATOR ─────────────────────────────────────────────────
const NAME_ADJECTIVES = [
  "Cosmic","Turbo","Speedy","Mighty","Funky","Blazing","Zappy","Jolly","Bouncy","Stellar",
  "Ninja","Heroic","Radical","Epic","Wacky","Zippy","Brave","Cozy","Neon","Lucky",
  "Snappy","Glowing","Breezy","Sunny","Frozen","Hyper","Peppy","Swift","Mega","Dizzy",
  "Fluffy","Sparkly","Groovy","Wiggly","Jumpy","Silly","Clever","Dandy","Fancy","Vivid",
];
const NAME_NOUNS = [
  "Panda","Rocket","Wizard","Penguin","Dragon","Unicorn","Koala","Falcon","Otter","Phoenix",
  "Hedgehog","Comet","Tiger","Mango","Sloth","Dolphin","Cactus","Quokka","Narwhal","Llama",
  "Bumblebee","Cheetah","Octopus","Flamingo","Gecko","Platypus","Capybara","Axolotl","Walrus","Toucan",
  "Hamster","Raccoon","Lemur","Manatee","Lobster","Wombat","Pegasus","Chameleon","Badger","Meerkat",
];

function generateName() {
  const adj = NAME_ADJECTIVES[Math.floor(Math.random() * NAME_ADJECTIVES.length)];
  const noun = NAME_NOUNS[Math.floor(Math.random() * NAME_NOUNS.length)];
  const num = Math.floor(Math.random() * 90) + 10;
  return `${adj}${noun}${num}`;
}

function getRank(xp) {
  let r = RANKS[0];
  for (const rank of RANKS) { if (xp >= rank.min) r = rank; }
  return r;
}
function getNextRank(xp) {
  return RANKS.find(r => r.min > xp) || null;
}
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function lsGet(k, fb) { try { const v = JSON.parse(localStorage.getItem(k)); return v ?? fb; } catch { return fb; } }
function lsSet(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }
function randFrom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

// ─── FLOATING PARTICLES ───────────────────────────────────────────────────────
function Particles() {
  const emojis = ["➕","➖","✖️","➗","🔢","📐","🎯","⭐","💡","🔮"];
  return (
    <div style={{position:"fixed",inset:0,pointerEvents:"none",overflow:"hidden",zIndex:0}}>
      {Array.from({length:12}).map((_,i) => (
        <div key={i} style={{
          position:"absolute",
          left:`${(i*8.3+Math.random()*5)}%`,
          top:`${Math.random()*100}%`,
          fontSize:`${0.9+Math.random()*0.8}rem`,
          opacity:0.12,
          animation:`floatUp ${8+Math.random()*6}s linear ${Math.random()*8}s infinite`,
          userSelect:"none",
        }}>{emojis[i % emojis.length]}</div>
      ))}
      <style>{`
        @keyframes floatUp { 0%{transform:translateY(0) rotate(0deg);opacity:0.12} 50%{opacity:0.18} 100%{transform:translateY(-110vh) rotate(360deg);opacity:0} }
        @keyframes pop { 0%{transform:scale(0.5);opacity:0} 60%{transform:scale(1.2)} 100%{transform:scale(1);opacity:1} }
        @keyframes shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-6px)} 40%{transform:translateX(6px)} 60%{transform:translateX(-4px)} 80%{transform:translateX(4px)} }
        @keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.05)} }
        @keyframes slideIn { from{transform:translateY(24px);opacity:0} to{transform:translateY(0);opacity:1} }
        @keyframes xpPop { 0%{transform:translateY(0) scale(1);opacity:1} 100%{transform:translateY(-40px) scale(1.4);opacity:0} }
        @keyframes confettiFall { 0%{transform:translateY(-20px) rotate(0deg);opacity:1} 100%{transform:translateY(110vh) rotate(720deg);opacity:0} }
        @keyframes starBurst { 0%{transform:scale(0) rotate(-180deg);opacity:0} 70%{transform:scale(1.3) rotate(10deg)} 100%{transform:scale(1) rotate(0deg);opacity:1} }
        @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
      `}</style>
    </div>
  );
}

// ─── CONFETTI ─────────────────────────────────────────────────────────────────
function Confetti({ active }) {
  const ref = useRef();
  useEffect(() => {
    if (!active || !ref.current) return;
    const c = ref.current, ctx = c.getContext("2d");
    c.width = window.innerWidth; c.height = window.innerHeight;
    const cols = ["#f9ca24","#e84393","#00b894","#6ee7b7","#a78bfa","#ff6b81","#fdcb6e","#74b9ff"];
    const pieces = Array.from({length:180}, () => ({
      x: Math.random()*c.width, y: Math.random()*-200,
      r: Math.random()*9+4, col: cols[Math.floor(Math.random()*cols.length)],
      spd: Math.random()*5+2, spin: Math.random()*0.3-0.15, ang: 0,
      wobble: Math.random()*3, wobbleSpd: Math.random()*0.05,
    }));
    let raf, frame=0;
    const draw = () => {
      ctx.clearRect(0,0,c.width,c.height);
      pieces.forEach(p => {
        p.y += p.spd; p.ang += p.spin; frame++;
        p.x += Math.sin(frame*p.wobbleSpd)*p.wobble;
        if (p.y > c.height) { p.y = -20; p.x = Math.random()*c.width; }
        ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.ang);
        ctx.fillStyle = p.col; ctx.fillRect(-p.r/2,-p.r/2,p.r,p.r*0.6);
        ctx.restore();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    const t = setTimeout(() => cancelAnimationFrame(raf), 5000);
    return () => { cancelAnimationFrame(raf); clearTimeout(t); };
  }, [active]);
  if (!active) return null;
  return <canvas ref={ref} style={{position:"fixed",top:0,left:0,pointerEvents:"none",zIndex:9999}}/>;
}

// ─── XP BAR ───────────────────────────────────────────────────────────────────
function XPBar({ xp, animate }) {
  const rank = getRank(xp);
  const next = getNextRank(xp);
  const pct = next ? Math.min(100,((xp-rank.min)/(next.min-rank.min))*100) : 100;
  return (
    <div style={{background:"rgba(255,255,255,0.06)",borderRadius:14,padding:"12px 14px",border:"1px solid rgba(255,255,255,0.1)"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
        <span style={{color:rank.color,fontWeight:900,fontSize:"0.9rem"}}>{rank.icon} {rank.label}</span>
        <span style={{color:"rgba(255,255,255,0.45)",fontSize:"0.75rem"}}>{xp} XP{next?` / ${next.min}`:""}</span>
      </div>
      <div style={{height:10,background:"rgba(255,255,255,0.08)",borderRadius:99,overflow:"hidden",position:"relative"}}>
        <div style={{height:"100%",width:`${pct}%`,background:`linear-gradient(90deg,${rank.color},#e84393)`,borderRadius:99,transition:"width 1.2s ease",boxShadow:`0 0 12px ${rank.color}88`}}/>
      </div>
      {next && <div style={{color:"rgba(255,255,255,0.3)",fontSize:"0.7rem",marginTop:4,textAlign:"right"}}>{next.min-xp} XP to {next.icon} {next.label}</div>}
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("home");
  const [prevScreen, setPrevScreen] = useState(null);
  const [pname, setPname] = useState(() => { const saved = lsGet(LS_NAME, null); if (saved) return saved; const auto = generateName(); lsSet(LS_NAME, auto); return auto; });
  const [diff, setDiff] = useState(null);
  const [qs, setQs] = useState([]);
  const [idx, setIdx] = useState(0);
  const [sel, setSel] = useState(null);
  const [subm, setSubm] = useState(false);
  const [hintShown, setHintShown] = useState(false);
  const [score, setScore] = useState(0);
  const [results, setResults] = useState([]);
  const [xp, setXp] = useState(() => lsGet(LS_XP, 0));
  const [lb, setLb] = useState(() => lsGet(LS_LB, []));
  const [qbank, setQbank] = useState(() => { const s=lsGet(LS_QS,null); return s&&s.Starter?s:DEFAULT_QUESTIONS; });
  const [combo, setCombo] = useState(0);
  const [confetti, setConfetti] = useState(false);
  const [xpFlash, setXpFlash] = useState(null);
  const [encouragement, setEncouragement] = useState("");
  const [animKey, setAnimKey] = useState(0);
  const [correct, setCorrect] = useState(null);
  // teacher
  const [tPw, setTPw] = useState("");
  const [tIn, setTIn] = useState(false);
  const [tErr, setTErr] = useState("");
  const [tTab, setTTab] = useState("Starter");
  const [tMsg, setTMsg] = useState("");
  const [tForm, setTForm] = useState({emoji:"",title:"",topic:"",story:"",question:"",options:["","","",""],answer:"",hint:"",steps:["",""],whyItMatters:""});

  const navigate = useCallback((to, from) => {
    setPrevScreen(from || screen);
    setAnimKey(k => k+1);
    setScreen(to);
  }, [screen]);

  const goBack = useCallback(() => {
    setAnimKey(k => k+1);
    if (prevScreen) { setScreen(prevScreen); setPrevScreen(null); }
    else setScreen("home");
  }, [prevScreen]);

  const goHome = useCallback(() => {
    setAnimKey(k => k+1);
    setScreen("home");
    setPrevScreen(null);
    setSel(null); setSubm(false); setHintShown(false); setCombo(0); setCorrect(null);
  }, []);

  const startGame = (level) => {
    const pool = shuffle(qbank[level]).slice(0, 7);
    setDiff(level); setQs(pool); setIdx(0); setScore(0); setResults([]);
    setSel(null); setSubm(false); setHintShown(false); setCombo(0); setCorrect(null);
    setAnimKey(k => k+1);
    setScreen("game");
  };

  const rerollName = () => {
    const newName = generateName();
    setPname(newName);
    lsSet(LS_NAME, newName);
  };

  const submit = () => {
    if (!sel) return;
    const q = qs[idx];
    const isCorrect = sel === q.answer;
    setCorrect(isCorrect);
    let gained = 0;
    if (isCorrect) {
      const nc = combo + 1; setCombo(nc);
      gained = diff==="Starter" ? 10 : diff==="Challenger" ? 20 : 30;
      if (nc >= 3) gained = Math.round(gained * 1.5);
      setScore(s => s+1);
      setEncouragement(randFrom(FUN_ENCOURAGEMENTS_CORRECT));
    } else {
      setCombo(0);
      setEncouragement(randFrom(FUN_ENCOURAGEMENTS_WRONG));
    }
    if (gained > 0) {
      const newXp = xp + gained;
      setXp(newXp); lsSet(LS_XP, newXp);
      setXpFlash(gained);
      setTimeout(() => setXpFlash(null), 1500);
    }
    setResults(r => [...r, { id:q.id, correct:isCorrect, topic:q.topic, title:q.title, xp:gained }]);
    setSubm(true);
  };

  const nextQ = () => {
    if (idx+1 >= qs.length) {
      const totalGained = results.reduce((a,r)=>a+r.xp,0) + (xpFlash||0);
      const newLb = [...lb];
      const ei = newLb.findIndex(e => e.name===pname);
      if (ei>=0) { newLb[ei].xp += totalGained; newLb[ei].games = (newLb[ei].games||0)+1; }
      else if (pname) newLb.push({name:pname, xp:totalGained, games:1});
      newLb.sort((a,b) => b.xp-a.xp);
      setLb(newLb); lsSet(LS_LB, newLb);
      if (score/qs.length >= 0.7) { setConfetti(true); setTimeout(()=>setConfetti(false), 5000); }
      setAnimKey(k=>k+1); setScreen("results");
    } else {
      setIdx(i=>i+1); setSel(null); setSubm(false); setHintShown(false); setCorrect(null); setAnimKey(k=>k+1);
    }
  };

  const addQ = () => {
    if (!tForm.title||!tForm.question||!tForm.answer) { setTMsg("⚠️ Title, question and answer are required."); return; }
    const nq = {...tForm, id:"custom_"+Date.now(), options:tForm.options.filter(o=>o.trim())};
    const upd = {...qbank, [tTab]:[...qbank[tTab], nq]};
    setQbank(upd); lsSet(LS_QS, upd);
    setTForm({emoji:"",title:"",topic:"",story:"",question:"",options:["","","",""],answer:"",hint:"",steps:["",""],whyItMatters:""});
    setTMsg("✅ Question added!"); setTimeout(()=>setTMsg(""),3000);
  };
  const delQ = (level,id) => { const upd={...qbank,[level]:qbank[level].filter(q=>q.id!==id)}; setQbank(upd); lsSet(LS_QS,upd); };
  const resetQ = () => { setQbank(DEFAULT_QUESTIONS); lsSet(LS_QS,DEFAULT_QUESTIONS); setTMsg("✅ Reset to defaults!"); setTimeout(()=>setTMsg(""),3000); };

  const q = qs[idx];
  const prog = qs.length > 0 ? ((idx + (subm?1:0)) / qs.length) * 100 : 0;
  const rank = getRank(xp);

  // ── STYLES ──
  const card = {
    background:"rgba(15,10,40,0.85)",
    backdropFilter:"blur(30px)",
    border:"2px solid rgba(255,255,255,0.1)",
    borderRadius:28,
    padding:"32px 28px",
    maxWidth:660,
    width:"100%",
    boxShadow:"0 24px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.08)",
    zIndex:1,
    animation:"slideIn 0.35s ease",
  };
  const inp = {width:"100%",background:"rgba(255,255,255,0.08)",border:"2px solid rgba(255,255,255,0.12)",borderRadius:12,color:"#fff",fontFamily:"'Nunito',sans-serif",fontSize:"0.93rem",padding:"11px 14px",boxSizing:"border-box",outline:"none",marginBottom:8};
  
  const BackBtn = ({ to }) => (
    <button
      onClick={() => { if (screen==="game" && !subm && idx>0) { if(!window.confirm("Leave this quest? Progress will be lost! 😱")) return; } goBack(); }}
      style={{display:"inline-flex",alignItems:"center",gap:7,background:"rgba(255,255,255,0.08)",border:"2px solid rgba(255,255,255,0.14)",borderRadius:50,color:"rgba(255,255,255,0.7)",fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:"0.88rem",padding:"9px 18px",cursor:"pointer",marginBottom:20,transition:"all 0.15s"}}
      onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,0.14)";e.currentTarget.style.color="#fff";}}
      onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.08)";e.currentTarget.style.color="rgba(255,255,255,0.7)";}}
    >
      ← Back
    </button>
  );

  const BigBtn = ({onClick, children, color="#f9ca24", textColor="#1a1a2e", disabled=false, style={}}) => (
    <button onClick={disabled ? undefined : onClick}
      style={{background:disabled?"rgba(255,255,255,0.08)":color,color:disabled?"rgba(255,255,255,0.3)":textColor,border:"none",borderRadius:16,fontFamily:"'Nunito',sans-serif",fontWeight:900,fontSize:"1rem",padding:"15px 26px",cursor:disabled?"not-allowed":"pointer",transition:"transform 0.12s,box-shadow 0.12s",opacity:disabled?0.5:1,...style}}
      onMouseEnter={e=>{ if(!disabled){e.currentTarget.style.transform="scale(1.03)";e.currentTarget.style.boxShadow=`0 8px 24px ${color}55`;}}}
      onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)";e.currentTarget.style.boxShadow="none";}}>
      {children}
    </button>
  );

  return (
    <>
      <Confetti active={confetti}/>
      <Particles/>

      <div style={{minHeight:"100vh",background:"linear-gradient(145deg,#0d0221 0%,#1a0533 35%,#051525 70%,#0a1628 100%)",fontFamily:"'Nunito',sans-serif",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"flex-start",padding:"24px 14px 40px",position:"relative",overflowX:"hidden"}}>

        {/* Floating XP badge */}
        {xpFlash && (
          <div style={{position:"fixed",top:"50%",left:"50%",transform:"translate(-50%,-50%)",zIndex:1000,pointerEvents:"none",animation:"xpPop 1.4s ease forwards"}}>
            <div style={{background:"linear-gradient(135deg,#f9ca24,#e84393)",borderRadius:99,padding:"16px 32px",fontFamily:"'Fredoka One',cursive",fontSize:"2rem",color:"#fff",boxShadow:"0 0 40px rgba(249,202,36,0.6)",whiteSpace:"nowrap"}}>
              +{xpFlash} XP! {combo>=3?"🔥":"⭐"}
            </div>
          </div>
        )}

        {/* ── HOME ── */}
        {screen==="home" && (
          <div key={`home-${animKey}`} style={card}>
            <div style={{textAlign:"center",marginBottom:24}}>
              <div style={{fontFamily:"'Fredoka One',cursive",fontSize:"3.2rem",background:"linear-gradient(135deg,#f9ca24,#f0932b,#e84393,#a78bfa)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",lineHeight:1.1,marginBottom:6,animation:"bounce 2s ease infinite"}}>
                Real World Math 🌍
              </div>
              <p style={{color:"rgba(255,255,255,0.55)",fontSize:"1rem",marginTop:8,lineHeight:1.6}}>
                This isn't a test — it's a game! 🎮<br/>
                <span style={{color:"#f9ca24",fontWeight:800}}>Earn XP. Climb the ranks. Make math your superpower.</span>
              </p>
            </div>

            {/* Player identity card */}
            <div style={{display:"flex",alignItems:"center",gap:10,background:"rgba(249,202,36,0.08)",border:"1px solid rgba(249,202,36,0.22)",borderRadius:16,padding:"12px 16px",marginBottom:16}}>
              <span style={{fontSize:"1.5rem"}}>{rank.icon}</span>
              <div style={{flex:1}}>
                <div style={{color:"#f9ca24",fontWeight:900,fontSize:"1rem"}}>Playing as: {pname}</div>
                <div style={{color:"rgba(255,255,255,0.4)",fontSize:"0.75rem",marginTop:1}}>{rank.label} · {xp} XP</div>
              </div>
              <button
                onClick={rerollName}
                title="Get a new name"
                style={{background:"rgba(249,202,36,0.12)",border:"1px solid rgba(249,202,36,0.3)",borderRadius:99,color:"#f9ca24",fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:"0.78rem",padding:"6px 12px",cursor:"pointer",whiteSpace:"nowrap",transition:"all 0.15s"}}
                onMouseEnter={e=>e.currentTarget.style.background="rgba(249,202,36,0.22)"}
                onMouseLeave={e=>e.currentTarget.style.background="rgba(249,202,36,0.12)"}
              >🎲 New Name</button>
            </div>

            <XPBar xp={xp}/>

            <div style={{marginTop:20,display:"grid",gap:12}}>
              {[
                {level:"Starter",  icon:"🌱", col:"#00e5a0", shadow:"#00e5a055", desc:"Money, time & everyday math", xpPer:"+10 XP per correct"},
                {level:"Challenger",icon:"🔥",col:"#3b9eff", shadow:"#3b9eff55", desc:"Percentages, area, rates & averages", xpPer:"+20 XP per correct"},
                {level:"Expert",   icon:"⚡", col:"#e84393", shadow:"#e8439355", desc:"Algebra, interest & profit math", xpPer:"+30 XP per correct"},
              ].map(({level,icon,col,shadow,desc,xpPer}) => (
                <button key={level}
                  style={{background:`linear-gradient(135deg,${col}1a,${col}0a)`,border:`2px solid ${col}44`,borderRadius:20,padding:"18px 20px",cursor:"pointer",textAlign:"left",display:"flex",alignItems:"center",gap:16,transition:"all 0.18s",width:"100%"}}
                  onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.02)";e.currentTarget.style.boxShadow=`0 8px 32px ${shadow}`;e.currentTarget.style.borderColor=`${col}88`;}}
                  onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)";e.currentTarget.style.boxShadow="none";e.currentTarget.style.borderColor=`${col}44`;}}
                  onClick={() => { setDiff(level); startGame(level); }}>
                  <span style={{fontSize:"2.2rem",flexShrink:0}}>{icon}</span>
                  <div style={{flex:1}}>
                    <div style={{color:"#fff",fontWeight:900,fontSize:"1.1rem",fontFamily:"'Fredoka One',cursive"}}>{level}</div>
                    <div style={{color:"rgba(255,255,255,0.5)",fontSize:"0.82rem",marginTop:2}}>{desc}</div>
                  </div>
                  <div style={{background:`${col}22`,border:`1px solid ${col}44`,borderRadius:99,padding:"5px 13px",color:col,fontWeight:900,fontSize:"0.78rem",flexShrink:0,whiteSpace:"nowrap"}}>{xpPer}</div>
                </button>
              ))}
            </div>

            <div style={{display:"flex",gap:10,marginTop:16}}>
              <button style={{flex:1,background:"rgba(255,255,255,0.05)",border:"2px solid rgba(255,255,255,0.1)",borderRadius:14,color:"rgba(255,255,255,0.6)",fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:"0.88rem",padding:"11px",cursor:"pointer",transition:"all 0.15s"}}
                onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,0.1)";e.currentTarget.style.color="#fff";}}
                onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.05)";e.currentTarget.style.color="rgba(255,255,255,0.6)";}}
                onClick={() => navigate("leaderboard","home")}>🏆 Leaderboard</button>
              <button style={{flex:1,background:"rgba(255,255,255,0.05)",border:"2px solid rgba(255,255,255,0.1)",borderRadius:14,color:"rgba(255,255,255,0.6)",fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:"0.88rem",padding:"11px",cursor:"pointer",transition:"all 0.15s"}}
                onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,0.1)";e.currentTarget.style.color="#fff";}}
                onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.05)";e.currentTarget.style.color="rgba(255,255,255,0.6)";}}
                onClick={() => navigate("teacher","home")}>👩‍🏫 Teacher</button>
            </div>
          </div>
        )}

        {/* ── GAME ── */}
        {screen==="game" && q && (
          <div key={`game-${animKey}`} style={{...card,maxWidth:680}}>
            {/* Top bar */}
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16,flexWrap:"wrap",gap:8}}>
              <BackBtn/>
              <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap"}}>
                {combo >= 2 && (
                  <div style={{background:"linear-gradient(135deg,#f9ca24,#f0932b)",borderRadius:99,padding:"5px 13px",fontWeight:900,fontSize:"0.85rem",color:"#1a1a2e",animation:"pulse 0.8s ease infinite"}}>
                    🔥 {combo}x COMBO!
                  </div>
                )}
                <div style={{background:"rgba(249,202,36,0.12)",border:"1px solid rgba(249,202,36,0.3)",borderRadius:99,padding:"5px 14px",color:"#f9ca24",fontWeight:900,fontSize:"0.88rem"}}>
                  ⭐ {score}/{qs.length}
                </div>
                <div style={{color:"rgba(255,255,255,0.4)",fontSize:"0.8rem",fontWeight:700}}>
                  {idx+1} of {qs.length}
                </div>
              </div>
            </div>

            {/* Progress */}
            <div style={{height:10,background:"rgba(255,255,255,0.08)",borderRadius:99,marginBottom:22,overflow:"hidden",position:"relative"}}>
              <div style={{height:"100%",width:`${prog}%`,background:"linear-gradient(90deg,#00e5a0,#3b9eff,#e84393)",borderRadius:99,transition:"width 0.6s ease",boxShadow:"0 0 10px rgba(59,158,255,0.5)"}}/>
              <div style={{position:"absolute",right:8,top:"50%",transform:"translateY(-50%)",color:"rgba(255,255,255,0.4)",fontSize:"0.68rem",fontWeight:700}}>{Math.round(prog)}%</div>
            </div>

            {/* Question card */}
            <div style={{background:"rgba(255,255,255,0.04)",border:"2px solid rgba(255,255,255,0.08)",borderRadius:20,padding:"20px 22px",marginBottom:18}}>
              <div style={{display:"flex",alignItems:"flex-start",gap:14}}>
                <div style={{fontSize:"2.8rem",flexShrink:0,animation:"bounce 2s ease infinite"}}>{q.emoji}</div>
                <div style={{flex:1}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6,flexWrap:"wrap"}}>
                    <h2 style={{fontFamily:"'Fredoka One',cursive",color:"#fff",fontSize:"1.3rem",margin:0}}>{q.title}</h2>
                    <span style={{background:"rgba(255,255,255,0.08)",borderRadius:99,padding:"3px 10px",color:"rgba(255,255,255,0.5)",fontSize:"0.72rem",fontWeight:700}}>{q.topic}</span>
                  </div>
                  <p style={{color:"rgba(255,255,255,0.78)",lineHeight:1.7,margin:0,fontSize:"0.95rem"}}>{q.story}</p>
                </div>
              </div>
            </div>

            <p style={{color:"#fff",fontWeight:900,fontSize:"1.15rem",marginBottom:16,lineHeight:1.4,fontFamily:"'Fredoka One',cursive"}}>{q.question}</p>

            {/* Hint */}
            {!subm && !hintShown && (
              <button style={{background:"rgba(251,191,36,0.1)",border:"2px dashed rgba(251,191,36,0.3)",borderRadius:12,color:"#fbbf24",fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:"0.88rem",padding:"9px 18px",cursor:"pointer",marginBottom:14,transition:"all 0.15s"}}
                onMouseEnter={e=>e.currentTarget.style.background="rgba(251,191,36,0.18)"}
                onMouseLeave={e=>e.currentTarget.style.background="rgba(251,191,36,0.1)"}
                onClick={()=>setHintShown(true)}>
                💡 Need a hint? (no penalty!)
              </button>
            )}
            {hintShown && !subm && (
              <div style={{background:"rgba(251,191,36,0.1)",border:"2px dashed rgba(251,191,36,0.3)",borderRadius:12,padding:"12px 16px",marginBottom:14,animation:"pop 0.3s ease"}}>
                <span style={{color:"#fbbf24",fontWeight:900}}>💡 Hint: </span>
                <span style={{color:"rgba(255,255,255,0.8)",fontSize:"0.92rem"}}>{q.hint}</span>
              </div>
            )}

            {/* Options */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
              {q.options.map((opt,oi) => {
                let bg="rgba(255,255,255,0.06)", bo="2px solid rgba(255,255,255,0.1)", col="rgba(255,255,255,0.85)", glow="none";
                if (subm) {
                  if (opt===q.answer) { bg="rgba(0,229,160,0.18)"; bo="2px solid #00e5a0"; col="#00e5a0"; glow="0 0 20px rgba(0,229,160,0.3)"; }
                  else if (opt===sel) { bg="rgba(255,71,87,0.18)"; bo="2px solid #ff4757"; col="#ff6b81"; glow="0 0 20px rgba(255,71,87,0.3)"; }
                } else if (opt===sel) { bg="rgba(59,158,255,0.2)"; bo="2px solid #3b9eff"; col="#7ec8ff"; glow="0 0 16px rgba(59,158,255,0.3)"; }
                const letters=["A","B","C","D"];
                return (
                  <button key={opt} onClick={()=>!subm&&setSel(opt)}
                    style={{background:bg,border:bo,borderRadius:14,color:col,fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:"0.95rem",padding:"13px 14px",cursor:subm?"default":"pointer",textAlign:"left",transition:"all 0.18s",boxShadow:glow,animation:subm&&opt===q.answer?"pop 0.4s ease":undefined,position:"relative",overflow:"hidden"}}>
                    <span style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:24,height:24,background:"rgba(255,255,255,0.1)",borderRadius:99,fontSize:"0.72rem",fontWeight:900,marginRight:8,flexShrink:0,verticalAlign:"middle"}}>{letters[oi]}</span>
                    {subm&&opt===q.answer&&<span style={{marginRight:6}}>✅</span>}
                    {subm&&opt===sel&&opt!==q.answer&&<span style={{marginRight:6}}>❌</span>}
                    {opt}
                  </button>
                );
              })}
            </div>

            {/* Feedback after submit */}
            {subm && (
              <div style={{animation:"slideIn 0.4s ease"}}>
                <div style={{textAlign:"center",marginBottom:14}}>
                  <div style={{fontFamily:"'Fredoka One',cursive",fontSize:"1.4rem",color:correct?"#00e5a0":"#ff6b81",animation:"pop 0.4s ease"}}>
                    {encouragement}
                  </div>
                </div>
                <div style={{background:"rgba(0,229,160,0.08)",border:"2px solid rgba(0,229,160,0.2)",borderRadius:16,padding:"16px 18px",marginBottom:12}}>
                  <div style={{color:"#00e5a0",fontWeight:900,marginBottom:10,fontSize:"0.92rem"}}>📐 How to solve it:</div>
                  {q.steps.map((st,i) => (
                    <div key={i} style={{color:"rgba(255,255,255,0.8)",fontSize:"0.9rem",padding:"5px 0",borderBottom:i<q.steps.length-1?"1px solid rgba(255,255,255,0.06)":"none",display:"flex",gap:10,alignItems:"flex-start"}}>
                      <span style={{color:"#00e5a0",fontWeight:900,flexShrink:0}}>Step {i+1}:</span>{st}
                    </div>
                  ))}
                </div>
                <div style={{background:"rgba(167,139,250,0.1)",border:"2px solid rgba(167,139,250,0.2)",borderRadius:16,padding:"14px 18px",marginBottom:16}}>
                  <div style={{color:"#a78bfa",fontWeight:900,marginBottom:5,fontSize:"0.9rem"}}>🌍 This matters because...</div>
                  <div style={{color:"rgba(255,255,255,0.72)",fontSize:"0.9rem",lineHeight:1.65}}>{q.whyItMatters}</div>
                </div>
              </div>
            )}

            {/* Action button */}
            {!subm ? (
              <BigBtn onClick={submit} disabled={!sel} color="#3b9eff" textColor="#fff" style={{width:"100%",fontSize:"1.1rem"}}>
                {sel ? "Lock In Answer! 🎯" : "Pick an answer above ↑"}
              </BigBtn>
            ) : (
              <BigBtn onClick={nextQ} color={idx+1>=qs.length?"#f9ca24":"#e84393"} textColor="#fff" style={{width:"100%",fontSize:"1.1rem"}}>
                {idx+1>=qs.length ? "See Your Score! 🎉" : `Next Challenge! → (${idx+2}/${qs.length})`}
              </BigBtn>
            )}
          </div>
        )}

        {/* ── RESULTS ── */}
        {screen==="results" && (
          <div key={`results-${animKey}`} style={card}>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontSize:"4rem",marginBottom:8,animation:"starBurst 0.6s ease"}}>
                {score/qs.length>=0.85?"🏆":score/qs.length>=0.6?"⭐":"💪"}
              </div>
              <h2 style={{fontFamily:"'Fredoka One',cursive",fontSize:"2.2rem",background:"linear-gradient(90deg,#f9ca24,#e84393)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",margin:"0 0 8px 0"}}>
                {score===qs.length?"PERFECT ROUND! 🌟":score/qs.length>=0.7?"You're crushing it! 🔥":"Keep going — you're learning! 💪"}
              </h2>
              <div style={{display:"inline-block",background:"linear-gradient(135deg,#f9ca24,#e84393)",borderRadius:20,padding:"14px 36px",margin:"10px 0 16px",animation:"pop 0.5s ease"}}>
                <div style={{color:"#1a1a2e",fontFamily:"'Fredoka One',cursive",fontSize:"3rem",lineHeight:1}}>{score}/{qs.length}</div>
                <div style={{color:"rgba(26,26,46,0.7)",fontSize:"0.78rem",fontWeight:800,letterSpacing:"2px"}}>CORRECT</div>
              </div>
              <div style={{maxWidth:300,margin:"0 auto"}}>
                <XPBar xp={xp}/>
              </div>
            </div>

            <div style={{marginTop:8}}>
              {results.map((r,i) => (
                <div key={r.id} style={{display:"flex",alignItems:"center",gap:12,padding:"11px 14px",background:"rgba(255,255,255,0.04)",borderRadius:12,marginBottom:7,border:"1px solid rgba(255,255,255,0.07)",animation:`slideIn ${0.1+i*0.05}s ease both`}}>
                  <span style={{fontSize:"1.3rem"}}>{r.correct?"✅":"❌"}</span>
                  <div style={{flex:1}}>
                    <div style={{color:"#fff",fontWeight:800,fontSize:"0.9rem"}}>Q{i+1}: {r.title}</div>
                    <div style={{color:"rgba(255,255,255,0.38)",fontSize:"0.75rem"}}>{r.topic}</div>
                  </div>
                  {r.xp>0&&<span style={{color:"#f9ca24",fontWeight:900,fontSize:"0.82rem",background:"rgba(249,202,36,0.1)",borderRadius:99,padding:"3px 10px"}}>+{r.xp} XP</span>}
                </div>
              ))}
            </div>

            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginTop:20}}>
              <BigBtn onClick={()=>startGame(diff)} color="#00e5a0" textColor="#0d2e24">Play Again! 🔄</BigBtn>
              <BigBtn onClick={()=>navigate("leaderboard","results")} color="rgba(255,255,255,0.08)" textColor="#fff" style={{border:"2px solid rgba(255,255,255,0.15)"}}>Leaderboard 🏆</BigBtn>
              <BigBtn onClick={goHome} color="rgba(232,67,147,0.15)" textColor="#e84393" style={{border:"2px solid rgba(232,67,147,0.3)",gridColumn:"1/-1"}}>Try a Different Level</BigBtn>
            </div>
          </div>
        )}

        {/* ── LEADERBOARD ── */}
        {screen==="leaderboard" && (
          <div key={`lb-${animKey}`} style={card}>
            <BackBtn/>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontFamily:"'Fredoka One',cursive",fontSize:"2.4rem",background:"linear-gradient(90deg,#f9ca24,#e84393)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",marginBottom:6}}>🏆 Leaderboard</div>
              <p style={{color:"rgba(255,255,255,0.45)",fontSize:"0.9rem",margin:0}}>Chain combos & answer correctly to rocket up the ranks!</p>
            </div>

            {lb.length===0 ? (
              <div style={{textAlign:"center",padding:"40px 0",color:"rgba(255,255,255,0.25)"}}>
                <div style={{fontSize:"3rem",marginBottom:8}}>🚀</div>
                No scores yet — be the first legend!
              </div>
            ) : lb.slice(0,15).map((e,i) => {
              const r = getRank(e.xp);
              const medals = ["🥇","🥈","🥉"];
              const isMe = e.name===pname;
              return (
                <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"13px 16px",background:isMe?"rgba(249,202,36,0.08)":"rgba(255,255,255,0.03)",borderRadius:14,marginBottom:8,border:isMe?"2px solid rgba(249,202,36,0.3)":"2px solid rgba(255,255,255,0.06)",animation:`slideIn ${0.05+i*0.04}s ease both`}}>
                  <div style={{fontSize:"1.5rem",width:30,textAlign:"center",flexShrink:0}}>{i<3?medals[i]:`#${i+1}`}</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{color:"#fff",fontWeight:900,fontSize:"0.97rem"}}>{e.name}{isMe?" 👈 (You)":""}</div>
                    <div style={{color:r.color,fontSize:"0.76rem",fontWeight:800}}>{r.icon} {r.label}</div>
                  </div>
                  <div style={{textAlign:"right",flexShrink:0}}>
                    <div style={{color:"#f9ca24",fontWeight:900,fontSize:"1.05rem"}}>{e.xp} XP</div>
                    <div style={{color:"rgba(255,255,255,0.3)",fontSize:"0.72rem"}}>{e.games||1} game{e.games!==1?"s":""}</div>
                  </div>
                </div>
              );
            })}

            <div style={{marginTop:18,background:"rgba(255,255,255,0.03)",borderRadius:16,padding:"16px 18px",border:"2px solid rgba(255,255,255,0.07)"}}>
              <div style={{color:"rgba(255,255,255,0.4)",fontWeight:800,fontSize:"0.78rem",marginBottom:12,letterSpacing:"1px"}}>✨ RANK TIERS</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                {RANKS.map(r => (
                  <div key={r.label} style={{display:"flex",alignItems:"center",gap:8,background:r.bg,borderRadius:10,padding:"8px 12px",border:`1px solid ${r.color}33`}}>
                    <span style={{fontSize:"1.3rem"}}>{r.icon}</span>
                    <div>
                      <div style={{color:r.color,fontWeight:900,fontSize:"0.8rem"}}>{r.label}</div>
                      <div style={{color:"rgba(255,255,255,0.3)",fontSize:"0.7rem"}}>{r.min}+ XP</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <BigBtn onClick={goHome} color="#f9ca24" textColor="#1a1a2e" style={{width:"100%",marginTop:16}}>Play & Earn XP! →</BigBtn>
          </div>
        )}

        {/* ── TEACHER ── */}
        {screen==="teacher" && (
          <div key={`teacher-${animKey}`} style={{...card,maxWidth:720}}>
            <BackBtn/>
            <div style={{fontFamily:"'Fredoka One',cursive",fontSize:"2rem",color:"#fff",marginBottom:6}}>👩‍🏫 Teacher Portal</div>
            <p style={{color:"rgba(255,255,255,0.45)",fontSize:"0.87rem",marginTop:0,marginBottom:20}}>Add custom questions, manage question banks, and reset data.</p>

            {!tIn ? (
              <div>
                <div style={{color:"rgba(255,255,255,0.6)",fontSize:"0.9rem",marginBottom:10}}>Enter teacher password to access the portal:</div>
                <input type="password" style={{...inp,fontSize:"1rem"}} placeholder="Password..." value={tPw}
                  onChange={e=>setTPw(e.target.value)}
                  onKeyDown={e=>{if(e.key==="Enter"){if(tPw===TEACHER_PW){setTIn(true);setTErr("");}else setTErr("Incorrect password. Try again.");}}}/>
                {tErr&&<div style={{color:"#ff6b81",fontSize:"0.84rem",marginBottom:8,fontWeight:700}}>{tErr}</div>}
                <BigBtn onClick={()=>{if(tPw===TEACHER_PW){setTIn(true);setTErr("");}else setTErr("Incorrect password. Try again.")}} color="#e84393" textColor="#fff" style={{width:"100%"}}>
                  Login →
                </BigBtn>
                <div style={{color:"rgba(255,255,255,0.2)",fontSize:"0.72rem",marginTop:10,textAlign:"center"}}>Default password: mathteacher2024</div>
              </div>
            ) : (
              <>
                <div style={{display:"flex",gap:8,marginBottom:18,flexWrap:"wrap"}}>
                  {["Starter","Challenger","Expert"].map(t=>(
                    <button key={t} style={{background:tTab===t?"#f9ca24":"rgba(255,255,255,0.07)",color:tTab===t?"#1a1a2e":"rgba(255,255,255,0.6)",border:"2px solid "+(tTab===t?"#f9ca24":"rgba(255,255,255,0.12)"),borderRadius:12,fontFamily:"'Nunito',sans-serif",fontWeight:900,fontSize:"0.88rem",padding:"9px 18px",cursor:"pointer"}}
                      onClick={()=>setTTab(t)}>{t} ({qbank[t].length})</button>
                  ))}
                  <button style={{background:"rgba(255,71,87,0.12)",border:"2px solid rgba(255,71,87,0.25)",borderRadius:12,color:"#ff6b81",fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:"0.83rem",padding:"9px 16px",cursor:"pointer",marginLeft:"auto"}}
                    onClick={()=>{if(window.confirm("Reset all questions to defaults?"))resetQ();}}>⚠️ Reset All</button>
                </div>

                <div style={{maxHeight:230,overflowY:"auto",marginBottom:18,display:"flex",flexDirection:"column",gap:6}}>
                  {qbank[tTab].map(qq=>(
                    <div key={qq.id} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 14px",background:"rgba(255,255,255,0.04)",borderRadius:12,border:"1px solid rgba(255,255,255,0.07)"}}>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{color:"#fff",fontWeight:700,fontSize:"0.88rem"}}>{qq.emoji} {qq.title}</div>
                        <div style={{color:"rgba(255,255,255,0.35)",fontSize:"0.75rem",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{qq.question}</div>
                      </div>
                      <button style={{background:"rgba(255,71,87,0.12)",border:"1px solid rgba(255,71,87,0.3)",borderRadius:8,color:"#ff6b81",fontWeight:700,fontSize:"0.75rem",padding:"5px 10px",cursor:"pointer",marginLeft:10,flexShrink:0}}
                        onClick={()=>{if(window.confirm("Delete this question?"))delQ(tTab,qq.id);}}>Delete</button>
                    </div>
                  ))}
                </div>

                <div style={{background:"rgba(255,255,255,0.03)",borderRadius:18,padding:"20px",border:"2px solid rgba(255,255,255,0.08)"}}>
                  <div style={{color:"#f9ca24",fontWeight:900,fontSize:"0.92rem",marginBottom:14}}>+ Add New Question to {tTab}</div>
                  <div style={{display:"grid",gridTemplateColumns:"70px 1fr",gap:8}}><input style={inp} placeholder="Emoji" value={tForm.emoji} onChange={e=>setTForm(f=>({...f,emoji:e.target.value}))}/><input style={inp} placeholder="Title" value={tForm.title} onChange={e=>setTForm(f=>({...f,title:e.target.value}))}/></div>
                  <input style={inp} placeholder="Topic (e.g. Percentages)" value={tForm.topic} onChange={e=>setTForm(f=>({...f,topic:e.target.value}))}/>
                  <textarea style={{...inp,minHeight:68,resize:"vertical"}} placeholder="Scenario story..." value={tForm.story} onChange={e=>setTForm(f=>({...f,story:e.target.value}))}/>
                  <textarea style={{...inp,minHeight:52,resize:"vertical"}} placeholder="Question text..." value={tForm.question} onChange={e=>setTForm(f=>({...f,question:e.target.value}))}/>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                    {tForm.options.map((o,i)=><input key={i} style={inp} placeholder={`Option ${i+1}`} value={o} onChange={e=>{const opts=[...tForm.options];opts[i]=e.target.value;setTForm(f=>({...f,options:opts}));}}/>)}
                  </div>
                  <input style={inp} placeholder="Correct answer (must match one option exactly!)" value={tForm.answer} onChange={e=>setTForm(f=>({...f,answer:e.target.value}))}/>
                  <input style={inp} placeholder="Hint for students..." value={tForm.hint} onChange={e=>setTForm(f=>({...f,hint:e.target.value}))}/>
                  <input style={inp} placeholder="Step 1 of solution..." value={tForm.steps[0]} onChange={e=>{const st=[...tForm.steps];st[0]=e.target.value;setTForm(f=>({...f,steps:st}));}}/>
                  <input style={inp} placeholder="Step 2 of solution..." value={tForm.steps[1]} onChange={e=>{const st=[...tForm.steps];st[1]=e.target.value;setTForm(f=>({...f,steps:st}));}}/>
                  <textarea style={{...inp,minHeight:54,resize:"vertical"}} placeholder="Why this math matters in real life..." value={tForm.whyItMatters} onChange={e=>setTForm(f=>({...f,whyItMatters:e.target.value}))}/>
                  {tMsg&&<div style={{color:tMsg.startsWith("✅")?"#00e5a0":"#fbbf24",fontWeight:800,fontSize:"0.87rem",marginBottom:8}}>{tMsg}</div>}
                  <BigBtn onClick={addQ} color="#00e5a0" textColor="#0d2e24" style={{width:"100%"}}>Add Question ✓</BigBtn>
                </div>
                <button style={{width:"100%",background:"rgba(255,255,255,0.05)",border:"2px solid rgba(255,255,255,0.1)",borderRadius:14,color:"rgba(255,255,255,0.45)",fontFamily:"'Nunito',sans-serif",fontWeight:800,padding:"12px",cursor:"pointer",marginTop:10}}
                  onClick={()=>{setTIn(false);setTPw("");}}>Log Out</button>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
