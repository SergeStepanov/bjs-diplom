'use strict';

const logoutUser = new LogoutButton();

logoutUser.action = () =>
    ApiConnector.logout((data) => {
        if (data.success === true) location.reload();
    });

ApiConnector.current((data) => {
    if (data.success === true) ProfileWidget.showProfile(data.data);
});

const ratesBoardUser = new RatesBoard();

function getStocksUser() {
    ApiConnector.getStocks((data) => {
        if (data.success === true) {
            ratesBoardUser.clearTable();
            ratesBoardUser.fillTable(data.data);
        }
    });
}

getStocksUser();

setInterval(getStocksUser, 60000);

const moneyUser = new MoneyManager();

//currency, amount === валюта, сумма

moneyUser.addMoneyCallback = (...item) =>
    ApiConnector.addMoney(...item, (data) => {
        if (data.success === true) {
            ProfileWidget.showProfile(data.data);
            moneyUser.setMessage(data.success, `Баланс пополнен.`);
        } else {
            moneyUser.setMessage(data.success, `Ошибка пополнения.`);
        }
    });

//fromCurrency, targetCurrency, fromAmount === из валюты, целевой валюты, из суммы

moneyUser.conversionMoneyCallback = (...item) =>
    ApiConnector.convertMoney(...item, (data) => {
        if (data.success === true) {
            ProfileWidget.showProfile(data.data);
            moneyUser.setMessage(
                data.success,
                `Конвертирование прошло успешно.`
            );
        } else {
            moneyUser.setMessage(data.success, `Ошибка конвертирования.`);
        }

        console.log(data);
    });

moneyUser.sendMoneyCallback = (...item) =>
    ApiConnector.transferMoney(...item, (data) => {
        if (data.success === true) {
            ProfileWidget.showProfile(data.data);
            moneyUser.setMessage(data.success, `Перевод выполнен.`);
        } else {
            moneyUser.setMessage(data.success, `Ошибка перевода.`);
        }
    });

const favoritesUser = new FavoritesWidget();

ApiConnector.getFavorites((data) => {
    if (data.success === true) {
        favoritesUser.clearTable();
        favoritesUser.fillTable(data.data);
        moneyUser.updateUsersList(data.data);
    }
});

favoritesUser.addUserCallback = (...item) =>
    ApiConnector.addUserToFavorites(...item, (data) => {
        if (data.success === true) {
            favoritesUser.clearTable();
            favoritesUser.fillTable(data.data);
            moneyUser.updateUsersList(data.data);
            favoritesUser.setMessage(data.success, `Пользователь добавлен.`);
        } else {
            favoritesUser.setMessage(
                data.success,
                `УПС пользователь не добавлен.`
            );
        }
    });

favoritesUser.removeUserCallback = (...item) =>
    ApiConnector.removeUserFromFavorites(...item, (data) => {
        if (data.success === true) {
            favoritesUser.clearTable();
            favoritesUser.fillTable(data.data);
            moneyUser.updateUsersList(data.data);
            favoritesUser.setMessage(data.success, `УРА Пользователь удален.`);
        } else {
            favoritesUser.setMessage(
                data.success,
                `УПС пользователь не удален.`
            );
        }
    });
