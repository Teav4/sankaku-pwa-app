import * as React from 'react'
import { Card, Grid, Text, Input, Button, Spacer } from '@nextui-org/react'
import { LockOutlined, UnlockOutlined } from '@ant-design/icons'
import { useLogin } from '@/hooks/useLogin'

export function Login(): React.ReactElement {
  const [formData, setFormData] = React.useState({ username: '', password: '' })
  const { mutate } = useLogin()

  const handleUserNameChange = (e: React.ChangeEvent<any>) => {
    setFormData({
      ...formData,
      username: e.target.value
    })
  }

  const handlePasswordChange = (e: React.ChangeEvent<any>) => {
    setFormData({
      ...formData,
      password: e.target.value
    })
  }

  const handleSubmitSignInBtn = () => {
    mutate(formData)
  }

  return (
    <Grid.Container gap={2}>
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
              Login
            </Text>
          </Card.Header>
          <Card.Body>
            <Spacer y={1.6} />
            <Input
              onChange={handleUserNameChange}
              labelPlaceholder="Email or Username"
            />
            <Spacer y={1.6} />
            <Input.Password
              labelPlaceholder="Password"
              onChange={handlePasswordChange}
              visibleIcon={<UnlockOutlined />}
              hiddenIcon={<LockOutlined />}
            />
          </Card.Body>
          <Card.Footer>
            <Button onPress={handleSubmitSignInBtn}>SignIn</Button>
          </Card.Footer>
        </Card>
      </Grid>
    </Grid.Container>
  )
}
