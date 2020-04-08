window.addEventListener('DOMContentLoaded', (event) => {

    function getGIF(userQuery){
        const key = "6X4aryqB9MRq0HmQ80Eh3GBw22RcLCx6";
        axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${key}&q=${userQuery}&limit=5&offset=0&rating=G&lang=en`)
        .then(data => {
            const parsedGIPHYData = JSON.parse(data.request.responseText)
            for (let i=0; i < 5; i++){
                console.log(parsedGIPHYData.data[i].images.fixed_height_small.url)
                $(`#gif${i+1}`).prop("src", parsedGIPHYData.data[i].images.fixed_height_small.url)
            }
        })
    }


    function setToHidden(nodeLists){
        let ids=nodeLists[0]
        ids.forEach(element => {
            if(element.type !== "file"){
                element.hidden=true;
            };
        })
    }
    



    function addIdToButton(nodeLists){
        var list = document.getElementsByClassName("toggleComments");
        let i=0;
        for (let item of list) {
            let att = document.createAttribute("id");   
            att.value = i++
            item.setAttributeNode(att)
        }
    }


    function toggleComments(n){
        
        let x=$(".comments")[n];
        
        console.log($(x).css('display'))
        
        if($(x).css('display') === 'none') {
            $(x).css('display', "block");
        }
        else if($(x).css('display')=== "block"){
            $(x).css('display', "none");
         }
    }

    

    $( document ).ready(function(){
    $("button").click(function() { 
        var t = $(this).attr('id'); 

        toggleComments(t)

        if($(this).text()==="Show Comments"){
            $(this).text("Hide Comments")
        }
        else if($(this).text()==="Hide Comments"){
            $(this).text("Show Comments")
        }
    
    });  


    $("#gifSearch").click(event => {
        event.preventDefault();
        let userQuery = $("#gif").val();
        getGIF(userQuery)
        console.log(userQuery)
    })

  
    $(".selectable").selectable({
        selected: function( event, ui ){
            const urlOfSelected = ui.selected.src;
            console.log(urlOfSelected)
            $("#selectedGif").val(urlOfSelected)
        }
      });
    })

    
    setToHidden([document.getElementsByName("ID")])
    addIdToButton([document.getElementsByClassName("toggleComments")])
})