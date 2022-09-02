import * as React from 'react'
import { SearchIllustConfigProps } from '@/hooks/useFetchIllust'
import {
  Input,
  Card,
  Grid,
  Text,
  FormElement,
  Dropdown,
  Spacer,
  Button
} from '@nextui-org/react'
import { capitalizeFirstLetter } from '@/helpers/capitalizeFirstLetter'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { HOME } from '@/constants/routePath'

export function AdvanceSearch() {
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
  const navigate = useNavigate()

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
    console.log({
      tags: tagsInput,
      order_by: selectedOrderValue()
    })

    navigate({
      pathname: HOME,
      search: createSearchParams({
        tags: tagsInput,
        order_by: selectedOrderValue(),
        limit: '20'
      }).toString()
    })
  }

  return (
    <Grid.Container>
      <Grid xs={12}>
        <Card>
          <Card.Header>
            <Text
              h1
              css={{
                textGradient: '45deg, $blue600 -20%, $pink600 50%'
              }}
              weight="bold"
            >
              Advance Search
            </Text>
          </Card.Header>
          <Card.Body>
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
            <Spacer y={1.6} />
            <Dropdown>
              <Dropdown.Button
                flat
                color="secondary"
                css={{ tt: 'capitalize' }}
              >
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
          </Card.Body>
          <Card.Footer>
            <Button auto flat color="error" onPress={handleApplyBtn}>
              Search
            </Button>
          </Card.Footer>
        </Card>
      </Grid>
    </Grid.Container>
  )
}
