const express = require('express');
const app = express();
const morgan = require('morgan');
const views = require('./views');
const { db, Page, User } = require('./models')




app.use(morgan('dev'))
app.use(express.static('/public'))
app.use(express.urlencoded())

const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/users')

app.use('/wiki', wikiRouter); //http://localhost:4000/wiki


app.get('/', (req, res) => { //http://localhost:4000/wiki
    res.redirect('/wiki');
})

const init = async () => {
    await db.sync({force: true})
    app.listen(4000, () => {
        console.log('app is listening on port 4000')
    })
}

init();
