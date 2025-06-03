// generate_sample_data.php

require_once 'dbconnect.php';

$faker = Faker\Factory::create();

try {
    $pdo->beginTransaction();
    
    // Generate 50 customers
    for ($i = 0; $i < 50; $i++) {
        $stmt = $pdo->prepare("
            INSERT INTO customers 
            (first_name, last_name, email, phone, address)
            VALUES (?, ?, ?, ?, ?)
        ");
        $stmt->execute([
            $faker->firstName,
            $faker->lastName,
            $faker->email,
            $faker->phoneNumber,
            $faker->address
        ]);
    }
    
    // Generate 200 products across all businesses
    $businesses = $pdo->query("SELECT business_id FROM businesses")->fetchAll();
    $categories = ['Plastic', 'Metal', 'Paper', 'Glass', 'Electronic'];
    
    foreach ($businesses as $business) {
        for ($i = 0; $i < rand(15, 40); $i++) {
            $stmt = $pdo->prepare("
                INSERT INTO products 
                (business_id, name, description, category, price, stock, unit)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            ");
            $stmt->execute([
                $business['business_id'],
                $faker->randomElement($categories) . ' ' . $faker->word,
                $faker->sentence,
                $faker->randomElement($categories),
                $faker->randomFloat(2, 1, 50),
                $faker->numberBetween(10, 1000),
                $faker->randomElement(['kg', 'piece', 'liter'])
            ]);
        }
    }
    
    // Generate 300 orders
    $customers = $pdo->query("SELECT customer_id FROM customers")->fetchAll();
    $products = $pdo->query("SELECT product_id, price FROM products")->fetchAll();
    
    for ($i = 0; $i < 300; $i++) {
        $business = $faker->randomElement($businesses);
        $customer = $faker->randomElement($customers);
        $status = $faker->randomElement(['new', 'accepted', 'completed', 'cancelled']);
        
        // Create order
        $stmt = $pdo->prepare("
            INSERT INTO orders 
            (business_id, customer_id, total_amount, status, payment_method, payment_status)
            VALUES (?, ?, 0, ?, ?, ?)
        ");
        $paymentMethod = $faker->randomElement(['cash', 'gcash', 'card']);
        $paymentStatus = $status === 'completed' ? 'paid' : $faker->randomElement(['pending', 'paid']);
        
        $stmt->execute([
            $business['business_id'],
            $customer['customer_id'],
            $status,
            $paymentMethod,
            $paymentStatus
        ]);
        $orderId = $pdo->lastInsertId();
        
        // Add 1-5 items per order
        $totalAmount = 0;
        $orderProducts = $faker->randomElements($products, rand(1, 5));
        
        foreach ($orderProducts as $product) {
            $quantity = $faker->numberBetween(1, 20);
            $subtotal = $quantity * $product['price'];
            $totalAmount += $subtotal;
            
            $stmt = $pdo->prepare("
                INSERT INTO order_items 
                (order_id, product_id, quantity, unit_price, subtotal)
                VALUES (?, ?, ?, ?, ?)
            ");
            $stmt->execute([
                $orderId,
                $product['product_id'],
                $quantity,
                $product['price'],
                $subtotal
            ]);
        }
        
        // Update order total
        $pdo->prepare("UPDATE orders SET total_amount = ? WHERE order_id = ?")
           ->execute([$totalAmount, $orderId]);
    }
    
    $pdo->commit();
    echo "Sample data generated successfully!";
    
} catch (Exception $e) {
    $pdo->rollBack();
    echo "Error generating sample data: " . $e->getMessage();
}
?>