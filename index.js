const express = require('express');
const puerto = 8000;
const app = express();
const parserDeCookies = require('cookie-parser');

app.listen();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(parserDeCookies());

const rutas = {
    '/': { visitas: 0, rutasVisitadas: [] },
    '/consulta': { visitas: 0, rutasVisitadas: [] },
    '/inicio': { visitas: 0, rutasVisitadas: [] },
    '/videojuegos': { visitas: 0, rutasVisitadas: [] },
    '/deportes': { visitas: 0, rutasVisitadas: [] },
    '/cosmeticos': { visitas: 0, rutasVisitadas: [] },
    '/comida': { visitas: 0, rutasVisitadas: [] },
};

const contadorDeVisitas = (req, res, siguiente) => {
    const ruta = rutas[req.url];
    if (ruta) {
        ruta.visitas++;
        console.log(`Visita número ${ruta.visitas} en ${req.url}`);
        ruta.rutasVisitadas.push(req.url);
    }
    siguiente();
};

app.get('/', contadorDeVisitas, (req, res) => {
    const cookie1 = req.cookies.cookie1;
    const cookie2 = req.cookies.cookie2;

    if (cookie1) {
        console.log('Cookie1:', cookie1);
    }
    if (cookie2) {
        console.log('Cookie2:', cookie2);
    }

    res.cookie("cookie1", `Título: Usuario`, { maxAge: 50000, httpOnly: false });
    res.cookie("cookie2", `Descripción: Cibernética`, { maxAge: 50000, httpOnly: false });

    res.send(`Página principal<br>Número de visitas: ${rutas['/'].visitas}`);
});

app.get('/consulta', (req, res) => {
    const consultaDelUsuario = req.query;
    if (consultaDelUsuario.dato1) {
        res.cookie("cookie1", consultaDelUsuario.dato1, { maxAge: 50000 });
    }
    if (consultaDelUsuario.dato2) {
        res.cookie("cookie2", consultaDelUsuario.dato2, { maxAge: 50000 });
    }
    if (consultaDelUsuario.dato3) {
        res.cookie("cookie3", consultaDelUsuario.dato3, { maxAge: 50000 });
    }
    res.send('consultas');
});

app.get('/inicio', (req, res) => {
    const contadorDeVisita = `visitas=${rutas['/inicio'].visitas}`;
    res.cookie("contadorDeVisita", contadorDeVisita, { maxAge: 50000 });
    res.send(`Número de visitas: ${rutas['/inicio'].visitas}<br>Rutas visitadas: ${rutas['/inicio'].rutasVisitadas.join(', ')}`);
});

app.get('/videojuegos', contadorDeVisitas, (req, res) => {
    res.send(`Página de videojuegos<br>Número de visitas: ${rutas['/videojuegos'].visitas}`);
});

app.get('/deportes', contadorDeVisitas, (req, res) => {
    res.send(`Página de deportes<br>Número de visitas: ${rutas['/deportes'].visitas}`);
});

app.get('/cosmeticos', contadorDeVisitas, (req, res) => {
    res.send(`Página de cosmeticos<br>Número de visitas: ${rutas['/cosmeticos'].visitas}`);
});

app.listen(puerto, () => {
    console.log(`Servidor escuchando en el puerto ${puerto}`);
});