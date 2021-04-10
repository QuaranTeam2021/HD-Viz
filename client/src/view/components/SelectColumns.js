/* eslint-disable */
const TodoList = observer(({ store }) => {
    const onNewTodo = () => {
      store.addTodo(prompt('Enter a new todo:', 'coffee plz'));
    }
  
    return (
      <div>
        { store.report }
        <ul>
          { store.todos.map((todo, idx) => <TodoView todo={ todo } key={ idx } />) }
        </ul>
        { store.pendingRequests > 0 ? <marquee>Loading...</marquee> : null }
        <button onClick={ onNewTodo }>New Todo</button>
        <small> (double-click a todo to edit)</small>
        <RenderCounter />
      </div>
    );
  })

/*
  return (
    
    <div id="columns" /*ref={this.bello} finecommento/*>
      
      <FormGroup row>
        <FormControlLabel
          control={<PurpleCheckbox checked={state.checkedA} onChange={handleChange} name="checkedA" />}
          label="Colonna1"
        />
        <FormControlLabel
          control={< PurpleCheckbox checked={state.checkedB} onChange={handleChange} name="checkedB" />}
          label="Colonna2"
        />
        <FormControlLabel
          control={<PurpleCheckbox checked={state.checkedC} onChange={handleChange} name="checkedC" />}
          label="Colonna3"
        />
        <FormControlLabel
          control={<PurpleCheckbox checked={state.checkedD} onChange={handleChange} name="checkedD" />}
          label="Colonna4"
        />
        <FormControlLabel
          control={<PurpleCheckbox checked={state.checkedE} onChange={handleChange} name="checkedE" />}
          label="Colonna5"
        />
      </FormGroup>
    </div>
  );
} */