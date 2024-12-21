import { createStore } from "vuex";

export default createStore({
  state: {
    todos: [],
  },
  mutations: {
    setTodos(state, todos) {
      state.todos = todos;
    },
  },
  actions: {
    addTodo({ commit, state }, todo) {
      const todos = [...state.todos, todo];
      commit("setTodos", todos);
    },
    removeTodo({ commit, state }, id) {
      const todos = state.todos.filter((todo) => todo.id !== id);
      commit("setTodos", todos);
    },
    toggleTodo({ commit, state }, id) {
      const todos = state.todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      );
      commit("setTodos", todos);
    },
  },
});
