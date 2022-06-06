const express = require('express');
const bodyParse = require('body-parser');
const productsRouter = require('./routes/productsRoutes');
const salesRouter = require('./routes/salesRouter');
const { errorMiddleware } = require('./middlewares/errorMIddleware');

const app = express();
const PORT = 3000;

app.use(bodyParse.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRouter);
app.use('/sales', salesRouter);

app.use(errorMiddleware);

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
