const express = require('express');
const bodyParser = require('body-parser');

const eventsRoutes = require('./routes/eventsRoutes');
const order_itemsRoutes = require('./routes/order_itemsRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routing
app.use(eventsRoutes);
app.use(order_itemsRoutes);

// Menjalankan server
app.listen(port, () => {
    console.log(`Server berjalan pada port ${port}`);
});