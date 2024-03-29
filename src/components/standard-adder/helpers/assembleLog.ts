import { Unit } from '../../../constants/units'
import { extractData } from '../../../helpers/extractData'
import { uuid } from '../../../helpers/uuid'
import { Log } from '../../../models/log'

export const assembleLog = (
  alias: string | null,
  amount: number,
  unit: Unit,
  recipe?: string,
  food?: string
) => {
  const { foods, profile, recipes } = extractData()
  const logToFood = foods.find((f) => f.id === food)
  const logToRecipe = recipes.find((r) => r.id === recipe)
  const newLog: Log = {
    // Data
    alias,
    amount,
    barcode: null,
    createdAt: new Date(),

    food: food || null,
    // Metadata
    id: uuid(),
    logToFood: logToFood || null,

    // Relationships
    logToProfile: profile,
    logToRecipe: logToRecipe || null,
    profile: profile.authId,

    // Foreign keys
    recipe: recipe || null,
    type: 'log',
    unit,
    updatedAt: new Date(),
  }
  return newLog
}
