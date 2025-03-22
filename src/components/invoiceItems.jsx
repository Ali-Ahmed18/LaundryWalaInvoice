import React from "react";
import "./InvoiceGenerator.css"; // Your custom styles

const InvoiceItems = ({ items, updateItem, deleteItem, addItem }) => {
  return (
    <div className="bg-white p-6 sm:p-8 shadow-lg rounded-lg mb-6 border-l-4 border-primary max-w-3xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-semibold text-primary mb-6 text-center">
        Invoice Services
      </h2>
      {items.map((item, index) => (
        <div key={index} className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-4">
          {/* Service Title and Description */}
          <div className="flex flex-col gap-2">
            <p className="text-primary font-semibold">Title & Description</p>
            <input
              type="text"
              placeholder="Service Title"
              value={item.title}
              onChange={(e) => updateItem(index, "title", e.target.value)}
              className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <textarea
              placeholder="Description"
              value={item.description}
              onChange={(e) => updateItem(index, "description", e.target.value)}
              className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Quantity */}
          <div className="flex flex-col gap-2">
            <p className="text-primary font-semibold">Quantity</p>
            <input
              type="number"
              placeholder="Qty"
              value={item.qty}
              onChange={(e) => updateItem(index, "qty", e.target.value)}
              className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Price */}
          <div className="flex flex-col gap-2">
            <p className="text-primary font-semibold">Price</p>
            <input
              type="number"
              placeholder="Price"
              value={item.price}
              onChange={(e) => updateItem(index, "price", e.target.value)}
              className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Delete Button */}
          <div className="flex items-center justify-center">
            <button
              onClick={() => deleteItem(index)}
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {/* Add Item Button */}
      <button
        onClick={addItem}
        className="mt-6 bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary/80 transition"
      >
        + Add Item
      </button>
    </div>
  );
};

export default InvoiceItems;
