import { Controller, Get, Post, Delete } from '@overnightjs/core'
import { Request, Response } from 'express'
import Logger from '../logger'
import { Inventory } from '../models'

@Controller('inventory')
export class InventoryController {
  @Get('')
  private async get(req: Request, res: Response) {
    const { restaurant_id } = req.query
    const options = !!restaurant_id ? { restaurant_id } : {}
    try {
      const inventory = await Inventory.filtered(options)
      return res.json(inventory.map(row => row.toJSON()))
    } catch (error) {
      Logger.error(`failed to get inventory ${error}`)
      return res.sendStatus(500)
    }
  }
  @Post('')
  private async post(req: Request, res: Response) {
    const { name, start_time, end_time, slots, restaurant_id } = req.body
    try {
      await Inventory.create({ name, start_time, end_time, slots, restaurant_id })
      // const [ sHour, sMin ] = start_time.split(":")
      // const [ eHour, eMin ] = end_time.split(":")
      // const minuteSlots = ['00', '15', '30', '45'];
      // let slots=[]
      // for(let h = +sHour; h <= +eHour; h++){
      //     minuteSlots.forEach(minSlot => {
      //         const slotStr = h < 10 ? `0${h}:${minSlot}` : `${h}:${minSlot}`;
      //         slots.push(slotStr)
      //     })
      // }

      // for(let i=0; i< slots.length; i++) {
      //     await Inventory.create({
      //         name,
      //         time: slots[i],
      //         slots: slotsCount,
      //         restaurant_id
      //     })
      // }
      return res.status(200).json({ success: true })
    } catch (error) {
      Logger.error(`failed to create inventory ${error}`)
      return res.status(500).json({ error })
    }
  }

  @Delete('')
    private async delete(req: Request, res: Response) {
        const { inventory_id } = req.query;
        try {
            await Inventory.destroy({ where: { id: inventory_id }})
            return res.status(200).json({ "message": 'success'})
        } catch (error) {
            Logger.error(`failed to create reservation ${error}`)
            return res.status(500).json({ error })
        }
    }
}
