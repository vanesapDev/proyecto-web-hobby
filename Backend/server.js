import app from './src/app.js';

const puerto = process.env.PORT || 3000;

app.listen(puerto, () => {
  console.log(`Servidor listo en http://localhost:${puerto}`);
});