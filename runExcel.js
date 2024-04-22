const client = require('./auth');
const { google } = require('googleapis');

function runExcelRanking(values) {
    console.log(values.length)
    client.authorize((err, tokens) => {
        if (err) {
            console.error('Erro de autenticação:', err);
            return;
        }
        const sheets = google.sheets({ version: 'v4', auth: client });
        sheets.spreadsheets.values.update({
            spreadsheetId: process.env.SPREADSHEETID,
            range: `Ranking!A2:${values.length + 1}`,
            valueInputOption: 'RAW',
            resource: {
                values: values
            }
        }, (err, result) => {
            if (err) {
            console.error('Erro ao enviar dados para o Google Sheets:', err);
            return;
            }
            console.log('Dados enviados com sucesso para o Google Sheets');
        });
    });
}

module.exports = runExcelRanking