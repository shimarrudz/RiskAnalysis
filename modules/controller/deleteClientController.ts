import { Router, Request, Response } from "express";

import db from "../../Repository/createTable";

const DeleteRoutes = Router();

DeleteRoutes.delete("/clients/email/:email", (req: Request, res: Response) => {
    const { email } = req.params;
  
    const query = "DELETE FROM clients WHERE email = ?";
    const values = [email];
  
    db.run(query, values, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro ao excluir cliente"  });
      }
  
      return res.status(200).json({ message: "Cliente excluído com sucesso" });
    });
  });
  
  DeleteRoutes.delete("/clients", (req: Request, res: Response) => {
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
  
export default DeleteRoutes;
