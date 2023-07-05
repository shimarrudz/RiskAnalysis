import express from 'express';

import GetRoutes from '../controller/getClientsController';
import PostRoutes from '../controller/createClientController';
import UpdateRoutes from '../controller/updateClientController';
import DeleteRoutes from '../controller/deleteClientController';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(GetRoutes);
app.use(PostRoutes);
app.use(UpdateRoutes);
app.use(DeleteRoutes);

app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});