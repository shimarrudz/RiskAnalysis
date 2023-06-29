import readline from 'readline';

interface Client {
  personalData: {
    name: string;
    email: string;
    age: number;
    cpf: string;
    phone: string;
    serasaPFScore: number;
  };
  company: {
    name: string;
    businessArea: string;
    cnpj: string;
    foundationYears: number;
    socialCapital: number;
  };
  financialData: {
    criminalModel: boolean;
    debtHistory: boolean;
    serasaCompanyScore: number;
    annualRevenue: number;
  };
}

function promptUser(question: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise<string>((resolve, reject) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

async function collectData(): Promise<Client> {
  const personalData = {
    name: await promptUser('Enter your name: '),
    email: await promptUser('Enter your email: '),
    age: parseInt(await promptUser('Enter your age: ')),
    cpf: await promptUser('Enter your CPF: '),
    phone: await promptUser('Enter your phone number: '),
    serasaPFScore: parseInt(await promptUser('Enter your Serasa PF Score: '))
  };

  const company = {
    name: await promptUser('Enter your company name: '),
    businessArea: await promptUser('Enter your business area: '),
    cnpj: await promptUser('Enter your CNPJ: '),
    foundationYears: parseInt(await promptUser('Enter the number of years since the company was founded: ')),
    socialCapital: parseFloat(await promptUser('Enter your company\'s social capital: '))
  };

  const financialData = {
    criminalModel: await promptUser('Does your company have a criminal model? (true/false): ') === 'true',
    debtHistory: await promptUser('Does your company have a debt history? (true/false): ') === 'true',
    serasaCompanyScore: parseInt(await promptUser('Enter your Serasa Company Score: ')),
    annualRevenue: parseFloat(await promptUser('Enter your company\'s annual revenue: '))
  };

  const client: Client = {
    personalData,
    company,
    financialData
  };

  return client;
}

async function main() {
  const client = await collectData();
  console.log('Collected data:', client);

  // Perform analysis based on the collected data
  let eligibilityPoints = 0;

  // Analisar dados pessoais
  if (client.personalData.age >= 18) {
    eligibilityPoints += 10;
  }

  if (client.personalData.serasaPFScore >= 700) {
    eligibilityPoints += 20;
  } else if (client.personalData.serasaPFScore >= 501) {
    eligibilityPoints += 15;
  } else if (client.personalData.serasaPFScore >= 301) {
    eligibilityPoints += 10;
  } else {
    eligibilityPoints += 5;
  }

  // Analisar dados da empresa
  if (client.company.foundationYears >= 10) {
    eligibilityPoints += 15;
  } else if (client.company.foundationYears >= 6) {
    eligibilityPoints += 10;
  } else if (client.company.foundationYears >= 3) {
    eligibilityPoints += 5;
  } else {
    eligibilityPoints += 3;
  }

  if (client.financialData.criminalModel === false) {
    eligibilityPoints += 30;
  }

  if (client.financialData.debtHistory === false) {
    eligibilityPoints += 30;
  }

  if (client.financialData.serasaCompanyScore >= 700) {
    eligibilityPoints += 25;
  } else if (client.financialData.serasaCompanyScore >= 501) {
    eligibilityPoints += 15;
  } else if (client.financialData.serasaCompanyScore >= 301) {
    eligibilityPoints += 5;
  }

  if (client.financialData.annualRevenue >= 12000000) {
    eligibilityPoints += 25;
  } else if (client.financialData.annualRevenue >= 4800000) {
    eligibilityPoints += 20;
  } else if (client.financialData.annualRevenue >= 301000) {
    eligibilityPoints += 10;
  }

  // Gerar relatório
  let eligibilityLevel: string;

  if (eligibilityPoints <= 20) {
    eligibilityLevel = 'Bronze - Inapto para operar';
  } else if (eligibilityPoints <= 40) {
    eligibilityLevel = 'Prata - Baixo';
  } else if (eligibilityPoints <= 60) {
    eligibilityLevel = 'Ouro - Médio';
  } else if (eligibilityPoints <= 80) {
    eligibilityLevel = 'Platina - Alto';
  } else {
    eligibilityLevel = 'Azul - Totalmente Apto';
  }

  const report = {
    eligibilityLevel,
    eligibilityPoints
  };

  console.log('Analysis report:', report);
}

main();
