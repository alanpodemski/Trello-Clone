import { v4 as uuid } from 'uuid'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import boardData from '~/data/board.json'

export const useBoardStore = defineStore('boardStore', () => {
    const board = useStorage('board', boardData)

    function getTask(taskId) {
        for (const column of board.value.columns) {
            const task = column.tasks.find(task => task.id === taskId)
            if (task) {
                return task
            }
        }
        return null;
    }

    function addTask({columnIndex, taskName}) {
        board.value.columns[columnIndex].tasks.push({
            id: uuid(),
            name: taskName,
            description: '',
        })
    }

    function deleteTask(taskId: string) {
        for (const column of board.value.columns) {
            const taskIndex = column.tasks.findIndex(task => task.id === taskId)
            if (taskIndex !== -1) {
                column.tasks.splice(taskIndex, 1)
                return
            }
        }
    }

    function moveTask({fromTaskIndex, toTaskIndex, fromColumnIndex, toColumnIndex}) {
        if (fromColumnIndex < 0 || toColumnIndex < 0 
            || fromColumnIndex >= board.value.columns.length 
            || toColumnIndex >= board.value.columns.length) {
            console.error('Invalid column index');
            return;
        }
    
        const fromColumn = board.value.columns[fromColumnIndex];
        if (fromTaskIndex < 0 || fromTaskIndex >= fromColumn.tasks.length) {
            console.error('Invalid from task index');
            return;
        }
    
        // Extract the task from the original column
        const [task] = fromColumn.tasks.splice(fromTaskIndex, 1);
        if (!task) {
            console.error('Task not found');
            return;
        }
    
        // Insert the task into the new column and position
        board.value.columns[toColumnIndex].tasks.splice(toTaskIndex, 0, task);
    }

    function addColumn(columnName: string) {
        board.value.columns.push({
            name: columnName,
            tasks: [],
        })
    }

    function deleteColumn(columnIndex) {
        board.value.columns.splice(columnIndex, 1)
    }

    function moveColumn({fromColumnIndex, toColumnIndex}) {
        const column = board.value.columns.splice(fromColumnIndex, 1)[0]
        board.value.columns.splice(toColumnIndex, 0, column)
    }

    return {
        // State
        board,
        // Actions
        addColumn,
        addTask,
        deleteColumn,
        deleteTask,
        moveColumn,
        moveTask,
        // Methods
        getTask,
    }
})
