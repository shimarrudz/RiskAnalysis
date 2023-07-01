import express from 'express';
import GetRoutes from '../Controller/getClientsController';
import PostRoutes from '../Controller/createClientController';
import UpdateRoutes from '../Controller/updateClientController';
import DeleteRoutes from '../Controller/deleteClientController';

const app = express();
const PORT = 3000;

app.use(express.json());
//app.use(router);
app.use(GetRoutes);
app.use(PostRoutes);
app.use(UpdateRoutes);
app.use(DeleteRoutes);

app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});