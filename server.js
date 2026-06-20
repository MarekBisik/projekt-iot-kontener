const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

// Tablica zawierająca dokładnie 50 propozycji obiadowych
const obiady = [
    "Kotlet schabowy z ziemniakami i mizerią", "Pierogi ruskie z okrasą", "Placki ziemniaczane ze śmietaną",
    "Gołąbki w sosie pomidorowym", "Naleśniki z twarogiem", "Zupa pomidorowa z makaronem",
    "Rosół z kurczaka i wołowiny z lubczykiem", "Żurek z jajkiem i kiełbasą", "Barszcz czerwony z uszkami",
    "Gulasz wieprzowy z kaszą gryczaną", "Kurczak pieczony z frytkami", "Spaghetti Bolognese",
    "Carbonara", "Pizza Margherita z pieca", "Lasagne wołowa",
    "Burger wołowy z frytkami belgijskimi", "Tortilla z chrupiącym kurczakiem i warzywami", "Kebab w cienkim cieście",
    "Szaszłyki z kurczaka i papryki", "Łosoś pieczony z purée i szparagami", "Dorsz smażony z frytkami i surówką z kiszonej kapusty",
    "Pstrąg z grilla z masłem czosnkowym", "Risotto z grzybami leśnymi", "Paella z owocami morza",
    "Curry z kurczakiem i mlekiem kokosowym", "Pad Thai z krewetkami", "Sajgonki z warzywami i sosem słodko-ostrym",
    "Chili con carne z ryżem", "Burrito z szarpaną wieprzowiną", "Strogonow wołowy",
    "Kopytka w sosie grzybowym", "Kluski śląskie z roladą i modrą kapustą", "Pyzy z mięsem i cebulką",
    "Gulasz z warzywami (Ratatouille)", "Kotlety mielone z buraczkami", "Zrazy wołowe z ogórkiem i boczkiem",
    "Ryż z jabłkami i cynamonem", "Zupa ogórkowa z ziemniakami", "Krem z białych warzyw z grzankami",
    "Zupa jarzynowa", "Krem z pieczonej dyni", "Krewetki w sosie maślano-winny z bagietką",
    "Stek wołowy z masłem ziołowym", "Zapiekanka ziemniaczana z boczkiem i serem", "Zapiekanka makaronowa z kurczakiem i brokułem",
    "Leniwe pierogi z masłem i bułką tartą", "Racuchy z jabłkami", "Penne arrabbiata (ostry sos pomidorowy)",
    "Sałatka Cezar z grillowanym kurczakiem", "Fasolka po bretońsku"
];

// Główna strona aplikacji
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="pl">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Co na obiad? - Losownik</title>
        <style>
            body {
                background-color: #0f172a;
                color: #f8fafc;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                margin: 0;
                padding: 0;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
            }
            .container {
                background-color: #1e293b;
                border-radius: 16px;
                padding: 40px;
                box-shadow: 0 10px 25px -5px rgb(0 0 0 / 0.3);
                border: 1px solid #334155;
                text-align: center;
                max-width: 500px;
                width: 90%;
            }
            h1 {
                color: #38bdf8;
                margin-top: 0;
                font-size: 2.2rem;
            }
            p.subtitle {
                color: #94a3b8;
                margin-bottom: 30px;
            }
            .result-box {
                background-color: #0f172a;
                border: 2px dashed #38bdf8;
                border-radius: 12px;
                padding: 25px;
                margin-bottom: 30px;
                min-height: 60px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .dinner-name {
                font-size: 1.5rem;
                font-weight: bold;
                color: #f1f5f9;
                transition: all 0.2s;
            }
            button {
                background-color: #38bdf8;
                color: #0f172a;
                border: none;
                border-radius: 8px;
                padding: 14px 28px;
                font-size: 1.1rem;
                font-weight: bold;
                cursor: pointer;
                transition: background-color 0.2s, transform 0.1s;
                box-shadow: 0 4px 14px 0 rgb(56 189 248 / 0.3);
            }
            button:hover {
                background-color: #7dd3fc;
            }
            button:active {
                transform: scale(0.98);
            }
            .footer {
                margin-top: 20px;
                color: #64748b;
                font-size: 0.85rem;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Co na obiad? 🍽️</h1>
            <p class="subtitle">Nie wiesz co ugotować? Wylosuj jedno z 50 dań!</p>
            
            <div class="result-box">
                <div id="dinner" class="dinner-name">Kliknij przycisk, aby wylosować</div>
            </div>

            <button onclick="rollDinner()">Wylosuj obiad</button>
            
            <div class="footer">
                Status wdrożenia kontenera: <span style="color: #4ade80;">Active</span>
            </div>
        </div>

        <script>
            function rollDinner() {
                const dinnerEl = document.getElementById('dinner');
                dinnerEl.style.opacity = 0.3;
                
                // Pobieramy losowe danie z backendu API
                fetch('/api/losuj')
                    .then(res => res.json())
                    .then(data => {
                        setTimeout(() => {
                            dinnerEl.innerText = data.danie;
                            dinnerEl.style.opacity = 1;
                        }, 150);
                    });
            }
        </script>
    </body>
    </html>
    `);
});

// Endpoint API zwracający losowe danie
app.get('/api/losuj', (req, res) => {
    const losowyIndeks = Math.floor(Math.random() * obiady.length);
    res.json({ danie: obiady[losowyIndeks] });
});

app.listen(PORT, () => {
    console.log(`Aplikacja obiadowa działa na porcie ${PORT}`);
});
