var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});

function listProduct() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("Item ID: " + res[i].item_id);
            console.log("Item: " + res[i].product_name);
            console.log("Price: $" + res[i].price);
            console.log("--------------------------------");
        }
        promptUser();
    });
};

function promptUser() {
    inquirer.prompt([
        {
            type: "input",
            name: "item",
            message: "What item can I get for you?"
        },
        {
            type: "input",
            name: "amount",
            message: "How many units would you like to buy?"
        }
    ]).then(function (ans) {
        console.log("Item Id: " + ans.item);
        console.log("Quantity: " + ans.amount);
        var itemChoice = ans.item;
        var amountChoice = ans.amount;

        connection.query("SELECT stock_quantity FROM products WHERE item_id = " + itemChoice, function (err, results) {
            if (err) throw err;
            for (var i = 0; i < results.length; i++) {
                if (results[i].stock_quantity >= amountChoice) {
                    var newQuantity = results[i].stock_quantity - amountChoice;
                    connection.query('UPDATE products SET stock_quantity = ' + newQuantity + ' WHERE item_id = ' + itemChoice);
                    connection.query("SELECT price FROM products WHERE item_id = " + itemChoice, function (err, results) {
                        console.log("Your total is: $" + results[0].price * amountChoice);
                        connection.end();
                    })
                } else {
                    console.log("Insufficient quantity! Sorry try again.");
                    connection.end();
                }
            }
        });
    });
};

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    listProduct();
});