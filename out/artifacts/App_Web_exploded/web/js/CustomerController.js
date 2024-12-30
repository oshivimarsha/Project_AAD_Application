
function loadCustomerData() {
    $.ajax({
        url: 'http://localhost:8080/App_Web_exploded/customer',
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
            <td>${data[i].email}</td>
            <td>${data[i].address}</td>
          </tr>
        `;
                $('#customerTableBody').append(row); // Add new row to the table
            }
        },
        error: function(error) {
            console.error('Error loading customer data:', error);
        }
    });
}


$('#save_customer').click(function(e) {
    console.log("Save button clicked");
    e.preventDefault(); // Prevent default form submission behavior

    // Retrieve form values
    let customerId = $('#customerId').val();
    let customerName = $('#customerName').val();
    let customerEmail = $('#customerEmail').val();
    let customerAddress = $('#customerAddress').val();

    // Client-side validation
    if (!customerId || !customerName || !customerEmail || !customerAddress) {
        alert("All fields are required!");
        return;
    }

    console.log("Id = "+customerId);
    console.log(customerName);
    console.log(customerEmail);
    console.log("Address = "+customerAddress);

    // Create JSON object
    let customerData = {
        id: customerId,
        name: customerName,
        email: customerEmail,
        address: customerAddress
    };

    console.log("customerData = ", customerData)
    // AJAX request to servlet
    $.ajax({
        url: 'http://localhost:8080/App_Web_exploded/customer', // Servlet URL
        type: "POST",
        data: {
            id: customerId,
            name: customerName,
            email: customerEmail,
            address: customerAddress
        },
        success: (response) => {
            console.log("Response received:", response);
            alert("Customer added successfully!");
            loadCustomerData(); // Reload customer data
            clearForm(); // Clear input fields
        },
        error: (error) => {
            console.error("Error occurred:", error);
            alert("Failed to add customer. Please try again.");
        }
    });
});


$('#update_customer').click(function(e) {
    console.log("Update button clicked");
    e.preventDefault(); // Prevent form submission

    let customerId = $('#customerId').val();
    let customerName = $('#customerName').val();
    let customerEmail = $('#customerEmail').val();
    let customerAddress = $('#customerAddress').val();

    console.log(customerId,customerName,customerEmail,customerAddress)
    // AJAX request to the server
    $.ajax({
        url: 'http://localhost:8080/App_Web_exploded/customer',
        type: "PUT",
        contentType: "application/json", // Send JSON data
        data: JSON.stringify({
            id: customerId,
            name: customerName,
            email: customerEmail,
            address: customerAddress
        }), // Send as JSON
        success: (response) => {
            console.log("Response received:", response);
            alert("Customer updated successfully!");
            loadCustomerData(); // Reload customer data
            clearForm(); // Clear input fields
        },
        error:function (error) {
            console.log("Error:"+error)
        }
    });
});


$("#delete_customer").click((e)=>{
    let id = $("#customerId").val()
    console.log("ertyguhj"+id)

    $.ajax({
        url: `http://localhost:8080/App_Web_exploded/customer?id=${id}`,
        method: "DELETE",
        success:function (response) {
            console.log("Response received:", response);
            alert("Customer deleted successfully!");
            loadCustomerData(); // Reload customer data
            clearForm();
        },
        error:function (error) {
            console.log("Error:"+error)
        }
    })
})

$("#clear_customer").click((e)=>{
    clearForm()
})

// Function to clear input fields
function clearForm() {
    $('#customerId').val('');
    $('#customerName').val('');
    $('#customerEmail').val('');
    $('#customerAddress').val('');
}

$(document).ready(function () {
    loadCustomerData(); // Load the data initially
})
$('#customerTableBody').on('click', 'tr', function () {
    let customerId = $(this).find('td:first').text();
    let customerName = $(this).find('td:nth-child(2)').text();
    let customerEmail = $(this).find('td:nth-child(3)').text();
    let customerAddress = $(this).find('td:nth-child(4)').text();
    $('#customerId').val(customerId);
    $('#customerName').val(customerName);
    $('#customerEmail').val(customerEmail);
    $('#customerAddress').val(customerAddress);
})
