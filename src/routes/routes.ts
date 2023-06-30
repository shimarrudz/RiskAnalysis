import { Router, Request, Response } from 'express';
import db from '../DataBase/createTable';
import { analyzePersonalData, generateReport } from '../classes/functions';

const router = Router();

// Rota GET para recuperar todos os clientes
router.get('/clients', (req: Request, res: Response) => {
  db.all('SELECT * FROM clients', (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao recuperar clientes' });
    }

    return res.status(200).json(rows);
  });
});

// Rota GET para pegar apenas o nível de elegibilidade e os pontos
router.get('/clients/eligibility/:cpf', (req: Request, res: Response) => {
  const { cpf } = req.params;
  
  db.get('SELECT eligibilityLevel, eligibilityPoints FROM clients WHERE cpf = ?', [cpf], (err: any, rows: any) => {
    if(err) {
      console.log(err);
      return res.status(500).json({error: 'Erro ao recuperar dados de elegibilidade'})
    }

    if (!rows) {
      return res.status(404).json({error: 'Cliente não enconstrado.'})
    }

    return res.status(200).json(rows)
  })
})

// Rota POST para adicionar um cliente
router.post('/clients', (req: Request, res: Response) => {
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
  } = req.body;

  // Função para analisar os dados pessoais e retornar os pontos de elegibilidade
  function analyzePersonalData(): number {
    let eligibilityPoints = 0;

    // Analisar dados pessoais
    if (serasaPFScore >= 700) {
      eligibilityPoints += 30;
    } else if (serasaPFScore >= 501) {
      eligibilityPoints += 20;
    } else if (serasaPFScore >= 301) {
      eligibilityPoints += 10;
    } else {
      eligibilityPoints += 0;
    }

    // Analisar dados da empresa
    if (foundationYears >= 10) {
      eligibilityPoints += 15;
    } else if (foundationYears >= 6) {
      eligibilityPoints += 10;
    } else if (foundationYears >= 3) {
      eligibilityPoints += 5;
    } else {
      eligibilityPoints += 0;
    }

    // Serasa empresa
    if (serasaCompanyScore >= 700) {
      eligibilityPoints += 30;
    } else if (serasaCompanyScore >= 501) {
      eligibilityPoints += 20;
    } else if (serasaCompanyScore >= 301) {
      eligibilityPoints += 10;
    } else {
      eligibilityPoints += 0;
    }

    // Fatura anual
    if (annualRevenue >= 12000000) {
      eligibilityPoints += 25;
    } else if (annualRevenue >= 4800000) {
      eligibilityPoints += 20;
    } else if (annualRevenue >= 301000) {
      eligibilityPoints += 10;
    }

    // Modelo criminal e Histórico de Inadimplência
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

  // Analisar dados e gerar relatório
  const eligibilityPoints = analyzePersonalData();

  let eligibilityLevel: string;
  
  // Lógica para determinar o nível de elegibilidade com base nos pontos
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

  // Insere os dados do cliente e o relatório na tabela
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
      eligibilityLevel,
      eligibilityPoints
    ],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro ao adicionar cliente' });
      }

      return res.status(200).json({ message: 'Cliente adicionado com sucesso' });
    }
  );
});

export default router;
