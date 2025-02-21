import React from "react";
import { Button, Form, FormControl, Row, Col } from "react-bootstrap";
export const AddTodoComponent = ({
  addTodos,
}: {
  addTodos: (text: string) => void;
}) => {
  const [todo, setTodo] = React.useState<string>("");
  const submit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!todo) {
      alert("Please enter a todo");
    } else {
      addTodos(todo);
      setTodo("");
    }
  };
  return (
    <Form>
      <Row>
        <Col>
          <FormControl
            value={todo}
            onChange={(e) => {
              setTodo(e.target.value);
            }}
            placeholder="Add a todo"
          />
        </Col>
        <Col>
          <Button onClick={submit}>Add</Button>
        </Col>
      </Row>
    </Form>
  );
};
