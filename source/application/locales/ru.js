angular.module('BMSClient.application.locales.ru', [])
    .constant('RU-locale',
    {
        server: {
            connectionInit             : '<br/><br/><h1 class="appLoadingTitle">{1}</h1>Устанавливаем связь с веб-сервисом системы...',
            notRespond                 : '<h1 class="appLoadingTitle">{1}</h1>Веб-сервис системы не отвечает <br>({2})<br><br>Попробуйте обновить страницу позже <br> или обратитесь в техническую поддержку',
            notCorrectRespond          : '<h1 class="appLoadingTitle">{1}</h1>Веб-сервис системы отвечает не корректно<br>({2})<br><br>Попробуйте обновить страницу позже <br> или обратитесь в техническую поддержку'
            //respondWindowTitle         : 'Ответ веб-сервиса системы'
        },

        common: {
            version                    : 'Версия',
            error                      : 'Ошибка'
        },

        welcome: {
            login                      : 'Логин',
            email                      : 'Ящик электронной почты',
            password                   : 'Пароль',
            rememberMe                 : 'Запомнить меня',
            loginTitle                 : 'Вход в систему',
            loginButton                : 'Войти',
            loginErrorTitle            : 'Ошибка входа в систему'
        },

        activeUser: {
            logout                     : 'Выйти'
        }
    });

//var WEBSERVICE_WINDOW_SUCCESS_TEXT              = 'Команда на сервере выполнена успешно';
//var WSPACE_DESKTOP_UPDATE_DB_DO_BUTTON          = 'Обновить данные на сервере';
