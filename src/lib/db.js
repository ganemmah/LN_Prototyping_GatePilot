// src/lib/db.js
import { MongoClient, ObjectId } from "mongodb";
import { DB_URI } from "$env/static/private";

// MongoDB-Client initialisieren und verbinden
const client = new MongoClient(DB_URI);
await client.connect();

// Auswahl der Datenbank
const db = client.db("airportDB");

//////////////////////////////////////////
// Flights
//////////////////////////////////////////

/**
 * Liest alle Flüge aus der Collection aus.
 * @returns {Promise<Array>}
 */
export async function getFlights() {
  const collection = db.collection("flights");
  const flights = await collection.find({}).toArray();
  // Optional: ObjectId in String umwandeln, wenn gewünscht
  return flights.map(f => ({ ...f, _id: f._id.toString() }));
}

/**
 * Liest einen einzelnen Flug per ID.
 * @param {string} id 
 * @returns {Promise<Object|null>}
 */
export async function getFlight(id) {
  const collection = db.collection("flights");
  const flight = await collection.findOne({ _id: new ObjectId(id) });
  return flight && { ...flight, _id: flight._id.toString() };
}

/**
 * Legt einen neuen Flug an.
 * @param {Object} flightData 
 * @returns {Promise<string>} Die neue ID als String
 */
export async function insertFlight(flightData) {
  const collection = db.collection("flights");
  const result = await collection.insertOne(flightData);
  return result.insertedId.toString();
}

/**
 * Aktualisiert einen bestehenden Flug.
 * @param {string} id 
 * @param {Object} updates 
 * @returns {Promise<boolean>} true, wenn geupdated
 */
export async function updateFlight(id, updates) {
  const collection = db.collection("flights");
  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: updates }
  );
  return result.matchedCount > 0;
}

/**
 * Löscht einen Flug.
 * @param {string} id 
 * @returns {Promise<boolean>} true, wenn gelöscht
 */
export async function deleteFlight(id) {
  const collection = db.collection("flights");
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
}

//////////////////////////////////////////
// Gates
//////////////////////////////////////////

/**
 * Liest alle Gates aus der Collection aus.
 * @returns {Promise<Array>}
 */
export async function getGates() {
  const collection = db.collection("gates");
  const gates = await collection.find({}).toArray();
  return gates.map(g => ({ ...g, _id: g._id.toString() }));
}

/**
 * Liest ein Gate per ID.
 * @param {string} id 
 * @returns {Promise<Object|null>}
 */
export async function getGate(id) {
  const collection = db.collection("gates");
  const gate = await collection.findOne({ _id: new ObjectId(id) });
  return gate && { ...gate, _id: gate._id.toString() };
}

/**
 * Legt ein neues Gate an.
 * @param {Object} gateData 
 * @returns {Promise<string>}
 */
export async function insertGate(gateData) {
  const collection = db.collection("gates");
  const result = await collection.insertOne(gateData);
  return result.insertedId.toString();
}

/**
 * Aktualisiert ein Gate.
 * @param {string} id 
 * @param {Object} updates 
 * @returns {Promise<boolean>}
 */
export async function updateGate(id, updates) {
  const collection = db.collection("gates");
  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: updates }
  );
  return result.matchedCount > 0;
}

/**
 * Löscht ein Gate.
 * @param {string} id 
 * @returns {Promise<boolean>}
 */
export async function deleteGate(id) {
  const collection = db.collection("gates");
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
}

//////////////////////////////////////////
// Airlines
//////////////////////////////////////////

/**
 * Liest alle Airlines aus.
 */
export async function getAirlines() {
  const collection = db.collection("airlines");
  const airlines = await collection.find({}).toArray();
  return airlines.map(a => ({ ...a, _id: a._id.toString() }));
}

/**
 * Liest eine einzelne Airline per Code (Params.id).
 * @param {string} code – z. B. "EK"
 */
export async function getAirline(code) {
  const collection = db.collection("airlines");
  // wir speichern airline_code eindeutig, darum nach diesem filtern
  const airline = await collection.findOne({ airline_code: code });
  return airline && { ...airline, _id: airline._id.toString() };
}


//////////////////////////////////////////
// Passengers
//////////////////////////////////////////

/**
 * Gibt alle Passagiere zurück, die einem bestimmten Flug zugeordnet sind (M:N).
 * @param {number} flightNumber
 */
export async function getPassengersByFlightNumber(flightNumber) {
  const collection = db.collection("passengers");
  const passengers = await collection.find({ flight_numbers: flightNumber }).toArray();
  return passengers.map(p => ({ ...p, _id: p._id.toString() }));
}

/**
 * Gibt alle Passagiere zurück (z.B. für globale /passengers-Seite).
 */
export async function getAllPassengers() {
  const collection = db.collection("passengers");
  const passengers = await collection.find({}).toArray();
  return passengers.map(p => ({ ...p, _id: p._id.toString() }));
}

/**
 * Gibt einen Passagier anhand seiner ID zurück.
 * @param {string} id
 */
export async function getPassenger(id) {
  const collection = db.collection("passengers");
  const passenger = await collection.findOne({ _id: new ObjectId(id) });
  return passenger && { ...passenger, _id: passenger._id.toString() };
}

/**
 * Fügt einen neuen Passagier ein.
 */
export async function insertPassenger(data) {
  const collection = db.collection("passengers");
  const result = await collection.insertOne(data);
  return result.insertedId.toString();
}

/**
 * Löscht einen Passagier.
 */
export async function deletePassenger(id) {
  const collection = db.collection("passengers");
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
}


