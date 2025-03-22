import React, { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import InvoiceForm from "./invoiceForm";
// import InvoiceItems from "./invoiceItems";
import InvoicePreview from "./invoicePreview"; 
import "./InvoiceGenerator.css"; // Import the CSS file

const InvoiceGenerator = () => {
  const invoiceRef = useRef();
  const [invoiceNo, setInvoiceNo] = useState(0);
  const [invoiceDate, setInvoiceDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [name, setName] = useState("");
  const [paidAmount, setPaidAmount] = useState(0);
  const [items, setItems] = useState([]);
  const [isLogoLoaded, setIsLogoLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = "/logo.png";
    img.onload = () => setIsLogoLoaded(true);
  }, []);

  const addItem = () => {
    setItems((prevItems) => [
      ...prevItems,
      { title: "", description: "", qty: 1, price: 0 }
    ]);
  };

  const updateItem = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const deleteItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const calculateSubtotal = () => {
    return items.reduce((total, item) => total + item.qty * item.price, 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal();
  };

  const calculateBalance = () => {
    return calculateTotal() - paidAmount;
  };

  const handleDownloadPDF = () => {
    if (!isLogoLoaded) {
      alert("Logo is still loading. Please try again.");
      return;
    }

    const input = invoiceRef.current;
    input.style.display = "block"; // Ensure it's visible before capturing

    setTimeout(() => {
      html2canvas(input, {
        scale: window.devicePixelRatio, // Improve rendering on high-res screens
        useCORS: true, // Handle external images properly
        logging: true,
      })
        .then((canvas) => {
          input.style.display = "none"; // Hide after capturing
          const imgData = canvas.toDataURL("image/png");

          // Define custom page size (width, height)
          const customWidth = 210; // A4 width in mm
          const customHeight = 400; // Custom height in mm
          const pdf = new jsPDF("p", "mm", [customWidth, customHeight]);

          const imgWidth = customWidth; // Use custom width
          const imgHeight = (canvas.height * imgWidth) / canvas.width;

          // Calculate the number of pages needed
          const pageHeight = pdf.internal.pageSize.height;
          const totalPages = Math.ceil(imgHeight / pageHeight);

          for (let i = 0; i < totalPages; i++) {
            const yOffset = i * pageHeight;
            pdf.addImage(imgData, "PNG", 0, -yOffset, imgWidth, imgHeight);
            if (i < totalPages - 1) {
              pdf.addPage(); // Add a new page if there are more pages to add
            }
          }

          pdf.save("laundry_invoice.pdf");
        })
        .catch((error) => {
          console.error("Error generating PDF:", error);
          alert("Failed to generate PDF. Please try again.");
        });
    }, 500); // Small delay to allow proper rendering
  };

  return (
    <div className="bg-gray-100 max-w-screen flex justify-center items-center mx-auto p-4 sm:p-6  min-h-screen rounded-lg shadow-lg">
      <div className="w-full sm:w-3/4">
      <div className="text-center mb-6">
        <img src="/logo.png" alt="Company Logo" className="w-40 mx-auto" />
      </div>

        <InvoiceForm
         items={items}
         updateItem={updateItem}
          deleteItem={deleteItem}
          addItem={addItem}
          invoiceNo={invoiceNo}
          setInvoiceNo={setInvoiceNo}
          name={name}
          setName={setName}
          invoiceDate={invoiceDate}
          setInvoiceDate={setInvoiceDate}
          dueDate={dueDate}
          setDueDate={setDueDate}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          paidAmount={paidAmount}
          setPaidAmount={setPaidAmount}
          contact={contact}
          setContact={setContact}
          address={address}
          setAddress={setAddress}
        />

        {/* <InvoiceItems
          items={items}
          updateItem={updateItem}
          deleteItem={deleteItem}
          addItem={addItem}
        /> */}

        <InvoicePreview
          invoiceRef={invoiceRef}
          name={name}
          address={address}
          contact={contact}
          invoiceDate={invoiceDate}
          dueDate={dueDate}
          paymentMethod={paymentMethod}
          invoiceNo={invoiceNo}
          items={items}
          calculateSubtotal={calculateSubtotal}
          calculateTotal={calculateTotal}
          paidAmount={paidAmount}
          calculateBalance={calculateBalance}
        />

        <button
          onClick={handleDownloadPDF}
          className="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 shadow-md"
        >
          Download Invoice
        </button>
      </div>
    </div>
  );
};

export default InvoiceGenerator;