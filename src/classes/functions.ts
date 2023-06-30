interface PersonalData {
  name: string;
  email: string;
  age: number;
  cpf: string;
  phone: string;
  serasaPFScore: number;
  companyName: string;
  businessArea: string;
  cnpj: string;
  foundationYears: number;
  socialCapital: number;
  criminalModel: boolean;
  debtHistory: boolean;
  serasaCompanyScore: number;
  annualRevenue: number;
}

interface Client {
  personalData: PersonalData;
}


export function analyzePersonalData(personalData: PersonalData): number {
  let eligibilityPoints = 0;

  // Analisar dados pessoais
  if (personalData.serasaPFScore >= 700) {
    eligibilityPoints += 30;
  } else if (personalData.serasaPFScore >= 501) {
    eligibilityPoints += 20;
  } else if (personalData.serasaPFScore >= 301) {
    eligibilityPoints += 10;
  } else {
    eligibilityPoints += 0;
  }

  // Analisar dados da empresa
  if (personalData.foundationYears >= 10) {
    eligibilityPoints += 15;
  } else if (personalData.foundationYears >= 6) {
    eligibilityPoints += 10;
  } else if (personalData.foundationYears >= 3) {
    eligibilityPoints += 5;
  } else {
    eligibilityPoints += 0;
  }

  // Serasa empresa
  if (personalData.serasaCompanyScore >= 700) {
    eligibilityPoints += 30;
  } else if (personalData.serasaCompanyScore >= 501) {
    eligibilityPoints += 20;
  } else if (personalData.serasaCompanyScore >= 301) {
    eligibilityPoints += 10;
  } else {
    eligibilityPoints += 0;
  }

  // Fatura anual
  if (personalData.annualRevenue >= 12000000) {
    eligibilityPoints += 25;
  } else if (personalData.annualRevenue >= 4800000) {
    eligibilityPoints += 20;
  } else if (personalData.annualRevenue >= 301000) {
    eligibilityPoints += 10;
  }

  // Modelo criminal e Histórico de Inadimplência
  if (personalData.criminalModel === false) {
    eligibilityPoints += 0;
  } else if (personalData.criminalModel === true) {
    eligibilityPoints = 0;
  }

  if (personalData.debtHistory === false) {
    eligibilityPoints += 0;
  } else if (personalData.debtHistory === true) {
    eligibilityPoints = 0;
  }

  return eligibilityPoints;
}

export function generateReport(eligibilityPoints: number): { eligibilityLevel: string, eligibilityPoints: number } {
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

  return {
    eligibilityLevel,
    eligibilityPoints
  };
}

/* function promptUser(question: string): Promise<string> {
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
} */

/* function insertClient(client: Client) {
  const db = new sqlite3.Database('src/DataBase/database.db'); // Insira o caminho para o seu banco de dados

  const {
    name,
    email,
    age,
    cpf,
    phone,
    serasaPFScore,
    companyName,
    businessArea,
    cnpj,
    foundationYears,
    socialCapital,
    serasaCompanyScore,
    annualRevenue,
    criminalModel,
    debtHistory
  } = client.personalData;

  const eligibilityPoints = analyzePersonalData(client.personalData);
  const report = generateReport(eligibilityPoints);

  db.run(
    `INSERT INTO clients (
      name,
      email,
      age,
      cpf,
      phone,
      serasaPFScore,
      companyName,
      businessArea,
      cnpj,
      foundationYears,
      socialCapital,
      serasaCompanyScore,
      annualRevenue,
      criminalModel,
      debtHistory,
      eligibilityLevel,
      eligibilityPoints
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      name,
      email,
      age,
      cpf,
      phone,
      serasaPFScore,
      companyName,
      businessArea,
      cnpj,
      foundationYears,
      socialCapital,
      serasaCompanyScore,
      annualRevenue,
      criminalModel,
      debtHistory,
      report.eligibilityLevel,
      report.eligibilityPoints
    ],
    (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log('Cliente adicionado com sucesso');
      }
    }
  );

  db.close();
} */


/* async function collectPersonalData(): Promise<PersonalData> {
  const personalData: PersonalData = {
    name: await promptUser('Insira seu nome: '),
    email: await promptUser('Insira seu e-mail: '),
    age: parseInt(await promptUser('Insira sua idade: ')),
    cpf: await promptUser('Insira seu CPF: '),
    phone: await promptUser('Insira seu telefone: '),
    serasaPFScore: parseInt(await promptUser('Insira seu Score do Serasa no seu CPF: ')),
    companyName: await promptUser('Insira o nome da sua empresa: '),
    businessArea: await promptUser('Insira a área do negócio: '),
    cnpj: await promptUser('Insira o CNPJ da empresa: '),
    foundationYears: parseInt(await promptUser('Quantos anos fazem desde que a empresa foi fundada? : ')),
    socialCapital: parseFloat(await promptUser('Insira o capital social da sua empresa: ')),
    criminalModel: await promptUser('Sua empresa possui algum histórico de processo criminal? (true/false): ') === 'true',
    debtHistory: await promptUser('Sua empresa possui algum histórico de inadimplência? (true/false): ') === 'true',
    serasaCompanyScore: parseInt(await promptUser('Insira o Score do Serasa da sua empresa: ')),
    annualRevenue: parseFloat(await promptUser('Insira a fatura anual da sua empresa: '))
  };

  return personalData;
} */


/* async function main() {
  let exit = false;

  const menuOptions = {
    '1': async () => {
      const client = await collectPersonalData();
      console.log('Dados coletados:', client);
      console.log('Empresa cadastrada com sucesso!')
      await insertClient({ personalData: client });
    },
    '2': () => {
      // ...
    },
    '3': () => {
      // ...
    },
    '4': () => {
      exit = true;
      console.log('Saindo do programa...');
    }
  };

  while (!exit) {
    try {
      const choice = await promptUser(
        '<-<-<-<-Menu->->->->\n1 - Cadastrar usuário\n2 - Consultar dados do usuário\n3 - Ver relatório de análise\n4 - Sair\n'
      );

      if (choice in menuOptions) {
        const selectedOption = menuOptions[choice as keyof typeof menuOptions];
        await selectedOption();
      } else {
        console.log('Opção inválida. Por favor, selecione uma opção válida.');
      }
    } catch (error) {
      console.error('Ocorreu um erro:', error);
    }
  }
}

main(); */