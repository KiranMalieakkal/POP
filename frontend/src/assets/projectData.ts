const projectData = {
  userId: "user123",
  taxCategories: [
    {
      taxCategory: "Commute to work",
      projects: [
        {
          projectId: "CWT001",
          projectName: "Daily Commute",
          receipts: [
            {
              id: 1,
              company: "Uber",
              amount: 19.99,
              currency: "USD",
              purchaseDate: "2023-07-04",
              category: "Travel",
            },
            {
              id: 2,
              company: "Lyft",
              amount: 29.99,
              currency: "USD",
              purchaseDate: "2023-07-09",
              category: "Travel",
            },
          ],
        },
        {
          projectId: "CWT002",
          projectName: "Business Trip",
          receipts: [
            {
              id: 3,
              company: "Airbnb",
              amount: 499.99,
              currency: "USD",
              purchaseDate: "2023-07-08",
              category: "Travel",
            },
            {
              id: 4,
              company: "Expedia",
              amount: 999.99,
              currency: "USD",
              purchaseDate: "2023-07-14",
              category: "Travel",
            },
          ],
        },
      ],
    },
    {
      taxCategory: "Gifts",
      projects: [
        {
          projectId: "GFT001",
          projectName: "Birthday Gifts",
          receipts: [
            {
              id: 5,
              company: "Amazon",
              amount: 99.99,
              currency: "USD",
              purchaseDate: "2023-07-01",
              category: "Office Supplies",
            },
            {
              id: 6,
              company: "Starbucks",
              amount: 4.99,
              currency: "USD",
              purchaseDate: "2023-07-05",
              category: "Entertainment",
            },
          ],
        },
        {
          projectId: "GFT002",
          projectName: "Holiday Gifts",
          receipts: [
            {
              id: 7,
              company: "Netflix",
              amount: 12.99,
              currency: "USD",
              purchaseDate: "2023-07-07",
              category: "Entertainment",
            },
            {
              id: 8,
              company: "Spotify",
              amount: 9.99,
              currency: "USD",
              purchaseDate: "2023-07-10",
              category: "Entertainment",
            },
          ],
        },
      ],
    },
    {
      taxCategory: "House Renovation",
      projects: [
        {
          projectId: "HR001",
          projectName: "Kitchen Renovation",
          receipts: [
            {
              id: 9,
              company: "Home Depot",
              amount: 150.75,
              currency: "USD",
              purchaseDate: "2023-06-20",
              category: "Home Improvement",
            },
            {
              id: 10,
              company: "Ikea",
              amount: 250.5,
              currency: "USD",
              purchaseDate: "2023-06-22",
              category: "Furniture",
            },
          ],
        },
        {
          projectId: "HR002",
          projectName: "Bathroom Renovation",
          receipts: [
            {
              id: 11,
              company: "Lowes",
              amount: 299.99,
              currency: "USD",
              purchaseDate: "2023-06-25",
              category: "Home Improvement",
            },
            {
              id: 12,
              company: "Home Depot",
              amount: 200.0,
              currency: "USD",
              purchaseDate: "2023-06-27",
              category: "Home Improvement",
            },
          ],
        },
      ],
    },
  ],
};

// const projectData = [
//     {
//         "id": 1,
//         "company": "Amazon",
//         "amount": 99.99,
//         "currency": "USD",
//         "purchaseDate": "2023-07-01",
//         "project": "Project Alpha",
//         "category": "Office Supplies"
//     },
//     {
//         "id": 2,
//         "company": "Microsoft",
//         "amount": 199.93,
//         "currency": "USD",
//         "purchaseDate": "2023-07-02",
//         "project": null,
//         "category": null
//     },
//     {
//         "id": 3,
//         "company": "Delta",
//         "amount": 299.99,
//         "currency": "USD",
//         "purchaseDate": "2023-07-03",
//         "project": "Project Alpha",
//         "category": "Travel"
//     },
//     {
//         "id": 4,
//         "company": "Uber",
//         "amount": 19.99,
//         "currency": "USD",
//         "purchaseDate": "2023-07-04",
//         "project": "Project Alpha",
//         "category": "Travel"
//     },
//     {
//         "id": 5,
//         "company": "Starbucks",
//         "amount": 4.99,
//         "currency": "USD",
//         "purchaseDate": "2023-07-05",
//         "project": "Project Alpha",
//         "category": "Entertainment"
//     },
//     {
//         "id": 6,
//         "company": "Adobe",
//         "amount": 9.99,
//         "currency": "USD",
//         "purchaseDate": "2023-07-06",
//         "project": "Project Alpha",
//         "category": "Software"
//     },
//     {
//         "id": 7,
//         "company": "Netflix",
//         "amount": 12.99,
//         "currency": "USD",
//         "purchaseDate": "2023-07-07",
//         "project": "Project Alpha",
//         "category": "Entertainment"
//     },
//     {
//         "id": 8,
//         "company": "Airbnb",
//         "amount": 499.99,
//         "currency": "USD",
//         "purchaseDate": "2023-07-08",
//         "project": "Project Alpha",
//         "category": "Travel"
//     },
//     {
//         "id": 9,
//         "company": "Lyft",
//         "amount": 29.99,
//         "currency": "USD",
//         "purchaseDate": "2023-07-09",
//         "project": "Project Alpha",
//         "category": "Travel"
//     },
//     {
//         "id": 10,
//         "company": "Spotify",
//         "amount": 9.99,
//         "currency": "USD",
//         "purchaseDate": "2023-07-10",
//         "project": "Project Alpha",
//         "category": "Entertainment"
//     },
//     {
//         "id": 11,
//         "company": "Slack",
//         "amount": 6.99,
//         "currency": "USD",
//         "purchaseDate": "2023-07-11",
//         "project": "Project Alpha",
//         "category": "Software"
//     },
//     {
//         "id": 12,
//         "company": "Google",
//         "amount": 49.99,
//         "currency": "USD",
//         "purchaseDate": "2023-07-12",
//         "project": "Project Alpha",
//         "category": "Software"
//     },
//     {
//         "id": 13,
//         "company": "WeWork",
//         "amount": 299.99,
//         "currency": "USD",
//         "purchaseDate": "2023-07-13",
//         "project": "Project Alpha",
//         "category": "Office Supplies"
//     },
//     {
//         "id": 14,
//         "company": "Expedia",
//         "amount": 999.99,
//         "currency": "USD",
//         "purchaseDate": "2023-07-14",
//         "project": "Project Alpha",
//         "category": "Travel"
//     },
//     {
//         "id": 15,
//         "company": "GitHub",
//         "amount": 9.99,
//         "currency": "USD",
//         "purchaseDate": "2023-07-15",
//         "project": "Project Alpha",
//         "category": "Software"
//     },
//     {
//         "id": 31,
//         "company": "Hemköp",
//         "amount": 200.35,
//         "currency": "SEK",
//         "purchaseDate": "2024-07-25",
//         "project": null,
//         "category": null
//     },
//     {
//         "id": 32,
//         "company": "Hemköp",
//         "amount": 177.35,
//         "currency": "SEK",
//         "purchaseDate": "2024-07-25",
//         "project": null,
//         "category": null
//     }
// ]

export default projectData;
