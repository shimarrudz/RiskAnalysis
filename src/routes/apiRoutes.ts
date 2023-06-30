import { Router, Request, Response } from "express";
import db from "../DataBase/createTable";
import { analyzePersonalData } from "../utils/functions";
import { CreateClientDTO } from "../interfaces/interfaces";
const router = Router();


// Rota GET para recuperar todos os clientes
router.get("/clients", (req: Request, res: Response) => {
  db.all("SELECT * FROM clients", (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao recuperar clientes" });
    }

    return res.status(200).json(rows);
  });
});

// Rota GET para pegar apenas o nível de elegibilidade e os pontos
router.get("/clients/eligibility/:cpf", (req: Request, res: Response) => {
  const { cpf } = req.params;

  db.get(
    "SELECT eligibilityLevel, eligibilityPoints FROM clients WHERE cpf = ?",
    [cpf],
    (err: any, rows: any) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ error: "Erro ao recuperar dados de elegibilidade" });
      }

      if (!rows) {
        return res.status(404).json({ error: "Cliente não encontrado." });
      }

      return res.status(200).json(rows);
    }
  );
});

// Rota POST para adicionar um cliente
router.post("/clients", (req: Request, res: Response) => {
  const data: CreateClientDTO = req.body;

  const eligibilityPoints: number = analyzePersonalData(
    data.serasaPFScore,
    data.foundationYears,
    data.serasaCompanyScore,
    data.annualRevenue,
    data.criminalModel,
    data.debtHistory
  );

  let eligibilityLevel: string;
  if (eligibilityPoints <= 20) {
    eligibilityLevel = "Bronze - Inapto para operar";
  } else if (eligibilityPoints <= 40) {
    eligibilityLevel = "Prata - Baixo";
  } else if (eligibilityPoints <= 60) {
    eligibilityLevel = "Ouro - Médio";
  } else if (eligibilityPoints <= 80) {
    eligibilityLevel = "Platina - Alto";
  } else {
    eligibilityLevel = "Azul - Totalmente Apto";
  }

  const query = `
    INSERT INTO clients (
      name, email, age, cpf, phone, serasaPFScore, companyName,
      businessArea, cnpj, foundationYears, socialCapital, serasaCompanyScore,
      annualRevenue, criminalModel, debtHistory, eligibilityLevel, eligibilityPoints
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    data.name,
    data.email,
    data.age,
    data.cpf,
    data.phone,
    data.serasaPFScore,
    data.companyName,
    data.businessArea,
    data.cnpj,
    data.foundationYears,
    data.socialCapital,
    data.serasaCompanyScore,
    data.annualRevenue,
    data.criminalModel,
    data.debtHistory,
    eligibilityLevel,
    eligibilityPoints,
  ];

  db.run(query, values, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao adicionar cliente" });
    }

    return res
      .status(200)
      .json({ message: "Cliente adicionado com sucesso" });
  });
});

// Rota PUT para mudar os dados de um cliente
router.put("/clients/changeuser/:cpf", (req: Request, res: Response) => {
  const { cpf } = req.params;
  const data: CreateClientDTO = req.body;

  const {
    name,
    email,
    age,
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
  } = data;

  const query = `
    UPDATE clients SET
      name = ?,
      email = ?,
      age = ?,
      phone = ?,
      serasaPFScore = ?,
      companyName = ?,
      businessArea = ?,
      cnpj = ?,
      foundationYears = ?,
      socialCapital = ?,
      serasaCompanyScore = ?,
      annualRevenue = ?,
      criminalModel = ?,
      debtHistory = ?
    WHERE cpf = ?
  `;

  const values = [
    name,
    email,
    age,
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
    cpf,
  ];

  db.run(query, values, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao atualizar cliente" });
    }

    return res
      .status(200)
      .json({ message: "Cliente atualizado com sucesso" });
  });
});

// ROTA PATCH para mudar apenas o CNPJ do cliente
router.patch("/clients/change/:cpf", (req: Request, res: Response) => {
  const { cpf } = req.params;
  const { cnpj } = req.body;

  const query = "UPDATE clients SET cnpj = ? WHERE cpf = ?";
  const values = [cnpj, cpf];

  db.run(query, values, (err) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "Erro ao atualizar o CNPJ do cliente" });
    }

    return res
      .status(200)
      .json({ message: "CNPJ do cliente atualizado com sucesso" });
  });
});

// Rota DELETE para excluir um cliente pelo email
router.delete("/clients/email/:email", (req: Request, res: Response) => {
  const { email } = req.params;

  const query = "DELETE FROM clients WHERE email = ?";
  const values = [email];

  db.run(query, values, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao excluir cliente" });
    }

    return res.status(200).json({ message: "Cliente excluído com sucesso" });
  });
});

// Rota DELETE para excluir todos os clientes
router.delete("/clients", (req: Request, res: Response) => {
  const query = "DELETE FROM clients";

  db.run(query, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao excluir os clientes" });
    }

    return res
      .status(200)
      .json({ message: "Todos os clientes foram excluídos com sucesso" });
  });
});

export default router;
