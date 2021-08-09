'use strict';

const userDiploma = new UserForm();

userDiploma.loginFormCallback = (response) =>
    ApiConnector.login(response, loginCallback);

function loginCallback(response) {
    if (response.success === true) {
        location.reload();
    } else {
        userDiploma.setLoginErrorMessage(`Неверный логин или пароль.`);
    }

    return;
}

userDiploma.registerFormCallback = (response) =>
    ApiConnector.register(response, registerCallback);

function registerCallback(response) {
    if (response.success === true) {
        location.reload();
    } else {
        userDiploma.setRegisterErrorMessage(`Логин ужe существует.`);
    }

    return;
}
