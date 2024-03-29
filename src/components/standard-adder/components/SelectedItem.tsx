import { css } from '@emotion/react'
import { useState } from 'react'
import { convertToNumber } from '../../../helpers/convertToNumber'
import { getDispatch } from '../../../helpers/getDispatch'
import { Food } from '../../../models/food'
import { Recipe } from '../../../models/recipe'
import { getPrettyUnits } from '../../list/helpers/getPrettyUnits'
import { getDefaultUnit } from '../helpers/getDefaultUnit'
import { submitEditor } from '../helpers/submitEditor'
import { AdderItem } from '../StandardAdder'
import { ButtonPanel } from './ButtonPanel'
import { InputFields } from './InputFields'
import { Meta } from './Meta'

type props = {
  type: AdderItem
  selectedItem: Food | Recipe
  setSelectedItem: React.Dispatch<React.SetStateAction<Food | Recipe | null>>
  onBack: () => void
}
export const SelectedItem: React.FC<props> = ({
  onBack,
  selectedItem,
  setSelectedItem,
  type,
}) => {
  const dispatch = getDispatch()

  const [amount, setAmount] = useState('')
  const [unit, setUnit] = useState(getDefaultUnit(getPrettyUnits(selectedItem)))

  const submitReady = Boolean(amount && unit)

  const submit = () => {
    const amountAsNumber = convertToNumber(amount)
    const status = submitEditor(
      type,
      selectedItem?.alias || null,
      amountAsNumber,
      unit,
      null,
      dispatch,
      selectedItem
    )
    if (status) {
      setSelectedItem(null)
    }
  }

  return (
    <form
      css={css`
        margin: 0 auto;
        max-width: 500px;
      `}
      className={`mb20`}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          event.preventDefault()
          submitReady && submit()
        }
      }}
    >
      <div className="fcc">
        <Meta
          isDummy={false}
          selectedItem={selectedItem}
          showBack={true}
          onBack={() => onBack()}
          path={[]}
        />
        <InputFields
          selectedItem={selectedItem}
          unit={unit}
          setUnit={setUnit}
          amount={amount}
          setAmount={setAmount}
        />
        <ButtonPanel showSubmit={submitReady} submit={() => submit()} />
      </div>
    </form>
  )
}
