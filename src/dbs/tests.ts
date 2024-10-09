import DynamoDB from './dynamo_db';
import { config } from 'dotenv';

// Load environment variables from a .env file, if you are using one
config();

async function runTests() {
    const db = new DynamoDB();

    try {
        // Test querying a random product
        console.log("Testing queryRandomProduct...");
        const randomProduct = await db.queryRandomProduct();
        console.log("Random Product:", randomProduct);

        // Test querying a product by ID
        console.log("Testing queryProductById...");
        const productId = '2ec90391-a901-4ece-92d6-8328e3546e24'; // Replace with a valid product ID
        const product = await db.queryProductById(productId);
        console.log("Product By ID:", product);

        // Test querying all products
        console.log("Testing queryAllProducts...");
        const products = await db.queryAllProducts();
        console.log("All Products:", products);

        // Test inserting an order
        console.log("Testing insertOrder...");
        const order = {
            id: 'order123',
            userId: 'user1',
            products: [
                { productId: 'product1', quantity: 2, price: 20 }
            ],
            totalAmount: 40,
            items: [{ productId: 'product1', quantity: 2 }] // assuming you also need items
        };
        await db.insertOrder(order);
        console.log("Order inserted:", order);

        // Test querying all orders
        console.log("Testing queryAllOrders...");
        const orders = await db.queryAllOrders();
        console.log("All Orders:", orders);

        // Test querying user by ID
        console.log("Testing queryUserById...");
        const userId = '2ea2c512-9b3f-4c2f-ae7c-f179621cccbc'; // Replace with a valid user ID
        const user = await db.queryUserById(userId);
        console.log("User By ID:", user);

        // Test updating a user
        console.log("Testing updateUser...");
        const userUpdate = { id: 'cd06ad9c-367c-41bd-8473-46a58b836e95', name: 'bob', email: 'bob@gmail.com' };
        await db.updateUser(userUpdate);
        console.log("User updated:", userUpdate);
        console.log("User By ID after update:", await db.queryUserById(userUpdate.id));

    } catch (error) {
        console.error("Error running tests:", error);
    }
}

runTests();

