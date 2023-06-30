import { Router, Request, Response } from "express";
import db from "../DataBase/createTable";
import { analyzePersonalData } from "../utils/functions";
import { CreateClientDTO } from "../interfaces/interfaces";
import {
  validateName,
  validateEmail,
  validateAge,
  validateCPF,
  validatePhone,
  validateSerasaPFScore,
  validateCompanyName,
  validateBusinessArea,
  validateCNPJ,
  validateFoundationYears,
  validateSocialCapital,
  validateSerasaCompanyScore,
  validateAnnualRevenue,
} from "../utils/validations";
import { ERROR_MESSAGES } from '../utils/constants'

const PostRoutes = Router();

PostRoutes.post("/clients", (req: Request, res: Response) => {
    const data: CreateClientDTO = req.body;
  
    if (!validateName(data.name)) {
      return res.status(400).json({ error: ERROR_MESSAGES.INVALID_NAME });
    }
  
    if (!validateEmail(data.email)) {
      return res.status(400).json({ error: ERROR_MESSAGES.INVALID_EMAIL });
    }
  
    if (!validateAge(data.age)) {
      return res.status(400).json({ error: ERROR_MESSAGES.INVALID_AGE });
    }
  
    if (!validateCPF(data.cpf)) {
      return res.status(400).json({ error: ERROR_MESSAGES.INVALID_CPF });
    }
  
    if (!validatePhone(data.phone)) {
      return res.status(400).json({ error: ERROR_MESSAGES.INVALID_PHONE });
    }
  
    if (!validateSerasaPFScore(data.serasaPFScore)) {
      return res.status(400).json({ error: ERROR_MESSAGES.INVALID_SERASA_PF_SCORE });
    }
  
    if (!validateCompanyName(data.companyName)) {
      return res.status(400).json({ error: ERROR_MESSAGES.INVALID_COMPANY_NAME });
    }
  
    if (!validateBusinessArea(data.businessArea)) {
      return res.status(400).json({ error: ERROR_MESSAGES.INVALID_BUSINESS_AREA });
    }
  
    if (!validateCNPJ(data.cnpj)) {
      return res.status(400).json({ error: ERROR_MESSAGES.INVALID_CNPJ });
    }
  
    if (!validateFoundationYears(data.foundationYears)) {
      return res.status(400).json({ error: ERROR_MESSAGES.INVALID_FOUNDATION_YEARS });
    }
  
    if (!validateSocialCapital(data.socialCapital.toString())) {
      return res.status(400).json({ error: ERROR_MESSAGES.INVALID_SOCIAL_CAPITAL });
    }
  
    if (!validateSerasaCompanyScore(data.serasaCompanyScore)) {
      return res.status(400).json({ error: ERROR_MESSAGES.INVALID_SERASA_COMPANY_SCORE });
    }
  
    if (!validateAnnualRevenue(data.annualRevenue.toString())) {
      return res.status(400).json({ error: ERROR_MESSAGES.INVALID_ANNUAL_REVENUE });
    }
  
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
  
      return res.status(200).json({ message: "Cliente adicionado com sucesso" });
    });
  });
  
export default PostRoutes;
