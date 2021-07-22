{
    //method to submit the form data for new post using AJAX
    let createPost=function(){
        let newPostForm=$('#new-post-form');

        //now whenever this form is submitted i don't want it to be submitted naturally so using prevent default
        newPostForm.submit(function(e){
            e.preventDefault();//now submit button will not work natually
            //submiting it manually through ajax
            
            $.ajax({
                type:'post', //it is a post request
                url:'/posts/create',
                data:newPostForm.serialize(),  //this converets the form data into json like content would be the key and value will be the value filled in the form
                success: function(data){//the argument data corosponds to the complete hash
                    //console.log(data);
                    let newPost=newPostDom(data.data.post);
                    $("#posts-list-container>ul").prepend(newPost); //prepend means appending at the start of the list
                    deletePost($(' .delete-post-button',newPost));

                    //calling postcomments class in home_post_comments.js
                    new PostComments(data.data.post._id);

                    new Noty({
                        theme: 'relax',
                        text: "Post published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }
    //after submitting the form we will recive it in post controller



    //method to create a post using DOM
    let newPostDom=function(post){
        return $(`<li id="post-${post._id}">
                    <p>
                        
                    <small>
                        <a class='delete-post-button' href="/posts/destroy/${post._id}">X</a>
                    </small>
                
                    ${post.content}  
                    <br>
                    <small>
                            ${ post.user.name}
                    </small>     
                    </p>
                    <div class="post-comments">
                        
                            <form id="post-${ post._id }-comments-form"  action="comments/create" method="POST">
                                    <input type="text" name="content" placeholder="type here to add comment..." required>
                                    <!-- sending the id of the post to wich i need to add comment -->
                                    <input type="hidden" name="post" value="${post._id}">
                                    <input type="submit" value="ADD COMMENT">
                            </form> 
                            
                        
                
                        <div class='post-comments-list'>
                            <ul id='post-comments-${post._id}'>
                            </ul>
                        </div>
                    </div>
    </li>     `)
    }

    //method to delte a post from DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
            
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'), //this is how you get the value of href
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                    new Noty({
                        theme: 'relax',
                        text: "Post Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },error: function(error){
                    console.log(error.responseText);
                }
            });

        });
    }

    let convertPostsToAjax = function(){
        $('#posts-list-container>ul>li').each(function(){
            let self = $(this);
            let deleteButton = $(' .delete-post-button', self);
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1] //prop is used to access property
            console.log(postId);
            
            new PostComments(postId);
           
        });
    }

    createPost();
    convertPostsToAjax();
  
}

