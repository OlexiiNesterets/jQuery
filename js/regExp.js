'use strict';

(function () {

    /* Задание 1.1
Из строки, содержащей набор слов, разделенных пробелами, нужно извлечь все числа, 
которые НЕ являются частью идентификаторов. Строка может быть, например, такой:
"a12 444 g224b 78 0 q0234 5"
Для приведенного примера должно вернуть: 444, 78, 0 и 5. */

    function getAllNumbers(string) {

        return string.match(/\b\d+\b/g);
    }

    var task1 = "a12 444 g224b 78 0 q0234 5";

    console.log( getAllNumbers(task1) );



    /* Задание 1.5
Строка содержит набор слов, разделенных одиночными пробелами. 
Нужно удалить из строки все слова, начинающиеся с заглавной буквы. */

    function deleteCap(string) {

        return string.replace(/[A-ZА-ЯЁ].+?(\s|\b)/g, '').trim();
    }

    var z = 'Hello red Человек Blue ракета Doo man Вася муха cat Dog';
    console.log(deleteCap(z));



    /* Задание 1.7
Удалить  из строки А все символы, которые содержатся в строке Б. */

    function intersector(string, stringForIntersect) {

        var reg = new RegExp('[' + string + ']', 'g');

        return stringForIntersect.replace(reg, '');
    }

    var s1 = 'hi, it\'s me!';
    var s2 = 'Hello, my name is Dmitriy!';

    console.log(intersector(s1, s2));



    /* Задание 2.1
Дана строка, содержащая номер кредитной карточки, номер заказа или другую информацию, 
показывать которую посторонним не нужно. Длина строки может быть произвольной, но больше 8 символов. 
Нужно оставить первые 3 и последние 4 символа, а остальные заменить звездочками. 
Результирующая строка должна быть той же длины, что и исходная. 
Например, "DE56986623670976937041" должно превратиться в "DE5***************7041" */

    var task2 = "DE56986623670976937041";

    function replaceWithStars(string) {

        if (string.length >= 8) {

            return string.replace(/(.{3})(.+)(.{4})/, function (str, p1, p2, p3) {

                var amount = p2.length;

                var stars = new Array(amount + 1).join('*');

                return p1 + stars + p3;
            });
        }

        return null;
    }

    console.log( replaceWithStars(task2) );



    /* Задание 2.2
Номер кредитной карточки состоит из 16 цифр, записанных слитно. 
Однако этот номер можно условно разделить на 4 секции по 4 цифры. 
Нужно при помощи РВ проверить, есть ли в номере кредитки одинаковые секции. 
“0000 1111 2222 3333” - not match
“0000 1111 2222 0000” - match
“9999 9999 9999 9999” - match
“1234 3456 1288 0012” - not match */

    function hasMatchingParts(string) {

        if (string.length === 16) {

            var reg = /(\d{4})/g;

            var clusters = string.match(reg);

            for (var i = 0; i < clusters.length; i++) {

                for (var j = i + 1; j < clusters.length; j++) {

                    if (clusters[i] === clusters[j]) {

                        return true;
                    }
                }
            }

            return false;
        }

        return null;
    }

    var cardNumber = '1234345612880012';

    console.log( hasMatchingParts(cardNumber) );



    /* Задание 2.4
Есть массив строк. Каждая строка является датой. 
var list = [“12-3-2018”, “11-20-2018”, “1-1-2018”, “3-3-2018”, “3-4-2018”, “4-3-2011”, “11-12-2018”, “8-18-2011”];
Самый нормальный формат даты такой: YYYY-MM-DD. 
4 цифры для года, всегда 2 цифры для номера месяца и всегда 2 цифры для номера дня. 
Если месяц или день обозначаются одной цифрой, то добавляем лидирующий ноль. 
Такой способ записи даты действительно является самым лучшим, т.к. позволяет сортировать даты как строки. 
Но формат записи даты в условии задания отличается от нормального. 
Нет лидирующих нулей, сначала идет месяц, потом день, потом - год.
Нужно при помощи РВ преобразовать ненормальные даты в нормальные, 
отсортировать их как строки и вывести отсортированный массив. */

    function dateStandartization(arr) {

        for (var i = 0; i < arr.length; i++) {

            arr[i] = arr[i].replace(/(\d{1,2})-(\d{1,2})-(\d{4})/g, function (str, p1, p2, p3) {

                p1 = p1.length === 1 ? (0 + p1) : p1;

                p2 = p2.length === 1 ? (0 + p2) : p2;

                return p3 + '-' + p1 + '-' + p2;
            });
        }

        return arr.sort();
    }

    var list = ['12-3-2018', '11-20-2018', '1-1-2018', '3-3-2018', '3-4-2018', '4-3-2011', '11-12-2018', '8-18-2011'];

    console.log( dateStandartization(list) );

})();