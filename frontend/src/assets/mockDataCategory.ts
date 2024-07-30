const mockData = [
  {
    id: 3,
    title: "Home repair & maintenance",
    mainDescription:
      "When you sell your property and make a profit, a 30% capital gains tax applies. You can deduct expenses for repair & maintenance for actions that have improved the condition of the property at the time of sale compared to when it was purchased.",
    example:
      "Lisa is selling her apartment. She has spent 80,000 SEK on renovations. Lisa made a profit of 200,000 SEK when she sold the apartment, which means she needs to pay 60,000 SEK in taxes (30% of 200,000 SEK). However, because she spent 80,000 SEK on renovations, the taxable profit is reduced to 120,000 SEK. The capital gains tax is then calculated to be 36,000 SEK. Thus, she saves 24,000 SEK on her tax declaration.",
    rules:
      "Must have been done within the last 5 years., The actions should have improved the condition of the property at the time of sale compared to when it was purchased., Expenses covered by ROT deductions cannot be included., To qualify for deductions, the total improvement expenses per year must be at least 5,000 SEK., The basic principle for eligibility is that expenses must be verified with invoices and receipts., You cannot deduct the value of your own labor.",
    approvedDescription:
      "Here are some examples of approved expenses to give you an idea of the type of expenses that are approved. ",
    approvedExamples: [
      "Replacing appliances like a dishwasher",
      "Painting & repainting",
      "Wallpapering",
      "Replacing trim",
      "Replacing deck boards",
      "Renovating the bathroom, such as replacing the sink, toilet, and bathtub",
      "Renovating the kitchen, such as replacing appliances, cabinets, countertops, and doors without increasing the number of cabinets and countertops",
      "Lacquering or repainting doors and cabinet doors",
      "Re-tiling",
      "Replacing floors with the same or similar material",
    ],
  },
  {
    id: 2,
    title: "New additions & upgrades",
    mainDescription:
      "If you sell your home with profit this deduction is great if you’ve made upgrades. This includes expenses for new construction, expansions, and alterations to your home. Also basic improvements that add new features or upgrade existing ones to a higher standard.",
    example:
      "You have a floor covered with a vinyl mat, which you replace with a parquet floor eight years before selling your house. The cost to replace with parquet is 8,000 SEK, but replacing with a similar vinyl mat costs only 3,000 SEK. Since you are upgrading to a significantly better and more expensive material, you can deduct the price difference of 5,000 SEK as a basic improvement. Since the expense occurred more than five years before the sale year, it is not possible to deduct the remaining amount as a repair or maintenance expense. Calculation: Parquet: 8,000 SEK. Vinyl mat: −3,000 SEK. Deduction for basic improvement: = 5,000 SEK",
    rules: [
      "This deduction applies to new construction, expansion in volume, or changes to the structure, layout, or function.",
      "Replacing existing equipment with better materials or a higher standard also qualifies as a basic improvement.",
      "If you replace a building part or material with something significantly better and more expensive, it counts as a basic improvement. However, you can only deduct the price difference between the new, more expensive material and the previous equivalent material.",
      "Replacing with equivalent materials or building parts is considered repair or maintenance, not a basic improvement. For such expenses, see the tax category: Home Repair & Maintenance.",
      "Costs covered by ROT deductions cannot be included.",
    ],
    approvedDescription:
      "Here are some examples of new additions and upgrades to give you an idea of the type of expenses that are approved. ",
    approvedExamples: [
      "Building a new house, garage, carport, small shed, or detached greenhouse",
      "Drilling or digging a well",
      "Installing a new lawn",
      "Planting trees and plants",
      "Landscaping such as stone paving and tiling",
      "Building a fence",
      "Moving the kitchen to a different location in the apartment or changing the layout, such as knocking down a wall (simply replacing kitchen cabinets is not sufficient)",
      "Building a bathroom where there was previously a walk-in closet or storage room",
      "Installing a fireplace, tiled stove, wood stove, or heat pump as an additional heat source",
      "Installing a dishwasher, washing machine, or dryer",
      "Installing a central vacuum system",
      "Adding more kitchen cabinets",
      "Installing awnings",
      "Building a pool",
      "Creating a pond",
      "Planting trees or shrubs",
      "Adding extra insulation",
      "Installing fixed wardrobes",
      "Glassing in a balcony (deductible if you pay for the expense yourself and not the association)",
    ],
  },
  {
    id: 1,
    title: "Home sale expenses",
    mainDescription:
      "When you sell your property, you can deduct related expenses such as realtor fees, inspection costs, home staging, and advertising fees.",
    example: "N/A",
    rules: "N/A",
    approvedDescription:
      "Here are some examples of expenses related to the sale of a home to give you an idea of the type of expenses that are approved. ",
    approvedExamples: [
      "Inspection costs",
      "Premium for hidden defects insurance and energy certification",
      "Realtor fees and other sales commissions",
      "Legal fees",
      "Appraisal costs (e.g., expenses for property valuation)",
      "Advertising",
      "Home staging (e.g., consultation, interior decoration, furnishing, but not cleaning or furniture purchases)",
    ],
  },
];

export default mockData;
