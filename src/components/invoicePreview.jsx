import React from "react";

const InvoicePreview = ({
  invoiceRef,
  name,
  address,
  contact,
  invoiceDate,
  dueDate,
  paymentMethod,
  invoiceNo,
  items,
  calculateSubtotal,
  calculateTotal,
  paidAmount,
  calculateBalance,
}) => {
  const splitTitle = (title, maxChars) => {
    const result = [];
    for (let i = 0; i < title.length; i += maxChars) {
      result.push(title.slice(i, i + maxChars));
    }
    return result;
  };

  return (
    <div className="invoice-card bg-white p-6" ref={invoiceRef}>
      {/* Header Section */}
      <div className="text-center mb-6">
        <img src="/logo.png" alt="Company Logo" className="w-40 mx-auto" />
      </div>

      {/* Billing Info */}
      <div className="grid grid-cols-2 gap-6 ">
        <div>
          <h3 className="font-bold text-lg">Billing To:</h3>
          <p>{name}</p>
          <p className="text-sm text-gray-500">{address}</p>
          <p className="text-sm text-gray-500">{contact}</p>
        </div>
        <div className="text-right">
          <h3 className="font-bold text-lg">Laundry Wala</h3>
          <p className="text-sm text-gray-500">Head Office: North Karachi, Shadman Town R523</p>
          <p className="text-sm text-gray-500">03322372377</p>
        </div>
      </div>

      {/* Invoice & Payment Info */}
      <div className="grid grid-cols-2 gap-6 mb-6 border-b pb-6">
        <div>
          <p className="text-sm text-gray-500">
            Invoice Date: <strong>{invoiceDate}</strong>
          </p>
          <p className="text-sm text-gray-500">
            Due Date: <strong>{dueDate}</strong>
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">
            Amount Due: <strong>Rs.{calculateBalance()}</strong>
          </p>
          <p className="text-sm text-gray-500">
            Payment Method: <strong>{paymentMethod === "cash" ? "Cash" : "Online"}</strong>
          </p>
        </div>
      </div>

      {/* Item Table */}
      <div className="invoice-table mt-6">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">Item</th>
              <th className="border px-4 py-2 text-left">Description</th>
              <th className="border px-4 py-2 text-center">Qty</th>
              <th className="border px-4 py-2 text-center">Price</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">
                  {splitTitle(item.title, 20).map((line, i) => (
                    <span key={i}>{line}<br /></span>
                  ))}
                </td>
                <td className="border px-4 py-2">{item.description}</td>
                <td className="border px-4 py-2 text-center">{item.qty}</td>
                <td className="border px-4 py-2 text-center">Rs.{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Payment Summary */}
      <div className="invoice-summary mt-3 mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 border border-gray-300">
          <div className="flex justify-between mb-2">
            <p className="font-semibold">Subtotal:</p>
            <p>Rs.{calculateSubtotal()}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="font-semibold">Total:</p>
            <p>Rs.{calculateTotal()}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="font-semibold">Paid Amount:</p>
            <p>Rs.{paidAmount}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold">Balance:</p>
            <p>Rs.{calculateBalance()}</p>
          </div>
        </div>
      </div>

      {/* Terms & Conditions */}
      <div className="invoice-terms mt-6">
        <h3 className="font-bold text-lg mb-4">TERMS & CONDITIONS</h3>
        <ul className="pl-5 text-xs text-gray-700">
          <li>✔ Service Agreement: Using our service means you accept our terms.</li>
          <li>✔ Check Your Pockets: We are not responsible for lost items.</li>
          <li>✔ Fabric Care: No guarantee for shrinkage, color change, or stain removal.</li>
          <li>✔ Quality Complaints: Report within 24 hours of delivery.</li>
          <li>✔ Compensation Policy: Max 2-4x processing cost (service credit, no cash).</li>
          <li>✔ Unclaimed Clothes: After 15 days, items may be donated or auctioned.</li>
          <li>✔ Payment: Cash on delivery; advance payments must be recorded.</li>
          <li>✔ Pickup & Delivery: Estimated times, but not guaranteed.</li>
          <li>✔ Garment Count: Verify at pickup & delivery; no claims afterward.</li>
          <li>✔ Rates & Policies: Subject to change without prior notice.</li>
        </ul>
      </div>
    </div>
  );
};

export default InvoicePreview;
