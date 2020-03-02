var $$ = mdui.JQ;


$$('.channels').on('open.mdui.collapse opened.mdui.collapse close.mdui.collapse', function (e) {
    $$('.channels ul').css('overflow', 'auto');
    $$('.channels ul').css('height', '40vh');
});


function fill_channels(m3uparsed) {
    console.table(m3uparsed);
    $$('.channels ul').html('');
    for (let i = 0; i < m3uparsed.length; i++) {

        $$('.channels ul').append('<li class="mdui-list-item mdui-ripple">' + m3uparsed[i].channel + '</li>');

        $$('.channels ul li').eq(i).on('click', function (e) {
            $$('.channelname').html(m3uparsed[i].channel);

            // videojs
            var player = videojs('video');
            player.src({
                type: 'application/x-mpegurl',
                src: m3uparsed[i].url
            });
            $$('.vjs-control-bar').hide();
            player.play();

        });

    }

    var channels_collapse = new mdui.Collapse('.mdui-list');
    channels_collapse.open('.channels');
}



function m3uparse(m3u) {
    var m3uparsed = [];
    var channel = '';
    var url = '';
    var flag = 0;
    m3u.trim().split('\\n').forEach(function (line, linenum) {

        if (line.includes('EXTINF')) {
            channel = line.split(',')[1];
            flag = 1;
        }

        if (flag == 1 && !line.includes('EXTINF')) {
            url = line;
            flag = 2;
        }

        if (flag == 2) {
            m3uparsed.push({
                'channel': channel,
                'url': url
            });
            flag = 0;
        }

    })

    return m3uparsed;
}



function get_m3u(i) {
    $$.ajax({
        method: 'POST',
        url: '/get_m3u',
        data: JSON.stringify({
            i: i
        }),
        success: function (data) {
            var m3uparsed = m3uparse(data)
            fill_channels(m3uparsed);
        }
    });
}


function get_iptv_src() {
    $$.ajax({
        method: 'POST',
        url: '/iptv_src',
        success: function (data) {
            var iptv_src = JSON.parse(data);
            console.table(iptv_src);
            $$('.source ul').html('');
            for (let i = 0; i < iptv_src.length; i++) {
                var name = iptv_src[i].name;
                $$('.source ul').append('<li class="mdui-list-item mdui-ripple">' + name + '</li>');
                $$('.source ul li').eq(i).on('click', function (e) {
                    $$('.channels ul').html('<li class="mdui-list-item mdui-ripple">加载中...</li>');
                    get_m3u(i);
                });
            }
        }
    });
}


$$(document).ready(function () {
    get_iptv_src();
});
