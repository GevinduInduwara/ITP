import jsPDF from 'jspdf'
import 'jspdf-autotable'

const generatePDF = users => {
  const doc = new jsPDF()

  const tableColumn = ["Name", "Email", "Mobile", "Address"]
  const tableRows = []
  users.forEach(user => {

    const name = user.firstname + " " + user.lastname

    const userData = [
      name,
      user.email,
      user.mobile,
      user.address
    ]
    tableRows.push(userData)
  })

  const addFooters = doc => {
    const pageCount = doc.internal.getNumberOfPages()
  
    doc.setFont('helvetica', 'italic')
    doc.setFontSize(8)
    for (var i = 1; i <= pageCount; i++) {
      doc.setPage(i)
      doc.text('Page ' + String(i) + ' of ' + String(pageCount), doc.internal.pageSize.width / 2, 287, {
        align: 'center'
      })
    }
  }

  doc.setFontSize(20)

  const userCount = users.length
  doc.text("Customer Report", 70, 15)
  doc.autoTable(tableColumn, tableRows, { startY: 20 })
  let finalY = doc.lastAutoTable.finalY + 10;

  var today = new Date()
  var yyyy = today.getFullYear()
  var mm = String(today.getMonth() + 1).padStart(2, '0')
  var dd = String(today.getDate()).padStart(2, '0')
  var hh = String(today.getHours()).padStart(2, '0')
  var min = String(today.getMinutes()).padStart(2, '0')
  var ss = String(today.getSeconds()).padStart(2, '0')
  
  var formattedDate = yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + min + ':' + ss

  var reportname = yyyy + '-' + mm + '-' + dd + "_" + hh + ':' + min + ':' + ss

  doc.setFontSize(10)

  const customerCount = "Customer count : " + userCount + "\nAs at : " + formattedDate
  doc.text(20, finalY, customerCount)

  addFooters(doc)
  doc.save(`Customer_Report_${reportname}.pdf`)
};

export default generatePDF