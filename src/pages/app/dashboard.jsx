import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { createTask } from '../../api/create-task'
import { deleteTask } from '../../api/delete-task'
import { getTasks } from '../../api/get-tasks'
import { putTask } from '../../api/update-task'
import { Logo } from '../../components/Logo'

export function Dashboard() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const [newTask, setNewTask] = useState('')

  const { data: tasks, isLoading: isLoadingTask } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  })

  const { mutateAsync: addTask, isPending: isPendingAddTask } = useMutation({
    mutationFn: createTask,
    onSuccess() {
      queryClient.invalidateQueries('tasks')
    },
  })

  const { mutateAsync: removeTask } = useMutation({
    mutationFn: deleteTask,
    onSuccess() {
      queryClient.invalidateQueries('tasks')
    },
  })

  const { mutateAsync: updateTask } = useMutation({
    mutationFn: putTask,
    onSuccess() {
      queryClient.invalidateQueries('tasks')
    },
  })

  function handleNewTaskName(event) {
    setNewTask(event.target.value)
  }

  function handleLogout() {
    localStorage.clear()
    navigate('/signin', { replace: true })
  }

  async function handleTaskDelete(id) {
    try {
      await removeTask(id)
    } catch (error) {
      toast.error('Erro ao deletar tarefa')
    }
  }

  async function handleUpdateTask({ id, event }) {
    try {
      await updateTask({ id, completed: event.target.checked })
    } catch (error) {
      toast.error('Erro ao completar tarefa.')
    }
  }

  async function onSubmit(event) {
    event.preventDefault()

    try {
      await addTask({ title: newTask })
    } catch (error) {
      toast.error('Erro ao cadastrar tarefa.')
    }

    setNewTask('')
  }

  const todoList = tasks ?? []

  return (
    <>
      <div className="card shadow-lg rounded-4">
        <div className="card-body p-5">
          <header className="d-flex justify-content-between align-items-center mb-4">
            <Logo className="h3 float-md-start" />

            <button
              type="button"
              className="btn btn-outline-secondary d-flex justify-content-center align-items-center"
              title="Sair"
              onClick={handleLogout}
            >
              <p className="mb-0">Sair</p>
              <i className="bi bi-box-arrow-right ms-2" />
            </button>
          </header>
          <form onSubmit={onSubmit} className="d-flex justify-content-end mb-4">
            <div className="form-outline flex-fill">
              <label className="form-label fs-4 mb-4" htmlFor="taskName">
                Bem-vindo(a) ao <span className='text-primary fw-bold'>Minhas Tarefas!</span> <br /> O que você precisa fazer hoje?
              </label>

              <input
                type="text"
                id="taskName"
                onChange={handleNewTaskName}
                value={newTask}
                className="form-control form-control-lg"
              />
            </div>

            <div className="d-flex align-items-end">
              <button
                type="submit"
                className="btn btn-primary btn-lg ms-2 d-flex"
                disabled={!newTask || isPendingAddTask}
              >
                {isPendingAddTask ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm"
                      aria-hidden="true"
                    />
                  </>
                ) : (
                  <span className='d-flex gap-2 align-items-center'><i className="bi bi-plus-lg" /> Adicionar</span>
                )}
              </button>
            </div>
          </form>

          {isLoadingTask ? (
            <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <ul className="list-group mb-0">
              {todoList.length > 0 && todoList.map((task) => (
                <Fragment key={task._id}>
                  <li className="w-100 list-group-item d-flex justify-content-between align-items-center border border-light rounded-4 mb-2 shadow-sm">
                    <div className="form-check">
                      <input
                        id={`task-${task._id}`}
                        className="form-check-input me-2"
                        type="checkbox"
                        checked={task.completed}
                        onChange={(event) =>
                          handleUpdateTask({ id: task._id, event })
                        }
                      />

                      <label
                        className="form-check-label"
                        htmlFor={`task-${task._id}`}
                      >
                        {task.completed ? <s>{task.title}</s> : task.title}
                      </label>
                    </div>

                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleTaskDelete(task._id)}
                    >
                      <i className="bi bi-trash3" />
                    </button>
                  </li>
                </Fragment>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  )
}
