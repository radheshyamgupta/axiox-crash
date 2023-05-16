// GET REQUEST
function getTodos() {
    // console.log('GET Request');
    // axios({
    //     method:"get",
    //     url:"https://jsonplaceholder.typicode.com/todos",
    //     params: {
    //         _limit: 10
    //       }
    // })

    axios
    .get("https:jsonplaceholder.typicode.com/todos?_limit=5")
    .then(function(res)
    {
        showOutput(res)
    })
    .catch(function(error){
console.log(error)
    })
}

  
  
  // POST REQUEST
  function addTodo() {
    console.log('POST Request');
     axios.
     post( "https://jsonplaceholder.typicode.com/todos",
     {title:"new todo" ,completed:false})
    
    .then(function(res)
    {
        showOutput(res)
    })
    .catch(function(error){
console.log(error)
    })
}
    

      
        
     
    
  
  
  // PUT/PATCH REQUEST
  function updateTodo() {
    console.log('PUT/PATCH Request');
    axios.
    put( "https://jsonplaceholder.typicode.com/todos/1",
    {title:" updatd new todo" ,completed:true})
   
   .then(function(res)
   {
       showOutput(res)
   })
   .catch(function(error){
console.log(error)
   })
  }
  
  // DELETE REQUEST
  function removeTodo() {
    console.log('DELETE Request');
    axios.
    delete( "https://jsonplaceholder.typicode.com/todos/1")
   
   .then(function(res)
   {
       showOutput(res)
   })
   .catch(function(error){
console.log(error)
   })
  }
  
  // SIMULTANEOUS DATA
 
  function getData() {
    console.log('Simultaneous Request');
    
    const request1 = axios.get("https://jsonplaceholder.typicode.com/todos?_limit=5");
    const request2 = axios.get("https://jsonplaceholder.typicode.com/posts?_limit=5");
    const request3 = axios.get("https://jsonplaceholder.typicode.com/users?_limit=5");
  
    Promise.all([request1, request2, request3])
      .then(function(responses) {
        const [response1, response2, response3] = responses;
        // Handle the responses here
        showOutput(response1);
        showOutput(response2);
        showOutput(response3);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  
  // CUSTOM HEADERS
  function customHeaders() {
    console.log('Custom Headers');
  
    const headers = {
      'Authorization': 'Bearer your_token_here',
      'Content-Type': 'application/json',
      'X-Custom-Header': 'Custom Value'
    };
  
    axios.get("https://jsonplaceholder.typicode.com/todos", { headers })
      .then(function(response) {
        // Handle the response here
        showOutput(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  
  // TRANSFORMING REQUESTS & RESPONSES
  function transformResponse() {
    console.log('Transform Response');
  
    const transformData = function (data) {
      // Modify the response data here
      return data.map(item => ({
        id: item.id,
        title: item.title.toUpperCase(),
        completed: item.completed
      }));
    };
  
    axios.get("https://jsonplaceholder.typicode.com/todos", {
      transformResponse: [function (data) {
        // Parse the original response data
        return transformData(JSON.parse(data));
      }]
    })
      .then(function (response) {
        // Handle the transformed response here
        showOutput(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  
  
  
  // ERROR HANDLING
  function errorHandling() {
    console.log('Error Handling');
  
    axios.get("https://jsonplaceholder.typicode.com/todos")
      .then(function (response) {
        // Handle the successful response here
        showOutput(response);
      })
      .catch(function (error) {
        // Handle the error here
        console.log('Error:', error.message);
      });
  }
  
  
  // CANCEL TOKEN
  function cancelToken() {
    console.log('Cancel Token');
  
    // Create a cancel token source
    const cancelTokenSource = axios.CancelToken.source();
  
    axios.get("https://jsonplaceholder.typicode.com/todos", {
      cancelToken: cancelTokenSource.token
    })
      .then(function (response) {
        // Handle the successful response here
        showOutput(response);
      })
      .catch(function (error) {
        // Handle the error here
        if (axios.isCancel(error)) {
          console.log('Request canceled:', error.message);
        } else {
          console.log('Error:', error.message);
        }
      });
  
    // Cancel the request
    cancelTokenSource.cancel('Request canceled by user');
  }
  
  // INTERCEPTING REQUESTS & RESPONSES
  
  // AXIOS INSTANCES
  
  // Show output in browser
  function showOutput(res) {
    document.getElementById('res').innerHTML = `
    <div class="card card-body mb-4">
      <h5>Status: ${res.status}</h5>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Headers
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.headers, null, 2)}</pre>
      </div>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Data
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.data, null, 2)}</pre>
      </div>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Config
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.config, null, 2)}</pre>
      </div>
    </div>
  `;
  }
  
  // Event listeners
  document.getElementById('get').addEventListener('click', getTodos);
  document.getElementById('post').addEventListener('click', addTodo);
  document.getElementById('update').addEventListener('click', updateTodo);
  document.getElementById('delete').addEventListener('click', removeTodo);
  document.getElementById('sim').addEventListener('click', getData);
  document.getElementById('headers').addEventListener('click', customHeaders);
  document
    .getElementById('transform')
    .addEventListener('click', transformResponse);
  document.getElementById('error').addEventListener('click', errorHandling);
  document.getElementById('cancel').addEventListener('click', cancelToken);
  