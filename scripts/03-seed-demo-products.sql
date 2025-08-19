-- Updated to use better image URLs and improved descriptions for marketplace listings
-- Seed demo products for the product page with exact products from the provided HTML
-- First, let's add some categories if they don't exist
INSERT INTO categories (id, name, description, is_active, created_at) VALUES
  (gen_random_uuid(), 'Clothing', 'Fashion and apparel items', true, now()),
  (gen_random_uuid(), 'Electronics', 'Electronic devices and gadgets', true, now()),
  (gen_random_uuid(), 'Books', 'Books and educational materials', true, now()),
  (gen_random_uuid(), 'Home Goods', 'Home decor and household items', true, now())
ON CONFLICT (name) DO NOTHING;

-- Create a demo user for the products
INSERT INTO profiles (id, email, full_name, phone, address, pincode, is_admin, created_at, updated_at) VALUES
  (gen_random_uuid(), 'demo@resalehub.com', 'Demo User', '+1234567890', '123 Demo Street', '12345', false, now(), now())
ON CONFLICT (email) DO NOTHING;

-- Get the category and user IDs for our demo products
WITH demo_data AS (
  SELECT 
    (SELECT id FROM categories WHERE name = 'Clothing') as clothing_id,
    (SELECT id FROM categories WHERE name = 'Electronics') as electronics_id,
    (SELECT id FROM categories WHERE name = 'Books') as books_id,
    (SELECT id FROM categories WHERE name = 'Home Goods') as home_goods_id,
    (SELECT id FROM profiles WHERE email = 'demo@resalehub.com') as demo_user_id
)
INSERT INTO items (
  id, user_id, category_id, title, description, condition, estimated_price, 
  photos, pickup_address, pincode, status, created_at, updated_at
) 
SELECT 
  gen_random_uuid(),
  demo_data.demo_user_id,
  CASE 
    WHEN product.title = 'Vintage Leather Jacket' THEN demo_data.clothing_id
    WHEN product.title = 'Wireless Noise-Canceling Headphones' THEN demo_data.electronics_id
    WHEN product.title = 'Classic Novels Collection' THEN demo_data.books_id
    WHEN product.title = 'Handmade Ceramic Vase' THEN demo_data.home_goods_id
    WHEN product.title = 'Designer Sunglasses' THEN demo_data.clothing_id
  END,
  product.title,
  product.description,
  product.condition,
  product.price,
  ARRAY[product.image_url],
  '123 Demo Street, Demo City',
  '12345',
  'approved',
  now(),
  now()
FROM (VALUES
  ('Vintage Leather Jacket', 'Authentic vintage leather jacket in excellent condition. Classic brown leather with timeless styling, perfect for any wardrobe. Genuine leather construction with quality hardware.', 'Good', 85, 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop'),
  ('Wireless Noise-Canceling Headphones', 'Premium wireless headphones with active noise cancellation technology. Crystal clear audio quality with 30+ hour battery life. Perfect for music lovers and professionals.', 'Like New', 120, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop'),
  ('Classic Novels Collection', 'Curated collection of 12 timeless literary classics including works by Dickens, Austen, and Hemingway. Well-maintained hardcover editions perfect for any book lover.', 'Good', 45, 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop'),
  ('Handmade Ceramic Vase', 'Beautiful artisan-crafted ceramic vase with unique glazing technique. Hand-thrown pottery with distinctive earth-tone finish. Perfect statement piece for home decor.', 'Excellent', 30, 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop'),
  ('Designer Sunglasses', 'Stylish designer sunglasses with premium UV protection and durable frame construction. Classic aviator style with polarized lenses. Comes with original case.', 'Like New', 60, 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop')
) AS product(title, description, condition, price, image_url)
CROSS JOIN demo_data;
