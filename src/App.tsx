import { JSX } from 'solid-js/jsx-runtime'
import { createSignal, createEffect } from 'solid-js'
import { Motion, Presence } from '@motionone/solid'
import { Rerun } from '@solid-primitives/keyed'
import RandomFactClient from './factsClient'
import styles from './App.module.css'

function App (): JSX.Element {
  const [fact, setFact] = createSignal('')

  createEffect(() => {
    void (async function () {
      const client = await RandomFactClient()
      setFact(client.next().fact)

      setInterval(() => {
        setFact(client.next().fact)
      }, 15000)
    })()
  })

  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <Presence exitBeforeEnter>
          <Rerun on={fact()}>
            <Motion
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, x: 0, transition: { delay: 0.05 } }}
              transition={{ duration: 0.3 }}
              exit={{ opacity: 0, y: -50 }}
            >
              <p>
                {fact()}
              </p>
            </Motion>
          </Rerun>
        </Presence>
      </header>
    </div>
  )
}

export default App
