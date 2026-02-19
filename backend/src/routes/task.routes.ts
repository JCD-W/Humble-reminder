import type {Request, Response} from "express"
import Router from "express"

import type boardController from "../db/controllers/boardController.ts"
import type taskController from "../db/controllers/taskController.ts"
import type columnController from "../db/controllers/columnController.ts"
import { unlinkSync } from "fs"

export default class taskRoutes {
	routes = Router()
	boardController: boardController
	taskController: taskController
	columnController: columnController

	constructor (bc: boardController, tc: taskController, cc: columnController) {
		this.boardController = bc
		this.taskController = tc
		this.columnController = cc

		this.routes.post("/create/:board/:column/", this.create)
		this.routes.post("/deliver/:id", this.deliver)
		this.routes.put("/deliver/:id", this.deliver)
		this.routes.put("/:id", this.update)
		this.routes.put("/move/:id", this.move)
		this.routes.put("/:board/:id/move", this.switchTaskColumn)
		this.routes.delete("/:id", this.delete)
		this.routes.delete("/deliver/:id", this.deleteDeliver)
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
		if (board.board_state !== "active")
			return res.status(400).send({message: `The board is ${board.state}`})

		const column = await this.columnController.getColumnById(columnId)
		if (!column)
			return res.status(404).send({message: "Column not found"})
		if (column.state !== "active")
			return res.status(400).send({message: `The column is ${column}`})

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

	update = async (req: Request, res: Response) => {
		if (!req.params.id)
			return res.status(400).send({message: "Task not specified"})

		const { name, desc, type, deadline } = req.body
		if (!name && !desc && !type && !deadline)
			return res.status(304).send({message: "Nothing changed"})

		const taskId = parseInt(req.params.id)
		const task = await this.taskController.getTaskById(taskId)
		if (!task)
			return res.status(404).send({message: "Task not found"})
		if (task.state !== "active")
			return res.status(400).send({message: `The task is ${task.state}`})

		this.taskController.update(taskId, {
			task_name: name,
			task_desc: desc,
			task_type: type,
			task_deadline: deadline
		})

		return res.status(200).send({
			message: `Task updated`
		})
	}

	delete = async (req: Request, res: Response) => {
		if (!req.params.id)
			return res.status(400).send({message: "Task not specified"})
		const taskId = parseInt(req.params.id)
		const task = await this.taskController.getTaskById(taskId)
		if (!task)
			return res.status(404).send({message: "Task not found"})
		if (task.state !== "active")
			return res.status(400).send({message: `The task is ${task.state}`})

		await this.taskController.update(taskId, {
			task_state: "archived"
		})

		return res.status(200).send({
			message: `Task deleted`
		})
	}

	deliver = async (req: Request, res: Response) => {
		if (!req.params.id)
			return res.status(400).send({message: "Task not specified"})
		const taskId = parseInt(req.params.id)
		const task = await this.taskController.getTaskById(taskId)
		if (!task)
			return res.status(404).send({message: "Task not found"})
		if (task.state !== "active")
			return res.status(400).send({message: `The task is ${task.state}`})

		switch (task.type) {
			case "deliver_url":
				if (!req.body.url)
					return res.status(400).send({message: "Delivered URL not provided"})
				await this.taskController.update(taskId, {
					task_deliver: req.body.url
				})
				break
			case "deliver_file":
				if (!req.file)
					return res.status(400).send({message: "No file provided"})

				try {
					if (task.deliver_url)
						unlinkSync(`public/delivers/${task.deliver_url}`)
				} catch (err) {
					console.log(`Failed to delete the delivered file of the task ${taskId}`)
				}
				
				await this.taskController.update(taskId, {
					task_deliver: req.file.filename
				}) 
				break
			default:
				return res.status(400).send({message: "This task doesn't expect a deliver"})
		}

		return res.status(200).send({
			message: `Task delivered`
		})
	}

	move = (req: Request, res: Response) => {
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
		if (board.board_state !== "active")
			return res.status(400).send({message: `The board is ${board.state}`})
		const column = await this.columnController.getColumnById(columnId)
		if (!column)
			return res.status(404).send({message: "Column not found"})
		if (column.state !== "active")
			return res.status(400).send({message: `The column is ${column.state}`})
		const task = await this.taskController.getTaskById(taskId)
		if (!task)
			return res.status(404).send({message: "Task not found"})
		if (task.state !== "active")
			return res.status(400).send({message: `The task is ${task.state}`})

		await this.taskController.moveTaskColumn(taskId, task.column, columnId, task.position)

		return res.status(200).send({
			message: `Column changed`
		})
	}

	deleteDeliver = async (req: Request, res: Response) => {
		if (!req.params.id)
			return res.status(400).send({message: "Task not specified"})
		const taskId = parseInt(req.params.id)
		const task = await this.taskController.getTaskById(taskId)
		if (!task)
			return res.status(404).send({message: "Task not found"})

		if (task.state !== "active")
			return res.status(400).send({message: `The task is ${task.state}`})

		if (!task.deliver_url)
			return res.status(400).send({message: "The task doesn't have anything delivered"})

		if (task.type === "deliver_file") {
			try {
				unlinkSync(`public/delivers/${task.deliver_url}`)
			} catch (err) {
				console.log(`Failed to delete the delivered file of the task ${taskId}`)
			}
		}
		await this.taskController.update(taskId, {
			task_deliver: null
		})

		return res.status(200).send({message: "delivery deleted"})
	}
}