import { Layout, DarkModeToggle } from '@oidanice/kindle-ui'

export default function Home() {
  return (
    <Layout title="inkvert" headerRight={<DarkModeToggle />}>
      <p className="font-mono text-sm">Home page placeholder</p>
    </Layout>
  )
}
