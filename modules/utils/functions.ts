// Aplicando métodos de Use Case.
export function analyzePersonalData(serasaPFScore: number, foundationYears: number, serasaCompanyScore: number, annualRevenue: number, criminalModel: boolean, debtHistory: boolean): number {
  try {
    const eligibilityPoints = calculateEligibilityPoints(serasaPFScore, foundationYears, serasaCompanyScore, annualRevenue, criminalModel, debtHistory);
    return clampEligibilityPoints(eligibilityPoints);
  } catch (error) {
    console.error('Erro ao realizar a análise de elegibilidade:', error);
    throw new Error('Erro na análise de elegibilidade');
  }
}

function calculateEligibilityPoints(serasaPFScore: number, foundationYears: number, serasaCompanyScore: number, annualRevenue: number, criminalModel: boolean, debtHistory: boolean): number {
  let eligibilityPoints = 0;

  if (serasaPFScore >= 700) {
    eligibilityPoints += 30;
  } else if (serasaPFScore >= 501) {
    eligibilityPoints += 20;
  } else if (serasaPFScore >= 301) {
    eligibilityPoints += 10;
  }

  if (foundationYears >= 10) {
    eligibilityPoints += 15;
  } else if (foundationYears >= 6) {
    eligibilityPoints += 10;
  } else if (foundationYears >= 3) {
    eligibilityPoints += 5;
  }

  if (serasaCompanyScore >= 700) {
    eligibilityPoints += 30;
  } else if (serasaCompanyScore >= 501) {
    eligibilityPoints += 20;
  } else if (serasaCompanyScore >= 301) {
    eligibilityPoints += 10;
  }

  if (annualRevenue >= 12000000) {
    eligibilityPoints += 25;
  } else if (annualRevenue >= 4800000) {
    eligibilityPoints += 20;
  } else if (annualRevenue >= 301000) {
    eligibilityPoints += 10;
  }

  if (!criminalModel) {
    eligibilityPoints += 0;
  } else {
    eligibilityPoints = 0;
  }

  if (!debtHistory) {
    eligibilityPoints += 0;
  } else {
    eligibilityPoints = 0;
  }

  return eligibilityPoints;
}

function clampEligibilityPoints(eligibilityPoints: number): number {
  if (eligibilityPoints > 100) {
    return 100;
  }

  return eligibilityPoints;
}
