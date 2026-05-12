import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const HISTORY: Record<string, Array<{ year: number; event: string }>> = {
  "1-1": [
    { year: 1863, event: "US President Lincoln signs the Emancipation Proclamation, freeing enslaved people in Confederate states." },
    { year: 1959, event: "Cuba's Batista flees the country as Fidel Castro's revolutionary forces take control." },
    { year: 1993, event: "Czechoslovakia peacefully splits into two nations: the Czech Republic and Slovakia." },
  ],
  "1-15": [
    { year: 1929, event: "Martin Luther King Jr. is born in Atlanta, Georgia." },
    { year: 1559, event: "Elizabeth I is crowned Queen of England at Westminster Abbey." },
    { year: 2009, event: "US Airways Flight 1549 safely lands on the Hudson River in what is called the Miracle on the Hudson." },
  ],
  "2-14": [
    { year: 1929, event: "The St. Valentine's Day Massacre occurs in Chicago." },
    { year: 1876, event: "Alexander Graham Bell applies for a patent for the telephone." },
    { year: 2005, event: "YouTube is founded by three former PayPal employees." },
  ],
  "3-14": [
    { year: 1879, event: "Albert Einstein is born in Ulm, Germany." },
    { year: 1794, event: "Eli Whitney is granted a patent for the cotton gin." },
    { year: 2018, event: "Stephen Hawking passes away in Cambridge at the age of 76." },
  ],
  "4-23": [
    { year: 1564, event: "William Shakespeare is baptized in Stratford-upon-Avon, England." },
    { year: 1895, event: "The first public film screening takes place in Paris." },
    { year: 1985, event: "Coca-Cola introduces New Coke, sparking massive public backlash." },
  ],
  "5-12": [
    { year: 1820, event: "Florence Nightingale, founder of modern nursing, is born in Florence, Italy." },
    { year: 1932, event: "The body of the Lindbergh baby is discovered, ending a massive international search." },
    { year: 2008, event: "A magnitude 7.9 earthquake strikes Sichuan, China, killing nearly 70,000 people." },
  ],
  "6-6": [
    { year: 1944, event: "D-Day: Allied forces launch the largest seaborne invasion in history on the beaches of Normandy." },
    { year: 1984, event: "Tetris is created by Soviet software engineer Alexey Pajitnov." },
    { year: 1925, event: "The Mercedes-Benz company is formed through the merger of two car manufacturers." },
  ],
  "7-4": [
    { year: 1776, event: "The United States Declaration of Independence is adopted by the Continental Congress." },
    { year: 1884, event: "The Statue of Liberty's pedestal cornerstone is laid in New York Harbor." },
    { year: 1997, event: "NASA's Mars Pathfinder spacecraft successfully lands on the surface of Mars." },
  ],
  "7-20": [
    { year: 1969, event: "Apollo 11 astronauts Neil Armstrong and Buzz Aldrin become the first humans to walk on the Moon." },
    { year: 1944, event: "A failed assassination attempt on Adolf Hitler takes place at his headquarters in East Prussia." },
    { year: 1976, event: "NASA's Viking 1 becomes the first spacecraft to successfully land on Mars." },
  ],
  "8-6": [
    { year: 1945, event: "The United States drops the first atomic bomb on Hiroshima, Japan." },
    { year: 1991, event: "Tim Berners-Lee publishes the first website, launching the World Wide Web publicly." },
    { year: 1890, event: "The electric chair is used for the first time in history at Auburn Prison, New York." },
  ],
  "9-11": [
    { year: 2001, event: "Coordinated terrorist attacks destroy the World Trade Center towers in New York City." },
    { year: 1973, event: "A military coup in Chile overthrows the democratically elected president Salvador Allende." },
    { year: 1789, event: "Alexander Hamilton is appointed as the first US Secretary of the Treasury." },
  ],
  "10-31": [
    { year: 1517, event: "Martin Luther nails his 95 Theses to the church door in Wittenberg, sparking the Protestant Reformation." },
    { year: 1941, event: "The Mount Rushmore sculpture is completed after 14 years of construction." },
    { year: 1984, event: "Indian Prime Minister Indira Gandhi is assassinated by her own bodyguards." },
  ],
  "11-9": [
    { year: 1989, event: "The Berlin Wall falls as East Germany opens its borders, reuniting families separated for decades." },
    { year: 1938, event: "Kristallnacht: Nazi forces launch coordinated attacks against Jewish communities across Germany." },
    { year: 1906, event: "Theodore Roosevelt becomes the first sitting US president to travel abroad while in office." },
  ],
  "12-25": [
    { year: 800, event: "Charlemagne is crowned Emperor of the Romans by Pope Leo III in Rome." },
    { year: 1776, event: "George Washington crosses the Delaware River for a surprise attack on Hessian forces." },
    { year: 1991, event: "Mikhail Gorbachev resigns and the Soviet Union officially dissolves." },
  ],
};

const FAMOUS: Record<string, Array<{ name: string; born: number; known: string }>> = {
  "1-1": [{ name: "J. Edgar Hoover", born: 1895, known: "First Director of the FBI" }, { name: "Grandmaster Flash", born: 1958, known: "Pioneer of hip-hop music" }],
  "1-15": [{ name: "Martin Luther King Jr.", born: 1929, known: "Civil rights leader and Nobel laureate" }, { name: "Aristotle Onassis", born: 1906, known: "Greek shipping magnate" }],
  "2-14": [{ name: "Frederick Douglass", born: 1818, known: "Abolitionist and statesman" }, { name: "Carl Bernstein", born: 1944, known: "Watergate investigative journalist" }],
  "3-14": [{ name: "Albert Einstein", born: 1879, known: "Physicist, Theory of Relativity" }, { name: "Quincy Jones", born: 1933, known: "Music producer and composer" }],
  "5-12": [{ name: "Florence Nightingale", born: 1820, known: "Founder of modern nursing" }, { name: "Katharine Hepburn", born: 1907, known: "Legendary Hollywood actress" }],
  "6-6": [{ name: "Bjorn Borg", born: 1956, known: "Tennis champion, 5x Wimbledon winner" }, { name: "Gary Lineker", born: 1960, known: "England football star and broadcaster" }],
  "7-4": [{ name: "Calvin Coolidge", born: 1872, known: "30th President of the United States" }, { name: "Malia Obama", born: 1998, known: "Activist and filmmaker" }],
  "7-20": [{ name: "Carlos Santana", born: 1947, known: "Legendary rock guitarist" }, { name: "Natalie Wood", born: 1938, known: "Hollywood actress" }],
  "11-9": [{ name: "Carl Sagan", born: 1934, known: "Astronomer and science communicator" }, { name: "Hedy Lamarr", born: 1914, known: "Actress and inventor of WiFi technology" }],
  "12-25": [{ name: "Isaac Newton", born: 1643, known: "Mathematician and physicist" }, { name: "Humphrey Bogart", born: 1899, known: "Legendary Hollywood actor" }],
};

const WORLD_FACTS: Record<number, string> = {
  1990: "The World Wide Web was invented this year by Tim Berners-Lee, quietly changing humanity forever.",
  1991: "The Soviet Union collapsed this year, ending the Cold War and reshaping the entire world map.",
  1995: "Amazon and eBay both launched this year, pioneering the age of e-commerce.",
  2000: "The world feared Y2K but survived it — and the dot-com bubble was at its dizzying peak.",
  2001: "The September 11 attacks reshaped global security, foreign policy, and everyday life permanently.",
  2004: "Facebook launched from a Harvard dorm room this year, quietly starting a social media revolution.",
  2007: "Apple released the first iPhone this year, changing how the entire world communicates.",
  2008: "The global financial crisis caused the worst recession since the Great Depression.",
  2010: "Instagram launched and the Arab Spring began — two forces that reshaped the world in different ways.",
  2020: "COVID-19 became a global pandemic, locking down the entire world and changing life as we knew it.",
};

function getWorldFact(year: number): string {
  if (WORLD_FACTS[year]) return WORLD_FACTS[year];
  if (year < 1900) return "Your birth year was in an era before electricity was common — gas lamps still lit most streets around the world.";
  if (year < 1950) return "The world in your birth year was defined by two world wars and the dawn of the atomic age.";
  if (year < 1980) return "In your birth year, the Cold War shaped every corner of global politics while culture and music were undergoing a revolution.";
  if (year < 2000) return "In your birth year, the digital age was dawning — personal computers and the early internet were beginning to reshape daily life.";
  return "In your birth year, globalisation and technology were reshaping society at an unprecedented pace.";
}

const ZODIAC_PERSONALITY: Record<string, string> = {
  "Aries": "Born under Aries, you carry the spark of a true pioneer. Bold, direct, and impossible to ignore, your fire lights up every room you enter.",
  "Taurus": "A Taurus soul is rare. You combine quiet strength with deep loyalty, building things that last and loving with real permanence.",
  "Gemini": "Your Gemini mind is a kaleidoscope of ideas — curious, electric, and endlessly fascinating to everyone around you.",
  "Cancer": "Cancer runs deep. You feel the world more intensely than most, and that sensitivity is your greatest superpower.",
  "Leo": "The Sun chose Leo for good reason. You were born to lead, to create, and to inspire everyone in your orbit.",
  "Virgo": "Virgo sees what others miss entirely. Your precision and quiet dedication make you the true architect of excellence.",
  "Libra": "Libra carries grace in their bones. You seek harmony not from weakness, but from a deep and genuine wisdom.",
  "Scorpio": "Scorpio never skims the surface. You dive into depths others fear, always emerging transformed and more powerful.",
  "Sagittarius": "Born to wander and wonder, Sagittarius carries the spirit of the eternal seeker. Your optimism is infectious.",
  "Capricorn": "Capricorn plays the long game. Patient, disciplined, and quietly ambitious — you build great things with steady hands.",
  "Aquarius": "Aquarius arrived from the future. Your vision sees past what is into what could be, and the world is better for it.",
  "Pisces": "Pisces lives where dreams and reality meet. Your empathy and creativity make you one of the most quietly powerful souls anywhere.",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { month, day, year, zodiac, chineseAnimal } = await req.json();

    const key = month + "-" + day;

    const events = HISTORY[key] || [
      { year: 1969, event: "Apollo 11 successfully lands humans on the Moon for the first time in all of history." },
      { year: 1945, event: "World leaders sign landmark agreements at the end of World War II that shape the modern world." },
      { year: 1889, event: "Pioneering inventors and scientists file breakthroughs that go on to change everyday life." },
    ];

    const famous = FAMOUS[key] || [
      { name: "Various luminaries", born: year, known: "Notable figures born on this date throughout history" },
    ];

    const worldFact = getWorldFact(year);

    const personality = ZODIAC_PERSONALITY[zodiac] ||
      "Born under " + zodiac + " and the Chinese year of the " + chineseAnimal + ", you carry a rare combination of traits that makes you genuinely one of a kind.";

    const result = { events, famous, worldFact, personality };

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});