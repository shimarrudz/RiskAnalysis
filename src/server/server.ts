import express from 'express';
//import router from '../routes/apiRoutes'
import GetRoutes from '../routes/getClients';
import PostRoutes from '../routes/postClient';
import UpdateRoutes from '../routes/updateClient';
import DeleteRoutes from '../routes/deleteClient';

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