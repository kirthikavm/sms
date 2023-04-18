
var listItem="";
var tagItem="";
var txtCnt = 0;
var utxtCnt = 0;


$("#add_question").submit(function(event){
    event.preventDefault();  
    if(txtCnt>=0){
        for(i=0;i<=txtCnt;i++){            
            tagItem = document.getElementById("tg"+i).value+','+tagItem;
        } 
    }  
   var unindexed_array=$(this).serializeArray();
    var data={};
    $.map(unindexed_array,function(n,i){
        data[n['name']]=n['value']
    })
    data.lstinput =removeLastComma(listItem);
    data.tagname  =removeLastComma(tagItem);
    var request= {
        "url":'http://localhost:3000/api/question',
        "method":"POST",
       "data":data

    }    
    $.ajax(request).done(function(response){
        alert("Data inserted successfully.");
    })
});

function removeLastComma(strng){        
    var n=strng.lastIndexOf(",");
    var a=strng.substring("",n) 
    return a;
}

$("#update_question").submit(function(event){   
    event.preventDefault();   
    alert("list :"+listItem);
    var tagcount = document.getElementById("tgchk").value;
    var str_array = tagcount.split(','); 
    txtCnt = str_array.length;
    tagItem="";
    if(txtCnt>=0 && tagItem!=""){        
         for(i=0;i<=txtCnt;i++){      
            tagItem = document.getElementById("tg"+i).value+','+tagItem;
        } 
    }  

    var unindexed_array=$(this).serializeArray();
    var data={};

    $.map(unindexed_array,function(n,i){
        data[n['name']]=n['value']
    }) 
    
    data.lstinput =removeLastComma(listItem);
    data.tagname  =removeLastComma(tagItem);

    var request= {
        "url":'http://localhost:3000/api/question/'+data.id,
        "method":"PUT",
        "data":data
    }

    $.ajax(request).done(function(response){
        alert("Data updated successfully.");
    })

});


//delete the record
if(window.location.pathname=="/"){

    $(document).ready(function(){
    
        $ondelete =$(".table tbody td a.delete");
        
        $ondelete.click(function(event){

            var id = $(this).attr("data-id");

            var request= {
                "url":'http://localhost:3000/api/question/'+id,
                "method":"DELETE"            
            }

            if(confirm("Do you really want to delete this record?")){
                $.ajax(request).done(function(response){
                    alert("Data deleted successfully.");
                });
            }

        });

});

}


$(document).ready(function(){
    $("#textId").hide();
    $("#listId").hide();
    $("#optionId").hide(); 
});


(function($){
    $('select[name=atype]').change(function(){
        if( $('select[name=atype] option:selected').val() == 'Text' ) {
            $('#listId').hide();
            $('#optionId').hide();
            $('#textId').show();
            $('#list').empty();
            $("input:radio[name=yes]").prop('checked', false);
            $("input:radio[name=no]").prop('checked', false);
        } else if ( $('select[name=atype] option:selected').val() == 'List' ) {
            $('#textId').hide();
            $('#optionId').hide();
            $('#listId').show();
            $('input[name=txtans').val('');
            $("input:radio[name=yes]").prop('checked', false);
            $("input:radio[name=no]").prop('checked', false);
        } else if ( $('select[name=atype] option:selected').val() == 'YesOrNo' ) {
            $('#textId').hide();
            $('#listId').hide();
            $('#optionId').show();
            $('input[name=txtans').val('');
            $('#list').empty();
        }else{
            $("#textId").hide();
            $("#listId").hide();
            $("#optionId").hide();
            $('input[name=txtans').val('');
            $('#list').empty();
            $("input:radio[name=yes]").prop('checked', false);
            $("input:radio[name=no]").prop('checked', false);
           
        }
    });
})(jQuery);



$("#addTag").click(function(){ 
    if(txtCnt==0){
        txtCnt = txtCnt + 1;
        $("#tagId").append('Tag Name :<input type="text"' +
        ' id=tg' + txtCnt + ' ><br><br>');  
    }else{
        alert("first :"+txtCnt);
        txtCnt = txtCnt + 1;
        var count = txtCnt - 1;
        alert(txtCnt);
        $("#tagId").append('Tag Name :<input type="text"' +
        ' id=tg' + count + ' ><br><br>');  
    }
        
 
 });

 $("#testButton").click(function(){
   let searchParams = new URLSearchParams(window.location.search); 
   var page = 1;     
   document.getElementById("testButton").href = "http://localhost:3000/testQuestion?"+searchParams+"&page="+page;
 })

 
 $("#nxtId").click(function(){
    var url=window.location.href;
    var arr=url.split('&')[0];
    let searchParams = new URLSearchParams(window.location.search);
    var paramcount = searchParams.get("page");
    var flag=false;
    if(paramcount!=null){
        var page = parseInt(paramcount) +1;
        arr = arr+"&page="+page;
    
    }

    var answer =  document.getElementById("answerid").value;
    var atype =  document.getElementById("atype").value;

    if(atype=="Text"){
       if(answer==document.getElementById("txtans").value){
            flag=true;
       }else{
            alert("Please Enter the correct value");
       }       
    }else if(atype=="YesOrNo"){        
        var selectedOption = $("input:radio[name=option]:checked").val();
         if(answer==selectedOption){
            flag=true;
        }else if(answer==selectedOption){
            flag=true;
        }else{
            alert("Please Select the correct option");
       }
    }else if(atype=="List"){
        var selectedOption = document.getElementById("list").value;
        if(answer==selectedOption){
            flag=true;
        }else{
            alert("Please Select the correct option");
       }
    }
    if(flag==true){
        document.getElementById("nxtId").href = arr;
    }
 })

 
 $("#radio_1").click(function(){
    let radBtnDefault = document.getElementById("radio_2");
    radBtnDefault.checked = false;
 });
 
 $("#radio_2").click(function(){
    let radBtnDefault = document.getElementById("radio_1");
    radBtnDefault.checked = false;
 });

 $("#btnAdd").click(function(e){
    
    e.preventDefault();
  
    // validate the option
    if (document.getElementById("lstinput").value == '') {
      alert('Please enter the name.');
      return;
    }
    // create a new option
    const option = new Option(document.getElementById("lstinput").value, document.getElementById("lstinput").value);
    // add it to the list
    document.getElementById("list").add(option, undefined);
   
    listItem =document.getElementById("lstinput").value +','+listItem;
  
    // reset the value of the input
    document.getElementById("lstinput").value = '';
    document.getElementById("lstinput").focus(); 

   
});

$(document).ready(function(){

if(document.getElementById("atype").value!=null && document.getElementById("atype").value=="Text"){       
    $("#textId").show();
}

if(document.getElementById("atype").value!=null && document.getElementById("atype").value=="YesOrNo"){       
    $("#optionId").show();
}

if(document.getElementById("atype").value!=null && document.getElementById("atype").value=="List"){       
    $("#listId").show();
}

});


if(document.getElementById("lstinput1").value!=null){
    var lstinput1 = document.getElementById("lstinput1").value;
    var str_array = lstinput1.split(',');                               
    for(i = 0; i < str_array.length; i++) {                    
        $('#list').append('<option value="'+str_array[i]+'">'+str_array[i]+'</option>');
    }     
        
}


if(document.getElementById("tgchk").value!=null){
            var tgchk = document.getElementById("tgchk").value;
            var str_array1 = tgchk.split(','); 
            txtCnt = str_array1.length;            
            document.getElementById("tg0").value= str_array1[0];             
            for(i = 1; i < str_array1.length; i++) {                        
                $('#tagId').append('Tag Name  :<input type="text" value="'+str_array1[i]+'" id=tg' + i + ' ><br><br>');

            }          
    
        
}






