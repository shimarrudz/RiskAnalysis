import { Router, Request, Response } from "express";

import db from "../Repository/createTable";
import { ERROR_MESSAGES } from '../utils/constants';

const GetRoutes = Router();

GetRoutes.get("/clients", (req: Request, res: Response) => {
    db.all("SELECT * FROM clients", (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: ERROR_MESSAGES.ERROR_RETRIEVING_ELIGIBILITY_DATA });
      }
  
      return res.status(200).json(rows);
    });
  });
  
  GetRoutes.get("/clients/eligibility/:cpf", (req: Request, res: Response) => {
    const { cpf } = req.params;
  
    db.get(
      "SELECT eligibilityLevel, eligibilityPoints FROM clients WHERE cpf = ?",
      [cpf],
      (err: any, rows: any) => {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .json({ error: ERROR_MESSAGES.ERROR_RETRIEVING_ELIGIBILITY_DATA });
        }
  
        if (!rows) {
          return res.status(404).json({ error: ERROR_MESSAGES.ERROR_RETRIEVING_ELIGIBILITY_DATA });
        }
  
        return res.status(200).json(rows);
      }
    );
  });

export default GetRoutes;