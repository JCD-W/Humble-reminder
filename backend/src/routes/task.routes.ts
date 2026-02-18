import type {Request, Response} from "express"
import Router from "express"

import type boardController from "../db/controllers/boardController.ts"
import type taskController from "../db/controllers/taskController.ts"
import type columnController from "../db/controllers/columnController.ts"

export default class taskRoutes {
	routes = Router()
	boardController: boardController
	taskController: taskController
	columnController: columnController

	constructor (bc: boardController, tc: taskController, cc: columnController) {
		this.boardController = bc
		this.taskController = tc
		this.columnController = cc

		this.routes.post("/:board/:column/", this.create)
		this.routes.post("/deliver/:id", this.deliver)
		this.routes.put("/:id", this.updateTask)
		this.routes.put("/:board/:id/move", this.switchTaskColumn)
		this.routes.delete("/:id", this.deleteTask)
	}

	create = async (req: Request, res: Response) => {
		if (!req.params.board)
			return res.status(400).send({message: "Board not specified"})
		if (!req.params.column)
			return res.status(400).send({message: "Column not specified"})

		const boardId = Buffer.from(req.params.board, "hex")
		const columnId = parseInt(req.params.column)

		const board = await this.boardController.getBoardById(boardId)
		if (!board)
			return res.status(404).send({message: "Board not found"})

		const column = await this.columnController.getColumnById(columnId)
		if (!column)
			return res.status(404).send({message: "Column not found"})

		const { name, description, type } = req.body
		if (!name || !description || !type)
			return res.status(400).send({message: "Name, description or type missing"})

		if (!["normal", "deliver_url", "deliver_file"].includes(type))
			return res.status(400).send({message: "Invalid type"})

		let position = 1
		const otherTasks = await this.taskController.getColumnTasks(columnId)
		if (otherTasks.length > 1) {
			for (let task of otherTasks)
				if (task.position > position)
					position = task.position + 1
		}

		let deadline = null
		if ((type === "deliver_url" || type === "deliver_file") && req.body.deadline)
			deadline = req.body.deadline

		const taskId = await this.taskController.create(name, description, columnId, position, type, deadline)

		return res.status(200).send({
			message: `New task created`,
			task: taskId
		})
	}

	updateTask = (req: Request, res: Response) => {
		res.status(200).send({
			message: `Task updated`
		})
	}

	deleteTask = (req: Request, res: Response) => {
		res.status(200).send({
			message: `Task deleted`
		})
	}

	deliver = (req: Request, res: Response) => {
		res.status(200).send({
			message: `Task delivered`
		})
	}

	switchTaskColumn = async (req: Request, res: Response) =>  {
		if (!req.params.id)
			return res.status(400).send({message: "No task specified"})
		if (!req.params.board)
			return res.status(400).send({message: "Board not specified"})
		if (!req.body.column)
			return res.status(400).send({message: "Column not specified"})

		const boardId = Buffer.from(req.params.board, "hex")
		const taskId = parseInt(req.params.id)
		const columnId = parseInt(req.body.column)
		
		const board = await this.boardController.getBoardById(boardId)
		if (!board)
			return res.status(404).send({message: "Board not found"})
		const column = await this.columnController.getColumnById(columnId)
		if (!column)
			return res.status(404).send({message: "Column not found"})
		const task = await this.taskController.getTaskById(taskId)
		if (!task)
			return res.status(404).send({message: "Task not found"})

		await this.taskController.moveTaskColumn(taskId, task.column, columnId, task.position)

		return res.status(200).send({
			message: `Column changed`
		})
	}
}