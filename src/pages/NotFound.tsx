import { Button, Empty, Page } from '../components/ui'

export default function NotFound() {
  return (
    <Page>
      <Empty title="Page not found" text="The page you are looking for has moved or does not exist." action={<Button to="/">Back to Overview</Button>} />
    </Page>
  )
}
