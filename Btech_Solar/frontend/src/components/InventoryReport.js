import jsPDF from 'jspdf';
import 'jspdf-autotable';

const generatePDF = (inventory) => {
  const doc = new jsPDF();

  // Set font size for the title
  doc.setFontSize(16);
  const titleText = "Inventory Report";
  const titleWidth = doc.getStringUnitWidth(titleText) * doc.internal.getFontSize() / doc.internal.scaleFactor;
  const titleX = (doc.internal.pageSize.getWidth() - titleWidth) / 2;
  doc.text(titleText, titleX, 10);

  // Set font size for the table content
  doc.setFontSize(12);

  const tableColumn = ["Itemcode", "Category", "Brand", "Quantity", "Price", "SellingPrice", "Date", "On Hand Total"];
  const tableRows = [];
  inventory.forEach((inv) => {
    const onhandtotal = inv.Quantity * inv.Price;
    const inventoryData = [
      inv.Itemcode,
      inv.Category,
      inv.Brand,
      inv.Quantity,
      inv.Price,
      inv.SellingPrice,
      inv.Date,
      onhandtotal,
    ];
    tableRows.push(inventoryData);
  });

  // Generate the table
  doc.autoTable(tableColumn, tableRows, { startY: 20 });

  // Additional details
  doc.setFontSize(10);
  const additionalDetailsY = doc.autoTable.previous.finalY + 10;
  doc.text(`Email: sales.btechsolar@gmail.com`, 10, additionalDetailsY);
  doc.text(`Phone: 071-5206363`, 10, additionalDetailsY + 5);
  doc.text(`Project Manager: Gevindu Induwara`, 10, additionalDetailsY + 10);
  const date = new Date().toLocaleDateString();
  doc.text(`Date: ${date}`, 10, additionalDetailsY + 15);

  const dateStr = date.replace(/\//g, '_');
  doc.save(`report_${dateStr}.pdf`);
};

export default generatePDF;
