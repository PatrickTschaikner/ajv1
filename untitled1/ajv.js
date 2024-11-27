const Ajv = require("ajv");
const ajv = new Ajv(); // Optionen können hinzugefügt werden, z. B. {allErrors: true}

const schema = {
    type: "object",
    properties: {
        info: {
            type: "object",
            properties: {
                erstellt: { type: "string" },
                verein: { type: "string" },
                ipaddresse: { type: "string" }
            },
            required: ["erstellt", "verein", "ipaddresse"],
            additionalProperties: false
        },
        anmeldung: {
            type: "object",
            properties: {
                Anrede: { type: "string" },
                Familienname: { type: "string" },
                Vorname: { type: "string" },
                Strasse: { type: "string" },
                Plz: { type: "string"},
                Ort: { type: "string" },
                Land: { type: "string" },
                Telefon: { type: "string" },
                Telefax: { type: "string" },
                MailAdresse: { type: "string"}
            },
            required: ["Anrede", "Familienname", "Vorname", "Strasse", "Plz", "Ort", "Land"],
            additionalProperties: false
        },
        teilnehmer: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    Nachname: { type: "string" },
                    Vorname: { type: "string" },
                    Altersklasse: { type: "string" },
                    Klasse: { type: "string" },
                    Startzeit: { type: "string" }
                },
                required: ["Nachname", "Vorname", "Altersklasse", "Klasse", "Startzeit"],
                additionalProperties: false
            }
        }
    },
    required: ["info", "anmeldung", "teilnehmer"],
    additionalProperties: false
};

const validate = ajv.compile(schema)

const data = {
    info: {
        erstellt: "2016-11-29",
        verein: "BSC Weisnicht",
        ipaddresse: "192.128.2.1"
    },
    anmeldung: {
        Anrede: "Herr",
        Familienname: "Schwärzler",
        Vorname: "Markus",
        Strasse: "Joe-Street 5",
        Plz: "6850",
        Ort: "Dornbirn",
        Land: "Österreich",
        Telefon: "",
        Telefax: "",
        MailAdresse: "mm@gmail.com"
    },
    teilnehmer: [
        { Nachname: "Maier", Vorname: "Joe", Altersklasse: "SCH", Klasse: "LB", Startzeit: "Vormittag" },
        { Nachname: "Maier", Vorname: "Marta", Altersklasse: "DAAK", Klasse: "LB", Startzeit: "Vormittag" }
    ]
};


const valid = validate(data);
if (!valid) {
    console.log(validate.errors);
} else {
    console.log("Die Daten sind gültig.");
}
