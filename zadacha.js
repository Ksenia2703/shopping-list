let theme = document.getElementById('mainThemeCss');
if (localStorage.getItem('theme') === 'lightTheme.css' || localStorage.getItem('theme') === 'darkTheme.css') {
    theme.attributes[2].textContent = localStorage.getItem('theme');
    if (localStorage.getItem('theme') === 'lightTheme.css' ) {
        document.querySelector('.tumbler').classList.toggle('tumbler--night-mode');
    }
}

let tableProduct = document.getElementById('tableProduct');
let tr;
let newTotalSum;
// исходное кол-во товара
let initialQuantity;
// исходная цена товара за шт
let initialPrice;
let number = 0;

const errorProduct = document.getElementById('error-product'); 
const errorQuantity = document.getElementById('error-quantity'); 
const errorPrice = document.getElementById('error-price'); 


const overlay = document.getElementById('overlay');
const addendum = document.getElementById('addendum');
const addModalWindow = document.getElementById('modalParameters');
const replaceWithSave = document.getElementById('dobav');

const product = document.getElementById('product');
const quantity = document.getElementById('quantity');
const price = document.getElementById('price');

addendum.addEventListener('click', () => {
    // addModalWindow.classList.remove('d-none');
    addModalWindow.classList.add('md-show');
    overlay.classList.remove('d-none');
    errorProduct.classList.add('d-none');
    errorQuantity.classList.add('d-none');
    errorPrice.classList.add('d-none');

    if (replaceWithSave.value === 'Сохранить') {
        replaceWithSave.value = 'Добавить';
    }
});

//смена цветовой темы страницы
const tumblerWrapper = document.querySelector('.tumbler__wrapper');
tumblerWrapper.addEventListener('click', () => {
    document.querySelector('.tumbler').classList.toggle('tumbler--night-mode');
    let theme = document.getElementById('mainThemeCss');
    // находим путь к нужному css файлу и меняем их 
    if (theme.attributes[2].textContent === 'lightTheme.css') {
        theme.attributes[2].textContent = 'darkTheme.css';
        localStorage.setItem('theme', 'darkTheme.css');
    } else {
        theme.attributes[2].textContent = 'lightTheme.css';
        localStorage.setItem('theme', 'lightTheme.css');
    }
});

// const dobav = document.getElementById('dobav');
addModalWindow.addEventListener('click', (e) => {
    //кусок html по которому кликнули
    let elementHtml = e.target;

    //кликнули по кнопке добавить
    if (elementHtml.classList.contains('click-add')) {
        // console.dir();
        let spanTotalSum = document.getElementById('totalSum');

        let fields = 
        [
            {
                'field':product,
                'error':errorProduct
            },
            {
                'field':quantity,
                'error':errorQuantity
            },
            {
                'field':price,
                'error':errorPrice
            }
        ];

        let countErrors = 0;
        fields.forEach(function(el) {
            if (el['field'].value === '') {
                el['error'].classList.remove('d-none');
                countErrors++;
            } else {
                el['error'].classList.add('d-none');
            }
        });

        if (countErrors > 0) {
            return;
        }

        if (replaceWithSave.value === 'Добавить') {
            number += 1;

            let td1 = document.createElement('td');
            td1.textContent = number;
            td1.classList.add('title-style');
            
            let td2 = document.createElement('td');
            td2.textContent = product.value;
            td2.classList.add('title-style-font');

            let td3 = document.createElement('td');
            td3.textContent = quantity.value + ' шт';
            td3.classList.add('title-style-font');

            let td4 = document.createElement('td');
            td4.textContent = price.value + ' p';
            td4.classList.add('title-style-font');

            let div1 = document.createElement('div');
            div1.innerHTML = '&#10004;';
            div1.classList.add('td-hov1');
            
            let div2 = document.createElement('div');
            div2.innerHTML = '&#10008;';
            div2.classList.add('td-hov2');

            let edit = document.createElement('div');
            edit.innerHTML = '&#9998;';
            edit.classList.add('edit');

            let td5 = document.createElement('td');
            td5.append(div1);
            td5.append(div2);
            td5.append(edit);

            let tr = document.createElement('tr');
            tr.classList.add('stroka');
            tr.append(td1);
            tr.append(td2);
            tr.append(td3);
            tr.append(td4);
            tr.append(td5);

            let tbody = document.querySelector('tbody');
            tbody.append(tr);

            // ищем спан 
            // let spanTotalSum = document.getElementById('totalSum');
            // заводим новую переменную в которую пихаем содержимое textContent
            let totalSum = +spanTotalSum.textContent;
            // нужно умножить кол-во товаров на цену и прибавить это к итогу
            // надо найти кол-во товаров, их цену и итог
            // нам нужна td которая будет 3(кол-во) и 4(цена) по счёту
            let productQuantity = +quantity.value;
            let productPrice = +price.value;
            let productSum = productQuantity * productPrice;
 
            // суммируем эту переменную со старой ценой в итоге
            totalSum += productSum;
            spanTotalSum.textContent = totalSum;
        } else {
            // в else прописаны действия которые произойдут при нажатии на "сохранить"
            console.dir(tr);
            // переписываем значения если поменяли их через карандаш 
            tr.children[1].textContent = product.value;
            tr.children[2].textContent = quantity.value + ' шт';
            tr.children[3].textContent = price.value + ' p';

            // ищем спан 
            // let spanTotalSum = document.getElementById('totalSum');
            // заводим новую переменную в которую пихаем содержимое textContent
            let totalSum = +spanTotalSum.textContent;
            // исходный итог (по результатм добавленых строк)
            let initialResult = totalSum;

            // исходная сумма строки (редактируемой)
            let initialAmountLine = initialQuantity * initialPrice;
            let updatedTotal = initialResult - initialAmountLine;
            // новая цена за шт
            let newPrice = price.value;
            // новое кол-во товара 
            let newQuantity = quantity.value;
            // новая сумма строки
            let newAmountLine = newPrice * newQuantity;
            // новый итог (который внизу таблицы)
            totalSum = updatedTotal + newAmountLine;
            // console.log(newTotalSum);
            spanTotalSum.textContent = totalSum;
        }

        // если в tableProduct есть класс d-none то мы его удаляем тем самым показывая таблицу
        if (tableProduct.classList.contains('d-none')) {
            tableProduct.classList.remove('d-none');
        }

        //очистить поля на форме
        product.value = '';
        quantity.value = '';
        price.value = ''; 
        
        //после того как проверили на пустые инпуты(поля ввода)
        //после того как сформировали нашу новую строку tr с данными из инпутов
        //после того как очистили наши инпуты на форме добавления
        //после всего этого закрываем наше модальное окно
        addModalWindow.classList.remove('md-show');
        overlay.classList.add('d-none');

        // let totalSum = getElementById('md-show')
    }

    //elementHtml - кусочек html на который мы нажали
    //если у него есть класс 'click-cancellation' - тогда закрываем модальное окно
    //кликнули по кнопке отмена
    if (elementHtml.classList.contains('click-cancellation')) {
        addModalWindow.classList.remove('md-show');
        overlay.classList.add('d-none');
    }
});

const myModal = document.getElementById('myModal');

const tableBody = document.getElementById('tableBody');
//событие клик будет срабатывать в любом месте tbody
tableBody.addEventListener('click', function(e) {
    // console.dir(this);
    //console.log(e);
    let span = e.target;
    //e - событие
    //e.target - html элемент на котором произошло событие (клик, наведение курсора и тд)
    //e.target.parentNode - в нашем случае td в котором находится наш span с галкой
    //e.target.parentNode.parentNode - в нашем случае искомая tr которую красим в зеленый цвет

    tr = span.parentNode.parentNode;
    //в условии проверяем соответсвует ли класс элемента нужному нам
    if (span.className === 'td-hov1') {
        //если соответствует то находим его родителя и добавляем родителю нужный класс
        tr.classList.add('str-stile')
        // console.log(e.target.parentNode.parentNode);
    }

    if (span.className === 'td-hov2') {
        myModal.classList.add('md-show');
        overlay.classList.remove('d-none');
    }

    // todo
    // клик на карандаш для редактирования 
    if (span.className === 'edit') {
        // путь к содержимому строки в ячейке "название"
        let productСontent = tr.children[1].textContent;
        // путь к содержимому строки в ячейке "кол-во шт" (только число)
        let quantityСontent = parseInt(tr.children[2].textContent);
        // путь к содержимому строки в ячейке "цена за шт" (только число)
        let priceСontent = parseInt(tr.children[3].textContent);

        // открывается нужная модалка 
        addModalWindow.classList.add('md-show');
        // удаляется класс и появляется наша полупрозрачная подложка
        overlay.classList.remove('d-none');
        // переменная в которой кнопка "добавить"
        const replaceWithSave = document.getElementById('dobav');
        // console.dir(replaceWithSave);
        // путь до текста, меняем "добавить" на "сохранить"
        replaceWithSave.value = 'Сохранить';

        let product = document.getElementById('product');
        product.value = productСontent;

        let quantity = document.getElementById('quantity'); 
        quantity.value = quantityСontent;
        
        let price = document.getElementById('price'); 
        price.value = priceСontent;

        // исходное кол-во товара
        initialQuantity = quantity.value;
        // исходная цена товара за шт
        initialPrice = price.value;
    }
});


myModal.addEventListener('click', (e) => {
    let сrossDiv = e.target;

    if (сrossDiv.className === 'hystmodal__close2') {
        myModal.classList.remove('md-show');
        overlay.classList.add('d-none');
    }

    // выполнится удаление строки 
    if (сrossDiv.className === 'hystmodal__close1') {
        myModal.classList.remove('md-show');
        overlay.classList.add('d-none');
        tr.remove();
        // после удаления мы должны пересчитать номера в первых ячейках строк в таблице
        // нужно пересчитывать если удалённая строка не последняя 
        // пересчитываем только те строки которые ниже удалённой 
        // ниже удалённой строки строки с номерами больше чем удалённая 

        // сразу преобразовываем к числу 
        // получаем текстовое содержимое(номер) - textContent(в нашем случае это номер строки), 
        // которое содержится в первой дочерней ячейке - firstElementChild(в нашем случае это первая td)
        const numberDeleteLine = +tr.firstElementChild.textContent;
        // ищем tr находящиеся внутри tbody 
        let tableLines = document.querySelectorAll('tbody tr');
        for (let i = 0; i < tableLines.length; i++) {
            let currentTr = tableLines[i];
            // currentTr текущая строка из коллекции tableLines ([i])
            let numberLine = +currentTr.firstElementChild.textContent;
            // если номер той строки которую мы удаляем меньше номеров строк 
            // то номера этих строк уменьшаем на еденицу
            if (numberDeleteLine < numberLine) {
                currentTr.firstElementChild.textContent = numberLine - 1;
            }
        }
        // если длина nodelist (по количеству tr в tbody) = 0 то мы добавляем класс d-none
        if (tableLines.length === 0) {
            tableProduct.classList.add('d-none');
        }
        // путь к содержимому строки в ячейке "название"
        let productСontent = tr.children[1].textContent;
        // путь к содержимому строки в ячейке "кол-во шт" (только число)
        let quantityСontent = parseInt(tr.children[2].textContent);
        // путь к содержимому строки в ячейке "цена за шт" (только число)
        let priceСontent = parseInt(tr.children[3].textContent);
        let totalAmount = quantityСontent * priceСontent;

        let spanTotalSum = document.getElementById('totalSum');
        let totalSum = spanTotalSum.textContent - totalAmount;
        spanTotalSum.textContent = totalSum;
    }
});







