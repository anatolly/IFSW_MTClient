angular.module('BMSClient.printfFilter', [])
    .filter('printf', function () {
        return function (str, val1, val2, val3, val4, val5) {
            if (val1)
                str = str.replace("{1}", val1.toString());
            if (val2)
                str = str.replace("{2}", val2.toString());
            if (val3)
                str = str.replace("{3}", val3.toString());
            if (val4)
                str = str.replace("{4}", val4.toString());
            if (val5)
                str = str.replace("{5}", val5.toString());
            return str;
        };
    });