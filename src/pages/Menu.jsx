import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { zustandStore } from "../utils/zustandStore";

const CATEGORIES = [
  { id: "new", name: "Новинки", emoji: "✨" },
  { id: "combo", name: "Комбо", emoji: "🎁" },
  { id: "lavash", name: "Лаваш", emoji: "🌯" },
  { id: "pizza", name: "Пицца", emoji: "🍕" },
  { id: "burgers", name: "Бургеры", emoji: "🍔" },
  { id: "hotdog", name: "Хот-дог", emoji: "🌭" },
  { id: "sandwich", name: "Сендвич", emoji: "🥪" },
  { id: "donar", name: "Донар", emoji: "🌮" },
  { id: "salads", name: "Салаты", emoji: "🥗" },
  { id: "sauce", name: "Соус", emoji: "🍯" },
  { id: "muffins", name: "Маффины", emoji: "🧁" },
  { id: "coffee", name: "Кофе", emoji: "☕" },
  { id: "sides", name: "Гарниры", emoji: "🍟" },
  { id: "drinks", name: "Напитки", emoji: "🥤" },
  { id: "extra", name: "Дополнительно", emoji: "➕" },
];

// MAHSULOTLARNI GENERATSIYA QILISH
const generateProducts = () => {
  const products = [];
  const productNames = {
    new: ["Новое блюдо", "Свежая новинка", "Оригинальное лакомство"],
    combo: ["Комбо для двоих", "Семейный комбо", "Комбо люкс"],
    lavash: ["Классический лаваш", "Острый лаваш", "Лаваш с мясом"],
    pizza: ["Маргарита", "Пепперони", "Четыре сыра"],
    burgers: ["Классический бургер", "Двойной бургер", "Премиум бургер"],
    hotdog: ["Классический хот-дог", "Чесночный хот-дог", "Острый хот-дог"],
    sandwich: ["Куриный сендвич", "Говяжий сендвич", "Овощной сендвич"],
    donar: ["Куриный донар", "Говяжий донар", "Смешанный донар"],
    salads: ["Салат Цезарь", "Греческий салат", "Салат Кобб"],
    sauce: ["Майонез", "Кетчуп", "Острый соус"],
    muffins: ["Шоколадный маффин", "Ягодный маффин", "Ванильный маффин"],
    coffee: ["Эспрессо", "Капучино", "Латте"],
    sides: ["Картофель фри", "Луковые кольца", "Кукуруза"],
    drinks: ["Кола", "Спрайт", "Апельсиновый сок"],
    extra: ["Сыр", "Бекон", "Помидоры"],
  };

  const emojis = {
    new: "✨",
    combo: "🎁",
    lavash: "🌯",
    pizza: "🍕",
    burgers: "🍔",
    hotdog: "🌭",
    sandwich: "🥪",
    donar: "🌮",
    salads: "🥗",
    sauce: "🍯",
    muffins: "🧁",
    coffee: "☕",
    sides: "🍟",
    drinks: "🥤",
    extra: "➕",
  };

  CATEGORIES.forEach((category) => {
    for (let i = 1; i <= 13; i++) {
      const nameIndex = (i - 1) % (productNames[category.id]?.length || 1);
      products.push({
        id: `${category.id}-${i}`,
        category: category.id,
        title: `${productNames[category.id]?.[nameIndex] || category.name} #${i}`,
        emoji: emojis[category.id],
        price: Math.floor(10000 + Math.random() * 40000),
        oldPrice: Math.floor(15000 + Math.random() * 50000),
        description: `Asarida tayyorlangan ${category.name.toLowerCase()}. Ajoyib ta'mi va sog'ligi bilan tanilgan.`,
      });
    }
  });

  return products;
};

const ALL_PRODUCTS = generateProducts();

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState("new");
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const { darkMode } = zustandStore();

  // LocalStorage-dan ma'lumot olish
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    const storedCart = localStorage.getItem("cart");
    if (storedFavorites) setFavorites(JSON.parse(storedFavorites));
    if (storedCart) setCart(JSON.parse(storedCart));
  }, []);

  // Sevimlilar funksiyasi
  const handleAddToFavorites = (product) => {
    const isFavorited = favorites.some((fav) => fav.id === product.id);
    let updatedFavorites;
    if (isFavorited) {
      updatedFavorites = favorites.filter((fav) => fav.id !== product.id);
    } else {
      updatedFavorites = [...favorites, product];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  // Savatga qo'shish funksiyasi
  const handleAddToCart = (product) => {
    const cartItem = {
      ...product,
      cartId: Date.now() + Math.random(),
      quantity: 1,
    };
    const updatedCart = [...cart, cartItem];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const filteredProducts = ALL_PRODUCTS.filter(
    (p) => p.category === selectedCategory
  );

  return (
    <div
      style={{
        paddingTop: "80px",
        minHeight: "100vh",
        background: darkMode ? "#1a1a1a" : "#fcfcfc",
        color: darkMode ? "#fff" : "#111",
        transition: "background 0.3s, color 0.3s",
        fontFamily: "'Nunito', sans-serif",
      }}
    >
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .category-btn {
          padding: 12px 20px;
          border: none;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 600;
          white-space: nowrap;
          font-size: 14px;
        }
        .category-btn.active {
          background: #e8000e;
          color: #fff;
          transform: scale(1.05);
        }
        .category-btn.inactive {
          background: ${darkMode ? "#2a2a2a" : "#fff"};
          color: ${darkMode ? "#aaa" : "#666"};
          border: 1px solid ${darkMode ? "#333" : "#e0e0e0"};
        }
        .category-btn:hover {
          transform: translateY(-2px);
        }
        .product-card {
          background: ${darkMode ? "#2a2a2a" : "#fff"};
          border-radius: 20px;
          padding: 20px;
          box-shadow: 0 5px 15px rgba(0,0,0,${darkMode ? "0.3" : "0.08"});
          border: 1px solid ${darkMode ? "#333" : "#f0f0f0"};
          transition: all 0.3s ease;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          color: ${darkMode ? "#fff" : "#111"};
        }
        .product-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 30px rgba(0,0,0,${darkMode ? "0.5" : "0.15"});
        }
        .heart-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          z-index: 5;
          transition: transform 0.2s;
        }
        .heart-btn:hover {
          transform: scale(1.2);
        }
      `}</style>

      {/* HEADER */}
      <div style={{ padding: "30px 40px", textAlign: "center" }}>
        <h1
          style={{
            fontSize: 36,
            fontWeight: 900,
            marginBottom: 15,
            color: darkMode ? "#fff" : "#111",
          }}
        >
          🍽️ Menyu
        </h1>
        <p
          style={{
            fontSize: 16,
            color: darkMode ? "#aaa" : "#666",
          }}
        >
          Bizning delicious tariflaridan tanlang
        </p>
      </div>

      {/* KATEGORIYALAR */}
      <div
        style={{
          padding: "20px 40px",
          overflowX: "auto",
          overflowY: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 12,
            minWidth: "min-content",
            paddingBottom: 10,
          }}
        >
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              className={`category-btn ${
                selectedCategory === category.id ? "active" : "inactive"
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.emoji} {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* MAHSULOTLAR GRID */}
      <div
        style={{
          padding: "40px",
        }}
      >
        <h2
          style={{
            fontSize: 24,
            fontWeight: 800,
            marginBottom: 25,
            color: darkMode ? "#fff" : "#111",
          }}
        >
          {CATEGORIES.find((c) => c.id === selectedCategory)?.name} ({filteredProducts.length})
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 25,
          }}
        >
          {filteredProducts.map((product) => {
            const isFavorited = favorites.some((fav) => fav.id === product.id);
            return (
              <div key={product.id} className="product-card">
                <button
                  className="heart-btn"
                  onClick={() => handleAddToFavorites(product)}
                  title={isFavorited ? "Sevimlilardan olib tashlash" : "Sevimlilar qo'shish"}
                >
                  {isFavorited ? (
                    <IoIosHeart style={{ color: "#e8000e" }} />
                  ) : (
                    <IoIosHeartEmpty style={{ color: "#ccc" }} />
                  )}
                </button>

                <div style={{ fontSize: 70, marginBottom: 15, textAlign: "center" }}>
                  {product.emoji}
                </div>

                <h3
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    marginBottom: 8,
                    color: darkMode ? "#fff" : "#111",
                  }}
                >
                  {product.title}
                </h3>

                <p
                  style={{
                    fontSize: 13,
                    color: darkMode ? "#aaa" : "#666",
                    marginBottom: 15,
                    flexGrow: 1,
                  }}
                >
                  {product.description}
                </p>

                {/* NARX */}
                <div style={{ marginBottom: 15, display: "flex", gap: 10, alignItems: "center" }}>
                  <span
                    style={{
                      fontSize: 20,
                      fontWeight: 800,
                      color: "#e8000e",
                    }}
                  >
                    {product.price.toLocaleString("uz-UZ")} so'm
                  </span>
                  {product.oldPrice && (
                    <span
                      style={{
                        fontSize: 14,
                        textDecoration: "line-through",
                        color: darkMode ? "#666" : "#999",
                      }}
                    >
                      {product.oldPrice.toLocaleString("uz-UZ")}
                    </span>
                  )}
                </div>

                {/* TUGMALAR */}
                <button
                  onClick={() => handleAddToCart(product)}
                  style={{
                    width: "100%",
                    padding: "12px",
                    background: "#e8000e",
                    color: "#fff",
                    border: "none",
                    borderRadius: 12,
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "background 0.3s",
                    fontSize: 14,
                  }}
                  onMouseEnter={(e) => (e.target.style.background = "#c0000b")}
                  onMouseLeave={(e) => (e.target.style.background = "#e8000e")}
                >
                  🛒 Savatga qo'sh
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
