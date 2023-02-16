const express = require('express');
const app = express();
const envelopes = require('../data');

const apiRouter = express.Router();

module.exports = apiRouter;

apiRouter.param('envelopeId', (req, res, next) => {
    const envelope = envelopes[req.params.envelopeId - 1];
    if (envelope) {
        req.envelope = envelope;
        next();
    }
})

apiRouter.get('/', (req, res) => {
    if (envelopes) {
        res.send(envelopes);
    }
    else {
        res.status(404).send();
    }
})

apiRouter.get('/:envelopeId', (req, res) => {
    if (req.envelope) {
        res.send(req.envelope);
    }
    else {
        res.status(404).send();
    }
})

apiRouter.put('/:envelopeId', (req, res) => {
    if (req.query.cost && req.query.cost < req.envelope.budget) {
        const updatedBudget = req.envelope.budget - req.query.cost;
        req.envelope.budget = updatedBudget;
    }
    else {
        res.status(402).send();
    }
})

apiRouter.post('/', (req, res) => {
    const newTitle = req.query.title;
    if (newTitle) {
        const newId = envelopes[envelopes.length - 1].id + 1
        const newEnvelope = { id: newId, title: newTitle };
        envelopes.push(newEnvelope);
    }
    else {
        res.status(404).send();
    }
})

apiRouter.delete('/:envelopeId', (req, res) => {
    if (req.envelope) {
        envelopes.splice(req.envelope.id - 1, 1);
        for (const [i, el] of envelopes.entries()) {
            el.id = i + 1;
        }
    }
    else {
        res.status(401).send();
    }
})

apiRouter.post('/transfer/:fromId/:toId', (req, res) => {
    let fromEnvelope = envelopes[req.params.fromId - 1];
    let toEnvelope = envelopes[req.params.toId - 1];
    const money = parseInt(req.query.money);
    if (money) {
        fromEnvelope.budget -= money;
        toEnvelope.budget += money;
    }
    else {
        res.status(404).send();
    }
})
