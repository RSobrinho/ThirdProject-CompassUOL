/* eslint-disable camelcase */
import { IReserveEntityProps } from 'entities/interfaces/iReserveEntityProps'
import { IReserveRepository } from '../../interfaces/iReserveRepository'
import { differenceInDays, isAfter, isBefore, isWithinInterval } from 'date-fns'

export class InMemoryReserveRepository implements IReserveRepository {
  reserves: IReserveEntityProps[] = []

  async save (reserve: IReserveEntityProps): Promise<void> {
    this.reserves.push(reserve)
  }

  async findByData (props: IReserveEntityProps): Promise<IReserveEntityProps> {
    const reserve = this.reserves.find((c) => {
      return Object.keys(props).every((key) => {
        return c[key] === props[key]
      })
    })
    if (reserve) {
      return reserve
    } else {
      return null
    }
  }

  async updateById ({ _id, ...props }): Promise<IReserveEntityProps> {
    const reserveIndex = this.reserves.findIndex((c) => c._id === _id)

    if (reserveIndex >= 0) {
      this.reserves[reserveIndex] = { _id, ...props }
      return this.reserves[reserveIndex]
    } else {
      return null
    }
  }

  async deleteById (id: string): Promise<boolean> {
    const reserveIndex = this.reserves.findIndex((c) => c._id === id)

    if (reserveIndex >= 0) {
      this.reserves.splice(reserveIndex, 1)
      return true
    } else {
      return false
    }
  }

  async findByFilter (data: { page?: number; limit?: number } & IReserveEntityProps): Promise<object> {
    let { limit, page, ...props } = data

    if (!limit) {
      limit = 10
    }
    if (!page) {
      page = 1
    }

    const offset = (page - 1) * limit

    const filteredReserves = this.reserves.filter((c) => {
      return Object.keys(props).every((key) => {
        return c[key] === props[key]
      })
    })

    const total = filteredReserves.length
    const offsets = Math.ceil(total / limit)

    const reserves = filteredReserves.slice(offset, offset + limit).map((c) => {
      return c
    })

    return {
      reserves,
      total,
      limit,
      offset,
      offsets
    }
  }

  async findByRange (start_date: Date, end_date: Date): Promise<IReserveEntityProps[]> {
    const overlappingReserves = this.reserves.filter(reserve => {
      const reserveStartDate = new Date(reserve.start_date)
      const reserveEndDate = new Date(reserve.end_date)

      return (
        (isBefore(reserveStartDate, start_date) && isAfter(reserveEndDate, start_date)) ||
        (isBefore(reserveEndDate, end_date) && isAfter(reserveStartDate, end_date)) ||
        (isWithinInterval(reserveStartDate, { start: start_date, end: end_date })) ||
        (isWithinInterval(reserveEndDate, { start: start_date, end: end_date })) ||
        (differenceInDays(start_date, reserveEndDate) === 0 || differenceInDays(reserveStartDate, end_date) === 0)
      )
    })

    return overlappingReserves
  }
}
