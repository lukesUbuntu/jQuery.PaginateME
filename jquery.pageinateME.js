/**
 * Created by Luke Hardiman on 1/11/2015.
 * PaginateME
 */
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
    console.log("pageCount",pageCount);


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
            pageNumberArea.data('index', pageNumberArea.data('index') + defaults.pageMin);  //need to clean this up
            var p = this.get();
            this.set(++p);
        },
        prev : function(){
            pageNumberArea.data('index', pageNumberArea.data('index') - defaults.pageMin); //need to clean this up
            var p = this.get();
            this.set(--p);
        }
    };

    //bind to the next button
    nextBtn.click(function(){

        page.next();
        showElements();
        isDisabled();
        //console.log("active",)
        //will be showing 4 so lets hide 4 actives and show next 4 actives
    });
    //bind to the next button
    prevBtn.click(function(){
        page.prev();
        showElements();
        isDisabled();
    });


    function isDisabled(){

            if (prevBtn.hasClass('disabled'))
                prevBtn.removeClass('disabled');

            if (page.get() == 1)
                prevBtn.addClass('disabled');
            else
                prevBtn.removeClass('disabled');

            if (page.get() < pageCount)
                nextBtn.removeClass('disabled');

            if (page.get() == pageCount){
                console.log("adding disabled")
                nextBtn.addClass('disabled');
            }

    }

    function showElements(){
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
    }



    showElements();
};