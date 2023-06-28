Sure! Here's the README file for your GitHub repository, written in Markdown with emojis in the title:

# 📚 Adiante Credit Risk Analysis Simulation

> Adiante is a company specializing in receivables advance and aims to assist its clients in improving cash flow by allowing the anticipation of pending amounts. Your task is to develop a program that simulates Adiante's credit risk analysis procedure. The goal of this software is to simulate risk analysis based on client data, applying specific rules to determine whether a client is eligible for receivables advance based on classification levels.

## ❓ Challenge Case

Consider the following information:

### 👤 **Client**

Each client has the following information:

1. Personal details:
   - Name
   - Email
   - Age
   - Marital Status
   - CPF or CNPJ
2. Financial information:
   - Monthly income
   - Credit limit
   - Income sources
   - Monthly expenses
   - Debt level
   - Payment history
   - Default history
3. Employment and professional stability:
   - Profession
   - Employment contract type (CLT, self-employed, entrepreneur)
4. Business data (if the client is a company):
   - Business sector
   - Time in existence
   - Annual revenue
   - Financial result (profit or loss)

Remember that you should generate this data randomly or define it statically in your project for analysis purposes.

- Example
  const clients = [
    {
      name: "John Doe",
      email: "johndoe@example.com",
      age: 35,
      maritalStatus: "Married",
      cpf: "123.456.789-00",
      monthlyIncome: 5000,
      creditLimit: 10000,
      incomeSources: ["Salary", "Investments"],
      monthlyExpenses: 3000,
      debtLevel: 0.5,
      paymentHistory: "No delays in the last 2 years",
      defaultHistory: "No default records",
      occupation: "Engineer",
      employmentType: "CLT"
    },
    {
      name: "Company ABC Ltd.",
      email: "contact@companyabc.com",
      age: 40,
      maritalStatus: "Single",
      cnpj: "98.765.432/0001-01",
      monthlyIncome: 20000,
      creditLimit: 80000,
      incomeSources: ["Revenue", "Loans"],
      monthlyExpenses: 10000,
      debtLevel: 0.7,
      paymentHistory: "Timely",
      defaultHistory: "No default records",
      occupation: "Entrepreneur",
      employmentType: "PJ",
      businessArea: "Services",
      existenceYears: "10 years",
      annualRevenue: 5000000,
      financialResult: "Profit"
    }
  ];

### 📄 **Risk Evaluation**

The credit risk evaluation is a process that determines whether a client is eligible for receivables advance.

Levels:

- S: Fully Eligible
  - Clients classified as S meet all evaluation criteria and have a high enough score to be considered fully eligible for receivables advance. They are low-risk and highly eligible clients.
- A: High
  - Clients classified as A meet most evaluation criteria and have a significant score. Although they do not reach the maximum level of eligibility, they are still considered clients with high potential for receivables advance.
- B: Medium
  - Clients classified as B meet some evaluation criteria but have an intermediate score. Although they have potential for receivables advance, they may present a moderate risk that requires further analysis and consideration.
- C

: Low
  - Clients classified as C do not meet a significant number of evaluation criteria or have a low score. They present a higher risk and may have restrictions on receivables advance operations.
- D: Ineligible
  - Clients classified as D do not meet most evaluation criteria or have a very low score. They are considered ineligible for receivables advance due to high risk or lack of eligibility.

### 🎯 **Criteria**

The criteria represent the situations that will be analyzed to determine the client's eligibility. Each criterion represents a specific condition that needs to be evaluated.

1. **Personal Details**: This category encompasses basic client information. Age can indicate financial maturity, and marital status can signal the level of personal stability, which can be indicative of financial responsibility. CPF or CNPJ is essential to verify the client's legal existence and check their credit history.
2. **Financial Information**: Monthly income and income sources provide insights into the client's ability to meet financial obligations. Debt level and payment history indicate the client's past behavior regarding credit. Default history can signal a higher risk. Monthly expenses and credit limit can show how the client manages their finances.
3. **Employment and Professional Stability**: Profession and employment contract type can indicate income stability. For example, an employee under the CLT contract may have more income stability than a self-employed individual, which can affect credit risk.
4. **Business Data**: In the case of corporate clients, it is important to evaluate business performance. Time in existence can indicate business durability. Annual revenue and financial result (profit or loss) provide insights into the business's financial health.

By combining all these criteria, credit risk analysis provides a holistic view of the client and allows for more informed and accurate credit decision-making. Each element is a piece of the puzzle and is essential to evaluating the client's eligibility for receivables advance.

## 💻 Technologies

- TypeScript
- Object-Oriented Programming (OOP)
- Unit Testing with Jest

## 👾 Bonus Points

- Clean Code practices
- Use of Faker.js for data generation
- Understanding of Adiante's real-world analysis
- Implementation of a simple interface

## ❌ Constraints

- Avoid using external libraries
- Do not copy code from external sources

## 🌐 Links

- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Jest](https://jestjs.io/)
- [Faker.js](https://fakerjs.dev/)
