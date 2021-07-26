'use strict';

const userDiploma = new UserForm();

userDiploma.loginFormCallback = (data) =>
    ApiConnector.login(data, loginCallback);

function loginCallback(data) {
    if (data.success === true) {
        location.reload();
    } else {
        userDiploma.setLoginErrorMessage(`Неверный логин или пароль.`);
    }

    console.log(data);

    return;
}

userDiploma.registerFormCallback = (data) =>
    ApiConnector.register(data, registerCallback);

function registerCallback(data) {
    if (data.success === true) {
        location.reload();
    } else {
        userDiploma.setRegisterErrorMessage(`Логин ужe существует.`);
    }

    console.log(data);

    return;
}
