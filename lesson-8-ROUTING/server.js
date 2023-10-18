const express = require('express')
const app = express()
const path = require('path');
const cors = require('cors')
const {logger} = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler')
const PORT = process.env.PORT || 3100;
// const {router} = require('./routes/subdir')

app.use(express.urlencoded({extended: false}))
app.use(express.json())

//Static Routes

app.use('/', express.static(path.join(__dirname, "public")));               //Apply static files
app.use('/subdir', express.static(path.join(__dirname, "/public")))         //Apply static files

 
app.use('/', require('./routes/root'))
app.use('/subdir', require('./routes/subdir'))
app.use('/employees', require('./routes/api/employees'))

app.use(logger)

const whitelist = ['https://www.yourdomain.com', 'http://127.0.0.1:3000', 'http://localhost:3100']

const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORs'))
        }
    },
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

// app.get('/', (req, res) => {
//     res.sendFile('/views/index.html', {root: __dirname})
// })                   

            //OR

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, "views", "index.html"))
// })

             //OR

// app.get('^/$|/index.html', (req, res) => {
//     res.sendFile(path.join(__dirname, "views", "index.html"))
// })
            //OR
            
// app.get('^/$|/index(.html)?', (req, res) => {                        //Makes it dynamic to either use .html or not in our address
//     res.sendFile(path.join(__dirname, "views", "index.html"))
// })

// // app.get('/new-page', (req, res) => {
// //     res.sendFile('/views/new-page.html', {root: __dirname})
// // })

//             //OR

// app.get('/new-page(.html)?', (req, res) => {                            //Makes it dynamic to either use .html or not in our address
//     res.sendFile('/views/new-page.html', {root: __dirname})
// })

// // app.get('/testing', (req, res) => {
// //     res.sendFile(path.join(__dirname, 'views', 'testing.html'))
// // })


// //   ********************************************//Redirecting***********************************************

// // app.get('/old-page(.html)?', (req, res) => {
// //     res.redirect(path.join(__dirname, 'views', 'new-page.html'))
// // })

//             //OR
// // app.get('/testing(.html)?', (req, res) => {
// //     res.redirect(path.join(__dirname, "views", "new-page.html"))
// // })

//             //OR
// app.get('/testing(.html)?', (req, res) => {
//     res.redirect(301, "new-page.html")
// })
app.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, "new-page.html")
})



// // ***********************Chaining Route Handler**********************************
// const cohort1 = (req, res, next) => {
//     console.log('Kanas Qodri');
//     next()
// }
// const cohort2 = (req, res, next) => {
//     console.log('Muhammad Rocco');
//     next()
// }
// const cohort3 = (req, res, next) => {
//     console.log('Muhammad KennyMax');
//     next()
// }
// const cohort4 = (req, res) => {
//     console.log('Supreme HaliahFather');
//     res.send('Dem be guru in Tech')
// }

// app.get('/big-devs(.html)?', [cohort1, cohort2, cohort3, cohort4])

// app.get('/*', (req, res) => {                                   //Error 404 page
//     res.sendFile(path.join(__dirname, 'views', '404.html'))
// })

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({"error": "404 Not Found"});
    } else {
        res.type('txt').send("404 Not Found")
    }
})

app.use(errorHandler)

app.listen(PORT, () => console.log(`server running on port ${PORT}`))

 













// const express = require('express')
// const app = express()
// const path = require('path')
// const cors = require('cors')
// const {logger} = require('./middleware/logEvents');
// const errorHandler = require('./middleware/errorHandler')
// const PORT = process.env.PORT || 3100;


// app.use(express.urlencoded({extended: false}))
// app.use(express.json());

// // static route
// app.use('/', express.static(path.join(__dirname, "public")));
// // app.use('/subdir', express.static(path.join(__dirname, "public")));


// //   ROUTES
// app.use('/', require('./routes/root'));
// app.use('/subdir', require('./routes/subdir'));
// app.use('/employess', require('./routes/api/employees'))

// app.use(logger);

// const whitelist = ['http://www.yourdomain.com', 'http://127.0.0.1:3000', 'http://localhost:3000']

// const corsOptions = {
//     origin:(origin, callback) => {
//         if(whitelist.indexOf(origin) !== -1 || !origin) {
//             callback(null, true)
//         } else {
//             callback(new Error('Not allowed by CORS'))
//         }
//     },
//     optionsSuccessStatus: 200
// }
// app.use(cors(corsOptions));



// // ************************ ROUTE OR ROUTING METHOD *****************************

// //(1). ************************ GET METHOD *****************************

// // To get the dafault page
// // app.get('/', (req, res) => {
// //     res.sendFile('/views/index.html', {root: __dirname})
// // })


// // Another way To get the dafault page
// // app.get('/', (req, res) => {
// //     res.sendFile(path.join(__dirname, "views", "index.html"))
// // });


// // Another way To get the dafault page
// // app.get('^/$|/index.html', (req, res) => {
// //     res.sendFile(path.join(__dirname, "views", "index.html"))
// // })


// // Another way To get the dafault page
// // app.get('^/$|/index(.html)?', (req, res) => {
// //     res.sendFile(path.join(__dirname, "views", "index.html"))
// // });


// // To get our new-page file
// // app.get('/new-page', (req, res) => {
// //     res.sendFile(path.join(__dirname, "views", "new-page.html"))
// // });


// // Another way To get our new-page file
// // app.get('/new-page(.html)?', (req, res) => {
// //     res.sendFile(path.join(__dirname, "views", "new-page.html"))
// // });

// // app.get('/testing-page', (req, res) => {
// //     res.sendFile(path.join(__dirname, "views", "testing-page.html"))
// // });


// // REDIRECT ( status code: 301 )
// // app.get('^/$|/index(.html)?', (req, res) => {
// //     res.sendFile(path.join(__dirname, "views", "index.html"))
// // });

// // app.get('/new-page(.html)?', (req, res) => {
// //     res.sendFile(path.join(__dirname, "views", "new-page.html"))
// // });


// // Redirecting from old-page to new-page
// app.get('/old-page', (req, res) => {
//     res.redirect(301, 'new-page')
// });


// // Redirecting from testing-page to new-page
// // app.get('/testing-page(.html)?', (req, res) => {
// //     res.redirect(301, "new-page.html")
// // });


// // Another way to Reditect from testing-page to new-page
// // app.get('/testing-page(.html)?', (req, res) => {
// //     res.redirect(path.join(__dirname, "views", "new-page.html"))
// // })



// // //  ROUTE HANDLER
// // app.get('/hello(.html)?', (req, res, next) => {
// //     console.log('Yeah we are moving');
// //     next()
// // }, (req, res) => {
// //     res.send("Hello Boss how are you")
// // });


// // CHAINING ROUTE HANDLER
// // const cohort1 = (req, res, next) => {
// //     console.log('Kennymas kanas')
// //     next()
// // }

// // const cohort2 = (req, res, next) => {
// //     console.log('Supreme Dad Aliah')
// //     next()
// // }

// // const cohort3 = (req, res, next) => {
// //     console.log('Rocco Hollar')
// //     next()
// // }

// // const cohort4 = (req, res) => {
// //     console.log('Muhammed Muaz')
// //     res.send('They are all developers')
// // }

// // app.get('/big-devs(.html)?', [cohort1, cohort2, cohort3, cohort4])






// // PAGE NOT FOUND ( status code: 404 )
// app.all('*', (req, res) => {
//     res.status(404);
//     if (req.accepts('html')) {
//         res.sendFile(path.join(__dirname, "views", "404.html"));
//     } else if (req.accepts('json')) {
//         res.json({"error": "404 Not Found"})
//      } else {
//             res.type('txt').send("404 Not Found")
//          }
// });


// // ERROR HANDLER
// app.use(errorHandler);

// // **************** NOTE ************************
// // WE MUST FIRST SET OUR app.listen(PORT), OTHERWISE WE WON'T GET OUR RESULT  
// app.listen(PORT, () => {
//     console.log(`server is running on port ${PORT}`);
// });
