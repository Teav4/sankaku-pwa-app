import * as React from 'react'
import { SearchIllustConfigProps } from '@/hooks/useFetchIllust'
import {
  Modal,
  Text,
  Button,
  Input,
  Dropdown,
  FormElement
} from '@nextui-org/react'
import { MailOutlined } from '@ant-design/icons'
import { capitalizeFirstLetter } from '@/helpers/capitalizeFirstLetter'

interface Props {
  visible: boolean
  closeBtn: () => void
  setFilter: React.Dispatch<React.SetStateAction<SearchIllustConfigProps>>
}

type SelectOrderValue =
  | 'popularity'
  | 'date'
  | 'quality'
  | 'random'
  | 'recently_favorited'
  | 'recently_voted'

export function SearchModal(props: Props) {
  const { visible, closeBtn, setFilter } = props
  const [filterSelected, setFilterSelected] =
    React.useState<SearchIllustConfigProps>({})
  const orderItems = [
    'popularity',
    'date',
    'quality',
    'random',
    'recently_favorited',
    'recently_voted'
  ]
  const [selectedOrder, setSelectedOrder] = React.useState<any>(
    new Set([orderItems[0]])
  )
  const [tagsInput, setTagsInput] = React.useState<string[]>([])

  // @ts-ignore
  const selectedOrderValue = (): SelectOrderValue =>
    Array.from(selectedOrder).join(', ').replaceAll('_', ' ')

  const onSelectionOrderChange = (key: any) => {
    setSelectedOrder(key)

    setFilterSelected({
      ...filterSelected,
      order_by: selectedOrderValue()
    })
  }

  const onTagsInputChange = (event: React.ChangeEvent<FormElement>) => {
    const tags = event.target.value.split(' ')
    setTagsInput(tags)
  }

  const handleApplyBtn = () => {
    setFilter({
      order_by: selectedOrderValue(),
      tags: tagsInput
    })
    closeBtn()
  }

  console.log({ visible })

  return (
    <Modal blur aria-labelledby="modal-title" open={visible}>
      <Modal.Header>
        <Text id="modal-title" size={18}>
          Advance Search
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Input
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          aria-label="tags"
          onChange={onTagsInputChange}
          labelLeft="Tags:"
          placeholder="genshin_impact, bikini, ..."
        />
        <Dropdown>
          <Dropdown.Button flat color="secondary" css={{ tt: 'capitalize' }}>
            {selectedOrderValue()}
          </Dropdown.Button>
          <Dropdown.Menu
            aria-label="Single selection actions"
            color="secondary"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={selectedOrder}
            onSelectionChange={onSelectionOrderChange}
          >
            {orderItems.map((item) => (
              <Dropdown.Item key={item}>
                {capitalizeFirstLetter(item)}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" onPress={handleApplyBtn}>
          Apply
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
