import { analyzePersonalData, clampEligibilityPoints } from "../utils/functions";

describe('Tests for analyzePersonalData function', () => {
  test('should be able to calculate eligibility points correctly', () => {
    const serasaPFScore = 600;
    const foundationYears = 5;
    const serasaCompanyScore = 600;
    const annualRevenue = 6000000;
    const criminalModel = false;
    const debtHistory = false;

    const eligibilityPoints = analyzePersonalData(
      serasaPFScore,
      foundationYears,
      serasaCompanyScore,
      annualRevenue,
      criminalModel,
      debtHistory
    );

    expect(eligibilityPoints).toBe(65);
  });

describe('Testing clamp eligibility points', () => {  
  test('should be able to clamp eligibility points to 100', () => {
    const eligibilityPoints = clampEligibilityPoints(120);
    expect(eligibilityPoints).toBe(100);
  });
});
});
