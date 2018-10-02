import swal from 'sweetalert2';
import senha from '../senha';

var auth = function(){
    return new Promise(
    function (resolve) {
        swal({
            text: "Digite a senha para executar a açāo!",
            input: "password",
        }).then(senhadigitada => {
            if(senhadigitada.value != senha){
                swal("Error", "Senha incorreta!", "error");
                return false;
            } else {
                resolve();
            }
        })
    }
);
}

export default auth;