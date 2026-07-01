import json
import random

from app import create_app, db
from app.models import Category, Product
from config import Config

random.seed(42)

CATEGORIES = [
    ("Electronics", "electronics", "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=900&q=80"),
    ("Fashion", "fashion", "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80"),
    ("Home & Living", "home", "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80"),
    ("Beauty", "beauty", "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=80"),
    ("Sports", "sports", "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80"),
    ("Gaming", "gaming", "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80"),
    ("Books", "books", "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80"),
    ("Toys", "toys", "https://images.unsplash.com/photo-1558060370-d644479cb6f7?auto=format&fit=crop&w=900&q=80"),
    ("Accessories", "accessories", "https://images.unsplash.com/photo-1523779105320-d1cd346ff52b?auto=format&fit=crop&w=900&q=80"),
]

CATALOG = {
    "Electronics": {
        "brands": ["Auralux", "PixelPro", "Orbit", "VoltEdge", "NovaTech", "LumaCore"],
        "items": [
            "Wireless Headphones", "Compact 5G Phone", "Smartwatch", "Bluetooth Speaker",
            "USB-C Hub", "Desk Monitor", "Action Camera", "Tablet", "Smart Lamp",
            "Charging Dock", "Mechanical Keyboard", "Noise Cancelling Earbuds",
            "Portable Projector", "Wi-Fi Mesh Router", "E-Reader", "Smart Doorbell",
            "4K Webcam", "Power Bank", "Laptop Stand", "Wireless Charger",
            "Mini Drone", "Soundbar", "Fitness Smart Ring", "Photo Printer",
        ],
        "images": [
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
        ],
        "price": (39, 499),
    },
    "Fashion": {
        "brands": ["NovaFit", "Threadline", "Vesper", "Urban Loom", "North & Co", "Aster"],
        "items": [
            "Knit Runner Sneakers", "Cotton Overshirt", "Travel Hoodie", "Denim Jacket",
            "Slim Chinos", "Everyday Tee", "Linen Shirt", "Rain Shell", "Chelsea Boots",
            "Canvas Tote", "Ribbed Cardigan", "Active Joggers", "Puffer Vest",
            "Pleated Skirt", "Tailored Blazer", "Suede Loafers", "Fleece Pullover",
            "Wide-Leg Trousers", "Performance Polo", "Satin Slip Dress",
            "Cargo Shorts", "Wool Beanie", "Quilted Jacket", "Leather Belt",
        ],
        "images": [
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80",
        ],
        "price": (24, 180),
    },
    "Home & Living": {
        "brands": ["Orbit", "CloudSoft", "Hearthly", "CasaVale", "Elm & Stone", "BrightNest"],
        "items": [
            "LED Desk Lamp", "Cotton Bedding Kit", "Ceramic Dinner Set",
            "Woven Throw Blanket", "Aroma Diffuser", "Storage Basket", "Side Table",
            "Wall Shelf", "Bath Towel Set", "Planter Trio", "Kitchen Scale",
            "Velvet Cushion", "Bamboo Shoe Rack", "Glass Coffee Table",
            "Linen Curtain Set", "Memory Foam Pillow", "Tabletop Fire Bowl",
            "Nonstick Cookware Set", "Stoneware Vase", "Laundry Hamper",
            "Reading Floor Lamp", "Counter Stool", "Serving Tray", "Closet Organizer",
        ],
        "images": [
            "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80",
        ],
        "price": (18, 240),
    },
    "Beauty": {
        "brands": ["Vero", "GlowKind", "LumaSkin", "Herbelle", "Solace", "PureLab"],
        "items": [
            "Hydrating Skincare Set", "Vitamin C Serum", "Mineral Sunscreen",
            "Soft Matte Lip Kit", "Clay Mask", "Body Butter", "Repair Shampoo",
            "Conditioning Oil", "Brow Gel", "Facial Roller", "Cleanser Duo",
            "Fragrance Mist", "Retinol Night Cream", "Scalp Scrub",
            "Tinted Moisturizer", "Gel Nail Kit", "Makeup Brush Set",
            "Eye Cream", "Hair Mask", "Exfoliating Toner", "Blush Palette",
            "Cuticle Oil", "Cleansing Balm", "Aloe Face Mist",
        ],
        "images": [
            "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?auto=format&fit=crop&w=900&q=80",
        ],
        "price": (12, 95),
    },
    "Sports": {
        "brands": ["Forge", "StrideLab", "PeakForm", "HydraPro", "FlexCore", "TrailMate"],
        "items": [
            "Adjustable Dumbbells", "Yoga Mat", "Running Vest", "Foam Roller",
            "Training Gloves", "Resistance Bands", "Trail Bottle", "Cycling Lights",
            "Jump Rope", "Gym Duffel", "Recovery Ball", "Fitness Tracker Band",
            "Pickleball Paddle Set", "Ankle Weights", "Speed Ladder",
            "Compression Socks", "Balance Board", "Pilates Ring", "Swim Goggles",
            "Tennis Backpack", "Massage Gun", "Hiking Poles", "Bike Repair Kit",
            "Weighted Vest",
        ],
        "images": [
            "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=900&q=80",
        ],
        "price": (15, 280),
    },
    "Gaming": {
        "brands": ["Zenith", "ArcadeX", "PulsePlay", "Vertex", "NeonForge", "HyperPad"],
        "items": [
            "Pro Gaming Controller", "RGB Headset", "Streaming Microphone",
            "Mouse Pad XL", "Gaming Mouse", "Tactile Keyboard", "Console Stand",
            "Capture Card", "Thumbstick Kit", "Desk Light Bar", "VR Carry Case",
            "Cooling Dock", "Racing Wheel", "Arcade Fight Stick", "Game Storage Tower",
            "Portable Monitor", "Controller Charging Station", "Streaming Keypad",
            "Quest Link Cable", "Retro Handheld Console", "Gaming Chair Mat",
            "HDMI Switch", "FPS Aim Trainer Kit", "Console Travel Case",
        ],
        "images": [
            "https://images.unsplash.com/photo-1592840496694-26d035b52b48?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1605901309584-818e25960a8f?auto=format&fit=crop&w=900&q=80",
        ],
        "price": (19, 260),
    },
    "Books": {
        "brands": ["Page & Pine", "Northstar Reads", "InkWell", "StudyCraft", "PaperTrail", "BrightLeaf"],
        "items": [
            "Reading Light", "Hardcover Journal", "Cookbook Collection",
            "Design Notebook", "Mystery Box Set", "Language Workbook",
            "Art History Guide", "Business Playbook", "Poetry Anthology",
            "Kids Story Set", "Planner", "Travel Atlas", "Book Stand",
            "Classic Novel Set", "Guided Wellness Journal", "Science Activity Book",
            "Graphic Novel Bundle", "Garden Handbook", "Memoir Collection",
            "Desk Dictionary", "Bookmark Set", "Book Club Kit", "Fountain Pen",
            "Writing Prompt Deck",
        ],
        "images": [
            "https://images.unsplash.com/photo-1526243741027-444d633d7365?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=900&q=80",
        ],
        "price": (8, 88),
    },
    "Toys": {
        "brands": ["MiniWorks", "BrightPlay", "PuzzlePop", "TinyTrail", "KinderLab", "HappyStack"],
        "items": [
            "Builder Toy Set", "Wooden Puzzle", "Art Activity Kit", "Plush Friend",
            "STEM Robot", "Magnetic Tiles", "Outdoor Bubble Set", "Board Game",
            "Dollhouse Kit", "Dinosaur Pack", "Train Track Set", "Craft Bead Box",
            "Remote Control Car", "Pretend Kitchen Set", "Balance Bike",
            "Stacking Blocks", "Science Lab Kit", "Water Table", "Kite Set",
            "Marble Run", "Dress-Up Trunk", "Musical Mat", "Space Explorer Set",
            "Memory Card Game",
        ],
        "images": [
            "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1558060370-d644479cb6f7?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=900&q=80",
        ],
        "price": (10, 120),
    },
    "Accessories": {
        "brands": ["Atlas", "CarryWell", "Stone & Loop", "MetroHide", "AeroCase", "Brassline"],
        "items": [
            "Weekender Travel Bag", "Leather Wallet", "Polarized Sunglasses",
            "Minimal Watch", "Laptop Sleeve", "Silk Scarf", "Key Organizer",
            "Crossbody Bag", "Travel Pouch Set", "Card Holder", "Phone Case",
            "Canvas Backpack", "Passport Holder", "Jewelry Organizer",
            "Watch Strap Set", "Commuter Umbrella", "Packing Cubes",
            "Reusable Tote Set", "Laptop Backpack", "RFID Money Clip",
            "Tablet Folio", "Hair Clip Set", "Luggage Tag Duo", "Tech Cable Roll",
        ],
        "images": [
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1523779105320-d1cd346ff52b?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=900&q=80",
        ],
        "price": (14, 210),
    },
}

QUALIFIERS = ["Classic", "Air", "Studio", "Everyday", "Premium", "Compact", "Travel", "Core", "Elite", "Eco", "Flex", "Luxe"]
TAGS = ["featured", "trending", "bestseller", "recommended", "new", "deal"]


def build_products(category):
    data = CATALOG[category.name]
    low, high = data["price"]
    products = []
    for index, item in enumerate(data["items"]):
        brand = data["brands"][index % len(data["brands"])]
        qualifier = QUALIFIERS[index % len(QUALIFIERS)]
        price = round(random.uniform(low, high), 2)
        discount = random.choice([0, 10, 12, 15, 18, 20, 25, 30, 35])
        images = data["images"][index % len(data["images"]):] + data["images"][: index % len(data["images"])]
        product_tags = sorted(set(random.sample(TAGS, 3)))
        products.append(
            Product(
                name=f"{brand} {qualifier} {item}",
                price=price,
                description=(
                    f"{brand} {qualifier} {item} delivers dependable quality, polished details, "
                    f"and marketplace value for everyday {category.name.lower()} shoppers."
                ),
                stock=random.randint(18, 160),
                rating=round(random.uniform(4.1, 5.0), 1),
                reviews=random.randint(24, 620),
                discount=discount,
                images_json=json.dumps(images[:4]),
                brand=brand,
                tags_json=json.dumps(product_tags),
                category_id=category.id,
            )
        )
    return products


def init_database():
    app = create_app(Config)
    with app.app_context():
        db.drop_all()
        db.create_all()
        category_models = []
        for name, slug, image in CATEGORIES:
            category = Category(name=name, slug=slug, image_url=image)
            db.session.add(category)
            category_models.append(category)
        db.session.flush()
        for category in category_models:
            db.session.add_all(build_products(category))
        db.session.commit()
        print(f"Database initialized with {Category.query.count()} categories and {Product.query.count()} products.")


if __name__ == "__main__":
    init_database()
