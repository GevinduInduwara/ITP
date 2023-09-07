import jsPDF from 'jspdf'
import 'jspdf-autotable'

const generatePDF = repairs => {
  const doc = new jsPDF()

  const tableColumn = ["Project ID", "Service Charge", "Service Date", "Created Date", "Description"]
  const tableRows = []
  repairs.forEach(repair => {

    const repairData = [
      repair.projectId,
      "Rs. " + repair.cost,
      new Date(repair.serviceDate).toLocaleDateString("en-CA"),
      new Date(repair.date).toLocaleDateString("en-CA"),
      repair.description
    ];
    tableRows.push(repairData)
  });

  doc.setFontSize(20)
  doc.text("Repair Report", 70, 15)
  doc.setFontSize(8)
  doc.autoTable(tableColumn, tableRows, { startY: 20 })
  const date = Date().split(" ")
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4]
  doc.save(`report_${dateStr}.pdf`)
};

export default generatePDF