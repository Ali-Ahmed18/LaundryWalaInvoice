import React from "react";
import { TextField } from "@mui/material"; // Importing MUI TextField
import "./InvoiceGenerator.css"; // Your custom styles

const InvoiceForm = ({
  items,
  updateItem,
  deleteItem,
  addItem,
  invoiceNo,
  setInvoiceNo,
  name,
  setName,
  invoiceDate,
  setInvoiceDate,
  dueDate,
  setDueDate,
  paymentMethod,
  setPaymentMethod,
  paidAmount,
  setPaidAmount,
  contact,
  setContact,
  address,
  setAddress,
}) => {
  return (
    <div className="max-w-screen  p-6 sm:p-8 shadow-lg rounded-lg mb-6 border mx-auto">
      <h2 className="text-2xl sm:text-3xl font-semibold text-primary mb-6 text-center">
        Enter Invoice Details
      </h2>
      <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Invoice No */}
        <div className="flex flex-col gap-2">
          <TextField
            label="Invoice No"
            variant="outlined"
            value={invoiceNo}
            onChange={(e) => setInvoiceNo(e.target.value)}
            fullWidth
            className="input-field"
          />
        </div>

        {/* User Name */}
        <div className="flex flex-col gap-2">
          <TextField
            label="User Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            className="input-field"
          />
        </div>

        {/* Invoice Date */}
        <div className="flex flex-col gap-2">
          <TextField
            label="Invoice Date"
            variant="outlined"
            type="date"
            value={invoiceDate}
            onChange={(e) => setInvoiceDate(e.target.value)}
            fullWidth
            InputLabelProps={{
              shrink: true, // Ensures the label moves up when there's a value
            }}
            className="input-field"
          />
        </div>

        {/* Due Date */}
        <div className="flex flex-col gap-2">
          <TextField
            label="Due Date"
            variant="outlined"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            fullWidth
            InputLabelProps={{
              shrink: true, // Ensures the label moves up when there's a value
            }}
            className="input-field"
          />
        </div>

        {/* Payment Method */}
        <div className="flex flex-col gap-2">
          <TextField
            label="Payment Method"
            variant="outlined"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            fullWidth
            select
            SelectProps={{
              native: true,
            }}
            className="input-field"
          >
            <option value="cash">Cash</option>
            <option value="online">Online</option>
          </TextField>
        </div>

        {/* Paid Amount */}
        <div className="flex flex-col gap-2">
          <TextField
            label="Paid Amount"
            variant="outlined"
            type="number"
            value={paidAmount}
            onChange={(e) => setPaidAmount(parseFloat(e.target.value))}
            fullWidth
            className="input-field"
          />
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-2">
          <TextField
            label="Contact"
            variant="outlined"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            fullWidth
            className="input-field"
          />
        </div>

        {/* Address */}
        <div className="flex flex-col gap-2 col-span-2">
          <TextField
            label="Address"
            variant="outlined"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            fullWidth
            multiline
            rows={4}
            className="input-field"
          />
        </div>
      </form>

      {/* INVOICE SERVICES */}
      <div className="mt-3 p-6 sm:p-8 rounded-lg mb-6">
        <h2 className="text-2xl sm:text-3xl font-semibold text-primary mb-6 text-center">
          Invoice Services
        </h2>
        {items.map((item, index) => (
          <div key={index} className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-4">
            {/* Service Title and Description */}
            <div className="flex flex-col gap-2">
              <p className="text-primary font-semibold">Title & Description</p>
              <TextField
                label="Service Title"
                variant="outlined"
                value={item.title}
                onChange={(e) => updateItem(index, "title", e.target.value)}
                fullWidth
                className="focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <TextField
                label="Description"
                variant="outlined"
                value={item.description}
                onChange={(e) => updateItem(index, "description", e.target.value)}
                fullWidth
                multiline
                rows={4}
                className="focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Quantity */}
            <div className="flex flex-col gap-2">
              <p className="text-primary font-semibold">Quantity</p>
              <TextField
                label="Quantity"
                variant="outlined"
                type="number"
                value={item.qty}
                onChange={(e) => updateItem(index, "qty", e.target.value)}
                fullWidth
                className="focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Price */}
            <div className="flex flex-col gap-2">
              <p className="text-primary font-semibold">Price</p>
              <TextField
                label="Price"
                variant="outlined"
                type="number"
                value={item.price}
                onChange={(e) => updateItem(index, "price", e.target.value)}
                fullWidth
                className="focus:outline-none focus:ring-2 focus:ring-primary"
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
    </div>
  );
};

export default InvoiceForm;
