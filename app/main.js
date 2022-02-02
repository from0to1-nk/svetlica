$(document).ready(function(){
// Переменные
    var foundation = 0,                                     // Фундамент
        kit = 0,                                            // Набор
        thickness = 0,                                     // Толщина
        floor = 0,                                          // Этаж
        square = 0,                                         // Площадь
        cut = 0,                                            // Сечение бруса
        text_error = "Что-то не выбрано",                   // Текст ошибки, когда что-то не выбрано или не заполнена площадь
        form_input = '.form__count',                        // Класс input'ов для проверки
        state_form = localStorage.getItem('state'),         // Состояние формы, хранящееся в localStorage
        waitTime = 15 * 60 * 1000,                          // Время ожидания 15 минут 30 * 60 * 1000
        modal_title = "",
        modal_theme = "",
        form_result = 0,
        project_item = $('.pjItem')


// Слайдер
    // Слайдер о компании
    $('#sliderAbout').lightSlider({
        loop:true,
        item:3,
        slideMargin:0,
        controls:false,
        pager:false,
        onSliderLoad: function() {
            $('#sliderAbout').removeClass('cS-hidden');
        } 
    });  
    
    
    $('.pjItem').each(function(){
        project_item.sort(function(a,b){
            var a1 = parseInt(a.getAttribute('data-hit')),
                b1 = parseInt(b.getAttribute('data-hit'));
                
            if(a1 > b1) {
        		return 1;
        	}
        	if(a1 < b1) {
        		return -1;
        	}
        	return 0;
            });  
        
        $('.pjWrap').html(project_item);
        
    })
    
// Select в проектах
    $('#projects_sort').on('change',function(){
        var option = $(this).val();
        
        project_item.sort(function(a,b){
            var a1 = parseInt(a.getAttribute('data-'+option)),
                b1 = parseInt(b.getAttribute('data-'+option));
                
            if(a1 > b1) {
        		return 1;
        	}
        	if(a1 < b1) {
        		return -1;
        	}
        	return 0;
            });  
        
        $('.pjWrap').html(project_item);
            
        
    });
    
// Калькулятор

    // Калькулятор __ Состояние формы
    //                Если localStorage = пустоте, то показывать форму,
    //                иначе прятать
        check_state_form = function(){
            if (state_form === null){
                $('.form__block_contacts').fadeIn();
                $('.form__block_contacts').removeClass('hide');
                $('.btn_count').attr('type','submit');
            }else{
                $('.form__block_contacts').addClass('hide');
                $('.btn_count').attr('type','button');
                $('.politic_calc').prev().css('display','none');
            }
        };
        
        check_state_form();

    // Калькулятор __ Обновление состояния формы
    //                После ожидания очищается localStorage 
        setTimeout(function(){
            localStorage.clear();
            check_state_form();
        }, waitTime);
        
    // Калькулятор __ Переменные заполняются значениями в зависимости
    //                от выбранного пункта (input - radiobutton) из группы, где
    //                value - значение, type - группа radiobuttons, функция принимает id инпута.
        var return_data = function(id_input){
            var value = $('#'+id_input).data('count'),
                type = $('#'+id_input).attr("name");
            
            if(type == 'set') kit = value;
            if(type == 'foundation') foundation = value;
            if(type == 'thickness') thickness = value;
            if(type == 'floors') floor = value;
            if(type == 'cut') cut = value;
        };
    
    // Калькулятор __ Сообщение формы
    //                Появление на определённое время и исчезновение
        var form_message = function( icon, message_type, message_text ){
            $('.form__message .form__icon').removeClass().addClass('form__icon');
            $('.form__message .form__text').removeClass().addClass('form__text');
            
            $('.form__message').addClass('active');
            $('.form__message .form__icon').addClass(icon+'-solid');
            $('.form__message .form__text').addClass('form__text_'+message_type).text(message_text);
            
            setTimeout(function(){
				$('.form__message').removeClass('active');
	      	}, 3000);
        };
    
    // Калькулятор __ Добавить ошибку
        var form_add_error = function(name){
            $(form_input+'[name='+name+']').next().children().first().addClass('form__error');
        };

    // Калькулятор __ Удалить ошибку
        var form_remove_error = function(name){
            $(form_input+'[name='+name+']').next().children().first().removeClass('form__error');
        };
        
    // Калькулятор __ Ошибки формы
    //                Проверяет каждую группу в зависимости от значения
    //                добавляется или удаляется ошибка
        var form_error = function(type){
            
            if( type == "house" ) {
                if (foundation === 0) { 
                    form_add_error('foundation'); 
                } 
                else { 
                    form_remove_error('foundation'); 
                }
                
                if (kit === 0) {
                    form_add_error('set');
                }
                else { 
                    form_remove_error('set'); 
                }
                if (thickness === 0) {
                    form_add_error('thickness');
                }
                else { 
                    form_remove_error('thickness'); 
                }
                
                if (floor === 0) {
                    form_add_error('floors');
                }
                else { 
                    form_remove_error('floors'); 
                }
            }
            
            if( type == "beam" ) {
                if (cut === 0) {
                    form_add_error('cut');
                }
                else { 
                    form_remove_error('cut'); 
                }    
            }
            
            if (square === 0) {
                $(form_input+'_square[name=square]').addClass('form__error');
            }
            else{
                $(form_input+'_square[name=square]').removeClass('form__error');
            }
            
        };
    
    // Калькулятор __ Проверка инпутов
        var check_inputs = function(type){
            if( type == "house" ) {
                
                if ( (foundation === 0) || (kit === 0) || (floor === 0) || (square === 0) || (thickness === 0) ) {
                    form_error(type);    
                    form_message('sad','error',text_error); 
                }
                else{
                    form_error(type);
                    return true;
                }
                
            }
            
            if( type == "beam" ) {
                
                if ( (cut === 0) || (square === 0)) {
                    form_error(type);    
                    form_message('sad','error',text_error); 
                }
                else{
                    form_error(type);
                    return true;
                }
                
            }
        };
    
    // Калькулятор __ Маска для телефона
        $(".tel").mask("+7(999) 999-99-99");
    
    // Калькулятор __ Клик по radiobutton'у. Забираю его id,
    //                вызываю функцию для присвоения значения переменным
        $(document).on('click','.form__count', function(){
            var id_input = $(this).attr('id');
            return_data(id_input);
        });
    
    // Калькулятор __ Изменяю инпут с площадью, присваиваю значение переменной
        $(document).on('change','.form__count_square', function(){
            if( $(this).val() === 0){
                form_error();    
            }
            square = $(this).val();
        });
        
    // Калькулятор __ Изменяя брус, меняется цена на сечение
        $(document).on('change','[name=set]', function(){
            var id_input = $(this).attr('id');
            
            if(id_input == 'set-1'){
                $('#thickness-1').val('185х205').attr('data-count', 22000);
                $('#thickness-2').val('185х164').attr('data-count', 22500);
                $('#thickness-3').val('185х123').attr('data-count', 23000);
                $('.js-tLabel_1').text('185х205');
                $('.js-tLabel_2').text('185х164');
                $('.js-tLabel_3').text('185х123');
            }
            
            if(id_input == 'set-2'){
                $('#thickness-1').val('190х190').attr('data-count', 25000);
                $('#thickness-2').val('140х190').attr('data-count', 18500);
                $('#thickness-3').val('140х140').attr('data-count', 13600);
                $('.js-tLabel_1').text('190х190');
                $('.js-tLabel_2').text('140х190');
                $('.js-tLabel_3').text('140х140');
            }
            
            if(id_input == 'set-3'){
                $('#thickness-1').val('190х190').attr('data-count', 22800);
                $('#thickness-2').val('140х190').attr('data-count', 16800);
                $('#thickness-3').val('140х140').attr('data-count', 12500);
                $('.js-tLabel_1').text('190х190');
                $('.js-tLabel_2').text('140х190');
                $('.js-tLabel_3').text('140х140');
            }
            
        });    
    
    
        var form_count = function(type){
            if (type == "house"){
                if (check_inputs(type)) {
                    form_result = (square * thickness) + (foundation * square);
                }
            }
            if (type == 'beam'){
                if (check_inputs(type)) {
                    form_result = square * cut;
                }
            }
        };
        
        var form_post = function(type){
            $.ajax({
                type: "POST",
                url: "assets/php/ajax_mail_calculator.php",
                data: $('.form').serialize(),
                success: function (response) {
                    
                    if (response == 'Заявка отправлена'){
                        
                        $('.form').trigger("reset");
                        
                	    form_message('smile','success',response);
                	    localStorage.setItem('state', '1');
                	    
                	    $('.wrap-politic').fadeOut(500);
                	    $('.form__block_contacts').fadeOut(500);
                	    $('.form__block_contacts').addClass('hide');
                	    $('.btn_count').attr('type','button');
                	    
                	    $('#result__count').text(form_result);
                        
                        if (type === 'house'){
                    	    foundation = kit = floor = square = 0;
                    	    thickness = 0;
                        }
                	    
                	    if (type === 'beam'){
                    	    cut = square = 0;
                        }
                        
                	    form_result = 0;
                	    
                    }
                    else{
                        console.log($(this).serialize());
                        form_message('sad','error',response);
                    } 
                    
                }
    		});    
        };
        
    // Калькулятор __ После отправки формы кнопка "submit" становится
    //                просто кнопкой, которая считает и всё.
        $(document).on('click','.btn_count', function(){
            var form_type = $('.form').data('form');
            
            form_count(form_type);
            
            if ($('.btn_count').attr('type') == 'button') {
                $('#result__count').text(form_result);    
            }
        });
    
    // Калькулятор __ Обработчик отправки данных из формы.
    //                Проверяю на состояние, где state_form, либо null, либо 1, если пусто в локальном - *null, то узнаю тип формы, ибо их может быть несколько
    //                и при каждом нажатии на кнопку "рассчитать" - *submit, отправляю тип формы(form_type - участвует почти везде) на проверку check_inputs,
    //                где проверяются у данной формы инпуты.
    //                Параллельно высчитывает результат инпутов (form_count(form_type);) в функции выше.
    //                Если всё гуд, то отправляю form_post()
        $(document).on('submit','.form', function(e){
            e.preventDefault();
            
            if(state_form === null){
                
                var form_type = $('.form').data('form');
                  
                if (check_inputs(form_type)) {
                    
                    $('#form__result').val(form_result);
                    form_post(form_type);
                }
    
            }
        
        });
    
    // Кнопка вызова модального окна
        $('.btn').on('click',function(){
            var type = $(this).data('type');
            
            if( type == "order" ){
                modal_theme = modal_title = "Заказать обратный звонок";
            }
            
            if( type == "getPrice"){
                modal_theme = modal_title = "Получить прайс на услуги";
            }
            
            if( type == "drying"){
                modal_title = "Оставить заявку на сушку";
                modal_theme = modal_title;
            }
            
            if( type == "beam"){
                modal_title = $(this).data('title');
                modal_theme = modal_title;
            }
            
            if( type == "project"){
                modal_title = $(this).data('title');
                modal_theme = "Страница "+modal_title;
            }
            
            if( type == "cut"){
                modal_title = "Оставить заявку на нарезку чаш по проекту";
                modal_theme = modal_title;
            }
            
            if( type == "saw"){
                modal_title = "Оставить заявку на строжку";
                modal_theme = modal_title;
            }
            
            if( type == "molded"){
                modal_title = "Получить прайс на погонажные изделия";
                modal_theme = modal_title;
            }
            
            if( type == "propil"){
                modal_title = "Оставить заявку на нарезку пропилов";
                modal_theme = modal_title;
            }
        });
        
        var getModalTitle = function(){
            $('.form__title').html(modal_title);
            $('#form_sub').val(modal_theme);
        };
            
    	$(".ajax_form").fancybox({
    		width		: 530,
    		minWidth	: 500,
    		height		: 600,
    		autoSize	: false,
    		closeClick	: false,
    		openEffect	:'fade',
    		closeEffect	:'fade',
    		openSpeed	: 200,
    		closeSpeed	: 50,
    		padding     : 0,
    		closeBtn    : 1,
            wrapCSS     : 'form_theme',
            overlay: {closeClick: true},
            afterShow: function() {
                getModalTitle();
            }
    	});
        
});

// Actions for home
$('.homeActions').bxSlider({
    mode: 'fade',
    easing: 'ease',
    speed: 200,
    randomStart: true,
    responsive: false,
    prevSelector: '.aNavL',
    nextSelector: '.aNavR',
    nextText: '&nbsp;',
    prevText: '&nbsp;',
    pager: false
});

// Best homes for home
$('.sliderProjects').bxSlider({
    slideWidth: 320,
    minSlides: 3,
    maxSlides: 3,
    easing: 'ease',
    responsive: false,
    prevSelector: '#pNavL',
    nextSelector: '#pNavR',
    nextText: '&nbsp;',
    prevText: '&nbsp;',
    pager: true
});

// Folder menu
$('.tmFolder').hover(function () {
    $(this).find('.tmHideMenu').stop(false).slideDown(200);
});
$('.tmFolder').mouseleave(function () {
    $(this).find('.tmHideMenu').stop(false).slideUp(200);
});
// House photo-box height
/*
$('#houseBox').height($(window).height());
$(window).resize(function() {
    $('#houseBox').height($(window).height());
});
*/

// slider for project page
$('#hPhotos').bxSlider({
	pagerCustom: '#hPager',
	infiniteLoop: false,
//    prevSelector: '#aNavL',
//    nextSelector: '#aNavR',
//    nextText: '&nbsp;',
//    prevText: '&nbsp;',
    adaptiveHeight: true,
	touchEnabled: true,
	controls: false
});
// slider for home page
$('#tb_slides').bxSlider({
    pager: false,
    controls: false, 
    speed: 1500,
    randomStart: true,
    auto: true,
    mode: 'fade',
    pause: 6000
});
//form
// mo_ajax_form_run();
moFormInteraction();

function moFormInteraction() {
    $('.input_text').focus(function () {
        $(this).addClass('it_focus').prev().addClass('qfl_has_value qfl_focus');
    });
    $('.input_text').focusout(function () {
        if(!$(this).val()){
            $(this).removeClass('it_focus').prev().removeClass('qfl_has_value qfl_focus');
        } else {
            $(this).removeClass('it_focus').prev().removeClass('qfl_focus');
        }
    });
}
// function mo_ajax_form_run(){

// }
var formSub = 'Заявка на обратный звонок';
$('.ajax_form').click(function(){
    formSub = $(this).attr('sub');
});
$.fn.ajax_form_pp = function () {
    $(this).submit(function () {
        var str = $(this).serialize()
        $.ajax({
            type: "POST",
            url: "assets/php/handler.php",
            data: str,
            success: function (msg) {
                if (msg == 'OK') {
                    result = '<div class="notification_ok"><h2>Спасибо!</h2>Запрос отправлен</div>';
                    $("#transfer_pp").hide();
                    setTimeout(function () {
                        $.fancybox.close();
                    }, 1500);
                } else {
                    result = msg;
                }
                $('#transfer_note_pp').html(result);
            }
        });
        return false;
    });
}
$.fn.ajax_form_page = function () {
    $(this).submit(function () {
        var str = $(this).serialize();
        $.ajax({
            type: "POST",
            url: "assets/php/handler.php",
            data: str,
            success: function (msg) {
                if (msg == 'OK') {
                    result = '<div class="notification_ok"><h2>Спасибо!</h2>Запрос отправлен</div>';
                    $("#transfer_page").hide();
                    setTimeout(function () {
                        $.fancybox.close();
                    }, 1500);
                } else {
                    result = msg;
                }
                $('#transfer_note_page').html(result);
            }
        });
        return false;
    });
}
function moFocusError() {
    $('input.f_error').focus(function () {
        $(this).removeClass('f_error').prev().removeClass('f_error');
    });
}
$('#transfer_page').ajax_form_page();
// end form

// project tabs
function moProjecTabs() {
    $('#prj_desc').click(function(event) {
      event.preventDefault();
      $('.prj_tab_item').hide();
      $('.prj_calc').removeClass('active');
      $(this).addClass('active');
      $('#prj_desc_cont').fadeIn(200);
    });
    $('#prj_calc').click(function(event) {
      event.preventDefault();
      $('.prj_tab_item').hide();
      $('.prj_desc').removeClass('active');
      $(this).addClass('active');
      $('#prj_calc_cont').fadeIn(200);
    });
}

// Print Fn
function print_doc(){window.print();}

// Num format
function number_format(number, decimals, dec_point, thousands_sep) {
  number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ' ' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec);
      return '' + (Math.round(n * k) / k)
        .toFixed(prec);
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
    .split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '')
    .length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1)
      .join('0');
  }
  return s.join(dec);
}

// Calc
function moCalc() {
    var	total_sum = 0;
    $('.opt_checked').removeClass('opt_checked');
	$("#calc_box input:checked").each(function() {
	    total_sum += parseInt($(this).val());
	    $(this).parent().addClass('opt_checked')
	});
	$("#total_cost_price").text(number_format(total_sum));
}
$('#calc_box input').click(function() {
    moCalc();
})