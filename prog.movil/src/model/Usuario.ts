export class Usuario {
    public nombreUsuario = '';
    public password = '';

    public validarNombreUsuario(): string{
        if(this.nombreUsuario.trim() === ''){
            return 'Para ingresar necesitas un nombre de usuario';
        };
        if(this.nombreUsuario.length < 3 || this.nombreUsuario.length > 8) {
            return 'El nombre de usuario tiene que ser mayor 3 y menor a 8';
        };
        return '';
    };

    public validarPassword(): string{
        if(this.password.trim()===''){
            return 'Debe tener un contraseña';
        };
        for(let i = 0; i < this.password.length; i++){
            if ('0123456789'.indexOf(this.password.charAt(i))=== -1){
                return 'La contraseña debe ser númerica';
            };
        };
        if (this.password.length > 4 || this.password.length < 4){
            return 'La contraseña debe ser de 4 digitos';

        };
        return '';
    };

    public validarUsuario(): string {
        return this.validarNombreUsuario() || this.validarPassword();
    };
};