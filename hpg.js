var $$ = mdui.JQ;


function getProduct() {
    $$('#product option').filter(function (idx, e) {
        if (e.selected) {
            var product = e.value;
        }
    });
    return product.value
}


function getDomain() {
    $$('#domain option').filter(function (idx, e) {
        if (e.selected) {
            var domain = e.value;
        }
    });
    //console.log(domain.value);
    return domain.value;
}


function getPayment_method() {
    $$('#payment_method option').filter(function (idx, e) {
        if (e.selected) {
            var payment_method = e.value;
        }
    });
    return payment_method.value
}


function getPrice() {

    $$('.price').hide();

    var price = '';

    var lastname = $$('#lastname').val();
    var firstname = $$('#firstname').val();
    var product = getProduct();
    var domain = getDomain();

    if (
        lastname != '' &
        firstname != ''
    ) {
        //get price
        //        $$.ajax({
        //            method: 'POST',
        //            url: '/check',
        //            data: {
        //                'product': product,
        //                'domain': domain
        //            },
        //            success: function (data) {
        //                console.log(data);
        //            }
        //        });

        price = '35.00';

        $$('.theprice span').html(`${price}`);
        $$('.waitprice').show();
    }

}

$$('#sendmail').on('click', function (e) {
    $$('#sendmaildiv').toggle();
});


$$('#product').on('close.mdui.select', function () {
    getPrice();
});

$$('#domain').on('close.mdui.select', function () {
    getPrice();
});

$$('.mdui-textfield').on('click', function () {
    getPrice();
});


function formSubmit(token) {

    var price = $$('.theprice span').html();

    var lastname = $$('#lastname').val();
    var firstname = $$('#firstname').val();
    var username = $$('#username').val();
    var contactemail = $$('#contactemail').val();
    var product = getProduct();
    var domain = getDomain();
    var payment_method = getPayment_method();

    var data = {
        'lastname': lastname,
        'firstname': firstname,
        'username': username,
        'contactemail': contactemail,
        'product': product,
        'domain': domain,
        'payment_method': payment_method
    };

    mdui.dialog({
        title: '支付',
        content: `点击确认后您需支付 ${price} 元，期间请勿刷新网页。`,
        modal: true,
        buttons: [
            {
                text: '取消',
                onClick: function (inst) {
                    grecaptcha.reset();
                }
            },
            {
                text: '确认',
                onClick: function (inst) {
                    //html change
                    $$('.enroll h2').html('请稍后...');
                    $$('.accountinfo').hide();
                    $$('.checkout').hide();
                    $$('.mdui-progress').show();
                    $$('.bg3').css('height', '100vh');
                    //post data
                    $$.ajax({
                        method: 'POST',
                        url: '/pay',
                        data: JSON.stringify(data),
                        dataType: 'json',
                        success: function (data) {
                            console.log(data);
                        }
                    });

                }
            }
        ]
    });


}
