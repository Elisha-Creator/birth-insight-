// ─── Western Zodiac ──────────────────────────────────────────
export function getWesternZodiac(month, day) {
  const signs = [
    { name: 'Capricorn',  symbol: '♑', emoji: '🐐', end: [1,19],  element:'Earth', quality:'Cardinal' },
    { name: 'Aquarius',   symbol: '♒', emoji: '🏺', end: [2,18],  element:'Air',   quality:'Fixed'    },
    { name: 'Pisces',     symbol: '♓', emoji: '🐟', end: [3,20],  element:'Water', quality:'Mutable'  },
    { name: 'Aries',      symbol: '♈', emoji: '🐏', end: [4,19],  element:'Fire',  quality:'Cardinal' },
    { name: 'Taurus',     symbol: '♉', emoji: '🐂', end: [5,20],  element:'Earth', quality:'Fixed'    },
    { name: 'Gemini',     symbol: '♊', emoji: '👯', end: [6,20],  element:'Air',   quality:'Mutable'  },
    { name: 'Cancer',     symbol: '♋', emoji: '🦀', end: [7,22],  element:'Water', quality:'Cardinal' },
    { name: 'Leo',        symbol: '♌', emoji: '🦁', end: [8,22],  element:'Fire',  quality:'Fixed'    },
    { name: 'Virgo',      symbol: '♍', emoji: '👩', end: [9,22],  element:'Earth', quality:'Mutable'  },
    { name: 'Libra',      symbol: '♎', emoji: '⚖️', end: [10,22], element:'Air',   quality:'Cardinal' },
    { name: 'Scorpio',    symbol: '♏', emoji: '🦂', end: [11,21], element:'Water', quality:'Fixed'    },
    { name: 'Sagittarius',symbol: '♐', emoji: '🏹', end: [12,21], element:'Fire',  quality:'Mutable'  },
    { name: 'Capricorn',  symbol: '♑', emoji: '🐐', end: [12,31], element:'Earth', quality:'Cardinal' },
  ]
  return signs.find(s => month < s.end[0] || (month === s.end[0] && day <= s.end[1]))
}

// ─── Chinese Zodiac ───────────────────────────────────────────
const CHINESE = [
  { animal:'Rat',     emoji:'🐀', years:[1900,1912,1924,1936,1948,1960,1972,1984,1996,2008,2020],
    trait:'Clever, quick-witted, resourceful and adaptable.',
    strengths:['Intelligent','Versatile','Kind'], weaknesses:['Stubborn','Greedy','Overly-critical'],
    lucky:{ numbers:[2,3], colors:['Blue','Gold','Green'] }, compatible:['Dragon','Monkey','Ox'] },
  { animal:'Ox',      emoji:'🐂', years:[1901,1913,1925,1937,1949,1961,1973,1985,1997,2009,2021],
    trait:'Dependable, strong, patient and methodical.',
    strengths:['Honest','Hardworking','Reliable'], weaknesses:['Stubborn','Narrow-minded','Slow'],
    lucky:{ numbers:[1,4], colors:['White','Yellow','Green'] }, compatible:['Rat','Snake','Rooster'] },
  { animal:'Tiger',   emoji:'🐅', years:[1902,1914,1926,1938,1950,1962,1974,1986,1998,2010,2022],
    trait:'Brave, confident, competitive and unpredictable.',
    strengths:['Courageous','Confident','Charismatic'], weaknesses:['Arrogant','Impulsive','Short-tempered'],
    lucky:{ numbers:[1,3,4], colors:['Blue','Grey','Orange'] }, compatible:['Horse','Dog','Pig'] },
  { animal:'Rabbit',  emoji:'🐇', years:[1903,1915,1927,1939,1951,1963,1975,1987,1999,2011,2023],
    trait:'Gentle, elegant, sensitive and compassionate.',
    strengths:['Gentle','Elegant','Alert'], weaknesses:['Timid','Hesitant','Superficial'],
    lucky:{ numbers:[3,4,9], colors:['Red','Pink','Purple','Blue'] }, compatible:['Goat','Monkey','Dog','Pig'] },
  { animal:'Dragon',  emoji:'🐉', years:[1904,1916,1928,1940,1952,1964,1976,1988,2000,2012,2024],
    trait:'Energetic, fearless, charismatic and ambitious.',
    strengths:['Energetic','Fearless','Warm'], weaknesses:['Arrogant','Impatient','Impulsive'],
    lucky:{ numbers:[1,6,7], colors:['Gold','Silver','Grayish-white'] }, compatible:['Rooster','Rat','Monkey'] },
  { animal:'Snake',   emoji:'🐍', years:[1905,1917,1929,1941,1953,1965,1977,1989,2001,2013,2025],
    trait:'Wise, intuitive, mysterious and sophisticated.',
    strengths:['Intuitive','Wise','Sophisticated'], weaknesses:['Suspicious','Possessive','Lazy'],
    lucky:{ numbers:[2,8,9], colors:['Red','Light Yellow','Black'] }, compatible:['Ox','Rooster'] },
  { animal:'Horse',   emoji:'🐎', years:[1906,1918,1930,1942,1954,1966,1978,1990,2002,2014,2026],
    trait:'Energetic, free-spirited, passionate and independent.',
    strengths:['Animated','Active','Energetic'], weaknesses:['Impatient','Lacks persistence','Hot-headed'],
    lucky:{ numbers:[2,3,7], colors:['Yellow','Green'] }, compatible:['Tiger','Goat','Rabbit'] },
  { animal:'Goat',    emoji:'🐑', years:[1907,1919,1931,1943,1955,1967,1979,1991,2003,2015,2027],
    trait:'Calm, creative, kind-hearted and thoughtful.',
    strengths:['Calm','Gentle','Sympathetic'], weaknesses:['Indecisive','Pessimistic','Over-anxious'],
    lucky:{ numbers:[2,7], colors:['Brown','Red','Purple'] }, compatible:['Rabbit','Horse','Pig'] },
  { animal:'Monkey',  emoji:'🐒', years:[1908,1920,1932,1944,1956,1968,1980,1992,2004,2016,2028],
    trait:'Witty, playful, curious and versatile.',
    strengths:['Sharp','Smart','Curious'], weaknesses:['Jealous','Mischievous','Suspicious'],
    lucky:{ numbers:[1,7,8], colors:['White','Gold','Blue'] }, compatible:['Ox','Rabbit'] },
  { animal:'Rooster', emoji:'🐓', years:[1909,1921,1933,1945,1957,1969,1981,1993,2005,2017,2029],
    trait:'Confident, observant, hardworking and resourceful.',
    strengths:['Observant','Hardworking','Courageous'], weaknesses:['Arrogant','Blunt','Inflexible'],
    lucky:{ numbers:[5,7,8], colors:['Gold','Brown','Yellow'] }, compatible:['Ox','Snake'] },
  { animal:'Dog',     emoji:'🐕', years:[1910,1922,1934,1946,1958,1970,1982,1994,2006,2018,2030],
    trait:'Loyal, honest, friendly and reliable.',
    strengths:['Loyal','Responsible','Cautious'], weaknesses:['Stubborn','Pessimistic','Sensitive'],
    lucky:{ numbers:[3,4,9], colors:['Red','Green','Purple'] }, compatible:['Rabbit','Tiger'] },
  { animal:'Pig',     emoji:'🐖', years:[1911,1923,1935,1947,1959,1971,1983,1995,2007,2019,2031],
    trait:'Compassionate, generous, diligent and optimistic.',
    strengths:['Compassionate','Generous','Diligent'], weaknesses:['Naïve','Gullible','Impulsive'],
    lucky:{ numbers:[2,5,8], colors:['Yellow','Grey','Brown'] }, compatible:['Tiger','Rabbit','Goat'] },
]

export function getChineseZodiac(year) {
  const idx = ((year - 1900) % 12 + 12) % 12
  return CHINESE[idx]
}

const ELEMENTS = ['Metal','Metal','Water','Water','Wood','Wood','Fire','Fire','Earth','Earth']
const ELEMENT_EMOJI = { Metal:'⚙️', Water:'💧', Wood:'🌲', Fire:'🔥', Earth:'🌍' }

export function getChineseElement(year) {
  const idx = ((year - 1900) % 10 + 10) % 10
  const name = ELEMENTS[idx]
  return { name, emoji: ELEMENT_EMOJI[name] }
}

// ─── Birthstone ───────────────────────────────────────────────
const BIRTHSTONES = [
  { stone:'Garnet',    emoji:'🔴', meaning:'Protection and strength' },
  { stone:'Amethyst',  emoji:'💜', meaning:'Clarity and calm' },
  { stone:'Aquamarine',emoji:'🔵', meaning:'Courage and communication' },
  { stone:'Diamond',   emoji:'💎', meaning:'Invincibility and purity' },
  { stone:'Emerald',   emoji:'💚', meaning:'Rebirth and love' },
  { stone:'Pearl',     emoji:'🤍', meaning:'Purity and loyalty' },
  { stone:'Ruby',      emoji:'❤️', meaning:'Passion and vitality' },
  { stone:'Peridot',   emoji:'🟢', meaning:'Healing and renewal' },
  { stone:'Sapphire',  emoji:'🔷', meaning:'Wisdom and truth' },
  { stone:'Opal',      emoji:'🪨', meaning:'Creativity and hope' },
  { stone:'Topaz',     emoji:'🟡', meaning:'Strength and healing' },
  { stone:'Turquoise', emoji:'🩵', meaning:'Fortune and success' },
]
export function getBirthstone(month) { return BIRTHSTONES[month - 1] }

// ─── Birth Flower ─────────────────────────────────────────────
const FLOWERS = [
  'Carnation','Violet','Daffodil','Daisy','Lily of the Valley',
  'Rose','Larkspur','Gladiolus','Aster','Marigold','Chrysanthemum','Narcissus'
]
const FLOWER_EMOJI = ['🌸','🌸','🌼','🌼','🌷','🌹','💐','💐','🌸','🌺','🌼','🌼']
export function getBirthFlower(month) {
  return { name: FLOWERS[month-1], emoji: FLOWER_EMOJI[month-1] }
}

// ─── Exact Age ────────────────────────────────────────────────
export function getExactAge(dob) {
  const birth = new Date(dob)
  const now = new Date()
  let years = now.getFullYear() - birth.getFullYear()
  let months = now.getMonth() - birth.getMonth()
  let days = now.getDate() - birth.getDate()
  if (days < 0) { months--; days += new Date(now.getFullYear(), now.getMonth(), 0).getDate() }
  if (months < 0) { years--; months += 12 }
  const nextBirthday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate())
  if (nextBirthday < now) nextBirthday.setFullYear(now.getFullYear() + 1)
  const daysUntil = Math.ceil((nextBirthday - now) / (1000 * 60 * 60 * 24))
  return { years, months, days, daysUntil }
}

// ─── Day of week ──────────────────────────────────────────────
export function getDayOfWeek(dob) {
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
  return days[new Date(dob + 'T12:00:00').getDay()]
}