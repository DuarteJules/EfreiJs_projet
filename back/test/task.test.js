import { describe, it, beforeEach, expect, vi } from 'vitest';
const task = require('../controllers/task.controllers')

describe('removeTask', () => {
    let req, res;
    let tasks;

    beforeEach(() => {
        // Réinitialise la liste des tâches avant chaque test
        tasks = [
            { id: 1, name: 'Task 1' },
            { id: 2, name: 'Task 2' },
            { id: 3, name: 'Task 3' }
        ];

        // Mock de l'objet req avec un paramètre id
        req = {
            params: {
                id: '2'
            }
        };

        // Mock des méthodes status et send de l'objet res
        res = {
            status: vi.fn().mockReturnThis(),
            send: vi.fn()
        };
    });

    it('should remove the task with the given id', () => {
        const updatedTasks = task.removeTask(req, res, tasks);
        // Vérifie que la tâche avec l'id 2 a été supprimée
        expect(updatedTasks).toEqual([
            { id: 1, name: 'Task 1' },
            { id: 3, name: 'Task 3' }
        ]);

        // Vérifie que res.status a été appelé avec 200
        expect(res.status).toHaveBeenCalledWith(200);

        // Vérifie que res.send a été appelé avec le bon message
        expect(res.send).toHaveBeenCalledWith(JSON.stringify({ result: 'ok' }));
    });

    it('should do nothing if task id does not exist', () => {
        req.params.id = '10';  // Utilise un id inexistant

        const updatedTasks = task.removeTask(req, res, tasks);
        // Vérifie que la tâche avec l'id 2 a été supprimée

        // Vérifie que les tâches n'ont pas changé
        expect(updatedTasks).toEqual([
            { id: 1, name: 'Task 1' },
            { id: 2, name: 'Task 2' },
            { id: 3, name: 'Task 3' }
        ]);

        // Vérifie que res.status a été appelé avec 200
        expect(res.status).toHaveBeenCalledWith(200);

        // Vérifie que res.send a été appelé avec le bon message
        expect(res.send).toHaveBeenCalledWith(JSON.stringify({ result: 'ok' }));
    });
});
