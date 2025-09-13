//   const allowedPrefixes = ['BIO103.14','BIO103.34','CSE331','CSE445','CSE465','CSE468', 'CSE425','CSE273'];
//   const courseTable = document.getElementById('courseList');
//   if (courseTable) {
//     const rows = courseTable.getElementsByTagName('tr');
//     for (let i = rows.length - 1; i > -1; i--) {
//       const firstCell = rows[i].getElementsByTagName('td')[0];
//       if (!firstCell) continue;
//       const firstCellContent = firstCell.textContent.trim();
//       if (!allowedPrefixes.some(prefix => firstCellContent.startsWith(prefix))) {
//         rows[i].parentNode.removeChild(rows[i]);
//       }
//     }
//   }


  const allowedPrefixes = ['BIO103.14','BIO103.34','CSE331','CSE445','CSE465','CSE468', 'CSE425','CSE273'];
  const courseTable = document.getElementById('courseList');
  if (courseTable) {
    const rows = courseTable.getElementsByTagName('tr');
    for (let i = rows.length - 1; i > -1; i--) {
      const firstCell = rows[i].getElementsByTagName('td')[0];
      if (!firstCell) continue;
      const firstCellContent = firstCell.textContent.trim();
      if (!allowedPrefixes.some(prefix => firstCellContent.startsWith(prefix))) {
        rows[i].parentNode.removeChild(rows[i]);
      }
    }
  }
