import { Router, Request, Response } from "express";

import db from "../Repository/createTable";
import { CreateClientDTO } from "../interfaces/client";
import {
  validateName,
  validateEmail,
  validateAge,
  validatePhone,
  validateSerasaPFScore,
  validateCompanyName,
  validateBusinessArea,
  validateCNPJ,
  validateFoundationYears,
  validateSocialCapital,
  validateSerasaCompanyScore,
  validateAnnualRevenue,
} from "../services/validations";
import { ERROR_MESSAGES } from '../utils/constants'

const UpdateRoutes = Router();

UpdateRoutes.put("/clients/changeuser/:cpf", (req: Request, res: Response) => {
    const { cpf } = req.params;
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
        return res.status(500).json({ error: "Erro ao adicionar cliente"  });
      }
  
      return res.status(200).json({ message: "Cliente atualizado com sucesso" });
    });
  });
  
  
  UpdateRoutes.patch("/clients/change/:cpf", (req: Request, res: Response) => {
    const { cpf } = req.params;
    const { cnpj } = req.body;
  
    if (!validateCNPJ(cnpj)) {
      return res.status(400).json({ error: "CNPJ inválido" });
    }
  
    const query = "UPDATE clients SET cnpj = ? WHERE cpf = ?";
    const values = [cnpj, cpf];
  
    db.run(query, values, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro ao atualizar o CNPJ do cliente"  });
      }
  
      return res.status(200).json({ message: "CNPJ do cliente atualizado com sucesso" });
    });
  });
  
export default UpdateRoutes;
