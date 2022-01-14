const functions = require("firebase-functions");
const express =require('express')
const cors = require('cors')

const stripe = require('stripe')(
    'sk_test_51KHhuXC5ef00LzuAku9npUS9LpgppF2C0SgEW2Po7HhDX4jRtbjCnz7XbPRqEgH6OXQuC04dLq4apt8qbeHiJ0bh00l0pSHe7s'
)

const app =express();
app.use(cors({origin:true}));
app.use(express.json());

app.get('/', (request, response)=>response.status(200).send('hello from cloud'))

app.post('/payments/create', async (request, response)=>{
    const total =request.query.total;
    const paymentIntent = await stripe.paymentIntents.create({
        amount:total,
        currency: 'Ghs'

    });
    response.status(201).send(
        {
            clientSecret: paymentIntent.client_secret,
        }
    )
})
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });



exports.api=functions.https.onRequest(app);