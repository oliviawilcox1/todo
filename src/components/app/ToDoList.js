import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
// MUI
import { DataGrid } from '@mui/x-data-grid';
import {  useTheme, useMediaQuery, Button, Typography, Box, Container, Stack } from '@mui/material';
// Components
import AddToDoModal from './AddToDoModal';
import EditToDoModal from './EditToDo';
// APIs
import { addTodo, editTodo, deleteTodo, fetchTodos } from '../../apis/routes';

export default function DataTable() {
  // State
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const headerHeight = isDesktop ? 92 : 64; 
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  // Modals - can be condensed in the future
  const handleOpenModal = () => setAddModalOpen(true);
  const handleCloseModal = () => setAddModalOpen(false);
  const handleCloseEditModal = () => setEditModalOpen(false);

  useEffect(() => {
    const fetchTodoList = async () => {
      try {
        const response = await fetchTodos();
        if(response.status === 401){
          navigate('/register');
        }
        setTodos(response.data);
      } catch (error) {
        setError('Error fetching todos');
      } finally {
        setLoading(false);
      }
    };

    fetchTodoList();
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 80},
    { field: 'title', headerName: 'Title', width: 200,},
    { field: 'status', headerName: 'Status', width: 150 },
    {
      field: 'edit',
      headerName: 'Edit',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenEditModal(params.row)}
        >
          Edit
        </Button>
      ),
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="primary"
          onClick={() => handleDeleteTodo(params.row)}
        >
          Delete
        </Button>
      ),
    },
  ];

  const handleOpenEditModal = (todo) => {
    setSelectedTodo(todo); 
    setEditModalOpen(true);
  };

  const handleAddTodo = async (newTodo) => {
    const todoToAdd = { ...newTodo, id: todos.length + 1 };

    const response = await addTodo(todoToAdd);

    if (response.status === 201) {
      setTodos((prevTodos) => [...prevTodos, { id: todos.length+1, ...todoToAdd }]);
    }
  };

  const handleEditTodo = async(updatedTodo) => {
    const { status } = await editTodo(updatedTodo, updatedTodo.id);
    if (status === 200) {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === updatedTodo.id ? { ...todo, ...updatedTodo } : todo
        )
      );
    } else {
      console.error("Error updating.");
    }
  };

  const handleDeleteTodo = async(todo) => {
    const id = todo.id
    const confirmDelete = window.confirm("Please confirm you want to delete this item.");
    if (confirmDelete) {
      const { status } = await deleteTodo(id);
      if (status === 204) {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      } else {
        console.error("Error deleting.");
      }
    }
  };

  return (
    <Container
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: `calc(100vh - ${headerHeight})`,
      }}
    >
      <Stack
        p={3}
        mt={2}
        sx={{
          background: 'linear-gradient(90deg, rgba(255,200,150,0.2) 0%, rgba(240,80,180,0.2) 50%, rgba(120,30,240,0.2) 100%)',
          backgroundBlendMode: 'soft-light',
          width: "70%",
          borderRadius: 3,
          minHeight: '75vh',
          maxHeight: 'fit-content',
        }}
      >
        <Stack direction={"row"} mb={1} justifyContent="space-between">
          <Typography variant="h6" sx={{ mb: 1 }}>To Do List</Typography>
          <Button variant="contained" onClick={handleOpenModal}>Add Todo</Button>
        </Stack>

        {todos.length === 0 ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '60vh',
              textAlign: 'center',
            }}
          >
            <Typography variant="h6" color="textSecondary" gutterBottom>
              No todos available
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              Add your first todo to get started!
            </Typography>
          </Box>
        ) : (
          <>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                textAlign: 'center',
              }}
            >
              <DataGrid
                disableRowSelectionOnClick
                rows={todos}
                columns={columns}
                loading={loading}
                pageSizeOptions={[5]}
                pagination={true}           
                sx={{
                  height: 400,
                  width: '100%',
                  border: 0,
                  backgroundColor: "rgb(255, 255, 255, .8)",
                }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>

                {selectedIds.length === 1 && (
                  <Button variant="contained" onClick={handleOpenEditModal} sx={{ mr: 2 }}>
                    Edit Todo
                  </Button>
                )}

                {selectedIds.length > 0 && (
                  <Button variant="contained" color="error" onClick={handleDeleteTodo}>
                    Delete Todo{selectedIds.length > 1 && 's'}
                  </Button>
                )}
              </Box>
            </Box>
          </>
        )}
        <AddToDoModal
          open={addModalOpen}
          handleClose={handleCloseModal}
          onAddTodo={handleAddTodo}
        />
        {selectedTodo && (
          <EditToDoModal
            open={editModalOpen}
            handleClose={handleCloseEditModal}
            onEditTodo={handleEditTodo}
            todo={selectedTodo}
          />
        )}
      </Stack>
    </Container>
  );
}