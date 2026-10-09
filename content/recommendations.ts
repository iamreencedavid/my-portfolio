// Recommendations rendered on `recommendations.md`, as approved PR reviews.
// Order here is the display order. Separate paragraphs in `text` with "\n\n".
export type Recommendation = {
  name: string;
  role: string; // e.g. "Engineering Manager"
  company: string;
  relationship: string; // e.g. "managed Reence directly"
  date: string; // e.g. "Mar 2025"
  text: string;
  url?: string; // the original, e.g. on LinkedIn
};

// TODO: placeholders, replace with the real recommendations.
export const recommendations: { items: Recommendation[] } = {
  items: [
    {
      name: "Arnie Kevin Chipe",
      role: "Technical Lead",
      company: "Officeworks",
      relationship: "managed Reence directly",
      date: "October 09, 2026",
      text:
        "I’ve had the pleasure of working with Reence David at Officeworks as his Technical Lead in the Print & Create team, and I can confidently say that he is one of the most dependable and technically capable engineers I’ve worked with.\n\n" +
        "Reence consistently demonstrates strong technical expertise, excellent problem-solving skills, and a genuine sense of ownership in everything he does. Whether it's tackling complex technical challenges, resolving production issues, or supporting the team, he always approaches his work with professionalism and dedication.\n\n" +
        "What I appreciate most about Reence is his reliability and willingness to go the extra mile. He is someone the team can always count on, especially when things get challenging. Beyond his technical abilities, he is also a great team player who willingly shares his knowledge, supports his colleagues, and contributes to a positive working environment.\n\n" +
        "Having Reence on the team has made my role as a Technical Lead much easier. It's reassuring to have someone you can trust to take ownership, make sound technical decisions, and deliver quality work.\n\n" +
        "I highly recommend Reence to any organization looking for a talented, dedicated, and reliable software engineer. Any team would be fortunate to have him.",
      url: "https://www.linkedin.com/in/arniekevs",
    },
    {
      name: "Matthew Dundules",
      role: "Experience Manager",
      company: "Officeworks",
      relationship:
        "Matthew was senior to Reence but didn’t manage Reence directly",
      date: "October 09, 2026",
      text: "I've worked with Reence in the Print & Create category for the last 3 years. Reence is a very solid senior developer that applies critical thinking and places the customer first in everything that he does. I could easily recommend him for a leadership role, he is well spoken, keen to learn and contribute to outcomes and I regard him highly. I would have no hesitation to work with Reence again and he will make a great addition to any team.",
      url: "http://linkedin.com/in/matthew-dundules-22b15a10/?isSelfProfile=false",
    },
    {
      name: "Teghan Caltabiano",
      role: "IT Delivery Manager",
      company: "Officeworks",
      relationship:
        "Teghan was senior to Reence but didn’t manage Reence directly",
      date: "October 08, 2026",
      text: "I had the pleasure of working with Reence in the print and create development team at Officeworks for a few years. Although Reence was Manila based and working for an Australian business, he always showed up with so much passion and commitment every day to work, and quickly became SME that was relied on and trusted in this space. I would recommend Reence for future roles and believe he would be a great addition to any team.",
      url: "https://www.linkedin.com/in/teghan-caltabiano-5546457b/?isSelfProfile=false",
    },
  ],
};
