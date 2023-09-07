import jsPDF from 'jspdf'
import 'jspdf-autotable'

const generatePDF = emps => {
  const doc = new jsPDF()

  const tableColumn = ["Emp ID", "Name", "NIC", "Designation", "Contact Number", "Department", "Basic Salary"]
  const tableRows = []
  emps.forEach(emp => {

    const name = emp.firstName + " " + emp.lastName

    const empData = [
      emp.empID,
      name,
      emp.nic,
      emp.designation,
      emp.contactNumber,
      emp.department,
      emp.basicSal
    ]
    tableRows.push(empData)
  })
  doc.setFont('helvetica', 'italic')
  doc.setFontSize(20)
  const empCount = emps.length
  doc.text("Employee Report", 70, 15)


  doc.setFontSize(8)
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

  doc.setFontSize(10)

  const employeeCount = "Employee count : " + empCount + "\nAs at : " + formattedDate
  doc.text(20, finalY, employeeCount)
  
  const date = Date().split(" ")
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4]

  doc.save(`report_${dateStr}.pdf`)
}

export default generatePDF