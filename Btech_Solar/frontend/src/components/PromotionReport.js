import jsPDF from 'jspdf'
import 'jspdf-autotable'

const generatePDF = promos => {
  const doc = new jsPDF()

  const tableColumn = ["Product Name", "Promo Code", "Start Date", "End Date", "Price", "Promo Price"]
  const tableRows = []
  promos.forEach(promo => {
    const startDate = new Date(promo.startDate);
    const endDate = new Date(promo.endDate);
    const promoData = [
      promo.productName,
      promo.itemCode,
      startDate.toISOString().split('T')[0],
      endDate.toISOString().split('T')[0],
      "Rs. "+promo.price,
      "Rs. "+promo.bestPrice
    ]
    tableRows.push(promoData)
  })
  doc.setFont('helvetica', 'italic')
  doc.setFontSize(20)
  doc.text("Promotions Report", 70, 15)


  doc.setFontSize(8)
  doc.autoTable(tableColumn, tableRows, { startY: 20 })

  doc.setFontSize(10)
  
  const date = Date().split(" ")
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4]

  doc.save(`report_${dateStr}.pdf`)
}

export default generatePDF