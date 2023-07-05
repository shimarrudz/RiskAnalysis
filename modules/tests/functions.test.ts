import { analyzePersonalData, clampEligibilityPoints } from "../services/functions";

describe('AnalyzePersonalData function', () => {
  it('should be able to calculate eligibility points correctly', () => {
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
  it('should be able to clamp eligibility points to 100', () => {
    const eligibilityPoints = clampEligibilityPoints(120);
    expect(eligibilityPoints).toBe(100);
  });
});

describe('Clamp Eligibility Points function', () => {
  it('should be able to clamp eligibility points to 100', () => {
    const eligibilityPoints = clampEligibilityPoints(120);
    expect(eligibilityPoints).toBe(100);
  });

  it('should not be able to clamp eligibility points if below or equal to 100', () => {
    const eligibilityPoints = clampEligibilityPoints(80);
    expect(eligibilityPoints).toBe(80);
  });
});

});


