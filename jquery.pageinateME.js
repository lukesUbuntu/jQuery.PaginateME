/**
 * Created by Luke Hardiman on 1/11/2015.
 * PaginateME
 */
(function($){
$.fn.paginateMe  = function(options) {
    var elm = $(this);
    //pass our options
    var defaults = {
        'pageNumbering' : '#pagnation',
        'pageMin' : 4,
        'pageNextBTN' : '<span class="btn btn-default next">Next</span>',
        'pagePreviousBTN' : '<span class="btn btn-default disabled previous">Previous</span>',
        'pageNextBTNElement' : '.next',
        'pagePreviousBTNElement' : '.previous'
    };

    var settings = $.extend( {}, defaults, options );

    //count page numbers
    var countPagination = elm.length;
    var pageCount = Math.ceil(countPagination / settings.pageMin);
    var pageNumberArea = $(settings.pageNumbering);

    if (countPagination < settings.pageMin){
        console.log("paginateMe, not applying not enough results",countPagination);
        return false;
    }



    //append btns
    pageNumberArea.append(
        settings.pagePreviousBTN + settings.pageNextBTN
    );
    //set default index
    pageNumberArea.data('index',0);
    pageNumberArea.data('pageCount',1);

    //next button
    var nextBtn = $(settings.pageNextBTNElement,pageNumberArea);
    //previous button
    var prevBtn = $(settings.pagePreviousBTNElement,pageNumberArea);

    //handles moving pages
    var page = {
        get : function(){
            return  parseInt(pageNumberArea.data('pageCount'));
        },
        set : function(page){
            pageNumberArea.data('pageCount',page);
        },
        next: function(){
            if ($(this).hasClass('disabled')) return;
            pageNumberArea.data('index', pageNumberArea.data('index') + defaults.pageMin);  //need to clean this up
            var p = page.get();
            page.set(++p);

            page.render();
        },
        prev : function(){
            if ($(this).hasClass('disabled')) return;
            pageNumberArea.data('index', pageNumberArea.data('index') - defaults.pageMin); //need to clean this up

            var p = page.get();
            page.set(--p);

            page.render();

        },
        render: function(){
            var showFrom =  pageNumberArea.data('index'); //+ settings.pagemin;

            //loop all elements that should be showing
            var max = showFrom + settings.pageMin;

            $.each(elm,function(index,element){

                if (index >= showFrom && index < max){
                    if ($(this).hasClass('hide'))$(this).removeClass('hide');
                    $(this).addClass('active');
                }
                else{
                    if ($(this).hasClass('active'))$(this).removeClass('active');
                    $(this).addClass('hide');
                }

            });
            page.isDisabled();
        },
        isDisabled : function(){
            if (prevBtn.hasClass('disabled'))
                prevBtn.removeClass('disabled');

            if (page.get() == 1)
                prevBtn.addClass('disabled');
            else
                prevBtn.removeClass('disabled');

            if (page.get() < pageCount)
                nextBtn.removeClass('disabled');

            if (page.get() == pageCount){
                nextBtn.addClass('disabled');
            }
        }
    };

    //bind to the next button
    nextBtn.click(page.next);
    //bind to the next button
    prevBtn.click(page.prev);

    page.render();


};
})(jQuery);