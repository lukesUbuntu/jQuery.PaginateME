/**
 * Created by Luke Hardiman on 1/11/2015.
 * PaginateME
 */
$.fn.paginateMe  = function(options) {
    var elm = $(this);
    //pass our options
    var defaults = {
        'pagenumbering' : '#pagnation',
        'pagemin' : 4,
        'pageNextBTN' : '<span class="btn btn-default next">Next</span>',
        'pagePreviousBTN' : '<span class="btn btn-default disabled previous">Previous</span>'

    };
    var settings = $.extend( {}, defaults, options );
    //count page numbers
    var countPagination = elm.length;
    var pageCount = Math.ceil(countPagination / settings.pagemin);
    var pageNumberArea = $(settings.pagenumbering);
    console.log("pageCount",pageCount);


    //append btns
    pageNumberArea.append(
        settings.pagePreviousBTN + settings.pageNextBTN
    );
    //set default index
    pageNumberArea.data('index',0);

    //next button
    var nextBtn = $('.next',pageNumberArea);
    //previous button
    var prevBtn = $('.previous',pageNumberArea);

    //bind to the next button
    nextBtn.click(function(){
        pageNumberArea.data('index', pageNumberArea.data('index') + defaults.pagemin);
        showElements();
        isDisabled();
        //console.log("active",)
        //will be showing 4 so lets hide 4 actives and show next 4 actives
    });
    //bind to the next button
    prevBtn.click(function(){
        pageNumberArea.data('index', pageNumberArea.data('index') - defaults.pagemin);
        showElements();
        isDisabled();
    });


    function isDisabled(){
        //adds disabled if index is past pagination
       var currentIndex = pageNumberArea.data('index');

        console.log("isDisabled currentIndex",currentIndex)
        console.log("isDisabled countPagination",(countPagination - settings.pagemin))
        //only process till we have reached max
        if (currentIndex >= (countPagination - settings.pagemin)){
            console.log("disabling button")
            nextBtn.addClass('disabled');

            if (prevBtn.hasClass('disabled'))
                prevBtn.removeClass('disabled');
            console.log("isDisabled showFrom",currentIndex)
            //pageNumberArea.data('index',currentIndex);

        }
        else
        if (nextBtn.hasClass('disabled'))
            nextBtn.removeClass('disabled');
    }

    function showElements(){
        var showFrom =  pageNumberArea.data('index'); //+ settings.pagemin;

        //loop all elements that should be showing
        var max = showFrom + settings.pagemin;
        console.log("max",max)
        console.log("showFrom",showFrom)
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