<template>
  <div class="todo-container">
    <h1>待辦清單</h1>
    <div class="input-container">
      <input
        v-model="newTodo"
        @keyup.enter="handleAddTodo"
        placeholder="新增待辦事項"
        class="todo-input"
      />
      <input
        type="date"
        v-model="newDate"
        class="date-input"
        @keyup.enter="handleAddTodo"
      />
      <button @click="handleAddTodo" class="add-button">新增</button>
    </div>

    <div class="buttons">
      <button
        @click="showIncomplete"
        :class="{ active: currentView === 'incomplete' }"
      >
        未完成
      </button>
      <button
        @click="showComplete"
        :class="{ active: currentView === 'complete' }"
      >
        已完成
      </button>
    </div>

    <div v-if="currentView === 'incomplete'" class="todo-content">
      <ul class="todo-list">
        <li v-for="todo in incompleteTodos" :key="todo.id" class="todo-item">
          <span v-if="!todo.editing">{{ todo.text }} {{ todo.date }}</span>
          <input
            v-else
            v-model="todo.text"
            @keyup.enter="stopEditing(todo)"
            class="edit-input"
          />
          <div class="icon-container">
            <button
              v-if="!todo.editing"
              @click="startEditing(todo)"
              class="icon-button edit-button"
            >
              <i class="fas fa-edit"></i>
            </button>
            <button
              v-if="todo.editing"
              @click="stopEditing(todo)"
              class="icon-button save-button"
            >
              <i class="fas fa-check"></i>
            </button>
            <button
              v-if="!todo.editing"
              @click="toggleDone(todo.id)"
              class="icon-button complete-button"
            >
              <i class="fas fa-check-circle"></i>
            </button>
            <button
              v-if="!todo.editing"
              @click="removeTodoItem(todo.id)"
              class="icon-button delete-button"
            >
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </li>
      </ul>
    </div>

    <div v-if="currentView === 'complete'" class="todo-content">
      <ul class="todo-list">
        <li
          v-for="todo in completeTodos"
          :key="todo.id"
          class="todo-item complete"
        >
          {{ todo.text }} {{ todo.date }}
          <button
            @click="removeTodoItem(todo.id)"
            class="icon-button delete-button"
          >
            <i class="fas fa-trash"></i>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { v4 as uuidv4 } from "uuid";

export default {
  data() {
    return {
      newTodo: "",
      newDate: "",
      currentView: "incomplete", // 預設顯示未完成清單
    };
  },
  computed: {
    ...mapState(["todos"]), //vuex的state
    incompleteTodos() {
      return this.todos.filter((todo) => !todo.done);
    },
    completeTodos() {
      return this.todos.filter((todo) => todo.done);
    },
  },
  methods: {
    ...mapActions(["addTodo", "removeTodo", "toggleTodo"]), //vuex的action
    handleAddTodo() {
      if (this.newTodo.trim()) {
        this.addTodo({
          id: uuidv4(), // 為每個待辦事項分配唯一ID
          text: this.newTodo,
          date: this.newDate,
          done: false,
          editing: false,
        });
        this.newTodo = "";
        this.newDate = "";
      }
    },
    toggleDone(id) {
      this.toggleTodo(id);
    },
    removeTodoItem(id) {
      this.removeTodo(id);
    },
    startEditing(todo) {
      todo.editing = true;
    },
    stopEditing(todo) {
      todo.editing = false;
    },
    showIncomplete() {
      this.currentView = "incomplete";
    },
    showComplete() {
      this.currentView = "complete";
    },
  },
};
</script>

<style scoped>
@import "~@fortawesome/fontawesome-free/css/all.css";

.todo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  min-height: 100vh;
  margin: 0 auto;
  text-align: center;
  font-family: Arial, sans-serif;
}

.input-container {
  display: flex;
  width: 100%;
  margin-bottom: 15px;
}

.todo-input {
  width: calc(60%);
  padding: 15px 10px;
  font-size: 20px;
  box-sizing: border-box;
  border-radius: 10px;
}

.date-input {
  width: calc(30%);
  padding: 15px 10px;
  font-size: 16px;
  box-sizing: border-box;
  margin-left: 10px;
  border-radius: 10px;
}

.add-button {
  width: calc(10%);
  padding: 15px 10px;
  font-size: 20px;
  background-color: #478ad1;
  color: white;
  border: none;
  cursor: pointer;
  margin-left: 10px;
  border-radius: 5px;
}

.buttons {
  display: flex;
  width: 100%;
}

.buttons button {
  flex: 1;
  padding: 10px 20px;
  font-size: 20px;
  cursor: pointer;
  border: none;
  background-color: rgb(220, 220, 220);
}

.buttons .active {
  background-color: #478ad1;
  color: white;
}

.todo-content {
  width: 100%;
}

.todo-list {
  list-style: none;
  padding: 0;
  width: 100%;
}

.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 10px 0;
  border-bottom: 1px solid #ccc;
  background-color: white;
  font-size: 25px;
}

.todo-item .edit-input {
  flex-grow: 1;
  margin-right: 10px;
  padding: 5px;
  font-size: 25px;
  margin: 10px 0;
  border-radius: 5px;
}

.complete {
  text-decoration: line-through;
}

.icon-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  margin: 0 5px;
  font-size: 20px;
}

.edit-button {
  color: #0777ff;
}

.save-button {
  color: #4acd64;
}

.complete-button {
  color: #4acd64;
}

.delete-button {
  color: #dc3545;
}
</style>
