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


function showPrice() {
    var lastname = $$('#lastname').val();
    var firstname = $$('#firstname').val();
    var username = $$('#username').val();
    var product = getProduct();
    var domain = getDomain();
    //console.log(`${lastname} ${firstname} ${username} ${product} ${domain}`);

    if (
        lastname != '' &
        firstname != ''
    ) {
        switch (product) {
            case 'gd':
                switch (domain) {
                    case 'best':
                        var price = '25.00';
                        break;
                    case 'nz':
                        price = '35.00';
                        break;
                    case 'rs':
                        price = '37.00';
                        break;
                };
                break;
            case 'od':
                switch (domain) {
                    case 'best':
                        var price = '1.00';
                        break;
                    case 'nz':
                        price = '2.00';
                        break;
                    case 'rs':
                        price = '3.00';
                        break;
                };
                break;
            case 'ic':
                break;
        };

        $$('.theprice').html(`￥ ${price}`);
        $$('.price').show();
    }

    return price;
}

grecaptcha.ready(function () {
    // do request for recaptcha token
    // response is promise with passed token
    grecaptcha.execute('6LeF7dgUAAAAAJQpOYvQUNEUX6W1ljacOOz_zxQe', {
            action: 'validate_captcha'
        })
        .then(function (token) {
            // add token value to form
            document.getElementById('g-recaptcha-response').value = token;
        });
});

$$('#sendmail').on('click', function (e) {
    console.log('document rerfrefady');
    $$('#sendmaildiv').toggle();
});


$$('#product').on('close.mdui.select', function () {
    showPrice();
});

$$('#domain').on('close.mdui.select', function () {
    showPrice();
});

$$('.mdui-textfield').on('click', function () {
    showPrice();
});


$$('#submit').on('click', function (e) {
    e.preventDefault();

    var data = $$('form').serializeArray();
    var price = showPrice()

    mdui.dialog({
        title: '支付',
        content: `点击确认后您需支付 ${price} 元，期间请勿刷新网页。`,
        buttons: [
            {
                text: '取消'
            },
            {
                text: '确认',
                onClick: function (inst) {
                    window.open(`https://enroll.hpg.ac.cn/pay/${price}`);
                }
            }
        ]
    });

});
