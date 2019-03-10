$(document).ready(() => {
    $('#email').focus(() => {
        console.log("Ana abl el ajax!");
        let userName = $('#userName').val();
        $.ajax({
            type: 'POST',
            url: '/users/checkUserName',
            data:{
                userName: userName
            },
            success: function (res) {
                console.log("ana fel frontend");
                if (res.toString() === 'taken')
                {
                    $('#taken').html('<p id= \'paragraph\' class=\"alert alert-danger\"> UserName already exists </p>')
                    $('#userName').val("")
                }
                else if (res.toString() === 'notTaken') {
                    $('#paragraph').hide()
                }
                else {
                    alert(res.toString())
                }
            }
        })
    })
});
