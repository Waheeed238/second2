-- Insert sample categories
INSERT INTO public.categories (name, description) VALUES
  ('Electronics', 'Mobile phones, laptops, tablets, and other electronic devices'),
  ('Furniture', 'Chairs, tables, beds, sofas, and home furniture'),
  ('Appliances', 'Kitchen appliances, washing machines, refrigerators'),
  ('Books', 'Textbooks, novels, magazines, and other reading materials'),
  ('Clothing', 'Clothes, shoes, accessories, and fashion items'),
  ('Sports', 'Sports equipment, gym gear, and outdoor activities'),
  ('Vehicles', 'Cars, motorcycles, bicycles, and automotive parts'),
  ('Jewelry', 'Gold, silver, precious stones, and fashion jewelry'),
  ('Art & Collectibles', 'Paintings, antiques, collectible items'),
  ('Others', 'Items that don\'t fit in other categories')
ON CONFLICT (name) DO NOTHING;

-- Insert sample pincodes for major Indian cities
INSERT INTO public.pincodes (pincode, area_name, city, state) VALUES
  ('110001', 'Connaught Place', 'New Delhi', 'Delhi'),
  ('110016', 'Lajpat Nagar', 'New Delhi', 'Delhi'),
  ('110019', 'Kalkaji', 'New Delhi', 'Delhi'),
  ('400001', 'Fort', 'Mumbai', 'Maharashtra'),
  ('400050', 'Bandra West', 'Mumbai', 'Maharashtra'),
  ('400070', 'Andheri West', 'Mumbai', 'Maharashtra'),
  ('560001', 'Bangalore City', 'Bangalore', 'Karnataka'),
  ('560038', 'Richmond Town', 'Bangalore', 'Karnataka'),
  ('560066', 'Whitefield', 'Bangalore', 'Karnataka'),
  ('600001', 'Parrys', 'Chennai', 'Tamil Nadu'),
  ('600028', 'T. Nagar', 'Chennai', 'Tamil Nadu'),
  ('600041', 'Adyar', 'Chennai', 'Tamil Nadu'),
  ('700001', 'BBD Bagh', 'Kolkata', 'West Bengal'),
  ('700019', 'Ballygunge', 'Kolkata', 'West Bengal'),
  ('700053', 'Salt Lake', 'Kolkata', 'West Bengal'),
  ('500001', 'Abids', 'Hyderabad', 'Telangana'),
  ('500016', 'Himayatnagar', 'Hyderabad', 'Telangana'),
  ('500081', 'Gachibowli', 'Hyderabad', 'Telangana'),
  ('411001', 'Pune Cantonment', 'Pune', 'Maharashtra'),
  ('411038', 'Koregaon Park', 'Pune', 'Maharashtra'),
  ('302001', 'Jaipur City', 'Jaipur', 'Rajasthan'),
  ('380001', 'Ahmedabad City', 'Ahmedabad', 'Gujarat'),
  ('695001', 'Thiruvananthapuram', 'Thiruvananthapuram', 'Kerala'),
  ('682001', 'Ernakulam', 'Kochi', 'Kerala'),
  ('751001', 'Bhubaneswar', 'Bhubaneswar', 'Odisha')
ON CONFLICT (pincode) DO NOTHING;
