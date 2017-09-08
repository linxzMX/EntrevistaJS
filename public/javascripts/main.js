function PostManager(userId){
    var userId=userId,
        $modal=$('#modal'),
        $postContainer=$('#postContainer');
    
    function renderPosts(res){
        var postTemplate=`
            <div class="card">
                <img class="card-img-top" src="..." alt="Card image cap">
                <div class="card-block">
                    <h4 class="card-title">Card title</h4>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
            </div>
        `;
    }
    function fetchPosts(){
        axios.get('https://jsonplaceholder.typicode.com/posts',{params:{userId}})
             .then((res)=>renderPosts);
    }

    this.setUserId=(id)=>{
        userId=id;
        console.log(id);
        $modal.modal('toggle');
        fetchPosts();
    }
}

function User(params){
    var data={
        id:params.id,
        username:params.username,
        email:params.email,
        address:params.address,
        phone:params.phone,
        website:params.website,
        company:params.company
    };
    this.data=data;
    this.template=()=>`
        <tr>
            <td>${this.data.id}</td>
            <td>${this.data.email}</td>
            <td>${this.data.phone}</td>
            <td>
                <button type="button" @onclick="$(window).trigger('showPosts',[${data.id}])" type="button" class="btn btn-default">
                    <i class="fa fa-eye"></i>
                </button>
                
                <button type="button" onclick="$(window).trigger('removeUser',[${data.id}])" class="btn btn-danger">
                    <i class="fa fa-trash"></i>
                </button>
            </td>
        </tr>
    `;
}

Object.defineProperty(User.prototype,'data',{
    get:function(){
        return this._data;
    },  
    set:function(val){
        setTimeout(()=>$(window).trigger('changeUser',[this]),1);
        this._data=val;
    }
});

(function init(){
    var data={
        currentId:0,
        users:[],
        sorting:'id'
    };
    var postManager=new PostManager();
    //FETCH
    function fetchUsers(){
        axios.get('https://jsonplaceholder.typicode.com/users').then((res)=>{
            data.users.push.apply(data.users,res.data.map((params)=>createUser(params)));
            data.currentId=data.users[data.users.length-1].id+1;
        });
    };

    //USER
    function renderUsers(){
        var userContainer=document.getElementById('userContainer');
        var sorting=data.sorting;

        var usersTemplate=data.users.reduce((template,user)=>template+user.template(),'');
        userContainer.innerHTML=usersTemplate;
    };
    function removeUser(e,id){
        var index=data.users.findIndex(user=>user.data.id===id);
        if(index===-1)return;
        data.users.splice(index,1);
    };
    function createUser(params){
        var params=params || {
          id:data.currentId++  
        };
        var newUser=new User(params);
        return newUser;
    };
    
    //SORTING
    function setSorting(){
        
        renderUsers();
    }

    //SHOW POSTS
    function showPosts(){
        postManager.setUserId();
    }

    //EVENTS
    $(window).on('createUser',renderUsers)
             .on('removeUser',removeUser)
             .on('changeUser',renderUsers)
             .on('sorting',setSorting)
             .on('showPosts',()=>{
                alert(2);
             });



    fetchUsers();
})();