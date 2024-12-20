const mongoose = require("mongoose");
const Category = require("./Model/CategoryModel"); // Adjust the path based on your project structure

require("dotenv").config();
main().catch((err) => console.log(err));

// Connect to your MongoDB database
async function main() {
    await mongoose.connect(
      `mongodb+srv://shailesh:${process.env.DB_PASSWORD}@bdw-cluster.ugy3f.mongodb.net/BDW_Database`
    );
    console.log("connected");
  }



// Define the categories and subcategories


const categories = [
    {
      name: "Home Services",
      description: "Services related to home maintenance and improvement.",
      subcategories: [
        "Plumbing",
        "Leak Repair",
        "Drain Cleaning",
        "Water Heater Installation",
        "Pipe Replacement",
        "Electrical",
        "Wiring Installation",
        "Circuit Breaker Replacement",
        "Light Fixture Installation",
        "Home Automation",
        "Carpentry",
        "Custom Furniture",
        "Cabinet Installation",
        "Deck Building",
        "Framing",
        "HVAC",
        "Air Conditioning Installation",
        "Heating System Repair",
        "Ventilation Services",
        "Duct Cleaning",
        "Cleaning Services",
        "Residential Cleaning",
        "Commercial Cleaning",
        "Carpet Cleaning",
        "Window Washing",
        "Landscaping",
        "Lawn Maintenance",
        "Landscape Design",
        "Tree Removal",
        "Irrigation Systems",
        "Pest Control",
        "Termite Control",
        "Rodent Removal",
        "Bed Bug Extermination",
        "Organic Pest Solutions",
        "Roofing",
        "Roof Repair",
        "Gutter Installation",
        "Roof Inspection",
        "Shingle Replacement",
        "Home Security",
        "Alarm Installation",
        "Security Camera Systems",
        "Smart Lock Installation",
        "Home Surveillance",
        "Painting Services",
        "Interior Painting",
        "Exterior Painting",
        "Wallpaper Removal",
        "Decorative Finishes",
      ],
    },
    {
      name: "Automotive Services",
      description: "Services related to automobile maintenance and repair.",
      subcategories: [
        "Auto Repair",
        "Engine Diagnostics",
        "Brake Services",
        "Oil Changes",
        "Transmission Repair",
        "Car Wash",
        "Full-Service Wash",
        "Exterior Only",
        "Interior Detailing",
        "Waxing",
        "Tire Services",
        "Tire Rotation",
        "Tire Installation",
        "Wheel Alignment",
        "Tire Repair",
        "Towing Services",
        "Emergency Towing",
        "Long-Distance Towing",
        "Motorcycle Towing",
        "Flatbed Towing",
        "Car Rentals",
        "Luxury Car Rentals",
        "SUV Rentals",
        "Van Rentals",
        "Commercial Vehicle Rentals",
        "Car Detailing",
        "Exterior Detailing",
        "Engine Cleaning",
        "Paint Protection",
      ],
    },
    {
      name: "Health & Wellness",
      description: "Services related to health and wellness.",
      subcategories: [
        "Medical Clinics",
        "Family Medicine",
        "Urgent Care",
        "Pediatrics",
        "Women’s Health",
        "Dental Services",
        "General Dentistry",
        "Orthodontics",
        "Cosmetic Dentistry",
        "Pediatric Dentistry",
        "Chiropractic Services",
        "Spinal Adjustments",
        "Sports Injury Treatment",
        "Nutritional Counseling",
        "Physical Therapy",
        "Rehabilitation Services",
        "Sports Physical Therapy",
        "Post-Surgery Recovery",
        "Occupational Therapy",
        "Massage Therapy",
        "Swedish Massage",
        "Deep Tissue Massage",
        "Hot Stone Massage",
        "Prenatal Massage",
        "Beauty Salons",
        "Hair Cutting & Styling",
        "Coloring",
        "Nail Care",
        "Makeup Application",
        "Spas & Wellness Centers",
        "Day Spas",
        "Medical Spas",
        "Holistic Health Centers",
        "Yoga Studios",
        "Gyms & Fitness Centers",
        "Personal Training",
        "Group Classes",
        "CrossFit",
        "Nutrition Counseling",
      ],
    },
    {
      name: "Food & Beverage",
      description: "Services related to food and beverage.",
      subcategories: [
        "Restaurants",
        "Fine Dining",
        "Casual Dining",
        "Fast Food",
        "Ethnic Cuisine",
        "Cafes",
        "Coffee Shops",
        "Tea Houses",
        "Bakeries",
        "Juice Bars",
        "Artisan Bread",
        "Custom Cakes",
        "Pastries",
        "Gluten-Free Options",
        "Catering Services",
        "Event Catering",
        "Corporate Catering",
        "Wedding Catering",
        "Meal Prep Services",
        "Food Trucks",
        "Gourmet Food Trucks",
        "Dessert Trucks",
        "Ethnic Cuisine Trucks",
        "Coffee Trucks",
        "Grocery Stores",
        "Organic Markets",
        "Specialty Food Stores",
        "Ethnic Grocery Stores",
        "Convenience Stores",
        "Bars & Pubs",
        "Sports Bars",
        "Wine Bars",
        "Cocktail Lounges",
        "Microbreweries",
      ],
    },
    {
      name: "Personal Services",
      description: "Services focused on personal needs.",
      subcategories: [
        "Child Care Services",
        "Daycare Centers",
        "Nanny Services",
        "After-School Programs",
        "Pet Care Services",
        "Pet Sitting",
        "Dog Walking",
        "Grooming Services",
        "Boarding Facilities",
        "Hair Salons & Barbershops",
        "Women’s Haircuts",
        "Men’s Haircuts",
        "Beard Grooming",
        "Hair Coloring",
        "Makeup Artists",
        "Bridal Makeup",
        "Special Events Makeup",
        "Lessons",
        "Event Planning",
        "Wedding Planning",
        "Corporate Events",
        "Birthday Parties",
        "Fundraising Events",
        "Photography Services",
        "Wedding Photography",
        "Portrait Photography",
        "Event Photography",
        "Commercial Photography",
        "Tailoring & Alterations",
        "Custom Tailoring",
        "Clothing Alterations",
        "Formal Wear Alterations",
        "Upholstery Services",
      ],
    },
    {
      name: "Professional Services",
      description: "Services provided by professionals.",
      subcategories: [
        "Law Firms",
        "Family Law",
        "Criminal Defense",
        "Personal Injury",
        "Business Law",
        "Accounting Services",
        "Tax Preparation",
        "Bookkeeping",
        "Payroll Services",
        "Financial Consulting",
        "Financial Advisors",
        "Investment Planning",
        "Retirement Planning",
        "Estate Planning",
        "Insurance Consulting",
        "Consulting Firms",
        "Management Consulting",
        "IT Consulting",
        "Marketing Consulting",
        "Human Resources Consulting",
        "Marketing Agencies",
        "Digital Marketing",
        "Social Media Management",
        "SEO Services",
        "Content Creation",
        "IT Services",
        "Network Setup",
        "Cybersecurity Services",
        "Software Development",
      ],
    },
    {
      name: "Real Estate",
      description: "Services related to real estate.",
      subcategories: [
        "Real Estate Agents",
        "Residential Agents",
        "Commercial Agents",
        "Rental Agents",
        "Property Management",
        "Residential Property Management",
        "Commercial Property Management",
        "Vacation Rental Management",
        "Tenant Screening",
        "Vacation Rentals",
        "Short-term Rentals",
        "Holiday Rentals",
        "Luxury Villas",
        "Cabins",
      ],
    },
    {
      name: "Education & Tutoring",
      description: "Services related to education.",
      subcategories: [
        "Tutoring Services",
        "Subject-Specific Tutoring",
        "Test Preparation",
        "College Admissions Counseling",
        "Special Needs Tutoring",
        "Language Schools",
        "ESL (English as a Second Language)",
        "Foreign Language Courses",
        "Online Language Classes",
        "Immersion Programs",
        "Music Lessons",
        "Instrument Lessons",
        "Vocal Lessons",
        "Music Theory",
        "Art Classes",
        "Painting Classes",
        "Sculpture Workshops",
        "Photography Classes",
        "Online Art Courses",
        "Child Enrichment Programs",
        "STEM Programs",
        "Summer Camps",
        "Creative Arts Programs",
      ],
    },
    {
      name: "Arts & Entertainment",
      description: "Services related to arts and entertainment.",
      subcategories: [
        "Movie Theaters",
        "Independent Theaters",
        "IMAX Theaters",
        "Drive-in Theaters",
        "Luxury Theaters",
        "Concert Venues",
        "Indoor Concert Halls",
        "Outdoor Music Festivals",
        "Amphitheaters",
        "Art Galleries",
        "Contemporary Art Galleries",
        "Photography Galleries",
        "Historical Exhibits",
        "Art Shows",
        "Museums",
        "History Museums",
        "Science Museums",
        "Children's Museums",
        "Art Museums",
        "Amusement Parks",
        "Theme Parks",
        "Water Parks",
        "Arcade Centers",
        "Mini Golf",
        "Nightclubs",
        "Dance Clubs",
        "Live Music Venues",
        "Lounge Bars",
        "Karaoke Bars",
      ],
    },
    {
      name: "Retail",
      description: "Retail services.",
      subcategories: [
        "Clothing Stores",
        "Women’s Fashion",
        "Men’s Fashion",
        "Children’s Clothing",
        "Specialty Stores (e.g., activewear, formal wear)",
        "Electronics Stores",
        "Computer Stores",
        "Mobile Phone Retailers",
        "Home Appliance Stores",
        "Gaming Stores",
        "Furniture Stores",
        "Home Furnishings",
        "Office Furniture",
        "Antique Shops",
        "Home Decor Shops",
        "Home Goods",
        "Kitchenware",
        "Lighting",
        "Artwork",
        "Bookstores",
        "Independent Bookstores",
        "Used Bookstores",
        "Specialty Bookstores (e.g., cookbooks, children’s)",
        "Toy Stores",
        "Specialty Toy Stores",
        "Educational Toys",
        "Party Supplies",
        "Collectibles",
      ],
    },
    {
      name: "Travel & Transportation",
      description: "Services related to travel and transportation.",
      subcategories: [
        "Travel Agencies",
        "Domestic Travel",
        "International Travel",
        "Adventure Travel",
        "Cruise Packages",
        "Tour Operators",
        "Guided Tours",
        "Group Tours",
        "Custom Itineraries",
        "Eco-Tours",
        "Shuttle Services",
        "Airport Transfers",
        "Corporate Shuttle Services",
        "Event Transportation",
        "Private Shuttle Services",
        "Limousine Services",
        "Luxury Airport Transfers",
        "Wedding Limousines",
        "Corporate Transportation",
        "Special Event Rentals",
      ],
    },
    {
      name: "Construction & Renovation",
      description: "Services related to construction and renovation.",
      subcategories: [
        "General Contractors",
        "Residential Construction",
        "Commercial Construction",
        "Renovation Projects",
        "Project Management",
        "Interior Designers",
        "Residential Design",
        "Commercial Design",
        "Home Staging",
        "Space Planning",
        "Architects",
        "Residential Architecture",
        "Commercial Architecture",
        "Landscape Architecture",
        "Urban Planning",
        "Excavation Services",
        "Site Preparation",
        "Demolition",
        "Grading",
        "Utility Installation",
      ],
    },
    {
      name: "Tech Services",
      description: "Services related to technology.",
      subcategories: [
        "Computer Repair",
        "Desktop Repair",
        "Laptop Repair",
        "Data Recovery",
        "Virus Removal",
        "Mobile Phone Repair",
        "Screen Replacement",
        "Battery Replacement",
        "Software Troubleshooting",
        "Unlocking Services",
        "Web Development",
        "Website Design",
        "E-commerce Development",
        "Mobile App Development",
        "SEO Optimization",
        "Social Media Marketing",
        "Content Marketing",
        "Email Marketing",
        "PPC Advertising",
      ],
    },
    {
      name: "Miscellaneous Services",
      description: "Miscellaneous services.",
      subcategories: [
        "Waste Management",
        "Residential Trash Collection",
        "Commercial Waste Disposal",
        "Recycling Services",
        "Hazardous Waste Disposal",
        "Storage Facilities",
        "Self-Storage Units",
        "Climate-Controlled Storage",
        "Vehicle Storage",
        "Business Storage",
        "Translation Services",
        "Document Translation",
        "Interpreting Services",
        "Localization Services",
        "Sign Language Services",
        "Senior Care Services",
        "In-Home Care",
        "Assisted Living Facilities",
        "Adult Daycare Centers",
        "Senior Transportation Services",
      ],
    },
    {
      name: "Financial Services",
      description: "Services related to finance.",
      subcategories: [
        "Banks",
        "Retail Banking",
        "Business Banking",
        "Mortgage Services",
        "Investment Banking",
        "Credit Unions",
        "Personal Accounts",
        "Loans & Mortgages",
        "Financial Counseling",
        "Investment Services",
        "Insurance Agencies",
        "Life Insurance",
        "Health Insurance",
        "Auto Insurance",
        "Home Insurance",
      ],
    },
    {
      name: "Non-Profit Organizations",
      description: "Services provided by non-profit organizations.",
      subcategories: [
        "Charities",
        "Community Development",
        "Health Services",
        "Education & Literacy",
        "Environmental Conservation",
        "Community Service Organizations",
        "Volunteer Opportunities",
        "Community Events",
        "Support Services",
        "Crisis Intervention",
        "Environmental Organizations",
        "Conservation Groups",
        "Sustainability Initiatives",
        "Wildlife Protection",
        "Clean-Up Projects",
      ],
    },
  ];

// Function to seed the database
const seedCategories = async () => {
  try {
    await Category.deleteMany(); // Clear existing categories
    for (const categoryData of categories) {
      const category = new Category({
        name: categoryData.name,
        description: categoryData.description,
      });
      await category.save(); // Save category

      // Save subcategories if they exist
      if (categoryData.subcategories) {
        for (const subcategory of categoryData.subcategories) {
          const subcategoryDoc = new Category({
            name: subcategory,
            description: `${subcategory} related services.`,
            subcategories: [],
          });
          await subcategoryDoc.save();
          category.subcategories.push(subcategoryDoc._id); // Add subcategory ID to the main category
        }
        await category.save(); // Update main category with subcategories
      }
    }
    console.log("Categories seeded successfully!");
  } catch (error) {
    console.error("Error seeding categories:", error);
  } finally {
    mongoose.connection.close(); // Close the connection
  }
};

// Run the seed function
seedCategories();
