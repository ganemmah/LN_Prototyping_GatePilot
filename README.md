# 🛫 GatePilot – Flughafenmanagement-System

**GatePilot** ist eine moderne Webanwendung zur Verwaltung und Visualisierung von Flügen, Passagieren, Gates und Airlines. Die Anwendung wurde mit **SvelteKit (Runes Mode)** entwickelt und nutzt **MongoDB** als Datenbank.

---

## 📦 Features

- Übersicht und Detailansicht aller Flüge
- Passagiermanagement mit Check-In-Status
- Gate-Zuweisung und Statusüberwachung
- Airlines mit Logo und zugehörigen Flügen
- Live-Dashboard mit „Now Boarding“ und „Final Call“-Bereichen
- Vollautomatische Statusaktualisierung der Flüge via Cronjob
- CSV-Exportfunktion für Passagierlisten

---

## 🚀 Setup (Lokal starten)

```bash
npm install
npm run dev
```

Zum Starten des Cronjobs für automatische Statusänderung:

```bash
npm run cron
```

---

## 🗂️ Projektstruktur

- `/routes`: Seitenstruktur nach URL
- `/lib/db.js`: Alle MongoDB-Zugriffe zentral
- `/scripts/update-flight-status.js`: Cronjob zur Statusaktualisierung

---


