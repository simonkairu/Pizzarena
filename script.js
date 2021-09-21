//Start of the business logic
function Order(type, size, crust, topping) {
    this.type = type;
    this.size = size;
    this.crust = crust;
    this.topping = topping;
}

//Start of the crust price
Order.prototype.getCrust = function () {
    if (this.crust === 0) {
        return 100
    } else if (this.crust === 1) {
        return 40
    } else if (this.crust === 2) {
        return 200
    }
}

//will get the price of the  topping 
Order.prototype.getTopping = function () {
    if (this.topping === 0) {
        return 300
    } else if (this.topping === 1) {
        return 50
    } else if (this.topping === 2) {
        return 200
    } else if (this.topping === 3) {
        return 100
    }
}


//will get the size price
Order.prototype.getSize = function () {

    var count = $("#topping :selected").length;
    

    if (this.type == 0) {
        if (count === 0) {
            return 600
        } else if (count === 1)
            return 800
        else {
            return 1000
        }
    } else if (this.type == 1) {
        if (count === 0) {
            return 300
        } else if (count === 1)
            return 900
        else {
            return 1200
        }
    } else if (this.type == 2) {
        if (count === 0) {
            return 600
        } else if (count === 1)
            return 1200
        else {
            return 1300
        }
    } else if (this.type == 3) {
        if (count === 0) {
            return 700
        } else if (count === 1)
            return 1200
        else {
            return 1300
        }
    } else if (this.type == 4) {
        if (count === 0) {
            return 500
        } else if (count === 1)
            return 800
        else {
            return 1200
        }
    } else if (this.type == 5) {
        if (count === 0) {
            return 500
        } else if (count === 1)
            return 800
        else {
            return 1200
        }
    } else {
        return false;
    }
}


// the user interface to calculate the total cost 
function fullBill() {
    var sum = 0;
    $(".billPerOrder").each(function () {
        var value = $(this).text();
        if (!isNaN(value) && value.length != 0) {
            sum += parseFloat(value);
        }
    });
    if (document.getElementById('yes').checked) {
        var result = "Your order is Ksh. " + sum + " with a delivery fee of Ksh. 150 ";
        var orderBill = sum + 150;
        var total = "Total: Ksh. " + orderBill + " .00";
        $('#result').text(result);
        $('#totalCost').text(total);

        swal({
            title: "Your order will be delivered to your destination at a fee of 150 shillings",
            icon: "success",
        })

    } else {
        var total = "Total: Ksh. " + sum + " .00";
        $('#totalCost').text(total)
    }
}

//Start of script for the checkout button
function checkout() {
    var fNames = document.getElementById("fullname").value;
    swal({
        title: "Hello " + fNames +  " your order has been placed successfully." + "\r\n" + "Thank You for choosing Pizzarena",
        icon: "success",
    }).then((value) => {
        location.reload();
    });
}

$(document).ready(function () {
    
  
   
    //will display location field if delivered
    $('.radioBtn').change(function () {
        if (document.getElementById("yes").checked) {
            $('.location').show();
        } else {
            $('.location').hide();
        }
    });

    $('#next').click(function () {
        var type = $('#type option:selected').val();
        var size = $('#size option:selected').val();
        var crust = $('#crust option:selected').val();
        var quantity = $('#quantity').val();
        var topping = $('#topping option:selected').val();
        var name = $('#fullname').val();

        //Start of the validation fields
        if (type == '' || size == '' || crust == '' || topping == '' || quantity == '' || name == '') {
            alert('Please complete your order first')
        } else if (document.getElementById("yes").checked && $('#location').val() == '') {
            alert('Location can not be blank')
        } else {
            var selectedType = parseInt($('#type option:selected').val());
            var selectedSize = parseInt($('#size option:selected').val());
            var selectedCrust = parseInt($('#crust option:selected').val());
            var quantity = parseInt($('#quantity').val());
            var selectedTopping = parseInt($('#topping option:selected').val());

            //will create new object
            var newOrder = new Order(selectedType, selectedSize, selectedCrust, selectedTopping);

            //will calculate price per order
            var pizzaBill = (newOrder.getSize() + newOrder.getCrust() + newOrder.getTopping()) * quantity;

            //will append data to table
            $('.ordertable').show();
            $(".table tbody:last").append("<tr>" +
                "<td>" + $('#type option:selected').text() + "</td>" +
                "<td>" + $('#size option:selected').text() + "</td>" +
                "<td>" + $('#crust option:selected').text() + "</td>" +
                "<td>" + $('#topping option:selected').text() + "</td>" +
                "<td>" + $('#quantity').val() + "</td>" +
                "<td><span class='billPerOrder'>" + pizzaBill + "</span></td>" +
                "</tr>");
            $(fullBill);
        }
    })
    $('#checkout').click(function () {
        checkout();
    })
})

