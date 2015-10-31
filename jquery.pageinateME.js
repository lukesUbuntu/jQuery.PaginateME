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
    console.log("pageCount",pageCount);


    //append btns
    $(defaults.pagenumbering).append(
        '<span id="previous" data-index="0" class="btn btn-default  disabled">Previous</span> <span id="next" data-index="0" class="btn btn-default">Next</span>'
    );

    //bind to the next button
    $('#next',defaults.pagenumbering).click(function(){
        var showFrom = $(this).data('index') + settings.pagemin;
        showElements(showFrom);

        if (showFrom <= defaults.pagenumbering)
            $(this).data('index',showFrom);
        else
            $(this).addClass('disabled');
        //console.log("active",)
        //will be showing 4 so lets hide 4 actives and show next 4 actives
    });


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