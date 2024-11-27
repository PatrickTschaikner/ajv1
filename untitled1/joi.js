const Joi = require('joi');

const schema = Joi.object({
    info: Joi.object({
        erstellt: Joi.string().isoDate().required(),
        verein: Joi.string().required(),
        ipaddresse: Joi.string().ip({ version: ['ipv4'] }).required()
    }).required(),

    anmeldung: Joi.object({
        Anrede: Joi.string().valid('Herr', 'Frau', 'Divers').required(),
        Familienname: Joi.string().required(),
        Vorname: Joi.string().required(),
        Strasse: Joi.string().required(),
        Plz: Joi.string().pattern(/^\d{4,5}$/).required(),
        Ort: Joi.string().required(),
        Land: Joi.string().required(),
        Telefon: Joi.string().allow(''),
        Telefax: Joi.string().allow(''),
        "Mail-Adresse": Joi.string().email().allow('')
    }).required(),

    teilnehmer: Joi.array().items(
        Joi.object({
            Nachname: Joi.string().required(),
            Vorname: Joi.string().required(),
            Altersklasse: Joi.string().required(),
            Klasse: Joi.string().required(),
            Startzeit: Joi.string().valid('Vormittag', 'Nachmittag').required()
        })
    ).required()
});

// Beispiel für die Validierung
async function validateData() {
    try {
        const value = await schema.validateAsync({
            info: {
                erstellt: '2024-11-27T10:00:00Z',
                verein: 'FC Beispiel',
                ipaddresse: '192.168.1.1'
            },
            anmeldung: {
                Anrede: 'Herr',
                Familienname: 'Mustermann',
                Vorname: 'Max',
                Strasse: 'Musterstraße 1',
                Plz: '12345',
                Ort: 'Musterstadt',
                Land: 'Deutschland',
                Telefon: '',
                Telefax: '',
                "Mail-Adresse": 'max.mustermann@example.com'
            },
            teilnehmer: [
                {
                    Nachname: 'Schmidt',
                    Vorname: 'Erika',
                    Altersklasse: 'U18',
                    Klasse: 'A',
                    Startzeit: 'Vormittag'
                }
            ]
        });

        console.log('Validierung erfolgreich:', value);
    } catch (error) {
        console.error('Validierung fehlgeschlagen:', error.details);
    }
}

// Beispielaufruf der Funktion
validateData();