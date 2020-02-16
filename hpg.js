var $$ = mdui.JQ;


function getProduct() {
    $$('#product option').filter(function (idx, e) {
        if (e.selected) {
            var product = e;
        }
    });
    return product.value
}


function getDomain() {
    $$('#domain option').filter(function (idx, e) {
        if (e.selected) {
            var domain = e;
        }
    });
    //console.log(domain.value);
    return domain.value;
}


function getPrice() {

    var lastname = $$('#lastname').val();
    var firstname = $$('#firstname').val();
    var product = getProduct();
    var domain = getDomain();

    var data = {
        'product': product,
        'domain': domain
    };

    console.log(product + domain);

    if (
        lastname != '' &
        firstname != ''
    ) {
        $$('.waitprice').show();
        $$('.waitprice .mdui-spinner').show();
        $$('.waitprice .theprice').hide();
        //get price
        $$.ajax({
            method: 'POST',
            url: '/getPrice',
            data: JSON.stringify(data),
            dataType: 'json',
            success: function (data) {
                console.log(data);
                $$('.theprice').html('￥ ' + data.price);
                $$('#buycodelink').attr('href', data.buycodelink);
                $$('.waitprice .mdui-spinner').hide();
                $$('.waitprice .theprice, #inputcode').show();
            }
        });
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


function submitData(data) {
    //html change
    $$('#progresstitle').html('请稍等...');
    $$('.accountinfo, .checkout').hide();
    $$('.mdui-progress').show();
    $$('.bg3').css('height', '100vh');
    //post data
    $$.ajax({
        method: 'POST',
        url: '/checkout',
        data: JSON.stringify(data),
        dataType: 'json',
        success: function (data) {

        },
        error: function () {
            console.log(data);
            $$('#progresstitle').html('哎呀出错了，请刷新网页重新尝试...');
            $$('.mdui-progress').hide();
        }

    });


}

// $$('#userform').on('submit', function (e) { //don't need if recaptcha enabled
//     e.preventDefault();
//     formSubmit();
// });


function formSubmit(token) { //token inside if recaptcha enabled

    var price = $$('.theprice').html();

    var lastname = $$('#lastname').val();
    var firstname = $$('#firstname').val();
    var username = $$('#username').val();
    var contactemail = $$('#contactemail').val();
    var product = getProduct();
    var domain = getDomain();
    var code = $$('#code').val();

    var data = {
        'lastname': lastname,
        'firstname': firstname,
        'username': username,
        'contactemail': contactemail,
        'product': product,
        'domain': domain,
        'code': code
    };

    mdui.dialog({
        title: '提交',
        content: '点击确认后开始创建账号，<b>期间请勿刷新网页。</b>',
        modal: true,
        buttons: [
            {
                text: '取消',
                onClick: function (inst) {
                    grecaptcha.reset();  //needed if recaptcha enabled
                }
            },
            {
                text: '确认',
                onClick: function (inst) {
                    submitData(data)
                }
            }
        ]
    });


}
