(function() {
    let todos = [];

    const bodyDay = document.querySelector('.body__day');
    const bodyDate = document.querySelector('.body__date');
    const todoAddBtn = document.querySelector('.todo__btn');
    const todoInput = document.querySelector('.todo__input');
    const todoListPending = document.querySelector('.todo__list--pending');

    const dayNames = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wndesday',
        'Thursday',
        'Friday',
        'Saturday',
    ]

    const localDB = {
        setItem(key,value) {
            value = JSON.stringify(value);
            localStorage.setItem(key,value);           
        },
        // localDB.getItem('todos')
        getItem(key) {
            const value = localStorage.getItem(key);
            if (!value) {
                return null;
            }
            return JSON.parse(value);
        },
        // localDB.removeItem('todos')
        removeItem(key) {
            localStorage.removeItem(key);
        }
    };

    // Initialize the applticaton
    // inditaskor lefut
    const init = () => {
        showDate();
        setListeners();
        loadExistingTodos();
    };

        // meglevo todok betoltese
    const loadExistingTodos = () => {
            
        // betolti a todokat
        const savedTodos = localDB.getItem('todos');
        if (savedTodos) {
             todos = savedTodos;
         }
            
        // megjeleniti a todokat ha vannak
        if (todos && Array.isArray(todos)) {        // ha van vami a todosban es az tomb
            todos.forEach( todo => showTodo(todo) );
        }
    };
    
    


    // show date
    const showDate = () => {
        const currentDate = new Date();
        const day = [
            currentDate.getMonth(),
            currentDate.getDay(),
            currentDate.getFullYear(),
        ].map( num => num < 10 ? `0${num}` : num);

        bodyDay.textContent = dayNames[currentDate.getDay()];
        bodyDay.textContent = day.join('-');
    }


    const setListeners = () => {
        todoAddBtn.addEventListener('click', addNewTodo);
    };


    // save todo to db
    const addNewTodo = () => {
        const value = todoInput.value;
        if (value === '') {
            return;
        }

        const todo = {
          text: value,
         done: false
        }

        todos.push(todo);

        // adat neve 'todos', a masik meg a tartalma
        // a localStorage-ban key:todos value: 2. sorbol a todos tomb, atalakitva json formatumba
        localDB.setItem('todos', todos);

        // 94. sor
        showTodo(todo);

        // kiuriti az input mezot    
        todoInput.value = '';

    };


    // display todo in the leist
    const showTodo = todo =>  {

        const todoItem = document.createElement('div');     // letrehozzuk
        todoListPending.appendChild(todoItem);              // a todoItem-et div-et hozzaadjuk a html-ben a todoListPending-hez 8. sor, 

        todoItem.innerHTML = `
            <input type="checkbox">
            <span>${todo.text}</span>
            <button><i class="fa fa-trash"></i></button>
        `;
    };

    init();
})();