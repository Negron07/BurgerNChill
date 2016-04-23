//first connect all this stuff to the other stuff so it works

var prompt = require('promt');
var mysql = require('mysql');
var connection = mysql.createConnection({
	host: '127.0.0.1',
	port: 3306,
	user: 'root',
	password: 'm112488n',
	database: 'Bamazon'
});
connection.connect(function(err){
	if(err){
		console.log('error connecting: ' + err.stack);
		return;
	}
	else{
		console.log('connected as id: ' + connection.threadId);
	}
});

/*Users should then be prompted with two messages. The first message should ask them the ID of the product they would like to buy. The second message should ask them how many of the product they would like to buy.
Once the customer has placed the order: Your application should...
Check if your store has enough quantit1y of the product to meet the customer's request. If not, you should respond to the user by saying: "Insufficient stock" and prevent the order from going through.
If your store DOES have enough of the product to meet the customer's request, you should fulfill their order. This means that you should show them the total cost of their puchase. Then update the SQL database to reflect the remaining stock.*/
function purchase() {
	connection.query('SELECT * FROM products', function(err, rows) {
		console.log("");  
  	for (var i = 0; i < rows.length; i++) {
  		console.log("Item ID: " + rows[i].item_id);
  		console.log("Product Name: " + rows[i].product_Name);
  		console.log("Price: " + rows[i].price); 
  		console.log("");
  	};
	prompt.get(['Id_of_purchase', 'stock'], function (err, res) {
		var alterId= result.Id_of_purchase;
		for(j= 0; j<rows.length; j++){
			if (rows[j].item_id==alterId){
				console.log("You've chosen " +rows[j].product_Name);
    			if(result.stock <= rows[j].stock){
    				console.log("Thank you for purchasing" + result.stock + " " + rows[j].product_Name + " is complete.");
    				var total= result.stock * rows[j].price;
    				console.log("Your order total will be: "+ total);
    				var newstock= rows[j].stock - result.stock;
    				connection.query("UPDATE products SET stock = ? WHERE item_id = ?",[newstock,result.Id_of_purchase],function(err,res2){
						if (err) {
							throw err;
						}
					});
    			purchase();
    			}
    			else{
    				console.log("Sorry there are only "+ rows[k].stock+ " "+ rows[j].product_Name + " available");
    				purchase();
    			};
    		};
    	};
	});
	});
};
purchase();
function newPurchase(){
	console.log("Will you be purchasing anything else today?! Select Y or N")
	prompt.get(['NewPurchase'], function(err, res){
		var newPurchase= res.NewPurchase.toLowerCase();
		if(newPurchase=='y'){
			purchase();
		}else{
			connection.end();
		}
	});
}
