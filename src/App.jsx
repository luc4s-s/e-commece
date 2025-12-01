import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Catalog from "./components/Cartalog";
import Cart from "./components/Cart";
import ThankYouPage from "./components/ThankYouPage";

//Estado principal
const App = () => {
  const [cartItems, setCartItems] = useState([]);


  // Funções de manipulação do carrinho
  const handleAddToCart = (product, quantity) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find((item) => item.id === product.id);
      if (itemExists) {
        toast.info(`Quantidade atualizada no carrinho: ${product.name}`);
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        toast.success(`${product.name} adicionado ao carrinho!`);
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  //Atualizar quantidade
  const handleUpdateCart = (product, quantity) => {
    setCartItems((prevItems) => {
      toast.info(`Quantidade atualizada: ${product.name}`);
      return prevItems.map((item) =>
        item.id === product.id ? { ...item, quantity: +quantity } : item
      );
    });
  };

  //Remover produto
  const handleRemoveFromCart = (product) => {
    setCartItems((prevItems) => {
      toast.error(`${product.name} removido do carrinho.`);
      return prevItems.filter((item) => item.id !== product.id);
    });
  };

  return ( 

    
    <BrowserRouter>
    
      <nav>{/*Estrutura de navegação */}
        <Link to="/">Catálogo</Link>
        <Link to="/cart">Carrinho</Link>
      </nav>

      <div className="container"> {/*Rotas da aplicação */}
        <Routes>
          <Route path="/" element={<Catalog onAddToCart={handleAddToCart} />} />
          <Route
            path="/cart"
            element={
              <Cart
                cartItems={cartItems}
                setCartItems={setCartItems}
                onUpdateCart={handleUpdateCart}
                onRemoveFromCart={handleRemoveFromCart}
                onCheckout={() => { {/* faz o Checkout */}
                  if (cartItems.length > 0) {
                    toast.success("Compra finalizada com sucesso!");
                    setCartItems([]);
                  } else {
                    toast.error("Seu carrinho está vazio.");
                  }
                }}
              />
            }
          />
          <Route
            path="/thank-you"
            element={
              <ThankYouPage
                cartItems={cartItems}
                clearCart={() => setCartItems([])}
              />
            }
          />
        </Routes>
      </div>
      {/* faz a Notificações */}
      <ToastContainer 
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </BrowserRouter>
  );
};

export default App
