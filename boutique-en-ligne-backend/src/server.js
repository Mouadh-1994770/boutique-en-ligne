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

app.put('/api/produit/ajouter', (requete, reponse) => {
    const { nom, description, categorie, prix, rabais, quantite } = requete.body;

    if (nom !== undefined && description !== undefined && categorie !== undefined && prix > 0 &&
        ((rabais >= 0) && (rabais < 100)) && quantite >= 0) {
        utiliserDB(async (db) => {
            await db.collection('pieces').insertOne({
                nom: nom,
                description: description,
                categorie: categorie,
                prix: prix,
                rabais: rabais,
                quantite: quantite
            });

            reponse.status(200).send("Produit ajouté");
        }, reponse).catch(
            () => reponse.status(500).send("Erreur : la produit n'a pas été ajouté")
        );
    }
    else {
        reponse.status(500).send(`Certains paramètres ne sont pas définis :
            - nom: ${nom}
            - description: ${description}
            - categorie: ${categorie}
            - prix: ${prix}
            - rabais: ${rabais}
            - quantite: ${quantite}`);
    }
});


app.listen(8000, () => console.log('Écoute le port 8000'));
