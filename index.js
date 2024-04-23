const axios = require('axios');
const runExcelRanking = require('./runExcel');
const test = require('./test.json')

const headers = {
    'x-rapidapi-key': process.env.APIKEY_API_FOOTBALL,
    'x-rapidapi-host': 'v3.football.api-sports.io'
};

require('dotenv').config()

let values = []; 

async function fetchData(page) {
    try {
        const response = await axios.get(`https://v3.football.api-sports.io/players?season=2023&league=475&page=${page}`, { headers });
        const data = response.data;
        const players = data.response;
        // const players = test.response;

        // Mapeia os valores para um novo array
        const newValues = players.map((item, index) => {
            let statistics = item.statistics[0];
            let games = statistics.games;
            let team = statistics.team;
            let points = statistics.goals.total;
            let assists = statistics.goals.assists;
            let appearences = 0
            let level = '';
            let tier_idades = '';
            let tier_idades_index = 0;
            let playerItem = item.player;

            points += assists;
            // points += appearences * 5;

            if (points < 15) {
                level = 'Bronze';
            } else if (points >= 15 && points <= 29) {
                level = 'Silver';
            } else {
                level = 'Gold';
            }

            if (playerItem.age >= 18 && playerItem.age <= 25){
                tier_idades = "18-24 anos"
                tier_idades_index = 0
            } else if (playerItem.age >= 25 && playerItem.age <= 29 ) {
                tier_idades = "25-29 anos"
                tier_idades_index = 1
            } else {
                tier_idades = "30 anos ou mais"
                tier_idades_index = 2
            }

            return [
                item.player.name,
                points,
                level,
                index,
                index,
                playerItem.photo,
                playerItem.age,
                playerItem.birth.date,
                playerItem.birth.place,
                playerItem.nationality,
                playerItem.height,
                playerItem.weight,
                team.name,
                team.logo,
                playerItem.firstname,
                playerItem.lastname,
                tier_idades,
                tier_idades_index,
                statistics.goals.total,
                assists,
                appearences
            ];
        });
        values = values.concat(newValues);
        values.sort((a, b) => b[1] - a[1]);
    } catch (error) {
        console.error('Erro ao obter dados da API:', error);
    }
}

async function runScript() {
    for (let page = 1; page <= 10; page++) {
        await fetchData(page)
    }
    runExcelRanking(values);
}

runScript();
