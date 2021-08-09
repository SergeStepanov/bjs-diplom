'use strict';

const logoutUser = new LogoutButton();

logoutUser.action = () =>
    ApiConnector.logout((response) => {
        if (response.success === true) location.reload();
    });

ApiConnector.current((response) => {
    if (response.success === true) ProfileWidget.showProfile(response.data);
});

const ratesBoardUser = new RatesBoard();

function getStocksUser() {
    ApiConnector.getStocks((response) => {
        if (response.success === true) {
            ratesBoardUser.clearTable();
            ratesBoardUser.fillTable(response.data);
        }
    });
}

getStocksUser();

const interval = setInterval(getStocksUser, 60000);

logoutUser.action = () => {
    ApiConnector.logout((response) => {
        if (response.success === true) {
            location.reload();
            clearInterval(interval);
        } else {
            alert('Извините, что-то пошло не так');
        }
    });
};

const moneyUser = new MoneyManager();

//currency, amount === валюта, сумма

moneyUser.addMoneyCallback = (...item) =>
    ApiConnector.addMoney(...item, (response) => {
        if (response.success === true) {
            ProfileWidget.showProfile(response.data);
            moneyUser.setMessage(response.success, `Баланс пополнен.`);
        } else {
            moneyUser.setMessage(response.success, `Ошибка пополнения.`);
        }
    });

//fromCurrency, targetCurrency, fromAmount === из валюты, целевой валюты, из суммы

moneyUser.conversionMoneyCallback = (...item) =>
    ApiConnector.convertMoney(...item, (response) => {
        if (response.success === true) {
            ProfileWidget.showProfile(response.data);
            moneyUser.setMessage(
                response.success,
                `Конвертирование прошло успешно.`
            );
        } else {
            moneyUser.setMessage(response.success, `Ошибка конвертирования.`);
        }

        console.log(response);
    });

moneyUser.sendMoneyCallback = (...item) =>
    ApiConnector.transferMoney(...item, (response) => {
        if (response.success === true) {
            ProfileWidget.showProfile(response.data);
            moneyUser.setMessage(response.success, `Перевод выполнен.`);
        } else {
            moneyUser.setMessage(response.success, `Ошибка перевода.`);
        }
    });

const favoritesUser = new FavoritesWidget();

ApiConnector.getFavorites((response) => {
    if (response.success === true) {
        favoritesUser.clearTable();
        favoritesUser.fillTable(response.data);
        moneyUser.updateUsersList(response.data);
    }
});

favoritesUser.addUserCallback = (...item) =>
    ApiConnector.addUserToFavorites(...item, (response) => {
        if (response.success === true) {
            favoritesUser.clearTable();
            favoritesUser.fillTable(response.data);
            moneyUser.updateUsersList(response.data);
            favoritesUser.setMessage(
                response.success,
                `Пользователь добавлен.`
            );
        } else {
            favoritesUser.setMessage(
                response.success,
                `УПС пользователь не добавлен.`
            );
        }
    });

favoritesUser.removeUserCallback = (...item) =>
    ApiConnector.removeUserFromFavorites(...item, (response) => {
        if (response.success === true) {
            favoritesUser.clearTable();
            favoritesUser.fillTable(response.data);
            moneyUser.updateUsersList(response.data);
            favoritesUser.setMessage(
                response.success,
                `УРА Пользователь удален.`
            );
        } else {
            favoritesUser.setMessage(
                response.success,
                `УПС пользователь не удален.`
            );
        }
    });
