import express from 'express';
import router from '../routes/routes'

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});