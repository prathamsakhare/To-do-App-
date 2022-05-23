import React, { useState } from "react";
import { Box } from "@mui/system";
import "./App.css";
import Container from "@mui/material/Container";

import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      
    };
    if (todo === "") {
      alert("Enter some value here");
      return;
    }
    setTodos([...todos, newTodo]);

    setTodo("");
  };

  const deleteTodo = (id) => {
    const updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const editTodo = (id) => {
    
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        if (editingText !== "") {
          
          todo.text = editingText;
        } else {
          alert("Please fill This field");
        }
      }
      return todo;
    });
    setTodo(updatedTodos.text);
    
    setTodoEditing(null);
    setEditingText("");
  };
  return (
    <div className="App">
      <Container>
        <Typography
          gutterBottom
          variant="h3"
          align="center"
          style={{ marginTop: "20px" }}
        >
          Todo App
        </Typography>
        <form onSubmit={handleSubmit}>
          <Card>
            <CardContent style={{ MarginBottom: "20px" }}>
              <Grid container spacing={1} xs={12} md={12}>
                <Grid item  md={12} xs={12}>
                <TextField
                  type="text"
                  placeholder="Add Task Here"
                  onChange={(e) => setTodo(e.target.value)}
                  value={todo}
                  
                />
                </Grid>

                <Grid xs={12} item>
                  <Button
                    type="submit"
                    variant="contained"
                    style={{ width: "100%" }}
                  >
                    Add
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </form>
        {todos.map((todo) => (
          <>
            <div key={todo.id}>
              <Box mt={2} mb={2}>
                <Alert
                  action={
                    <div>
                      {todoEditing === todo.id ? (
                        <Button
                          onClick={() => editTodo(todo.id)}
                          style={{ color: "green" }}
                        >
                          Save
                        </Button>
                      ) : (
                        <Button
                          onClick={() => {
                            setTodoEditing(todo.id);
                          }}
                        >
                          Edit
                        </Button>
                      )}
                      <Button
                        size="small"
                        onClick={() => deleteTodo(todo.id)}
                        style={{ color: "red" }}
                      >
                        Delete
                      </Button>
                    </div>
                  }
                >
                  {todoEditing === todo.id ? (
                    <input
                      type="text"
                      onChange={(e) => setEditingText(e.target.value)}
                      value={editingText}
                      style={{ border: "none", height: "20px", width: "170%" }}
                    />
                  ) : (
                    <div>{todo.text}</div>
                  )}
                </Alert>
              </Box>
            </div>
          </>
        ))}
      </Container>
    </div>
  );
}

export default App;
