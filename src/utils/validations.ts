export function validateName(name: string): boolean {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(name);
  }
  
  export function validateEmail(email: string): boolean {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  }
  
  export function validateAge(age: number): boolean {
    return age > 0;
  }
  
  export function validateCPF(cpf: string): boolean {
    const regex = /^[0-9]{11}$/;
    return regex.test(cpf);
  }
  
  export function validatePhone(phone: string): boolean {
    const regex = /^[0-9]{11}$/;
    return regex.test(phone);
  }
  
  export function validateSerasaPFScore(score: number): boolean {
    return score >= 0 && score <= 1000;
  }
  
  export function validateCompanyName(companyName: string): boolean {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(companyName);
  }
  
  export function validateBusinessArea(businessArea: string): boolean {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(businessArea);
  }
  
  export function validateCNPJ(cnpj: string): boolean {
    const regex = /^[0-9]{14}$/;
    return regex.test(cnpj);
  }
  
  export function validateFoundationYears(years: number): boolean {
    return years >= 0;
  }
  
  export function validateSocialCapital(socialCapital: string): boolean {
    const regex = /^[0-9]+$/;
    return regex.test(socialCapital);
  }
  
  export function validateSerasaCompanyScore(score: number): boolean {
    return score >= 0 && score <= 1000;
  }
  
  export function validateAnnualRevenue(revenue: string): boolean {
    const regex = /^[0-9]+$/;
    return regex.test(revenue);
  }
  