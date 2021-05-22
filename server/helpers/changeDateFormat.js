function changeDateFormat (date) {
    let checkMonth = date.split()


    const formattedDate = new Date(`${date} 12:00:00`)
    const year = formattedDate.getFullYear()
    let month = formattedDate.getMonth()  + 1
    const months = ['Januari', 'Februari', 'Maret', 'April', 'May', 'Juni', 'Juli', 'August', 'September', 'October', 'November', 'December']
    const serverDate = `${formattedDate.getDate()} ${months[month - 1]} ${year}`
    if (month < 10) month = '0' + month
    return {
        month,
        year,
        serverDate
    }
}

module.exports = {
    changeDateFormat
}