// !function (e) 
// { "function" != typeof e.matches && (e.matches = e.msMatchesSelector || e.mozMatchesSelector || e.webkitMatchesSelector || function (e) { for (var t = this, o = (t.document || t.ownerDocument).querySelectorAll(e), n = 0; o[n] && o[n] !== t;)++n; return Boolean(o[n]) }), "function" != typeof e.closest && (e.closest = function (e) { for (var t = this; t && 1 === t.nodeType;) { if (t.matches(e)) return t; t = t.parentNode } return null }) }(window.Element.prototype);

document.addEventListener('DOMContentLoaded', function () {
    var //modalButtons = document.querySelectorAll('.js-open-modal'),
        overlay = document.querySelector('#overlay-modal'),
        closeButtons = document.querySelectorAll('.modal__cross');


    //modalButtons.forEach(function (item) {

    // item.addEventListener('click', function (e) {

    //     e.preventDefault();
    //     var modalId = this.getAttribute('data-modal'),
    //         modalElem = document.querySelector('.modal[data-modal="' + modalId + '"]');

    //     modalElem.classList.add('active');
    //     overlay.classList.add('active');
    // }); // end click
    modalElem = document.querySelector('.modal[data-modal="' + 'selLang' + '"]');
    modalElem.classList.add('active');
    overlay.classList.add('active');



    //}); // end foreach

    closeButtons.forEach(function (item) {
        item.addEventListener('click', function (e) {
            var parentModal = this.closest('.modal');
            parentModal.classList.remove('active');
            overlay.classList.remove('active');
        });
    }); // end foreach

}); // end ready

function checkInfo() {
    let langSub = document.getElementById('lang_submit').value.toString().toLowerCase();
    let dayNum = document.getElementById('lang_text');
    let flag = true;

    if (langSub === "ua") {
        dayNum.innerHTML = 'Введіть номер дня неділі від 1 до 7?';
    }
    else if (langSub === "en") {
        dayNum.innerHTML = 'Enter the day number of the week (from 1 to 7)?';
    }
    else {
        flag = false;
        alert('Not correctly! Не вірно');
    }

    if (flag) {
        modalElem = document.querySelector('.modal[data-modal="' + 'question' + '"]');
        modalElem.classList.add('active');
        let okDay = document.getElementById('okDay');
        okDay.addEventListener('click', function () {
            let day = +document.getElementById('day').value;
            if (isNaN(day)){
                langSub === "ua" ? alert('Це не число') : alert('Not a number!');
            }
            else{
                if (day >= 1 && day <= 7) {
                    getDayName(langSub, day);
                } else {
                    langSub === "ua" ? alert('Такого дня не існує') : alert('No such day!');
                }
            }

        })
    }

}

function getDayName(lang, day) {
    let resDay=document.getElementById('resDay');
    let text="";
    switch (day) {
        case 1: {
            lang === "ua" ? text='Понеділок' : text='Monday';
            break;
        }
        case 2: {
            lang === "ua" ? text='Вівторок' : text='Tuesday';
            break;
        }
        case 3: {
            lang === "ua" ? text='Середа' : text='Wednesday';
            break;
        }
        case 4: {
            lang === "ua" ? text='Четвер' : text='Thursday';
            break;
        }
        case 5: {
            lang === "ua" ? text='П\'ятниця' : text='Friday';
            break;
        }
        case 6: {
            lang === "ua" ? text='Субота' : text='Sutarday';
            break;
        }
        case 7: {
            lang === "ua" ? text='Неділя' : text='Sunday';
            break;
        }
    }
    resDay.innerHTML=text;
    var overlay = document.querySelector('#overlay-modal'),
    modalElem = document.querySelector('.modal[data-modal="' + 'resultDay' + '"]');
    modalElem.classList.add('active');
    overlay.classList.add('active');


}

