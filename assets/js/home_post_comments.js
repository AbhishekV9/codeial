{
    let createComment=function(){
        let newCommentForm=$(' .post-comments');
        newCommentForm.submit(function(e){
            e.preventDefault();

            // $.ajax({
            //     type='post',
            //     url:'comments/create',
            //     data:newCommentForm.serialize(),
            //     success:function(data){
            //         console.log(data);
            //     },error(data){
            //         console.log(error.responseText);
            //     }
            // });
        });
    }
}