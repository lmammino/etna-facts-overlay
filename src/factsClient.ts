interface Fact {
  id: number
  fact: string
  url: 'https://lmammino.github.io/etna-facts/{number}.json'
}

interface All {
  metadata: {
    total: number
    fist: number
    last: number
  }
  facts: Fact[]
}

interface Client {
  next: () => Fact
}

export default async function RandomFactClient (): Promise<Client> {
  const res = await fetch('https://lmammino.github.io/etna-facts/all.json')
  const all = await res.json() as All
  const shuffledFacts = [...all.facts].sort(() => 0.5 - Math.random())
  let current = 0

  return {
    next (): Fact {
      return shuffledFacts[current++ % shuffledFacts.length]
    }
  }
}
