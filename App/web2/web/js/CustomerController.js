
$(document).ready(function () {
    loadCustomerData();
})

function loadCustomerData() {
    $.ajax({
        url: 'http://localhost:8080/Application_Web_exploded/customer',
        type: 'GET',
        success: function(response) {
            let data = response;
            console.log(response);
            $('#customerTableBody').empty(); // Clear existing table rows
            for (let i = 0; i < data.length; i++) {
                let row = `
          <tr>
            <td>${data[i].id}</td>
            <td>${data[i].name}</td>
            <td>${data[i].address}</td>
          </tr>`;

                $('#customerTableBody').append(row); // Add new row to the table
            };
        },
        error: function(error) {
            alert("not load")
            console.error('Error loading customer data:', error);
        }
    });


}


