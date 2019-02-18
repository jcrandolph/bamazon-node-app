//requirements
var mysql = require("mysql");
var inquirer = require("inquirer");
var colors = require("colors");

//info to connect to database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon_db"
});

//connecting to database
connection.connect(function (err) {
    if (err) throw err;
    start();
    listItems();
});
//function for title
function start() {
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~".red)
    console.log("=============WELCOME TO BAMAZON!=============".red.bgWhite);
    console.log("Here is what is available for purchase today!".red.bgWhite);
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~".red);
}
//function to render table of items for sale
function listItems() {
    connection.query("SELECT * FROM products", function (err, res, ) {
        if (err) throw err;
        for (i = 0; i < res.length; i++) {
            console.log("\nItem ID: " + res[i].item_id + " | Product: " + res[i].product_name + " |  Dept: " + res[i].department_name + " | Price : $" + res[i].price);
        }
        purchase();
        //connection.end();
    });
}
function purchase() {
    inquirer
        .prompt([
            {
                name: "userSelection",
                type: "input",
                message: "Please enter the item number for your purchase:"
            },
            {
                name: "userQuantity",
                type: "input",
                message: "How many orders of this product would you like?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
        ]).then(function (answer) {
            connection.query("SELECT stock_quantity FROM products WHERE item_id= ?", [answer.userSelection], function (err, res) {
                if (answer.userQuantity > res[0].stock_quantity) {
                    console.log("I'm sorry, we dont have enough in stock to fill that order!");
                    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                    closeOut();
                }

                else {
                    var updatedQuantity = res[0].stock_quantity - answer.userQuantity;
                    connection.query("SELECT * FROM products WHERE item_id = ?", [answer.userSelection], function (err, res) {
                        var itemSelected = res[0].product_name;
                        var price = res[0].price;
                        var totalPrice = parseFloat(price * answers.userQuantity);
                    
                    connection.query("UPDATE products SET ? WHERE ?", [
                        { stock_quantity: updatedQuantity },
                        { item_id: answer.userSelection }],
                        function (err, res) {
                            if (err) throw err;
                        })
                    console.log("A wise and thoughtful purchase!");
                    console.log("Let's review your order!");
                    console.log("You've selected " + answer.userQuantity + " of  " + itemSelected);
                    console.log("You're total purchase comes to $" + totalPrice);
                    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                    closeOut();
                });
                };
                
            });
        });
        
}


function closeOut() {
    inquirer
        .prompt([
            {
                type: "confirm",
                name: "confirm",
                message: "Would you like to make any other selections?",
                default: true
            }
        ]).then(function (user) {
            if (user.confirm === true) {
                listItems();
            } else {
                console.log("Thank you for shopping at Bamazon!".red.bgwhite);
                console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~".red);
            }
        })
}        