$(function () {
    $(':input:eq(0)').click(function () {
        $.ajax({
            url: 'http://127.0.0.1:8000/getdata/',
            type: 'get',
            dataType: 'json',
            success: function (datas) {
                var tbhtml = "<tr><th>姓名</th><th>年龄</th><th>性别</th></tr>";
                for (var i = 0; i < datas.length; i++) {
                    tbhtml += "<tr><td>" + datas[i] + "</td><td>" + datas[i] + "</td><td>" + datas[i] + "</td></tr>";
                }

                $('table:eq(0)').html(tbhtml);
            }
        })
    })
})