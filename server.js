const app = require('./src/app');

const PORT = process.env.PORT || 3056

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})

process.on('SIGINT',() => {
    server.close(() => console.log(`Exits Server Express`));
})