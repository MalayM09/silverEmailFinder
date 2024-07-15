const express = require('express');
const scraper = require('./scraper');
const fs = require('fs');
const csvParse = require('csv-parse/lib/sync');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to receive URL and initiate scraping
app.post('/scrape', async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'URL parameter missing.' });
    }

    try {
        await scraper(url); // Initiate scraping process
        const emails = readEmailsFromCSV(); // Read emails from CSV after scraping
        res.json({ success: true, message: 'Emails extracted successfully.', emails });
    } catch (error) {
        console.error('Error scraping:', error);
        res.status(500).json({ error: 'Failed to scrape emails.' });
    }
});

// Function to read emails from CSV
function readEmailsFromCSV() {
    const csvFilePath = path.join(__dirname, 'emails.csv');
    const csvData = fs.readFileSync(csvFilePath, 'utf8');
    const records = csvParse(csvData, { columns: true });
    return records.map(record => record.Email);
}

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
