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

app.get('/api/produits/:id', (requete, reponse) => {
    const id = requete.params.id;

    utiliserDB(async (db) => {
        var objectId = ObjectID.createFromHexString(id);
        const infoProduit = await db.collection('produits').findOne({ _id: objectId });
        reponse.status(200).json(infoProduit);
    }, reponse).catch(
        () => reponse.status(500).send("Produit non trouvé")
    );
});

app.put('/api/produits/ajouter', (requete, reponse) => {
    const { nom, description, categorie, prix, rabais, quantite } = requete.body;

    if (nom !== undefined && description !== undefined && categorie !== undefined && prix > 0 &&
        ((rabais >= 0) && (rabais < 100)) && quantite >= 0) {
            utiliserDB(async (db) => {
            await db.collection('produits').insertOne({
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

app.post('/api/produits/modifier/:id', (requete, reponse) => {
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

app.delete('/api/produits/supprimer/:id', (requete, reponse) => {
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
    utiliserDB(async (db) => {
        const produits = await db.collection('produits').find().toArray();
        produits.map(produit => {
            if (produit.rabais == 0) {
                produit.rabais = "";
            }
            tableProduit.push(produit);
        })
        console.log(tableProduit)
        reponse.status(200).json(tableProduit);
    }, reponse)
});

app.get('/api/produitsClient/:categorie', async (requete, reponse) => {
    const categorie = requete.params.categorie
    utiliserDB(async (db) => {
        const produits = await db.collection('produits').find({ categorie: categorie }).toArray();
        reponse.status(200).json(produits);
    }, reponse)
});

app.post('/api/panier/ajouter/:nomClient', (requete, reponse) => {
    const nomClient = requete.params.nomClient
    const produit = requete.body;
    if (nomClient !== undefined) {
        utiliserDB(async (db) => {
            await db.collection('panier').updateOne({ "nomClient": nomClient }, { $push: { "produits": produit } });
            reponse.status(200).send('produit a ajouté');
        }, reponse).catch(
            () => reponse.status(500).send("Erreur : le produit  n'a pas été ajouté")
        );
    }
    else {
        reponse.status(500).send(`nom du client n'est pas définis :
          - nomClient: ${nomClient}`)
    }
});

app.post('/api/utilisateur/ajouter', async (requete, reponse) => {

    const { nom, password, confirmPassword} = requete.body;

    if(nom !== undefined && password !== undefined && confirmPassword !== undefined ){
       let user ={
        nom: nom,
        password: password,
        confirmPassword: confirmPassword, 
    }
        utiliserDB(async (db) => {

            let utilisateurExist = await utilisateurExiste(db, user);
            if(!utilisateurExist){
                await db.collection('utilisateur').insertOne(user);
                reponse.status(200).send("Utilisateur Ajouté");
            }else{
                reponse.status(406).send("Utilisateur existe déjà");
            }        
        }, reponse).catch(
            () => reponse.status(500).send("Erreur : l'utilisateur n'est pas ajouté ")
        );  
    }
    else{
        reponse.status(500).send(`Certains paramètres ne sont pas définis :
            - nom: ${nom}
            - password: ${password}
            - confirmPassword: ${confirmPassword}`);
    }          
});

async function utilisateurExiste(db, utilisateur ={nom: nom,password: password}){
    const verificationUtilisateur = await db.collection('utilisateur').findOne(utilisateur);
    return verificationUtilisateur !== null;
}

app.post('/api/utilisateur/existe/', async (requete, reponse) => {
    const {nom, password } = requete.body;

    if(nom !== undefined && password !== undefined){
        utiliserDB(async (db) => {
        const verificationUtilisateur = await db.collection('utilisateur').findOne({nom : nom, password:password});
        if(!verificationUtilisateur){
            reponse.status(404).json(verificationUtilisateur);
        }
        reponse.status(200).json(verificationUtilisateur);
        }, reponse)
    }
});


app.listen(8000, () => console.log('Écoute le port 8000'));
