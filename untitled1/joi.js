const Joi = require('joi');

const schema = Joi.object({
    info: Joi.object({
        erstellt: Joi.string().isoDate().required(), // Datumsformat
        verein: Joi.string().required(),            // Name des Vereins
        ipaddresse: Joi.string().ip({ version: ['ipv4'] }).required() // IPv4-Adresse
    }).required(),

    anmeldung: Joi.object({
        Anrede: Joi.string().valid('Herr', 'Frau', 'Divers').required(), // Nur gültige Anreden
        Familienname: Joi.string().required(),       // Familienname ist erforderlich
        Vorname: Joi.string().required(),            // Vorname ist erforderlich
        Strasse: Joi.string().required(),            // Straße ist erforderlich
        Plz: Joi.string().pattern(/^\d{4,5}$/).required(), // PLZ, 4 oder 5 Ziffern
        Ort: Joi.string().required(),                // Ort ist erforderlich
        Land: Joi.string().required(),               // Land ist erforderlich
        Telefon: Joi.string().allow(''),             // Telefon kann leer sein
        Telefax: Joi.string().allow(''),             // Telefax kann leer sein
        "Mail-Adresse": Joi.string().email().allow('') // E-Mail-Adresse kann leer sein
    }).required(),

    teilnehmer: Joi.array().items(
        Joi.object({
            Nachname: Joi.string().required(),          // Nachname des Teilnehmers
            Vorname: Joi.string().required(),           // Vorname des Teilnehmers
            Altersklasse: Joi.string().required(),      // Altersklasse ist erforderlich
            Klasse: Joi.string().required(),            // Klasse ist erforderlich
            Startzeit: Joi.string().valid('Vormittag', 'Nachmittag').required() // Gültige Startzeiten
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