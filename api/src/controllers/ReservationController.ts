import { Controller, Get, Post, Put, Delete } from '@overnightjs/core'
import { Request, Response } from 'express'
import Logger from '../logger'
import { Reservation } from '../models'

@Controller('reservation')
export class ReservationController {
    @Get('')
    private async get(req: Request, res: Response) {
        const { restaurant_id } = req.query
        const options = !!restaurant_id ? { restaurant_id } : {}
        try {
            const reservations = await Reservation.filtered(options)
            return res.json(reservations.map( row => row.toJSON()))
        } catch (error) {
            Logger.error(`failed to get reservation ${error}`)
            return res.status(500).json({ error })
        }
    }
    @Post('')
    private async post(req: Request, res: Response) {
        const { name, time, seats, email, date, restaurant_id } = req.body
        try {
            const [ hour, minute ] = time.split(":")
            if (isNaN(+hour) || isNaN(+minute) || hour.length !== 2 || minute.length !== 2) {
                throw Error("time must be of 24 hour format HH:MM")
            }
        } catch (error) {
            Logger.error(`failed to parse time ${error}`)
            return res.status(400).json({ error })
        }
        try {
            const reservation = await Reservation
              .create({ name, time, seats, email, date, restaurant_id })
            return res.json(reservation.toJSON())
        } catch (error) {
            Logger.error(`failed to create reservation ${error}`)
            return res.status(500).json({ error })
        }
    }

    @Put('')
    private async put(req: Request, res: Response) {
        const { reservation_id } = req.query;
        const request = req.body
        
        try {
            await Reservation.update({ ...request }, { where: { id: reservation_id }})
            return res.status(200).json({ 'message': 'success'})
        } catch (error) {
            Logger.error(`failed to create reservation ${error}`)
            return res.status(500).json({ error })
        }
    }

    @Delete('')
    private async delete(req: Request, res: Response) {
        const { reservation_id } = req.query;
        try {
            await Reservation.destroy({ where: { id: reservation_id }})
            return res.status(200).json({ "message": 'success'})
        } catch (error) {
            Logger.error(`failed to create reservation ${error}`)
            return res.status(500).json({ error })
        }
    }
}
