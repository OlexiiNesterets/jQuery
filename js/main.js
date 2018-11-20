'use strict';

function Product(option) {

    var name = option.name;

    this.getName = function () {
        return name;
    }


    var img = option.img;

    this.getImg = function () {
        return img;
    }


    var rating = (+option.rating > 0) ? (+option.rating) : 0;

    this.getRating = function () {
        return rating;
    }


    var price = (+option.price > 0) ? (+option.price) : 0;

    this.getPrice = function () {
        return price;
    }


    var availableQuantity = (+option.availableQuantity > 0) ? (+option.availableQuantity) : 0;

    this.getAvailableQuantity = function () {
        return availableQuantity;
    }


    var badge = option.badge;

    this.getBadge = function () {
        return badge;
    }


    var color = option.color;

    this.getColor = function () {
        return color;
    }
}

function Basket() {

    var listOfProducts = [];

    this.getListOfProducts = function () {
        return listOfProducts.slice();
    }


    var totalPrice = 0;

    this.getTotalPrice = function () {
        return totalPrice;
    }


    this.addToBasket = function (productToAdd, quantityToAdd) {

        quantityToAdd = +quantityToAdd;

        if ( (quantityToAdd <= 0) || !(productToAdd instanceof Object) ) {
            return;
        }

        for (var i = 0; i < listOfProducts.length; i++) {

            if ( listOfProducts[i].product === productToAdd ) {
                return;
            }
        }

        var result = {
            product: productToAdd,
            quantity: quantityToAdd
        };

        listOfProducts.push(result);

        totalPrice = +( ( productToAdd.getPrice() * quantityToAdd ) + totalPrice ).toFixed(2);
        
    }


    this.update = function (productToUppdate, newQuantity) {

        newQuantity = +newQuantity;

        if (newQuantity < 0) {
            return;
        }

        totalPrice = 0;

        for (var i = 0; i < listOfProducts.length; i++) {

            if ( listOfProducts[i].product === productToUppdate ) {

                totalPrice = calculate( listOfProducts[i], newQuantity, totalPrice );
                listOfProducts[i].quantity = newQuantity;

            } else {

                totalPrice = calculate( listOfProducts[i], listOfProducts[i].quantity, totalPrice );
            }
        }

        return totalPrice;
    }


    function calculate(currentProducts, newAmount, total) {

        return +( ( currentProducts.product.getPrice() * newAmount ) + total ).toFixed(2);
    }

}


/* ---  DOM - homework  --- */


var productCounter = 0;

var wishlistButtons = document.querySelectorAll('.product-item__wishlist-btn');

wishlistButtons.forEach( function(elem) {

    elem.addEventListener( 'click', function() {

        var parent = this.parentElement;

        var tableRow = document.createElement('tr');
        tableRow.className = 'wishlist__table-row';

        var tdNumber = document.createElement('td');
        tdNumber.className = 'wishlist__table-data wishlist__id';
        tdNumber.textContent = ++productCounter;

        var tdName = document.createElement('td');
        tdName.className = 'wishlist__table-data wishlist__table-name wishlist__table-data--middle';
        tdName.textContent = parent.querySelector('.product-item__name').textContent;
        tdName.setAttribute('data-name', tdName.textContent);

        var tdPrice = document.createElement('td');
        tdPrice.className = 'wishlist__table-data';
        tdPrice.textContent = parent.querySelector('.product-item__price').textContent;

        var tdRemove = document.createElement('td');
        tdRemove.className = 'wishlist__table-data';

        var removeBtn = document.createElement('button');
        removeBtn.className = 'wishlist__table-btn';
        removeBtn.textContent = 'REMOVE';
        removeBtn.addEventListener('click', function() {

            var parentRow = this.closest('.wishlist__table-row');
            parentRow.remove();
            var newRows = document.querySelectorAll('.wishlist__id');
            for (var i = 0; i < newRows.length; i++) {
                newRows[i].textContent = i + 1;
            }
        });

        var allProductNames = document.querySelectorAll('.wishlist__table-name');

        for (var i = 0; i < allProductNames.length; i++) {

            if ( allProductNames[i].getAttribute('data-name') === tdName.getAttribute('data-name') ) {
                alert ('Такой товар уже есть!');
                productCounter = allProductNames.length;
                return;
            }
        }

        tdRemove.insertAdjacentElement( 'beforeend', removeBtn );
        tableRow.insertAdjacentElement( 'beforeend', tdNumber );
        tableRow.insertAdjacentElement( 'beforeend', tdName );
        tableRow.insertAdjacentElement( 'beforeend', tdPrice );
        tableRow.insertAdjacentElement( 'beforeend', tdRemove);

        var wishlist = document.querySelector('.wishlist__table-body');
        wishlist.insertAdjacentElement( 'beforeend', tableRow );
    } );
} );



/* --- jQuery home work --- */



(function($){

    $(document).ready(function() {


        function fancyAmount() {

            var $amount = $('.amount');
            
            $.each( $amount, function( indx, value ) {

                var $dataAmount = $(this).attr("data-amount");

                if ( !$dataAmount || !$dataAmount.length ) {

                    return;
                }

                var $text = $(value).text();

                var textParts = $text.split('.');

                var int = textParts[0];
                var frac = textParts[1];

                var state = 'zero';

                if ( +$text !== 0 ) {

                    state = +$text > 0 ? 'positive' : 'negative';
                }

                var $spanState = $('<span class="fancy-amount ' + state +'"></span>');

                var $spanInt = $('<span class="fancy-amount-int">' + int + '</span>');
                var $spanSep = $('<span class="fancy-amount-sep">.</span>');
                var $spanFrac = $('<span class="fancy-amount-frac">' + frac + '</span>');

                $spanState.append($spanInt).append($spanSep).append($spanFrac);

                $(this).empty().append($spanState);
            } );
        }


        fancyAmount();


        function fancySelect() {

            var $select = $('select[name="myname"]');

            $select.wrap('<div class="myfancy myfancy-select-wrapper"></div>');

            $.each( $select, function( indx, value ) {

                var $currentSelect = $(value);

                var $options = $currentSelect.find('option');

                var $ul = $('<ul data-input-name="myname"></ul>');

                $.each( $options, function( index, optValue ) {

                    var $currentOpt = $(optValue);

                    var classState = $currentOpt.prop('disabled') ? 'disabled' : 'enabled';
                    var classSelected = $currentOpt.prop('selected') ? ' selected' : '';
                    var val = $currentOpt.val();
                    var text = $currentOpt.text();

                    $ul.append( $('<li data-input-value=' + val +' class="'+ classState + classSelected +'">' + text + '</li>') );

                    $currentSelect.after($ul);
                } );
            } );

            $select.change( function(event) { 

                var $parent = $(this).parent();

                var optSelected = $(this).find('option:selected').val();

                var $li = $parent.find('li');

                $li.removeClass('selected');

                for (var i = 0; i < $li.length; i++) {

                    var $currentLi = $( $li[i] ) ;
                    
                    if ( $currentLi.data('inputValue') === optSelected ) {

                        $currentLi.addClass('selected');
                        break;
                    }
                }

            });
        }


        fancySelect();
    });

})(jQuery);