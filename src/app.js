import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const users = [];
const tweets = [];

app.post("/sign-up", (req, res) => {

    const { username, avatar } = req.body;

    if (typeof username != "string" || typeof avatar != "string" || !username || !avatar) {
        return res.status(400).send("Todos os campos são obrigatórios!");
    }

    const newUser = { username, avatar };
    users.push(newUser);

    res.status(201).send("OK");

})

app.post("/tweets", (req, res) => {

    const { username, tweet } = req.body;

    if (typeof username != "string" || typeof tweet != "string" || !username || !tweet) {
        return res.status(400).send("Todos os campos são obrigatórios!");
    }

    const userAuthorized = users.find(user => user.username === username);

    if (!userAuthorized) {
        return res.status(401).send("UNAUTHORIZED");
    }

    const newTweet = { username, tweet };
    tweets.push(newTweet);

    res.status(201).send("OK");

})

app.get("/tweets", (req, res) => {

    if (tweets.length === 0) {
        return res.send([]);
    }

    const lastTweets = tweets.slice(-10);
    const getTweets = lastTweets.map(
        (t) => {
            const user = users.find((u) => u.username === t.username);
            return { 
                username: user.username,
                avatar: user.avatar,
                tweet: t.tweet 
            }
        });

    res.send(getTweets);

})

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

