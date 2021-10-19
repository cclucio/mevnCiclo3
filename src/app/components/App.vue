<template>
  <div>
    <nav class="navbar navbar-light bg-light">
      <a class="navbar-brand" href="/">MEVN Tasks</a>
    </nav>

    <div class="container">
      <div class="row pt-5">
        <div class="col-md-5">
          <div class="card">
            <div class="card-body">
              <form @submit.prevent="sendTask">
                <div class="form-group">
                  <input type="text" v-model="task.tittle" class="form-control" placeholder="Insert A Task">
                </div>
                <div class="form-group">
                  <textarea v-model="task.description" cols="30" rows="10" placeholder="Insert A Description" class="form-control"></textarea>
                </div>
                <template v-if="edit === false">
                    <button class="btn btn-primary btn-block">Send</button>
                </template>
                <template v-else>
                  <button class="btn btn-primary btn-block">Update</button>
                </template>
              </form>
            </div>
          </div>
        </div>
        <div class="col-md-7">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Task</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="task of tasks">
                        <td>{{task.tittle}}</td>
                        <td>{{task.description}}</td>
                        <td>
                            <button @click="deleteTask(task._id)" class="btn btn-danger">
                                Delete
                            </button>  
                            <button @click="editTask(task._id)" class="btn btn-secondary">
                                Edit
                            </button>                             
                        </td>
                    </tr>
                </tbody>
            </table>    
        </div>
        <!-- <div class="col-md-5">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Task</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
                <tr v-for="task of tasks">
                    <td>{{task.title}}</td>
                    <td>{{task.description}}</td>
                <td>
                  <button @click="deleteTask(task._id)" class="btn btn-danger">Delete</button>
                  <button @click="editTask(task._id)" class="btn btn-secondary">
                    Edit
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
    class Task {
        constructor(tittle, description) {
            this.tittle = tittle;
            this.description = description;
        }
    }
    
    export default {
        data() {
            return {
                task: new Task(),
                tasks: [],
                edit: false,
                taskToEdit: ''
            }
        },
        created(){
            this.getTasks();
        },
        methods: {
            sendTask() {
                if(this.edit == false) {
                    fetch('/tasks', {
                        method: 'POST',
                        body: JSON.stringify(this.task),
                        headers: {
                            'Accept': 'application/json',
                            'Content-type': 'application/json'
                        }
                    })
                    .then(res => res.json())
                    .then(data => {
                        this.getTasks();
                    })
                } else {
                    fetch('/tasks/' + this.taskToEdit, {
                        method: 'PUT',
                        body: JSON.stringify(this.task),
                        headers: {
                            'Accept': 'application/json',
                            'Content-type': 'application/json'
                        }
                    })
                    .then(res => res.json())
                    .then(data => {
                        this.getTasks();
                        this.edit = false;
                    });
                }
                
                this.task = new Task ();
            
            },
            getTasks() {
                fetch('/tasks')
                    .then(res => res.json())
                    .then(data => {
                        this.tasks = data;
                        console.log(this.tasks)
                    });
            },
            deleteTask(id) {
                fetch('/tasks/' + id, {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(data => {
                    this.getTasks();
                });
            },
            editTask(id) {
                fetch('/tasks/' + id)
                    .then(res => res.json())
                    .then(data => {
                        this.task = new Task(data.tittle, data.description);
                        this.taskToEdit = data._id;
                        this.edit = true;
                    });    

            }
        }
    }
</script>