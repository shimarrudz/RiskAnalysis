const NAME_REGEX = /^[a-zA-Z\s]+$/;
const EMAIL_REGEX = /\S+@\S+\.\S+/;
const CPF_REGEX = /^[0-9]{11}$/;
const PHONE_REGEX = /^[0-9]{11}$/;
const COMPANY_NAME_REGEX = /^[a-zA-Z\s]+$/;
const BUSINESS_AREA_REGEX = /^[a-zA-Z\s]+$/;
const CNPJ_REGEX = /^[0-9]{14}$/;
const SOCIAL_CAPITAL_REGEX = /^[0-9]+$/;
const REVENUE_REGEX = /^[0-9]+$/;

export function validateName(name: string): boolean {
  return NAME_REGEX.test(name);
}

export function validateEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}

export function validateAge(age: number): boolean {
  return age > 0;
}

export function validateCPF(cpf: string): boolean {
  return CPF_REGEX.test(cpf);
}

export function validatePhone(phone: string): boolean {
  return PHONE_REGEX.test(phone);
}

export function validateSerasaPFScore(score: number): boolean {
  return score >= 0 && score <= 1000;
}

export function validateCompanyName(companyName: string): boolean {
  return COMPANY_NAME_REGEX.test(companyName);
}

export function validateBusinessArea(businessArea: string): boolean {
  return BUSINESS_AREA_REGEX.test(businessArea);
}

export function validateCNPJ(cnpj: string): boolean {
  return CNPJ_REGEX.test(cnpj);
}

export function validateFoundationYears(years: number): boolean {
  return years >= 0;
}

export function validateSocialCapital(socialCapital: string): boolean {
  return SOCIAL_CAPITAL_REGEX.test(socialCapital);
}

export function validateSerasaCompanyScore(score: number): boolean {
  return score >= 0 && score <= 1000;
}

export function validateAnnualRevenue(revenue: string): boolean {
  return REVENUE_REGEX.test(revenue);
}
