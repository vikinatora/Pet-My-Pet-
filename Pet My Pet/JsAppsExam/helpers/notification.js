const notification = function(){
    const info= function(text){
        $('#infoBox>span').text(text);   
        $('#infoBox').show(); 
        $('#infoBox').on('click',function(){
            $('#infoBox').hide();
        }); 
        $('#infoBox').fadeOut(3000);

    };

    const error = function(text) {
        $('#errorBox>span').text(text);   
        $('#errorBox').show(); 
        $('#errorBox').on('click',function(){
            $('#errorBox').hide();
        }); 

    };

    return {
        info,
        error
    }
}();