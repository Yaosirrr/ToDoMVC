(function (window) {
	'use strict';

	// Your starting point. Enjoy the ride!
	new Vue({
		el:"#todoapp",
		data(){
			return{
				newTodo: '',
				idForTodo: 4,
				savePre: '',
				filter: 'all',
				todos:[
					{ 'id': 1, 'title':"Python", 'completed':false, 'editing':false },
					{ 'id': 2, 'title':"Django", 'completed':false, 'editing':false },
					{ 'id': 3, 'title':"LeetCode", 'completed':false, 'editing':false },
				]}
		},
		directives: {
			focus: {
				inserted: function(el){
					el.focus()
				}
			}
		},
		methods:{
			addTodo(){
				if(this.newTodo.trim().length==0){return}
				this.todos.push({'id': this.idForTodo, 'title':this.newTodo,
				 				'completed':false, 'editing':false})
				this.newTodo=''
				this.idForTodo++
			},
			removeTodo(index){
				this.todos.splice(index,1)
			},
			editTodo(todo){
				this.savePre = todo.title
				todo.editing=true
			},
			doneEdit(todo){
				if(todo.title.trim().length==0){todo.title=this.savePre}
				todo.editing=false
			},
			cancelEdit(todo){
				todo.title = this.savePre
				todo.editing=false
			},
			checkAllTodos(){
				this.todos.forEach((todo)=>todo.completed = event.target.checked)
			},
			clearCompleted(){
				this.todos = this.todos.filter(todo=>!todo.completed)
			},

		},
		computed:{
			incomplete(){
                    return this.todos.filter(todo=>!todo.completed).length
            },
            anyRemaining(){
            	return this.incomplete != 0
            },
            todosFiltered(){
            	if(this.filter=='all'){
            		return this.todos
            	}
            	else if (this.filter == 'active'){
            		return this.todos.filter(todo=>!todo.completed)
            	}
            	else if (this.filter == 'completed'){
					return this.todos.filter(todo=>todo.completed)
            	}
            },
			showClearCompletedButton(){
				return this.todos.filter(todo=>todo.completed).length>0
			},


		}
		})

})(window);
