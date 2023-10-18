const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const {logger} = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler')
const PORT = process.env.PORT || 3000;


app.use(express.urlencoded({extended: false}))
app.use(express.json());


//  STATIC ROUTES
app.use(express.static(path.join(__dirname, "public")));

app.use(logger);

const whitelist = ['http://www.yourdomain.com', 'http://127.0.0.1:3000', 'http://localhost:3000']

const corsOptions = {
    origin:(origin, callback) => {
        if(whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));



// ************************ ROUTE OR ROUTING METHOD *****************************

//(1). ************************ GET METHOD *****************************

// To get the dafault page
// app.get('/', (req, res) => {
//     res.sendFile('/views/index.html', {root: __dirname})
// })


// Another way To get the dafault page
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, "views", "index.html"))
// });


// Another way To get the dafault page
// app.get('^/$|/index.html', (req, res) => {
//     res.sendFile(path.join(__dirname, "views", "index.html"))
// })


// Another way To get the dafault page
// app.get('^/$|/index(.html)?', (req, res) => {
//     res.sendFile(path.join(__dirname, "views", "index.html"))
// });


// To get our new-page file
// app.get('/new-page', (req, res) => {
//     res.sendFile(path.join(__dirname, "views", "new-page.html"))
// });


// Another way To get our new-page file
// app.get('/new-page(.html)?', (req, res) => {
//     res.sendFile(path.join(__dirname, "views", "new-page.html"))
// });

// app.get('/testing-page', (req, res) => {
//     res.sendFile(path.join(__dirname, "views", "testing-page.html"))
// });


// REDIRECT ( status code: 301 )
app.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"))
});

app.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, "views", "new-page.html"))
});


// Redirecting from old-page to new-page
app.get('/old-page', (req, res) => {
    res.redirect(301, 'new-page')
});


// Redirecting from testing-page to new-page
// app.get('/testing-page(.html)?', (req, res) => {
//     res.redirect(301, "new-page.html")
// });


// Another way to Reditect from testing-page to new-page
app.get('/testing-page(.html)?', (req, res) => {
    res.redirect(path.join(__dirname, "views", "new-page.html"))
})



//  ROUTE HANDLER
app.get('/hello(.html)?', (req, res, next) => {
    console.log('Yeah we are moving');
    next()
}, (req, res) => {
    res.send("Hello Boss how are you")
});


// CHAINING ROUTE HANDLER
const cohort1 = (req, res, next) => {
    console.log('Kennymas kanas')
    next()
}

const cohort2 = (req, res, next) => {
    console.log('Supreme Dad Aliah')
    next()
}

const cohort3 = (req, res, next) => {
    console.log('Rocco Hollar')
    next()
}

const cohort4 = (req, res) => {
    console.log('Muhammed Muaz')
    res.send('They are all developers')
}

app.get('/big-devs(.html)?', [cohort1, cohort2, cohort3, cohort4])






// PAGE NOT FOUND ( status code: 404 )
app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, "views", "404.html"));
    } else if (req.accepts('json')) {
        res.json({"error": "404 Not Found"})
     } else {
            res.type('txt').send("404 Not Found")
         }
});


// ERROR HANDLER
app.use(errorHandler);

// **************** NOTE ************************
// WE MUST FIRST SET OUR app.listen(PORT), OTHERWISE WE WON'T GET OUR RESULT  
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
