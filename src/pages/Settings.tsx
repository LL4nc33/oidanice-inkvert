import { Layout, DarkModeToggle } from '@oidanice/kindle-ui'

export default function Settings() {
  return (
    <Layout title="inkvert" headerRight={<DarkModeToggle />}>
      <p className="font-mono text-sm">Settings page placeholder</p>
    </Layout>
  )
}
