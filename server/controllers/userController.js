// //Router
// router.get('/',(req,res)=>{
//     res.render("home")
// })

const mysql = require('mysql');
const { emit } = require('nodemon');
//Connection Pull -It is a cache of database connections maintained so that connection can't be reused when future requests to the database are required
const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
})

//View Users
exports.view = (req, res) => {
    // res.render('home')

    // Connect to Database
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log("SQL Database connected " + connection.threadId);

        //user the connection
        connection.query('SELECT * FROM user', (err, rows) => {
            //When done rith the connection , release it
            connection.release();

            if (!err) {
                res.render('home', { rows })
            } else {
                console.error(err);
            }

            // console.log("Data from table is: \n" , rows)

        });
    });
}

//Find user By search
exports.find = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log("SQL Database connected " + connection.threadId);


        let searchTerm = req.body.search;

        //user the connection
        connection.query('SELECT * FROM user WHERE first_name LIKE ?', ['%' + searchTerm + '%'], (err, rows) => {
            //When done rith the connection , release it
            connection.release();

            if (!err) {
                res.render('home', { rows })
            } else {
                console.error(err);
            }

            // console.log("Data from table is: \n" , rows)

        });
    });
}

exports.form = (req, res) => {
    res.render('adduser')
}

exports.create = (req, res) => {

    const { first_name, last_name, email, phone, comments } = req.body;

    // res.render('adduser')
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log("SQL Database connected " + connection.threadId);


        let searchTerm = req.body.search;

        //user the connection
        connection.query('INSERT INTO user SET first_name=?, last_name=?,email=?,phone=?,comments=?', [first_name, last_name, email, phone, comments], (err, rows) => {
            //When done rith the connection , release it
            connection.release();

            if (!err) {
                res.render('adduser', { alert: 'User added Successfully' })
            } else {
                console.error(err);
            }
        });
    });
}

//Edit
exports.edit = (req, res) => {
    // res.render('edit-user')

    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log("SQL Database connected " + connection.threadId);


        let searchTerm = req.body.search;

        //user the connection
        connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
            //When done rith the connection , release it
            connection.release();

            if (!err) {
                res.render('edit-user', { rows })
            } else {
                console.error(err);
            }
        });
    });
}


//Update
exports.update = (req, res) => {
    // res.render('edit-user')

    const { first_name, last_name, email, phone, comments } = req.body;

    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log("SQL Database connected " + connection.threadId);




        //user the connection
        connection.query('UPDATE user SET first_name = ?,last_name = ?, email=? , phone=?,comments=? WHERE id=?', [first_name, last_name,email,phone,comments,req.params.id], (err, rows) => {
            //When done rith the connection , release it
            connection.release();

            if (!err) {
                pool.getConnection((err, connection) => {
                    if (err) throw err;
                    console.log("SQL Database connected " + connection.threadId);


                    let searchTerm = req.body.search;

                    //user the connection
                    connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
                        //When done rith the connection , release it
                        connection.release();

                        if (!err) {
                            res.render('edit-user', { rows , alert:`Database has been updated` },)
                        } else {
                            console.error(err);
                        }
                    });
                });
            } else {
                console.error(err);
            }
        });
    });
}


//Delete
exports.delete = (req, res) => {
    // res.render('edit-user')

    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log("SQL Database connected " + connection.threadId);

        //user the connection
        connection.query('DELETE FROM user WHERE id = ?', [req.params.id], (err, rows) => {
            //When done rith the connection , release it
            connection.release();

            if (!err) {
                res.redirect('/')
            } else {
                console.error(err);
            }
        });
    });
}

//view users
exports.viewAll = (req, res) => {
    // res.render('home')

    // Connect to Database
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log("SQL Database connected " + connection.threadId);

        //user the connection
        connection.query('SELECT * FROM user WHERE id=?', [req.params.id],(err, rows) => {
            //When done rith the connection , release it
            connection.release();

            if (!err) {
                res.render('view-user', { rows })
            } else {
                console.error(err);
            }

            // console.log("Data from table is: \n" , rows)

        });
    });
}