import express from 'express';
import { MongoClient, ObjectID } from 'mongodb';

const app = express();

app.use(express.json());

const utiliserDB = async (operations, reponse) => {
    try {
        const client = await MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true });
        const db = client.db('boutique');

        await operations(db);

        client.close();
    }
    catch (erreur) {
        reponse.status(500).send("Erreur de connexion à la bd", erreur);
    }
};

app.get('/api/produits', (requete, reponse) => {
    utiliserDB(async (db) => {
        const produit = await db.collection('produits').find().toArray();
        reponse.status(200).json(produit);
    }, reponse).catch(
        () => reponse.status(500).send("Erreur lors de la requête")
    );;
});


app.listen(8000, () => console.log('Écoute le port 8000'));
