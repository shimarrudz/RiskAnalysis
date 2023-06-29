import readline from 'node:readline';
import fs from 'node:fs';
import path from 'node:path';

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

// Função para ler o arquivo JSON
function readJSONFile(filePath: string): any {
  const jsonString = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(jsonString);
}

// Função para escrever no arquivo JSON
function writeJSONFile(filePath: string, data: any) {
  const folderPath = 'src/jsonFiles'; // Insira o caminho da pasta desejada aqui
  const fullPath = path.join(folderPath, filePath);
  const jsonString = JSON.stringify(data, null, 2);
  fs.writeFileSync(fullPath, jsonString, 'utf-8');
}

async function collectData(): Promise<Client> {
  const personalData = {
    name: await promptUser('Insira seu nome: '),
    email: await promptUser('Insira seu e-mail: '),
    age: parseInt(await promptUser('Insira sua idade: ')),
    cpf: await promptUser('Insira seu CPF: '),
    phone: await promptUser('Insira seu telefone: '),
    serasaPFScore: parseInt(await promptUser('Insira seu Score do Serasa no seu CPF: '))
  };

  const company = {
    name: await promptUser('Insira o nome da sua empresa: '),
    businessArea: await promptUser('Insira a área do negocio: '),
    cnpj: await promptUser('Insira o CNPJ da empresa: '),
    foundationYears: parseInt(await promptUser('Quantos anos fazem desde que a empresa foi fundada? : ')),
    socialCapital: parseFloat(await promptUser('Insira o capital social da sua empresa: '))
  };

  const financialData = {
    serasaCompanyScore: parseInt(await promptUser('Insira o Score do Serasa da sua empresa: ')),
    annualRevenue: parseFloat(await promptUser('Insira a fatura anual da sua empresa: ')),
    criminalModel: await promptUser('Sua empresa possui algum histórico de processo criminal? (true/false): ') === 'true',
    debtHistory: await promptUser('Sua empresa possui algum histórico de inadimplência? (true/false): ') === 'true'
  };

  const client: Client = {
    personalData,
    company,
    financialData
  };

  return client;
}

async function main() {
  let client: Client;

  try {
    client = await collectData();
    console.log('Dados coletados:', client);

    let eligibilityPoints = 0;

  // Analisar dados pessoais
  if (client.personalData.serasaPFScore >= 700) {
    eligibilityPoints += 30;
  } else if (client.personalData.serasaPFScore >= 501) {
    eligibilityPoints += 20;
  } else if (client.personalData.serasaPFScore >= 301) {
    eligibilityPoints += 10;
  } else {
    eligibilityPoints += 0;
  }

  // Analisar dados da empresa
  if (client.company.foundationYears >= 10) {
    eligibilityPoints += 15;
  } else if (client.company.foundationYears >= 6) {
    eligibilityPoints += 10;
  } else if (client.company.foundationYears >= 3) {
    eligibilityPoints += 5;
  } else {
    eligibilityPoints += 0;
  }


  // Serasa empresa
  if (client.financialData.serasaCompanyScore >= 700) {
    eligibilityPoints += 30;
  } else if (client.financialData.serasaCompanyScore >= 501) {
    eligibilityPoints += 20;
  } else if (client.financialData.serasaCompanyScore >= 301) {
    eligibilityPoints +=10;
  } else {
    eligibilityPoints +=0;
  }


  // Fatura anual
  if (client.financialData.annualRevenue >= 12000000) {
    eligibilityPoints += 25;
  } else if (client.financialData.annualRevenue >= 4800000) {
    eligibilityPoints += 20;
  } else if (client.financialData.annualRevenue >= 301000) {
    eligibilityPoints += 10;
  }

  // Modelo criminal e Historico de Inadimplencia
  if (client.financialData.criminalModel === false) {
    eligibilityPoints += 0;
  } else if (client.financialData.criminalModel === true) {
    eligibilityPoints = 0
  }

  if (client.financialData.debtHistory === false) {
    eligibilityPoints += 0;
  } else if (client.financialData.debtHistory === true) {
    eligibilityPoints = 0
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

  // Salvar dados do usuário em um arquivo JSON
  writeJSONFile('user-data.json', client);

  // Salvar relatório em um arquivoJSON
  writeJSONFile('report.json', report);

  console.log('Dados do usuário foram salvos em user-data.json');
  console.log('Relatório foi salvo em report.json');
} catch (error) {
  console.error('Ocorreu um erro:', error);
}
}

main();