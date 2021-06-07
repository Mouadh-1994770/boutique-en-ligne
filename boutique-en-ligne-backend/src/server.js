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

app.post('/api/produit/modifier/:id', (requete, reponse) => {
    const { nom, description, categorie, prix, rabais, quantite } = requete.body;
    const id = requete.params.id;
    if (nom !== undefined && description !== undefined && categorie !== undefined && prix > 0 &&
        ((rabais >= 0) && (rabais < 100)) && quantite >= 0) {
        utiliserDB(async (db) => {
            var objectId = ObjectID.createFromHexString(id);
            await db.collection('produits').updateOne({ _id: objectId }, {
                '$set': {
                    nom: nom,
                    description: description,
                    categorie: categorie,
                    prix: prix,
                    rabais: rabais,
                    quantite: quantite
                }
            });

            reponse.status(200).send("Produit modifié");
        }, reponse).catch(
            () => reponse.status(500).send("Erreur : la produit n'a pas été modifié")
        );
    }
    else {
        reponse.status(500).send(`Certains paramètres ne sont pas correctement définis :
            - nom: ${nom}
            - description: ${description}
            - categorie: ${categorie}
            - prix: ${prix}
            - rabais: ${rabais}
            - quantite: ${quantite}`);
    }
});

app.delete('/api/produit/supprimer/:id', (requete, reponse) => {
    const id = requete.params.id;

    utiliserDB(async (db) => {
        var objectId = ObjectID.createFromHexString(id);
        const resultat = await db.collection('produits').deleteOne({ _id: objectId });

        reponse.status(200).send(`${resultat.deletedCount} produit supprimée`);
    }, reponse).catch(
        () => reponse.status(500).send("Erreur : le produit n'a pas été supprimée")
    );
});

app.get('/api/produitsClient', async (requete, reponse) => {
    var tableProduit = [];
    utiliserBD(async (db) => {
        const produits = await db.collection('produits').find().toArray();
        produits.map(produit => {
            if (produit.rabais == 0) {
                produit.rabais = "";
            }
            tableProduit.push(produit);
        })
        reponse.status(200).json(tableProduit);
    }, reponse)
});

app.get('/api/produits/:categorie', async (requete, reponse) => {
    const categorie=requete.params.categorie
    utiliserBD(async (db) => {
    const produits = await db.collection('produits').find({categorie:categorie}).toArray();
    reponse.status(200).json(produits);
    }, reponse)
  });
  
app.listen(8000, () => console.log('Écoute le port 8000'));
