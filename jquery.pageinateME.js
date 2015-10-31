/**
 * Created by Luke Hardiman on 1/11/2015.
 * PaginateME
 */
$.fn.paginateMe  = function(options) {
    var elm = $(this);
    //pass our options
    var defaults = {
        'pagenumbering' : '#pagnation',
        'pagemin' : 4
    };
    var settings = $.extend( {}, defaults, options );
    //count page numbers
    var countPagination = elm.length;
    var pageCount = Math.ceil(countPagination / settings.pagemin);
    var pageNumberArea = $(defaults.pagenumbering);
    console.log("pageCount",pageCount);


    //append btns
    pageNumberArea.append(
        '<span id="previous" class="btn btn-default  disabled">Previous</span> <span id="next" class="btn btn-default">Next</span>'
    );
    //set default index
    pageNumberArea.data('index',0);

    //bind to the next button
    $('#next',pageNumberArea).click(function(){
        var showFrom =  pageNumberArea.data('index') + settings.pagemin;
        showElements(showFrom);
        isDisabled(showFrom);
        //console.log("active",)
        //will be showing 4 so lets hide 4 actives and show next 4 actives
    });
    //bind to the next button
    $('#previous',defaults.pagenumbering).click(function(){
        var showFrom = $(this).data('index') - settings.pagemin;
        showElements(showFrom);
        isDisabled(showFrom);
    });

    function isDisabled(showFrom){
        //only process till we have reached max
        if (showFrom <= defaults.pagenumbering){
            pageNumberArea.data('index',showFrom);
            if ($(this).hasClass('disabled'))
                $(this).removeClass('disabled');
        }
        else
            $(this).addClass('disabled');
    }
    function showElements(showFrom){
        //loop all elements that should be showing
        var max = showFrom + defaults.pagemin;
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
    showElements(0);
};