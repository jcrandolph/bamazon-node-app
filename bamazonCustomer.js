var mysql = require("mysql");
var inquirer = require("inquirer");
var colors = require("colors");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    start();
    listItems();
});

function start() {
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~".red)
    console.log("=============WELCOME TO BAMAZON!=============".red.bgWhite);
    console.log("Here is what is available for purchase today!".red.bgWhite);
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~".red);
}

function listItems() {
    connection.query("SELECT * FROM products", function (err, res, ) {
        if (err) throw err;
        for (i = 0; i < res.length; i++) {
            console.log("\nItem ID: " + res[i].item_id + " | Product: " + res[i].product_name + " |  Dept: " + res[i].department_name + " | Price : $" + res[i].price);
        }
        purchase();
        connection.end();
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
            connection.query("SELECT * FROM products WHERE item_id=?", answer.userSelection, function (err, res) {

                for (var j = 0; j < res.length; j++) {

                    if (answer.userQuantity > res[j].stock_quantity) {
                        console.log("I'm sorry, we dont have enough in stock to fill that order!");
                        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                        closeOut();
                    }

                    else {
                        console.log("A wise and thoughtful purchase!");
                        console.log("Let's review your order!");
                        console.log("You've selected " + answer.userQuantity + "  " + answer.userSelection);
                        console.log("You're total purchase comes to $" + res[j].price * answer.userQuantity);
                        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");

                        var newStockQuantity = (res[j].stock_quantity - answer.userQuantity);
                        var userPurchaseId = (answer.userSelection)
                        connection.query("UPDATE products SET ? WHERE ?",
                            [
                                {
                                    stock_quantity: newStockQuantity
                                },
                                {
                                    item_id: userPurchaseId
                                }
                            ],
                            function (err) {
                                if (err) throw err;
                            })
                    }
                }
            })
        })
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